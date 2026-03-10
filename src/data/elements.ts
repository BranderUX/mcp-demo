// ============================================================================
// BranderUX Demo — Element Definitions & Sample Data
// All sample data conforms to generate_screen's Zod schemas.
// ============================================================================

export interface ElementDefinition {
  elementType: string;
  name: string;
  category: "Data Visualization" | "Data Display" | "Content & Media" | "User Interaction" | "Layout";
  description: string;
  useCases: string[];
  interactivity: string;
  bestFor: string[];
  status: "stable" | "coming-soon";
  sampleData: {
    elementType: string;
    props: Record<string, unknown>;
    clickQuery?: string;
  };
}

// ============================================================================
// ALL 15 ELEMENTS + 1 COMING SOON
// ============================================================================

export const ELEMENTS: ElementDefinition[] = [
  // ── Layout ──────────────────────────────────────────────────────────────
  {
    elementType: "header",
    name: "Header",
    category: "Layout",
    description: "Page header with title and optional subtitle. Sets the context for the screen.",
    useCases: ["Page titles", "Section headers", "Screen context"],
    interactivity: "Click navigates to the main view for the title topic.",
    bestFor: ["Every screen — always start with a header"],
    status: "stable",
    sampleData: {
      elementType: "header",
      props: {
        title: "Sales Performance Dashboard",
        subtitle: "Real-time overview of revenue, orders, and customer metrics",
      },
    },
  },

  // ── Data Visualization ──────────────────────────────────────────────────
  {
    elementType: "stats-grid",
    name: "Stats Grid",
    category: "Data Visualization",
    description: "Grid of KPI metric cards with trend indicators (up/down/neutral with percentage).",
    useCases: ["Executive KPIs", "Revenue metrics", "Operational status", "Performance overview"],
    interactivity: "Click any stat card to ask the AI about that specific metric.",
    bestFor: ["Dashboard headers", "At-a-glance metrics", "KPI tracking"],
    status: "stable",
    sampleData: {
      elementType: "stats-grid",
      props: {
        stats: [
          { id: "s1", title: "Total Revenue", value: "$2.4M", period: "This Quarter", trend: { direction: "up", percentage: "12%" } },
          { id: "s2", title: "Active Users", value: "18,492", period: "This Month", trend: { direction: "up", percentage: "8.3%" } },
          { id: "s3", title: "Conversion Rate", value: "3.2%", period: "This Month", trend: { direction: "down", percentage: "0.5%" } },
          { id: "s4", title: "Avg Response Time", value: "142ms", period: "Today", trend: { direction: "up", percentage: "15%" } },
        ],
      },
      clickQuery: "Show me a detailed breakdown of [title] with trends over the last 6 months",
    },
  },
  {
    elementType: "line-chart",
    name: "Line Chart",
    category: "Data Visualization",
    description: "Time-series line chart for visualizing trends over time.",
    useCases: ["Revenue trends", "User growth", "Performance over time", "Stock prices"],
    interactivity: "Click a data point to ask about that specific time period.",
    bestFor: ["Trends", "Time-series data", "Growth tracking"],
    status: "stable",
    sampleData: {
      elementType: "line-chart",
      props: {
        title: "Monthly Revenue Trend",
        labels: ["Oct", "Nov", "Dec", "Jan", "Feb", "Mar"],
        data: [142000, 158000, 171000, 134000, 162000, 189000],
      },
      clickQuery: "What happened with revenue in [label]? Show me the details",
    },
  },
  {
    elementType: "bar-chart",
    name: "Bar Chart",
    category: "Data Visualization",
    description: "Comparative bar chart with support for multiple series and stacking.",
    useCases: ["Category comparison", "A/B test results", "Regional performance", "Product breakdown"],
    interactivity: "Click a bar to ask about that specific category and series.",
    bestFor: ["Comparisons across categories", "Multi-series data"],
    status: "stable",
    sampleData: {
      elementType: "bar-chart",
      props: {
        title: "Revenue by Product Line",
        categories: ["Enterprise", "Pro", "Starter", "Free"],
        series: [
          { name: "Q4 2025", data: [420000, 280000, 95000, 0] },
          { name: "Q1 2026", data: [510000, 320000, 110000, 0] },
        ],
      },
      clickQuery: "Show me details for [seriesName] in [category]",
    },
  },
  {
    elementType: "pie-chart",
    name: "Pie Chart",
    category: "Data Visualization",
    description: "Proportional data visualization with labeled segments.",
    useCases: ["Market share", "Budget allocation", "Category distribution", "User demographics"],
    interactivity: "Click a segment to drill into that category.",
    bestFor: ["Showing proportions", "Distribution breakdowns"],
    status: "stable",
    sampleData: {
      elementType: "pie-chart",
      props: {
        title: "Revenue by Region",
        labels: ["North America", "Europe", "Asia Pacific", "Latin America", "Middle East"],
        data: [42, 28, 18, 8, 4],
      },
      clickQuery: "Show me a detailed breakdown for [label]",
    },
  },

  // ── Data Display ────────────────────────────────────────────────────────
  {
    elementType: "data-table",
    name: "Data Table",
    category: "Data Display",
    description: "Dynamic sortable, filterable table with multiple column types (text, number, status, date, currency, boolean).",
    useCases: ["Order lists", "User directories", "Transaction logs", "Inventory management"],
    interactivity: "Click any row to ask the AI for full details about that item.",
    bestFor: ["Structured tabular data", "Lists with multiple attributes"],
    status: "stable",
    sampleData: {
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
  },
  {
    elementType: "details-data",
    name: "Details Data",
    category: "Data Display",
    description: "Structured key-value detail cards grouped by category. Perfect for entity detail views.",
    useCases: ["Customer profiles", "Order details", "Product specs", "Configuration views"],
    interactivity: "Click a detail item to ask about that specific field.",
    bestFor: ["Entity detail views", "Structured information display"],
    status: "stable",
    sampleData: {
      elementType: "details-data",
      props: {
        items: [
          { id: "d1", title: "Company", value: "Acme Corporation", type: "text", category: "General" },
          { id: "d2", title: "Industry", value: "Enterprise Software", type: "text", category: "General" },
          { id: "d3", title: "Annual Revenue", value: "$12.4M", type: "price", category: "Financials" },
          { id: "d4", title: "Growth Rate", value: "+24% YoY", type: "text", category: "Financials" },
          { id: "d5", title: "Account Status", value: "Active", type: "status", category: "Status", color: "#22c55e" },
          { id: "d6", title: "Plan", value: "Enterprise", type: "text", category: "Status" },
          { id: "d7", title: "Last Contact", value: "March 8, 2026", type: "text", category: "Activity" },
          { id: "d8", title: "Next Renewal", value: "June 15, 2026", type: "text", category: "Activity" },
        ],
      },
      clickQuery: "Tell me more about [title]: [value]",
    },
  },
  {
    elementType: "item-grid",
    name: "Item Grid",
    category: "Data Display",
    description: "Grid of item/product cards with images, pricing, ratings, and categories.",
    useCases: ["Product catalogs", "Course listings", "Team directories", "Property listings"],
    interactivity: "Click any card to view full details about that item.",
    bestFor: ["Visual browsing", "Catalog-style layouts"],
    status: "stable",
    sampleData: {
      elementType: "item-grid",
      props: {
        title: "Featured Products",
        items: [
          { id: "p1", title: "Smart Analytics Dashboard", description: "Real-time business intelligence with AI-powered insights", price: "$49/mo", category: "Analytics", rating: 4.8 },
          { id: "p2", title: "Team Collaboration Suite", description: "Unified workspace for distributed teams", price: "$29/mo", category: "Productivity", rating: 4.6 },
          { id: "p3", title: "Cloud Security Platform", description: "Enterprise-grade security monitoring and compliance", price: "$99/mo", category: "Security", rating: 4.9 },
          { id: "p4", title: "API Gateway Pro", description: "High-performance API management and rate limiting", price: "$39/mo", category: "Developer Tools", rating: 4.7 },
          { id: "p5", title: "Customer Success Hub", description: "360-degree customer health scoring and engagement", price: "$59/mo", category: "CRM", rating: 4.5 },
          { id: "p6", title: "AI Content Studio", description: "Generate, edit, and optimize content with AI", price: "$19/mo", category: "Content", rating: 4.4 },
        ],
      },
      clickQuery: "Show me full details for [title]",
    },
  },
  {
    elementType: "item-card",
    name: "Item Card",
    category: "Data Display",
    description: "Individual item/product card with image, description, pricing, and action buttons.",
    useCases: ["Featured product", "Single item highlight", "Recommendation card"],
    interactivity: "Click to view full details.",
    bestFor: ["Single item focus", "Featured content"],
    status: "stable",
    sampleData: {
      elementType: "item-card",
      props: {
        id: "featured",
        title: "Enterprise Analytics Platform",
        description: "Full-featured business intelligence with real-time dashboards, custom reports, and AI-powered insights for teams of all sizes.",
        price: "$99/mo",
        category: "Analytics",
        rating: 4.9,
        stock: "Available",
      },
      clickQuery: "Show me full details for [title]",
    },
  },

  // ── Content & Media ─────────────────────────────────────────────────────
  {
    elementType: "chat-bubble",
    name: "Chat Bubble",
    category: "Content & Media",
    description: "Text/markdown response messages. Supports rich markdown formatting.",
    useCases: ["AI explanations", "Summaries", "Instructions", "Contextual notes"],
    interactivity: "Primarily informational — no click action.",
    bestFor: ["Explanatory text", "Markdown-formatted content"],
    status: "stable",
    sampleData: {
      elementType: "chat-bubble",
      props: {
        text: "Here's a summary of your account performance:\n\n**Key highlights:**\n- Revenue grew 12% quarter-over-quarter\n- Customer retention rate improved to 94%\n- Average deal size increased by $1,200\n\nYour top-performing product line is **Enterprise**, contributing 52% of total revenue. Consider expanding the sales team in the APAC region where growth is strongest.",
        markdown: true,
      },
    },
  },
  {
    elementType: "image",
    name: "Image",
    category: "Content & Media",
    description: "Image display with alt text, captions, and optional sizing.",
    useCases: ["Product photos", "Diagrams", "Screenshots", "Visual references"],
    interactivity: "Click to view or discuss the image content.",
    bestFor: ["Visual content", "Illustrations", "Product imagery"],
    status: "stable",
    sampleData: {
      elementType: "image",
      props: {
        src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800",
        alt: "Modern analytics dashboard on a laptop screen",
        title: "BranderUX in Action",
        caption: "Example of a branded analytics dashboard rendered by BranderUX",
      },
    },
  },
  {
    elementType: "video",
    name: "Video",
    category: "Content & Media",
    description: "Embedded video player supporting YouTube URLs and direct .mp4/.webm files.",
    useCases: ["Product demos", "Tutorial videos", "Explainer content", "Marketing media"],
    interactivity: "Play/pause controls. Optional 'Discuss' button sends a query to the AI.",
    bestFor: ["Video content", "Demos", "Tutorials"],
    status: "stable",
    sampleData: {
      elementType: "video",
      props: {
        id: "demo-video",
        src: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        title: "BranderUX Platform Demo",
        description: "See how BranderUX transforms AI responses into branded interactive UI",
      },
    },
  },

  // ── User Interaction ────────────────────────────────────────────────────
  {
    elementType: "form",
    name: "Form",
    category: "User Interaction",
    description: "Dynamic form with various field types: text, email, date, amount, number, tel, select, textarea, checkbox.",
    useCases: ["Data input", "Settings configuration", "Search filters", "Registration"],
    interactivity: "Submit sends form data as a query to the AI for processing.",
    bestFor: ["Collecting user input", "Configuration screens"],
    status: "stable",
    sampleData: {
      elementType: "form",
      props: {
        title: "Schedule a Demo",
        description: "Fill out the form below and we'll set up a personalized demo for your team.",
        fields: [
          { id: "name", name: "name", label: "Full Name", type: "text", required: true, placeholder: "John Smith" },
          { id: "email", name: "email", label: "Work Email", type: "email", required: true, placeholder: "john@company.com" },
          { id: "company", name: "company", label: "Company Name", type: "text", required: true, placeholder: "Acme Corp" },
          { id: "size", name: "size", label: "Team Size", type: "select", required: true, options: ["1-10", "11-50", "51-200", "200+"] },
          { id: "useCase", name: "useCase", label: "Primary Use Case", type: "textarea", placeholder: "Tell us about your AI-UX needs..." },
        ],
        submitButton: { label: "Request Demo" },
      },
    },
  },
  {
    elementType: "button",
    name: "Button",
    category: "User Interaction",
    description: "Interactive action or link button with primary/secondary/tertiary variants.",
    useCases: ["Call-to-action", "Navigation", "Action triggers", "External links"],
    interactivity: "Action buttons send a query to the AI. Link buttons open external URLs.",
    bestFor: ["CTAs", "Navigation actions"],
    status: "stable",
    sampleData: {
      elementType: "button",
      props: {
        id: "cta-button",
        label: "View Full Report",
        variant: "primary",
        type: "action",
        action: "Generate a comprehensive report with all metrics, charts, and recommendations",
      },
    },
  },
  {
    elementType: "alert",
    name: "Alert",
    category: "User Interaction",
    description: "Notification banner with severity levels: success, error, warning, info. Optional action button.",
    useCases: ["Status notifications", "Warnings", "Success confirmations", "Actionable alerts"],
    interactivity: "Optional action button sends a query to the AI.",
    bestFor: ["Notifications", "Status messages", "Actionable warnings"],
    status: "stable",
    sampleData: {
      elementType: "alert",
      props: {
        id: "alert-1",
        severity: "warning",
        title: "Revenue Target Alert",
        message: "Current quarterly pace is 8% below the $3M target. Consider reviewing the pricing strategy for the Enterprise tier.",
        actionText: "View Pricing Analysis",
        actionQuery: "Show me a pricing analysis with recommendations to meet the revenue target",
      },
    },
  },

  // ── Coming Soon ─────────────────────────────────────────────────────────
  {
    elementType: "custom",
    name: "Custom Elements (Vibe Coding)",
    category: "User Interaction",
    description:
      "Build your own element types using a visual code editor. Define custom props, rendering logic, " +
      "and click behaviors. The AI learns to use your custom elements alongside the built-in ones.",
    useCases: ["Domain-specific components", "Branded widgets", "Industry-specific elements"],
    interactivity: "Defined by the custom element creator.",
    bestFor: ["Unique business requirements", "Extending BranderUX with domain-specific UI"],
    status: "coming-soon",
    sampleData: {
      elementType: "chat-bubble",
      props: {
        text: "**Custom Elements** are coming soon! You'll be able to build your own element types with a visual code editor — defining custom props, rendering logic, and click behaviors. The AI will learn to use your custom elements alongside the built-in 15 types.",
        markdown: true,
      },
    },
  },
];

// ============================================================================
// CATEGORIES
// ============================================================================

export const ELEMENT_CATEGORIES: Record<string, string[]> = {
  "Data Visualization": ["stats-grid", "line-chart", "bar-chart", "pie-chart"],
  "Data Display": ["data-table", "details-data", "item-grid", "item-card"],
  "Content & Media": ["chat-bubble", "image", "video"],
  "User Interaction": ["form", "button", "alert"],
  "Layout": ["header"],
};

// ============================================================================
// HANDLERS
// ============================================================================

export function getElementSummary(): Record<string, unknown> {
  return {
    totalElements: ELEMENTS.filter((e) => e.status === "stable").length,
    comingSoon: ELEMENTS.filter((e) => e.status === "coming-soon").map((e) => e.elementType),
    categories: ELEMENT_CATEGORIES,
    elements: ELEMENTS.map((e) => ({
      elementType: e.elementType,
      name: e.name,
      category: e.category,
      description: e.description,
      bestFor: e.bestFor,
      status: e.status,
    })),
    tip: "Use explore_elements with a specific element_type to get full details and renderable sample data for any element.",
  };
}

export function getElementDetail(elementType: string): Record<string, unknown> | null {
  const el = ELEMENTS.find((e) => e.elementType === elementType);
  if (!el) return null;
  return {
    element: {
      elementType: el.elementType,
      name: el.name,
      category: el.category,
      description: el.description,
      useCases: el.useCases,
      interactivity: el.interactivity,
      bestFor: el.bestFor,
      status: el.status,
      sampleData: el.sampleData,
    },
    renderTip: "Pass sampleData directly into generate_screen's elements array to render a live demo of this element.",
  };
}

export function getElementsByCategory(category: string): Record<string, unknown> | null {
  const normalized = Object.keys(ELEMENT_CATEGORIES).find(
    (c) => c.toLowerCase().replace(/[^a-z]/g, "") === category.toLowerCase().replace(/[^a-z]/g, "")
  );
  if (!normalized) return null;

  const types = ELEMENT_CATEGORIES[normalized];
  const elements = ELEMENTS.filter((e) => types.includes(e.elementType));

  return {
    category: normalized,
    elements: elements.map((e) => ({
      elementType: e.elementType,
      name: e.name,
      description: e.description,
      bestFor: e.bestFor,
      status: e.status,
      sampleData: e.sampleData,
    })),
    renderTip: "Pass any element's sampleData into generate_screen to render a live demo.",
  };
}
