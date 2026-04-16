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
      "Look up the status and results of a batch capture by batch ID.",
  },
  operation: {
    inputFields: [
      {
        key: "batchId",
        label: "Batch ID",
        type: "string" as const,
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
