import type { Bundle, ZObject } from "zapier-platform-core";
declare const _default: {
    key: string;
    noun: string;
    display: {
        label: string;
        description: string;
    };
    operation: {
        inputFields: {
            key: string;
            label: string;
            type: "string";
            required: boolean;
            dynamic: string;
            helpText: string;
        }[];
        perform: (z: ZObject, bundle: Bundle) => Promise<any[]>;
        sample: {
            id: string;
            url: string;
            name: string;
            status: string;
            lastStatus: string;
            lastChangedAt: string;
            nextRunAt: string;
        };
    };
};
export default _default;
//# sourceMappingURL=getWatchStatus.d.ts.map