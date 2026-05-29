# Rendex for Zapier

Capture screenshots, generate PDFs, and process batch captures directly from your Zaps using the [Rendex](https://rendex.dev) rendering API.

## Features

- **Capture Screenshot** — Render any URL, raw HTML, or Markdown to PNG, JPEG, or WebP (with device presets, resize, and element-hiding controls)
- **Extract Text From a Web Page** — Pull the clean article text (Markdown, HTML, or JSON) plus title, author, and excerpt from any URL
- **Template Values** — Drop `{{placeholders}}` into your HTML or Markdown and fill them from earlier Zap steps, so one template produces a new invoice, report, or certificate every time the Zap runs
- **Generate PDF** — Convert pages to PDF with custom sizes, margins, and orientation
- **Capture Async** — Submit long-running captures with optional webhook callbacks
- **Submit Batch** — Process up to 500 URLs in a single request
- **Get Job Status** — Poll async capture results by job ID
- **Get Batch Status** — Check batch progress and retrieve all results
- **New Screenshot Ready** (trigger) — Fires when an async capture completes via webhook

## Template Values

Build one template, reuse it for every record. Write your HTML or Markdown with
`{{placeholders}}` — for example `<h1>Invoice {{number}}</h1><p>Total: {{total}}</p>` —
then map fields from earlier steps in your Zap into the **Template Values** dictionary
(`number` → `INV-014`, `total` → `$2,400`). Each time the Zap runs, Rendex fills in the
template and returns a finished image or PDF. Loops and nested values are supported, and
Template Values only applies when you provide HTML or Markdown (not a URL).

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
