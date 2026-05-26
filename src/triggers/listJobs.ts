import type { Bundle, ZObject } from "zapier-platform-core";
import { JOBS_ENDPOINT } from "../constants";
import { jobDropdownLabel } from "../lib/labels";

// Hidden trigger — backs the dynamic dropdown on Get Job Status's jobId
// field. Not shown in the Zap editor's trigger picker (hidden: true).
// Returns the last 25 jobs for the authed user, newest first, with a
// human-readable label so non-developers can pick by site + time.

type RawJob = {
  jobId: string;
  batchId: string | null;
  status: string;
  url: string | null;
  resultUrl: string | null;
  error: string | null;
  createdAt: string;
  completedAt: string | null;
};

const performList = async (z: ZObject, _bundle: Bundle) => {
  const response = await z.request({
    url: JOBS_ENDPOINT,
    params: { limit: 25 },
  });
  const data = (response.json?.data ?? []) as RawJob[];
  const items = Array.isArray(data) ? data : [];
  return items.map((job) => ({
    id: job.jobId,
    jobId: job.jobId,
    label: jobDropdownLabel(job),
    status: job.status,
    url: job.url,
    createdAt: job.createdAt,
    completedAt: job.completedAt,
  }));
};

export default {
  key: "list_jobs",
  noun: "Job",
  display: {
    label: "List Recent Jobs",
    description: "Triggers when recent jobs are fetched for a dropdown.",
    hidden: true,
  },
  operation: {
    type: "polling" as const,
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
