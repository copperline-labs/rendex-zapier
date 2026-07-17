# Changelog

## 1.8.1

**Corrected free-plan rate-limit and batch guidance.** The rate-limit message now states the correct free-plan limit (3 requests/minute), and the Submit Batch help text reflects that batch is a Starter-plan feature (Starter 25 URLs, Pro 100, Enterprise 500) rather than implying it is available on the free tier. Copy-only — no authentication, trigger, or action-shape changes; existing Zaps are unaffected.

## 1.8.0

**Watch now tells you what changed.** Every "Website Changed" trigger event now includes a plain-English **summary** of what changed, a **crop image** of exactly the part of the page that changed (`cropUrl`), and the change's location on the page (`changedRegion`) — alongside the existing before / after / overlay images. New watches also detect **any change** — how the page looks *and* its text — by default (the "What Counts as a Change" field now defaults to *Any change*).

No authentication or trigger-shape changes. Existing Zaps continue to work unchanged; the new fields are additive.

## 1.7.0

**New "Create Branded Artifact" action** — turn Markdown or HTML into a polished, branded document in one step and get back a hosted PDF, PNG, and share link. Add your brand name, logo, accent color, and footer, and optionally fill in `{{placeholders}}` with template values — great for reports, invoices, receipts, and one-pagers. Choose PDF, PNG, or both, and set how long the links stay valid. The result comes back right away — no waiting or polling.

**New "Get Account & Usage" search** — look up your connected Rendex account at any time: your plan, this month's usage (used, limit, and remaining), the reset date, your per-minute rate limit, and the recommended upgrade. It's always free — checking your usage never uses credits — so you can branch a Zap on how many renders you have left.

No authentication or trigger changes. Existing Zaps continue to work unchanged.

## 1.6.1

**New "Test a Website Watch" action** — try out a watch on a page once, right now, without actually creating it. Rendex captures the page a single time and tells you whether it could read it and what it saw — so you can confirm the page works and your settings are right (which part of the page to watch, what counts as a change, how it should appear) before you start monitoring. Nothing is saved and no alerts are set up. Great for checking a new watch from a Zap before you commit to it.

No authentication or trigger changes. Existing Zaps continue to work unchanged.

## 1.6.0

**New "Create Render Link" action** — turn any URL, raw HTML, or Markdown into a hosted, auto-caching image or PDF link instead of a downloaded file. Drop the returned link straight into a social-preview `og:image` tag or an `<img>` on your site — Rendex renders it once and serves a cached copy on every share, so a widely-shared link doesn't re-render on every visit. Optionally set how long the link stays valid. Same capture options as Capture Screenshot (device, full page, dark mode, format, and more).

No authentication or trigger changes. Existing Zaps continue to work unchanged.

## 1.5.1

**New "Run a Check Now" action** — trigger an immediate check of a watch right now, outside its normal schedule. Pick the watch from a dropdown, or map a Watch ID from an earlier step — handy for re-checking on demand or testing a new watch from a Zap.

No authentication changes. Existing Zaps continue to work unchanged.

## 1.5.0

Added **Rendex Watch** — keep an eye on any web page and run a Zap when it changes.

