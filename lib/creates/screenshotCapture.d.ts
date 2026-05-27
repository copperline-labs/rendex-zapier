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
            choices: {
                url: string;
                html: string;
                markdown: string;
            };
            default: string;
            required: boolean;
            helpText: string;
            altersDynamicFields: boolean;
        } | ((_z: ZObject, bundle: Bundle) => {
            key: string;
            label: string;
            type: "text";
            required: boolean;
            helpText: string;
        }[] | {
            key: string;
            label: string;
            type: "string";
            required: boolean;
            helpText: string;
        }[]) | {
            key: string;
            label: string;
            type: "string";
            choices: {
                png: string;
                jpeg: string;
                webp: string;
                pdf: string;
            };
            default: string;
            required: boolean;
            helpText: string;
            altersDynamicFields: boolean;
        } | ((_z: ZObject, bundle: Bundle) => ({
            key: string;
            label: string;
            type: "string";
            choices: {
                A3: string;
                A4: string;
                Legal: string;
                Letter: string;
                Tabloid: string;
            };
            default: string;
            required: boolean;
            helpText: string;
        } | {
            key: string;
            label: string;
            type: "boolean";
            default: string;
            required: boolean;
            helpText: string;
            choices?: undefined;
        } | {
            key: string;
            label: string;
            type: "text";
            required: boolean;
            helpText: string;
            choices?: undefined;
            default?: undefined;
        } | {
            key: string;
            label: string;
            type: "number";
            required: boolean;
            helpText: string;
            choices?: undefined;
            default?: undefined;
        })[]) | {
            key: string;
            label: string;
            type: "boolean";
            default: string;
            required: boolean;
            helpText: string;
            choices?: undefined;
        } | {
            key: string;
            label: string;
            type: "string";
            required: boolean;
            helpText: string;
            default?: undefined;
            choices?: undefined;
        } | {
            key: string;
            label: string;
            type: "text";
            required: boolean;
            helpText: string;
            default?: undefined;
            choices?: undefined;
        } | {
            key: string;
            label: string;
            type: "integer";
            default: string;
            required: boolean;
            helpText: string;
            choices?: undefined;
        } | {
            key: string;
            label: string;
            type: "integer";
            required: boolean;
            helpText: string;
            default?: undefined;
            choices?: undefined;
        } | {
            key: string;
            label: string;
            type: "string";
            choices: {
                domcontentloaded: string;
                load: string;
                networkidle0: string;
                networkidle2: string;
            };
            default: string;
            required: boolean;
            helpText: string;
        } | ((_z: ZObject, bundle: Bundle) => {
            key: string;
            label: string;
            type: "dict";
            required: boolean;
            helpText: string;
        }[]))[];
        perform: (z: ZObject, bundle: Bundle) => Promise<{
            file: string;
            contentType: string;
            url: string | null;
            format: string;
            jobId: any;
            status: "completed";
            capturedAt: any;
            message: string;
        } | {
            file: null;
            contentType: null;
            url: string | null;
            format: string;
            jobId: any;
            status: "still_processing";
            capturedAt: null;
            message: string;
        }>;
        sample: {
            file: string;
            contentType: string;
            url: string;
            format: string;
            jobId: string;
            status: string;
            capturedAt: string;
            message: string;
        };
    };
};
export default _default;
//# sourceMappingURL=screenshotCapture.d.ts.map