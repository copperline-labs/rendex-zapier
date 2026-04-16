"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../constants");
const screenshotFields_1 = require("../fields/screenshotFields");
const request_1 = require("../lib/request");
const perform = async (z, bundle) => {
    const body = (0, request_1.buildRequestBody)({ ...bundle.inputData, format: "pdf" });
    const response = await z.request({
        method: "POST",
        url: constants_1.SCREENSHOT_JSON_ENDPOINT,
        body,
    });
    const data = response.json?.data ?? response.json;
    const image = data.image;
    const filename = `rendex-${Date.now()}.pdf`;
    const buffer = Buffer.from(image, "base64");
    const file = await z.stashFile(buffer, buffer.length, filename, "application/pdf");
    return {
        file,
        contentType: "application/pdf",
        url: data.url,
        width: data.width,
        height: data.height,
        format: "pdf",
        bytesSize: data.bytesSize,
        capturedAt: data.capturedAt,
        quality: data.quality,
        loadTimeMs: data.loadTimeMs,
    };
};
exports.default = {
    key: "generate_pdf",
    noun: "PDF",
    display: {
        label: "Generate PDF",
        description: "Generate a PDF document from a webpage or HTML snippet and receive the file immediately in this step. Supports custom page sizes, margins, and landscape orientation.\n\nBest for: invoices, receipts, short reports, single-page documents.\n\nFor long or heavy PDFs (multi-page reports, full-length articles, complex dashboards) use 'Capture Screenshot (Background)' with Output Format = PDF — Zap steps time out after 30 seconds and large PDF renders often exceed that.",
    },
    operation: {
        inputFields: [
            screenshotFields_1.sourceTypeField,
            screenshotFields_1.sourceValueFields,
            ...screenshotFields_1.pdfFieldsArray,
            ...screenshotFields_1.advancedFields,
        ],
        perform,
        sample: {
            file: "https://example.com/document.pdf",
            contentType: "application/pdf",
            url: "https://example.com",
            width: 1280,
            height: 800,
            format: "pdf",
            bytesSize: 120000,
            capturedAt: "2026-04-15T12:00:00.000Z",
            quality: "full",
            loadTimeMs: 4200,
        },
    },
};
//# sourceMappingURL=generatePdf.js.map