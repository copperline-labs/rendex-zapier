import type { Bundle, ZObject } from "zapier-platform-core";
import { WATCHES_ENDPOINT } from "../constants";

// Look up one watch by ID — its current status, last change, and next check.

const perform = async (z: ZObject, bundle: Bundle) => {
  const watchId = String(bundle.inputData.watchId ?? "").trim();
  const response = await z.request({
    method: "GET",
    url: `${WATCHES_ENDPOINT}/${watchId}`,
  });

  if (response.status === 404) {
    return [];
  }

  const data = response.json?.data ?? response.json;
  return [data];
};

export default {
  key: "watch_find",
  noun: "Website Watch",
  display: {
    label: "Find Website Watch",
    description: "Finds a watch by ID and returns its current status and details.",
  },
  operation: {
    inputFields: [
      {
        key: "watchId",
        label: "Watch",
        type: "string" as const,
        required: true,
        dynamic: "watchList.id.label",
        helpText: "Pick the watch to look up, or map a Watch ID from an earlier step.",
      },
    ],
    perform,
    sample: {
      id: "11111111-2222-3333-4444-555555555555",
      url: "https://example.com/pricing",
      name: "Competitor pricing",
      status: "active",
      lastStatus: "unchanged",
      lastChangedAt: "2026-06-16T12:00:00.000Z",
      nextRunAt: "2026-06-17T12:00:00.000Z",
    },
  },
};
