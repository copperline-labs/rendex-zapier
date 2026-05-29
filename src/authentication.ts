import { CREDENTIAL_TEST_PATH } from "./constants";
import type { Bundle, ZObject } from "zapier-platform-core";

const test = async (z: ZObject, _bundle: Bundle) => {
  const response = await z.request({ url: CREDENTIAL_TEST_PATH });

  // CREDENTIAL_TEST_PATH is the dedicated /v1/credential-check endpoint,
  // which returns 200 {ok:true} for a valid key. A 401/403 (invalid/forbidden
  // key) surfaces below; the afterResponse middleware (handleErrors) handles
  // other non-2xx statuses.
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
