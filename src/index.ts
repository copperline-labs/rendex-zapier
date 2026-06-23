import { version as platformVersion } from "zapier-platform-core";
import authentication from "./authentication";
import { addBearerToken, setBaseUrl, handleErrors } from "./middleware";

import screenshotCapture from "./creates/screenshotCapture";
import generatePdf from "./creates/generatePdf";
import renderLink from "./creates/renderLink";
import captureAsync from "./creates/captureAsync";
import submitBatch from "./creates/submitBatch";
import extractText from "./creates/extractText";
import createWatch from "./creates/createWatch";
import updateWatch from "./creates/updateWatch";
import deleteWatch from "./creates/deleteWatch";
import runWatch from "./creates/runWatch";

import getJobStatus from "./searches/getJobStatus";
import getBatchStatus from "./searches/getBatchStatus";
import getWatchStatus from "./searches/getWatchStatus";

import newCompletedScreenshot from "./triggers/newCompletedScreenshot";
import listJobs from "./triggers/listJobs";
import listBatches from "./triggers/listBatches";
import watchChanged from "./triggers/watchChanged";
import listWatches from "./triggers/listWatches";

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
    [newCompletedScreenshot.key]: newCompletedScreenshot,
    [listJobs.key]: listJobs,
    [listBatches.key]: listBatches,
    [watchChanged.key]: watchChanged,
    [listWatches.key]: listWatches,
  },

  creates: {
    [screenshotCapture.key]: screenshotCapture,
    [generatePdf.key]: generatePdf,
    [renderLink.key]: renderLink,
    [captureAsync.key]: captureAsync,
    [submitBatch.key]: submitBatch,
    [extractText.key]: extractText,
    [createWatch.key]: createWatch,
    [updateWatch.key]: updateWatch,
    [deleteWatch.key]: deleteWatch,
    [runWatch.key]: runWatch,
  },

  searches: {
    [getJobStatus.key]: getJobStatus,
    [getBatchStatus.key]: getBatchStatus,
    [getWatchStatus.key]: getWatchStatus,
  },
};
