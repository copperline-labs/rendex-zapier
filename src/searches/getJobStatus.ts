import { JOBS_ENDPOINT } from "../constants";
import type { Bundle, ZObject } from "zapier-platform-core";

const perform = async (z: ZObject, bundle: Bundle) => {
  const jobId = bundle.inputData.jobId as string;

  const response = await z.request({
    method: "GET",
    url: `${JOBS_ENDPOINT}/${jobId}`,
  });

  if (response.status === 404) {
    return [];
  }

  const data = response.json?.data ?? response.json;
  return [data];
};

export default {
  key: "get_job_status",
  noun: "Job",
  display: {
    label: "Get Job Status",
    description:
      "Look up the status and result of an async screenshot capture by job ID.",
  },
  operation: {
    inputFields: [
      {
        key: "jobId",
        label: "Job ID",
        type: "string" as const,
        required: true,
        helpText: "The job ID returned by the Capture Async action.",
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
