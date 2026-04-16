declare const sourceFields: ({
    key: string;
    label: string;
    type: "string";
    choices: {
        url: string;
        html: string;
        png?: undefined;
        jpeg?: undefined;
        webp?: undefined;
        pdf?: undefined;
    };
    default: string;
    required: boolean;
    helpText: string;
    altersDynamicFields: boolean;
} | {
    key: string;
    label: string;
    type: "string";
    required: boolean;
    helpText: string;
    choices?: undefined;
    default?: undefined;
    altersDynamicFields?: undefined;
} | {
    key: string;
    label: string;
    type: "text";
    required: boolean;
    helpText: string;
    choices?: undefined;
    default?: undefined;
    altersDynamicFields?: undefined;
} | {
    key: string;
    label: string;
    type: "string";
    choices: {
        png: string;
        jpeg: string;
        webp: string;
        pdf: string;
        url?: undefined;
        html?: undefined;
    };
    default: string;
    required: boolean;
    helpText: string;
    altersDynamicFields?: undefined;
})[];
declare const advancedFields: ({
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
    type: "string";
    choices: {
        A3: string;
        A4: string;
        Legal: string;
        Letter: string;
        Tabloid: string;
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
    type: "number";
    required: boolean;
    helpText: string;
    default?: undefined;
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
        A3?: undefined;
        A4?: undefined;
        Legal?: undefined;
        Letter?: undefined;
        Tabloid?: undefined;
    };
    default: string;
    required: boolean;
    helpText: string;
})[];
export { sourceFields, advancedFields };
//# sourceMappingURL=screenshotFields.d.ts.map