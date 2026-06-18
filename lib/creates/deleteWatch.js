"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../constants");
// Stop and remove a watch you no longer need, along with its history.
const perform = async (z, bundle) => {
    const watchId = String(bundle.inputData.watchId ?? "").trim();
    await z.request({
        method: "DELETE",
        url: `${constants_1.WATCHES_ENDPOINT}/${watchId}`,
    });
    return { deleted: true, id: watchId };
};
exports.default = {
    key: "watch_delete",
    noun: "Website Watch",
    display: {
        label: "Delete Website Watch",
        description: "Stop monitoring a web page and remove the watch.",
    },
    operation: {
        inputFields: [
            {
                key: "watchId",
                label: "Watch",
                type: "string",
                required: true,
                dynamic: "watchList.id.label",
                helpText: "Pick the watch to delete, or map a Watch ID from an earlier step.",
            },
        ],
        perform,
        sample: { deleted: true, id: "11111111-2222-3333-4444-555555555555" },
    },
};
//# sourceMappingURL=deleteWatch.js.map