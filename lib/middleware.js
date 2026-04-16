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
        throw new z.errors.ExpiredAuthError("Your Rendex API key is disabled or revoked.");
    }
    if (response.status === 429) {
        const body = response.json;
        const code = body?.error?.code;
        if (code === "USAGE_EXCEEDED") {
            throw new z.errors.HaltedError("Monthly usage limit reached. Upgrade your plan at rendex.dev/dashboard.");
        }
        throw new z.errors.ThrottledError("Rate limited by Rendex. Zapier will automatically retry.", 60);
    }
    return response;
};
exports.handleErrors = handleErrors;
//# sourceMappingURL=middleware.js.map