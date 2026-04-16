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
        description: "Look up the status and results of a batch capture by batch ID.",
    },
    operation: {
        inputFields: [
            {
                key: "batchId",
                label: "Batch ID",
                type: "string",
                required: true,
                helpText: "The batch ID returned by the Submit Batch action.",
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