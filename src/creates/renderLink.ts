import { RENDER_LINK_ENDPOINT } from "../constants";
import {
  sourceTypeField,
  sourceValueFields,
  templateDataFields,
  formatField,
  pdfDynamicFields,
  advancedFields,
} from "../fields/screenshotFields";
import { buildRequestBody } from "../lib/request";
import type { Bundle, ZObject } from "zapier-platform-core";

// Synchronous, inline-result action — no async/polling. POST /v1/render/link
// only signs and returns a hosted URL (the actual image/PDF renders lazily on
// the first GET /v1/render), so there's no browser cold-start and it always
// finishes well inside Zapier's 30s action budget. The minted URL is meant to
// be dropped into a <meta property="og:image"> tag or an <img src>; Rendex
// renders once on first hit and serves the edge-cached copy on every share.

// Dedicated to this action — kept OUT of screenshotFields.ts on purpose:
// expiresIn is not a ScreenshotRequestSchema param, so the param-parity gate
// (which reads keys from screenshotFields.ts) must not see it.
const expiresInField = {
  key: "expiresIn",
  label: "Link Expiry (seconds)",
  type: "integer" as const,
  required: false,
  helpText:
    "How long the link stays valid, in seconds (3600–2592000). Leave blank to use the default (30 days).",
};

const perform = async (z: ZObject, bundle: Bundle) => {
  const body = buildRequestBody(bundle.inputData);
  if (bundle.inputData.expiresIn) {
    body.expiresIn = parseInt(bundle.inputData.expiresIn as string, 10);
  }

  const response = await z.request({
    method: "POST",
    url: RENDER_LINK_ENDPOINT,
    body,
  });
  const data = response.json?.data ?? response.json;

  return {
    url: data?.url ?? null,
    expiresAt: data?.expiresAt ?? null,
    format: data?.format ?? (bundle.inputData.format as string) ?? "png",
    cacheTtl: data?.cacheTtl ?? null,
  };
};

export default {
  key: "render_link",
  noun: "Render Link",
  display: {
    label: "Create Render Link",
    description:
      "Create a hosted, auto-caching image or PDF link for a URL, HTML, or Markdown — perfect for og:image social preview tags.",
  },
  operation: {
    inputFields: [
      sourceTypeField,
      sourceValueFields,
      templateDataFields,
      formatField,
      pdfDynamicFields,
      ...advancedFields,
      expiresInField,
    ],
    perform,
    sample: {
      url: "https://api.rendex.dev/v1/render?p=eyJ1cmwiOiJodHRwczovL2V4YW1wbGUuY29tIn0&uid=user_abc123&exp=1700000000&sig=a1b2c3d4e5f6",
      expiresAt: "2026-07-23T12:00:00.000Z",
      format: "png",
      cacheTtl: 2592000,
    },
  },
};