- **New "Website Changed" trigger** — starts your Zap whenever one of your monitored pages changes. Use it to post to Slack, add a row to a sheet, send an email, or kick off any workflow. (Prefer instant alerts? You can also point a watch's webhook at a Zapier Catch Hook — but this trigger needs zero setup.)
- **New "Create Website Watch" action** — start monitoring a page. Choose how often to check (once a day up to every few minutes, depending on your plan) and what counts as a change: how the page **looks**, the **text** on it, or **both**. Fine-tune it by watching just one part of the page, ignoring noisy bits (clocks, counters, ads), or holding alerts while the page shows things like "Out of stock".
- **New "Update Website Watch" action** — change a watch's schedule, settings, or alerts, or **pause and resume** it. Pick the watch from a dropdown.
- **New "Delete Website Watch" action** — remove a watch you no longer need.
- **New "Find Website Watch" search** — look up a watch's current status and details by ID.
- **Clearer "needs a higher plan" messages** — when an action is blocked because it needs a higher plan (a faster check interval, more watches, webhook alerts, geo-targeting), Zapier now shows the actual upgrade message and link instead of incorrectly asking you to reconnect your Rendex account.
- **Clear an alert channel on Update** — on "Update Website Watch", type `-` or `none` into "Email Alerts To" or the webhook field to remove that alert channel from a watch.

No authentication changes. Existing Zaps continue to work unchanged.

## 1.4.0

Added a new **Extract Text From a Web Page** action and more ways to control how a page is captured.

- **New "Extract Text From a Web Page" action** — give it any URL and get back the clean article text (the main content, with the navigation, ads, and footers stripped out). Choose Markdown, HTML, or JSON, and you also get the page title, author, excerpt, and site name as separate fields to use in later steps. Great for feeding articles into AI steps, summaries, or content databases. Returns the result right away — no waiting or polling.
- **New "Device" choice** on Capture Screenshot, Generate PDF, and Capture Async — capture a page as it looks on Desktop, iPhone 15, iPhone SE, Pixel 8, iPad, or iPad Pro, without setting viewport sizes by hand.
- **New "Resize Width" and "Resize Height"** options — scale the finished image down to an exact size (handy for thumbnails or fitting a fixed slot).
- **New "Hide Cookie Banners"** toggle — automatically dismiss common cookie and consent pop-ups before the capture.
- **New "Hide Elements"** field — list CSS selectors (one per line) for anything you want removed from the page before capture, like chat widgets or promo bars.

No authentication or trigger changes. Existing Zaps continue to work unchanged.

## 1.3.0

Added **Template Values** to Capture Screenshot, Generate PDF, and Capture Async. Fill in the `{{placeholders}}` in your HTML or Markdown with a row per value — Rendex merges them in before rendering. Build one reusable template and generate invoices, reports, certificates, or cards by just changing the values.

- **New "Template Values" field** (key/value rows — no code) shown when Source Type is HTML or Markdown. Each row maps a placeholder name to its value.
- Supports simple values (`{{number}}`), and the template can loop over repeated rows and use sections — handy for line items on an invoice.
- Template Values aren't used for URL captures, so they're left out of Submit Batch.

No authentication or trigger changes. Existing Zaps continue to work unchanged.

## 1.2.0

Added **Markdown** as a third source type alongside URL and Raw HTML. You can now turn Markdown straight into a PNG, JPEG, WebP, or PDF — great for rendering docs, READMEs, release notes, and AI-generated content without converting to HTML first.

- **New "Markdown" choice in the Source field** on Capture Screenshot and Generate PDF. Paste Markdown and Rendex renders it with clean default typography.

## 1.1.0

Expanded **Submit Batch** defaults to the full set of capture options the batch API actually accepts. Previously the action only let you set 8 defaults (format, viewport, dark mode, ad-blocking, timeout, wait-until, full-page); every other option had to be set per-job via the API directly.

- **Submit Batch now exposes every option `CaptureParamsSchema` accepts as a default** applied to all URLs in the batch: quality, delay, best-attempt, device scale factor, custom CSS/JS, user agent, geo-targeting (geo/geoCity/geoState), and PDF page options (size, landscape, print background, scale).
- **PDF page options appear in the batch form when Output Format is PDF**, matching the single-capture actions.
- **Deliberately omitted** the per-job-only params the batch endpoint strips from `defaults` (cookies, headers, element selector, blockResourceTypes, waitForSelector, pdfMargin) — offering them would have silently dropped them. Use a per-URL **Capture Screenshot** action when you need those.
- Internally, Submit Batch now reuses the same field-coercion as the single-capture actions, so typing/validation stays consistent across the app.

No authentication or trigger changes. Existing Zaps continue to work unchanged.

## 1.0.18

Addresses Zapier publishing review feedback (requirement 5.8, naming conventions). All trigger/action/search display descriptions rewritten to match platform copy guidelines: triggers start with "Triggers when…", actions/searches start with a verb, no integration name, no embedded instructions. Detailed usage guidance was already duplicated in field helpText, so no context is lost to end users.

- `new_completed_screenshot`: trigger description trimmed to "Triggers when a background screenshot or PDF capture finishes."
- `list_jobs` / `list_batches` (hidden dropdown triggers): aligned to "Triggers when…" phrasing for consistency.
- `get_job_status`: search description rewritten as "Finds a background job by ID and returns its status and result URL."
- `get_batch_status`: search description rewritten as "Finds a batch by ID and returns overall status and per-URL results."
- `submit_batch`: action description rewritten as "Submits a list of URLs for parallel screenshot or PDF capture and returns a Batch ID."
- `screenshot_capture`: action description rewritten as "Captures a webpage or HTML as a PNG, JPEG, WebP, or PDF file."
- `generate_pdf`: action description rewritten as "Generates a PDF from a webpage or HTML with custom page size, margins, and orientation."
- `capture_async`: action description rewritten as "Queues a screenshot or PDF capture as a background job and returns a Job ID."

No functional changes. No field, schema, or authentication changes. Behavior is identical to 1.0.17.

## 1.0.17

Architectural pivot based on research into how async-job APIs actually ship Zapier integrations. The previous REST Hook trigger (`new_screenshot_ready`, v1.0.6–1.0.16) inverted Zapier's expected trigger→action direction — it required users to publish a Zap before they could configure it, then paste the trigger's URL into a downstream action. That pattern isn't used by any comparable API on Zapier (checked Deepgram, Resend, ElevenLabs, Descript — all ship action-only or polling triggers). It was also non-idiomatic and likely to be flagged during promote review.

- **Removed the `new_screenshot_ready` REST Hook trigger.** Existing Zaps built on v1.0.6–1.0.16 using this trigger will not auto-upgrade; users will need to rebuild with the new polling trigger or switch to "Webhooks by Zapier → Catch Hook".
- **Added `new_completed_screenshot` polling trigger.** Hits `/v1/jobs?status=completed&limit=10` on Zapier's schedule (1–15 minutes depending on Zapier plan). Zapier auto-dedupes by Job ID. No webhook URL juggling, no chicken-and-egg publish flow — pick the trigger and go.
- **Rewrote Webhook URL field helpText on `Capture Async` and `Submit Batch`** to guide non-developer users toward "Webhooks by Zapier → Catch Hook" as the intended pattern when they want Rendex to notify another Zap directly. This matches how Deepgram's Zapier integration handles callback URLs.
- **Backend cleanup:** removed `/v1/zapier-subscriptions` route (POST/DELETE). The `zapier_subscriptions` table from migration `021` stays in place as a harmless orphan — drop-migration deferred as unnecessary.

Non-developer UX principles applied: one trigger that "just works," no URL pasting needed for the common case, action-level opt-in for the webhook-to-Zap pattern for power users who want it.

## 1.0.16

Surface the per-Zap webhook URL back in the Zap editor so non-developer users can actually copy it. v1.0.11 removed the custom URL field in favor of Zapier's native REST-Hook UX, but that native UX only exists for static-hook integrations — for hooks with performSubscribe/performUnsubscribe (which we must have for D017), the URL is generated at subscribe time and isn't shown anywhere in the editor. Users were stuck with no way to find their webhook URL.

- Reinstate a dynamic `inputFields` function on the trigger: after the Zap is published and performSubscribe has run, the URL appears as a read-only "copy this" field. Before publish, a plain-English setup-instructions field tells users exactly what to do next.
- Description rewritten for non-devs — outcome-first, no REST/subscribe jargon.
- Works cleanly with v1.0.15's real `/v1/zapier-subscriptions` subscribe endpoint: `bundle.subscribeData.targetUrl` is now populated reliably, so the display is reliable too.

## 1.0.15

Correct a partial landing of the v1.0.14 Webhook URL validation fix. The shared helper and Submit Batch wiring made it in, but the Capture Async edit silently no-op'd during publish, so Capture Async continued passing stray `/` values through to the API. v1.0.15 applies the validation to Capture Async as originally intended.

## 1.0.14

Be more forgiving about half-filled Webhook URL fields on Capture Screenshot (Background) and Submit Batch. Non-developer users were ending up with stray characters (`/`, data-picker refs that resolved to empty) in the field, causing the Rendex API to reject the whole request with an opaque "Invalid request parameters" error.

- Silently skip Webhook URL when the value is obviously empty-ish (`/`, blank, `null`, `undefined`, or too short to be a URL). The step runs without a webhook callback; pair with Get Job Status to retrieve the result.
- Throw a clear action-specific error when the user *did* attempt a URL but it's malformed, with plain-language guidance on where to get the right URL (from the New Screenshot Ready trigger's setup step).
- Shared helper `validateOptionalWebhookUrl` so the behavior stays consistent between Capture Async and Submit Batch.

