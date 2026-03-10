// ============================================================================
// BranderUX Demo — Ready-to-Render Demo Scenarios
// Each scenario contains a complete generate_screen payload.
// Mix of generic business examples + self-referential BranderUX marketing.
// ============================================================================

export interface DemoScenario {
  id: string;
  name: string;
  description: string;
  dataStrategy: string;
  elementsUsed: string[];
  demonstratesFeatures: string[];
  screenElements: Array<{
    elementType: string;
    props: Record<string, unknown>;
    clickQuery?: string;
  }>;
}

export const SCENARIOS: DemoScenario[] = [
  // ── Generic Business: Sales Dashboard ───────────────────────────────────
  {
    id: "sales-dashboard",
    name: "Sales Dashboard",
    description:
      "A revenue tracking dashboard demonstrating how BranderUX composes multiple elements into a cohesive " +
      "business screen. This is what your customers could see when they ask their AI about sales performance.",
    dataStrategy: "Generic business example — shows what you can build for YOUR customers",
    elementsUsed: ["header", "stats-grid", "line-chart", "data-table", "alert"],
    demonstratesFeatures: [
      "Multiple element composition (5 elements in one screen)",
      "Click-to-query on table rows and chart data points",
      "Trend indicators on KPI stats",
      "Actionable warning alerts with AI follow-up",
    ],
    screenElements: [
      {
        elementType: "header",
        props: { title: "Sales Dashboard", subtitle: "Q1 2026 Performance Overview" },
      },
      {
        elementType: "stats-grid",
        props: {
          stats: [
            { id: "revenue", title: "Total Revenue", value: "$847,230", period: "This Quarter", trend: { direction: "up", percentage: "12.3%" } },
            { id: "orders", title: "Orders", value: "2,847", period: "This Quarter", trend: { direction: "up", percentage: "8.1%" } },
            { id: "aov", title: "Avg Order Value", value: "$297.50", period: "This Quarter", trend: { direction: "down", percentage: "2.4%" } },
            { id: "conversion", title: "Conversion Rate", value: "3.8%", period: "This Quarter", trend: { direction: "up", percentage: "0.6%" } },
          ],
        },
        clickQuery: "Show me a detailed breakdown of [title] with trends",
      },
      {
        elementType: "line-chart",
        props: {
          title: "Monthly Revenue Trend",
          labels: ["Oct", "Nov", "Dec", "Jan", "Feb", "Mar"],
          data: [142000, 158000, 171000, 134000, 162000, 180000],
        },
        clickQuery: "What happened in [label]? Show me a breakdown",
      },
      {
        elementType: "data-table",
        props: {
          title: "Recent Orders",
          columns: [
            { key: "orderId", label: "Order ID", type: "text" },
            { key: "customer", label: "Customer", type: "text" },
            { key: "amount", label: "Amount", type: "currency", sortable: true },
            { key: "status", label: "Status", type: "status" },
            { key: "date", label: "Date", type: "date", sortable: true },
          ],
          rows: [
            { id: "1", orderId: "ORD-4821", customer: "Acme Corp", amount: "$4,200.00", status: "Completed", date: "2026-03-09" },
            { id: "2", orderId: "ORD-4820", customer: "TechFlow Inc", amount: "$1,850.00", status: "Processing", date: "2026-03-09" },
            { id: "3", orderId: "ORD-4819", customer: "DataViz Labs", amount: "$3,100.00", status: "Completed", date: "2026-03-08" },
            { id: "4", orderId: "ORD-4818", customer: "CloudNine AI", amount: "$890.00", status: "Pending", date: "2026-03-08" },
            { id: "5", orderId: "ORD-4817", customer: "Nexus Systems", amount: "$5,600.00", status: "Completed", date: "2026-03-07" },
          ],
          pageSize: 5,
        },
        clickQuery: "Show me full details for order [orderId] from [customer]",
      },
      {
        elementType: "alert",
        props: {
          id: "target-alert",
          severity: "warning",
          title: "Revenue Target",
          message: "Current pace is 8% below Q1 target of $920K. Consider reviewing Enterprise tier pricing.",
          actionText: "View Pricing Analysis",
          actionQuery: "Show me a pricing analysis with recommendations to meet the revenue target",
        },
      },
    ],
  },

  // ── Generic Business: Product Catalog ───────────────────────────────────
  {
    id: "product-catalog",
    name: "Product Catalog",
    description:
      "An e-commerce product browsing experience showing how BranderUX renders visual item grids with category breakdowns. " +
      "This is what a retail or SaaS company could build for product discovery.",
    dataStrategy: "Generic business example — e-commerce showcase",
    elementsUsed: ["header", "item-grid", "pie-chart", "button"],
    demonstratesFeatures: [
      "Visual grid layout with product cards",
      "Category distribution chart",
      "Click-to-query on product cards for drill-down",
      "Action buttons for AI-driven exploration",
    ],
    screenElements: [
      {
        elementType: "header",
        props: { title: "Product Catalog", subtitle: "Browse our SaaS product lineup" },
      },
      {
        elementType: "item-grid",
        props: {
          title: "Featured Products",
          items: [
            { id: "p1", title: "Analytics Pro", description: "Real-time dashboards with AI insights", price: "$49/mo", category: "Analytics", rating: 4.8 },
            { id: "p2", title: "Team Hub", description: "Unified workspace for distributed teams", price: "$29/mo", category: "Productivity", rating: 4.6 },
            { id: "p3", title: "SecureCloud", description: "Enterprise security monitoring", price: "$99/mo", category: "Security", rating: 4.9 },
            { id: "p4", title: "API Gateway", description: "High-performance API management", price: "$39/mo", category: "Developer Tools", rating: 4.7 },
            { id: "p5", title: "CustomerIQ", description: "Customer health scoring", price: "$59/mo", category: "CRM", rating: 4.5 },
            { id: "p6", title: "ContentAI", description: "AI-powered content generation", price: "$19/mo", category: "Content", rating: 4.4 },
          ],
        },
        clickQuery: "Show me full details for [title] including features, pricing tiers, and reviews",
      },
      {
        elementType: "pie-chart",
        props: {
          title: "Sales by Category",
          labels: ["Analytics", "Security", "CRM", "Developer Tools", "Productivity", "Content"],
          data: [32, 24, 18, 14, 8, 4],
        },
        clickQuery: "Show me all products in the [label] category",
      },
      {
        elementType: "button",
        props: {
          id: "compare",
          label: "Compare Products",
          variant: "secondary",
          type: "action",
          action: "Show me a comparison table of all products with features, pricing, and ratings",
        },
      },
    ],
  },

  // ── Self-Referential: BranderUX Overview ────────────────────────────────
  {
    id: "branderux-overview",
    name: "BranderUX Platform Overview",
    description:
      "A marketing showcase of BranderUX rendered in its own elements. Shows the platform's capabilities, " +
      "key features, and value proposition — meta-marketing that demonstrates the product by using it.",
    dataStrategy: "Self-referential — BranderUX features as data (marketing)",
    elementsUsed: ["header", "stats-grid", "details-data", "chat-bubble", "button"],
    demonstratesFeatures: [
      "Stats grid showing platform capabilities as metrics",
      "Details data showing features grouped by category",
      "Rich markdown in chat bubble for messaging",
      "CTA buttons driving engagement",
    ],
    screenElements: [
      {
        elementType: "header",
        props: { title: "BranderUX Platform", subtitle: "AI-UX middleware — branded interactive UI for AI responses" },
      },
      {
        elementType: "stats-grid",
        props: {
          stats: [
            { id: "elements", title: "Element Types", value: "15", subtitle: "Built-in interactive components" },
            { id: "providers", title: "AI Providers", value: "3", subtitle: "Claude, GPT, Gemini" },
            { id: "modes", title: "UI Modes", value: "3", subtitle: "Fixed, A2UI, MCP App" },
            { id: "setup", title: "Setup Time", value: "5 min", subtitle: "SDK integration" },
          ],
        },
        clickQuery: "Tell me more about [title] in BranderUX",
      },
      {
        elementType: "details-data",
        props: {
          items: [
            { id: "f1", title: "Brand Generation", value: "AI generates colors, fonts, and layout from company description", type: "text", category: "AI Features" },
            { id: "f2", title: "Screen Selection", value: "Intelligent AI selects best layout for each query (<200ms)", type: "text", category: "AI Features" },
            { id: "f3", title: "Click-to-Query", value: "Every element is interactive — click to drill deeper", type: "text", category: "AI Features" },
            { id: "f4", title: "AG-UI Streaming", value: "Progressive rendering — elements appear as data streams in", type: "text", category: "AI Features" },
            { id: "f5", title: "React SDK", value: "<Brander /> component with built-in AI adapters", type: "text", category: "Integration" },
            { id: "f6", title: "MCP Tools", value: "One function call adds branded UI to any MCP server", type: "text", category: "Integration" },
            { id: "f7", title: "Embed", value: "Zero-dependency iframe with PostMessage API", type: "text", category: "Integration" },
            { id: "f8", title: "No-Code Dashboard", value: "PMs configure everything — screens, brand, elements, AI behavior", type: "text", category: "Platform" },
          ],
        },
        clickQuery: "Explain [title] in detail",
      },
      {
        elementType: "chat-bubble",
        props: {
          text: "**Why BranderUX?**\n\nYour AI is smart — but its responses look like plain text. BranderUX transforms those responses into **branded, interactive UI** that your users can explore by clicking, not typing.\n\n- No developer needed for configuration\n- Works with any AI provider\n- Every element is brand-aware and interactive",
          markdown: true,
        },
      },
      {
        elementType: "button",
        props: {
          id: "get-started",
          label: "Get Started — See Integration Guide",
          variant: "primary",
          type: "action",
          action: "Show me how to integrate BranderUX into my application",
        },
      },
    ],
  },

  // ── Self-Referential: Element Showcase ──────────────────────────────────
  {
    id: "element-showcase",
    name: "Element Type Showcase",
    description:
      "All 15 BranderUX element types displayed as a product catalog — showing the variety of UI components " +
      "available. Each element type is presented as an item card with its use cases.",
    dataStrategy: "Self-referential — elements listed as product catalog",
    elementsUsed: ["header", "item-grid", "data-table"],
    demonstratesFeatures: [
      "Item grid showing all element types as browsable cards",
      "Data table comparing element capabilities",
      "Click to explore any element in detail",
    ],
    screenElements: [
      {
        elementType: "header",
        props: { title: "BranderUX Element Library", subtitle: "15 interactive element types — all brand-aware and clickable" },
      },
      {
        elementType: "item-grid",
        props: {
          title: "Available Elements",
          items: [
            { id: "header", title: "Header", description: "Page title with subtitle", category: "Layout" },
            { id: "stats-grid", title: "Stats Grid", description: "KPI metrics with trends", category: "Data Visualization" },
            { id: "line-chart", title: "Line Chart", description: "Time-series trends", category: "Data Visualization" },
            { id: "bar-chart", title: "Bar Chart", description: "Category comparisons", category: "Data Visualization" },
            { id: "pie-chart", title: "Pie Chart", description: "Proportional breakdown", category: "Data Visualization" },
            { id: "data-table", title: "Data Table", description: "Sortable, filterable tables", category: "Data Display" },
            { id: "details-data", title: "Details Data", description: "Key-value detail cards", category: "Data Display" },
            { id: "item-grid", title: "Item Grid", description: "Visual card grid layout", category: "Data Display" },
            { id: "item-card", title: "Item Card", description: "Single item card", category: "Data Display" },
            { id: "chat-bubble", title: "Chat Bubble", description: "Markdown text messages", category: "Content" },
            { id: "image", title: "Image", description: "Image with caption", category: "Content" },
            { id: "video", title: "Video", description: "YouTube / direct video", category: "Content" },
            { id: "form", title: "Form", description: "Dynamic input forms", category: "Interaction" },
            { id: "button", title: "Button", description: "Action/link buttons", category: "Interaction" },
            { id: "alert", title: "Alert", description: "Notification banners", category: "Interaction" },
          ],
        },
        clickQuery: "Show me a live demo of the [title] element with sample data",
      },
      {
        elementType: "data-table",
        props: {
          title: "Element Comparison",
          columns: [
            { key: "name", label: "Element", type: "text" },
            { key: "category", label: "Category", type: "text" },
            { key: "interactive", label: "Interactive", type: "boolean" },
            { key: "streaming", label: "Streaming", type: "boolean" },
            { key: "status", label: "Status", type: "status" },
          ],
          rows: [
            { id: "1", name: "Stats Grid", category: "Data Visualization", interactive: true, streaming: true, status: "Stable" },
            { id: "2", name: "Data Table", category: "Data Display", interactive: true, streaming: true, status: "Stable" },
            { id: "3", name: "Line Chart", category: "Data Visualization", interactive: true, streaming: true, status: "Stable" },
            { id: "4", name: "Item Grid", category: "Data Display", interactive: true, streaming: true, status: "Stable" },
            { id: "5", name: "Form", category: "User Interaction", interactive: true, streaming: true, status: "Stable" },
            { id: "6", name: "Bar Chart", category: "Data Visualization", interactive: true, streaming: true, status: "Stable" },
            { id: "7", name: "Pie Chart", category: "Data Visualization", interactive: true, streaming: true, status: "Stable" },
            { id: "8", name: "Details Data", category: "Data Display", interactive: true, streaming: true, status: "Stable" },
            { id: "9", name: "Alert", category: "User Interaction", interactive: true, streaming: true, status: "Stable" },
            { id: "10", name: "Custom", category: "Custom", interactive: true, streaming: true, status: "Coming Soon" },
          ],
          pageSize: 10,
        },
        clickQuery: "Show me a live demo of [name]",
      },
    ],
  },

  // ── Self-Referential: Integration Comparison ────────────────────────────
  {
    id: "integration-comparison",
    name: "Integration Methods Comparison",
    description:
      "Side-by-side comparison of BranderUX's three integration methods (SDK, MCP Tools, Embed) " +
      "rendered as BranderUX elements — demonstrating the product while explaining how to use it.",
    dataStrategy: "Self-referential — SDK vs MCP vs Embed comparison",
    elementsUsed: ["header", "stats-grid", "details-data", "alert", "button"],
    demonstratesFeatures: [
      "Stats grid comparing integration metrics",
      "Details data with grouped features per method",
      "Alert highlighting the recommended approach",
      "CTA buttons for each integration method",
    ],
    screenElements: [
      {
        elementType: "header",
        props: { title: "Integration Methods", subtitle: "Three ways to add BranderUX to your application" },
      },
      {
        elementType: "stats-grid",
        props: {
          stats: [
            { id: "sdk", title: "SDK", value: "5 min", subtitle: "React/Next.js — full-featured" },
            { id: "mcp", title: "MCP Tools", value: "10 min", subtitle: "MCP servers — Claude/ChatGPT" },
            { id: "embed", title: "Embed", value: "2 min", subtitle: "Any web app — zero dependencies" },
          ],
        },
        clickQuery: "Show me the full integration guide for [title]",
      },
      {
        elementType: "details-data",
        props: {
          items: [
            { id: "i1", title: "Package", value: "@brander/sdk", type: "text", category: "SDK" },
            { id: "i2", title: "Best For", value: "React apps with AI chat assistants", type: "text", category: "SDK" },
            { id: "i3", title: "Key Feature", value: "AG-UI streaming with built-in adapters for 3 AI providers", type: "text", category: "SDK" },
            { id: "i4", title: "Package", value: "@brander/mcp-tools", type: "text", category: "MCP Tools" },
            { id: "i5", title: "Best For", value: "Claude Desktop, Claude.ai, ChatGPT integrations", type: "text", category: "MCP Tools" },
            { id: "i6", title: "Key Feature", value: "Single function call — registerBranderTools(server, config)", type: "text", category: "MCP Tools" },
            { id: "i7", title: "Setup", value: "iframe with token-based auth", type: "text", category: "Embed" },
            { id: "i8", title: "Best For", value: "Any web app — no framework requirements", type: "text", category: "Embed" },
            { id: "i9", title: "Key Feature", value: "Zero dependencies — PostMessage API for two-way communication", type: "text", category: "Embed" },
          ],
        },
        clickQuery: "Tell me more about [category] integration",
      },
      {
        elementType: "alert",
        props: {
          id: "recommendation",
          severity: "info",
          title: "Recommended",
          message: "For React/Next.js apps, start with the SDK — it gives you the most control with built-in streaming, adapters, and chat widget. For MCP ecosystems, use MCP Tools for the fastest setup.",
          actionText: "View SDK Guide",
          actionQuery: "Show me the SDK integration guide with code examples",
        },
      },
      {
        elementType: "button",
        props: {
          id: "compare-detail",
          label: "Compare All Features",
          variant: "primary",
          type: "action",
          action: "Show me a detailed comparison table of all three integration methods with features, limitations, and code examples",
        },
      },
    ],
  },

  // ── Generic Business: Analytics Report ──────────────────────────────────
  {
    id: "analytics-report",
    name: "Analytics Report",
    description:
      "A multi-chart analytics layout showing how BranderUX handles complex data visualization. " +
      "This is what your customers could see when asking their AI for performance insights.",
    dataStrategy: "Generic business example — build reports like this",
    elementsUsed: ["header", "stats-grid", "bar-chart", "pie-chart", "line-chart"],
    demonstratesFeatures: [
      "Multiple chart types in one screen",
      "KPI overview with trend indicators",
      "Interactive charts with drill-down queries",
      "Cohesive branded layout for analytics",
    ],
    screenElements: [
      {
        elementType: "header",
        props: { title: "Performance Analytics", subtitle: "Q1 2026 — Website & Product Metrics" },
      },
      {
        elementType: "stats-grid",
        props: {
          stats: [
            { id: "visitors", title: "Unique Visitors", value: "284K", period: "This Quarter", trend: { direction: "up", percentage: "18%" } },
            { id: "signups", title: "New Sign-ups", value: "12,847", period: "This Quarter", trend: { direction: "up", percentage: "23%" } },
            { id: "churn", title: "Churn Rate", value: "2.1%", period: "This Quarter", trend: { direction: "up", percentage: "0.3%" } },
            { id: "nps", title: "NPS Score", value: "72", period: "This Quarter", trend: { direction: "up", percentage: "5" } },
          ],
        },
        clickQuery: "Show me a deep dive into [title]",
      },
      {
        elementType: "bar-chart",
        props: {
          title: "Sign-ups by Channel",
          categories: ["Organic Search", "Social Media", "Referral", "Direct", "Paid Ads"],
          series: [
            { name: "Q4 2025", data: [3200, 2100, 1800, 1400, 900] },
            { name: "Q1 2026", data: [4100, 2800, 2200, 1900, 1200] },
          ],
        },
        clickQuery: "Show me details for [seriesName] [category] sign-ups",
      },
      {
        elementType: "pie-chart",
        props: {
          title: "User Distribution by Plan",
          labels: ["Free", "Starter", "Pro", "Enterprise"],
          data: [45, 28, 19, 8],
        },
        clickQuery: "Show me details about [label] plan users",
      },
      {
        elementType: "line-chart",
        props: {
          title: "Weekly Active Users",
          labels: ["W1 Jan", "W2 Jan", "W3 Jan", "W4 Jan", "W1 Feb", "W2 Feb", "W3 Feb", "W4 Feb", "W1 Mar", "W2 Mar"],
          data: [8200, 8500, 8900, 9100, 9400, 9200, 9800, 10100, 10500, 10900],
        },
        clickQuery: "What happened during [label]?",
      },
    ],
  },
];

