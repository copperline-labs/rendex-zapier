"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = require("crypto");
const triggerFields = [
    {
        key: "webhookSigningSecret",
        label: "Webhook Signing Secret",
        type: "string",
        required: false,
        helpText: "Optional. If provided, incoming webhooks are verified against this HMAC-SHA256 secret. Available in your Rendex dashboard under webhook settings.",
    },
];
function verifySignature(body, secret, signature, timestamp) {
    const message = `${timestamp}.${body}`;
    const expected = (0, crypto_1.createHmac)("sha256", secret)
        .update(message)
        .digest("hex");
    return expected === signature;
}
const performSubscribe = async (z, bundle) => {
    // Rendex uses per-job webhooks (pass webhookUrl with each capture),
    // not persistent subscriptions. We store the target URL so the user
    // can reference it in their Capture Async action.
    z.console.log(`Webhook URL registered: ${bundle.targetUrl}`);
    return { targetUrl: bundle.targetUrl };
};
const performUnsubscribe = async (_z, _bundle) => {
    // No-op — per-job webhooks don't persist subscriptions to clean up.
    return {};
};
const perform = async (z, bundle) => {
    const rawBody = bundle.rawRequest?.content || "";
    const headers = bundle.rawRequest?.headers || {};
    const secret = bundle.inputData.webhookSigningSecret;
    if (secret) {
        const signature = headers["x-rendex-signature"] || "";
        const timestamp = headers["x-rendex-timestamp"] || "";
        if (!signature || !timestamp) {
            throw new z.errors.HaltedError("Missing x-rendex-signature or x-rendex-timestamp headers.");
        }
        if (!verifySignature(rawBody, secret, signature, timestamp)) {
            throw new z.errors.HaltedError("Webhook signature verification failed.");
        }
        const ts = parseInt(timestamp, 10);
        const fiveMinutes = 300;
        if (Math.abs(Date.now() / 1000 - ts) > fiveMinutes) {
            throw new z.errors.HaltedError("Webhook timestamp too old (replay attack prevention).");
        }
    }
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
const performList = async (_z, _bundle) => {
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
exports.default = {
    key: "new_screenshot_ready",
    noun: "Screenshot",
    display: {
        label: "New Screenshot Ready",
        description: "Triggers when an async screenshot or batch capture completes. Pass the webhook URL shown below into your Capture Async or Submit Batch action's Webhook URL field.",
    },
    operation: {
        type: "hook",
        performSubscribe,
        performUnsubscribe,
        perform,
        performList,
        inputFields: triggerFields,
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
//# sourceMappingURL=newScreenshotReady.js.map