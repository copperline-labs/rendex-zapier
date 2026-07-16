// Shared input fields for the Rendex Watch actions. Each field `key` is the real
// Rendex Watch parameter (so the cross-channel param-parity check can verify it);
// the labels and help are written for non-developers. Render knobs are sent FLAT
// here and nested under renderParams by buildWatchBody() before the request.

const urlField = {
  key: "url",
  label: "Web Page URL",
  type: "string" as const,
  required: true,
  helpText: "The full address of the page to keep an eye on, starting with http or https.",
};

const nameField = {
  key: "name",
  label: "Name",
  type: "string" as const,
  required: false,
  helpText: "An optional label so you can recognize this watch later (e.g. \"Competitor pricing\").",
};

const intervalField = {
  key: "intervalMinutes",
  label: "How Often to Check",
  type: "string" as const,
  choices: {
    "1440": "Once a day",
    "720": "Every 12 hours",
    "180": "Every 3 hours",
    "60": "Every hour",
    "30": "Every 30 minutes",
    "15": "Every 15 minutes",
    "5": "Every 5 minutes",
  },
  default: "1440",
  required: false,
  helpText:
    "How frequently to look for changes. Faster checking needs a higher plan — if you pick a speed your plan doesn't allow, you'll get a message with the fastest option available to you.",
};

const diffModeField = {
  key: "diffMode",
  label: "What Counts as a Change",
  type: "string" as const,
  choices: {
    both: "Any change — how it looks or the words (recommended)",
    visual: "Visual only — how the page looks",
    text: "Text only — the words on the page",
  },
  default: "both",
  required: false,
  helpText: "By default we watch both how the page looks AND its full text, and alert on any change. Pick one to narrow it.",
};

const thresholdField = {
  key: "threshold",
  label: "Visual Sensitivity",
  type: "string" as const,
  choices: {
    "0.01": "Any visual change, big or small (recommended)",
    "0.1": "Only a major visual change",
  },
  default: "0.01",
  required: false,
  helpText: "How big a visual change has to be to alert you. 'Any' catches a small change even on a long page; 'major' only flags big layout shifts. Doesn't affect text detection.",
};

const notifyEmailField = {
  key: "notifyEmail",
  label: "Email Alerts To",
  type: "string" as const,
  required: false,
  helpText:
    "Send change alerts to this email. Must be your own account email. Leave blank to use the email on your account — or skip email entirely and use the \"Website Changed\" trigger to run a Zap. On the Update action, type \"-\" or \"none\" here to stop emailing this watch.",
};

const selectorField = {
  key: "selector",
  label: "Watch Only This Part of the Page",
  type: "string" as const,
  required: false,
  helpText:
    "Optional. A CSS selector (e.g. \"#price\") to watch just one element — a price, a banner, a heading — instead of the whole page.",
};

const hideSelectorsField = {
  key: "hideSelectors",
  label: "Ignore These Parts of the Page",
  type: "text" as const,
  required: false,
  helpText: "Optional. CSS selectors for things to remove before checking (one per line), like chat widgets or ads.",
};

const ignoreTextField = {
  key: "ignoreText",
  label: "Ignore Text Like This",
  type: "text" as const,
  required: false,
  helpText:
    "Optional. Lines of text to ignore so they don't trigger a false alert — e.g. a clock, a visitor counter, or \"Updated 5 minutes ago\". One per line. Applies to text checks.",
};

const minTextCharsField = {
  key: "minTextChars",
  label: "Ignore Tiny Text Changes",
  type: "integer" as const,
  required: false,
  helpText: "Optional. Ignore text changes smaller than this many characters. Leave blank to be alerted to any change.",
};

const suppressWhilePresentField = {
  key: "suppressWhilePresent",
  label: "Don't Alert While the Page Says",
  type: "text" as const,
  required: false,
  helpText:
    "Optional. While the page contains any of these words (one per line) — like \"Out of stock\" or \"Loading\" — changes are ignored until they clear.",
};

const formatField = {
  key: "format",
  label: "Capture As",
  type: "string" as const,
  choices: { png: "Image (PNG)", jpeg: "Image (JPEG)", webp: "Image (WebP)", pdf: "PDF" },
  required: false,
  helpText: "How to capture the page. PDF can only be used with text change detection.",
};

const fullPageField = {
  key: "fullPage",
  label: "Check the Whole Page",
  type: "boolean" as const,
  default: "true",
  required: false,
  helpText: "On by default — checks the entire scrollable page. Turn off to check only the part visible without scrolling.",
};

