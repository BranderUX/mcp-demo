// ============================================================================
// BranderUX Demo — Example Scenarios
// ============================================================================

export interface Scenario {
  id: string;
  name: string;
  industry: string;
  description: string;
  integrationMethod: "SDK" | "MCP" | "Embed";
  aiProvider: string;
  componentsUsed: string[];
  screensConfigured: number;
  expectedResults: {
    engagementLift: number;
    responseTimeMs: number;
    userSatisfaction: number;
    monthlyInteractions: number;
  };
  tags: string[];
}

export const SCENARIOS: Scenario[] = [
  {
    id: "sc-001",
    name: "Fintech Transaction Dashboard",
    industry: "Fintech",
    description:
      "Real-time transaction monitoring dashboard with fraud alert notifications. " +
      "Users ask natural language questions about payments, and the AI responds with " +
      "interactive charts, sortable transaction tables, and actionable alerts — all " +
      "rendered in the company's brand.",
    integrationMethod: "SDK",
    aiProvider: "Anthropic (Claude)",
    componentsUsed: ["header", "stats-grid", "data-table", "line-chart", "alert"],
    screensConfigured: 4,
    expectedResults: {
      engagementLift: 47,
      responseTimeMs: 180,
      userSatisfaction: 4.8,
      monthlyInteractions: 125_000,
    },
    tags: ["finance", "real-time", "dashboards", "alerts"],
  },
  {
    id: "sc-002",
    name: "Healthcare Patient Portal",
    industry: "Healthcare",
    description:
      "Patient-facing AI assistant with appointment scheduling, health metric tracking, " +
      "and care plan summaries. Patients interact through natural language and receive " +
      "structured forms for booking, stats grids for vitals, and detail cards for records.",
    integrationMethod: "Embed",
    aiProvider: "OpenAI (GPT)",
    componentsUsed: ["header", "form", "stats-grid", "details-data", "chat-bubble", "button"],
    screensConfigured: 5,
    expectedResults: {
      engagementLift: 62,
      responseTimeMs: 220,
      userSatisfaction: 4.7,
      monthlyInteractions: 89_000,
    },
    tags: ["healthcare", "patient-portal", "forms", "scheduling"],
  },
  {
    id: "sc-003",
    name: "E-commerce Product Assistant",
    industry: "E-commerce",
    description:
      "Visual product catalog assistant with inventory tracking and order management. " +
      "Shoppers browse products through interactive grids, view analytics on popular items, " +
      "and track orders — all through conversational AI with branded UI rendering.",
    integrationMethod: "MCP",
    aiProvider: "Anthropic (Claude)",
    componentsUsed: ["item-grid", "item-card", "data-table", "stats-grid", "pie-chart"],
    screensConfigured: 5,
    expectedResults: {
      engagementLift: 38,
      responseTimeMs: 150,
      userSatisfaction: 4.6,
      monthlyInteractions: 210_000,
    },
    tags: ["e-commerce", "catalog", "inventory", "orders"],
  },
  {
    id: "sc-004",
    name: "Supply Chain Fleet Tracker",
    industry: "Supply Chain & Logistics",
    description:
      "Fleet tracking dashboard with shipment analytics and route performance comparisons. " +
      "Operations teams ask about delivery status, compare route efficiency with bar charts, " +
      "and receive proactive alerts for delays — all within a branded interface.",
    integrationMethod: "SDK",
    aiProvider: "Google (Gemini)",
    componentsUsed: ["header", "stats-grid", "line-chart", "bar-chart", "data-table", "alert"],
    screensConfigured: 4,
    expectedResults: {
      engagementLift: 55,
      responseTimeMs: 195,
      userSatisfaction: 4.9,
      monthlyInteractions: 78_000,
    },
    tags: ["logistics", "fleet", "real-time", "analytics"],
  },
  {
    id: "sc-005",
    name: "Developer Docs Explorer",
    industry: "Developer Tools",
    description:
      "Interactive API documentation explorer where developers ask questions in natural language " +
      "and receive structured responses — endpoint details as key-value cards, architecture diagrams " +
      "as images, code examples in chat bubbles, and quick-action buttons for common operations.",
    integrationMethod: "MCP",
    aiProvider: "Anthropic (Claude)",
    componentsUsed: ["header", "details-data", "chat-bubble", "button", "image", "alert"],
    screensConfigured: 3,
    expectedResults: {
      engagementLift: 41,
      responseTimeMs: 130,
      userSatisfaction: 4.5,
      monthlyInteractions: 156_000,
    },
    tags: ["devtools", "documentation", "API", "interactive"],
  },
  {
    id: "sc-006",
    name: "EdTech Learning Dashboard",
    industry: "Education",
    description:
      "Student progress tracking and course recommendation system. Teachers view class performance " +
      "through stats grids and line charts, browse course catalogs with item grids, and configure " +
      "assignment settings through forms — all AI-driven with branded visuals.",
    integrationMethod: "Embed",
    aiProvider: "OpenAI (GPT)",
    componentsUsed: ["header", "stats-grid", "line-chart", "item-grid", "pie-chart", "form"],
    screensConfigured: 4,
    expectedResults: {
      engagementLift: 52,
      responseTimeMs: 200,
      userSatisfaction: 4.7,
      monthlyInteractions: 67_000,
    },
    tags: ["education", "progress-tracking", "courses", "analytics"],
  },
  {
    id: "sc-007",
    name: "Insurance Claims Processor",
    industry: "Insurance",
    description:
      "Claims processing dashboard with approval workflows. Adjusters view claim details " +
      "through structured cards, manage workload via data tables, submit evaluations through " +
      "forms, and receive priority alerts — reducing manual processing time significantly.",
    integrationMethod: "SDK",
    aiProvider: "Anthropic (Claude)",
    componentsUsed: ["header", "data-table", "details-data", "form", "stats-grid", "alert", "button"],
    screensConfigured: 6,
    expectedResults: {
      engagementLift: 59,
      responseTimeMs: 250,
      userSatisfaction: 4.8,
      monthlyInteractions: 94_000,
    },
    tags: ["insurance", "claims", "workflows", "processing"],
  },
  {
    id: "sc-008",
    name: "Marketing Campaign Dashboard",
    industry: "Marketing & Analytics",
    description:
      "Campaign performance dashboard with real-time metrics. Marketers ask about campaign ROI " +
      "and receive stats grids with KPIs, line charts showing trends over time, pie charts for " +
      "channel distribution, and bar charts comparing A/B test results.",
    integrationMethod: "Embed",
    aiProvider: "OpenAI (GPT)",
    componentsUsed: ["header", "stats-grid", "line-chart", "bar-chart", "pie-chart", "data-table"],
    screensConfigured: 3,
    expectedResults: {
      engagementLift: 44,
      responseTimeMs: 175,
      userSatisfaction: 4.6,
      monthlyInteractions: 183_000,
    },
    tags: ["marketing", "campaigns", "real-time", "ROI"],
  },
  {
    id: "sc-009",
    name: "Smart Grid Energy Monitor",
    industry: "Energy & Utilities",
    description:
      "Smart grid monitoring with consumption analytics and anomaly detection. Operators view " +
      "real-time consumption trends, compare regional performance with bar charts, and receive " +
      "visual anomaly alerts before issues escalate — all through AI-driven branded interfaces.",
    integrationMethod: "MCP",
    aiProvider: "Google (Gemini)",
    componentsUsed: ["header", "stats-grid", "line-chart", "bar-chart", "alert", "image"],
    screensConfigured: 3,
    expectedResults: {
      engagementLift: 48,
      responseTimeMs: 210,
      userSatisfaction: 4.5,
      monthlyInteractions: 42_000,
    },
    tags: ["energy", "monitoring", "anomaly-detection", "real-time"],
  },
  {
    id: "sc-010",
    name: "SaaS CRM Pipeline Manager",
    industry: "SaaS / CRM",
    description:
      "Customer relationship management with visual pipeline tracking. Sales teams ask about " +
      "deal status and receive pipeline visualizations as pie charts, lead tables with status " +
      "chips, customer detail cards, and grid views of accounts — all branded to match the CRM.",
    integrationMethod: "SDK",
    aiProvider: "Anthropic (Claude)",
    componentsUsed: ["header", "stats-grid", "data-table", "pie-chart", "details-data", "item-grid"],
    screensConfigured: 5,
    expectedResults: {
      engagementLift: 51,
      responseTimeMs: 165,
      userSatisfaction: 4.7,
      monthlyInteractions: 137_000,
    },
    tags: ["SaaS", "CRM", "pipeline", "sales"],
  },
];
