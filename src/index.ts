#!/usr/bin/env node

/**
 * BranderUX Demo — MCP Integration Showcase
 *
 * This demo showcases BranderUX's capabilities by using BranderUX itself.
 * It provides tools to explore components, integration methods, AI capabilities,
 * example scenarios, and platform analytics — all rendered with branded UI.
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
 *     "branderux-demo": {
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
import { registerComponentTools } from "./tools/component-tools.js";
import { registerScenarioTools } from "./tools/scenario-tools.js";
import { registerCapabilityTools } from "./tools/capability-tools.js";
import { registerPlatformTools } from "./tools/platform-tools.js";

const server = new McpServer({
  name: "branderux-demo",
  version: "1.0.0",
});

// ─── BranderUX Demo tools ───────────────────────────────────────────────────
registerComponentTools(server);   // browse_components, get_component_details
registerScenarioTools(server);    // browse_scenarios, get_scenario_details
registerCapabilityTools(server);  // get_integration_guide, explore_ai_capabilities
registerPlatformTools(server);    // get_platform_analytics, get_feature_overview

// ─── BranderUX: one-liner adds branded UI rendering to all 14 element types ──
await registerBranderTools(server, {
  projectId: process.env.BRANDER_PROJECT_ID!,
  betaKey: process.env.BRANDER_BETA_KEY!,
  ...(process.env.BRANDER_API_BASE_URL && { apiBaseUrl: process.env.BRANDER_API_BASE_URL }),
});

// ─── Connect ──────────────────────────────────────────────────────────────────
const transport = new StdioServerTransport();
await server.connect(transport);
