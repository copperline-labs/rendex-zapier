import type { Bundle, ZObject } from "zapier-platform-core";
declare const sourceTypeField: {
    key: string;
    label: string;
    type: "string";
    choices: {
        url: string;
        html: string;
    };
    default: string;
    required: boolean;
    helpText: string;
    altersDynamicFields: boolean;
};
declare const sourceValueFields: (_z: ZObject, bundle: Bundle) => {
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
}[];
declare const formatField: {
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
};
declare const pdfFieldsArray: ({
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
})[];
declare const pdfDynamicFields: (_z: ZObject, bundle: Bundle) => ({
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
})[];
export { sourceTypeField, sourceValueFields, formatField, pdfFieldsArray, pdfDynamicFields, advancedFields, };
//# sourceMappingURL=screenshotFields.d.ts.map