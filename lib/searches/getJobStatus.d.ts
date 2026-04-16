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
            jobId: string;
            status: string;
            url: string;
            format: string;
            imageUrl: string;
            bytesSize: number;
            capturedAt: string;
            completedAt: string;
        };
    };
};
export default _default;
//# sourceMappingURL=getJobStatus.d.ts.map