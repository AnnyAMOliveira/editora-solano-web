"use client";

import { useId, useState } from "react";
import type { FormEvent } from "react";

import { ArrowRightIcon } from "@/components/ui/ArrowRightIcon";
import { Button } from "@/components/ui/Button";

/**
 * Figma `Section7` newsletter card: a bordered email field beside the "Assinar"
 * button in Brand/color-brand-mata.
 *
 * Interface only — there is no submission. The field validates its own format
 * and reports the result; wiring it to a provider is the developer's step.
 */
export function NewsletterForm() {
  const inputId = useId();
  const messageId = useId();
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isValid, setIsValid] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmed = email.trim();

    if (!trimmed) {
      setIsValid(false);
      setError("Informe seu e-mail.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(trimmed)) {
      setIsValid(false);
      setError("Digite um e-mail válido.");
      return;
    }

    setError(null);
    setIsValid(true);
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex w-full flex-col gap-3">
      <div className="flex flex-col gap-[19px] sm:flex-row sm:items-start">
        <div className="relative w-full sm:max-w-[360px]">
          <label htmlFor={inputId} className="sr-only">
            Seu e-mail
          </label>
          <input
            id={inputId}
            type="email"
            name="email"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
              if (error) setError(null);
              if (isValid) setIsValid(false);
            }}
            placeholder="Seu Email"
            autoComplete="email"
            aria-invalid={error ? true : undefined}
            aria-describedby={error || isValid ? messageId : undefined}
            className="text-slab-menu w-full border border-current bg-transparent p-2.5 pr-10 placeholder:text-current/70 focus-visible:outline-offset-0"
          />
          <ArrowRightIcon className="pointer-events-none absolute top-1/2 right-2.5 -translate-y-1/2 opacity-70" />
        </div>

        <Button type="submit" variant="mata" className="shrink-0 px-6">
          Assinar
        </Button>
      </div>

      <p id={messageId} role="status" className="text-body-sm min-h-4">
        {error ? (
          <span className="text-areia">{error}</span>
        ) : isValid ? (
          <span className="text-areia">
            E-mail válido. O envio será ligado na integração.
          </span>
        ) : null}
      </p>
    </form>
  );
}
