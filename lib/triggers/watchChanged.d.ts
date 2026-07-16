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
            runId?: string;
            diffScore?: number | null;
            diffPixels?: number | null;
            beforeUrl?: string | null;
            afterUrl?: string | null;
            diffOverlayUrl?: string | null;
            cropUrl?: string | null;
            changedRegion?: {
                x: number;
                y: number;
                width: number;
                height: number;
            } | null;
            textDiff?: string | null;
            completedAt?: string | null;
            id: string;
            watchId: string;
            url: string | null;
            name: string | null;
            changedAt: string | null;
            status: string | null;
            lastStatus: string | null;
            baselineImageUrl: string | null;
        }[]>;
        sample: {
            id: string;
            watchId: string;
            url: string;
            name: string;
            changedAt: string;
            status: string;
            lastStatus: string;
            baselineImageUrl: string;
            runId: string;
            diffScore: number;
            diffPixels: number;
            beforeUrl: string;
            afterUrl: string;
            diffOverlayUrl: string;
            cropUrl: string;
            changedRegion: {
                x: number;
                y: number;
                width: number;
                height: number;
            };
            textDiff: string;
            completedAt: string;
        };
    };
};
export default _default;
//# sourceMappingURL=watchChanged.d.ts.map