## 1.0.13

Apply the same async-with-polling pattern to `Generate PDF` that v1.0.12 added to `Capture Screenshot`. PDF renders often take longer than image captures (the page has to fully paint before PDF serialization), so cold-start timeouts were hitting users there too.

- Generate PDF now submits async internally, polls every 2s for up to 24s, and returns the finished PDF file.
- `bestAttempt: true` default preserved.
- Graceful `still_processing` result with Job ID for truly long documents — pair with Get Job Status to retrieve.
- Description rewritten in outcome-first plain English consistent with v1.0.12.

## 1.0.12

Make the synchronous `Capture Screenshot` action robust against Cloudflare Browser Rendering cold starts that were causing Zapier 30-second timeouts on users' first runs.

- **Async-with-polling under the hood.** The action now submits an async job (~200ms), polls Get Job Status every 2 seconds for up to 24 seconds, and returns the finished image file once the render completes. Fast renders still feel instant; slow renders no longer hard-fail at Zapier's 30s wall.
- **`bestAttempt: true` is the default.** If a render hits its internal timeout, Rendex returns a partial screenshot instead of erroring — keeps Zaps moving on edge-case pages. Users can still override by setting Best Attempt to false in the action form.
- **Graceful "still processing" result.** If a render genuinely exceeds 24 seconds (full-page scrolls, slow CDNs), the action returns `status: "still_processing"` plus the Job ID so users can retrieve the image with a Get Job Status step rather than getting a confusing timeout error.

