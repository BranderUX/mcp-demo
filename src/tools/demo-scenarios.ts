import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { getScenarioList, getScenarioDetail, SCENARIOS } from "../data/scenarios.js";

export function registerDemoScenarioTool(server: McpServer): void {
  server.registerTool(
    "get_demo_scenario",
    {
      description:
        "Get ready-to-render demo scenarios showing how BranderUX elements compose into real business screens. " +
        "Each scenario includes a complete array of elements with sample data that can be passed directly " +
        "to generate_screen. Includes both generic business demos (dashboards, catalogs) and BranderUX " +
        "self-referential showcases (platform overview, element library, integration comparison). " +
        "Omit the scenario parameter to list all available scenarios.",
      inputSchema: z.object({
        scenario: z
          .string()
          .optional()
          .describe(
            "Scenario to retrieve: 'sales-dashboard', 'product-catalog', 'branderux-overview', " +
            "'element-showcase', 'integration-comparison', 'analytics-report'. " +
            "Omit to list all available scenarios with descriptions."
          ),
      }),
    },
    async (input) => {
      let result: Record<string, unknown>;

      if (!input.scenario) {
        result = getScenarioList();
      } else {
        const detail = getScenarioDetail(input.scenario);
        if (!detail) {
          result = {
            error: `Unknown scenario: ${input.scenario}`,
            availableScenarios: SCENARIOS.map((s) => s.id),
          };
        } else {
          result = detail;
        }
      }

      return {
        content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
      };
    }
  );
}
