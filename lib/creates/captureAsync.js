"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../constants");
const screenshotFields_1 = require("../fields/screenshotFields");
const request_1 = require("../lib/request");
const asyncFields = [
    {
        key: "webhookUrl",
        label: "Webhook URL",
        type: "string",
        required: false,
        helpText: "URL to receive an HMAC-signed POST when the capture completes. If omitted, poll via Get Job Status.",
    },
    {
        key: "cacheTtl",
        label: "Cache TTL (seconds)",
        type: "integer",
        default: "86400",
        required: false,
        helpText: "How long to store the result in seconds (3600–2592000). Default: 86400 (24 hours).",
    },
];
const perform = async (z, bundle) => {
    const body = (0, request_1.buildRequestBody)({
        ...bundle.inputData,
        async: true,
    });
    if (bundle.inputData.webhookUrl) {
        body.webhookUrl = (0, request_1.normalizeUrl)(bundle.inputData.webhookUrl);
    }
    if (bundle.inputData.cacheTtl) {
        body.cacheTtl = parseInt(bundle.inputData.cacheTtl, 10);
    }
    const response = await z.request({
        method: "POST",
        url: constants_1.SCREENSHOT_ENDPOINT,
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
exports.default = {
    key: "capture_async",
    noun: "Async Capture",
    display: {
        label: "Capture Screenshot (Async)",
        description: "Submit a screenshot capture job that processes in the background. Returns a job ID immediately — use Get Job Status to check the result.",
    },
    operation: {
        inputFields: [
            screenshotFields_1.sourceTypeField,
            screenshotFields_1.sourceValueFields,
            screenshotFields_1.formatField,
            screenshotFields_1.pdfDynamicFields,
            ...screenshotFields_1.advancedFields,
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
//# sourceMappingURL=captureAsync.js.map