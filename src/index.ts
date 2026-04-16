import { version as platformVersion } from "zapier-platform-core";
import authentication from "./authentication";
import { addBearerToken, setBaseUrl, handleErrors } from "./middleware";

import screenshotCapture from "./creates/screenshotCapture";
import generatePdf from "./creates/generatePdf";
import captureAsync from "./creates/captureAsync";
import submitBatch from "./creates/submitBatch";

import getJobStatus from "./searches/getJobStatus";
import getBatchStatus from "./searches/getBatchStatus";

import newScreenshotReady from "./triggers/newScreenshotReady";

export default {
  version: require("../package.json").version,
  platformVersion,

  authentication,

  beforeRequest: [setBaseUrl, addBearerToken],
  afterResponse: [handleErrors],

  flags: {
    skipHttpPatch: true,
    cleanInputData: false,
  },

  triggers: {
    [newScreenshotReady.key]: newScreenshotReady,
  },

  creates: {
    [screenshotCapture.key]: screenshotCapture,
    [generatePdf.key]: generatePdf,
    [captureAsync.key]: captureAsync,
    [submitBatch.key]: submitBatch,
  },

  searches: {
    [getJobStatus.key]: getJobStatus,
    [getBatchStatus.key]: getBatchStatus,
  },
};
