"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../constants");
const labels_1 = require("../lib/labels");
const performList = async (z, _bundle) => {
    const response = await z.request({
        url: constants_1.JOBS_ENDPOINT,
        params: { limit: 25 },
    });
    const data = (response.json?.data ?? []);
    const items = Array.isArray(data) ? data : [];
    return items.map((job) => ({
        id: job.jobId,
        jobId: job.jobId,
        label: (0, labels_1.jobDropdownLabel)(job),
        status: job.status,
        url: job.url,
        createdAt: job.createdAt,
        completedAt: job.completedAt,
    }));
};
exports.default = {
    key: "list_jobs",
    noun: "Job",
    display: {
        label: "List Recent Jobs",
        description: "Triggers when recent jobs are fetched for a dropdown.",
        hidden: true,
    },
    operation: {
        type: "polling",
        perform: performList,
        sample: {
            id: "job_sample_001",
            jobId: "job_sample_001",
            label: "Completed · example.com · 3 min ago",
            status: "completed",
            url: "https://example.com",
            createdAt: "2026-04-15T12:00:00.000Z",
            completedAt: "2026-04-15T12:00:05.000Z",
        },
    },
};
//# sourceMappingURL=listJobs.js.map