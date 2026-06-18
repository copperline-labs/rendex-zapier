"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../constants");
const watchFields_1 = require("../fields/watchFields");
const watchBody_1 = require("../lib/watchBody");
// Change a watch you already created — its schedule, what counts as a change,
// alerts, or pause/resume it. Only the fields you fill in are changed.
const perform = async (z, bundle) => {
    const watchId = String(bundle.inputData.watchId ?? "").trim();
    // The URL only changes when the user actually typed a new one.
    const includeUrl = Boolean(String(bundle.inputData.url ?? "").trim());
    const body = (0, watchBody_1.buildWatchBody)(bundle.inputData, {
        includeUrl,
        allowClear: true,
    });
    const response = await z.request({
        method: "PATCH",
        url: `${constants_1.WATCHES_ENDPOINT}/${watchId}`,
        body,
    });
    return response.json?.data ?? response.json;
};
exports.default = {
    key: "watch_update",
    noun: "Website Watch",
    display: {
        label: "Update Website Watch",
        description: "Change a watch's schedule, alerts, or settings — or pause and resume it.",
    },
    operation: {
        inputFields: [
            {
                key: "watchId",
                label: "Watch",
                type: "string",
                required: true,
                dynamic: "watchList.id.label",
                helpText: "Pick the watch to update, or map a Watch ID from an earlier step.",
            },
            ...watchFields_1.UPDATE_WATCH_FIELDS,
        ],
        perform,
        sample: {
            id: "11111111-2222-3333-4444-555555555555",
            url: "https://example.com/pricing",
            name: "Competitor pricing",
            intervalMinutes: 720,
            diffMode: "both",
            status: "paused",
            updatedAt: "2026-06-16T13:00:00.000Z",
        },
    },
};
//# sourceMappingURL=updateWatch.js.map