import screenshotCapture from "./creates/screenshotCapture";
import generatePdf from "./creates/generatePdf";
import captureAsync from "./creates/captureAsync";
import submitBatch from "./creates/submitBatch";
import getJobStatus from "./searches/getJobStatus";
import getBatchStatus from "./searches/getBatchStatus";
import newScreenshotReady from "./triggers/newScreenshotReady";
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
        [newScreenshotReady.key]: {
            key: string;
            noun: string;
            display: {
                label: string;
                description: string;
            };
            operation: {
                type: "hook";
                performSubscribe: (z: import("zapier-platform-core").ZObject, bundle: import("zapier-platform-core").Bundle) => Promise<{
                    targetUrl: string | undefined;
                }>;
                performUnsubscribe: (_z: import("zapier-platform-core").ZObject, _bundle: import("zapier-platform-core").Bundle) => Promise<{}>;
                perform: (z: import("zapier-platform-core").ZObject, bundle: import("zapier-platform-core").Bundle) => Promise<{
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
                performList: (_z: import("zapier-platform-core").ZObject, _bundle: import("zapier-platform-core").Bundle) => Promise<{
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
                        png?: undefined;
                        jpeg?: undefined;
                        webp?: undefined;
                        pdf?: undefined;
                    };
                    default: string;
                    required: boolean;
                    helpText: string;
                    altersDynamicFields: boolean;
                } | {
                    key: string;
                    label: string;
                    type: "string";
                    choices: {
                        png: string;
                        jpeg: string;
                        webp: string;
                        pdf: string;
                        url?: undefined;
                        html?: undefined;
                    };
                    default: string;
                    required: boolean;
                    helpText: string;
                    altersDynamicFields?: undefined;
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
                        A3: string;
                        A4: string;
                        Legal: string;
                        Letter: string;
                        Tabloid: string;
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
                    type: "number";
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
                        A3?: undefined;
                        A4?: undefined;
                        Legal?: undefined;
                        Letter?: undefined;
                        Tabloid?: undefined;
                    };
                    default: string;
                    required: boolean;
                    helpText: string;
                })[];
                perform: (z: import("zapier-platform-core").ZObject, bundle: import("zapier-platform-core").Bundle) => Promise<{
                    file: string;
                    contentType: any;
                    url: any;
                    width: any;
                    height: any;
                    format: any;
                    bytesSize: any;
                    capturedAt: any;
                    quality: any;
                    loadTimeMs: any;
                }>;
                sample: {
                    file: string;
                    contentType: string;
                    url: string;
                    width: number;
                    height: number;
                    format: string;
                    bytesSize: number;
                    capturedAt: string;
                    quality: string;
                    loadTimeMs: number;
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
                        png?: undefined;
                        jpeg?: undefined;
                        webp?: undefined;
                        pdf?: undefined;
                    };
                    default: string;
                    required: boolean;
                    helpText: string;
                    altersDynamicFields: boolean;
                } | {
                    key: string;
                    label: string;
                    type: "string";
                    choices: {
                        png: string;
                        jpeg: string;
                        webp: string;
                        pdf: string;
                        url?: undefined;
                        html?: undefined;
                    };
                    default: string;
                    required: boolean;
                    helpText: string;
                    altersDynamicFields?: undefined;
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
                        A3: string;
                        A4: string;
                        Legal: string;
                        Letter: string;
                        Tabloid: string;
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
                    type: "number";
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
                        A3?: undefined;
                        A4?: undefined;
                        Legal?: undefined;
                        Letter?: undefined;
                        Tabloid?: undefined;
                    };
                    default: string;
                    required: boolean;
                    helpText: string;
                })[];
                perform: (z: import("zapier-platform-core").ZObject, bundle: import("zapier-platform-core").Bundle) => Promise<{
                    file: string;
                    contentType: string;
                    url: any;
                    width: any;
                    height: any;
                    format: string;
                    bytesSize: any;
                    capturedAt: any;
                    quality: any;
                    loadTimeMs: any;
                }>;
                sample: {
                    file: string;
                    contentType: string;
                    url: string;
                    width: number;
                    height: number;
                    format: string;
                    bytesSize: number;
                    capturedAt: string;
                    quality: string;
                    loadTimeMs: number;
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
                        png?: undefined;
                        jpeg?: undefined;
                        webp?: undefined;
                        pdf?: undefined;
                    };
                    default: string;
                    required: boolean;
                    helpText: string;
                    altersDynamicFields: boolean;
                } | {
                    key: string;
                    label: string;
                    type: "string";
                    choices: {
                        png: string;
                        jpeg: string;
                        webp: string;
                        pdf: string;
                        url?: undefined;
                        html?: undefined;
                    };
                    default: string;
                    required: boolean;
                    helpText: string;
                    altersDynamicFields?: undefined;
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
                    default?: undefined;
                    choices?: undefined;
                } | {
                    key: string;
                    label: string;
                    type: "number";
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
                        A3?: undefined;
                        A4?: undefined;
                        Legal?: undefined;
                        Letter?: undefined;
                        Tabloid?: undefined;
                    };
                    default: string;
                    required: boolean;
                    helpText: string;
                } | {
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
                        A3: string;
                        A4: string;
                        Legal: string;
                        Letter: string;
                        Tabloid: string;
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
                    type: "number";
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
                        A3?: undefined;
                        A4?: undefined;
                        Legal?: undefined;
                        Letter?: undefined;
                        Tabloid?: undefined;
                    };
                    default: string;
                    required: boolean;
                    helpText: string;
                } | {
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
    };
};
export default _default;
//# sourceMappingURL=index.d.ts.map