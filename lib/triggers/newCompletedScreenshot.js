"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../constants");
const perform = async (z, _bundle) => {
    const response = await z.request({
        url: constants_1.JOBS_ENDPOINT,
        params: { status: "completed", limit: 10 },
    });
    const data = (response.json?.data ?? []);
    const items = Array.isArray(data) ? data : [];
    return items.map((job) => ({
        id: job.jobId,
        jobId: job.jobId,
        batchId: job.batchId,
        status: job.status,
        url: job.url,
        resultUrl: job.resultUrl,
        error: job.error,
        createdAt: job.createdAt,
        completedAt: job.completedAt,
    }));
};
exports.default = {
    key: "new_completed_screenshot",
    noun: "Screenshot",
    display: {
        label: "New Completed Screenshot",
        description: "Triggers when a background screenshot or PDF capture finishes.",
    },
    operation: {
        type: "polling",
        perform,
        sample: {
            id: "job_sample_001",
            jobId: "job_sample_001",
            batchId: null,
            status: "completed",
            url: "https://example.com",
            resultUrl: "https://api.rendex.dev/v1/images/sample.png",
            error: null,
            createdAt: "2026-04-15T12:00:00.000Z",
            completedAt: "2026-04-15T12:00:05.000Z",
        },
    },
};
//# sourceMappingURL=newCompletedScreenshot.js.map