// ============================================================================
// HANDLER
// ============================================================================

export function getScenarioList(): Record<string, unknown> {
  return {
    totalScenarios: SCENARIOS.length,
    scenarios: SCENARIOS.map((s) => ({
      id: s.id,
      name: s.name,
      description: s.description,
      dataStrategy: s.dataStrategy,
      elementsUsed: s.elementsUsed,
      elementCount: s.elementsUsed.length,
    })),
    tip: "Use get_demo_scenario with a specific scenario ID to get the full renderable screen. " +
      "Pass the screenElements array directly to generate_screen to render it.",
  };
}

export function getScenarioDetail(scenarioId: string): Record<string, unknown> | null {
  const scenario = SCENARIOS.find(
    (s) => s.id === scenarioId || s.name.toLowerCase() === scenarioId.toLowerCase()
  );
  if (!scenario) return null;
  return {
    scenario: {
      id: scenario.id,
      name: scenario.name,
      description: scenario.description,
      dataStrategy: scenario.dataStrategy,
      elementsUsed: scenario.elementsUsed,
      elementCount: scenario.elementsUsed.length,
      demonstratesFeatures: scenario.demonstratesFeatures,
      screenElements: scenario.screenElements,
    },
    renderInstructions: "Pass the screenElements array directly to generate_screen's elements parameter to render this demo.",
  };
}
