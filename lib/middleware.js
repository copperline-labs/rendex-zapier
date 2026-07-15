"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleErrors = exports.setBaseUrl = exports.addBearerToken = void 0;
const constants_1 = require("./constants");
const addBearerToken = (request, _z, bundle) => {
    if (bundle.authData.api_key) {
        request.headers = {
            ...request.headers,
            Authorization: `Bearer ${bundle.authData.api_key}`,
        };
    }
    return request;
};
exports.addBearerToken = addBearerToken;
const setBaseUrl = (request, _z, _bundle) => {
    if (request.url && !request.url.startsWith("http")) {
        request.url = `${constants_1.API_BASE}${request.url}`;
    }
    return request;
};
exports.setBaseUrl = setBaseUrl;
const handleErrors = async (response, z, _bundle) => {
    if (response.status === 401) {
        throw new z.errors.ExpiredAuthError("Your Rendex API key is invalid. Check your key at rendex.dev/dashboard/keys.");
    }
    if (response.status === 403) {
        // A 403 here is one of two very different things:
        //   1. A plan wall — the call is valid but needs a higher plan (geo on the
        //      live screenshot endpoint, or a Watch limit/host-cap/interval/feature
        //      gate). The API returns a structured `error.code` + human `error.message`
        //      (and usually an `error.upgrade_url`). Blanket-throwing ExpiredAuthError
        //      here turns these into a false "reconnect your key" loop.
        //   2. A genuine auth failure — a revoked/disabled key or a bare FORBIDDEN
        //      with no structured upgrade code. That IS an auth problem.
        const body = response.json;
        const code = body?.error?.code;
        const message = body?.error?.message;
        const PLAN_WALL_CODES = new Set([
            "PLAN_UPGRADE_REQUIRED",
            "WATCH_LIMIT_REACHED",
            "WATCH_HOST_LIMIT_REACHED",
            "WATCH_INTERVAL_TOO_FAST",
        ]);
        if (code && message && PLAN_WALL_CODES.has(code)) {
            const upgradeUrl = body?.error?.upgrade_url;
            const suffix = upgradeUrl && !String(message).includes(upgradeUrl)
                ? ` Upgrade at ${upgradeUrl}`
                : "";
            throw new z.errors.Error(`${message}${suffix}`);
        }
        throw new z.errors.ExpiredAuthError("Your Rendex API key is disabled or revoked.");
    }
    if (response.status === 429) {
        // Two 429s: USAGE_EXCEEDED = the monthly pool is spent (halt — a retry can't
        // help until refill/upgrade); RATE_LIMITED = the per-minute cap (throttle —
        // Zapier auto-retries and the cap clears in ~60s, so DON'T halt a working Zap).
        // Either way, surface the API's own message + upgrade link so the user sees the
        // real reason and the upgrade path instead of a generic "rate limited".
        const body = response.json;
        const code = body?.error?.code;
        const message = body?.error?.message;
        const upgradeUrl = body?.error?.upgrade_url;
        const withUpgrade = (fallback) => {
            const base = message || fallback;
            return upgradeUrl && !String(base).includes(upgradeUrl)
                ? `${base} Upgrade at ${upgradeUrl}`
                : base;
        };
        if (code === "USAGE_EXCEEDED") {
            throw new z.errors.HaltedError(withUpgrade("Monthly usage limit reached. Upgrade your plan at rendex.dev/dashboard."));
        }
        throw new z.errors.ThrottledError(withUpgrade("Rate limited by Rendex (the free plan allows 10 requests/minute). Zapier will retry automatically — upgrade for a higher limit."), 60);
    }
    return response;
};
exports.handleErrors = handleErrors;
//# sourceMappingURL=middleware.js.map