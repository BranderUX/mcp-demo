import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { ORDERS } from "../data/orders.js";
import { CUSTOMERS } from "../data/customers.js";

export function registerOrderTools(server: McpServer): void {
  server.registerTool(
    "get_orders",
    {
      description:
        "List TechStore Pro orders. Filter by status, date range, or customer. " +
        "Returns order summaries with items, totals, and shipping status. " +
        "After getting results, use generate_screen with a data_table element to display them " +
        "in a sortable, searchable table with status chips.",
      inputSchema: z.object({
        status: z
          .string()
          .optional()
          .describe(
            "Status filter: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'"
          ),
        customer_id: z.string().optional().describe("Filter by customer ID (e.g. 'cust-001')"),
        customer_name: z.string().optional().describe("Filter by customer name (partial match)"),
        from_date: z.string().optional().describe("Start date filter (YYYY-MM-DD)"),
        to_date: z.string().optional().describe("End date filter (YYYY-MM-DD)"),
        limit: z.number().optional().describe("Maximum results (default 10)"),
      }),
    },
    async (input) => ({ content: [{ type: "text", text: handleGetOrders(input) }] })
  );

  server.registerTool(
    "get_order_details",
    {
      description:
        "Get detailed information about a specific TechStore Pro order by ID or order number. " +
        "Returns full order with line items, customer info, shipping address, and tracking. " +
        "After getting results, use generate_screen with a header element for the order number " +
        "and a details_data element for the full order breakdown.",
      inputSchema: z.object({
        order_id: z
          .string()
          .describe("Order ID (e.g. 'ord-001') or order number (e.g. 'TSP-1001')"),
      }),
    },
    async (input) => ({ content: [{ type: "text", text: handleGetOrderDetails(input) }] })
  );
}

// ============================================================================
// HANDLERS
// ============================================================================

function handleGetOrders(input: Record<string, unknown>): string {
  let results = [...ORDERS];

  if (input.status && typeof input.status === "string") {
    results = results.filter((o) => o.status === input.status);
  }

  if (input.customer_id && typeof input.customer_id === "string") {
    results = results.filter((o) => o.customerId === input.customer_id);
  }
  if (input.customer_name && typeof input.customer_name === "string") {
    const name = (input.customer_name as string).toLowerCase();
    results = results.filter((o) => o.customerName.toLowerCase().includes(name));
  }

  if (input.from_date && typeof input.from_date === "string") {
    results = results.filter((o) => o.orderDate >= input.from_date!);
  }
  if (input.to_date && typeof input.to_date === "string") {
    results = results.filter((o) => o.orderDate <= input.to_date!);
  }

  results.sort((a, b) => b.orderDate.localeCompare(a.orderDate));

  const limit = typeof input.limit === "number" ? input.limit : 10;
  results = results.slice(0, limit);

  return JSON.stringify({
    total: results.length,
    orders: results.map((o) => ({
      id: o.id,
      orderNumber: o.orderNumber,
      customerName: o.customerName,
      customerEmail: o.customerEmail,
      status: o.status,
      itemCount: o.items.length,
      items: o.items,
      total: o.total,
      orderDate: o.orderDate,
      trackingNumber: o.trackingNumber,
      estimatedDelivery: o.estimatedDelivery,
    })),
  });
}

function handleGetOrderDetails(input: Record<string, unknown>): string {
  const id = input.order_id as string;
  const order = ORDERS.find(
    (o) => o.id === id || o.orderNumber === id || o.orderNumber.includes(id)
  );

  if (!order) {
    return JSON.stringify({ error: `Order not found: ${id}` });
  }

  const customer = CUSTOMERS.find((c) => c.id === order.customerId);

  return JSON.stringify({
    order: {
      ...order,
      customer: customer
        ? {
            id: customer.id,
            name: customer.name,
            email: customer.email,
            tier: customer.tier,
            segment: customer.segment,
          }
        : null,
    },
  });
}
