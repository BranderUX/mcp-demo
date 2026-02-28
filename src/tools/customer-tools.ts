import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { CUSTOMERS } from "../data/customers.js";
import { ORDERS } from "../data/orders.js";

export function registerCustomerTools(server: McpServer): void {
  server.registerTool(
    "get_customers",
    {
      description:
        "List or search TechStore Pro customers. Filter by segment, tier, or search by name/email. " +
        "Returns customer profiles with spend data and order history. " +
        "After getting results, use generate_screen with a data_table element for the customer list.",
      inputSchema: z.object({
        query: z.string().optional().describe("Search by customer name or email"),
        segment: z
          .string()
          .optional()
          .describe(
            "Segment filter: 'Professional Creators' | 'Gamers' | 'Business Professionals' | 'Home Users'"
          ),
        tier: z
          .string()
          .optional()
          .describe("Tier filter: 'bronze' | 'silver' | 'gold' | 'platinum'"),
        limit: z.number().optional().describe("Maximum results (default 10)"),
      }),
    },
    async (input) => ({ content: [{ type: "text", text: handleGetCustomers(input) }] })
  );

  server.registerTool(
    "get_customer_profile",
    {
      description:
        "Get the full profile for a specific TechStore Pro customer by ID or name. " +
        "Returns customer details, preferences, order history, and lifetime value. " +
        "After getting results, use generate_screen with a header for the customer name, " +
        "details_data for profile info, and a line_chart for spending over time.",
      inputSchema: z.object({
        customer_id: z.string().describe("Customer ID (e.g. 'cust-001') or name (partial match)"),
      }),
    },
    async (input) => ({ content: [{ type: "text", text: handleGetCustomerProfile(input) }] })
  );
}

// ============================================================================
// HANDLERS
// ============================================================================

function handleGetCustomers(input: Record<string, unknown>): string {
  let results = [...CUSTOMERS];

  if (input.query && typeof input.query === "string") {
    const q = input.query.toLowerCase();
    results = results.filter(
      (c) => c.name.toLowerCase().includes(q) || c.email.toLowerCase().includes(q)
    );
  }

  if (input.segment && typeof input.segment === "string") {
    const seg = (input.segment as string).toLowerCase();
    results = results.filter((c) => c.segment.toLowerCase().includes(seg));
  }

  if (input.tier && typeof input.tier === "string") {
    results = results.filter((c) => c.tier === input.tier);
  }

  const limit = typeof input.limit === "number" ? input.limit : 10;
  results = results.slice(0, limit);

  return JSON.stringify({
    total: results.length,
    customers: results.map((c) => ({
      id: c.id,
      name: c.name,
      email: c.email,
      segment: c.segment,
      tier: c.tier,
      totalOrders: c.totalOrders,
      totalSpent: c.totalSpent,
      lastOrderDate: c.lastOrderDate,
      status: c.status,
      address: c.address,
    })),
  });
}

function handleGetCustomerProfile(input: Record<string, unknown>): string {
  const id = input.customer_id as string;
  const customer = CUSTOMERS.find(
    (c) => c.id === id || c.name.toLowerCase().includes(id.toLowerCase())
  );

  if (!customer) {
    return JSON.stringify({ error: `Customer not found: ${id}` });
  }

  const customerOrders = ORDERS.filter((o) => o.customerId === customer.id);

  return JSON.stringify({
    customer: {
      ...customer,
      orders: customerOrders.map((o) => ({
        orderNumber: o.orderNumber,
        status: o.status,
        total: o.total,
        itemCount: o.items.length,
        orderDate: o.orderDate,
      })),
      lifetimeValue: customer.totalSpent,
      avgOrderValue:
        customer.totalOrders > 0 ? Math.round(customer.totalSpent / customer.totalOrders) : 0,
    },
  });
}
