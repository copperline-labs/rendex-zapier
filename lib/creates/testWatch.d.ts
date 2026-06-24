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
        })[];
        perform: (z: ZObject, bundle: Bundle) => Promise<any>;
        sample: {
            ok: boolean;
            reachable: boolean;
            format: string;
            httpStatus: number;
            usedGeo: boolean;
            screenshotUrl: string;
            extractedText: null;
            capturedAt: string;
        };
    };
};
export default _default;
//# sourceMappingURL=testWatch.d.ts.map