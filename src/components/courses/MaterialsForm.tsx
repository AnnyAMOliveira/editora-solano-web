"use client";

import { useState } from "react";
import type { FormEvent } from "react";

import { Button } from "@/components/ui/Button";
import { FormField } from "@/components/ui/FormField";
import { isBlank, isValidEmail, VALIDATION_MESSAGES } from "@/lib/validation";
import type { MaterialsRequestDraft, MaterialsRequestErrors } from "@/types";

const EMPTY_DRAFT: MaterialsRequestDraft = {
  fullName: "",
  email: "",
};

/** Both fields are required: the delivery needs a name and an address. */
function validate(draft: MaterialsRequestDraft): MaterialsRequestErrors {
  const errors: MaterialsRequestErrors = {};

  if (isBlank(draft.fullName)) errors.fullName = VALIDATION_MESSAGES.requiredName;

  if (isBlank(draft.email)) {
    errors.email = VALIDATION_MESSAGES.requiredEmail;
  } else if (!isValidEmail(draft.email)) {
    errors.email = VALIDATION_MESSAGES.invalidEmail;
  }

  return errors;
}

/**
 * Figma: Cursos › `Frame 13` (447:1753) — two fields over a full-width send
 * button, 28px apart. That gap is the design's own and is wider than the 20px
 * the Contato and Publique forms use; it is kept as drawn.
 *
 * Interface only, the same contract as the other two forms: nothing is sent,
 * a valid submission swaps the fields for a confirmation, and
 * `MaterialsRequestDraft` is exactly what an endpoint will receive.
 */
export function MaterialsForm() {
  const [draft, setDraft] = useState<MaterialsRequestDraft>(EMPTY_DRAFT);
  const [errors, setErrors] = useState<MaterialsRequestErrors>({});
  const [isSent, setIsSent] = useState(false);

  function update(field: keyof MaterialsRequestDraft, value: string) {
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
        <h3 className="text-slab-sub">Materiais a caminho</h3>
        <p className="text-body">
          Obrigado, {draft.fullName.trim()}. Os três materiais seguem para o
          e-mail informado, junto da carta mensal da editora.
        </p>
        <p className="text-body-sm text-muted">
          O envio ainda não está ligado a um servidor — esta confirmação valida
          apenas o preenchimento.
        </p>
        <Button
          type="button"
          variant="outline"
          onClick={() => {
            setDraft(EMPTY_DRAFT);
            setIsSent(false);
          }}
        >
          Usar outro e-mail
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex w-full flex-col gap-7">
      <FormField
        label="Nome Completo"
        name="fullName"
        value={draft.fullName}
        onChange={(value) => update("fullName", value)}
        placeholder="Seu Nome"
        autoComplete="name"
        required
        error={errors.fullName}
      />

      <FormField
        label="Email"
        name="email"
        type="email"
        value={draft.email}
        onChange={(value) => update("email", value)}
        placeholder="email@servidor.com"
        autoComplete="email"
        required
        error={errors.email}
      />

      <Button type="submit" className="w-full">
        Enviar
      </Button>
    </form>
  );
}
