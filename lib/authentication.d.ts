import type { Bundle, ZObject } from "zapier-platform-core";
declare const authentication: {
    type: "custom";
    test: (z: ZObject, _bundle: Bundle) => Promise<{
        status: string;
    }>;
    fields: {
        key: string;
        label: string;
        type: "string";
        required: boolean;
        helpText: string;
    }[];
    connectionLabel: (_z: ZObject, bundle: Bundle) => string;
};
export default authentication;
//# sourceMappingURL=authentication.d.ts.map