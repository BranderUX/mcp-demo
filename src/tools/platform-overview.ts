import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { getPlatformData } from "../data/platform.js";

export function registerPlatformOverviewTool(server: McpServer): void {
  server.registerTool(
    "learn_about_branderux",
    {
      description:
        "Get a comprehensive overview of the BranderUX platform — the AI-UX middleware that transforms " +
        "AI responses into branded, interactive UI. Returns the product description, value proposition, " +
        "integration methods (SDK, MCP Tools, Embed), UI generation modes (Fixed Screens, A2UI, MCP App), " +
        "AI features (streaming, click-to-query, multi-provider), and no-code capabilities. " +
        "Call this first to understand what BranderUX is before demonstrating elements.",
      inputSchema: z.object({
        topic: z
          .enum(["overview", "integration", "modes", "ai-features", "no-code"])
          .optional()
          .describe(
            "Optional focus area. 'overview' returns everything (default). " +
            "'integration' focuses on SDK/MCP/Embed methods. " +
            "'modes' explains Fixed Screens vs A2UI vs MCP App. " +
            "'ai-features' details screen selection, streaming, click-to-query, brand generation. " +
            "'no-code' explains the PM-driven workflow and dashboard capabilities."
          ),
      }),
    },
    async (input) => ({
      content: [{ type: "text", text: JSON.stringify(getPlatformData(input.topic), null, 2) }],
    })
  );
}
