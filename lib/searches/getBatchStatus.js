"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../constants");
const perform = async (z, bundle) => {
    const batchId = bundle.inputData.batchId;
    const response = await z.request({
        method: "GET",
        url: `${constants_1.BATCHES_ENDPOINT}/${batchId}`,
    });
    if (response.status === 404) {
        return [];
    }
    const data = response.json?.data ?? response.json;
    return [data];
};
exports.default = {
    key: "get_batch_status",
    noun: "Batch",
    display: {
        label: "Get Batch Status",
        description: "Finds a batch by ID and returns overall status and per-URL results.",
    },
    operation: {
        inputFields: [
            {
                key: "batchId",
                label: "Batch ID",
                type: "string",
                required: true,
                dynamic: "list_batches.batchId.label",
                helpText: "The Batch ID to look up. The dropdown lists your 25 most recent batches; you can also map the Batch ID from a preceding 'Submit Batch' step using Zapier's data picker.",
            },
        ],
        perform,
        sample: {
            batchId: "batch_abc123def456",
            status: "completed",
            totalJobs: 10,
            completedJobs: 10,
            failedJobs: 0,
            jobs: [],
        },
    },
};
//# sourceMappingURL=getBatchStatus.js.map