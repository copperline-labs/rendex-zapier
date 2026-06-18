import screenshotCapture from "./creates/screenshotCapture";
import generatePdf from "./creates/generatePdf";
import captureAsync from "./creates/captureAsync";
import submitBatch from "./creates/submitBatch";
import extractText from "./creates/extractText";
import createWatch from "./creates/createWatch";
import updateWatch from "./creates/updateWatch";
import deleteWatch from "./creates/deleteWatch";
import getJobStatus from "./searches/getJobStatus";
import getBatchStatus from "./searches/getBatchStatus";
import getWatchStatus from "./searches/getWatchStatus";
import newCompletedScreenshot from "./triggers/newCompletedScreenshot";
import listJobs from "./triggers/listJobs";
import listBatches from "./triggers/listBatches";
import watchChanged from "./triggers/watchChanged";
import listWatches from "./triggers/listWatches";
declare const _default: {
    version: any;
    platformVersion: string;
    authentication: {
        type: "custom";
        test: (z: import("zapier-platform-core").ZObject, _bundle: import("zapier-platform-core").Bundle) => Promise<{
            status: string;
        }>;
        fields: {
            key: string;
            label: string;
            type: "string";
            required: boolean;
            helpText: string;
        }[];
        connectionLabel: (_z: import("zapier-platform-core").ZObject, bundle: import("zapier-platform-core").Bundle) => string;
    };
    beforeRequest: ((request: import("zapier-platform-core").HttpRequestOptions, _z: import("zapier-platform-core").ZObject, bundle: import("zapier-platform-core").Bundle) => import("zapier-platform-core").HttpRequestOptions)[];
    afterResponse: ((response: any, z: import("zapier-platform-core").ZObject, _bundle: import("zapier-platform-core").Bundle) => Promise<any>)[];
    flags: {
        skipHttpPatch: boolean;
        cleanInputData: boolean;
    };
    triggers: {
        [newCompletedScreenshot.key]: {
            key: string;
            noun: string;
            display: {
                label: string;
                description: string;
            };
            operation: {
                type: "polling";
                perform: (z: import("zapier-platform-core").ZObject, _bundle: import("zapier-platform-core").Bundle) => Promise<{
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
        [listJobs.key]: {
            key: string;
            noun: string;
            display: {
                label: string;
                description: string;
                hidden: boolean;
            };
            operation: {
                type: "polling";
                perform: (z: import("zapier-platform-core").ZObject, _bundle: import("zapier-platform-core").Bundle) => Promise<{
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
        [listBatches.key]: {
            key: string;
            noun: string;
            display: {
                label: string;
                description: string;
                hidden: boolean;
            };
            operation: {
                type: "polling";
                perform: (z: import("zapier-platform-core").ZObject, _bundle: import("zapier-platform-core").Bundle) => Promise<{
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
        [watchChanged.key]: {
            key: string;
            noun: string;
            display: {
                label: string;
                description: string;
            };
            operation: {
                type: "polling";
                perform: (z: import("zapier-platform-core").ZObject, _bundle: import("zapier-platform-core").Bundle) => Promise<{
                    runId?: string;
                    diffScore?: number | null;
                    diffPixels?: number | null;
                    beforeUrl?: string | null;
                    afterUrl?: string | null;
                    diffOverlayUrl?: string | null;
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
                    textDiff: string;
                    completedAt: string;
                };
            };
        };
        [listWatches.key]: {
            key: string;
            noun: string;
            display: {
                label: string;
                description: string;
                hidden: boolean;
            };
            operation: {
                type: "polling";
                perform: (z: import("zapier-platform-core").ZObject, _bundle: import("zapier-platform-core").Bundle) => Promise<{
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
    };
    creates: {
        [screenshotCapture.key]: {
            key: string;
            noun: string;
            display: {
                label: string;
                description: string;
            };
            operation: {
                inputFields: ({
                    key: string;
                    label: string;
                    type: "string";
                    choices: {
                        url: string;
                        html: string;
                        markdown: string;
                    };
                    default: string;
                    required: boolean;
                    helpText: string;
                    altersDynamicFields: boolean;
                } | ((_z: import("zapier-platform-core").ZObject, bundle: import("zapier-platform-core").Bundle) => {
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
                }[]) | {
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
                } | ((_z: import("zapier-platform-core").ZObject, bundle: import("zapier-platform-core").Bundle) => ({
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
                })[]) | {
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
                    type: "string";
                    choices: {
                        desktop: string;
                        iphone_15: string;
                        iphone_se: string;
                        pixel_8: string;
                        ipad: string;
                        ipad_pro: string;
                        domcontentloaded?: undefined;
                        load?: undefined;
                        networkidle0?: undefined;
                        networkidle2?: undefined;
                    };
                    required: boolean;
                    helpText: string;
                    default?: undefined;
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
                        desktop?: undefined;
                        iphone_15?: undefined;
                        iphone_se?: undefined;
                        pixel_8?: undefined;
                        ipad?: undefined;
                        ipad_pro?: undefined;
                    };
                    default: string;
                    required: boolean;
                    helpText: string;
                } | ((_z: import("zapier-platform-core").ZObject, bundle: import("zapier-platform-core").Bundle) => {
                    key: string;
                    label: string;
                    type: "dict";
                    required: boolean;
                    helpText: string;
                }[]))[];
                perform: (z: import("zapier-platform-core").ZObject, bundle: import("zapier-platform-core").Bundle) => Promise<{
                    file: string;
                    contentType: string;
                    url: string | null;
                    format: string;
                    jobId: any;
                    status: "completed";
                    capturedAt: any;
                    message: string;
                } | {
                    file: null;
                    contentType: null;
                    url: string | null;
                    format: string;
                    jobId: any;
                    status: "still_processing";
                    capturedAt: null;
                    message: string;
                }>;
                sample: {
                    file: string;
                    contentType: string;
                    url: string;
                    format: string;
                    jobId: string;
                    status: string;
                    capturedAt: string;
                    message: string;
                };
            };
        };
        [generatePdf.key]: {
            key: string;
            noun: string;
            display: {
                label: string;
                description: string;
            };
            operation: {
                inputFields: ({
                    key: string;
                    label: string;
                    type: "string";
                    choices: {
                        url: string;
                        html: string;
                        markdown: string;
                    };
                    default: string;
                    required: boolean;
                    helpText: string;
                    altersDynamicFields: boolean;
                } | ((_z: import("zapier-platform-core").ZObject, bundle: import("zapier-platform-core").Bundle) => {
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
                }[]) | {
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
                    type: "integer";
                    default: string;
                    required: boolean;
                    helpText: string;
                    choices?: undefined;
                } | {
                    key: string;
                    label: string;
                    type: "string";
                    choices: {
                        desktop: string;
                        iphone_15: string;
                        iphone_se: string;
                        pixel_8: string;
                        ipad: string;
                        ipad_pro: string;
                        domcontentloaded?: undefined;
                        load?: undefined;
                        networkidle0?: undefined;
                        networkidle2?: undefined;
                    };
                    required: boolean;
                    helpText: string;
                    default?: undefined;
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
                        desktop?: undefined;
                        iphone_15?: undefined;
                        iphone_se?: undefined;
                        pixel_8?: undefined;
                        ipad?: undefined;
                        ipad_pro?: undefined;
                    };
                    default: string;
                    required: boolean;
                    helpText: string;
                } | ((_z: import("zapier-platform-core").ZObject, bundle: import("zapier-platform-core").Bundle) => {
                    key: string;
                    label: string;
                    type: "dict";
                    required: boolean;
                    helpText: string;
                }[]))[];
                perform: (z: import("zapier-platform-core").ZObject, bundle: import("zapier-platform-core").Bundle) => Promise<{
                    file: string;
                    contentType: string;
                    url: string | null;
                    format: "pdf";
                    jobId: any;
                    status: "completed";
                    capturedAt: any;
                    message: string;
                } | {
                    file: null;
                    contentType: null;
                    url: string | null;
                    format: "pdf";
                    jobId: any;
                    status: "still_processing";
                    capturedAt: null;
                    message: string;
                }>;
                sample: {
                    file: string;
                    contentType: string;
                    url: string;
                    format: string;
                    jobId: string;
                    status: string;
                    capturedAt: string;
                    message: string;
                };
            };
        };
        [captureAsync.key]: {
            key: string;
            noun: string;
            display: {
                label: string;
                description: string;
            };
            operation: {
                inputFields: ({
                    key: string;
                    label: string;
                    type: "string";
                    choices: {
                        url: string;
                        html: string;
                        markdown: string;
                    };
                    default: string;
                    required: boolean;
                    helpText: string;
                    altersDynamicFields: boolean;
                } | ((_z: import("zapier-platform-core").ZObject, bundle: import("zapier-platform-core").Bundle) => {
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
                }[]) | {
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
                } | ((_z: import("zapier-platform-core").ZObject, bundle: import("zapier-platform-core").Bundle) => ({
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
                })[]) | {
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
                    default?: undefined;
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
                        desktop?: undefined;
                        iphone_15?: undefined;
                        iphone_se?: undefined;
                        pixel_8?: undefined;
                        ipad?: undefined;
                        ipad_pro?: undefined;
                    };
                    default: string;
                    required: boolean;
                    helpText: string;
                } | ((_z: import("zapier-platform-core").ZObject, bundle: import("zapier-platform-core").Bundle) => {
                    key: string;
                    label: string;
                    type: "dict";
                    required: boolean;
                    helpText: string;
                }[]) | {
                    key: string;
                    label: string;
                    type: "string";
                    required: boolean;
                    helpText: string;
                    default?: undefined;
                } | {
                    key: string;
                    label: string;
                    type: "integer";
                    default: string;
                    required: boolean;
                    helpText: string;
                })[];
                perform: (z: import("zapier-platform-core").ZObject, bundle: import("zapier-platform-core").Bundle) => Promise<{
                    jobId: any;
                    status: any;
                    webhookUrl: any;
                    estimatedCompletionMs: any;
                    message: string;
                }>;
                sample: {
                    jobId: string;
                    status: string;
                    webhookUrl: null;
                    estimatedCompletionMs: number;
                    message: string;
                };
            };
        };
        [submitBatch.key]: {
            key: string;
            noun: string;
            display: {
                label: string;
                description: string;
            };
            operation: {
                inputFields: ({
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
                    type: "string";
                    choices: {
                        desktop: string;
                        iphone_15: string;
                        iphone_se: string;
                        pixel_8: string;
                        ipad: string;
                        ipad_pro: string;
                        domcontentloaded?: undefined;
                        load?: undefined;
                        networkidle0?: undefined;
                        networkidle2?: undefined;
                    };
                    required: boolean;
                    helpText: string;
                    default?: undefined;
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
                        desktop?: undefined;
                        iphone_15?: undefined;
                        iphone_se?: undefined;
                        pixel_8?: undefined;
                        ipad?: undefined;
                        ipad_pro?: undefined;
                    };
                    default: string;
                    required: boolean;
                    helpText: string;
                } | ((_z: import("zapier-platform-core").ZObject, bundle: import("zapier-platform-core").Bundle) => ({
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
                })[]) | {
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
                })[];
                perform: (z: import("zapier-platform-core").ZObject, bundle: import("zapier-platform-core").Bundle) => Promise<{
                    batchId: any;
                    status: any;
                    totalJobs: any;
                    message: string;
                }>;
                sample: {
                    batchId: string;
                    status: string;
                    totalJobs: number;
                    message: string;
                };
            };
        };
        [extractText.key]: {
            key: string;
            noun: string;
            display: {
                label: string;
                description: string;
            };
            operation: {
                inputFields: ({
                    key: string;
                    label: string;
                    type: "string";
                    required: boolean;
                    helpText: string;
                    choices?: undefined;
                    default?: undefined;
                } | {
                    key: string;
                    label: string;
                    type: "string";
                    choices: {
                        markdown: string;
                        html: string;
                        json: string;
                    };
                    default: string;
                    required: boolean;
                    helpText: string;
                })[];
                perform: (z: import("zapier-platform-core").ZObject, bundle: import("zapier-platform-core").Bundle) => Promise<{
                    url: any;
                    format: any;
                    content: any;
                    title: any;
                    byline: any;
                    excerpt: any;
                    siteName: any;
                    length: any;
                }>;
                sample: {
                    url: string;
                    format: string;
                    content: string;
                    title: string;
                    byline: string;
                    excerpt: string;
                    siteName: string;
                    length: number;
                };
            };
        };
        [createWatch.key]: {
            key: string;
            noun: string;
            display: {
                label: string;
                description: string;
            };
            operation: {
                inputFields: ({
                    key: string;
                    label: string;
                    type: "string";
                    required: boolean;
                    helpText: string;
                } | {
                    key: string;
                    label: string;
                    type: "text";
                    required: boolean;
                    helpText: string;
                } | {
                    key: string;
                    label: string;
                    type: "integer";
                    required: boolean;
                    helpText: string;
                } | {
                    key: string;
                    label: string;
                    type: "boolean";
                    required: boolean;
                    helpText: string;
                })[];
                perform: (z: import("zapier-platform-core").ZObject, bundle: import("zapier-platform-core").Bundle) => Promise<any>;
                sample: {
                    id: string;
                    url: string;
                    name: string;
                    intervalMinutes: number;
                    diffMode: string;
                    status: string;
                    nextRunAt: string;
                    createdAt: string;
                };
            };
        };
        [updateWatch.key]: {
            key: string;
            noun: string;
            display: {
                label: string;
                description: string;
            };
            operation: {
                inputFields: ({
                    key: string;
                    label: string;
                    type: "string";
                    required: boolean;
                    helpText: string;
                } | {
                    key: string;
                    label: string;
                    type: "text";
                    required: boolean;
                    helpText: string;
                } | {
                    key: string;
                    label: string;
                    type: "integer";
                    required: boolean;
                    helpText: string;
                } | {
                    key: string;
                    label: string;
                    type: "boolean";
                    required: boolean;
                    helpText: string;
                } | {
                    key: string;
                    label: string;
                    type: "string";
                    required: boolean;
                    dynamic: string;
                    helpText: string;
                })[];
                perform: (z: import("zapier-platform-core").ZObject, bundle: import("zapier-platform-core").Bundle) => Promise<any>;
                sample: {
                    id: string;
                    url: string;
                    name: string;
                    intervalMinutes: number;
                    diffMode: string;
                    status: string;
                    updatedAt: string;
                };
            };
        };
        [deleteWatch.key]: {
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
                    dynamic: string;
                    helpText: string;
                }[];
                perform: (z: import("zapier-platform-core").ZObject, bundle: import("zapier-platform-core").Bundle) => Promise<{
                    deleted: boolean;
                    id: string;
                }>;
                sample: {
                    deleted: boolean;
                    id: string;
                };
            };
        };
    };
    searches: {
        [getJobStatus.key]: {
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
                    dynamic: string;
                    helpText: string;
                }[];
                perform: (z: import("zapier-platform-core").ZObject, bundle: import("zapier-platform-core").Bundle) => Promise<any[]>;
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
        [getBatchStatus.key]: {
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
                    dynamic: string;
                    helpText: string;
                }[];
                perform: (z: import("zapier-platform-core").ZObject, bundle: import("zapier-platform-core").Bundle) => Promise<any[]>;
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
        [getWatchStatus.key]: {
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
                    dynamic: string;
                    helpText: string;
                }[];
                perform: (z: import("zapier-platform-core").ZObject, bundle: import("zapier-platform-core").Bundle) => Promise<any[]>;
                sample: {
                    id: string;
                    url: string;
                    name: string;
                    status: string;
                    lastStatus: string;
                    lastChangedAt: string;
                    nextRunAt: string;
                };
            };
        };
    };
};
export default _default;
//# sourceMappingURL=index.d.ts.map