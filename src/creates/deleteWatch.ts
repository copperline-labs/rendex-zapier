import type { Bundle, ZObject } from "zapier-platform-core";
import { WATCHES_ENDPOINT } from "../constants";

// Stop and remove a watch you no longer need, along with its history.

const perform = async (z: ZObject, bundle: Bundle) => {
  const watchId = String(bundle.inputData.watchId ?? "").trim();
  await z.request({
    method: "DELETE",
    url: `${WATCHES_ENDPOINT}/${watchId}`,
  });
  return { deleted: true, id: watchId };
};

export default {
  key: "watch_delete",
  noun: "Website Watch",
  display: {
    label: "Delete Website Watch",
    description: "Stop monitoring a web page and remove the watch.",
  },
  operation: {
    inputFields: [
      {
        key: "watchId",
        label: "Watch",
        type: "string" as const,
        required: true,
        dynamic: "watchList.id.label",
        helpText: "Pick the watch to delete, or map a Watch ID from an earlier step.",
      },
    ],
    perform,
    sample: { deleted: true, id: "11111111-2222-3333-4444-555555555555" },
  },
};
