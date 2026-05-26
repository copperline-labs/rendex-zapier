import type { Bundle, ZObject } from "zapier-platform-core";
import { BATCHES_ENDPOINT } from "../constants";
import { batchDropdownLabel } from "../lib/labels";

// Hidden trigger — backs the dynamic dropdown on Get Batch Status's
// batchId field. Returns the last 25 batches, newest first, with a
// human-readable label.

type RawBatch = {
  batchId: string;
  status: string;
  totalJobs: number | null;
  completedJobs: number | null;
  failedJobs: number | null;
  createdAt: string;
  completedAt: string | null;
};

const performList = async (z: ZObject, _bundle: Bundle) => {
  const response = await z.request({
    url: BATCHES_ENDPOINT,
    params: { limit: 25 },
  });
  const data = (response.json?.data ?? []) as RawBatch[];
  const items = Array.isArray(data) ? data : [];
  return items.map((batch) => ({
    id: batch.batchId,
    batchId: batch.batchId,
    label: batchDropdownLabel(batch),
    status: batch.status,
    totalJobs: batch.totalJobs,
    completedJobs: batch.completedJobs,
    failedJobs: batch.failedJobs,
    createdAt: batch.createdAt,
    completedAt: batch.completedAt,
  }));
};

export default {
  key: "list_batches",
  noun: "Batch",
  display: {
    label: "List Recent Batches",
    description: "Triggers when recent batches are fetched for a dropdown.",
    hidden: true,
  },
  operation: {
    type: "polling" as const,
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
