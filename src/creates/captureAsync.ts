import { SCREENSHOT_ENDPOINT } from "../constants";
import {
  sourceTypeField,
  sourceValueFields,
  templateDataFields,
  formatField,
  pdfDynamicFields,
  advancedFields,
} from "../fields/screenshotFields";
import { buildRequestBody, validateOptionalWebhookUrl } from "../lib/request";
import type { Bundle, ZObject } from "zapier-platform-core";

const asyncFields = [
  {
    key: "webhookUrl",
    label: "Webhook URL",
    type: "string" as const,
    required: false,
    helpText:
      "Optional. Want another Zap to run automatically when this screenshot finishes? Create a second Zap, pick 'Webhooks by Zapier → Catch Hook' as its trigger, copy the Catch Hook URL Zapier gives you, and paste it here. Leave empty to check the result with a 'Get Job Status' step later, or to use the 'New Completed Screenshot' trigger instead.",
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

  let validatedWebhookUrl: string | undefined;
  try {
    validatedWebhookUrl = validateOptionalWebhookUrl(
      bundle.inputData.webhookUrl,
      "Webhook URL",
    );
  } catch (err) {
    throw new z.errors.Error(
      err instanceof Error ? err.message : String(err),
      "VALIDATION_ERROR",
      400,
    );
  }
  if (validatedWebhookUrl) {
    body.webhookUrl = validatedWebhookUrl;
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
    message: "Job submitted. Add a 'Get Job Status' step (or set a Webhook URL) to retrieve the finished screenshot.",
  };
};

export default {
  key: "capture_async",
  noun: "Background Screenshot Job",
  display: {
    label: "Capture Screenshot (Background)",
    description: "Queues a screenshot or PDF capture as a background job and returns a Job ID.",
  },
  operation: {
    inputFields: [
      sourceTypeField,
      sourceValueFields,
      templateDataFields,
      formatField,
      pdfDynamicFields,
      ...advancedFields,
      ...asyncFields,
    ],
    perform,
    sample: {
      jobId: "job_abc123def456",
      status: "queued",
      webhookUrl: null,
      estimatedCompletionMs: 5000,
      message: "Job submitted. Add a 'Get Job Status' step (or set a Webhook URL) to retrieve the finished screenshot.",
    },
  },
};
