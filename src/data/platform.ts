// ============================================================================
// BranderUX Demo — Platform Knowledge (Real Product Information)
// ============================================================================

export interface PlatformInfo {
  name: string;
  tagline: string;
  description: string;
  website: string;
  valueProposition: string[];
}

export interface UIGenerationMode {
  id: string;
  name: string;
  description: string;
  howItWorks: string;
  bestFor: string;
  tradeoffs: string;
  status: "ga" | "beta";
}

export interface AIFeature {
  id: string;
  name: string;
  category: string;
  description: string;
  howItWorks: string;
  technicalDetail: string;
  status: "ga" | "beta" | "coming-soon";
}

export interface NoCodeInfo {
  description: string;
  pmCapabilities: string[];
  aiGeneration: string;
  dashboardFeatures: string[];
}

// ============================================================================
// PRODUCT INFO
// ============================================================================

export const PLATFORM: PlatformInfo = {
  name: "BranderUX",
  tagline: "AI-UX middleware — transforms AI responses into branded, interactive UI",
  description:
    "BranderUX is an AI-UX middleware platform that sits between your AI provider and your users. " +
    "Instead of plain text responses, your AI generates branded, interactive UI components — " +
    "dashboards, charts, tables, forms, catalogs — all styled with your brand's colors, fonts, and layout. " +
    "Every element is clickable: users drill deeper by clicking, not typing. " +
    "Works with Claude, GPT, and Gemini. No developer required — PMs configure everything through the dashboard.",
  website: "https://branderux.com",
  valueProposition: [
    "Transforms plain-text AI responses into branded visual UI (dashboards, charts, tables, forms, catalogs)",
    "15 built-in element types — from KPI stats grids to interactive data tables to forms",
    "Every element is interactive — click to drill deeper, zero typing needed",
    "Works with Claude, GPT, and Gemini — switch providers without changing UI code",
    "PM controls everything through the dashboard — no developer required for configuration",
    "AI generates brand settings, screen layouts, and element configurations from natural language",
    "Progressive streaming — elements appear as AI generates data, not after the full response",
    "Three integration options: React SDK, MCP Tools, or zero-dependency Embed",
  ],
};

// ============================================================================
// UI GENERATION MODES
// ============================================================================

export const UI_GENERATION_MODES: UIGenerationMode[] = [
  {
    id: "fixed-screens",
    name: "Fixed Screens (Deterministic)",
    description:
      "The PM configures screen layouts in the BranderUX dashboard — choosing which elements appear, " +
      "their arrangement, and sizing. When a user asks a question, BranderUX AI analyzes the query " +
      "and selects the best-fit screen, then the customer's AI fills it with data.",
    howItWorks:
      "1. PM designs screens in the dashboard (drag-and-drop or AI-generated)\n" +
      "2. User asks a question\n" +
      "3. BranderUX AI scores each screen's fit for the query (<200ms)\n" +
      "4. Top screens are selected, converted to AI tools\n" +
      "5. Customer's AI calls the tool with real data\n" +
      "6. BranderUX renders the screen with brand styling",
    bestFor: "Predictable, controlled experiences where you want consistent layouts. Great for products with well-defined use cases.",
    tradeoffs: "Most predictable — PM has full control over layouts. Requires upfront screen design (or AI generation).",
    status: "ga",
  },
  {
    id: "a2ui",
    name: "A2UI (Flexible Mode)",
    description:
      "The AI decides the layout dynamically. Instead of picking from predefined screens, the AI emits " +
      "declarative UI trees — choosing which elements to use, how to arrange them (rows/columns), " +
      "and what data to display. No predefined screens needed.",
    howItWorks:
      "1. User asks a question\n" +
      "2. BranderUX generates an A2UI prompt describing all available elements and layout primitives\n" +
      "3. Customer's AI responds with a declarative UI structure\n" +
      "4. BranderUX parses and renders the component tree with brand styling\n" +
      "5. Elements and layout adapt to each query dynamically",
    bestFor: "Dynamic, exploratory use cases where the AI should have creative control over layouts. Great for chatbots and assistants that handle diverse queries.",
    tradeoffs: "More flexible — AI adapts layout to each query. Less predictable — PM has less control over exact layout.",
    status: "beta",
  },
  {
    id: "mcp-app",
    name: "MCP App",
    description:
      "Renders interactive UI panels directly inside AI chat interfaces like Claude and ChatGPT " +
      "via the MCP (Model Context Protocol) standard. The AI calls a generate_screen tool, " +
      "and BranderUX renders the screen as an embedded interactive HTML panel in the chat.",
    howItWorks:
      "1. The @brander/mcp-tools library registers a generate_screen tool on your MCP server\n" +
      "2. AI receives the tool and calls it with an array of elements\n" +
      "3. BranderUX returns structured content + a self-contained HTML resource\n" +
      "4. The host (Claude/ChatGPT) renders the HTML as an interactive panel\n" +
      "5. Users interact with elements directly in the chat interface",
    bestFor: "MCP server ecosystems. Ships branded UI inside Claude Desktop, Claude.ai, and ChatGPT without building a frontend.",
    tradeoffs: "Works anywhere MCP is supported. Rendering happens inside the host's sandbox, so some browser APIs are limited.",
    status: "ga",
  },
];

