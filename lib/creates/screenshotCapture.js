"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../constants");
const screenshotFields_1 = require("../fields/screenshotFields");
const request_1 = require("../lib/request");
const perform = async (z, bundle) => {
    const body = (0, request_1.buildRequestBody)(bundle.inputData);
    const response = await z.request({
        method: "POST",
        url: constants_1.SCREENSHOT_JSON_ENDPOINT,
        body,
    });
    const data = response.json?.data ?? response.json;
    const image = data.image;
    const contentType = data.contentType || "image/png";
    const filename = `rendex-${Date.now()}.${bundle.inputData.format || "png"}`;
    const buffer = Buffer.from(image, "base64");
    const file = await z.stashFile(buffer, buffer.length, filename, contentType);
    return {
        file,
        contentType,
        url: data.url,
        width: data.width,
        height: data.height,
        format: data.format,
        bytesSize: data.bytesSize,
        capturedAt: data.capturedAt,
        quality: data.quality,
        loadTimeMs: data.loadTimeMs,
    };
};
exports.default = {
    key: "screenshot_capture",
    noun: "Screenshot",
    display: {
        label: "Capture Screenshot",
        description: "Capture a webpage or HTML snippet and receive the image file (PNG, JPEG, or WebP) immediately in this step.\n\nBest for: home pages, landing pages, short documents, product pages.\n\nFor large pages (full-page scrolls of news sites, e-commerce, dashboards) use 'Capture Screenshot (Background)' instead — Zap steps time out after 30 seconds and heavy pages often exceed that.",
    },
    operation: {
        inputFields: [
            screenshotFields_1.sourceTypeField,
            screenshotFields_1.sourceValueFields,
            screenshotFields_1.formatField,
            screenshotFields_1.pdfDynamicFields,
            ...screenshotFields_1.advancedFields,
        ],
        perform,
        sample: {
            file: "https://example.com/screenshot.png",
            contentType: "image/png",
            url: "https://example.com",
            width: 1280,
            height: 800,
            format: "png",
            bytesSize: 65982,
            capturedAt: "2026-04-15T12:00:00.000Z",
            quality: "full",
            loadTimeMs: 3500,
        },
    },
};
//# sourceMappingURL=screenshotCapture.js.map