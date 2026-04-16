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
        message: "Job submitted. Add a 'Get Job Status' step (or set a Webhook URL) to retrieve the finished screenshot.",
    };
};
exports.default = {
    key: "capture_async",
    noun: "Background Screenshot Job",
    display: {
        label: "Capture Screenshot (Background)",
        description: "Queue a screenshot or PDF job for large or slow pages. This step returns a Job ID right away — it does NOT return the finished image by itself.\n\nTo receive the actual screenshot, choose one of these patterns:\n\n• Add a 'Get Job Status' step after this one (pass the Job ID from this step). Add a short Delay (10–30 seconds) between them for big pages.\n\n• Or fill in the Webhook URL field to have Rendex POST the result to another Zap or endpoint automatically when the capture finishes — no polling needed.\n\nUse this action (instead of Capture Screenshot) for full-page captures of news sites, e-commerce, long dashboards, or any page that might take more than 25 seconds to render.",
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
            message: "Job submitted. Add a 'Get Job Status' step (or set a Webhook URL) to retrieve the finished screenshot.",
        },
    },
};
//# sourceMappingURL=captureAsync.js.map