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
        perform: (z: ZObject, bundle: Bundle) => Promise<{
            deleted: boolean;
            id: string;
        }>;
        sample: {
            deleted: boolean;
            id: string;
        };
    };
};
export default _default;
//# sourceMappingURL=deleteWatch.d.ts.map