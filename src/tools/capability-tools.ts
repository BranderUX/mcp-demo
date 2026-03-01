import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { INTEGRATION_METHODS, AI_CAPABILITIES } from "../data/integrations.js";

export function registerCapabilityTools(server: McpServer): void {
  server.registerTool(
    "get_integration_guide",
    {
      description:
        "Get the integration guide for a specific BranderUX deployment method: SDK, MCP, or Embed. " +
        "Returns step-by-step setup instructions, code examples, features, and requirements. " +
        "After getting results, use generate_screen with a header for the integration method, " +
        "details_data for setup steps and features, " +
        "a form element for 'Get Started' configuration, " +
        "a button element linking to documentation, " +
        "and an alert element for any prerequisites or limitations.",
      inputSchema: z.object({
        method: z
          .string()
          .describe("Integration method: 'sdk' | 'mcp' | 'embed'"),
      }),
    },
    async (input) => ({ content: [{ type: "text", text: handleGetIntegrationGuide(input) }] })
  );

  server.registerTool(
    "explore_ai_capabilities",
    {
      description:
        "Explore BranderUX's AI capabilities: screen selection, query enhancement, AG-UI streaming, " +
        "multi-provider support, click-to-query interactions, and A2UI flexible mode. " +
        "Filter by category or status. " +
        "After getting results, use generate_screen with a data_table element showing all capabilities, " +
        "an item_grid for visual capability cards, " +
        "and a chat_bubble summarizing how BranderUX's AI works.",
      inputSchema: z.object({
        category: z
          .string()
          .optional()
          .describe(
            "Category filter: 'Core AI' | 'Streaming' | 'Compatibility' | 'Interactivity' | 'Advanced'"
          ),
        status: z
          .string()
          .optional()
          .describe("Status filter: 'ga' | 'beta' | 'coming-soon'"),
      }),
    },
    async (input) => ({ content: [{ type: "text", text: handleExploreAICapabilities(input) }] })
  );
}

// ============================================================================
// HANDLERS
// ============================================================================

function handleGetIntegrationGuide(input: Record<string, unknown>): string {
  const method = (input.method as string).toLowerCase();
  const integration = INTEGRATION_METHODS.find(
    (m) => m.slug === method || m.name.toLowerCase() === method
  );

  if (!integration) {
    return JSON.stringify({
      error: `Integration method not found: ${method}. Available: sdk, mcp, embed`,
      available: INTEGRATION_METHODS.map((m) => ({
        slug: m.slug,
        name: m.name,
        tagline: m.tagline,
      })),
    });
  }

  // Also return a summary of all methods for comparison
  const otherMethods = INTEGRATION_METHODS.filter((m) => m.slug !== integration.slug).map(
    (m) => ({
      name: m.name,
      slug: m.slug,
      tagline: m.tagline,
      setupTime: m.setupTime,
      adoptionRate: `${m.adoptionRate}%`,
    })
  );

  return JSON.stringify({
    integration: {
      ...integration,
      adoptionRate: `${integration.adoptionRate}%`,
    },
    otherMethods,
  });
}

function handleExploreAICapabilities(input: Record<string, unknown>): string {
  let results = [...AI_CAPABILITIES];

  if (input.category && typeof input.category === "string") {
    const cat = input.category.toLowerCase();
    results = results.filter((c) => c.category.toLowerCase().includes(cat));
  }

  if (input.status && typeof input.status === "string") {
    results = results.filter((c) => c.status === input.status);
  }

  const gaCount = AI_CAPABILITIES.filter((c) => c.status === "ga").length;
  const betaCount = AI_CAPABILITIES.filter((c) => c.status === "beta").length;

  return JSON.stringify({
    total: results.length,
    summary: {
      totalCapabilities: AI_CAPABILITIES.length,
      generallyAvailable: gaCount,
      inBeta: betaCount,
      categories: [...new Set(AI_CAPABILITIES.map((c) => c.category))],
    },
    capabilities: results.map((c) => ({
      id: c.id,
      name: c.name,
      category: c.category,
      description: c.description,
      howItWorks: c.howItWorks,
      technicalDetail: c.technicalDetail,
      status: c.status,
    })),
  });
}
