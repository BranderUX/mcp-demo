# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What This Is

A demo MCP server showcasing BranderUX: branded, interactive screens rendered live inside AI chatbots. Published as `@brander/mcp-demo` on npm. Uses `@brander/mcp-tools` to register the `generate_screen` tool and adds 4 demo-specific knowledge tools on top.

## Commands

- **Build:** `npm run build` (runs `tsc`, outputs to `dist/`)
- **Dev:** `npm run dev` (runs `tsx --watch src/index.ts`, stdio transport, needs env vars)
- **Start:** `npm start` (runs built `dist/index.js`)

No test framework is configured.

## Architecture

### Two transports, one server factory

- `src/index.ts`, stdio entry point for local use (Claude Desktop, `npx`)
- `api/mcp.ts`, Vercel serverless HTTP entry point (stateless `StreamableHTTPServerTransport`)
- `src/create-server.ts`, shared factory that creates the `McpServer`, registers all tools, and returns it

### Tool registration pattern

Each tool is a `register*Tool(server)` function in `src/tools/`. They call `server.registerTool()` with a Zod input schema and an async handler. The 4 demo tools are pure data lookups (no external calls):

| File | Tool name | Data source |
|---|---|---|
| `tools/platform-overview.ts` | `learn_about_branderux` | `data/platform.ts` |
| `tools/element-showcase.ts` | `explore_elements` | `data/elements.ts` |
| `tools/demo-scenarios.ts` | `get_demo_scenario` | `data/scenarios.ts` |
| `tools/integration-guide.ts` | `get_integration_guide` | `data/integrations.ts` |

After the 4 demo tools, `registerBranderTools()` from `@brander/mcp-tools` adds the `generate_screen` tool (the actual rendering engine).

### Deployment

Hosted on Vercel at `mcp-demo.branderux.com/mcp`. The `vercel.json` rewrites `/mcp` → `/api/mcp` and bundles only the necessary `node_modules`. No build step on Vercel, the serverless function imports from `src/` directly via tsx.

## Environment Variables

- `BRANDER_PROJECT_ID` (required), BranderUX project ID
- `BRANDER_BETA_KEY` (required), design partner key (`bux_dp_...`)
- `BRANDER_API_BASE_URL` (optional), overrides the default `https://branderux.com`

## Key Dependencies

- `@brander/mcp-tools`, provides `registerBranderTools()` which adds `generate_screen` + image fetching
- `@modelcontextprotocol/sdk`, MCP server framework (`McpServer`, transports)
- `zod` (v4), input schema validation for tool parameters
