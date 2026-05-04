# @brander/mcp-demo

A demo MCP server showcasing [BranderUX](https://branderux.com) — branded, interactive UI rendering inside AI chatbots. Uses [`@brander/mcp-tools`](https://www.npmjs.com/package/@brander/mcp-tools) to render rich UI components directly in conversations on Claude, ChatGPT, and other MCP-compatible hosts.

## Connect

### Claude.ai / ChatGPT (Remote)

Use the hosted URL — no installation needed:

```
https://mcp-demo.branderux.com/mcp
```

### Claude Desktop (Local)

Add to your config (`~/Library/Application Support/Claude/claude_desktop_config.json`):

```json
{
  "mcpServers": {
    "branderux-demo": {
      "command": "npx",
      "args": ["-y", "@brander/mcp-demo"],
      "env": {
        "BRANDER_PROJECT_ID": "your_project_id",
        "BRANDER_BETA_KEY": "bux_dp_your_key"
      }
    }
  }
}
```

## Tools

| Tool | Description |
|---|---|
| `generate_screen` | Render branded UI screens with 15 element types (charts, tables, grids, forms, cards, etc.) |
| `learn_about_branderux` | Learn about BranderUX — platform overview, integration methods, UI generation modes, AI features, no-code philosophy |
| `explore_elements` | Browse all 15 element types with descriptions, use cases, and sample data ready for `generate_screen` |
| `get_demo_scenario` | Get pre-built multi-element screen compositions (dashboards, catalogs, reports, showcases) |
| `get_integration_guide` | Step-by-step integration guides with real code examples for SDK, MCP Tools, and Embed methods |

## Try It

Connect to the demo and try these prompts:

- "What is BranderUX?"
- "Show me all available elements"
- "Show me a sales dashboard"
- "Create a product catalog with items and pricing"
- "How do I integrate BranderUX into my app?"
- "Show me an analytics report with charts"

## Demo Scenarios

| Scenario | Description |
|---|---|
| `sales-dashboard` | Revenue metrics, trend charts, and transaction tables |
| `product-catalog` | Item grid with categories and pricing |
| `analytics-report` | Multi-chart report with KPIs |
| `branderux-overview` | BranderUX capabilities rendered in its own elements |
| `element-showcase` | All 15 element types displayed as a product catalog |
| `integration-comparison` | SDK vs MCP vs Embed side-by-side comparison |

## How It Works

BranderUX uses the [MCP Apps](https://modelcontextprotocol.io/docs/extensions/apps) extension to render interactive UI inside AI conversations. When the AI calls `generate_screen`, it returns:

1. **Text summary** — for the AI to understand what was rendered
2. **Structured content** — element data (charts, tables, forms, etc.)
3. **HTML resource** — a bundled React app that renders the branded UI in a sandboxed iframe

All UI is styled with your project's brand colors, fonts, and layout — configured in the [BranderUX dashboard](https://branderux.com). No developers needed — AI agents handle the design, PMs control everything through the UI.

## Integration Pattern

Adding BranderUX to any MCP server is one line:

```typescript
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { registerBranderTools } from "@brander/mcp-tools";

const server = new McpServer({ name: "my-server", version: "1.0.0" });

// Add your own tools...

// One line — branded UI rendering for 15 element types
await registerBranderTools(server, {
  projectId: process.env.BRANDER_PROJECT_ID!,
  betaKey: process.env.BRANDER_BETA_KEY!,
});
```

## Environment Variables

| Variable | Required | Description |
|---|---|---|
| `BRANDER_PROJECT_ID` | Yes | Your BranderUX project ID |
| `BRANDER_BETA_KEY` | Yes | Design partner key (`bux_dp_...`) |
| `BRANDER_API_BASE_URL` | No | API URL (defaults to `https://branderux.com`) |

## License

MIT
