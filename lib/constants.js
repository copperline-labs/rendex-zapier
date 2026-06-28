"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WATCHES_TEST_ENDPOINT = exports.WATCHES_ENDPOINT = exports.BATCHES_ENDPOINT = exports.JOBS_ENDPOINT = exports.EXTRACT_ENDPOINT = exports.BATCH_ENDPOINT = exports.ACCOUNT_ENDPOINT = exports.ARTIFACT_ENDPOINT = exports.RENDER_LINK_ENDPOINT = exports.SCREENSHOT_JSON_ENDPOINT = exports.SCREENSHOT_ENDPOINT = exports.CREDENTIAL_TEST_PATH = exports.API_BASE = void 0;
exports.API_BASE = "https://api.rendex.dev";
// Dedicated auth-ping endpoint — returns 200 {ok: true} for valid keys.
// The old path `/v1/jobs/credential-check` relied on the auth middleware
// catching the request before routing, but for valid keys it fell through
// to GET /v1/jobs/:jobId with jobId="credential-check" which failed UUID
// validation with 400. Zapier's throwForStatus middleware rejects all
// non-2xx responses before `test()` runs, so the old path was broken.
exports.CREDENTIAL_TEST_PATH = "/v1/credential-check";
exports.SCREENSHOT_ENDPOINT = "/v1/screenshot";
exports.SCREENSHOT_JSON_ENDPOINT = "/v1/screenshot/json";
exports.RENDER_LINK_ENDPOINT = "/v1/render/link";
exports.ARTIFACT_ENDPOINT = "/v1/artifact";
exports.ACCOUNT_ENDPOINT = "/v1/account";
exports.BATCH_ENDPOINT = "/v1/screenshot/batch";
exports.EXTRACT_ENDPOINT = "/v1/extract";
exports.JOBS_ENDPOINT = "/v1/jobs";
exports.BATCHES_ENDPOINT = "/v1/batches";
exports.WATCHES_ENDPOINT = "/v1/watches";
exports.WATCHES_TEST_ENDPOINT = "/v1/watches/test";
//# sourceMappingURL=constants.js.map