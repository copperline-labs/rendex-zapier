import type { Bundle, ZObject } from "zapier-platform-core";
declare const _default: {
    key: string;
    noun: string;
    display: {
        label: string;
        description: string;
    };
    operation: {
        type: "polling";
        perform: (z: ZObject, _bundle: Bundle) => Promise<{
            id: string;
            jobId: string;
            batchId: string | null;
            status: string;
            url: string | null;
            resultUrl: string | null;
            error: string | null;
            createdAt: string;
            completedAt: string | null;
        }[]>;
        sample: {
            id: string;
            jobId: string;
            batchId: null;
            status: string;
            url: string;
            resultUrl: string;
            error: null;
            createdAt: string;
            completedAt: string;
        };
    };
};
export default _default;
//# sourceMappingURL=newCompletedScreenshot.d.ts.map