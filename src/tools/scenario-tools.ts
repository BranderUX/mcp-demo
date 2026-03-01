import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { SCENARIOS } from "../data/scenarios.js";
import { COMPONENTS } from "../data/components.js";

export function registerScenarioTools(server: McpServer): void {
  server.registerTool(
    "browse_scenarios",
    {
      description:
        "Browse example implementation scenarios showing what you can build with BranderUX. " +
        "Filter by industry, integration method, or AI provider. " +
        "Returns scenario summaries with components used and expected performance metrics. " +
        "After getting results, use generate_screen with a data_table element to display scenarios " +
        "in a sortable table, and optionally a stats_grid for aggregate metrics.",
      inputSchema: z.object({
        industry: z
          .string()
          .optional()
          .describe(
            "Industry filter (e.g. 'Fintech', 'Healthcare', 'E-commerce', 'Education', 'Insurance')"
          ),
        integration_method: z
          .string()
          .optional()
          .describe("Integration method filter: 'SDK' | 'MCP' | 'Embed'"),
        ai_provider: z
          .string()
          .optional()
          .describe("AI provider filter: 'Anthropic' | 'OpenAI' | 'Google'"),
        limit: z.number().optional().describe("Maximum results (default 10)"),
      }),
    },
    async (input) => ({ content: [{ type: "text", text: handleBrowseScenarios(input) }] })
  );

  server.registerTool(
    "get_scenario_details",
    {
      description:
        "Get detailed information about a specific BranderUX implementation scenario by ID or name. " +
        "Returns full scenario details including components used, screen configurations, " +
        "and expected performance improvements. " +
        "After getting results, use generate_screen with a header for the scenario name, " +
        "details_data for implementation details and metrics, " +
        "a bar_chart comparing expected before/after performance improvements, " +
        "and item_card elements for each component used in the scenario.",
      inputSchema: z.object({
        scenario_id: z
          .string()
          .describe(
            "Scenario ID (e.g. 'sc-001') or name (e.g. 'Fintech Transaction Dashboard')"
          ),
      }),
    },
    async (input) => ({ content: [{ type: "text", text: handleGetScenarioDetails(input) }] })
  );
}

// ============================================================================
// HANDLERS
// ============================================================================

function handleBrowseScenarios(input: Record<string, unknown>): string {
  let results = [...SCENARIOS];

  if (input.industry && typeof input.industry === "string") {
    const industry = input.industry.toLowerCase();
    results = results.filter((s) => s.industry.toLowerCase().includes(industry));
  }

  if (input.integration_method && typeof input.integration_method === "string") {
    const method = input.integration_method.toUpperCase();
    results = results.filter((s) => s.integrationMethod === method);
  }

  if (input.ai_provider && typeof input.ai_provider === "string") {
    const provider = input.ai_provider.toLowerCase();
    results = results.filter((s) => s.aiProvider.toLowerCase().includes(provider));
  }

  const limit = typeof input.limit === "number" ? input.limit : 10;

  // Sort by engagement lift descending
  results.sort((a, b) => b.expectedResults.engagementLift - a.expectedResults.engagementLift);
  results = results.slice(0, limit);

  const avgEngagement =
    SCENARIOS.reduce((sum, s) => sum + s.expectedResults.engagementLift, 0) / SCENARIOS.length;
  const avgResponseTime =
    SCENARIOS.reduce((sum, s) => sum + s.expectedResults.responseTimeMs, 0) / SCENARIOS.length;

  return JSON.stringify({
    total: results.length,
    summary: {
      totalScenarios: SCENARIOS.length,
      avgEngagementLift: `${Math.round(avgEngagement)}%`,
      avgResponseTime: `${Math.round(avgResponseTime)}ms`,
      industries: [...new Set(SCENARIOS.map((s) => s.industry))],
    },
    scenarios: results.map((s) => ({
      id: s.id,
      name: s.name,
      industry: s.industry,
      integrationMethod: s.integrationMethod,
      aiProvider: s.aiProvider,
      componentsUsed: s.componentsUsed,
      screensConfigured: s.screensConfigured,
      engagementLift: `${s.expectedResults.engagementLift}%`,
      responseTimeMs: s.expectedResults.responseTimeMs,
      satisfaction: s.expectedResults.userSatisfaction,
      monthlyInteractions: s.expectedResults.monthlyInteractions,
      tags: s.tags,
    })),
  });
}

function handleGetScenarioDetails(input: Record<string, unknown>): string {
  const id = input.scenario_id as string;
  const scenario = SCENARIOS.find(
    (s) =>
      s.id === id ||
      s.name.toLowerCase().includes(id.toLowerCase())
  );

  if (!scenario) {
    return JSON.stringify({ error: `Scenario not found: ${id}` });
  }

  // Enrich with component details
  const componentDetails = scenario.componentsUsed
    .map((elementType) => COMPONENTS.find((c) => c.elementType === elementType))
    .filter(Boolean)
    .map((c) => ({
      name: c!.name,
      elementType: c!.elementType,
      category: c!.category,
      description: c!.description,
    }));

  return JSON.stringify({
    scenario: {
      ...scenario,
      componentDetails,
      componentCount: componentDetails.length,
    },
  });
}
