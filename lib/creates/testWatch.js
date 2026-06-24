"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../constants");
const watchFields_1 = require("../fields/watchFields");
const watchBody_1 = require("../lib/watchBody");
// Try out a watch on a page once, right now, without actually creating it. Rendex
// captures the page a single time and tells you whether it could read it and what
// it saw — so you can check the page works (and your settings are right) before you
// start monitoring it. Nothing is saved and no alerts are set up.
const perform = async (z, bundle) => {
    const body = (0, watchBody_1.buildWatchBody)(bundle.inputData, { includeUrl: true });
    const response = await z.request({
        method: "POST",
        url: constants_1.WATCHES_TEST_ENDPOINT,
        body,
    });
    return response.json?.data ?? response.json;
};
exports.default = {
    key: "watch_test",
    noun: "Website Watch",
    display: {
        label: "Test a Website Watch",
        description: "Try out a watch on a page once, without creating it — check the page can be read and see what Rendex captures before you start monitoring.",
    },
    operation: {
        inputFields: watchFields_1.TEST_WATCH_FIELDS,
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
//# sourceMappingURL=testWatch.js.map