No backend changes required — uses the existing `/v1/screenshot` (async mode) and `/v1/jobs/:jobId` endpoints.

## 1.0.11

Align the New Screenshot Ready trigger with Zapier's REST Hook conventions ahead of promotion review.

- **Real subscribe/unsubscribe.** `performSubscribe` now POSTs to `/v1/zapier-subscriptions` on the Rendex API and stores the returned subscription id; `performUnsubscribe` DELETEs it. Previous versions used no-op stubs, which mechanically satisfied D017 but were brittle under reviewer scrutiny.
- **Real `performList`.** Now hits `GET /v1/jobs?status=completed&limit=3` on the Rendex API and maps the owner-scoped job rows into the same shape as the live webhook payload. Satisfies T004/T006 (sample keys must be a subset of live result keys) with real data instead of a hardcoded array.
- **Remove the custom webhook URL input field.** v1.0.9/1.0.10 added a dynamic `triggerFields` function to display the Zapier-generated URL, which was fighting the platform — Zapier renders a native "copy this URL" screen in the Zap editor when inputFields is absent. Removing our custom field lets that native UX appear on first open.
- **Trigger description rewritten** to explain the pair-with-action flow: copy the URL Zapier shows, paste it into the Webhook URL field on a Capture Async or Submit Batch step. Also starts with "Triggers when " to satisfy D021.
- **zapier-platform-core bumped** from 18.4.0 → 18.5.0 (D027).

- **Dynamic dropdowns on Job ID + Batch ID (D004).** Non-developer Zapier users no longer need to paste UUIDs into Get Job Status / Get Batch Status. The dropdown lists the 25 most recent jobs/batches with friendly labels — `Completed · example.com · 3 min ago` — backed by new hidden `list_jobs` and `list_batches` polling triggers. Data-picker mapping from upstream steps still works.

Backend support shipped in the same release: migration `021_zapier_subscriptions.sql` and routes `/v1/zapier-subscriptions`, `GET /v1/jobs` list, `GET /v1/batches` list.

Post-validate state: 28 checks passed, 0 failed, 0 publishing tasks, 0 warnings — clean.

## 1.0.10

Fix the webhook URL display added in 1.0.9. Zapier does not populate `bundle.targetUrl` when rendering inputFields for the Setup panel — the value is only available inside `performSubscribe`. The fix reads the URL from `bundle.subscribeData.targetUrl` (stored after subscribe completes) and falls back to an instructional field if the Zap hasn't been subscribed yet.

## 1.0.9

Expose the Zapier-generated webhook URL as a visible field in the New Screenshot Ready trigger's Setup step. Previous versions (1.0.7, 1.0.8) left the trigger with no input fields, making the webhook URL invisible — users had no way to copy it into Rendex Capture Async's Webhook URL field to trigger the Zap. The new "Your Webhook URL" field shows the unique URL for each Zap once it's turned on, with instructions for pasting it into Rendex actions.

## 1.0.8

Pre-promote polish — all M-series and S001 checks now pass; this version fixes the remaining D008 helpText validation.

- Remove bare URLs and JSON bracket examples from field helpText that Zapier's D008 check flagged as invalid markdown links. Affected fields: Cookies, Custom Headers, Geo Country, and Submit Batch URLs. Content reads the same to end users; just no link-like patterns that trip the linter.

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
