"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../constants");
const labels_1 = require("../lib/labels");
const performList = async (z, _bundle) => {
    const response = await z.request({
        url: constants_1.WATCHES_ENDPOINT,
        params: { status: "all", limit: 100 },
    });
    const items = (response.json?.data?.items ?? []);
    return items.map((w) => ({
        id: w.id,
        label: (0, labels_1.watchDropdownLabel)(w),
        url: w.url,
        name: w.name,
        status: w.status,
    }));
};
exports.default = {
    key: "watchList",
    noun: "Website Watch",
    display: {
        label: "List Watches",
        description: "Lists your watches for a dropdown.",
        hidden: true,
    },
    operation: {
        type: "polling",
        perform: performList,
        sample: {
            id: "11111111-2222-3333-4444-555555555555",
            label: "Competitor pricing · Active",
            url: "https://example.com/pricing",
            name: "Competitor pricing",
            status: "active",
        },
    },
};
//# sourceMappingURL=listWatches.js.map