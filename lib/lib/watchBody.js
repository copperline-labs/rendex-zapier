"use strict";
// Turns flat Zapier inputData into a Rendex Watch request body. Top-level keys
// (name/intervalMinutes/diffMode/threshold/notifyEmail/webhookUrl/paused) stay on
// the body; render knobs nest under `renderParams`; the text-list fields are split
// into arrays. Mirrors the n8n buildWatchBody so a watch created from either tool
// behaves identically.
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildWatchBody = buildWatchBody;
const request_1 = require("./request");
function toInt(val) {
    return parseInt(val, 10);
}
function toBool(val) {
    if (typeof val === "boolean")
        return val;
    return val === "true" || val === "1" || val === true;
}
function splitList(val, separator) {
    return String(val ?? "")
        .split(separator)
        .map((s) => s.trim())
        .filter(Boolean);
}
// On the Update action, a no-code user has no other way to CLEAR a webhook or
// notify-email channel (an empty field is simply omitted, leaving the old value
// in place). We overload the existing field with a sentinel — "-" or "none" —
// so they can erase it. The API's UpdateWatchSchema makes webhookUrl/notifyEmail
// nullable; emitting JSON `null` for that field clears the channel. No new
// request-param field key is introduced (param-parity stays intact).
const CLEAR_SENTINELS = new Set(["-", "none"]);
function isClearSentinel(val) {
    return typeof val === "string" && CLEAR_SENTINELS.has(val.trim().toLowerCase());
}
function buildWatchBody(input, options = {}) {
    const { includeUrl = true, allowClear = false } = options;
    const body = {};
    if (includeUrl && input.url)
        body.url = (0, request_1.normalizeUrl)(input.url);
    // Top-level watch fields.
    if (input.name)
        body.name = input.name;
    if (input.intervalMinutes)
        body.intervalMinutes = toInt(input.intervalMinutes);
    if (input.diffMode)
        body.diffMode = input.diffMode;
    if (input.threshold !== undefined && input.threshold !== "") {
        body.threshold = parseFloat(input.threshold);
    }
    if (input.notifyEmail) {
        body.notifyEmail =
            allowClear && isClearSentinel(input.notifyEmail) ? null : input.notifyEmail;
    }
    if (input.webhookUrl) {
        body.webhookUrl =
            allowClear && isClearSentinel(input.webhookUrl)
                ? null
                : (0, request_1.normalizeUrl)(input.webhookUrl);
    }
    if (input.paused !== undefined && input.paused !== "")
        body.paused = toBool(input.paused);
    // Render knobs → renderParams.
    const rp = {};
    if (input.format)
        rp.format = input.format;
    if (input.fullPage !== undefined && input.fullPage !== "")
        rp.fullPage = toBool(input.fullPage);
    if (input.device)
        rp.device = input.device;
    if (input.darkMode !== undefined && input.darkMode !== "")
        rp.darkMode = toBool(input.darkMode);
    if (input.blockAds !== undefined && input.blockAds !== "")
        rp.blockAds = toBool(input.blockAds);
    if (input.blockCookieBanners !== undefined && input.blockCookieBanners !== "") {
        rp.blockCookieBanners = toBool(input.blockCookieBanners);
    }
    if (input.selector)
        rp.selector = input.selector;
    if (input.geo)
        rp.geo = input.geo;
    if (input.minTextChars)
        rp.minTextChars = toInt(input.minTextChars);
    if (input.uaMode)
        rp.uaMode = input.uaMode;
    // Text-list fields → arrays. hideSelectors accepts comma or newline; the text
    // filters split on newline only (a literal/regex may contain a comma).
    if (input.hideSelectors) {
        const arr = splitList(input.hideSelectors, /[\n,]/);
        if (arr.length > 0)
            rp.hideSelectors = arr;
    }
    if (input.ignoreText) {
        const arr = splitList(input.ignoreText, /\r?\n/);
        if (arr.length > 0)
            rp.ignoreText = arr;
    }
    if (input.suppressWhilePresent) {
        const arr = splitList(input.suppressWhilePresent, /\r?\n/);
        if (arr.length > 0)
            rp.suppressWhilePresent = arr;
    }
    if (Object.keys(rp).length > 0)
        body.renderParams = rp;
    return body;
}
//# sourceMappingURL=watchBody.js.map