// ============================================================================
// AI FEATURES
// ============================================================================

export const AI_FEATURES: AIFeature[] = [
  {
    id: "screen-select",
    name: "Intelligent Screen Selection",
    category: "Core AI",
    description:
      "BranderUX AI analyzes each user query and scores all available screens for fit. " +
      "The top-matching screens are selected and sent to the customer's AI as tools. " +
      "Runs in under 200ms using Claude Haiku.",
    howItWorks:
      "Each screen has selection criteria: whenToUse descriptions, clickedElements mappings, " +
      "and exampleQueries. The AI evaluates the user's query against these criteria and returns " +
      "fitScores (0.0–1.0), reasoning, and confidence level.",
    technicalDetail: "Uses Claude Haiku for speed. Returns top 2-3 screens with fitScores, reasoning, and enhancedQuery.",
    status: "ga",
  },
  {
    id: "query-enhance",
    name: "Query Enhancement",
    category: "Core AI",
    description:
      "Automatically enriches vague user queries with context from available screens and conversation history. " +
      "The enhanced query guides the customer's AI to produce better-structured responses.",
    howItWorks:
      "After screen selection, the original query is combined with screen context (available elements, " +
      "data fields) and prior conversation. The enhanced query is more precise and tool-optimized.",
    technicalDetail: "Optional via enableQueryEnhancement flag. Adds ~50ms processing time.",
    status: "ga",
  },
  {
    id: "streaming",
    name: "AG-UI Streaming",
    category: "Streaming",
    description:
      "Progressive rendering via the AG-UI protocol. Elements appear on screen as the AI generates data, " +
      "not after the full response completes. Tables show rows as they arrive, charts update with new data points.",
    howItWorks:
      "The AI streams tool call arguments as JSON fragments via SSE. BranderUX's parser extracts element data " +
      "incrementally. Each element renders progressively with smooth fade-in animations.",
    technicalDetail: "17 AG-UI event types. Adapters available for Anthropic, OpenAI, and Gemini streaming formats.",
    status: "ga",
  },
  {
    id: "multi-provider",
    name: "Multi-Provider AI Support",
    category: "Compatibility",
    description:
      "Works with Anthropic Claude, OpenAI GPT, and Google Gemini. Built-in stream adapters normalize " +
      "each provider's streaming format, so you can switch AI providers without changing your UI code.",
    howItWorks:
      "Each provider has a dedicated adapter (anthropicStream, openaiStream, geminiStream) that converts " +
      "provider-specific SSE events into standardized AG-UI events. Tool schemas are also auto-generated " +
      "in each provider's format.",
    technicalDetail: "SDK includes 4 adapters: Anthropic, OpenAI, Gemini, and generic SSE.",
    status: "ga",
  },
  {
    id: "click-to-query",
    name: "Click-to-Query Interactions",
    category: "Interactivity",
    description:
      "Every rendered element is interactive. Click a table row, chart segment, grid card, or button — " +
      "BranderUX auto-generates a contextual follow-up query and sends it back to the AI. " +
      "Users explore data by clicking, not typing.",
    howItWorks:
      "Each element type has a behavior template (e.g., DataTable: 'Show details for [title] (ID: [id])'). " +
      "When clicked, BranderUX fills the template with the clicked item's data and submits a new query. " +
      "The AI responds with an appropriate detail screen.",
    technicalDetail: "Templates use [field] placeholders. AI can also provide custom clickQuery per element.",
    status: "ga",
  },
  {
    id: "brand-generation",
    name: "AI Brand Generation",
    category: "No-Code AI",
    description:
      "Describe your company in natural language — the AI generates a complete brand package: " +
      "primary/secondary/accent colors, font style, layout preferences, border radius, shadow settings, " +
      "and a full gray palette. Refine with follow-up prompts.",
    howItWorks:
      "Enter a company description (e.g., 'Modern fintech startup for millennials'). " +
      "The AI detects the industry and style preferences, then generates brand settings. " +
      "You can regenerate with refinements (e.g., 'Make it more playful, use rounded corners').",
    technicalDetail: "Uses Claude for generation. Includes reasoning for colors, typography, and layout choices.",
    status: "ga",
  },
  {
    id: "project-generation",
    name: "AI Project Generation",
    category: "No-Code AI",
    description:
      "Describe your project and the AI generates the complete configuration: brand settings, " +
      "screen layouts, element visibility, and system prompts. Go from idea to working AI-powered UI " +
      "in minutes.",
    howItWorks:
      "1. Describe your project (or answer discovery questions)\n" +
      "2. AI generates a project plan with recommended screens\n" +
      "3. Brand settings, screen layouts, and element configs are created automatically\n" +
      "4. Preview and refine in the dashboard",
    technicalDetail: "Multi-phase generation: discovery → plan → brand → screens → configuration.",
    status: "ga",
  },
];

