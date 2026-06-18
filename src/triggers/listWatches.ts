import type { Bundle, ZObject } from "zapier-platform-core";
import { WATCHES_ENDPOINT } from "../constants";
import { watchDropdownLabel } from "../lib/labels";

// Hidden trigger — backs the "Watch" dropdown on Update / Delete / Find. Not
// shown in the trigger picker. Lists the user's watches (active + paused) with a
// friendly label so non-developers can pick by name instead of an ID.

type RawWatch = {
  id: string;
  url: string | null;
  name: string | null;
  status: string | null;
};

const performList = async (z: ZObject, _bundle: Bundle) => {
  const response = await z.request({
    url: WATCHES_ENDPOINT,
    params: { status: "all", limit: 100 },
  });
  const items = (response.json?.data?.items ?? []) as RawWatch[];
  return items.map((w) => ({
    id: w.id,
    label: watchDropdownLabel(w),
    url: w.url,
    name: w.name,
    status: w.status,
  }));
};

export default {
  key: "watchList",
  noun: "Website Watch",
  display: {
    label: "List Watches",
    description: "Lists your watches for a dropdown.",
    hidden: true,
  },
  operation: {
    type: "polling" as const,
    perform: performList,
    sample: {
      id: "11111111-2222-3333-4444-555555555555",
      label: "Competitor pricing · Active",
      url: "https://example.com/pricing",
      name: "Competitor pricing",
      status: "active",
    },
  },
};
