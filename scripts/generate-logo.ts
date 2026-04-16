#!/usr/bin/env bun
// Generates the Rendex Zapier app icon by dogfooding the live Rendex API
// with an inline HTML template. Scaled from apps/landing/public/brand/icon-400.html
// (the canonical Rendex brand mark) to 512x512 for Zapier's app listing.
//
// Usage:
//   bun run packages/rendex-zapier/scripts/generate-logo.ts
//
// Reads RENDEX_API_KEY from env or falls back to .mcp.json (same source
// the Rendex MCP server uses in Claude Code sessions).

import { readFile, writeFile, mkdir } from "node:fs/promises"
import { join, dirname } from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = dirname(fileURLToPath(import.meta.url))
const assetsDir = join(__dirname, "..", "assets")
const projectRoot = join(__dirname, "..", "..", "..")

async function resolveApiKey(): Promise<string> {
  if (process.env.RENDEX_API_KEY) return process.env.RENDEX_API_KEY

  try {
    const mcpConfig = JSON.parse(await readFile(join(projectRoot, ".mcp.json"), "utf8"))
    const key = mcpConfig?.mcpServers?.rendex?.env?.RENDEX_API_KEY
    if (key) return key
  } catch {
    // .mcp.json missing or malformed — fall through
  }

  console.error("error: RENDEX_API_KEY not found in env or .mcp.json")
  console.error("create one at https://rendex.dev/dashboard/keys, then:")
  console.error("  export RENDEX_API_KEY=rdx_...")
  process.exit(1)
}

const apiKey = await resolveApiKey()

const HTML = `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
  @import url('https://fonts.googleapis.com/css2?family=Geist:wght@800&display=swap');
  html, body { margin: 0; padding: 0; }
  body {
    width: 512px;
    height: 512px;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #0c0a09;
    border-radius: 82px;
    position: relative;
  }
  .glow {
    position: absolute;
    width: 256px; height: 256px;
    border-radius: 50%;
    filter: blur(77px);
    opacity: 0.28;
  }
  .glow-orange { background: #F97316; left: 26px; top: 26px; }
  .glow-cyan { background: #22D3EE; right: 26px; bottom: 26px; }
  .letter {
    position: relative;
    z-index: 1;
    font-family: 'Geist', system-ui, sans-serif;
    font-size: 332px;
    font-weight: 800;
    line-height: 1;
    background: linear-gradient(
      145deg,
      #F97316 0%,
      #FB923C 25%,
      #22D3EE 65%,
      #06B6D4 100%
    );
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
</style>
</head>
<body>
  <div class="glow glow-orange"></div>
  <div class="glow glow-cyan"></div>
  <div class="letter">R</div>
</body>
</html>`

type CaptureData = {
  image: string
  contentType: string
  url: string
  width: number
  height: number
  format: string
  bytesSize: number
  capturedAt: string
  quality: string
  waitStrategy: string
  loadTimeMs: number
  renderingEngine?: string
}

type ApiResponse = {
  success: boolean
  data: CaptureData
  meta: { requestId: string; timestamp: string }
}

async function capture(
  width: number,
  height: number,
  deviceScaleFactor: number,
  outputFilename: string,
) {
  const res = await fetch("https://api.rendex.dev/v1/screenshot/json", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      html: HTML,
      format: "png",
      width,
      height,
      deviceScaleFactor,
      waitUntil: "networkidle2",
      delay: 1500,
    }),
  })

  if (!res.ok) {
    const body = await res.text()
    throw new Error(`rendex api ${res.status}: ${body}`)
  }

  const body = (await res.json()) as ApiResponse
  if (!body.success) throw new Error(`api error: ${JSON.stringify(body)}`)

  const buffer = Buffer.from(body.data.image, "base64")
  const outputPath = join(assetsDir, outputFilename)
  await writeFile(outputPath, buffer)

  const kb = (buffer.byteLength / 1024).toFixed(1)
  const actualPx = `${width * deviceScaleFactor}x${height * deviceScaleFactor}`
  console.log(
    `  ${outputFilename.padEnd(24)} ${actualPx.padEnd(10)} ${kb.padStart(6)} KB  load=${body.data.loadTimeMs}ms`,
  )
}

async function main() {
  await mkdir(assetsDir, { recursive: true })

  console.log("generating rendex zapier brand assets via api.rendex.dev")
  console.log("")

  // 512x512 exact — Zapier's documented app listing size
  await capture(512, 512, 1, "rendex-512.png")

  // 1024x1024 retina — fallback / future-proof for higher-DPI listings
  await capture(512, 512, 2, "rendex-1024.png")

  console.log("")
  console.log("done. preview files:")
  console.log(`  open ${join(assetsDir, "rendex-512.png")}`)
}

main().catch((err) => {
  console.error(err instanceof Error ? err.message : err)
  process.exit(1)
})
