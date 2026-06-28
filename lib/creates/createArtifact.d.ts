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
            type: "text";
            required: boolean;
            helpText: string;
            choices?: undefined;
            default?: undefined;
            list?: undefined;
            dict?: undefined;
        } | {
            key: string;
            label: string;
            type: "string";
            choices: {
                markdown: string;
                html: string;
                pdf?: undefined;
                png?: undefined;
            };
            default: string;
            required: boolean;
            helpText: string;
            list?: undefined;
            dict?: undefined;
        } | {
            key: string;
            label: string;
            type: "string";
            list: boolean;
            choices: {
                pdf: string;
                png: string;
                markdown?: undefined;
                html?: undefined;
            };
            required: boolean;
            helpText: string;
            default?: undefined;
            dict?: undefined;
        } | {
            key: string;
            label: string;
            type: "string";
            required: boolean;
            helpText: string;
            choices?: undefined;
            default?: undefined;
            list?: undefined;
            dict?: undefined;
        } | {
            key: string;
            label: string;
            type: "integer";
            required: boolean;
            helpText: string;
            choices?: undefined;
            default?: undefined;
            list?: undefined;
            dict?: undefined;
        } | {
            key: string;
            label: string;
            dict: boolean;
            required: boolean;
            helpText: string;
            type?: undefined;
            choices?: undefined;
            default?: undefined;
            list?: undefined;
        })[];
        perform: (z: ZObject, bundle: Bundle) => Promise<{
            pdfUrl: any;
            pngUrl: any;
            shareUrl: any;
            expiresAt: any;
        }>;
        sample: {
            pdfUrl: string;
            pngUrl: string;
            shareUrl: string;
            expiresAt: string;
        };
    };
};
export default _default;
//# sourceMappingURL=createArtifact.d.ts.map