const deviceField = {
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
  helpText: "Optional. Check the page as it looks on a specific device.",
};

const darkModeField = {
  key: "darkMode",
  label: "Dark Mode",
  type: "boolean" as const,
  required: false,
  helpText: "Optional. Check the page in dark mode.",
};

const blockAdsField = {
  key: "blockAds",
  label: "Block Ads",
  type: "boolean" as const,
  default: "true",
  required: false,
  helpText: "On by default — hides ads so they don't cause false alerts.",
};

const blockCookieBannersField = {
  key: "blockCookieBanners",
  label: "Hide Cookie Banners",
  type: "boolean" as const,
  required: false,
  helpText: "Optional. Dismiss common cookie/consent pop-ups before checking.",
};

const geoField = {
  key: "geo",
  label: "Check From Country",
  type: "string" as const,
  required: false,
  helpText:
    "Optional. A 2-letter country code (e.g. US, DE, JP) to check the page as seen from that country. Geo-targeting is visual-only — it can't be combined with a text or both diff mode. Pro plan and above.",
};

const uaModeField = {
  key: "uaMode",
  label: "If the Site Blocks Monitoring",
  type: "string" as const,
  choices: {
    auto: "Identify, but quietly retry if blocked (recommended)",
    identify: "Always identify as a monitor",
    stealth: "Visit as a normal browser",
  },
  required: false,
  helpText: "How the monitor presents itself. The default works for most sites.",
};

const webhookUrlField = {
  key: "webhookUrl",
  label: "Advanced: Send Alerts to a Webhook URL",
  type: "string" as const,
  required: false,
  helpText:
    "Optional and advanced. Most people can leave this blank and use the \"Website Changed\" trigger instead. Requires a Starter plan or higher. On the Update action, type \"-\" or \"none\" here to remove an existing webhook.",
};

const aiSummaryField = {
  key: "aiSummary",
  label: "AI Summary of Changes",
  type: "boolean" as const,
  required: false,
  helpText:
    "Optional. Add an AI-written one-line summary of what changed to each alert (requires a Rendex Pro or Enterprise plan — not related to your Zapier plan). Every plan already gets a plain templated summary; this upgrades it to a natural-language sentence for text changes.",
};

const pausedCreateField = {
  key: "paused",
  label: "Start Paused",
  type: "boolean" as const,
  required: false,
  helpText: "Optional. Create the watch without starting it yet. Turn it on later with \"Update Website Watch\".",
};

// Shared optional knobs, in display order, reused by Create and Update.
const SHARED_OPTIONAL_FIELDS = [
  nameField,
  intervalField,
  diffModeField,
  notifyEmailField,
  thresholdField,
  selectorField,
  hideSelectorsField,
  ignoreTextField,
  minTextCharsField,
  suppressWhilePresentField,
  formatField,
  fullPageField,
  deviceField,
  darkModeField,
  blockAdsField,
  blockCookieBannersField,
  geoField,
  uaModeField,
  webhookUrlField,
  aiSummaryField,
];

export const CREATE_WATCH_FIELDS = [urlField, ...SHARED_OPTIONAL_FIELDS, pausedCreateField];

// Test (dry-run) reuses the URL, what-counts-as-a-change, and the render knobs —
// but NOT the schedule/alert/threshold fields, since a dry-run creates no watch
// (nothing to schedule, alert on, or threshold against). No new field keys.
const TEST_RENDER_FIELDS = [
  selectorField,
  hideSelectorsField,
  ignoreTextField,
  minTextCharsField,
  suppressWhilePresentField,
  formatField,
  fullPageField,
  deviceField,
  darkModeField,
  blockAdsField,
  blockCookieBannersField,
  geoField,
  uaModeField,
];

export const TEST_WATCH_FIELDS = [urlField, diffModeField, ...TEST_RENDER_FIELDS];

// Update reuses everything, but the URL is optional and there's a Pause/Resume control.
const updateUrlField = { ...urlField, required: false, label: "New Web Page URL", helpText: "Optional. Change the page this watch monitors (this restarts the comparison from scratch)." };

const pauseResumeField = {
  key: "paused",
  label: "Pause or Resume",
  type: "string" as const,
  choices: { "": "Leave unchanged", true: "Pause", false: "Resume" },
  required: false,
  helpText: "Pause the watch (stop checking) or resume it.",
};

export const UPDATE_WATCH_FIELDS = [updateUrlField, ...SHARED_OPTIONAL_FIELDS, pauseResumeField];
