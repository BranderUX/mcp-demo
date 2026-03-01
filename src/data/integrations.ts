// ============================================================================
// BranderUX Demo — Integration Methods & AI Capabilities
// ============================================================================

// ============================================================================
// INTEGRATION METHODS
// ============================================================================

export interface IntegrationMethod {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  description: string;
  bestFor: string[];
  setupTime: string;
  techStack: string[];
  codeExample: string;
  steps: Array<{ step: number; title: string; description: string }>;
  features: string[];
  limitations: string[];
  adoptionRate: number;
  status: "stable" | "beta";
}

export const INTEGRATION_METHODS: IntegrationMethod[] = [
  {
    id: "int-sdk",
    name: "SDK",
    slug: "sdk",
    tagline: "React component — drop-in integration",
    description:
      "The @brander/sdk NPM package provides a <Brander /> React component and a <BranderChatWidget /> " +
      "that you drop into your app. It handles AI streaming, screen rendering, brand theming, and " +
      "click-to-query interactions out of the box. Works with Anthropic, OpenAI, and Gemini.",
    bestFor: ["React / Next.js apps", "Full-featured AI assistants", "Chat-based interfaces"],
    setupTime: "5 minutes",
    techStack: ["React 18+", "Next.js 14+", "TypeScript"],
    codeExample: [
      'import { Brander } from "@brander/sdk";',
      'import { anthropicStream } from "@brander/sdk/adapters";',
      "",
      "function App() {",
      "  return (",
      "    <Brander",
      '      projectId="your_project_id"',
      "      onQueryStream={({ query, tools, systemPrompt }) =>",
      "        anthropicStream({ query, tools, systemPrompt, apiKey })",
      "      }",
      "    />",
      "  );",
      "}",
    ].join("\n"),
    steps: [
      { step: 1, title: "Install the package", description: "npm install @brander/sdk" },
      { step: 2, title: "Add the component", description: "Import and render <Brander /> with your project ID" },
      { step: 3, title: "Connect your AI", description: "Pass an onQueryStream handler using one of the built-in adapters (Anthropic, OpenAI, Gemini)" },
      { step: 4, title: "Customize", description: "Configure brand settings, screens, and element visibility in the BranderUX dashboard" },
    ],
    features: [
      "Full React component with AG-UI streaming",
      "Built-in adapters for Anthropic, OpenAI, Gemini",
      "Progressive rendering — elements appear as data streams in",
      "Click-to-query — every element is interactive",
      "Chat widget variant for floating assistant",
      "Brand theming applied automatically",
      "Conversation history management",
    ],
    limitations: [
      "Requires React 18+",
      "Client-side rendering only",
    ],
    adoptionRate: 52,
    status: "stable",
  },
  {
    id: "int-mcp",
    name: "MCP Tools",
    slug: "mcp",
    tagline: "Composable library — add branded UI to any MCP server",
    description:
      "The @brander/mcp-tools package is a composable library that adds BranderUX branded UI rendering " +
      "to any MCP server with a single function call. It registers a generate_screen tool and a " +
      "ui://brander/element-renderer resource that renders 14 element types as interactive HTML panels " +
      "inside Claude's chat.",
    bestFor: ["Claude Desktop integrations", "MCP server ecosystems", "AI assistant tools"],
    setupTime: "10 minutes",
    techStack: ["Node.js", "@modelcontextprotocol/sdk", "TypeScript"],
    codeExample: [
      'import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";',
      'import { registerBranderTools } from "@brander/mcp-tools";',
      "",
      'const server = new McpServer({ name: "my-server", version: "1.0.0" });',
      "",
      "// Register your own business tools",
      "registerMyTools(server);",
      "",
      "// One line adds branded UI rendering",
      "await registerBranderTools(server, {",
      '  projectId: "your_project_id",',
      '  betaKey: "bux_dp_your_key",',
      "});",
    ].join("\n"),
    steps: [
      { step: 1, title: "Install the package", description: "npm install @brander/mcp-tools" },
      { step: 2, title: "Create your MCP server", description: "Set up an McpServer and register your business tools" },
      { step: 3, title: "Add BranderUX", description: "Call registerBranderTools(server, config) — one line, done" },
      { step: 4, title: "Configure Claude Desktop", description: "Add the server to your claude_desktop_config.json with BRANDER_PROJECT_ID and BRANDER_BETA_KEY env vars" },
    ],
    features: [
      "Single function call integration",
      "14 element types rendered as interactive HTML",
      "Works inside Claude Desktop chat",
      "Streaming support with progressive rendering",
      "Brand settings loaded from BranderUX API",
      "Works alongside your existing MCP tools",
    ],
    limitations: [
      "Requires MCP-compatible AI client (Claude Desktop)",
      "Currently stdio transport — HTTP transport coming soon",
    ],
    adoptionRate: 31,
    status: "stable",
  },
  {
    id: "int-embed",
    name: "Embed",
    slug: "embed",
    tagline: "Zero-dependency iframe — works anywhere",
    description:
      "Embed BranderUX as an iframe in any web application with zero dependencies. " +
      "Communication happens through the PostMessage API with token-based authentication. " +
      "Perfect for adding AI-powered UI to existing apps without framework requirements.",
    bestFor: ["Any web application", "No-framework sites", "Quick prototyping"],
    setupTime: "2 minutes",
    techStack: ["HTML", "Any framework or none"],
    codeExample: [
      "<!-- Add to your HTML -->",
      '<iframe',
      '  src="https://branderux.com/embed?token=YOUR_TOKEN&config=BASE64_CONFIG"',
      '  style="width: 100%; height: 600px; border: none;"',
      "></iframe>",
      "",
      "<script>",
      "  // Listen for events from BranderUX",
      '  window.addEventListener("message", (event) => {',
      '    if (event.data.type === "branderux:query") {',
      "      // Handle AI query from user interaction",
      "      console.log(event.data.query);",
      "    }",
      "  });",
      "</script>",
    ].join("\n"),
    steps: [
      { step: 1, title: "Get an API token", description: "Create a token in the BranderUX dashboard with your allowed domains" },
      { step: 2, title: "Add the iframe", description: "Embed the BranderUX iframe with your token and configuration" },
      { step: 3, title: "Handle events", description: "Listen for PostMessage events to integrate with your app logic" },
    ],
    features: [
      "Zero dependencies — just an iframe",
      "Works with any framework or plain HTML",
      "PostMessage API for two-way communication",
      "Token-based authentication with domain whitelisting",
      "Full brand theming",
    ],
    limitations: [
      "Limited customization compared to SDK",
      "Requires internet connection to BranderUX servers",
      "iframe sandboxing may limit some interactions",
    ],
    adoptionRate: 17,
    status: "stable",
  },
];

