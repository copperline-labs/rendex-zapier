import { SCREENSHOT_ENDPOINT, JOBS_ENDPOINT } from "../constants";
import {
  sourceTypeField,
  sourceValueFields,
  formatField,
  pdfDynamicFields,
  advancedFields,
} from "../fields/screenshotFields";
import { buildRequestBody } from "../lib/request";
import type { Bundle, ZObject } from "zapier-platform-core";

// Async-with-polling pattern. Cloudflare Browser Rendering has a cold-start
// penalty (first hit after idle can take 10-25s just to start the browser
// session) that sometimes pushes synchronous captures past Zapier's 30s
// action timeout. Submitting async is instant (~200ms), so we get well
// inside the budget regardless of render latency. Polling then retrieves
// the result once the worker finishes.
//
// Poll budget: 12 tries × 2s = 24s, leaving ~6s headroom for the initial
// submit + final image fetch inside Zapier's 30s wall.

const POLL_INTERVAL_MS = 2000;
const POLL_MAX_ATTEMPTS = 12;

const CONTENT_TYPE_BY_FORMAT: Record<string, string> = {
  png: "image/png",
  jpeg: "image/jpeg",
  webp: "image/webp",
  pdf: "application/pdf",
};

const perform = async (z: ZObject, bundle: Bundle) => {
  const baseBody = buildRequestBody(bundle.inputData);
  const body = {
    ...baseBody,
    async: true,
    bestAttempt: baseBody.bestAttempt ?? true,
  };

  const submitResponse = await z.request({
    method: "POST",
    url: SCREENSHOT_ENDPOINT,
    body,
  });
  const submitData = submitResponse.json?.data ?? submitResponse.json;
  const jobId = submitData?.jobId;
  if (!jobId) {
    throw new z.errors.Error(
      "Rendex did not return a Job ID. Please retry or contact support.",
      "CAPTURE_FAILED",
      502,
    );
  }

  for (let attempt = 0; attempt < POLL_MAX_ATTEMPTS; attempt++) {
    await new Promise((r) => setTimeout(r, POLL_INTERVAL_MS));

    const pollResponse = await z.request({
      method: "GET",
      url: `${JOBS_ENDPOINT}/${jobId}`,
    });
    const job = pollResponse.json?.data ?? pollResponse.json;

    if (job?.status === "completed" && job.resultUrl) {
      const format = (bundle.inputData.format as string) || "png";
      const contentType = CONTENT_TYPE_BY_FORMAT[format] ?? "image/png";
      const filename = `rendex-${jobId}.${format}`;

      // Fetch the signed R2 URL with native fetch — the Zapier z.request
      // raw mode types don't expose arrayBuffer cleanly, and the signed
      // URL is public-ish (HMAC-gated by path), so no auth headers needed.
      const imageResponse = await fetch(job.resultUrl);
      const buffer = Buffer.from(await imageResponse.arrayBuffer());
      const file = await z.stashFile(buffer, buffer.length, filename, contentType);

      return {
        file,
        contentType,
        url: (bundle.inputData.url as string) || null,
        format,
        jobId,
        status: "completed" as const,
        capturedAt: job.completedAt,
        message: "Screenshot captured successfully.",
      };
    }

    if (job?.status === "failed") {
      throw new z.errors.Error(
        job.error || "Screenshot capture failed.",
        "CAPTURE_FAILED",
        502,
      );
    }
  }

  // Budget exhausted — return partial so the user can retrieve the image
  // later with Get Job Status once the render finishes server-side.
  return {
    file: null,
    contentType: null,
    url: (bundle.inputData.url as string) || null,
    format: (bundle.inputData.format as string) || "png",
    jobId,
    status: "still_processing" as const,
    capturedAt: null,
    message:
      "The capture is still working — that's normal for very large pages. Add a 'Get Job Status' step after this one and pass the Job ID above; it will fetch the finished image when ready. Next time, consider 'Capture Screenshot (Background)' for large pages like this.",
  };
};

export default {
  key: "screenshot_capture",
  noun: "Screenshot",
  display: {
    label: "Capture Screenshot",
    description: "Captures a webpage or HTML as a PNG, JPEG, WebP, or PDF file.",
  },
  operation: {
    inputFields: [
      sourceTypeField,
      sourceValueFields,
      formatField,
      pdfDynamicFields,
      ...advancedFields,
    ],
    perform,
    sample: {
      file: "https://example.com/screenshot.png",
      contentType: "image/png",
      url: "https://example.com",
      format: "png",
      jobId: "job_abc123def456",
      status: "completed",
      capturedAt: "2026-04-15T12:00:05.000Z",
      message: "Screenshot captured successfully.",
    },
  },
};
