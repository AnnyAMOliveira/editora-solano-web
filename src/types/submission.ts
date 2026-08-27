/**
 * What the "Publique com a gente" form will send once a backend exists.
 *
 * This is the transport shape, deliberately separate from the presentation:
 * `SubmissionForm` owns the fields and their validation, and the day a real
 * endpoint appears it receives this object without any component changing.
 *
 * `file` is the browser `File` picked in the upload field. A real integration
 * will most likely turn it into multipart form data or a signed upload URL —
 * the field stays `File | null` here so that decision is not pre-empted.
 */
export interface SubmissionDraft {
  fullName: string;
  email: string;
  /** Optional in the design — no phone is required to send an original. */
  phone: string;
  workingTitle: string;
  genre: string;
  about: string;
  file: File | null;
}

/** Field names that carry a validation message. `file` can fail on format. */
export type SubmissionField = keyof SubmissionDraft;

export type SubmissionErrors = Partial<Record<SubmissionField, string>>;
