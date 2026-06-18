"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../constants");
// Look up one watch by ID — its current status, last change, and next check.
const perform = async (z, bundle) => {
    const watchId = String(bundle.inputData.watchId ?? "").trim();
    const response = await z.request({
        method: "GET",
        url: `${constants_1.WATCHES_ENDPOINT}/${watchId}`,
    });
    if (response.status === 404) {
        return [];
    }
    const data = response.json?.data ?? response.json;
    return [data];
};
exports.default = {
    key: "watch_find",
    noun: "Website Watch",
    display: {
        label: "Find Website Watch",
        description: "Finds a watch by ID and returns its current status and details.",
    },
    operation: {
        inputFields: [
            {
                key: "watchId",
                label: "Watch",
                type: "string",
                required: true,
                dynamic: "watchList.id.label",
                helpText: "Pick the watch to look up, or map a Watch ID from an earlier step.",
            },
        ],
        perform,
        sample: {
            id: "11111111-2222-3333-4444-555555555555",
            url: "https://example.com/pricing",
            name: "Competitor pricing",
            status: "active",
            lastStatus: "unchanged",
            lastChangedAt: "2026-06-16T12:00:00.000Z",
            nextRunAt: "2026-06-17T12:00:00.000Z",
        },
    },
};
//# sourceMappingURL=getWatchStatus.js.map