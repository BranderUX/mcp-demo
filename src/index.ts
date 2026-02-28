#!/usr/bin/env node

/**
 * TechStore Pro — BranderUX MCP Integration Demo
 *
 * This is a reference implementation showing exactly how a customer would add
 * BranderUX branded UI rendering to their own MCP server.
 *
 * Integration pattern:
 *   1. Create an McpServer
 *   2. Register your own business tools
 *   3. Call registerBranderTools() — one line, done
 *   4. Connect stdio transport
 *
 * Claude Desktop config:
 * {
 *   "mcpServers": {
 *     "techstore-pro": {
 *       "command": "node",
 *       "args": ["/path/to/brander-mcp-demo/dist/index.js"],
 *       "env": {
 *         "BRANDER_PROJECT_ID": "your_project_id",
 *         "BRANDER_BETA_KEY": "bux_dp_your_key"
 *       }
 *     }
 *   }
 * }
 */

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { registerBranderTools } from "@brander/mcp-tools";
import { registerProductTools } from "./tools/product-tools.js";
import { registerOrderTools } from "./tools/order-tools.js";
import { registerCustomerTools } from "./tools/customer-tools.js";
import { registerAnalyticsTools } from "./tools/analytics-tools.js";

const server = new McpServer({
  name: "techstore-pro",
  version: "1.0.0",
});

// ─── TechStore Pro business tools ────────────────────────────────────────────
registerProductTools(server); // search_products, get_product_details
registerOrderTools(server); // get_orders, get_order_details
registerCustomerTools(server); // get_customers, get_customer_profile
registerAnalyticsTools(server); // get_analytics_summary, get_inventory_status

// ─── BranderUX: one-liner adds branded UI rendering to all 14 element types ──
await registerBranderTools(server, {
  projectId: process.env.BRANDER_PROJECT_ID!,
  betaKey: process.env.BRANDER_BETA_KEY!,
  ...(process.env.BRANDER_API_BASE_URL && { apiBaseUrl: process.env.BRANDER_API_BASE_URL }),
});

// ─── Connect ──────────────────────────────────────────────────────────────────
const transport = new StdioServerTransport();
await server.connect(transport);
