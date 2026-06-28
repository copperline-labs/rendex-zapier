import type { Bundle, ZObject } from "zapier-platform-core";
declare const _default: {
    key: string;
    noun: string;
    display: {
        label: string;
        description: string;
    };
    operation: {
        inputFields: never[];
        perform: (z: ZObject, _bundle: Bundle) => Promise<any[]>;
        outputFields: ({
            key: string;
            label: string;
            type: "string";
        } | {
            key: string;
            label: string;
            type: "integer";
        } | {
            key: string;
            label: string;
            type: "boolean";
        } | {
            key: string;
            label: string;
            type: "datetime";
        })[];
        sample: {
            plan: string;
            usage: {
                used: number;
                limit: number;
                remaining: number;
                unlimited: boolean;
                resetsAt: string;
            };
            rateLimitPerMinute: number;
            upgrade: {
                recommendedPlan: string;
                recommendedPlanCredits: number;
                upgradeUrl: string;
                manageBillingUrl: string;
            };
        };
    };
};
export default _default;
//# sourceMappingURL=getAccount.d.ts.map