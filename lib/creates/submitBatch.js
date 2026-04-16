"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../constants");
const screenshotFields_1 = require("../fields/screenshotFields");
const batchFields = [
    {
        key: "urls",
        label: "URLs",
        type: "text",
        required: true,
        helpText: "Newline-separated list of URLs to capture (1–500). Each URL becomes an individual job.",
    },
    {
        key: "format",
        label: "Output Format",
        type: "string",
        choices: { png: "PNG", jpeg: "JPEG", webp: "WebP", pdf: "PDF" },
        default: "png",
        required: false,
        helpText: "Format applied to all URLs in the batch.",
    },
    {
        key: "webhookUrl",
        label: "Webhook URL",
        type: "string",
        required: false,
        helpText: "URL to receive a POST when the entire batch completes.",
    },
    {
        key: "cacheTtl",
        label: "Cache TTL (seconds)",
        type: "integer",
        default: "86400",
        required: false,
        helpText: "How long to store results (3600–2592000). Default: 86400.",
    },
];
const perform = async (z, bundle) => {
    const urlsRaw = bundle.inputData.urls || "";
    const urls = urlsRaw
        .split("\n")
        .map((u) => u.trim())
        .filter(Boolean);
    if (urls.length === 0) {
        throw new z.errors.Error("At least one URL is required.", "ValidationError", 400);
    }
    if (urls.length > 500) {
        throw new z.errors.Error("Maximum 500 URLs per batch.", "ValidationError", 400);
    }
    const defaults = {};
    const input = bundle.inputData;
    if (input.format)
        defaults.format = input.format;
    if (input.width)
        defaults.width = parseInt(input.width, 10);
    if (input.height)
        defaults.height = parseInt(input.height, 10);
    if (input.deviceScaleFactor)
        defaults.deviceScaleFactor = parseInt(input.deviceScaleFactor, 10);
    if (input.darkMode === "true" || input.darkMode === true)
        defaults.darkMode = true;
    if (input.blockAds === "false" || input.blockAds === false)
        defaults.blockAds = false;
    if (input.timeout)
        defaults.timeout = parseInt(input.timeout, 10);
    if (input.waitUntil)
        defaults.waitUntil = input.waitUntil;
    if (input.fullPage === "true" || input.fullPage === true)
        defaults.fullPage = true;
    const body = { urls, defaults };
    if (input.webhookUrl)
        body.webhookUrl = input.webhookUrl;
    if (input.cacheTtl)
        body.cacheTtl = parseInt(input.cacheTtl, 10);
    const response = await z.request({
        method: "POST",
        url: constants_1.BATCH_ENDPOINT,
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
exports.default = {
    key: "submit_batch",
    noun: "Batch",
    display: {
        label: "Submit Batch",
        description: "Submit up to 500 URLs for batch screenshot capture. Returns a batch ID — use Get Batch Status to check results.",
    },
    operation: {
        inputFields: [
            ...batchFields,
            ...screenshotFields_1.advancedFields.filter((f) => ["width", "height", "deviceScaleFactor", "darkMode", "blockAds", "timeout", "waitUntil", "fullPage", "format"].includes(f.key) === false
                ? ["width", "height", "deviceScaleFactor", "darkMode", "blockAds", "timeout", "waitUntil", "fullPage"].includes(f.key)
                : false),
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
//# sourceMappingURL=submitBatch.js.map