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
  if (source === "markdown" && input.markdown) body.markdown = input.markdown;

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

  // Template data — dict of placeholder→value for HTML/Markdown templating.
  // Zapier delivers dict fields as plain objects; pass through as-is when
  // non-empty. Only meaningful when source=html or source=markdown (the API
  // ignores it for URL captures), but we let the API enforce that rather than
  // silently dropping user input here.
  if (input.data && typeof input.data === "object" && Object.keys(input.data as object).length > 0) {
    body.data = input.data;
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

/**
 * Validate an optional webhook-style URL field. Non-developer Zapier users
 * often leave these fields with stray characters (`/`, data-picker refs that
 * resolve to empty, whitespace) — silently skip those instead of blowing up
 * the API call. For real-looking-but-malformed values, throw a clear error
 * that tells the user how to fix it.
 *
 * Returns the normalized URL when valid, undefined when the field should be
 * omitted from the request body entirely, or throws when the user attempted
 * a URL that's clearly broken.
 */
export function validateOptionalWebhookUrl(
  val: unknown,
  fieldLabel: string,
): string | undefined {
  const raw = String(val ?? "").trim();
  if (!raw) return undefined;

  // Common Zapier data-picker leftovers that aren't real URLs.
  if (raw === "/" || raw === "null" || raw === "undefined" || raw.length < 4) {
    return undefined;
  }

  const normalized = normalizeUrl(raw);
  let parsed: URL;
  try {
    parsed = new URL(normalized);
  } catch {
    throw new Error(
      `The ${fieldLabel} field doesn't look like a valid URL (got "${raw}"). If you don't need a webhook callback, leave it empty and use Get Job Status to poll for the result. If you do, copy the URL from the 'New Screenshot Ready' trigger's setup step.`,
    );
  }
  if (!parsed.hostname || parsed.hostname.length < 3) {
    return undefined;
  }
  if (parsed.protocol !== "https:" && parsed.protocol !== "http:") {
    throw new Error(
      `The ${fieldLabel} field must be an https URL (got "${raw}").`,
    );
  }
  return normalized;
}
