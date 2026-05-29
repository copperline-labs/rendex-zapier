// Shared input fields mirroring ScreenshotRequestSchema in
// packages/screenshot-api/src/services/screenshot.ts.
// Alphabetized advanced options match the n8n node layout exactly.

import type { Bundle, ZObject } from "zapier-platform-core";

// Static trigger field — always visible. altersDynamicFields re-runs the
// dynamic-fields function (sourceValueFields below) when the user
// changes this dropdown, swapping between URL and HTML input.
const sourceTypeField = {
  key: "source",
  label: "Source Type",
  type: "string" as const,
  choices: { url: "URL", html: "Raw HTML", markdown: "Markdown" },
  default: "url",
  required: true,
  helpText: "Capture a live URL, render raw HTML markup, or turn Markdown into a finished image or PDF.",
  altersDynamicFields: true,
};

// Dynamic function — returns ONLY the URL field when source=url, ONLY the
// HTML field when source=html, ONLY the Markdown field when
// source=markdown. Previously both were declared as static required fields,
// so Zapier demanded both simultaneously and users couldn't submit the
// form. Zapier re-invokes this whenever source changes.
const sourceValueFields = (_z: ZObject, bundle: Bundle) => {
  const source = (bundle.inputData?.source as string) || "url";
  if (source === "html") {
    return [
      {
        key: "html",
        label: "HTML",
        type: "text" as const,
        required: true,
        helpText: "Raw HTML to render and capture. Max 5 MB.",
      },
    ];
  }
  if (source === "markdown") {
    return [
      {
        key: "markdown",
        label: "Markdown",
        type: "text" as const,
        required: true,
        helpText:
          "Markdown text to turn into a polished image or PDF — headings, lists, links, and code blocks are styled for you. Max 5 MB.",
      },
    ];
  }
  return [
    {
      key: "url",
      label: "URL",
      type: "string" as const,
      required: true,
      helpText: "The full webpage URL to capture, including https://.",
    },
  ];
};

const formatField = {
  key: "format",
  label: "Output Format",
  type: "string" as const,
  choices: { png: "PNG", jpeg: "JPEG", webp: "WebP", pdf: "PDF" },
  default: "png",
  required: false,
  helpText: "Image or document format for the capture output.",
  altersDynamicFields: true,
};

// PDF-specific field definitions. Used directly by the Generate PDF action
// (where format is always PDF) and filtered by pdfDynamicFields for the
// image-capable actions (Screenshot Capture, Capture Async) where they
// only appear when the user selects Output Format = PDF.
const pdfFieldsArray = [
  {
    key: "pdfFormat",
    label: "PDF Page Size",
    type: "string" as const,
    choices: { A3: "A3", A4: "A4", Legal: "Legal", Letter: "Letter", Tabloid: "Tabloid" },
    default: "A4",
    required: false,
    helpText: "PDF page size. Default: A4.",
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
    helpText: "Print background colors/images. Default: true.",
  },
  {
    key: "pdfScale",
    label: "PDF Scale",
    type: "number" as const,
    required: false,
    helpText: "PDF scale factor (0.1–2). Default: 1.",
  },
];

