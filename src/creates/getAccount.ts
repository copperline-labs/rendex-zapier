import { ACCOUNT_ENDPOINT } from "../constants";
import type { Bundle, ZObject } from "zapier-platform-core";

// Read-only, zero-credit account summary (GET /v1/account). Returns the
// connected key's plan, this month's usage (used / limit / remaining + reset
// date), the per-minute rate limit, and the recommended upgrade. The endpoint
// never decrements credits, so looking up usage is always free. Takes no
// inputs — it always describes the currently connected Rendex account.
//
// Nested response fields surface in the Zap editor with `__` (e.g. the
// `usage.remaining` value is referenced as `usage__remaining`), so the
// outputFields below describe the flattened shape.

const perform = async (z: ZObject, _bundle: Bundle) => {
  const response = await z.request({
    method: "GET",
    url: ACCOUNT_ENDPOINT,
  });

  const data = response.json?.data ?? response.json;
  return data;
};

export default {
  key: "get_account",
  noun: "Account",
  display: {
    label: "Get Account & Usage",
    description:
      "Looks up your connected Rendex account: your plan, this month's usage (used, limit, and remaining), the reset date, your per-minute rate limit, and the recommended upgrade. Always free — checking usage never uses credits.",
  },
  operation: {
    inputFields: [],
    perform,
    outputFields: [
      { key: "plan", label: "Plan", type: "string" as const },
      { key: "usage__used", label: "Credits Used This Month", type: "integer" as const },
      { key: "usage__limit", label: "Monthly Credit Limit", type: "integer" as const },
      { key: "usage__remaining", label: "Credits Remaining", type: "integer" as const },
      { key: "usage__unlimited", label: "Unlimited Plan", type: "boolean" as const },
      { key: "usage__resetsAt", label: "Usage Resets At", type: "datetime" as const },
      { key: "rateLimitPerMinute", label: "Rate Limit (requests per minute)", type: "integer" as const },
      { key: "upgrade__recommendedPlan", label: "Recommended Plan", type: "string" as const },
      { key: "upgrade__recommendedPlanCredits", label: "Recommended Plan Monthly Credits", type: "integer" as const },
      { key: "upgrade__upgradeUrl", label: "Upgrade URL", type: "string" as const },
      { key: "upgrade__manageBillingUrl", label: "Manage Billing URL", type: "string" as const },
    ],
    sample: {
      plan: "free",
      usage: {
        used: 24,
        limit: 500,
        remaining: 476,
        unlimited: false,
        resetsAt: "2026-07-01T00:00:00.000Z",
      },
      rateLimitPerMinute: 10,
      upgrade: {
        recommendedPlan: "starter",
        recommendedPlanCredits: 10000,
        upgradeUrl: "https://rendex.dev/pricing",
        manageBillingUrl: "https://rendex.dev/dashboard/billing",
      },
    },
  },
};
