export const API_BASE = "https://api.rendex.dev";

// Dedicated auth-ping endpoint — returns 200 {ok: true} for valid keys.
// The old path `/v1/jobs/credential-check` relied on the auth middleware
// catching the request before routing, but for valid keys it fell through
// to GET /v1/jobs/:jobId with jobId="credential-check" which failed UUID
// validation with 400. Zapier's throwForStatus middleware rejects all
// non-2xx responses before `test()` runs, so the old path was broken.
export const CREDENTIAL_TEST_PATH = "/v1/credential-check";

export const SCREENSHOT_ENDPOINT = "/v1/screenshot";
export const SCREENSHOT_JSON_ENDPOINT = "/v1/screenshot/json";
export const BATCH_ENDPOINT = "/v1/screenshot/batch";
export const JOBS_ENDPOINT = "/v1/jobs";
export const BATCHES_ENDPOINT = "/v1/batches";