// Dynamic wrapper — returns PDF fields only when Output Format is PDF.
// Used by Screenshot Capture and Capture Async to hide PDF-specific
// fields when the user is capturing an image.
const pdfDynamicFields = (_z: ZObject, bundle: Bundle) => {
  const format = (bundle.inputData?.format as string) || "png";
  if (format !== "pdf") return [];
  return pdfFieldsArray;
};

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
    key: "blockCookieBanners",
    label: "Hide Cookie Banners",
    type: "boolean" as const,
    default: "false",
    required: false,
    helpText: "Automatically hide common cookie/consent pop-ups before capture.",
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
    label: "Cookies (Rendex paid plan)",
    type: "text" as const,
    required: false,
    helpText:
      'JSON array of cookie objects. Each cookie needs at minimum a name and value, plus optional domain, path, httpOnly, secure, sameSite, and expires fields. Maximum 50 cookies per request. Requires a Rendex paid plan (Starter, Pro, or Enterprise) — separate from your Zapier plan. Free Rendex keys return a 403 PLAN_UPGRADE_REQUIRED error. See the Rendex pricing page to upgrade.',
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
    key: "device",
    label: "Device",
    type: "string" as const,
    choices: {
      desktop: "Desktop",
      iphone_15: "iPhone 15",
      iphone_se: "iPhone SE",
      pixel_8: "Pixel 8",
      ipad: "iPad",
      ipad_pro: "iPad Pro",
    },
    required: false,
    helpText: "Capture as if viewed on this device.",
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
    label: "Geo Country (Rendex Pro/Enterprise)",
    type: "string" as const,
    required: false,
    helpText:
      "ISO 3166-1 alpha-2 country code to capture the page as seen from that country. Examples: US for United States, DE for Germany, JP for Japan, CA for Canada. Requires a Rendex Pro or Enterprise plan — separate from your Zapier plan. Free and Starter Rendex keys return a 403 PLAN_UPGRADE_REQUIRED error. See the Rendex pricing page to upgrade.",
  },
  {
    key: "geoCity",
    label: "Geo City (Rendex Pro/Enterprise)",
    type: "string" as const,
    required: false,
    helpText:
      "City name for more precise geo-targeting (e.g. New York, Tokyo). Requires Geo Country to be set and a Rendex Pro or Enterprise plan — not related to your Zapier plan.",
  },
  {
    key: "geoState",
    label: "Geo State (Rendex Pro/Enterprise)",
    type: "string" as const,
    required: false,
    helpText:
      "State or region for precise geo-targeting. Requires Geo Country and a Rendex Pro or Enterprise plan — not related to your Zapier plan.",
  },
  {
    key: "headers",
    label: "Custom Headers (Rendex paid plan)",
    type: "text" as const,
    required: false,
    helpText:
      "JSON object mapping HTTP header names to values. Cannot override Host, Connection, Content-Length, or Transfer-Encoding. Requires a Rendex paid plan (Starter, Pro, or Enterprise) — separate from your Zapier plan. Free Rendex keys return a 403 PLAN_UPGRADE_REQUIRED error. See the Rendex pricing page to upgrade.",
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
    key: "hideSelectors",
    label: "Hide Elements",
    type: "text" as const,
    required: false,
    helpText:
      "CSS selectors for elements to hide (e.g. popups or banners), one per line.",
  },
  {
    key: "js",
    label: "Custom JavaScript",
    type: "text" as const,
    required: false,
    helpText: "JavaScript to execute before capture. Max 50 KB.",
  },
  {
    key: "quality",
    label: "Quality",
    type: "integer" as const,
    required: false,
    helpText: "Image quality 1–100 (JPEG/WebP only, ignored for PNG/PDF).",
  },
  {
    key: "resizeHeight",
    label: "Resize Height (px)",
    type: "integer" as const,
    required: false,
    helpText: "Shrink the image to this height.",
  },
  {
    key: "resizeWidth",
    label: "Resize Width (px)",
    type: "integer" as const,
    required: false,
    helpText: "Shrink the image to this width. Keeps proportions if height is blank.",
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

// Dynamic function — returns the "Template Values" dict field only when
// the source is HTML or Markdown (i.e. the content is user-supplied and
// can contain {{placeholders}}). Hidden for URL captures because
// templating is not applied to live web pages.
const templateDataFields = (_z: ZObject, bundle: Bundle) => {
  const source = (bundle.inputData?.source as string) || "url";
  if (source === "url") return [];
  return [
    {
      key: "data",
      label: "Template Values",
      type: "dict" as const,
      required: false,
      helpText:
        "Fill in the {{placeholders}} in your HTML or Markdown. Add one row per placeholder — the key is the placeholder name (without curly braces) and the value is what replaces it. For example: key = name, value = Alice replaces {{name}} with Alice. Leave empty if your content has no placeholders.",
    },
  ];
};

export {
  sourceTypeField,
  sourceValueFields,
  templateDataFields,
  formatField,
  pdfFieldsArray,
  pdfDynamicFields,
  advancedFields,
};
