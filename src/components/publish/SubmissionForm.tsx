"use client";

import { useState } from "react";
import type { FormEvent } from "react";

import { Button } from "@/components/ui/Button";
import { FileUpload, hasAcceptedExtension } from "@/components/ui/FileUpload";
import { FormField } from "@/components/ui/FormField";
import { SelectField } from "@/components/ui/SelectField";
import { isBlank, isValidEmail, VALIDATION_MESSAGES } from "@/lib/validation";
import type { SelectOption, SubmissionDraft, SubmissionErrors } from "@/types";

interface SubmissionFormProps {
  /**
   * Genres offered by the `Gênero` dropdown. Passed in rather than imported so
   * the form stays free of editorial content — see `lib/content/genres.ts`.
   */
  genreOptions: SelectOption[];
}

const EMPTY_DRAFT: SubmissionDraft = {
  fullName: "",
  email: "",
  phone: "",
  workingTitle: "",
  genre: "",
  about: "",
  file: null,
};

/**
 * Validation of the interface only. Required fields are the three agreed with
 * the editor — name, e-mail and the description of the work; everything else,
 * the attachment included, is optional.
 */
function validate(draft: SubmissionDraft): SubmissionErrors {
  const errors: SubmissionErrors = {};

  if (isBlank(draft.fullName)) errors.fullName = VALIDATION_MESSAGES.requiredName;

  if (isBlank(draft.email)) {
    errors.email = VALIDATION_MESSAGES.requiredEmail;
  } else if (!isValidEmail(draft.email)) {
    errors.email = VALIDATION_MESSAGES.invalidEmail;
  }

  if (isBlank(draft.about)) errors.about = VALIDATION_MESSAGES.requiredAbout;

  if (draft.file && !hasAcceptedExtension(draft.file)) {
    errors.file = VALIDATION_MESSAGES.invalidFileType;
  }

  return errors;
}

/**
 * Figma: Publique › `Section 5` (437:1085) — the six fields, the attachment and
 * the send button inside the tinted panel.
 *
 * Interface only: there is no submission. On a valid form the fields are
 * replaced by a confirmation, and `SubmissionDraft` is the object a real
 * endpoint would receive — which is why the shape lives in `types/` instead of
 * being spread across this component's state.
 */
export function SubmissionForm({ genreOptions }: SubmissionFormProps) {
  const [draft, setDraft] = useState<SubmissionDraft>(EMPTY_DRAFT);
  const [errors, setErrors] = useState<SubmissionErrors>({});
  const [isSent, setIsSent] = useState(false);

  function update<K extends keyof SubmissionDraft>(
    field: K,
    value: SubmissionDraft[K],
  ) {
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
        <h3 className="text-slab-sub">Recebemos seu material</h3>
        <p className="text-body">
          Obrigado, {draft.fullName.trim()}. Respondemos em até 30 dias no
          e-mail informado, com um parecer de leitura.
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
          Enviar outro original
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
        label="Telefone / WhatsApp"
        name="phone"
        type="tel"
        value={draft.phone}
        onChange={(value) => update("phone", value)}
        placeholder="(00) 000000-0000"
        autoComplete="tel"
      />

      <FormField
        label="Título provisório"
        name="workingTitle"
        value={draft.workingTitle}
        onChange={(value) => update("workingTitle", value)}
        placeholder="Não precisa ser o título definitivo, apenas um de trabalho"
      />

      <SelectField
        label="Gênero"
        name="genre"
        value={draft.genre}
        onChange={(value) => update("genre", value)}
        options={genreOptions}
        placeholder="Romance, ensaio, memórias..."
      />

      <FormField
        label="Sobre a obra"
        name="about"
        multiline
        value={draft.about}
        onChange={(value) => update("about", value)}
        placeholder="Conte em poucas linhas sobre o que é seu livro, sobre o estado atual."
        required
        error={errors.about}
      />

      <FileUpload
        label="Arquivo original"
        name="file"
        file={draft.file}
        onChange={(file) => update("file", file)}
        placeholder="Anexar arquivo original . Pdf ou Docx"
        error={errors.file}
      />

      <Button type="submit" className="w-full">
        Enviar
      </Button>
    </form>
  );
}
