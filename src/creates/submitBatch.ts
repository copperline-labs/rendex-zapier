import { BATCH_ENDPOINT } from "../constants";
import { advancedFields, pdfFieldsArray } from "../fields/screenshotFields";
import { buildRequestBody, normalizeUrl, validateOptionalWebhookUrl } from "../lib/request";
import type { Bundle, ZObject } from "zapier-platform-core";

// Advanced options accepted as batch `defaults`. The /v1/screenshot/batch
// endpoint validates `defaults` with CaptureParamsSchema, which strips
// per-job-only params — so cookies, headers, selector, blockResourceTypes,
// waitForSelector, and pdfMargin are intentionally NOT offered here (the API
// would silently drop them). Everything CaptureParamsSchema accepts is exposed.
const BATCH_DEFAULT_KEYS = [
  "bestAttempt",
  "blockAds",
  "css",
  "darkMode",
  "delay",
  "deviceScaleFactor",
  "fullPage",
  "geo",
  "geoCity",
  "geoState",
  "height",
  "js",
  "quality",
  "timeout",
  "userAgent",
  "waitUntil",
  "width",
];

// Keys buildRequestBody may set that the batch defaults schema rejects.
const BATCH_STRIPPED_KEYS = [
  "url",
  "html",
  "markdown",
  "data",
  "async",
  "cookies",
  "headers",
  "selector",
  "blockResourceTypes",
  "waitForSelector",
  "pdfMargin",
];

// PDF page options appear only when Output Format is PDF. pdfMargin is omitted
// because the batch defaults schema (CaptureParamsSchema) doesn't accept it.
const batchPdfDynamicFields = (_z: ZObject, bundle: Bundle) => {
  const format = (bundle.inputData?.format as string) || "png";
  if (format !== "pdf") return [];
  return pdfFieldsArray.filter((f) => f.key !== "pdfMargin");
};

const batchFields = [
  {
    key: "urls",
    label: "URLs",
    type: "text" as const,
    required: true,
    helpText:
      "Newline-separated list of URLs to capture. Each URL becomes an individual screenshot job. Maximum batch size depends on your Rendex plan (separate from your Zapier plan). Free plan allows 5 URLs per batch. Starter plan allows 25. Pro plan allows 100. Enterprise plan allows 500. Requests exceeding your Rendex plan limit return a 403 PLAN_UPGRADE_REQUIRED error.",
  },
  {
    key: "format",
    label: "Output Format",
    type: "string" as const,
    choices: { png: "PNG", jpeg: "JPEG", webp: "WebP", pdf: "PDF" },
    default: "png",
    required: false,
    helpText: "Format applied to all URLs in the batch. Choose PDF to reveal PDF page options.",
    altersDynamicFields: true,
  },
  {
    key: "webhookUrl",
    label: "Webhook URL",
    type: "string" as const,
    required: false,
    helpText:
      "Optional. Want another Zap to run when the entire batch finishes? Create a second Zap, pick 'Webhooks by Zapier → Catch Hook' as its trigger, copy the URL Zapier gives you, and paste it here. Leave empty to poll with 'Get Batch Status' instead.",
  },
  {
    key: "cacheTtl",
    label: "Cache TTL (seconds)",
    type: "integer" as const,
    default: "86400",
    required: false,
    helpText: "How long to store results (3600–2592000). Default: 86400.",
  },
];

const perform = async (z: ZObject, bundle: Bundle) => {
  const urlsRaw = (bundle.inputData.urls as string) || "";
  const urls = urlsRaw
    .split("\n")
    .map((u: string) => u.trim())
    .filter(Boolean)
    .map((u: string) => normalizeUrl(u));

  if (urls.length === 0) {
    throw new z.errors.Error("At least one URL is required.", "ValidationError", 400);
  }
  if (urls.length > 500) {
    throw new z.errors.Error("Maximum 500 URLs per batch.", "ValidationError", 400);
  }

  const input = bundle.inputData as Record<string, unknown>;

  // Reuse the single-capture coercion, then strip params the batch defaults
  // schema (CaptureParamsSchema) rejects, so we never imply unsupported fields.
  const defaults = buildRequestBody(input);
  for (const key of BATCH_STRIPPED_KEYS) delete defaults[key];

  const body: Record<string, unknown> = { urls, defaults };

  let validatedWebhookUrl: string | undefined;
  try {
    validatedWebhookUrl = validateOptionalWebhookUrl(input.webhookUrl, "Webhook URL");
  } catch (err) {
    throw new z.errors.Error(
      err instanceof Error ? err.message : String(err),
      "VALIDATION_ERROR",
      400,
    );
  }
  if (validatedWebhookUrl) body.webhookUrl = validatedWebhookUrl;
  if (input.cacheTtl) body.cacheTtl = parseInt(input.cacheTtl as string, 10);

  const response = await z.request({
    method: "POST",
    url: BATCH_ENDPOINT,
    body,
  });

  const data = response.json?.data ?? response.json;

  return {
    batchId: data.batchId,
    status: data.status,
    totalJobs: data.totalJobs,
    message: "Batch submitted. Use Get Batch Status to poll for results.",
  };
};

export default {
  key: "submit_batch",
  noun: "Batch",
  display: {
    label: "Submit Batch",
    description: "Submits a list of URLs for parallel screenshot or PDF capture and returns a Batch ID.",
  },
  operation: {
    inputFields: [
      ...batchFields,
      ...advancedFields.filter((f) => BATCH_DEFAULT_KEYS.includes(f.key)),
      batchPdfDynamicFields,
    ],
    perform,
    sample: {
      batchId: "batch_abc123def456",
      status: "processing",
      totalJobs: 10,
      message: "Batch submitted. Use Get Batch Status to poll for results.",
    },
  },
};
