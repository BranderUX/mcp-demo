import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { getElementSummary, getElementDetail, getElementsByCategory } from "../data/elements.js";

export function registerElementShowcaseTool(server: McpServer): void {
  server.registerTool(
    "explore_elements",
    {
      description:
        "Explore BranderUX's 15 built-in interactive element types. Returns element descriptions, " +
        "use cases, and realistic sample data that can be passed directly to generate_screen to " +
        "demonstrate each element live. Use without parameters to see all elements, specify an " +
        "element_type for full details with renderable sample data, or filter by category.",
      inputSchema: z.object({
        element_type: z
          .string()
          .optional()
          .describe(
            "Specific element to explore: 'header', 'stats-grid', 'data-table', 'line-chart', " +
            "'pie-chart', 'bar-chart', 'item-grid', 'item-card', 'image', 'video', " +
            "'details-data', 'chat-bubble', 'form', 'button', 'alert'. " +
            "Omit to get a summary of all elements."
          ),
        category: z
          .string()
          .optional()
          .describe(
            "Filter by category: 'Data Visualization' (charts), 'Data Display' (tables, grids), " +
            "'Content & Media' (image, video, chat), 'User Interaction' (form, button, alert), 'Layout' (header). " +
            "Ignored if element_type is provided."
          ),
      }),
    },
    async (input) => {
      let result: Record<string, unknown>;

      if (input.element_type) {
        const detail = getElementDetail(input.element_type);
        if (!detail) {
          result = {
            error: `Unknown element type: ${input.element_type}`,
            availableTypes: [
              "header", "stats-grid", "data-table", "line-chart", "pie-chart",
              "bar-chart", "item-grid", "item-card", "image", "video",
              "details-data", "chat-bubble", "form", "button", "alert",
            ],
          };
        } else {
          result = detail;
        }
      } else if (input.category) {
        const categoryResult = getElementsByCategory(input.category);
        if (!categoryResult) {
          result = {
            error: `Unknown category: ${input.category}`,
            availableCategories: ["Data Visualization", "Data Display", "Content & Media", "User Interaction", "Layout"],
          };
        } else {
          result = categoryResult;
        }
      } else {
        result = getElementSummary();
      }

      return {
        content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
      };
    }
  );
}
