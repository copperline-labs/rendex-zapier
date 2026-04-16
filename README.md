# Rendex for Zapier

Capture screenshots, generate PDFs, and process batch captures directly from your Zaps using the [Rendex](https://rendex.dev) rendering API.

## Features

- **Capture Screenshot** — Render any URL or raw HTML to PNG, JPEG, or WebP
- **Generate PDF** — Convert pages to PDF with custom sizes, margins, and orientation
- **Capture Async** — Submit long-running captures with optional webhook callbacks
- **Submit Batch** — Process up to 500 URLs in a single request
- **Get Job Status** — Poll async capture results by job ID
- **Get Batch Status** — Check batch progress and retrieve all results
- **New Screenshot Ready** (trigger) — Fires when an async capture completes via webhook

## Authentication

This integration uses API Key authentication. Get your key at [rendex.dev/dashboard/keys](https://rendex.dev/dashboard/keys).

Keys follow the format `rdx_` followed by 22 alphanumeric characters.

## Development

```bash
# Install dependencies
npm install

# Build TypeScript
npm run build

# Type-check without emitting
npm run typecheck

# Run tests
npm test

# Validate Zapier app structure
npx zapier validate

# Generate brand logo (requires RENDEX_API_KEY)
npm run generate-logo
```

## Deployment

This package is deployed via the Zapier Platform CLI from the public mirror repo [copperline-labs/rendex-zapier](https://github.com/copperline-labs/rendex-zapier). See the release runbook for the full release flow.

```bash
zapier push       # Upload to Zapier
zapier promote    # Submit for review
```

## Links

- [Rendex API Documentation](https://rendex.dev/docs)
- [Rendex Dashboard](https://rendex.dev/dashboard)
- [Zapier Developer Platform](https://developer.zapier.com)

## License

MIT — Copperline Labs LLC
