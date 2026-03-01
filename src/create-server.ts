import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { registerBranderTools } from "@brander/mcp-tools";
import { registerComponentTools } from "./tools/component-tools.js";
import { registerScenarioTools } from "./tools/scenario-tools.js";
import { registerCapabilityTools } from "./tools/capability-tools.js";
import { registerPlatformTools } from "./tools/platform-tools.js";

export async function createServer(): Promise<McpServer> {
  const server = new McpServer({
    name: "branderux-demo",
    version: "1.0.0",
  });

  registerComponentTools(server);
  registerScenarioTools(server);
  registerCapabilityTools(server);
  registerPlatformTools(server);

  await registerBranderTools(server, {
    projectId: process.env.BRANDER_PROJECT_ID!,
    betaKey: process.env.BRANDER_BETA_KEY!,
    ...(process.env.BRANDER_API_BASE_URL && { apiBaseUrl: process.env.BRANDER_API_BASE_URL }),
  });

  return server;
}
