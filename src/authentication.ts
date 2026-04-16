import { CREDENTIAL_TEST_PATH } from "./constants";
import type { Bundle, ZObject } from "zapier-platform-core";

const test = async (z: ZObject, _bundle: Bundle) => {
  const response = await z.request({ url: CREDENTIAL_TEST_PATH });

  // 401/403 are caught by the afterResponse middleware (handleErrors).
  // Any other status (including 404) means the key is valid — the
  // credential-check path doesn't exist as a resource, but the auth
  // layer passed, which is all we need.
  if (response.status === 401 || response.status === 403) {
    throw new z.errors.Error(
      "Authentication failed. Check your API key at rendex.dev/dashboard/keys.",
      "AuthenticationError",
      response.status,
    );
  }

  return { status: "authenticated" };
};

const authentication = {
  type: "custom" as const,
  test,
  fields: [
    {
      key: "api_key",
      label: "API Key",
      type: "string" as const,
      required: true,
      helpText:
        "Your Rendex API key (starts with `rdx_`). Get one at [rendex.dev/dashboard/keys](https://rendex.dev/dashboard/keys).",
    },
  ],
  connectionLabel: (_z: ZObject, bundle: Bundle) => {
    const key = bundle.authData.api_key || "";
    return `Rendex (${key.slice(0, 8)}...)`;
  },
};

export default authentication;
