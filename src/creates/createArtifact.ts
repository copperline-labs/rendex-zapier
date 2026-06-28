import { ARTIFACT_ENDPOINT } from "../constants";
import { normalizeUrl } from "../lib/request";
import type { Bundle, ZObject } from "zapier-platform-core";

// Synchronous, inline-result action — no async/polling. POST /v1/artifact
// composes a branded HTML document from your Markdown/HTML + a small theme,
// renders EACH requested format (PDF and/or PNG) and a hosted share page, and
// returns the signed URLs in the same response ({ pdfUrl, pngUrl, shareUrl,
// expiresAt }). One credit is charged per rendered format (refunded in full on
// failure). The render runs both formats in parallel server-side, so it
// finishes inside Zapier's 30s action budget.
//
// The request body mirrors ArtifactRequestSchema in
// packages/screenshot-api/src/services/artifact.ts EXACTLY. That schema is
// `.strict()` on both the top level and the nested `branding` object, so we
// send ONLY its keys — top-level `content` / `inputFormat` / `formats` / `data`
// / `expiresIn`, and a `branding` object limited to `logo` / `accentColor` /
// `header` / `footer`. Any stray key would be rejected with a 400. The
// friendly field LABELS ("Brand Name", "Logo URL") map onto those real API keys.

// Zapier delivers a `list: true` field as an array, but a single selection can
// arrive as a bare string — normalize both into a clean string[] of choices.
function normalizeFormats(val: unknown): string[] {
  if (Array.isArray(val)) {
    return val.map((v) => String(v).trim()).filter(Boolean);
  }
  if (typeof val === "string" && val.trim()) {
    return [val.trim()];
  }
  return [];
}

const perform = async (z: ZObject, bundle: Bundle) => {
  const input = bundle.inputData;

  const body: Record<string, unknown> = {
    content: input.content,
  };

  if (input.inputFormat) body.inputFormat = input.inputFormat;

  const formats = normalizeFormats(input.formats);
  if (formats.length > 0) body.formats = formats;

  // branding — only the four keys the strict ArtifactBrandingSchema accepts.
  const branding: Record<string, unknown> = {};
  if (input.header) branding.header = input.header;
  if (input.accentColor) branding.accentColor = input.accentColor;
  if (input.logo) branding.logo = normalizeUrl(input.logo);
  if (input.footer) branding.footer = input.footer;
  if (Object.keys(branding).length > 0) body.branding = branding;

  if (input.expiresIn) body.expiresIn = parseInt(input.expiresIn as string, 10);

  // Template values — dict of {{placeholder}} → value. Zapier delivers dict
  // fields as plain objects; pass through as-is when non-empty.
  if (
    input.data &&
    typeof input.data === "object" &&
    Object.keys(input.data as object).length > 0
  ) {
    body.data = input.data;
  }

  const response = await z.request({
    method: "POST",
    url: ARTIFACT_ENDPOINT,
    body,
  });
  const data = response.json?.data ?? response.json;

  return {
    pdfUrl: data?.pdfUrl ?? null,
    pngUrl: data?.pngUrl ?? null,
    shareUrl: data?.shareUrl ?? null,
    expiresAt: data?.expiresAt ?? null,
  };
};

export default {
  key: "create_artifact",
  noun: "Artifact",
  display: {
    label: "Create Branded Artifact",
    description:
      "Turn Markdown or HTML into a branded, shareable document in one step — get back a hosted PDF, PNG, and share link. Perfect for reports, invoices, and one-pagers.",
  },
  operation: {
    inputFields: [
      {
        key: "content",
        label: "Content",
        type: "text" as const,
        required: true,
        helpText:
          "The Markdown or HTML to turn into a branded document. Headings, lists, links, tables, and code blocks are styled for you. Up to ~4 MB.",
      },
      {
        key: "inputFormat",
        label: "Content Format",
        type: "string" as const,
        choices: { markdown: "Markdown", html: "HTML" },
        default: "markdown",
        required: false,
        helpText: "Whether the Content above is Markdown or raw HTML. Default: Markdown.",
      },
      {
        key: "formats",
        label: "Output Formats",
        type: "string" as const,
        list: true,
        choices: { pdf: "PDF", png: "PNG" },
        required: false,
        helpText:
          "Which files to produce. Pick PDF, PNG, or both. Each format counts as one render. Leave empty to get both PDF and PNG.",
      },
      {
        key: "header",
        label: "Brand Name",
        type: "string" as const,
        required: false,
        helpText:
          "Optional brand or document name shown in the header beside your logo (and used as the share page title).",
      },
      {
        key: "logo",
        label: "Logo URL",
        type: "string" as const,
        required: false,
        helpText: "Optional https link to a logo image shown in the header.",
      },
      {
        key: "accentColor",
        label: "Accent Color",
        type: "string" as const,
        required: false,
        helpText:
          "Optional accent color for the header bar, links, and headings — a hex value like #EA580C or a CSS color name.",
      },
      {
        key: "footer",
        label: "Footer",
        type: "string" as const,
        required: false,
        helpText: "Optional footer line shown at the bottom of every page.",
      },
      {
        key: "expiresIn",
        label: "Link Expiry (seconds)",
        type: "integer" as const,
        required: false,
        helpText:
          "How long the hosted PDF, PNG, and share links stay valid, in seconds (3600–2592000). Leave blank to use the default (24 hours).",
      },
      {
        key: "data",
        label: "Template Values",
        dict: true,
        required: false,
        helpText:
          "Optional. Fill in the {{placeholders}} in your Content before rendering. Add one row per placeholder — the key is the placeholder name (without curly braces) and the value is what replaces it. For example: key = name, value = Alice replaces {{name}} with Alice.",
      },
    ],
    perform,
    sample: {
      pdfUrl:
        "https://api.rendex.dev/v1/images/captures/usr_abc123/2026-06/11111111-2222-3333-4444-555555555555.pdf?expires=1700000000&sig=a1b2c3d4e5f6",
      pngUrl:
        "https://api.rendex.dev/v1/images/captures/usr_abc123/2026-06/66666666-7777-8888-9999-000000000000.png?expires=1700000000&sig=a1b2c3d4e5f6",
      shareUrl:
        "https://api.rendex.dev/v1/images/captures/usr_abc123/2026-06/aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee.html?expires=1700000000&sig=a1b2c3d4e5f6",
      expiresAt: "2026-07-23T12:00:00.000Z",
    },
  },
};
