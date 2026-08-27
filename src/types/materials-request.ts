/**
 * What the "Baixe e comece hoje" form will send once a backend exists.
 *
 * Same contract as `SubmissionDraft` and `ContactMessageDraft`: the transport
 * shape lives here, apart from the component that collects it, so the day a
 * real endpoint appears it receives this object and no component changes.
 *
 * The copy beside the form promises the three materials plus the monthly
 * letter, so whatever receives this is both a delivery and a newsletter
 * sign-up — one reason it stays a named type instead of a loose pair.
 */
export interface MaterialsRequestDraft {
  fullName: string;
  email: string;
}

export type MaterialsRequestField = keyof MaterialsRequestDraft;

export type MaterialsRequestErrors = Partial<
  Record<MaterialsRequestField, string>
>;
