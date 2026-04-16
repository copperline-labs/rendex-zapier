import { BATCHES_ENDPOINT } from "../constants";
import type { Bundle, ZObject } from "zapier-platform-core";

const perform = async (z: ZObject, bundle: Bundle) => {
  const batchId = bundle.inputData.batchId as string;

  const response = await z.request({
    method: "GET",
    url: `${BATCHES_ENDPOINT}/${batchId}`,
  });

  if (response.status === 404) {
    return [];
  }

  const data = response.json?.data ?? response.json;
  return [data];
};

export default {
  key: "get_batch_status",
  noun: "Batch",
  display: {
    label: "Get Batch Status",
    description:
      "Check on a batch of screenshot jobs and retrieve the finished results.\n\nUse this after 'Submit Batch'. Pass the Batch ID from that step, and this action returns overall status plus the per-URL results once they're ready.\n\nBatches with many URLs can take several minutes — consider a 'Delay by Zapier' step between Submit Batch and this action, or use a Webhook URL on the batch submission to receive results automatically.",
  },
  operation: {
    inputFields: [
      {
        key: "batchId",
        label: "Batch ID",
        type: "string" as const,
        required: true,
        helpText:
          "The Batch ID returned by 'Submit Batch'. Use the data picker to pull it directly from that step's output.",
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
