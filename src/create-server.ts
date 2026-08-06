import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { registerBranderTools } from "@brander/mcp-tools";
import { registerPlatformOverviewTool } from "./tools/platform-overview.js";
import { registerElementShowcaseTool } from "./tools/element-showcase.js";
import { registerDemoScenarioTool } from "./tools/demo-scenarios.js";
import { registerIntegrationGuideTool } from "./tools/integration-guide.js";

export async function createServer(): Promise<McpServer> {
  const server = new McpServer({
    name: "branderux-demo",
    version: "2.0.0",
  });

  // Demo knowledge tools (4 tools)
  registerPlatformOverviewTool(server);
  registerElementShowcaseTool(server);
  registerDemoScenarioTool(server);
  registerIntegrationGuideTool(server);

  // BranderUX rendering engine (generate_screen tool)
  await registerBranderTools(server, {
    projectId: process.env.BRANDER_PROJECT_ID!,
    // BRANDER_API_KEY is the per-project bux_pk_ key; BRANDER_BETA_KEY kept as a
    // fallback so existing Claude Desktop configs keep working until updated.
    // (BRANDER_API_BASE_URL is read by mcp-tools itself — team-internal override.)
    apiKey: (process.env.BRANDER_API_KEY ?? process.env.BRANDER_BETA_KEY)!,
  });

  return server;
}
