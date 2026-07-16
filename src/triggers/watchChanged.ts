import type { Bundle, ZObject } from "zapier-platform-core";
import { WATCHES_ENDPOINT } from "../constants";

// Polling trigger — Zapier calls perform() on a schedule and starts a Zap for
// each NEW change. A watch's `lastChangedAt` updates every time its page changes,
// so we key each event on `watchId:lastChangedAt` — that makes every distinct
// change a brand-new item Zapier will fire once. (Prefer instant alerts? Point
// the watch's webhook at a Zapier Catch Hook instead — but this needs zero setup.)

type RawWatch = {
  id: string;
  url: string | null;
  name: string | null;
  status: string | null;
  lastStatus: string | null;
  lastChangedAt: string | null;
  baselineImageUrl: string | null;
};

// A single monitoring run (serializeRun). We only read the change-detail fields —
// the run that set `lastChangedAt` is the newest one with `changed === true`.
type RawRun = {
  id: string;
  changed: boolean | null;
  diffScore: number | null;
  diffPixels: number | null;
  beforeUrl: string | null;
  afterUrl: string | null;
  diffOverlayUrl: string | null;
  cropUrl: string | null;
  changedRegion: { x: number; y: number; width: number; height: number } | null;
  textDiff: string | null;
  completedAt: string | null;
};

// The change details we lift off the latest CHANGED run and merge onto the emitted
// item, so a no-coder gets the before/after images + change magnitude in one step.
type RunEnrichment = {
  runId?: string;
  diffScore?: number | null;
  diffPixels?: number | null;
  beforeUrl?: string | null;
  afterUrl?: string | null;
  diffOverlayUrl?: string | null;
  // The tight "what changed" image (drop straight into a Slack/email step) + its
  // normalized region box.
  cropUrl?: string | null;
  changedRegion?: { x: number; y: number; width: number; height: number } | null;
  textDiff?: string | null;
  completedAt?: string | null;
};

// Cap on how many of the most-recently-changed watches we enrich per poll. Each
// enrichment is one extra runs-fetch, so we bound the fan-out: a realistic monitor
// never produces more than 25 NEW changes inside a single poll interval, and Zapier
// dedups the rest across polls (id = `${watchId}:${lastChangedAt}`), so an older
// un-enriched change has already fired on a prior poll — it isn't dropped or re-sent.
const MAX_ENRICH = 25;

const perform = async (z: ZObject, _bundle: Bundle) => {
  // Page through ALL active watches (the API caps a page at 100 by created_at DESC,
  // and an account can hold up to 1000) — a single page would silently drop the
  // oldest watches, so changes on them would never start a Zap. Follow nextCursor.
  const items: RawWatch[] = [];
  let cursor: string | undefined;
  for (let page = 0; page < 40; page++) {
    const params: Record<string, unknown> = { status: "active", limit: 100 };
    if (cursor) params.cursor = cursor;
    const response = await z.request({ url: WATCHES_ENDPOINT, params });
    const raw = response.json?.data?.items;
    if (Array.isArray(raw)) items.push(...(raw as RawWatch[]));
    cursor = response.json?.data?.nextCursor ?? undefined;
    if (!cursor) break;
  }

  // Every watch that has ever changed, newest change first.
  const changed = items
    .filter((w) => Boolean(w.lastChangedAt))
    .sort((a, b) => String(b.lastChangedAt).localeCompare(String(a.lastChangedAt)));

  // Best-effort enrich the top-N most-recently-changed watches with the details of
  // the run that set `lastChangedAt`: fetch its runs (newest-first), pick the first
  // with `changed === true`, and lift the before/after images + diff magnitude.
  // Bounded (≤ MAX_ENRICH) + parallel + per-item guarded so a failed/empty fetch
  // yields {} and the item still emits with watch-level fields only — enrichment
  // is purely additive and must never break the poll.
  const enrichments = await Promise.all(
    changed.slice(0, MAX_ENRICH).map(async (w): Promise<RunEnrichment> => {
      try {
        const res = await z.request({
          url: `${WATCHES_ENDPOINT}/${w.id}/runs`,
          params: { limit: 5 },
        });
        const runs = res.json?.data?.items as RawRun[] | undefined;
        const run = Array.isArray(runs)
          ? runs.find((r) => r?.changed === true)
          : undefined;
        if (!run) return {};
        return {
          runId: run.id,
          diffScore: run.diffScore,
          diffPixels: run.diffPixels,
          beforeUrl: run.beforeUrl,
          afterUrl: run.afterUrl,
          diffOverlayUrl: run.diffOverlayUrl,
          cropUrl: run.cropUrl,
          changedRegion: run.changedRegion,
          textDiff: run.textDiff,
          completedAt: run.completedAt,
        };
      } catch {
        return {};
      }
    }),
  );

  return changed.map((w, i) => ({
    id: `${w.id}:${w.lastChangedAt}`,
    watchId: w.id,
    url: w.url,
    name: w.name,
    changedAt: w.lastChangedAt,
    status: w.status,
    lastStatus: w.lastStatus,
    baselineImageUrl: w.baselineImageUrl,
    // Change details from the latest CHANGED run (top-N only; {} otherwise).
    ...(i < MAX_ENRICH ? enrichments[i] : {}),
  }));
};

export default {
  key: "watch_changed",
  noun: "Change",
  display: {
    label: "Website Changed",
    description: "Fires when one of your monitored web pages changes.",
  },
  operation: {
    type: "polling" as const,
    perform,
    sample: {
      id: "11111111-2222-3333-4444-555555555555:2026-06-16T12:00:00.000Z",
      watchId: "11111111-2222-3333-4444-555555555555",
      url: "https://example.com/pricing",
      name: "Competitor pricing",
      changedAt: "2026-06-16T12:00:00.000Z",
      status: "active",
      lastStatus: "changed",
      baselineImageUrl: "https://api.rendex.dev/v1/images/sample.png",
      runId: "99999999-aaaa-bbbb-cccc-dddddddddddd",
      diffScore: 0.0427,
      diffPixels: 18342,
      beforeUrl: "https://api.rendex.dev/v1/images/sample-before.png",
      afterUrl: "https://api.rendex.dev/v1/images/sample-after.png",
      diffOverlayUrl: "https://api.rendex.dev/v1/images/sample-diff.png",
      cropUrl: "https://api.rendex.dev/v1/images/sample-crop.png",
      changedRegion: { x: 0.1, y: 0.78, width: 0.32, height: 0.06 },
      textDiff: "- $19/mo\n+ $24/mo",
      completedAt: "2026-06-16T12:00:03.000Z",
    },
  },
};
