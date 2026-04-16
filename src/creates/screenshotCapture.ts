import { SCREENSHOT_JSON_ENDPOINT } from "../constants";
import {
  sourceTypeField,
  sourceValueFields,
  formatField,
  pdfDynamicFields,
  advancedFields,
} from "../fields/screenshotFields";
import { buildRequestBody } from "../lib/request";
import type { Bundle, ZObject } from "zapier-platform-core";

const perform = async (z: ZObject, bundle: Bundle) => {
  const body = buildRequestBody(bundle.inputData);

  const response = await z.request({
    method: "POST",
    url: SCREENSHOT_JSON_ENDPOINT,
    body,
  });

  const data = response.json?.data ?? response.json;
  const image = data.image;
  const contentType = data.contentType || "image/png";
  const filename = `rendex-${Date.now()}.${bundle.inputData.format || "png"}`;

  const buffer = Buffer.from(image, "base64");
  const file = await z.stashFile(buffer, buffer.length, filename, contentType);

  return {
    file,
    contentType,
    url: data.url,
    width: data.width,
    height: data.height,
    format: data.format,
    bytesSize: data.bytesSize,
    capturedAt: data.capturedAt,
    quality: data.quality,
    loadTimeMs: data.loadTimeMs,
  };
};

export default {
  key: "screenshot_capture",
  noun: "Screenshot",
  display: {
    label: "Capture Screenshot",
    description:
      "Capture a screenshot of a webpage or HTML snippet. Returns a PNG, JPEG, or WebP image file synchronously. For heavy pages (full-page scrolls of news sites, e-commerce, or dashboards), use Capture Screenshot (Async) instead — Zapier's 30-second action timeout often trips on large sync captures.",
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
      width: 1280,
      height: 800,
      format: "png",
      bytesSize: 65982,
      capturedAt: "2026-04-15T12:00:00.000Z",
      quality: "full",
      loadTimeMs: 3500,
    },
  },
};
