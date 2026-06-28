"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const zapier_platform_core_1 = require("zapier-platform-core");
const authentication_1 = __importDefault(require("./authentication"));
const middleware_1 = require("./middleware");
const screenshotCapture_1 = __importDefault(require("./creates/screenshotCapture"));
const generatePdf_1 = __importDefault(require("./creates/generatePdf"));
const renderLink_1 = __importDefault(require("./creates/renderLink"));
const createArtifact_1 = __importDefault(require("./creates/createArtifact"));
const captureAsync_1 = __importDefault(require("./creates/captureAsync"));
const submitBatch_1 = __importDefault(require("./creates/submitBatch"));
const extractText_1 = __importDefault(require("./creates/extractText"));
const createWatch_1 = __importDefault(require("./creates/createWatch"));
const updateWatch_1 = __importDefault(require("./creates/updateWatch"));
const deleteWatch_1 = __importDefault(require("./creates/deleteWatch"));
const runWatch_1 = __importDefault(require("./creates/runWatch"));
const testWatch_1 = __importDefault(require("./creates/testWatch"));
const getAccount_1 = __importDefault(require("./creates/getAccount"));
const getJobStatus_1 = __importDefault(require("./searches/getJobStatus"));
const getBatchStatus_1 = __importDefault(require("./searches/getBatchStatus"));
const getWatchStatus_1 = __importDefault(require("./searches/getWatchStatus"));
const newCompletedScreenshot_1 = __importDefault(require("./triggers/newCompletedScreenshot"));
const listJobs_1 = __importDefault(require("./triggers/listJobs"));
const listBatches_1 = __importDefault(require("./triggers/listBatches"));
const watchChanged_1 = __importDefault(require("./triggers/watchChanged"));
const listWatches_1 = __importDefault(require("./triggers/listWatches"));
exports.default = {
    version: require("../package.json").version,
    platformVersion: zapier_platform_core_1.version,
    authentication: authentication_1.default,
    beforeRequest: [middleware_1.setBaseUrl, middleware_1.addBearerToken],
    afterResponse: [middleware_1.handleErrors],
    flags: {
        skipHttpPatch: true,
        cleanInputData: false,
    },
    triggers: {
        [newCompletedScreenshot_1.default.key]: newCompletedScreenshot_1.default,
        [listJobs_1.default.key]: listJobs_1.default,
        [listBatches_1.default.key]: listBatches_1.default,
        [watchChanged_1.default.key]: watchChanged_1.default,
        [listWatches_1.default.key]: listWatches_1.default,
    },
    creates: {
        [screenshotCapture_1.default.key]: screenshotCapture_1.default,
        [generatePdf_1.default.key]: generatePdf_1.default,
        [renderLink_1.default.key]: renderLink_1.default,
        [createArtifact_1.default.key]: createArtifact_1.default,
        [captureAsync_1.default.key]: captureAsync_1.default,
        [submitBatch_1.default.key]: submitBatch_1.default,
        [extractText_1.default.key]: extractText_1.default,
        [createWatch_1.default.key]: createWatch_1.default,
        [updateWatch_1.default.key]: updateWatch_1.default,
        [deleteWatch_1.default.key]: deleteWatch_1.default,
        [runWatch_1.default.key]: runWatch_1.default,
        [testWatch_1.default.key]: testWatch_1.default,
        [getAccount_1.default.key]: getAccount_1.default,
    },
    searches: {
        [getJobStatus_1.default.key]: getJobStatus_1.default,
        [getBatchStatus_1.default.key]: getBatchStatus_1.default,
        [getWatchStatus_1.default.key]: getWatchStatus_1.default,
    },
};
//# sourceMappingURL=index.js.map