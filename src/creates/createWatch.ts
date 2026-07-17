import type { Bundle, ZObject } from "zapier-platform-core";
import { WATCHES_ENDPOINT } from "../constants";
import { CREATE_WATCH_FIELDS } from "../fields/watchFields";
import { buildWatchBody } from "../lib/watchBody";

// Start monitoring a web page. Rendex captures a baseline now and then re-checks
// on the schedule you choose, comparing each check against the baseline.

const perform = async (z: ZObject, bundle: Bundle) => {
  const body = buildWatchBody(bundle.inputData as Record<string, unknown>, { includeUrl: true });
  const response = await z.request({
    method: "POST",
    url: WATCHES_ENDPOINT,
    body,
  });
  return response.json?.data ?? response.json;
};

export default {
  key: "watch_create",
  noun: "Website Watch",
  display: {
    label: "Create Website Watch",
    description: "Start monitoring a web page and get notified when it changes.",
  },
  operation: {
    inputFields: CREATE_WATCH_FIELDS,
    perform,
    sample: {
      id: "11111111-2222-3333-4444-555555555555",
      url: "https://example.com/pricing",
      name: "Competitor pricing",
      intervalMinutes: 1440,
      diffMode: "both",
      status: "active",
      nextRunAt: "2026-06-17T12:00:00.000Z",
      createdAt: "2026-06-16T12:00:00.000Z",
    },
  },
};
