"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../constants");
const request_1 = require("../lib/request");
// Synchronous, inline-result action — no async/polling. Extraction returns the
// cleaned text in the same response (the API rejects async for /v1/extract), so
// it always finishes well inside Zapier's 30s action budget.
const perform = async (z, bundle) => {
    const body = {
        url: (0, request_1.normalizeUrl)(bundle.inputData.url),
    };
    if (bundle.inputData.extractFormat) {
        body.extractFormat = bundle.inputData.extractFormat;
    }
    const response = await z.request({
        method: "POST",
        url: constants_1.EXTRACT_ENDPOINT,
        body,
    });
    const data = response.json?.data ?? response.json;
    return {
        url: data?.url ?? bundle.inputData.url,
        format: data?.format ?? "markdown",
        content: data?.content ?? "",
        title: data?.title ?? null,
        byline: data?.byline ?? null,
        excerpt: data?.excerpt ?? null,
        siteName: data?.siteName ?? null,
        length: data?.length ?? null,
    };
};
exports.default = {
    key: "extract_text",
    noun: "Article",
    display: {
        label: "Extract Text From a Web Page",
        description: "Get the clean article text (Markdown) from any URL.",
    },
    operation: {
        inputFields: [
            {
                key: "url",
                label: "URL",
                type: "string",
                required: true,
                helpText: "The full webpage address to read, starting with http or https.",
            },
            {
                key: "extractFormat",
                label: "Text Format",
                type: "string",
                choices: { markdown: "Markdown", html: "HTML", json: "JSON" },
                default: "markdown",
                required: false,
                helpText: "How to format the extracted text. Markdown is best for most uses.",
            },
        ],
        perform,
        sample: {
            url: "https://example.com/article",
            format: "markdown",
            content: "# Example Article\n\nThe clean article text goes here.",
            title: "Example Article",
            byline: "By Jane Doe",
            excerpt: "A short summary of the article.",
            siteName: "Example",
            length: 1234,
        },
    },
};
//# sourceMappingURL=extractText.js.map