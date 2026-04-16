import { SCREENSHOT_ENDPOINT } from "../constants";
import { sourceFields, advancedFields } from "../fields/screenshotFields";
import { buildRequestBody } from "../lib/request";
import type { Bundle, ZObject } from "zapier-platform-core";

const asyncFields = [
  {
    key: "webhookUrl",
    label: "Webhook URL",
    type: "string" as const,
    required: false,
    helpText:
      "URL to receive an HMAC-signed POST when the capture completes. If omitted, poll via Get Job Status.",
  },
  {
    key: "cacheTtl",
    label: "Cache TTL (seconds)",
    type: "integer" as const,
    default: "86400",
    required: false,
    helpText:
      "How long to store the result in seconds (3600–2592000). Default: 86400 (24 hours).",
  },
];

const perform = async (z: ZObject, bundle: Bundle) => {
  const body = buildRequestBody({
    ...bundle.inputData,
    async: true,
  });

  if (bundle.inputData.webhookUrl) {
    body.webhookUrl = bundle.inputData.webhookUrl;
  }
  if (bundle.inputData.cacheTtl) {
    body.cacheTtl = parseInt(bundle.inputData.cacheTtl as string, 10);
  }

  const response = await z.request({
    method: "POST",
    url: SCREENSHOT_ENDPOINT,
    body,
  });

  const data = response.json?.data ?? response.json;

  return {
    jobId: data.jobId,
    status: data.status,
    webhookUrl: data.webhookUrl || null,
    estimatedCompletionMs: data.estimatedCompletionMs || null,
    message: "Job submitted. Use Get Job Status to poll for results.",
  };
};

export default {
  key: "capture_async",
  noun: "Async Capture",
  display: {
    label: "Capture Screenshot (Async)",
    description:
      "Submit a screenshot capture job that processes in the background. Returns a job ID immediately — use Get Job Status to check the result.",
  },
  operation: {
    inputFields: [
      ...sourceFields,
      ...advancedFields,
      ...asyncFields,
    ],
    perform,
    sample: {
      jobId: "job_abc123def456",
      status: "queued",
      webhookUrl: null,
      estimatedCompletionMs: 5000,
      message: "Job submitted. Use Get Job Status to poll for results.",
    },
  },
};
