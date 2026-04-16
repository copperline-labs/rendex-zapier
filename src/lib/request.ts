// Transforms Zapier inputData (flat string values) into a properly-typed
// request body matching the Rendex ScreenshotRequestSchema.

export function buildRequestBody(
  input: Record<string, unknown>,
): Record<string, unknown> {
  const body: Record<string, unknown> = {};

  // Source — trim whitespace and auto-prepend https:// if the user typed a
  // bare domain like "yahoo.com". The underlying API uses Zod's .url()
  // validator which requires a protocol; forgiving common user input here
  // keeps the Zap-editor UX friendly.
  const source = input.source || "url";
  if (source === "url" && input.url) body.url = normalizeUrl(input.url);
  if (source === "html" && input.html) body.html = input.html;

  // Format
  if (input.format) body.format = input.format;

  // Viewport — coerce to numbers
  if (input.width) body.width = toInt(input.width);
  if (input.height) body.height = toInt(input.height);
  if (input.deviceScaleFactor) body.deviceScaleFactor = toInt(input.deviceScaleFactor);

  // Booleans
  if (input.fullPage !== undefined) body.fullPage = toBool(input.fullPage);
  if (input.darkMode !== undefined) body.darkMode = toBool(input.darkMode);
  if (input.blockAds !== undefined) body.blockAds = toBool(input.blockAds);
  if (input.bestAttempt !== undefined) body.bestAttempt = toBool(input.bestAttempt);

  // Numbers
  if (input.delay) body.delay = toInt(input.delay);
  if (input.timeout) body.timeout = toInt(input.timeout);
  if (input.quality) body.quality = toInt(input.quality);
  if (input.pdfScale) body.pdfScale = parseFloat(input.pdfScale as string);

  // Strings
  if (input.waitUntil) body.waitUntil = input.waitUntil;
  if (input.waitForSelector) body.waitForSelector = input.waitForSelector;
  if (input.selector) body.selector = input.selector;
  if (input.userAgent) body.userAgent = input.userAgent;
  if (input.css) body.css = input.css;
  if (input.js) body.js = input.js;

  // Geo
  if (input.geo) body.geo = input.geo;
  if (input.geoCity) body.geoCity = input.geoCity;
  if (input.geoState) body.geoState = input.geoState;

  // PDF options
  if (input.pdfFormat) body.pdfFormat = input.pdfFormat;
  if (input.pdfLandscape !== undefined) body.pdfLandscape = toBool(input.pdfLandscape);
  if (input.pdfPrintBackground !== undefined) body.pdfPrintBackground = toBool(input.pdfPrintBackground);

  // JSON fields (user provides as stringified JSON)
  if (input.cookies) body.cookies = parseJson(input.cookies, "cookies");
  if (input.headers) body.headers = parseJson(input.headers, "headers");
  if (input.pdfMargin) body.pdfMargin = parseJson(input.pdfMargin, "pdfMargin");

  // Comma-separated → array
  if (input.blockResourceTypes) {
    body.blockResourceTypes = (input.blockResourceTypes as string)
      .split(",")
      .map((s: string) => s.trim())
      .filter(Boolean);
  }

  // Async mode
  if (input.async !== undefined) body.async = toBool(input.async);

  return body;
}

function toInt(val: unknown): number {
  return parseInt(val as string, 10);
}

function toBool(val: unknown): boolean {
  if (typeof val === "boolean") return val;
  return val === "true" || val === "1" || val === true;
}

function parseJson(val: unknown, fieldName: string): unknown {
  if (typeof val !== "string") return val;
  try {
    return JSON.parse(val);
  } catch {
    throw new Error(`Invalid JSON in ${fieldName} field.`);
  }
}

// Accepts bare domains ("yahoo.com"), URLs with or without trailing slash,
// URLs pasted with accidental whitespace. Returns a protocol-prefixed URL.
// The Rendex API still runs Zod's .url() on the final value — this just
// catches the most common Zapier user-input mistake.
export function normalizeUrl(val: unknown): string {
  const raw = String(val ?? "").trim();
  if (!raw) return raw;
  if (/^https?:\/\//i.test(raw)) return raw;
  return `https://${raw}`;
}
