"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../constants");
const watchFields_1 = require("../fields/watchFields");
const watchBody_1 = require("../lib/watchBody");
// Start monitoring a web page. Rendex captures a baseline now and then re-checks
// on the schedule you choose, comparing each check against the baseline.
const perform = async (z, bundle) => {
    const body = (0, watchBody_1.buildWatchBody)(bundle.inputData, { includeUrl: true });
    const response = await z.request({
        method: "POST",
        url: constants_1.WATCHES_ENDPOINT,
        body,
    });
    return response.json?.data ?? response.json;
};
exports.default = {
    key: "watch_create",
    noun: "Website Watch",
    display: {
        label: "Create Website Watch",
        description: "Start monitoring a web page and get notified when it changes.",
    },
    operation: {
        inputFields: watchFields_1.CREATE_WATCH_FIELDS,
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
//# sourceMappingURL=createWatch.js.map