import { SCREENSHOT_JSON_ENDPOINT } from "../constants";
import {
  sourceTypeField,
  sourceValueFields,
  pdfFieldsArray,
  advancedFields,
} from "../fields/screenshotFields";
import { buildRequestBody } from "../lib/request";
import type { Bundle, ZObject } from "zapier-platform-core";

const perform = async (z: ZObject, bundle: Bundle) => {
  const body = buildRequestBody({ ...bundle.inputData, format: "pdf" });

  const response = await z.request({
    method: "POST",
    url: SCREENSHOT_JSON_ENDPOINT,
    body,
  });

  const data = response.json?.data ?? response.json;
  const image = data.image;
  const filename = `rendex-${Date.now()}.pdf`;

  const buffer = Buffer.from(image, "base64");
  const file = await z.stashFile(buffer, buffer.length, filename, "application/pdf");

  return {
    file,
    contentType: "application/pdf",
    url: data.url,
    width: data.width,
    height: data.height,
    format: "pdf",
    bytesSize: data.bytesSize,
    capturedAt: data.capturedAt,
    quality: data.quality,
    loadTimeMs: data.loadTimeMs,
  };
};

export default {
  key: "generate_pdf",
  noun: "PDF",
  display: {
    label: "Generate PDF",
    description:
      "Generate a PDF document from a webpage or HTML snippet and receive the file immediately in this step. Supports custom page sizes, margins, and landscape orientation.\n\nBest for: invoices, receipts, short reports, single-page documents.\n\nFor long or heavy PDFs (multi-page reports, full-length articles, complex dashboards) use 'Capture Screenshot (Background)' with Output Format = PDF — Zap steps time out after 30 seconds and large PDF renders often exceed that.",
  },
  operation: {
    inputFields: [
      sourceTypeField,
      sourceValueFields,
      ...pdfFieldsArray,
      ...advancedFields,
    ],
    perform,
    sample: {
      file: "https://example.com/document.pdf",
      contentType: "application/pdf",
      url: "https://example.com",
      width: 1280,
      height: 800,
      format: "pdf",
      bytesSize: 120000,
      capturedAt: "2026-04-15T12:00:00.000Z",
      quality: "full",
      loadTimeMs: 4200,
    },
  },
};
