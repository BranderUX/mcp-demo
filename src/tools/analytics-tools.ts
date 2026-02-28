import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { ANALYTICS_DATA, getInventoryStatus } from "../data/analytics.js";

export function registerAnalyticsTools(server: McpServer): void {
  server.registerTool(
    "get_analytics_summary",
    {
      description:
        "Get sales and revenue analytics for TechStore Pro. Returns revenue totals, order counts, " +
        "top products, category breakdown, and monthly revenue trends. " +
        "After getting results, use generate_screen with: a header for the period, " +
        "stats_grid for key metrics (revenue, orders, avg order value), " +
        "line_chart for monthly revenue trend, and pie_chart for category breakdown.",
      inputSchema: z.object({
        period: z
          .string()
          .optional()
          .describe("Time period description (e.g. 'Q4 2025'). Defaults to Q4 2025."),
        metric: z
          .string()
          .optional()
          .describe(
            "Focus on a specific metric: 'revenue' | 'orders' | 'products' | 'categories' | 'trends'"
          ),
      }),
    },
    async (input) => ({ content: [{ type: "text", text: handleGetAnalyticsSummary(input) }] })
  );

  server.registerTool(
    "get_inventory_status",
    {
      description:
        "Get current inventory/stock levels for TechStore Pro products. " +
        "Returns stock counts, reorder points, and low-stock alerts by category or status. " +
        "After getting results, use generate_screen with a data_table element for the full inventory list, " +
        "and an alert element for any critical or out-of-stock items.",
      inputSchema: z.object({
        category: z
          .string()
          .optional()
          .describe(
            "Category filter: 'Laptops & Computers' | 'Audio Equipment' | 'Smart Home' | 'Gaming Peripherals'"
          ),
        status: z
          .string()
          .optional()
          .describe("Status filter: 'healthy' | 'low' | 'critical' | 'out_of_stock'"),
      }),
    },
    async (input) => ({ content: [{ type: "text", text: handleGetInventoryStatus(input) }] })
  );
}

// ============================================================================
// HANDLERS
// ============================================================================

function handleGetAnalyticsSummary(input: Record<string, unknown>): string {
  const data = { ...ANALYTICS_DATA };

  if (input.metric && typeof input.metric === "string") {
    const metric = input.metric.toLowerCase();
    if (metric === "revenue") {
      return JSON.stringify({
        period: data.period,
        revenue: data.revenue,
        monthlyTrend: data.monthlyTrend,
      });
    }
    if (metric === "orders") {
      return JSON.stringify({
        period: data.period,
        orders: data.orders,
        avgOrderValue: data.avgOrderValue,
        monthlyTrend: data.monthlyTrend,
      });
    }
    if (metric === "products") {
      return JSON.stringify({ period: data.period, topProducts: data.topProducts });
    }
    if (metric === "categories") {
      return JSON.stringify({ period: data.period, categoryBreakdown: data.categoryBreakdown });
    }
    if (metric === "trends") {
      return JSON.stringify({ period: data.period, monthlyTrend: data.monthlyTrend });
    }
  }

  return JSON.stringify(data);
}

function handleGetInventoryStatus(input: Record<string, unknown>): string {
  let inventory = getInventoryStatus();

  if (input.category && typeof input.category === "string") {
    const cat = (input.category as string).toLowerCase();
    inventory = inventory.filter((i) => i.category.toLowerCase().includes(cat));
  }

  if (input.status && typeof input.status === "string") {
    inventory = inventory.filter((i) => i.status === input.status);
  }

  const totalItems = inventory.reduce((sum, i) => sum + i.currentStock, 0);
  const lowStockCount = inventory.filter(
    (i) => i.status === "low" || i.status === "critical"
  ).length;
  const outOfStockCount = inventory.filter((i) => i.status === "out_of_stock").length;

  return JSON.stringify({
    summary: {
      totalProducts: inventory.length,
      totalItems,
      lowStockAlerts: lowStockCount,
      outOfStock: outOfStockCount,
    },
    inventory: inventory.map((i) => ({
      productId: i.productId,
      productName: i.productName,
      sku: i.sku,
      category: i.category,
      currentStock: i.currentStock,
      reorderPoint: i.reorderPoint,
      status: i.status,
      supplierLeadDays: i.supplierLeadDays,
    })),
  });
}
