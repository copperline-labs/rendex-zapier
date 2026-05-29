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
            type: "integer";
            default: string;
            required: boolean;
            helpText: string;
            choices?: undefined;
        } | {
            key: string;
            label: string;
            type: "string";
            choices: {
                desktop: string;
                iphone_15: string;
                iphone_se: string;
                pixel_8: string;
                ipad: string;
                ipad_pro: string;
                domcontentloaded?: undefined;
                load?: undefined;
                networkidle0?: undefined;
                networkidle2?: undefined;
            };
            required: boolean;
            helpText: string;
            default?: undefined;
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
                desktop?: undefined;
                iphone_15?: undefined;
                iphone_se?: undefined;
                pixel_8?: undefined;
                ipad?: undefined;
                ipad_pro?: undefined;
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
            format: "pdf";
            jobId: any;
            status: "completed";
            capturedAt: any;
            message: string;
        } | {
            file: null;
            contentType: null;
            url: string | null;
            format: "pdf";
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
//# sourceMappingURL=generatePdf.d.ts.map