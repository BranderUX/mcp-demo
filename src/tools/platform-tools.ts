import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { PLATFORM_ANALYTICS, PLATFORM_FEATURES } from "../data/platform-analytics.js";

export function registerPlatformTools(server: McpServer): void {
  server.registerTool(
    "get_platform_analytics",
    {
      description:
        "Get BranderUX platform analytics and performance metrics. Returns project counts, " +
        "API performance, component popularity, integration method breakdown, and growth trends. " +
        "After getting results, use generate_screen with: a header for the period, " +
        "stats_grid for key metrics (active projects, screen generations, avg response time, uptime), " +
        "line_chart for monthly growth trend, " +
        "pie_chart for integration method or AI provider breakdown, " +
        "and bar_chart for component popularity ranking.",
      inputSchema: z.object({
        period: z
          .string()
          .optional()
          .describe("Time period (e.g. 'Q1 2026'). Defaults to Q1 2026."),
        metric: z
          .string()
          .optional()
          .describe(
            "Focus on a specific metric: 'overview' | 'growth' | 'components' | 'integrations' | 'providers' | 'screens'"
          ),
      }),
    },
    async (input) => ({
      content: [{ type: "text", text: handleGetPlatformAnalytics(input) }],
    })
  );

  server.registerTool(
    "get_feature_overview",
    {
      description:
        "Get an overview of BranderUX platform features and capabilities. " +
        "Filter by category or status. Returns feature descriptions with availability. " +
        "After getting results, use generate_screen with a header for 'BranderUX Platform', " +
        "an item_grid showing features as cards, " +
        "a stats_grid for capability highlights (total features, GA count, highlights), " +
        "and a chat_bubble summarizing the platform's value proposition.",
      inputSchema: z.object({
        category: z
          .string()
          .optional()
          .describe(
            "Category filter: 'Core' | 'AI' | 'Customization' | 'Developer'"
          ),
        status: z
          .string()
          .optional()
          .describe("Status filter: 'ga' | 'beta' | 'coming-soon'"),
      }),
    },
    async (input) => ({
      content: [{ type: "text", text: handleGetFeatureOverview(input) }],
    })
  );
}

// ============================================================================
// HANDLERS
// ============================================================================

function handleGetPlatformAnalytics(input: Record<string, unknown>): string {
  const data = PLATFORM_ANALYTICS;

  if (input.metric && typeof input.metric === "string") {
    const metric = input.metric.toLowerCase();
    if (metric === "overview") {
      return JSON.stringify({ period: data.period, overview: data.overview });
    }
    if (metric === "growth") {
      return JSON.stringify({ period: data.period, monthlyGrowth: data.monthlyGrowth });
    }
    if (metric === "components") {
      return JSON.stringify({
        period: data.period,
        componentPopularity: data.componentPopularity,
      });
    }
    if (metric === "integrations") {
      return JSON.stringify({
        period: data.period,
        integrationBreakdown: data.integrationBreakdown,
      });
    }
    if (metric === "providers") {
      return JSON.stringify({
        period: data.period,
        aiProviderBreakdown: data.aiProviderBreakdown,
      });
    }
    if (metric === "screens") {
      return JSON.stringify({
        period: data.period,
        screenTypeUsage: data.screenTypeUsage,
      });
    }
  }

  // Return all analytics
  return JSON.stringify(data);
}

function handleGetFeatureOverview(input: Record<string, unknown>): string {
  let results = [...PLATFORM_FEATURES];

  if (input.category && typeof input.category === "string") {
    const cat = input.category.toLowerCase();
    results = results.filter((f) => f.category.toLowerCase().includes(cat));
  }

  if (input.status && typeof input.status === "string") {
    results = results.filter((f) => f.status === input.status);
  }

  const gaCount = PLATFORM_FEATURES.filter((f) => f.status === "ga").length;
  const betaCount = PLATFORM_FEATURES.filter((f) => f.status === "beta").length;
  const comingSoonCount = PLATFORM_FEATURES.filter((f) => f.status === "coming-soon").length;
  const highlightCount = PLATFORM_FEATURES.filter((f) => f.highlight).length;

  return JSON.stringify({
    total: results.length,
    summary: {
      totalFeatures: PLATFORM_FEATURES.length,
      generallyAvailable: gaCount,
      inBeta: betaCount,
      comingSoon: comingSoonCount,
      highlights: highlightCount,
      categories: [...new Set(PLATFORM_FEATURES.map((f) => f.category))],
    },
    valueProposition:
      "BranderUX is an AI-UX middleware platform that transforms AI responses into branded, " +
      "interactive UI components. Instead of plain text, your users see dashboards, charts, " +
      "tables, and forms — all in your brand, all clickable, all streaming in real-time. " +
      "Integrate with one line of code. Works with Claude, GPT, and Gemini.",
    features: results.map((f) => ({
      id: f.id,
      name: f.name,
      category: f.category,
      description: f.description,
      status: f.status,
      highlight: f.highlight,
    })),
  });
}
