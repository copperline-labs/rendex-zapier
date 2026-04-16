import { BATCH_ENDPOINT } from "../constants";
import { advancedFields } from "../fields/screenshotFields";
import { normalizeUrl } from "../lib/request";
import type { Bundle, ZObject } from "zapier-platform-core";

const batchFields = [
  {
    key: "urls",
    label: "URLs",
    type: "text" as const,
    required: true,
    helpText:
      "Newline-separated list of URLs to capture (1–500). Each URL becomes an individual job.",
  },
  {
    key: "format",
    label: "Output Format",
    type: "string" as const,
    choices: { png: "PNG", jpeg: "JPEG", webp: "WebP", pdf: "PDF" },
    default: "png",
    required: false,
    helpText: "Format applied to all URLs in the batch.",
  },
  {
    key: "webhookUrl",
    label: "Webhook URL",
    type: "string" as const,
    required: false,
    helpText:
      "URL to receive a POST when the entire batch completes.",
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

  const defaults: Record<string, unknown> = {};
  const input = bundle.inputData as Record<string, unknown>;

  if (input.format) defaults.format = input.format;
  if (input.width) defaults.width = parseInt(input.width as string, 10);
  if (input.height) defaults.height = parseInt(input.height as string, 10);
  if (input.deviceScaleFactor) defaults.deviceScaleFactor = parseInt(input.deviceScaleFactor as string, 10);
  if (input.darkMode === "true" || input.darkMode === true) defaults.darkMode = true;
  if (input.blockAds === "false" || input.blockAds === false) defaults.blockAds = false;
  if (input.timeout) defaults.timeout = parseInt(input.timeout as string, 10);
  if (input.waitUntil) defaults.waitUntil = input.waitUntil;
  if (input.fullPage === "true" || input.fullPage === true) defaults.fullPage = true;

  const body: Record<string, unknown> = { urls, defaults };
  if (input.webhookUrl) body.webhookUrl = normalizeUrl(input.webhookUrl);
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
    description:
      "Submit up to 500 URLs for batch screenshot capture. Returns a batch ID — use Get Batch Status to check results.",
  },
  operation: {
    inputFields: [
      ...batchFields,
      ...advancedFields.filter((f) =>
        ["width", "height", "deviceScaleFactor", "darkMode", "blockAds", "timeout", "waitUntil", "fullPage", "format"].includes(f.key) === false
          ? ["width", "height", "deviceScaleFactor", "darkMode", "blockAds", "timeout", "waitUntil", "fullPage"].includes(f.key)
          : false,
      ),
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
