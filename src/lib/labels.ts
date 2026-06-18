// ─── Label helpers for dynamic dropdowns ────────────────────────────
// Build human-readable labels so non-developer Zapier users can pick
// jobs/batches from a dropdown by URL + time instead of UUID.

const STATUS_LABELS: Record<string, string> = {
  queued: "Queued",
  processing: "Processing",
  completed: "Completed",
  succeeded: "Completed",
  failed: "Failed",
  partial: "Partial",
};

function statusLabel(status: string | null | undefined): string {
  if (!status) return "Unknown";
  return STATUS_LABELS[status] ?? status.charAt(0).toUpperCase() + status.slice(1);
}

function relativeTime(iso: string | null | undefined, now: Date = new Date()): string {
  if (!iso) return "";
  const t = new Date(iso).getTime();
  if (!Number.isFinite(t)) return "";
  const diffSec = Math.max(0, Math.round((now.getTime() - t) / 1000));
  if (diffSec < 60) return "just now";
  const diffMin = Math.round(diffSec / 60);
  if (diffMin < 60) return `${diffMin} min ago`;
  const diffHr = Math.round(diffMin / 60);
  if (diffHr < 24) return `${diffHr} hr ago`;
  const diffDay = Math.round(diffHr / 24);
  return `${diffDay} day${diffDay === 1 ? "" : "s"} ago`;
}

function urlHost(url: string | null | undefined): string {
  if (!url) return "";
  try {
    return new URL(url).hostname;
  } catch {
    return url.slice(0, 40);
  }
}

export function jobDropdownLabel(job: {
  status?: string | null;
  url?: string | null;
  createdAt?: string | null;
  completedAt?: string | null;
}): string {
  const parts = [statusLabel(job.status)];
  const host = urlHost(job.url);
  if (host) parts.push(host);
  const rel = relativeTime(job.completedAt ?? job.createdAt);
  if (rel) parts.push(rel);
  return parts.join(" · ");
}

export function watchDropdownLabel(watch: {
  name?: string | null;
  url?: string | null;
  status?: string | null;
}): string {
  const title = watch.name?.trim() || urlHost(watch.url) || "Untitled watch";
  const state = watch.status === "paused" ? "Paused" : "Active";
  return `${title} · ${state}`;
}

export function batchDropdownLabel(batch: {
  status?: string | null;
  totalJobs?: number | null;
  createdAt?: string | null;
  completedAt?: string | null;
}): string {
  const parts = [statusLabel(batch.status)];
  if (typeof batch.totalJobs === "number") {
    parts.push(`${batch.totalJobs} URL${batch.totalJobs === 1 ? "" : "s"}`);
  }
  const rel = relativeTime(batch.completedAt ?? batch.createdAt);
  if (rel) parts.push(rel);
  return parts.join(" · ");
}
