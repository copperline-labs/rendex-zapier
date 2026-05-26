export declare function buildRequestBody(input: Record<string, unknown>): Record<string, unknown>;
export declare function normalizeUrl(val: unknown): string;
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
export declare function validateOptionalWebhookUrl(val: unknown, fieldLabel: string): string | undefined;
//# sourceMappingURL=request.d.ts.map