import type { Bundle, ZObject } from "zapier-platform-core";
declare const _default: {
    key: string;
    noun: string;
    display: {
        label: string;
        description: string;
    };
    operation: {
        inputFields: ({
            key: string;
            label: string;
            type: "string";
            required: boolean;
            helpText: string;
        } | {
            key: string;
            label: string;
            type: "text";
            required: boolean;
            helpText: string;
        } | {
            key: string;
            label: string;
            type: "integer";
            required: boolean;
            helpText: string;
        } | {
            key: string;
            label: string;
            type: "boolean";
            required: boolean;
            helpText: string;
        } | {
            key: string;
            label: string;
            type: "string";
            required: boolean;
            dynamic: string;
            helpText: string;
        })[];
        perform: (z: ZObject, bundle: Bundle) => Promise<any>;
        sample: {
            id: string;
            url: string;
            name: string;
            intervalMinutes: number;
            diffMode: string;
            status: string;
            updatedAt: string;
        };
    };
};
export default _default;
//# sourceMappingURL=updateWatch.d.ts.map