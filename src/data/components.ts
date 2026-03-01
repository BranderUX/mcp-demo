// ============================================================================
// BranderUX Demo — Components
// ============================================================================

export interface BranderComponent {
  id: string;
  name: string;
  elementType: string;
  category: string;
  description: string;
  popularityScore: number;
  usageCount: number;
  props: string[];
  useCases: string[];
  bestFor: string[];
  exampleQuery: string;
  status: "stable" | "beta" | "new" | "coming-soon";
}

export const COMPONENTS: BranderComponent[] = [
  // --- Structure & Navigation ---
  {
    id: "comp-header",
    name: "Header",
    elementType: "header",
    category: "Structure & Navigation",
    description:
      "Page header with title, subtitle, and optional actions. The first element rendered on every screen — sets context and branding for the entire view.",
    popularityScore: 98,
    usageCount: 45200,
    props: ["title", "subtitle"],
    useCases: [
      "Dashboard page titles",
      "Section headers with subtitles",
      "Branded welcome messages",
    ],
    bestFor: ["all-screens", "navigation", "branding"],
    exampleQuery: "Show me the page header for my dashboard",
    status: "stable",
  },

  // --- Data & Analytics ---
  {
    id: "comp-stats-grid",
    name: "StatsGrid",
    elementType: "stats-grid",
    category: "Data & Analytics",
    description:
      "Grid of KPI metric cards with trend indicators. Each stat shows a title, value, and optional trend (up/down with percentage). Perfect for executive summaries and dashboard overviews.",
    popularityScore: 95,
    usageCount: 38400,
    props: ["stats[].id", "stats[].title", "stats[].value", "stats[].trend.direction", "stats[].trend.percentage"],
    useCases: [
      "Executive dashboard KPIs",
      "Revenue and growth metrics",
      "Real-time operational status",
    ],
    bestFor: ["dashboards", "analytics", "KPIs"],
    exampleQuery: "Show me key metrics for my platform",
    status: "stable",
  },
  {
    id: "comp-data-table",
    name: "DataTable",
    elementType: "data-table",
    category: "Data & Analytics",
    description:
      "Dynamic sortable and filterable table with built-in search. Handles pagination, multiple column types (text, number, status, date, currency), and row click actions that trigger new AI queries.",
    popularityScore: 92,
    usageCount: 41300,
    props: ["title", "columns[].key", "columns[].label", "rows[]", "pageSize"],
    useCases: [
      "Order and transaction lists",
      "User management tables",
      "Inventory tracking",
    ],
    bestFor: ["admin-panels", "CRMs", "data-management"],
    exampleQuery: "Show me a table of recent transactions",
    status: "stable",
  },
  {
    id: "comp-line-chart",
    name: "LineChart",
    elementType: "line-chart",
    category: "Data & Analytics",
    description:
      "Time-series line chart for visualizing trends over time. Supports tooltips, labeled axes, and click-to-query on data points for deeper exploration.",
    popularityScore: 88,
    usageCount: 29800,
    props: ["title", "labels[]", "data[]"],
    useCases: [
      "Revenue growth over time",
      "User acquisition trends",
      "Performance monitoring",
    ],
    bestFor: ["analytics", "trends", "forecasting"],
    exampleQuery: "Show me revenue growth over the last 6 months",
    status: "stable",
  },
  {
    id: "comp-pie-chart",
    name: "PieChart",
    elementType: "pie-chart",
    category: "Data & Analytics",
    description:
      "Proportional data visualization with labeled segments. Ideal for showing category breakdowns and distribution. Each segment is clickable for drill-down queries.",
    popularityScore: 82,
    usageCount: 22100,
    props: ["title", "data[].label", "data[].value"],
    useCases: [
      "Market share breakdown",
      "Category distribution",
      "Budget allocation",
    ],
    bestFor: ["breakdowns", "distribution", "reports"],
    exampleQuery: "Show me the breakdown of users by region",
    status: "stable",
  },
  {
    id: "comp-bar-chart",
    name: "BarChart",
    elementType: "bar-chart",
    category: "Data & Analytics",
    description:
      "Comparative bar chart with multiple series support. Can be stacked or grouped with legend and interactive click behaviors. Great for side-by-side comparisons.",
    popularityScore: 79,
    usageCount: 18600,
    props: ["title", "categories[]", "series[].name", "series[].data[]"],
    useCases: [
      "Quarterly revenue comparison",
      "Feature usage across segments",
      "A/B test result visualization",
    ],
    bestFor: ["comparisons", "benchmarks", "multi-metric"],
    exampleQuery: "Compare feature usage across different segments",
    status: "stable",
  },
  {
    id: "comp-details-data",
    name: "DetailsData",
    elementType: "details-data",
    category: "Data & Analytics",
    description:
      "Structured key-value detail cards grouped by category. Shows status chips, prices, dates, and text fields with semantic coloring. Perfect for entity detail views.",
    popularityScore: 90,
    usageCount: 35200,
    props: ["items[].id", "items[].title", "items[].value", "items[].type", "items[].category"],
    useCases: [
      "Order detail pages",
      "User profile summaries",
      "Product specifications",
    ],
    bestFor: ["detail-pages", "profiles", "specifications"],
    exampleQuery: "Show me the details for this order",
    status: "stable",
  },

  // --- Content & Media ---
  {
    id: "comp-item-grid",
    name: "ItemGrid",
    elementType: "item-grid",
    category: "Content & Media",
    description:
      "Responsive grid of cards with images, titles, descriptions, and metadata. Built-in search, pagination, and click-to-query on each card for drill-down navigation.",
    popularityScore: 93,
    usageCount: 39700,
    props: ["title", "items[].id", "items[].title", "items[].subtitle", "items[].image"],
    useCases: [
      "Product catalog browsing",
      "Team member directory",
      "Content library",
    ],
    bestFor: ["catalogs", "product-pages", "galleries"],
    exampleQuery: "Browse all available products",
    status: "stable",
  },
  {
    id: "comp-item-card",
    name: "ItemCard",
    elementType: "item-card",
    category: "Content & Media",
    description:
      "Individual card component with image, title, subtitle, and optional metadata. Used standalone for featured items or as building blocks within an ItemGrid.",
    popularityScore: 85,
    usageCount: 28400,
    props: ["title", "subtitle", "image", "metadata"],
    useCases: [
      "Featured product spotlight",
      "Highlighted announcement",
      "Hero content card",
    ],
    bestFor: ["featured-items", "spotlights", "highlights"],
    exampleQuery: "Show me the featured product",
    status: "stable",
  },
  {
    id: "comp-image",
    name: "Image",
    elementType: "image",
    category: "Content & Media",
    description:
      "Responsive image display with alt text, captions, and configurable sizing. Supports cover and contain fit modes for flexible visual presentation.",
    popularityScore: 76,
    usageCount: 15400,
    props: ["src", "alt", "caption", "fit"],
    useCases: [
      "Architecture diagrams",
      "Product screenshots",
      "Visual documentation",
    ],
    bestFor: ["media", "illustrations", "screenshots"],
    exampleQuery: "Show me the architecture diagram",
    status: "stable",
  },

  // --- Communication ---
  {
    id: "comp-chat-bubble",
    name: "ChatBubble",
    elementType: "chat-bubble",
    category: "Communication",
    description:
      "Text message bubble for conversational AI responses. Supports full markdown rendering including headings, lists, code blocks, and links for rich formatted content.",
    popularityScore: 74,
    usageCount: 12800,
    props: ["message"],
    useCases: [
      "AI explanations and summaries",
      "Conversational responses",
      "Text-heavy content display",
    ],
    bestFor: ["explanations", "AI-responses", "text-heavy"],
    exampleQuery: "Explain how this feature works",
    status: "stable",
  },
  {
    id: "comp-alert",
    name: "Alert",
    elementType: "alert",
    category: "Communication",
    description:
      "Notification banner for success, error, warning, and info messages. Supports action buttons with click-to-query and dismissible states. Draws attention to important information.",
    popularityScore: 80,
    usageCount: 16900,
    props: ["title", "message", "severity", "actionLabel", "actionQuery"],
    useCases: [
      "Low stock warnings",
      "Success confirmations",
      "System status notifications",
    ],
    bestFor: ["notifications", "warnings", "system-status"],
    exampleQuery: "Are there any system alerts?",
    status: "stable",
  },

  // --- User Interaction ---
  {
    id: "comp-form",
    name: "Form",
    elementType: "form",
    category: "User Interaction",
    description:
      "Dynamic form with text, email, date, number, select, textarea, and checkbox field types. Includes client-side validation, submit actions, and field-level event handling.",
    popularityScore: 71,
    usageCount: 11200,
    props: ["title", "fields[].name", "fields[].label", "fields[].type", "submitLabel"],
    useCases: [
      "Configuration forms",
      "Contact and feedback forms",
      "Data entry interfaces",
    ],
    bestFor: ["data-entry", "configuration", "onboarding"],
    exampleQuery: "Let me configure my project settings",
    status: "stable",
  },
  {
    id: "comp-button",
    name: "Button",
    elementType: "button",
    category: "User Interaction",
    description:
      "Interactive button with two behaviors: action (sends a query back to AI on click) or link (opens a URL). Three visual variants: primary, secondary, and tertiary.",
    popularityScore: 78,
    usageCount: 14300,
    props: ["label", "action", "variant", "url"],
    useCases: [
      "Call-to-action buttons",
      "Navigation actions",
      "External link buttons",
    ],
    bestFor: ["CTAs", "navigation", "actions"],
    exampleQuery: "Show me actions I can take",
    status: "stable",
  },

  {
    id: "comp-video",
    name: "VideoPlayer",
    elementType: "video",
    category: "Content & Media",
    description:
      "Embedded video player supporting YouTube URLs and direct mp4/webm files. Configurable aspect ratios (16:9, 4:3, 1:1), optional autoplay, and a Discuss button that sends an AI query about the video content.",
    popularityScore: 68,
    usageCount: 8200,
    props: ["id", "src", "title", "description", "action", "aspectRatio", "autoplay"],
    useCases: [
      "Product demo videos",
      "Tutorial and onboarding content",
      "Marketing campaign previews",
    ],
    bestFor: ["tutorials", "demos", "media-rich"],
    exampleQuery: "Show me the product demo video",
    status: "stable",
  },

  // --- Coming Soon ---
  {
    id: "comp-custom",
    name: "Custom Elements (Vibe Coding)",
    elementType: "custom",
    category: "Customization",
    description:
      "Create your own custom element types using AI-assisted vibe coding. Describe the component you need in natural language, and BranderUX generates a fully functional, branded element that integrates seamlessly with the platform — including click-to-query, streaming, and brand theming.",
    popularityScore: 0,
    usageCount: 0,
    props: ["user-defined"],
    useCases: [
      "Industry-specific visualizations",
      "Custom workflow components",
      "Branded interactive widgets",
      "Domain-specific data displays",
    ],
    bestFor: ["custom-needs", "industry-specific", "extensibility"],
    exampleQuery: "Create a custom Gantt chart element for my project management app",
    status: "coming-soon",
  },
];
