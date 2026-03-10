import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { getIntegrationData } from "../data/integrations.js";

export function registerIntegrationGuideTool(server: McpServer): void {
  server.registerTool(
    "get_integration_guide",
    {
      description:
        "Get step-by-step integration guide for adding BranderUX to your application. " +
        "Returns real code examples, setup instructions, requirements, and feature lists. " +
        "Three methods: SDK (React component), MCP Tools (MCP server library), Embed (iframe). " +
        "Use 'compare' to see all three side-by-side.",
      inputSchema: z.object({
        method: z
          .enum(["sdk", "mcp", "embed", "compare"])
          .describe(
            "'sdk' for React/Next.js apps with full AI streaming. " +
            "'mcp' for MCP servers (Claude Desktop, Claude.ai, ChatGPT). " +
            "'embed' for any web app with zero dependencies. " +
            "'compare' for a side-by-side comparison of all three methods."
          ),
      }),
    },
    async (input) => ({
      content: [{ type: "text", text: JSON.stringify(getIntegrationData(input.method), null, 2) }],
    })
  );
}
