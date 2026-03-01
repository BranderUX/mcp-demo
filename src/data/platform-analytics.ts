// ============================================================================
// BranderUX Demo — Platform Analytics & Features
// ============================================================================

// ============================================================================
// ANALYTICS
// ============================================================================

export interface PlatformAnalytics {
  period: string;
  overview: {
    totalProjects: number;
    monthlyActiveProjects: number;
    totalScreenGenerations: number;
    avgResponseTimeMs: number;
    uptimePercentage: number;
  };
  componentPopularity: Array<{
    component: string;
    elementType: string;
    usageCount: number;
    percentage: number;
  }>;
  integrationBreakdown: Array<{
    method: string;
    count: number;
    percentage: number;
  }>;
  aiProviderBreakdown: Array<{
    provider: string;
    count: number;
    percentage: number;
  }>;
  monthlyGrowth: Array<{
    month: string;
    projects: number;
    screenGenerations: number;
    apiCalls: number;
  }>;
  screenTypeUsage: Array<{
    screenType: string;
    count: number;
    percentage: number;
  }>;
}

export const PLATFORM_ANALYTICS: PlatformAnalytics = {
  period: "Q1 2026",

  overview: {
    totalProjects: 1247,
    monthlyActiveProjects: 834,
    totalScreenGenerations: 2_340_000,
    avgResponseTimeMs: 187,
    uptimePercentage: 99.97,
  },

  componentPopularity: [
    { component: "Header", elementType: "header", usageCount: 45_200, percentage: 19.3 },
    { component: "DataTable", elementType: "data-table", usageCount: 41_300, percentage: 17.6 },
    { component: "ItemGrid", elementType: "item-grid", usageCount: 39_700, percentage: 17.0 },
    { component: "StatsGrid", elementType: "stats-grid", usageCount: 38_400, percentage: 16.4 },
    { component: "DetailsData", elementType: "details-data", usageCount: 35_200, percentage: 15.0 },
    { component: "LineChart", elementType: "line-chart", usageCount: 29_800, percentage: 12.7 },
    { component: "PieChart", elementType: "pie-chart", usageCount: 22_100, percentage: 9.4 },
    { component: "BarChart", elementType: "bar-chart", usageCount: 18_600, percentage: 7.9 },
    { component: "Alert", elementType: "alert", usageCount: 16_900, percentage: 7.2 },
    { component: "Image", elementType: "image", usageCount: 15_400, percentage: 6.6 },
    { component: "Button", elementType: "button", usageCount: 14_300, percentage: 6.1 },
    { component: "ChatBubble", elementType: "chat-bubble", usageCount: 12_800, percentage: 5.5 },
    { component: "Form", elementType: "form", usageCount: 11_200, percentage: 4.8 },
    { component: "ItemCard", elementType: "item-card", usageCount: 28_400, percentage: 12.1 },
  ],

  integrationBreakdown: [
    { method: "SDK", count: 649, percentage: 52 },
    { method: "MCP Tools", count: 387, percentage: 31 },
    { method: "Embed", count: 211, percentage: 17 },
  ],

  aiProviderBreakdown: [
    { provider: "Anthropic (Claude)", count: 561, percentage: 45 },
    { provider: "OpenAI (GPT)", count: 449, percentage: 36 },
    { provider: "Google (Gemini)", count: 237, percentage: 19 },
  ],

  monthlyGrowth: [
    { month: "Aug 2025", projects: 312, screenGenerations: 89_000, apiCalls: 445_000 },
    { month: "Sep 2025", projects: 398, screenGenerations: 142_000, apiCalls: 710_000 },
    { month: "Oct 2025", projects: 487, screenGenerations: 231_000, apiCalls: 1_155_000 },
    { month: "Nov 2025", projects: 589, screenGenerations: 298_000, apiCalls: 1_490_000 },
    { month: "Dec 2025", projects: 712, screenGenerations: 387_000, apiCalls: 1_935_000 },
    { month: "Jan 2026", projects: 834, screenGenerations: 456_000, apiCalls: 2_280_000 },
    { month: "Feb 2026", projects: 923, screenGenerations: 512_000, apiCalls: 2_560_000 },
  ],

  screenTypeUsage: [
    { screenType: "admin-dashboard", count: 31_200, percentage: 28 },
    { screenType: "table", count: 25_800, percentage: 23 },
    { screenType: "analytics", count: 19_400, percentage: 17 },
    { screenType: "details", count: 16_100, percentage: 14 },
    { screenType: "items-catalog", count: 12_700, percentage: 11 },
    { screenType: "text", count: 7_800, percentage: 7 },
  ],
};

