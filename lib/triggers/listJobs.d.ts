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
            jobId: string;
            label: string;
            status: string;
            url: string | null;
            createdAt: string;
            completedAt: string | null;
        }[]>;
        sample: {
            id: string;
            jobId: string;
            label: string;
            status: string;
            url: string;
            createdAt: string;
            completedAt: string;
        };
    };
};
export default _default;
//# sourceMappingURL=listJobs.d.ts.map