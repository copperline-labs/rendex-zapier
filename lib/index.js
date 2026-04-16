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
const captureAsync_1 = __importDefault(require("./creates/captureAsync"));
const submitBatch_1 = __importDefault(require("./creates/submitBatch"));
const getJobStatus_1 = __importDefault(require("./searches/getJobStatus"));
const getBatchStatus_1 = __importDefault(require("./searches/getBatchStatus"));
const newScreenshotReady_1 = __importDefault(require("./triggers/newScreenshotReady"));
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
        [newScreenshotReady_1.default.key]: newScreenshotReady_1.default,
    },
    creates: {
        [screenshotCapture_1.default.key]: screenshotCapture_1.default,
        [generatePdf_1.default.key]: generatePdf_1.default,
        [captureAsync_1.default.key]: captureAsync_1.default,
        [submitBatch_1.default.key]: submitBatch_1.default,
    },
    searches: {
        [getJobStatus_1.default.key]: getJobStatus_1.default,
        [getBatchStatus_1.default.key]: getBatchStatus_1.default,
    },
};
//# sourceMappingURL=index.js.map