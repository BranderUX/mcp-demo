#!/usr/bin/env node

/**
 * BranderUX Demo — MCP Integration Showcase (stdio transport)
 *
 * For local use with Claude Desktop. See api/mcp.ts for the HTTP transport (Vercel).
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

import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { createServer } from "./create-server.js";

const server = await createServer();
const transport = new StdioServerTransport();
await server.connect(transport);
