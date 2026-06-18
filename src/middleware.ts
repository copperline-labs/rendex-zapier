import { API_BASE } from "./constants";
import type { Bundle, HttpRequestOptions, ZObject } from "zapier-platform-core";

export const addBearerToken = (
  request: HttpRequestOptions,
  _z: ZObject,
  bundle: Bundle,
): HttpRequestOptions => {
  if (bundle.authData.api_key) {
    request.headers = {
      ...request.headers,
      Authorization: `Bearer ${bundle.authData.api_key}`,
    };
  }
  return request;
};

export const setBaseUrl = (
  request: HttpRequestOptions,
  _z: ZObject,
  _bundle: Bundle,
): HttpRequestOptions => {
  if (request.url && !request.url.startsWith("http")) {
    request.url = `${API_BASE}${request.url}`;
  }
  return request;
};

export const handleErrors = async (
  response: any,
  z: ZObject,
  _bundle: Bundle,
): Promise<any> => {
  if (response.status === 401) {
    throw new z.errors.ExpiredAuthError(
      "Your Rendex API key is invalid. Check your key at rendex.dev/dashboard/keys.",
    );
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
      const suffix =
        upgradeUrl && !String(message).includes(upgradeUrl)
          ? ` Upgrade at ${upgradeUrl}`
          : "";
      throw new z.errors.Error(`${message}${suffix}`);
    }
    throw new z.errors.ExpiredAuthError(
      "Your Rendex API key is disabled or revoked.",
    );
  }
  if (response.status === 429) {
    const body = response.json;
    const code = body?.error?.code;
    if (code === "USAGE_EXCEEDED") {
      throw new z.errors.HaltedError(
        "Monthly usage limit reached. Upgrade your plan at rendex.dev/dashboard.",
      );
    }
    throw new z.errors.ThrottledError(
      "Rate limited by Rendex. Zapier will automatically retry.",
      60,
    );
  }
  return response;
};
