# @brander/mcp-demo

A demo MCP server showcasing [BranderUX](https://branderux.com) branded UI rendering inside AI chatbots. Uses [`@brander/mcp-tools`](https://www.npmjs.com/package/@brander/mcp-tools) to render interactive, branded UI components directly in conversations on Claude, ChatGPT, and other MCP-compatible hosts.

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
| `generate_screen` | Render branded UI screens (charts, tables, grids, forms, cards, etc.) |
| `browse_components` | Browse available BranderUX UI components |
| `get_component_details` | View details of a specific component |
| `browse_scenarios` | Explore demo business scenarios |
| `get_scenario_details` | View a specific scenario with sample data |
| `get_platform_analytics` | View platform analytics and metrics |
| `get_feature_overview` | Explore BranderUX platform features |
| `get_integration_guide` | Get integration guides for different frameworks |
| `explore_ai_capabilities` | Explore AI-powered UI generation capabilities |

## Try It

Connect to the demo and try these prompts:

- "Show me a sales dashboard with analytics"
- "Create a product catalog with items and pricing"
- "Display a customer data table"
- "Show a login form with email and password"
- "Create a stats overview with revenue metrics"

## How It Works

BranderUX uses the [MCP Apps](https://modelcontextprotocol.io/docs/extensions/apps) standard to render interactive UI inside AI conversations. When the AI calls `generate_screen`, it returns:

1. **Text summary** — for the AI to understand what was rendered
2. **Structured content** — element data (charts, tables, forms, etc.)
3. **HTML resource** — a bundled React app that renders the branded UI in a sandboxed iframe

All UI is styled with your project's brand colors, fonts, and layout — configured in the BranderUX dashboard.

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
