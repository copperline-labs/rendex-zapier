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
