import type { Bundle, ZObject } from "zapier-platform-core";
declare const _default: {
    key: string;
    noun: string;
    display: {
        label: string;
        description: string;
    };
    operation: {
        inputFields: {
            key: string;
            label: string;
            type: "string";
            required: boolean;
            helpText: string;
        }[];
        perform: (z: ZObject, bundle: Bundle) => Promise<any[]>;
        sample: {
            batchId: string;
            status: string;
            totalJobs: number;
            completedJobs: number;
            failedJobs: number;
            jobs: never[];
        };
    };
};
export default _default;
//# sourceMappingURL=getBatchStatus.d.ts.map