import type { Bundle, ZObject } from "zapier-platform-core";

// Zapier's webhook URL is unique and unguessable, so we rely on URL
// obscurity rather than HMAC verification on this side — matching the
// pattern Stripe, GitHub, and Shopify use in their Zapier integrations.
// If per-user webhook signing secrets become available in the Rendex
// dashboard in a future release, we'll add a field and verification here.

const performSubscribe = async (z: ZObject, bundle: Bundle) => {
  // Rendex uses per-job webhooks (pass webhookUrl with each capture),
  // not persistent subscriptions. We store the target URL so the user
  // can reference it in their Capture Async action.
  z.console.log(`Webhook URL registered: ${bundle.targetUrl}`);
  return { targetUrl: bundle.targetUrl };
};

const performUnsubscribe = async (_z: ZObject, _bundle: Bundle) => {
  // No-op — per-job webhooks don't persist subscriptions to clean up.
  return {};
};

const perform = async (_z: ZObject, bundle: Bundle) => {
  const payload = bundle.cleanedRequest;

  return [
    {
      id: payload.jobId || payload.batchId || `${Date.now()}`,
      event: payload.event,
      jobId: payload.jobId || null,
      batchId: payload.batchId || null,
      status: payload.status,
      resultUrl: payload.resultUrl || null,
      error: payload.error || null,
      completedAt: payload.completedAt,
      totalJobs: payload.totalJobs || null,
      completedJobs: payload.completedJobs || null,
      failedJobs: payload.failedJobs || null,
    },
  ];
};

const performList = async (_z: ZObject, _bundle: Bundle) => {
  // No list-jobs endpoint exists; return static sample for the Zap editor.
  return [
    {
      id: "job_sample_001",
      event: "job.completed",
      jobId: "job_sample_001",
      batchId: null,
      status: "completed",
      resultUrl: "https://api.rendex.dev/v1/images/sample",
      error: null,
      completedAt: new Date().toISOString(),
      totalJobs: null,
      completedJobs: null,
      failedJobs: null,
    },
  ];
};

export default {
  key: "new_screenshot_ready",
  noun: "Screenshot",
  display: {
    label: "New Screenshot Ready",
    description:
      "Triggers when an async screenshot or batch capture completes. Pass the webhook URL shown below into your Capture Async or Submit Batch action's Webhook URL field.",
  },
  operation: {
    type: "hook" as const,
    performSubscribe,
    performUnsubscribe,
    perform,
    performList,
    sample: {
      id: "job_sample_001",
      event: "job.completed",
      jobId: "job_sample_001",
      batchId: null,
      status: "completed",
      resultUrl: "https://api.rendex.dev/v1/images/sample",
      error: null,
      completedAt: "2026-04-15T12:00:05.000Z",
      totalJobs: null,
      completedJobs: null,
      failedJobs: null,
    },
  },
};
