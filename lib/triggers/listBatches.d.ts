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
            batchId: string;
            label: string;
            status: string;
            totalJobs: number | null;
            completedJobs: number | null;
            failedJobs: number | null;
            createdAt: string;
            completedAt: string | null;
        }[]>;
        sample: {
            id: string;
            batchId: string;
            label: string;
            status: string;
            totalJobs: number;
            completedJobs: number;
            failedJobs: number;
            createdAt: string;
            completedAt: string;
        };
    };
};
export default _default;
//# sourceMappingURL=listBatches.d.ts.map