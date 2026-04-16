// Shared input fields mirroring ScreenshotRequestSchema in
// packages/screenshot-api/src/services/screenshot.ts.
// Alphabetized advanced options match the n8n node layout exactly.

const sourceFields = [
  {
    key: "source",
    label: "Source Type",
    type: "string" as const,
    choices: { url: "URL", html: "Raw HTML" },
    default: "url",
    required: true,
    helpText: "Capture a live URL or render raw HTML markup.",
    altersDynamicFields: true,
  },
  {
    key: "url",
    label: "URL",
    type: "string" as const,
    required: true,
    helpText: "The full webpage URL to capture.",
  },
  {
    key: "html",
    label: "HTML",
    type: "text" as const,
    required: true,
    helpText:
      "Raw HTML to render and capture. Max 5 MB. Mutually exclusive with URL.",
  },
  {
    key: "format",
    label: "Output Format",
    type: "string" as const,
    choices: { png: "PNG", jpeg: "JPEG", webp: "WebP", pdf: "PDF" },
    default: "png",
    required: false,
    helpText: "Image or document format for the capture output.",
  },
];

const advancedFields = [
  {
    key: "bestAttempt",
    label: "Best Attempt",
    type: "boolean" as const,
    default: "true",
    required: false,
    helpText:
      "Return partial screenshot on timeout instead of failing. Default: true.",
  },
  {
    key: "blockAds",
    label: "Block Ads",
    type: "boolean" as const,
    default: "true",
    required: false,
    helpText: "Block ads and trackers before capture. Default: true.",
  },
  {
    key: "blockResourceTypes",
    label: "Block Resource Types",
    type: "string" as const,
    required: false,
    helpText:
      "Comma-separated list of resource types to block: font, image, media, stylesheet, other.",
  },
  {
    key: "cookies",
    label: "Cookies",
    type: "text" as const,
    required: false,
    helpText:
      'JSON array of cookies: [{"name":"session","value":"abc","domain":"example.com"}]. Max 50.',
  },
  {
    key: "css",
    label: "Custom CSS",
    type: "text" as const,
    required: false,
    helpText: "CSS to inject before capture. Max 50 KB.",
  },
  {
    key: "darkMode",
    label: "Dark Mode",
    type: "boolean" as const,
    default: "false",
    required: false,
    helpText: "Emulate prefers-color-scheme: dark.",
  },
  {
    key: "delay",
    label: "Delay (ms)",
    type: "integer" as const,
    default: "0",
    required: false,
    helpText: "Milliseconds to wait after page load before capture (0–10000).",
  },
  {
    key: "deviceScaleFactor",
    label: "Device Scale Factor",
    type: "integer" as const,
    default: "2",
    required: false,
    helpText: "Pixel ratio: 1 = standard, 2 = retina (default), 3 = high-DPI.",
  },
  {
    key: "fullPage",
    label: "Full Page",
    type: "boolean" as const,
    default: "false",
    required: false,
    helpText: "Capture the full scrollable page instead of just the viewport.",
  },
  {
    key: "geo",
    label: "Geo Country",
    type: "string" as const,
    required: false,
    helpText:
      "ISO 3166-1 alpha-2 country code (e.g. US, DE). Pro/Enterprise only.",
  },
  {
    key: "geoCity",
    label: "Geo City",
    type: "string" as const,
    required: false,
    helpText: "City for more precise geo-targeting. Requires Geo Country.",
  },
  {
    key: "geoState",
    label: "Geo State",
    type: "string" as const,
    required: false,
    helpText: "State or region for geo-targeting. Requires Geo Country.",
  },
  {
    key: "headers",
    label: "Custom Headers",
    type: "text" as const,
    required: false,
    helpText:
      'JSON object of HTTP headers: {"X-Custom":"value"}. Cannot override Host, Connection, Content-Length, Transfer-Encoding.',
  },
  {
    key: "height",
    label: "Viewport Height",
    type: "integer" as const,
    default: "800",
    required: false,
    helpText: "Viewport height in pixels (240–2160). Default: 800.",
  },
  {
    key: "js",
    label: "Custom JavaScript",
    type: "text" as const,
    required: false,
    helpText: "JavaScript to execute before capture. Max 50 KB.",
  },
  {
    key: "pdfFormat",
    label: "PDF Page Size",
    type: "string" as const,
    choices: { A3: "A3", A4: "A4", Legal: "Legal", Letter: "Letter", Tabloid: "Tabloid" },
    required: false,
    helpText: "PDF page size. Only used when format is PDF. Default: A4.",
  },
  {
    key: "pdfLandscape",
    label: "PDF Landscape",
    type: "boolean" as const,
    default: "false",
    required: false,
    helpText: "Landscape orientation for PDF output.",
  },
  {
    key: "pdfMargin",
    label: "PDF Margins",
    type: "text" as const,
    required: false,
    helpText:
      'JSON object: {"top":"1cm","right":"1cm","bottom":"1cm","left":"1cm"}. CSS units.',
  },
  {
    key: "pdfPrintBackground",
    label: "PDF Print Background",
    type: "boolean" as const,
    default: "true",
    required: false,
    helpText: "Print background colors/images in PDF output. Default: true.",
  },
  {
    key: "pdfScale",
    label: "PDF Scale",
    type: "number" as const,
    required: false,
    helpText: "PDF scale factor (0.1–2). Default: 1.",
  },
  {
    key: "quality",
    label: "Quality",
    type: "integer" as const,
    required: false,
    helpText: "Image quality 1–100 (JPEG/WebP only, ignored for PNG/PDF).",
  },
  {
    key: "selector",
    label: "Element Selector",
    type: "string" as const,
    required: false,
    helpText: "CSS selector of a specific element to capture (e.g. #hero, .card).",
  },
  {
    key: "timeout",
    label: "Timeout (seconds)",
    type: "integer" as const,
    default: "30",
    required: false,
    helpText: "Maximum seconds to wait for page load (5–60). Default: 30.",
  },
  {
    key: "userAgent",
    label: "User Agent",
    type: "string" as const,
    required: false,
    helpText: "Override the browser user agent string.",
  },
  {
    key: "waitForSelector",
    label: "Wait For Selector",
    type: "string" as const,
    required: false,
    helpText:
      "CSS selector to wait for before capture. Essential for SPAs.",
  },
  {
    key: "waitUntil",
    label: "Wait Until",
    type: "string" as const,
    choices: {
      domcontentloaded: "DOM Content Loaded",
      load: "Load",
      networkidle0: "Network Idle (strict)",
      networkidle2: "Network Idle (default)",
    },
    default: "networkidle2",
    required: false,
    helpText:
      "Page readiness event. networkidle2 is best for most sites.",
  },
  {
    key: "width",
    label: "Viewport Width",
    type: "integer" as const,
    default: "1280",
    required: false,
    helpText: "Viewport width in pixels (320–3840). Default: 1280.",
  },
];

export { sourceFields, advancedFields };
