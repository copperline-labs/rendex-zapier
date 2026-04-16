"use strict";
// Shared input fields mirroring ScreenshotRequestSchema in
// packages/screenshot-api/src/services/screenshot.ts.
// Alphabetized advanced options match the n8n node layout exactly.
Object.defineProperty(exports, "__esModule", { value: true });
exports.advancedFields = exports.pdfDynamicFields = exports.pdfFieldsArray = exports.formatField = exports.sourceValueFields = exports.sourceTypeField = void 0;
// Static trigger field — always visible. altersDynamicFields re-runs the
// dynamic-fields function (sourceValueFields below) when the user
// changes this dropdown, swapping between URL and HTML input.
const sourceTypeField = {
    key: "source",
    label: "Source Type",
    type: "string",
    choices: { url: "URL", html: "Raw HTML" },
    default: "url",
    required: true,
    helpText: "Capture a live URL or render raw HTML markup.",
    altersDynamicFields: true,
};
exports.sourceTypeField = sourceTypeField;
// Dynamic function — returns ONLY the URL field when source=url, ONLY the
// HTML field when source=html. Previously both were declared as static
// required fields, so Zapier demanded both simultaneously and users
// couldn't submit the form. Zapier re-invokes this whenever source changes.
const sourceValueFields = (_z, bundle) => {
    const source = bundle.inputData?.source || "url";
    if (source === "html") {
        return [
            {
                key: "html",
                label: "HTML",
                type: "text",
                required: true,
                helpText: "Raw HTML to render and capture. Max 5 MB.",
            },
        ];
    }
    return [
        {
            key: "url",
            label: "URL",
            type: "string",
            required: true,
            helpText: "The full webpage URL to capture, including https://.",
        },
    ];
};
exports.sourceValueFields = sourceValueFields;
const formatField = {
    key: "format",
    label: "Output Format",
    type: "string",
    choices: { png: "PNG", jpeg: "JPEG", webp: "WebP", pdf: "PDF" },
    default: "png",
    required: false,
    helpText: "Image or document format for the capture output.",
    altersDynamicFields: true,
};
exports.formatField = formatField;
// PDF-specific field definitions. Used directly by the Generate PDF action
// (where format is always PDF) and filtered by pdfDynamicFields for the
// image-capable actions (Screenshot Capture, Capture Async) where they
// only appear when the user selects Output Format = PDF.
const pdfFieldsArray = [
    {
        key: "pdfFormat",
        label: "PDF Page Size",
        type: "string",
        choices: { A3: "A3", A4: "A4", Legal: "Legal", Letter: "Letter", Tabloid: "Tabloid" },
        default: "A4",
        required: false,
        helpText: "PDF page size. Default: A4.",
    },
    {
        key: "pdfLandscape",
        label: "PDF Landscape",
        type: "boolean",
        default: "false",
        required: false,
        helpText: "Landscape orientation for PDF output.",
    },
    {
        key: "pdfMargin",
        label: "PDF Margins",
        type: "text",
        required: false,
        helpText: 'JSON object: {"top":"1cm","right":"1cm","bottom":"1cm","left":"1cm"}. CSS units.',
    },
    {
        key: "pdfPrintBackground",
        label: "PDF Print Background",
        type: "boolean",
        default: "true",
        required: false,
        helpText: "Print background colors/images. Default: true.",
    },
    {
        key: "pdfScale",
        label: "PDF Scale",
        type: "number",
        required: false,
        helpText: "PDF scale factor (0.1–2). Default: 1.",
    },
];
exports.pdfFieldsArray = pdfFieldsArray;
// Dynamic wrapper — returns PDF fields only when Output Format is PDF.
// Used by Screenshot Capture and Capture Async to hide PDF-specific
// fields when the user is capturing an image.
const pdfDynamicFields = (_z, bundle) => {
    const format = bundle.inputData?.format || "png";
    if (format !== "pdf")
        return [];
    return pdfFieldsArray;
};
exports.pdfDynamicFields = pdfDynamicFields;
const advancedFields = [
    {
        key: "bestAttempt",
        label: "Best Attempt",
        type: "boolean",
        default: "true",
        required: false,
        helpText: "Return partial screenshot on timeout instead of failing. Default: true.",
    },
    {
        key: "blockAds",
        label: "Block Ads",
        type: "boolean",
        default: "true",
        required: false,
        helpText: "Block ads and trackers before capture. Default: true.",
    },
    {
        key: "blockResourceTypes",
        label: "Block Resource Types",
        type: "string",
        required: false,
        helpText: "Comma-separated list of resource types to block: font, image, media, stylesheet, other.",
    },
    {
        key: "cookies",
        label: "Cookies",
        type: "text",
        required: false,
        helpText: 'JSON array of cookies: [{"name":"session","value":"abc","domain":"example.com"}]. Max 50.',
    },
    {
        key: "css",
        label: "Custom CSS",
        type: "text",
        required: false,
        helpText: "CSS to inject before capture. Max 50 KB.",
    },
    {
        key: "darkMode",
        label: "Dark Mode",
        type: "boolean",
        default: "false",
        required: false,
        helpText: "Emulate prefers-color-scheme: dark.",
    },
    {
        key: "delay",
        label: "Delay (ms)",
        type: "integer",
        default: "0",
        required: false,
        helpText: "Milliseconds to wait after page load before capture (0–10000).",
    },
    {
        key: "deviceScaleFactor",
        label: "Device Scale Factor",
        type: "integer",
        default: "2",
        required: false,
        helpText: "Pixel ratio: 1 = standard, 2 = retina (default), 3 = high-DPI.",
    },
    {
        key: "fullPage",
        label: "Full Page",
        type: "boolean",
        default: "false",
        required: false,
        helpText: "Capture the full scrollable page instead of just the viewport.",
    },
    {
        key: "geo",
        label: "Geo Country (Rendex Pro/Enterprise)",
        type: "string",
        required: false,
        helpText: "ISO 3166-1 alpha-2 country code (e.g. US, DE, JP, CA) to capture the page as seen from that country. Requires a Rendex Pro or Enterprise plan — this is separate from your Zapier plan. Free and Starter Rendex keys will receive a 403 PLAN_UPGRADE_REQUIRED error. Upgrade at https://rendex.dev/pricing.",
    },
    {
        key: "geoCity",
        label: "Geo City (Rendex Pro/Enterprise)",
        type: "string",
        required: false,
        helpText: "City name for more precise geo-targeting (e.g. New York, Tokyo). Requires Geo Country to be set and a Rendex Pro or Enterprise plan — not related to your Zapier plan.",
    },
    {
        key: "geoState",
        label: "Geo State (Rendex Pro/Enterprise)",
        type: "string",
        required: false,
        helpText: "State or region for precise geo-targeting. Requires Geo Country and a Rendex Pro or Enterprise plan — not related to your Zapier plan.",
    },
    {
        key: "headers",
        label: "Custom Headers",
        type: "text",
        required: false,
        helpText: 'JSON object of HTTP headers: {"X-Custom":"value"}. Cannot override Host, Connection, Content-Length, Transfer-Encoding.',
    },
    {
        key: "height",
        label: "Viewport Height",
        type: "integer",
        default: "800",
        required: false,
        helpText: "Viewport height in pixels (240–2160). Default: 800.",
    },
    {
        key: "js",
        label: "Custom JavaScript",
        type: "text",
        required: false,
        helpText: "JavaScript to execute before capture. Max 50 KB.",
    },
    {
        key: "quality",
        label: "Quality",
        type: "integer",
        required: false,
        helpText: "Image quality 1–100 (JPEG/WebP only, ignored for PNG/PDF).",
    },
    {
        key: "selector",
        label: "Element Selector",
        type: "string",
        required: false,
        helpText: "CSS selector of a specific element to capture (e.g. #hero, .card).",
    },
    {
        key: "timeout",
        label: "Timeout (seconds)",
        type: "integer",
        default: "30",
        required: false,
        helpText: "Maximum seconds to wait for page load (5–60). Default: 30.",
    },
    {
        key: "userAgent",
        label: "User Agent",
        type: "string",
        required: false,
        helpText: "Override the browser user agent string.",
    },
    {
        key: "waitForSelector",
        label: "Wait For Selector",
        type: "string",
        required: false,
        helpText: "CSS selector to wait for before capture. Essential for SPAs.",
    },
    {
        key: "waitUntil",
        label: "Wait Until",
        type: "string",
        choices: {
            domcontentloaded: "DOM Content Loaded",
            load: "Load",
            networkidle0: "Network Idle (strict)",
            networkidle2: "Network Idle (default)",
        },
        default: "networkidle2",
        required: false,
        helpText: "Page readiness event. networkidle2 is best for most sites.",
    },
    {
        key: "width",
        label: "Viewport Width",
        type: "integer",
        default: "1280",
        required: false,
        helpText: "Viewport width in pixels (320–3840). Default: 1280.",
    },
];
exports.advancedFields = advancedFields;
//# sourceMappingURL=screenshotFields.js.map