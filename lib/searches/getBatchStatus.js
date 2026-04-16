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
        description: "Check on a batch of screenshot jobs and retrieve the finished results.\n\nUse this after 'Submit Batch'. Pass the Batch ID from that step, and this action returns overall status plus the per-URL results once they're ready.\n\nBatches with many URLs can take several minutes — consider a 'Delay by Zapier' step between Submit Batch and this action, or use a Webhook URL on the batch submission to receive results automatically.",
    },
    operation: {
        inputFields: [
            {
                key: "batchId",
                label: "Batch ID",
                type: "string",
                required: true,
                helpText: "The Batch ID returned by 'Submit Batch'. Use the data picker to pull it directly from that step's output.",
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