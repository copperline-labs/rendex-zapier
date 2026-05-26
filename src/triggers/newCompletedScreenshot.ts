import type { Bundle, ZObject } from "zapier-platform-core";
import { JOBS_ENDPOINT } from "../constants";

// Polling trigger — Zapier calls perform() on a schedule (every 1–15 min
// depending on the user's Zapier plan tier) and fires Zaps for each item
// whose `id` hasn't been seen before. Pattern used by Airtable, Google
// Sheets, Notion, and most modern action-oriented APIs.
//
// Replaces the v1.0.6–1.0.16 REST Hook trigger `new_screenshot_ready`,
// which inverted Zapier's trigger→action direction and forced users into
// a chicken-and-egg URL-paste flow that wasn't compatible with how Zapier
// users think. No backend state needed — Zapier handles dedupe natively
// by tracking item ids.

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

const perform = async (z: ZObject, _bundle: Bundle) => {
  const response = await z.request({
    url: JOBS_ENDPOINT,
    params: { status: "completed", limit: 10 },
  });
  const data = (response.json?.data ?? []) as RawJob[];
  const items = Array.isArray(data) ? data : [];
  return items.map((job) => ({
    id: job.jobId,
    jobId: job.jobId,
    batchId: job.batchId,
    status: job.status,
    url: job.url,
    resultUrl: job.resultUrl,
    error: job.error,
    createdAt: job.createdAt,
    completedAt: job.completedAt,
  }));
};

export default {
  key: "new_completed_screenshot",
  noun: "Screenshot",
  display: {
    label: "New Completed Screenshot",
    description: "Triggers when a background screenshot or PDF capture finishes.",
  },
  operation: {
    type: "polling" as const,
    perform,
    sample: {
      id: "job_sample_001",
      jobId: "job_sample_001",
      batchId: null,
      status: "completed",
      url: "https://example.com",
      resultUrl: "https://api.rendex.dev/v1/images/sample.png",
      error: null,
      createdAt: "2026-04-15T12:00:00.000Z",
      completedAt: "2026-04-15T12:00:05.000Z",
    },
  },
};
