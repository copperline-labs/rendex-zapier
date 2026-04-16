"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("./constants");
const test = async (z, _bundle) => {
    const response = await z.request({ url: constants_1.CREDENTIAL_TEST_PATH });
    // 401/403 are caught by the afterResponse middleware (handleErrors).
    // Any other status (including 404) means the key is valid — the
    // credential-check path doesn't exist as a resource, but the auth
    // layer passed, which is all we need.
    if (response.status === 401 || response.status === 403) {
        throw new z.errors.Error("Authentication failed. Check your API key at rendex.dev/dashboard/keys.", "AuthenticationError", response.status);
    }
    return { status: "authenticated" };
};
const authentication = {
    type: "custom",
    test,
    fields: [
        {
            key: "api_key",
            label: "API Key",
            type: "string",
            required: true,
            helpText: "Your Rendex API key (starts with `rdx_`). Get one at [rendex.dev/dashboard/keys](https://rendex.dev/dashboard/keys).",
        },
    ],
    connectionLabel: (_z, bundle) => {
        const key = bundle.authData.api_key || "";
        return `Rendex (${key.slice(0, 8)}...)`;
    },
};
exports.default = authentication;
//# sourceMappingURL=authentication.js.map