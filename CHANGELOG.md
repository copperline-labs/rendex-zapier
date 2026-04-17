# Changelog

## 1.0.7

Remove the optional "Webhook Signing Secret" field from the New Screenshot Ready trigger. The feature referenced a dashboard page that doesn't exist — Rendex currently uses a single server-side signing key rather than per-user secrets. Zapier's webhook URL is already unique and unguessable, matching the security model used by Stripe, GitHub, and Shopify Zapier integrations. Per-user webhook signing will return in a future version once the dashboard supports it.

## 1.0.6

Initial public release.

- New action: create/screenshot_capture — synchronous screenshot capture
- New action: create/capture_async — background screenshot capture with webhook support
- New action: create/generate_pdf — synchronous PDF generation
- New action: create/submit_batch — batch capture up to 500 URLs
- New search: search/get_job_status — poll background jobs
- New search: search/get_batch_status — poll batch results
- New trigger: trigger/new_screenshot_ready — REST Hook trigger for completed captures with HMAC signature verification
- URL auto-normalization — bare domains like `yahoo.com` are accepted and prefixed with `https://`
- Plan-gated fields (Geo, Cookies, Custom Headers, Batch size) are explicitly labeled as Rendex plan requirements, separate from Zapier plans
