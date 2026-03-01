import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { COMPONENTS } from "../data/components.js";
import { SCENARIOS } from "../data/scenarios.js";

export function registerComponentTools(server: McpServer): void {
  server.registerTool(
    "browse_components",
    {
      description:
        "Browse BranderUX's 15 built-in UI component types (plus Custom Elements coming soon). " +
        "Filter by category, status, or search by name. Returns component cards with popularity, " +
        "usage stats, and example queries. " +
        "After getting results, use generate_screen with item_grid element type to display components " +
        "as a visual catalog, and optionally a stats_grid for summary metrics.",
      inputSchema: z.object({
        query: z
          .string()
          .optional()
          .describe("Search text to match against component name or description"),
        category: z
          .string()
          .optional()
          .describe(
            "Category filter: 'Structure & Navigation' | 'Data & Analytics' | 'Content & Media' | 'User Interaction' | 'Communication' | 'Customization'"
          ),
        status: z
          .string()
          .optional()
          .describe("Status filter: 'stable' | 'beta' | 'new' | 'coming-soon'"),
        limit: z.number().optional().describe("Maximum results to return (default 15)"),
      }),
    },
    async (input) => ({ content: [{ type: "text", text: handleBrowseComponents(input) }] })
  );

  server.registerTool(
    "get_component_details",
    {
      description:
        "Get detailed information about a specific BranderUX UI component by ID or name. " +
        "Returns full component data including props, use cases, and usage statistics. " +
        "Also shows which example scenarios use this component. " +
        "After getting results, use generate_screen with a header for the component name, " +
        "a details_data element for props and configuration, " +
        "a chat_bubble for the description and use case explanation, " +
        "and an alert element if the component is in beta or coming-soon status.",
      inputSchema: z.object({
        component_id: z
          .string()
          .describe(
            "Component ID (e.g. 'comp-header') or name (e.g. 'Header', 'DataTable', 'StatsGrid')"
          ),
      }),
    },
    async (input) => ({ content: [{ type: "text", text: handleGetComponentDetails(input) }] })
  );
}

// ============================================================================
// HANDLERS
// ============================================================================

function handleBrowseComponents(input: Record<string, unknown>): string {
  let results = [...COMPONENTS];

  if (input.query && typeof input.query === "string") {
    const q = input.query.toLowerCase();
    results = results.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q) ||
        c.elementType.toLowerCase().includes(q)
    );
  }

  if (input.category && typeof input.category === "string") {
    const cat = input.category.toLowerCase();
    results = results.filter((c) => c.category.toLowerCase().includes(cat));
  }

  if (input.status && typeof input.status === "string") {
    results = results.filter((c) => c.status === input.status);
  }

  const limit = typeof input.limit === "number" ? input.limit : 15;
  results = results.slice(0, limit);

  const stableCount = COMPONENTS.filter((c) => c.status === "stable").length;
  const totalUsage = COMPONENTS.reduce((sum, c) => sum + c.usageCount, 0);

  return JSON.stringify({
    total: results.length,
    summary: {
      totalComponents: COMPONENTS.length,
      stableComponents: stableCount,
      totalMonthlyUsage: totalUsage,
      mostPopular: COMPONENTS.reduce((a, b) =>
        a.popularityScore > b.popularityScore ? a : b
      ).name,
    },
    components: results.map((c) => ({
      id: c.id,
      name: c.name,
      elementType: c.elementType,
      category: c.category,
      description: c.description,
      popularityScore: c.popularityScore,
      usageCount: c.usageCount,
      status: c.status,
      bestFor: c.bestFor,
      exampleQuery: c.exampleQuery,
    })),
  });
}

function handleGetComponentDetails(input: Record<string, unknown>): string {
  const id = input.component_id as string;
  const component = COMPONENTS.find(
    (c) =>
      c.id === id ||
      c.name.toLowerCase() === id.toLowerCase() ||
      c.elementType === id.toLowerCase() ||
      c.name.toLowerCase().includes(id.toLowerCase())
  );

  if (!component) {
    return JSON.stringify({ error: `Component not found: ${id}` });
  }

  // Find scenarios that use this component
  const relatedScenarios = SCENARIOS.filter((s) =>
    s.componentsUsed.includes(component.elementType)
  ).map((s) => ({
    id: s.id,
    name: s.name,
    industry: s.industry,
    integrationMethod: s.integrationMethod,
  }));

  return JSON.stringify({
    component: {
      ...component,
      relatedScenarios,
      scenarioCount: relatedScenarios.length,
    },
  });
}
