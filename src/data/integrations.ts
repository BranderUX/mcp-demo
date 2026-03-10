// ============================================================================
// BranderUX Demo — Integration Methods (Real Code Examples, No Fake Metrics)
// ============================================================================

export interface IntegrationMethod {
  slug: "sdk" | "mcp" | "embed";
  name: string;
  package: string;
  tagline: string;
  description: string;
  bestFor: string[];
  setupTime: string;
  requirements: string[];
  steps: Array<{ step: number; title: string; description: string; command?: string }>;
  codeExample: string;
  features: string[];
  limitations: string[];
  status: "stable" | "beta";
  configExample?: string;
}

export const INTEGRATION_METHODS: IntegrationMethod[] = [
  {
    slug: "sdk",
    name: "SDK",
    package: "@brander/sdk",
    tagline: "React component — drop-in integration",
    description:
      "The @brander/sdk NPM package provides a <Brander /> React component and a <BranderChatWidget /> " +
      "that you drop into your app. It handles AI streaming, screen rendering, brand theming, and " +
      "click-to-query interactions out of the box. Works with Anthropic, OpenAI, and Gemini.",
    bestFor: ["React / Next.js apps", "Full-featured AI assistants", "Chat-based interfaces"],
    setupTime: "5 minutes",
    requirements: ["React 18+", "Next.js 14+ (recommended)", "TypeScript"],
    steps: [
      { step: 1, title: "Install the package", command: "npm install @brander/sdk", description: "Add the SDK to your project" },
      { step: 2, title: "Add the component", description: "Import and render <Brander /> with your project ID" },
      { step: 3, title: "Connect your AI", description: "Pass an onQueryStream handler using one of the built-in adapters (Anthropic, OpenAI, Gemini)" },
      { step: 4, title: "Customize", description: "Configure brand settings, screens, and element visibility in the BranderUX dashboard" },
    ],
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
    status: "stable",
  },
  {
    slug: "mcp",
    name: "MCP Tools",
    package: "@brander/mcp-tools",
    tagline: "Composable library — add branded UI to any MCP server",
    description:
      "The @brander/mcp-tools package adds BranderUX branded UI rendering to any MCP server " +
      "with a single function call. It registers a generate_screen tool and a ui://brander/element-renderer " +
      "resource that renders 15 element types as interactive HTML panels inside Claude and ChatGPT.",
    bestFor: ["Claude Desktop integrations", "Claude.ai and ChatGPT", "MCP server ecosystems"],
    setupTime: "10 minutes",
    requirements: ["Node.js 18+", "@modelcontextprotocol/sdk ^1.0.0", "TypeScript"],
    steps: [
      { step: 1, title: "Install the package", command: "npm install @brander/mcp-tools", description: "Add the MCP tools library" },
      { step: 2, title: "Create your MCP server", description: "Set up an McpServer and register your business tools" },
      { step: 3, title: "Add BranderUX", description: "Call registerBranderTools(server, config) — one line, done" },
      { step: 4, title: "Configure environment", description: "Set BRANDER_PROJECT_ID and BRANDER_BETA_KEY env vars" },
    ],
    codeExample: [
      'import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";',
      'import { registerBranderTools } from "@brander/mcp-tools";',
      "",
      'const server = new McpServer({ name: "my-server", version: "1.0.0" });',
      "",
      "// Register your own business tools",
      "registerMyTools(server);",
      "",
      "// One line adds branded UI rendering for 15 element types",
      "await registerBranderTools(server, {",
      "  projectId: process.env.BRANDER_PROJECT_ID!,",
      "  betaKey: process.env.BRANDER_BETA_KEY!,",
      "});",
    ].join("\n"),
    features: [
      "Single function call integration",
      "15 element types rendered as interactive HTML panels",
      "Works inside Claude Desktop, Claude.ai, and ChatGPT",
      "Streaming support with progressive rendering",
      "Brand settings loaded from BranderUX API",
      "Works alongside your existing MCP tools",
      "MCP Apps standard — embedded interactive panels in chat",
    ],
    limitations: [
      "Requires MCP-compatible AI client",
      "Rendering inside host sandbox (some browser APIs limited)",
    ],
    status: "stable",
    configExample: [
      "{",
      '  "mcpServers": {',
      '    "my-app": {',
      '      "command": "node",',
      '      "args": ["/path/to/dist/index.js"],',
      '      "env": {',
      '        "BRANDER_PROJECT_ID": "your_project_id",',
      '        "BRANDER_BETA_KEY": "bux_dp_your_key"',
      "      }",
      "    }",
      "  }",
      "}",
    ].join("\n"),
  },
  {
    slug: "embed",
    name: "Embed",
    package: "N/A (iframe)",
    tagline: "Zero-dependency iframe — works anywhere",
    description:
      "Embed BranderUX as an iframe in any web application with zero dependencies. " +
      "Communication happens through the PostMessage API with token-based authentication. " +
      "Perfect for adding AI-powered UI to existing apps without framework requirements.",
    bestFor: ["Any web application", "No-framework sites", "Quick prototyping", "Legacy applications"],
    setupTime: "2 minutes",
    requirements: ["HTML", "Any framework or none", "API token from BranderUX dashboard"],
    steps: [
      { step: 1, title: "Get an API token", description: "Create a token in the BranderUX dashboard with your allowed domains" },
      { step: 2, title: "Add the iframe", description: "Embed the BranderUX iframe with your token and configuration" },
      { step: 3, title: "Handle events", description: "Listen for PostMessage events to integrate with your app logic" },
    ],
    codeExample: [
      "<!-- Add to your HTML -->",
      "<iframe",
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
    status: "stable",
  },
];

// ============================================================================
// HANDLER
// ============================================================================

export function getIntegrationData(method: string): Record<string, unknown> {
  if (method === "compare") {
    return {
      comparison: INTEGRATION_METHODS.map((m) => ({
        name: m.name,
        package: m.package,
        tagline: m.tagline,
        bestFor: m.bestFor,
        setupTime: m.setupTime,
        features: m.features,
        limitations: m.limitations,
        status: m.status,
      })),
      recommendation:
        "For React/Next.js apps, start with the SDK — most control, built-in streaming. " +
        "For MCP ecosystems (Claude/ChatGPT), use MCP Tools. " +
        "For quick prototyping or non-React apps, use Embed.",
    };
  }

  const integration = INTEGRATION_METHODS.find((m) => m.slug === method);
  if (!integration) {
    return {
      error: `Unknown method: ${method}`,
      availableMethods: INTEGRATION_METHODS.map((m) => m.slug),
    };
  }

  return {
    method: {
      name: integration.name,
      package: integration.package,
      tagline: integration.tagline,
      description: integration.description,
      bestFor: integration.bestFor,
      setupTime: integration.setupTime,
      requirements: integration.requirements,
      steps: integration.steps,
      codeExample: integration.codeExample,
      features: integration.features,
      limitations: integration.limitations,
      status: integration.status,
      ...(integration.configExample && { configExample: integration.configExample }),
    },
    otherMethods: INTEGRATION_METHODS
      .filter((m) => m.slug !== method)
      .map((m) => ({ name: m.name, tagline: m.tagline, setupTime: m.setupTime })),
  };
}
