import type { Bundle, ZObject } from "zapier-platform-core";
import { WATCHES_TEST_ENDPOINT } from "../constants";
import { TEST_WATCH_FIELDS } from "../fields/watchFields";
import { buildWatchBody } from "../lib/watchBody";

// Try out a watch on a page once, right now, without actually creating it. Rendex
// captures the page a single time and tells you whether it could read it and what
// it saw — so you can check the page works (and your settings are right) before you
// start monitoring it. Nothing is saved and no alerts are set up.

const perform = async (z: ZObject, bundle: Bundle) => {
  const body = buildWatchBody(bundle.inputData as Record<string, unknown>, { includeUrl: true });
  const response = await z.request({
    method: "POST",
    url: WATCHES_TEST_ENDPOINT,
    body,
  });
  return response.json?.data ?? response.json;
};

export default {
  key: "watch_test",
  noun: "Website Watch",
  display: {
    label: "Test a Website Watch",
    description:
      "Try out a watch on a page once, without creating it — check the page can be read and see what Rendex captures before you start monitoring.",
  },
  operation: {
    inputFields: TEST_WATCH_FIELDS,
    perform,
    sample: {
      ok: true,
      reachable: true,
      format: "png",
      httpStatus: 200,
      usedGeo: false,
      screenshotUrl: "https://api.rendex.dev/v1/images/abc123def456.png?sig=...",
      extractedText: null,
      capturedAt: "2026-06-16T12:00:00.000Z",
    },
  },
};
