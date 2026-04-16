"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../constants");
const perform = async (z, bundle) => {
    const jobId = bundle.inputData.jobId;
    const response = await z.request({
        method: "GET",
        url: `${constants_1.JOBS_ENDPOINT}/${jobId}`,
    });
    if (response.status === 404) {
        return [];
    }
    const data = response.json?.data ?? response.json;
    return [data];
};
exports.default = {
    key: "get_job_status",
    noun: "Job",
    display: {
        label: "Get Job Status",
        description: "Look up the status and result of an async screenshot capture by job ID.",
    },
    operation: {
        inputFields: [
            {
                key: "jobId",
                label: "Job ID",
                type: "string",
                required: true,
                helpText: "The job ID returned by the Capture Async action.",
            },
        ],
        perform,
        sample: {
            jobId: "job_abc123def456",
            status: "completed",
            url: "https://example.com",
            format: "png",
            imageUrl: "https://api.rendex.dev/v1/images/abc123",
            bytesSize: 65982,
            capturedAt: "2026-04-15T12:00:00.000Z",
            completedAt: "2026-04-15T12:00:05.000Z",
        },
    },
};
//# sourceMappingURL=getJobStatus.js.map