// ============================================================================
// PLATFORM FEATURES
// ============================================================================

export interface PlatformFeature {
  id: string;
  name: string;
  category: string;
  description: string;
  status: "ga" | "beta" | "coming-soon";
  highlight: boolean;
}

export const PLATFORM_FEATURES: PlatformFeature[] = [
  {
    id: "feat-elements",
    name: "14 Built-in Element Types",
    category: "Core",
    description:
      "From headers to charts to forms, every AI response is rendered as branded, interactive UI. " +
      "Includes data tables, stat grids, line/pie/bar charts, item grids, cards, images, forms, buttons, alerts, and chat bubbles.",
    status: "ga",
    highlight: true,
  },
  {
    id: "feat-click-to-query",
    name: "Click-to-Query Interactions",
    category: "Core",
    description:
      "Every element is clickable. One click auto-generates a contextual query back to the AI, " +
      "creating a fluid exploration loop. Click a table row → see details. Click a chart segment → see breakdown.",
    status: "ga",
    highlight: true,
  },
  {
    id: "feat-streaming",
    name: "AG-UI Streaming",
    category: "Core",
    description:
      "Progressive rendering via the AG-UI protocol. Elements appear as data streams in, not after. " +
      "Tables show rows as they arrive, charts update with new data points — instant visual feedback.",
    status: "ga",
    highlight: true,
  },
  {
    id: "feat-multi-provider",
    name: "Multi-Provider AI Support",
    category: "AI",
    description:
      "Works with Anthropic Claude, OpenAI GPT, and Google Gemini. Built-in stream adapters normalize " +
      "each provider's format, so you can switch AI providers without changing your UI code.",
    status: "ga",
    highlight: false,
  },
  {
    id: "feat-screen-select",
    name: "Intelligent Screen Selection",
    category: "AI",
    description:
      "BranderUX AI analyzes user queries and automatically selects the best screen layout. " +
      "Scores each screen's fit and picks the optimal combination of elements for every response.",
    status: "ga",
    highlight: false,
  },
  {
    id: "feat-query-enhance",
    name: "Query Enhancement",
    category: "AI",
    description:
      "Automatically enhances user queries with context from available screens and tools. " +
      "Vague questions become precise, tool-optimized prompts — better responses with zero user effort.",
    status: "ga",
    highlight: false,
  },
  {
    id: "feat-brand-studio",
    name: "Brand Studio",
    category: "Customization",
    description:
      "Full brand customization: colors, fonts, logos, border radius, and layout patterns. " +
      "AI can even generate your brand identity from a text description of your company.",
    status: "ga",
    highlight: false,
  },
  {
    id: "feat-screen-builder",
    name: "Screen Builder",
    category: "Customization",
    description:
      "Visual drag-and-drop screen designer. Compose custom screen layouts from the 14 element types " +
      "without writing code. Configure element positions, sizes, and default props.",
    status: "ga",
    highlight: false,
  },
  {
    id: "feat-custom-screens",
    name: "Custom Screens",
    category: "Customization",
    description:
      "Build unlimited custom screen layouts stored in your project. Go beyond the 6 predefined screens " +
      "with layouts tailored to your specific business needs.",
    status: "ga",
    highlight: false,
  },
  {
    id: "feat-custom-elements",
    name: "Custom Elements (Vibe Coding)",
    category: "Customization",
    description:
      "Create your own custom element types using AI-assisted vibe coding. Describe the component you need " +
      "in natural language and BranderUX generates a fully functional, branded element — complete with " +
      "click-to-query, streaming, and brand theming integration.",
    status: "coming-soon",
    highlight: true,
  },
  {
    id: "feat-deterministic",
    name: "Deterministic Mode",
    category: "Developer",
    description:
      "Screen tools with predictable layouts. The AI picks from your configured screens and fills them " +
      "with data. You control exactly which screen types are available and what elements they contain.",
    status: "ga",
    highlight: false,
  },
  {
    id: "feat-a2ui",
    name: "A2UI Flexible Mode",
    category: "Developer",
    description:
      "The AI emits declarative UI trees directly — choosing elements, layouts (rows/columns), and data. " +
      "No predefined screens needed. Full creative control for the AI over the layout.",
    status: "beta",
    highlight: false,
  },
  {
    id: "feat-project-gen",
    name: "AI Project Generation",
    category: "AI",
    description:
      "Describe your project in natural language and the AI generates complete screen configurations, " +
      "brand settings, and element layouts. Go from idea to working AI UI in minutes.",
    status: "ga",
    highlight: true,
  },
];
