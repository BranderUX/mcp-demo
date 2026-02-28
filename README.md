# TechStore Pro — BranderUX MCP Demo

A reference implementation showing how to add [BranderUX](https://branderux.com) branded UI rendering to an MCP server using [`@brander/mcp-tools`](https://www.npmjs.com/package/@brander/mcp-tools).

This demo creates a fake B2B e-commerce company (TechStore Pro) with 8 business tools that Claude can use to search products, view orders, analyze customers, and display analytics — all rendered as branded, interactive UI inside Claude Desktop.

## Setup

```bash
# Clone the repo
git clone https://github.com/BranderUX/mcp-demo.git
cd mcp-demo

# Install dependencies
npm install

# Build
npm run build
```

## Configure Claude Desktop

Add this to your Claude Desktop config (`~/Library/Application Support/Claude/claude_desktop_config.json`):

```json
{
  "mcpServers": {
    "techstore-pro": {
      "command": "node",
      "args": ["/absolute/path/to/mcp-demo/dist/index.js"],
      "env": {
        "BRANDER_PROJECT_ID": "your_project_id",
        "BRANDER_BETA_KEY": "bux_dp_your_key"
      }
    }
  }
}
```

Then restart Claude Desktop.

## Environment Variables

| Variable | Required | Description |
|---|---|---|
| `BRANDER_PROJECT_ID` | Yes | Your BranderUX project ID |
| `BRANDER_BETA_KEY` | Yes | Design partner key (`bux_dp_...`) |
| `BRANDER_API_BASE_URL` | No | API URL (defaults to `https://app.branderux.com`) |

## Tools

| Tool | Description | Renders As |
|---|---|---|
| `search_products` | Search product catalog by name, category, price | Item Grid + Stats Grid |
| `get_product_details` | View full product details by ID | Header + Details Data + Alert |
| `get_orders` | List orders with filters (status, customer, date) | Data Table |
| `get_order_details` | View single order details | Header + Details Data |
| `get_customers` | Search customers by name, segment, tier | Data Table |
| `get_customer_profile` | View customer profile with order history | Header + Details Data + Line Chart |
| `get_analytics_summary` | Revenue, orders, and trend analytics | Header + Stats Grid + Line Chart + Pie Chart |
| `get_inventory_status` | Stock levels with low-stock alerts | Data Table + Alert |

## Try It

Once configured, try these prompts in Claude Desktop:

- "Show me all laptops under $2000"
- "What are the latest orders?"
- "Show me the analytics dashboard"
- "Which products are low on stock?"
- "Show me customer John's profile"

## Integration Pattern

The entire BranderUX integration is **one line** in [`src/index.ts`](src/index.ts):

```typescript
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { registerBranderTools } from "@brander/mcp-tools";

const server = new McpServer({ name: "techstore-pro", version: "1.0.0" });

// Your business tools
registerProductTools(server);
registerOrderTools(server);
// ...

// One line — branded UI for all element types
await registerBranderTools(server, {
  projectId: process.env.BRANDER_PROJECT_ID!,
  betaKey: process.env.BRANDER_BETA_KEY!,
});

await server.connect(new StdioServerTransport());
```

## Development

```bash
# Watch mode (auto-restarts on changes)
npm run dev

# Build for production
npm run build

# Run built server
npm start
```

## License

MIT
