/**
 * Shared client-side validation for the two form pages.
 *
 * This is interface validation only — it decides what the user sees before a
 * request is ever made. Whatever backend eventually receives these forms must
 * validate again on its side; nothing here is a security boundary.
 */

/** Same pattern `NewsletterForm` already uses, kept in one place now. */
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function isValidEmail(value: string) {
  return EMAIL_PATTERN.test(value.trim());
}

export function isBlank(value: string) {
  return value.trim().length === 0;
}

/** Messages are centralised so both forms word the same failure identically. */
export const VALIDATION_MESSAGES = {
  requiredName: "Informe seu nome completo.",
  requiredEmail: "Informe seu e-mail.",
  invalidEmail: "Digite um e-mail válido.",
  requiredSubject: "Informe o assunto.",
  requiredMessage: "Escreva sua mensagem.",
  requiredAbout: "Conte um pouco sobre a obra.",
  invalidFileType: "Envie um arquivo PDF ou DOCX.",
} as const;
