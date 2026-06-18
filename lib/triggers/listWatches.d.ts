import type { Bundle, ZObject } from "zapier-platform-core";
declare const _default: {
    key: string;
    noun: string;
    display: {
        label: string;
        description: string;
        hidden: boolean;
    };
    operation: {
        type: "polling";
        perform: (z: ZObject, _bundle: Bundle) => Promise<{
            id: string;
            label: string;
            url: string | null;
            name: string | null;
            status: string | null;
        }[]>;
        sample: {
            id: string;
            label: string;
            url: string;
            name: string;
            status: string;
        };
    };
};
export default _default;
//# sourceMappingURL=listWatches.d.ts.map