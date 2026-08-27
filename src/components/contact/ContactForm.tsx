"use client";

import { useState } from "react";
import type { FormEvent } from "react";

import { Button } from "@/components/ui/Button";
import { FormField } from "@/components/ui/FormField";
import { isBlank, isValidEmail, VALIDATION_MESSAGES } from "@/lib/validation";
import type { ContactMessageDraft, ContactMessageErrors } from "@/types";

const EMPTY_DRAFT: ContactMessageDraft = {
  fullName: "",
  email: "",
  subject: "",
  message: "",
};

/** All four fields are required on this form. */
function validate(draft: ContactMessageDraft): ContactMessageErrors {
  const errors: ContactMessageErrors = {};

  if (isBlank(draft.fullName)) errors.fullName = VALIDATION_MESSAGES.requiredName;

  if (isBlank(draft.email)) {
    errors.email = VALIDATION_MESSAGES.requiredEmail;
  } else if (!isValidEmail(draft.email)) {
    errors.email = VALIDATION_MESSAGES.invalidEmail;
  }

  if (isBlank(draft.subject)) errors.subject = VALIDATION_MESSAGES.requiredSubject;
  if (isBlank(draft.message)) errors.message = VALIDATION_MESSAGES.requiredMessage;

  return errors;
}

/**
 * Figma: Contato › `MANDE UMA MENSAGEM` (440:1030).
 *
 * Interface only, same contract as `SubmissionForm`: no request is made, and
 * `ContactMessageDraft` is what a real endpoint would receive.
 */
export function ContactForm() {
  const [draft, setDraft] = useState<ContactMessageDraft>(EMPTY_DRAFT);
  const [errors, setErrors] = useState<ContactMessageErrors>({});
  const [isSent, setIsSent] = useState(false);

  function update(field: keyof ContactMessageDraft, value: string) {
    setDraft((current) => ({ ...current, [field]: value }));
    setErrors((current) => {
      if (!current[field]) return current;
      const next = { ...current };
      delete next[field];
      return next;
    });
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const found = validate(draft);
    setErrors(found);

    if (Object.keys(found).length > 0) return;

    // The integration point: `draft` is exactly what the endpoint will receive.
    setIsSent(true);
  }

  if (isSent) {
    return (
      <div role="status" className="flex flex-col items-start gap-4 py-6">
        <h3 className="text-slab-sub">Mensagem pronta para envio</h3>
        <p className="text-body">
          Obrigado, {draft.fullName.trim()}. Assim que o envio estiver ligado,
          respondemos no e-mail informado.
        </p>
        <p className="text-body-sm text-muted">
          Enquanto isso, os endereços ao lado seguem ativos.
        </p>
        <Button
          type="button"
          variant="outline"
          onClick={() => {
            setDraft(EMPTY_DRAFT);
            setIsSent(false);
          }}
        >
          Escrever outra mensagem
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex w-full flex-col gap-5">
      <FormField
        label="Nome completo"
        name="fullName"
        value={draft.fullName}
        onChange={(value) => update("fullName", value)}
        placeholder="Como Você Assina?"
        autoComplete="name"
        required
        error={errors.fullName}
      />

      <FormField
        label="E-mail"
        name="email"
        type="email"
        value={draft.email}
        onChange={(value) => update("email", value)}
        placeholder="Email"
        autoComplete="email"
        required
        error={errors.email}
      />

      <FormField
        label="Assunto"
        name="subject"
        value={draft.subject}
        onChange={(value) => update("subject", value)}
        placeholder="Como podemos ajudar?"
        required
        error={errors.subject}
      />

      <FormField
        label="Mensagem"
        name="message"
        multiline
        value={draft.message}
        onChange={(value) => update("message", value)}
        placeholder="Conte em poucas linhas o que você precisa."
        required
        error={errors.message}
      />

      <Button type="submit" className="w-full">
        Enviar
      </Button>
    </form>
  );
}
