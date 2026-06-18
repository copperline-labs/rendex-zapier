"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../constants");
// Check a watch right now, instead of waiting for its next scheduled check.
const perform = async (z, bundle) => {
    const watchId = String(bundle.inputData.watchId ?? "").trim();
    const response = await z.request({
        method: "POST",
        url: `${constants_1.WATCHES_ENDPOINT}/${watchId}/run`,
        body: {},
    });
    return response.json?.data ?? response.json;
};
exports.default = {
    key: "watch_run",
    noun: "Website Watch",
    display: {
        label: "Run a Check Now",
        description: "Trigger an immediate check of a watch, outside its normal schedule.",
    },
    operation: {
        inputFields: [
            {
                key: "watchId",
                label: "Watch",
                type: "string",
                required: true,
                dynamic: "watchList.id.label",
                helpText: "Pick the watch to check now, or map a Watch ID from an earlier step.",
            },
        ],
        perform,
        sample: {
            runId: "66666666-7777-8888-9999-000000000000",
            watchId: "11111111-2222-3333-4444-555555555555",
            status: "queued",
        },
    },
};
//# sourceMappingURL=runWatch.js.map