// ============================================================================
// AI CAPABILITIES
// ============================================================================

export interface AICapability {
  id: string;
  name: string;
  category: string;
  description: string;
  howItWorks: string;
  technicalDetail: string;
  status: "ga" | "beta" | "coming-soon";
}

export const AI_CAPABILITIES: AICapability[] = [
  {
    id: "ai-screen-select",
    name: "Intelligent Screen Selection",
    category: "Core AI",
    description:
      "BranderUX AI analyzes the user's query and automatically selects the best screen layout from your configured screens. " +
      "It scores each screen's fit (0.0–1.0) and picks the top matches, ensuring the right combination of elements for every response.",
    howItWorks:
      "When a query arrives, BranderUX's screen selection AI evaluates it against all available screen configurations. " +
      "Each screen has selection criteria (whenToUse, clickedElements, exampleQueries) that the AI scores. " +
      "The top 2–3 screens are selected, and their element tools are sent to the customer's AI.",
    technicalDetail: "Uses Claude Haiku for fast selection (< 200ms). Returns fitScores, reasoning, and confidence level.",
    status: "ga",
  },
  {
    id: "ai-query-enhance",
    name: "Query Enhancement",
    category: "Core AI",
    description:
      "Automatically enhances user queries with context from the selected screen and available tools. " +
      "The AI rewrites vague queries into precise, tool-optimized prompts — improving response quality without user effort.",
    howItWorks:
      "After screen selection, the original query is enriched with screen context (available elements, data fields) " +
      "and conversation history. The enhanced query guides the customer's AI to produce better-structured responses.",
    technicalDetail: "Enhancement is optional (enableQueryEnhancement flag). Adds ~50ms to processing time.",
    status: "ga",
  },
  {
    id: "ai-streaming",
    name: "AG-UI Streaming Protocol",
    category: "Streaming",
    description:
      "Progressive rendering via the AG-UI (Agent-UI) streaming protocol. Elements appear on screen as data streams in, " +
      "not after the full response completes. Users see partial results immediately for a fluid, real-time experience.",
    howItWorks:
      "The customer's AI streams tool call arguments as JSON fragments via SSE (Server-Sent Events). " +
      "BranderUX's JsonFragmentParser incrementally extracts element data from the stream. " +
      "Each element renders progressively — tables show rows as they arrive, charts update with new data points.",
    technicalDetail: "17 AG-UI event types. Uses TOOL_CALL_ARGS events with delta JSON fragments parsed incrementally.",
    status: "ga",
  },
  {
    id: "ai-multi-provider",
    name: "Multi-Provider AI Support",
    category: "Compatibility",
    description:
      "Works with Anthropic Claude, OpenAI GPT, and Google Gemini out of the box. " +
      "Built-in stream adapters normalize each provider's streaming format into the AG-UI protocol, " +
      "so you can switch AI providers without changing your UI code.",
    howItWorks:
      "Each AI provider has a dedicated stream adapter (anthropicStream, openaiStream, geminiStream) " +
      "that converts provider-specific SSE events into standardized AG-UI events. " +
      "Tool schemas are also generated in each provider's format automatically.",
    technicalDetail: "Adapters: anthropic.ts (218 lines), openai.ts (266 lines), gemini.ts (336 lines), sse.ts (141 lines).",
    status: "ga",
  },
  {
    id: "ai-click-to-query",
    name: "Click-to-Query Interactions",
    category: "Interactivity",
    description:
      "Every rendered element is interactive. Click a table row, chart segment, grid card, or button — " +
      "BranderUX auto-generates a contextual follow-up query and sends it back to the AI. " +
      "This creates a fluid exploration loop where users drill deeper with zero typing.",
    howItWorks:
      "Each element type has a registered behavior template (e.g., DataTable: 'Show details for [title] (ID: [id])'). " +
      "When a user clicks, BranderUX fills the template with the clicked item's data and submits a new query. " +
      "The AI receives the query, selects the appropriate detail screen, and renders the response.",
    technicalDetail: "Defined in ELEMENT_BEHAVIOR_REGISTRY. Supports queryTemplate patterns with [field] placeholders.",
    status: "ga",
  },
  {
    id: "ai-flexible-mode",
    name: "A2UI Flexible Mode",
    category: "Advanced",
    description:
      "An alternative to deterministic screen selection. In A2UI mode, the AI emits declarative UI trees directly — " +
      "choosing which elements to use, how to lay them out (rows/columns), and what data to display. " +
      "No predefined screens needed. The AI has full creative control over the layout.",
    howItWorks:
      "Instead of selecting from predefined screens, the customer's AI receives an A2UI prompt describing all available " +
      "components and layout primitives (Column, Row). The AI responds with a JSON structure defining the component tree, " +
      "adjacency list, data model, and element configurations. BranderUX renders this declarative surface.",
    technicalDetail: "Uses updateComponents, updateDataModel, and setRootComponent operations. Currently in beta.",
    status: "beta",
  },
];
