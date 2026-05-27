"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../constants");
const screenshotFields_1 = require("../fields/screenshotFields");
const request_1 = require("../lib/request");
// Same async-with-polling pattern as Capture Screenshot. PDF renders are
// often longer than image captures because the page has to fully paint
// before PDF export can serialize, so the cold-start risk on Cloudflare
// Browser Rendering is even higher here than for screenshots.
const POLL_INTERVAL_MS = 2000;
const POLL_MAX_ATTEMPTS = 12;
const perform = async (z, bundle) => {
    const baseBody = (0, request_1.buildRequestBody)({ ...bundle.inputData, format: "pdf" });
    const body = {
        ...baseBody,
        async: true,
        bestAttempt: baseBody.bestAttempt ?? true,
    };
    const submitResponse = await z.request({
        method: "POST",
        url: constants_1.SCREENSHOT_ENDPOINT,
        body,
    });
    const submitData = submitResponse.json?.data ?? submitResponse.json;
    const jobId = submitData?.jobId;
    if (!jobId) {
        throw new z.errors.Error("Rendex did not return a Job ID. Please retry or contact support.", "CAPTURE_FAILED", 502);
    }
    for (let attempt = 0; attempt < POLL_MAX_ATTEMPTS; attempt++) {
        await new Promise((r) => setTimeout(r, POLL_INTERVAL_MS));
        const pollResponse = await z.request({
            method: "GET",
            url: `${constants_1.JOBS_ENDPOINT}/${jobId}`,
        });
        const job = pollResponse.json?.data ?? pollResponse.json;
        if (job?.status === "completed" && job.resultUrl) {
            const filename = `rendex-${jobId}.pdf`;
            const imageResponse = await fetch(job.resultUrl);
            const buffer = Buffer.from(await imageResponse.arrayBuffer());
            const file = await z.stashFile(buffer, buffer.length, filename, "application/pdf");
            return {
                file,
                contentType: "application/pdf",
                url: bundle.inputData.url || null,
                format: "pdf",
                jobId,
                status: "completed",
                capturedAt: job.completedAt,
                message: "PDF generated successfully.",
            };
        }
        if (job?.status === "failed") {
            throw new z.errors.Error(job.error || "PDF generation failed.", "CAPTURE_FAILED", 502);
        }
    }
    return {
        file: null,
        contentType: null,
        url: bundle.inputData.url || null,
        format: "pdf",
        jobId,
        status: "still_processing",
        capturedAt: null,
        message: "The PDF is still rendering — that's normal for long documents. Add a 'Get Job Status' step after this one and pass the Job ID above to retrieve the finished PDF once it's ready.",
    };
};
exports.default = {
    key: "generate_pdf",
    noun: "PDF",
    display: {
        label: "Generate PDF",
        description: "Generates a PDF from a webpage or HTML with custom page size, margins, and orientation.",
    },
    operation: {
        inputFields: [
            screenshotFields_1.sourceTypeField,
            screenshotFields_1.sourceValueFields,
            screenshotFields_1.templateDataFields,
            ...screenshotFields_1.pdfFieldsArray,
            ...screenshotFields_1.advancedFields,
        ],
        perform,
        sample: {
            file: "https://example.com/document.pdf",
            contentType: "application/pdf",
            url: "https://example.com",
            format: "pdf",
            jobId: "job_abc123def456",
            status: "completed",
            capturedAt: "2026-04-15T12:00:05.000Z",
            message: "PDF generated successfully.",
        },
    },
};
//# sourceMappingURL=generatePdf.js.map