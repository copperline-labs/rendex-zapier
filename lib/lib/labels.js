"use strict";
// ─── Label helpers for dynamic dropdowns ────────────────────────────
// Build human-readable labels so non-developer Zapier users can pick
// jobs/batches from a dropdown by URL + time instead of UUID.
Object.defineProperty(exports, "__esModule", { value: true });
exports.jobDropdownLabel = jobDropdownLabel;
exports.batchDropdownLabel = batchDropdownLabel;
const STATUS_LABELS = {
    queued: "Queued",
    processing: "Processing",
    completed: "Completed",
    succeeded: "Completed",
    failed: "Failed",
    partial: "Partial",
};
function statusLabel(status) {
    if (!status)
        return "Unknown";
    return STATUS_LABELS[status] ?? status.charAt(0).toUpperCase() + status.slice(1);
}
function relativeTime(iso, now = new Date()) {
    if (!iso)
        return "";
    const t = new Date(iso).getTime();
    if (!Number.isFinite(t))
        return "";
    const diffSec = Math.max(0, Math.round((now.getTime() - t) / 1000));
    if (diffSec < 60)
        return "just now";
    const diffMin = Math.round(diffSec / 60);
    if (diffMin < 60)
        return `${diffMin} min ago`;
    const diffHr = Math.round(diffMin / 60);
    if (diffHr < 24)
        return `${diffHr} hr ago`;
    const diffDay = Math.round(diffHr / 24);
    return `${diffDay} day${diffDay === 1 ? "" : "s"} ago`;
}
function urlHost(url) {
    if (!url)
        return "";
    try {
        return new URL(url).hostname;
    }
    catch {
        return url.slice(0, 40);
    }
}
function jobDropdownLabel(job) {
    const parts = [statusLabel(job.status)];
    const host = urlHost(job.url);
    if (host)
        parts.push(host);
    const rel = relativeTime(job.completedAt ?? job.createdAt);
    if (rel)
        parts.push(rel);
    return parts.join(" · ");
}
function batchDropdownLabel(batch) {
    const parts = [statusLabel(batch.status)];
    if (typeof batch.totalJobs === "number") {
        parts.push(`${batch.totalJobs} URL${batch.totalJobs === 1 ? "" : "s"}`);
    }
    const rel = relativeTime(batch.completedAt ?? batch.createdAt);
    if (rel)
        parts.push(rel);
    return parts.join(" · ");
}
//# sourceMappingURL=labels.js.map