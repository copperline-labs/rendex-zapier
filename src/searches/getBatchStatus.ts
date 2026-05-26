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
    description: "Finds a batch by ID and returns overall status and per-URL results.",
  },
  operation: {
    inputFields: [
      {
        key: "batchId",
        label: "Batch ID",
        type: "string" as const,
        required: true,
        dynamic: "list_batches.batchId.label",
        helpText:
          "The Batch ID to look up. The dropdown lists your 25 most recent batches; you can also map the Batch ID from a preceding 'Submit Batch' step using Zapier's data picker.",
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