// ============================================================================
// NO-CODE PHILOSOPHY
// ============================================================================

export const NO_CODE: NoCodeInfo = {
  description:
    "BranderUX is designed so that Product Managers own the entire AI-UX experience without writing code. " +
    "Developers are only needed for the initial SDK/MCP integration — after that, PMs control everything " +
    "through the dashboard.",
  pmCapabilities: [
    "Design brand settings (colors, fonts, layout) — or let AI generate them",
    "Configure screen layouts with a visual screen builder (drag-and-drop)",
    "Set element visibility per screen — toggle which elements appear",
    "Create custom screens with AI assistance",
    "Manage system prompts and AI behavior",
    "Configure click-to-query behaviors",
    "Switch between Fixed Screens and A2UI modes",
    "Monitor performance and usage through analytics",
    "Generate complete projects from natural language descriptions",
  ],
  aiGeneration:
    "Describe your project in natural language — the AI generates brand settings, screen layouts, " +
    "element configurations, and system prompts automatically. Refine with conversational follow-ups. " +
    "Go from idea to working branded AI-UX in minutes, not weeks.",
  dashboardFeatures: [
    "Visual Screen Builder — drag-and-drop element placement",
    "Brand Studio — AI-powered brand generation and customization",
    "Element Library — configure props, visibility, and behavior for each element",
    "Playground — test your AI-UX with real queries in real-time",
    "API Token Management — create tokens for Embed and SDK integrations",
    "Project Generator — AI creates your entire project from a description",
  ],
};

// ============================================================================
// HANDLER
// ============================================================================

export function getPlatformData(topic?: string): Record<string, unknown> {
  switch (topic) {
    case "integration":
      return {
        topic: "Integration Methods",
        description: "BranderUX offers three integration methods, each suited to different use cases.",
        methods: [
          { name: "SDK (@brander/sdk)", bestFor: "React / Next.js apps", setupTime: "5 minutes" },
          { name: "MCP Tools (@brander/mcp-tools)", bestFor: "MCP servers (Claude Desktop, Claude.ai, ChatGPT)", setupTime: "10 minutes" },
          { name: "Embed", bestFor: "Any web app (zero dependencies)", setupTime: "2 minutes" },
        ],
        note: "Use the get_integration_guide tool for detailed setup instructions and code examples.",
      };

    case "modes":
      return {
        topic: "UI Generation Modes",
        modes: UI_GENERATION_MODES.map((m) => ({
          name: m.name,
          description: m.description,
          howItWorks: m.howItWorks,
          bestFor: m.bestFor,
          tradeoffs: m.tradeoffs,
          status: m.status,
        })),
      };

    case "ai-features":
      return {
        topic: "AI Features",
        features: AI_FEATURES.map((f) => ({
          name: f.name,
          category: f.category,
          description: f.description,
          howItWorks: f.howItWorks,
          technicalDetail: f.technicalDetail,
          status: f.status,
        })),
      };

    case "no-code":
      return {
        topic: "No-Code / PM-Driven Workflow",
        ...NO_CODE,
      };

    default:
      return {
        topic: "BranderUX Overview",
        product: PLATFORM,
        uiGenerationModes: UI_GENERATION_MODES.map((m) => ({
          name: m.name,
          description: m.description,
          bestFor: m.bestFor,
          status: m.status,
        })),
        aiFeatures: AI_FEATURES.map((f) => ({
          name: f.name,
          description: f.description,
          status: f.status,
        })),
        noCode: {
          description: NO_CODE.description,
          pmCapabilities: NO_CODE.pmCapabilities,
        },
        integrationMethods: [
          { name: "SDK (@brander/sdk)", bestFor: "React / Next.js apps" },
          { name: "MCP Tools (@brander/mcp-tools)", bestFor: "MCP servers (Claude, ChatGPT)" },
          { name: "Embed", bestFor: "Any web app" },
        ],
        nextSteps: [
          "Use explore_elements to see all 15 element types with sample data",
          "Use get_demo_scenario to see ready-to-render business demos",
          "Use get_integration_guide for setup instructions and code",
        ],
      };
  }
}
