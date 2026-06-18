export interface BuildWatchBodyOptions {
    /** Include `url` in the body (true for create; for update only when the user changed it). */
    includeUrl?: boolean;
    /**
     * Allow the "-"/"none" sentinel on notifyEmail/webhookUrl to emit `null`,
     * clearing that alert channel. Update-only — CreateWatchSchema does not accept
     * null for these, so this stays false on create.
     */
    allowClear?: boolean;
}
export declare function buildWatchBody(input: Record<string, unknown>, options?: BuildWatchBodyOptions): Record<string, unknown>;
//# sourceMappingURL=watchBody.d.ts.map