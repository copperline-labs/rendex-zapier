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
        description: "Check on a background screenshot job and retrieve the finished image.\n\nUse this after 'Capture Screenshot (Background)'. Pass the Job ID from that step, and this action returns the status ('queued', 'processing', 'succeeded', or 'failed') plus a signed Result URL pointing at the image once it's ready.\n\nMost jobs finish in 5–30 seconds. For long pages, insert a 'Delay by Zapier' step between the Background capture and this action.",
    },
    operation: {
        inputFields: [
            {
                key: "jobId",
                label: "Job ID",
                type: "string",
                required: true,
                helpText: "The Job ID returned by 'Capture Screenshot (Background)'. Use the data picker to pull it directly from that step's output — don't paste manually.",
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