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
            choices?: undefined;
            default?: undefined;
        } | {
            key: string;
            label: string;
            type: "string";
            choices: {
                markdown: string;
                html: string;
                json: string;
            };
            default: string;
            required: boolean;
            helpText: string;
        })[];
        perform: (z: ZObject, bundle: Bundle) => Promise<{
            url: any;
            format: any;
            content: any;
            title: any;
            byline: any;
            excerpt: any;
            siteName: any;
            length: any;
        }>;
        sample: {
            url: string;
            format: string;
            content: string;
            title: string;
            byline: string;
            excerpt: string;
            siteName: string;
            length: number;
        };
    };
};
export default _default;
//# sourceMappingURL=extractText.d.ts.map