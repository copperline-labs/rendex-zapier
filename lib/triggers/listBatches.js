"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../constants");
const labels_1 = require("../lib/labels");
const performList = async (z, _bundle) => {
    const response = await z.request({
        url: constants_1.BATCHES_ENDPOINT,
        params: { limit: 25 },
    });
    const data = (response.json?.data ?? []);
    const items = Array.isArray(data) ? data : [];
    return items.map((batch) => ({
        id: batch.batchId,
        batchId: batch.batchId,
        label: (0, labels_1.batchDropdownLabel)(batch),
        status: batch.status,
        totalJobs: batch.totalJobs,
        completedJobs: batch.completedJobs,
        failedJobs: batch.failedJobs,
        createdAt: batch.createdAt,
        completedAt: batch.completedAt,
    }));
};
exports.default = {
    key: "list_batches",
    noun: "Batch",
    display: {
        label: "List Recent Batches",
        description: "Triggers when recent batches are fetched for a dropdown.",
        hidden: true,
    },
    operation: {
        type: "polling",
        perform: performList,
        sample: {
            id: "batch_sample_001",
            batchId: "batch_sample_001",
            label: "Completed · 25 URLs · 10 min ago",
            status: "completed",
            totalJobs: 25,
            completedJobs: 25,
            failedJobs: 0,
            createdAt: "2026-04-15T12:00:00.000Z",
            completedAt: "2026-04-15T12:02:30.000Z",
        },
    },
};
//# sourceMappingURL=listBatches.js.map