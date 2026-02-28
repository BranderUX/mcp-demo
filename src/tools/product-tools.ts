import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { PRODUCTS } from "../data/products.js";
import { ORDERS } from "../data/orders.js";

export function registerProductTools(server: McpServer): void {
  server.registerTool(
    "search_products",
    {
      description:
        "Search the TechStore Pro product catalog. Filter by query (name/description/brand), " +
        "category, or price range. Returns matching products with name, price, stock, and rating. " +
        "After getting results, use generate_screen with item_grid element type to display them " +
        "as a visual product grid, and optionally a stats_grid for summary counts.",
      inputSchema: z.object({
        query: z
          .string()
          .optional()
          .describe("Search text to match against product name, description, or brand"),
        category: z
          .string()
          .optional()
          .describe(
            "Category filter: 'Laptops & Computers' | 'Audio Equipment' | 'Smart Home' | 'Gaming Peripherals'"
          ),
        min_price: z.number().optional().describe("Minimum price filter"),
        max_price: z.number().optional().describe("Maximum price filter"),
        tags: z
          .array(z.string())
          .optional()
          .describe("Filter by tags (e.g. 'gaming', 'wireless', 'premium')"),
        limit: z.number().optional().describe("Maximum results to return (default 10)"),
      }),
    },
    async (input) => ({ content: [{ type: "text", text: handleSearchProducts(input) }] })
  );

  server.registerTool(
    "get_product_details",
    {
      description:
        "Get detailed information about a specific TechStore Pro product by ID or SKU. " +
        "Returns full product data including specs, stock level, and recent orders. " +
        "After getting results, use generate_screen with a header element for the product name, " +
        "a details_data element for specs, and an alert element if stock is low or critical.",
      inputSchema: z.object({
        product_id: z.string().describe("Product ID (e.g. 'prod-001') or SKU (e.g. 'TSP-LAP-001')"),
      }),
    },
    async (input) => ({ content: [{ type: "text", text: handleGetProductDetails(input) }] })
  );
}

// ============================================================================
// HANDLERS
// ============================================================================

function handleSearchProducts(input: Record<string, unknown>): string {
  let results = [...PRODUCTS];

  if (input.query && typeof input.query === "string") {
    const q = input.query.toLowerCase();
    results = results.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q)
    );
  }

  if (input.category && typeof input.category === "string") {
    const cat = input.category.toLowerCase();
    results = results.filter((p) => p.category.toLowerCase().includes(cat));
  }

  if (typeof input.min_price === "number") {
    results = results.filter((p) => p.price >= (input.min_price as number));
  }
  if (typeof input.max_price === "number") {
    results = results.filter((p) => p.price <= (input.max_price as number));
  }

  if (Array.isArray(input.tags)) {
    const tags = (input.tags as string[]).map((t) => t.toLowerCase());
    results = results.filter((p) => tags.some((tag) => p.tags.includes(tag)));
  }

  const limit = typeof input.limit === "number" ? input.limit : 10;
  results = results.slice(0, limit);

  return JSON.stringify({
    total: results.length,
    products: results.map((p) => ({
      id: p.id,
      sku: p.sku,
      name: p.name,
      category: p.category,
      brand: p.brand,
      price: p.price,
      originalPrice: p.originalPrice,
      stock: p.stock,
      rating: p.rating,
      reviewCount: p.reviewCount,
      image: p.image,
      status: p.status,
      description: p.description,
      tags: p.tags,
    })),
  });
}

function handleGetProductDetails(input: Record<string, unknown>): string {
  const id = input.product_id as string;
  const product = PRODUCTS.find(
    (p) => p.id === id || p.sku === id || p.name.toLowerCase().includes(id.toLowerCase())
  );

  if (!product) {
    return JSON.stringify({ error: `Product not found: ${id}` });
  }

  const relatedOrders = ORDERS.filter((o) =>
    o.items.some((item) => item.productId === product.id)
  ).slice(0, 5);

  return JSON.stringify({
    product: {
      ...product,
      recentOrders: relatedOrders.map((o) => ({
        orderNumber: o.orderNumber,
        customerName: o.customerName,
        quantity: o.items.find((i) => i.productId === product.id)?.quantity,
        date: o.orderDate,
        status: o.status,
      })),
    },
  });
}
