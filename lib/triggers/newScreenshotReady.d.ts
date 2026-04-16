import type { Bundle, ZObject } from "zapier-platform-core";
declare const _default: {
    key: string;
    noun: string;
    display: {
        label: string;
        description: string;
    };
    operation: {
        type: "hook";
        performSubscribe: (z: ZObject, bundle: Bundle) => Promise<{
            targetUrl: string | undefined;
        }>;
        performUnsubscribe: (_z: ZObject, _bundle: Bundle) => Promise<{}>;
        perform: (z: ZObject, bundle: Bundle) => Promise<{
            id: any;
            event: any;
            jobId: any;
            batchId: any;
            status: any;
            resultUrl: any;
            error: any;
            completedAt: any;
            totalJobs: any;
            completedJobs: any;
            failedJobs: any;
        }[]>;
        performList: (_z: ZObject, _bundle: Bundle) => Promise<{
            id: string;
            event: string;
            jobId: string;
            batchId: null;
            status: string;
            resultUrl: string;
            error: null;
            completedAt: string;
            totalJobs: null;
            completedJobs: null;
            failedJobs: null;
        }[]>;
        inputFields: {
            key: string;
            label: string;
            type: "string";
            required: boolean;
            helpText: string;
        }[];
        sample: {
            id: string;
            event: string;
            jobId: string;
            batchId: null;
            status: string;
            resultUrl: string;
            error: null;
            completedAt: string;
            totalJobs: null;
            completedJobs: null;
            failedJobs: null;
        };
    };
};
export default _default;
//# sourceMappingURL=newScreenshotReady.d.ts.map