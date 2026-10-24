"use client";

import { useState } from "react";
import { errorMessage, type Dictionary } from "@/i18n/dictionaries";

type Status = { kind: "idle" | "sending" | "sent" } | { kind: "error"; message: string };

const field =
  "mt-2 block w-full rounded-[2px] bg-desk-3 px-4 py-3 text-lg text-on-desk caret-red outline-none focus-visible:outline-2 focus-visible:outline-red";
const label = "font-cond text-lg font-semibold";

export function ContactForm({ t }: { t: Dictionary["contact"] }) {
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    setStatus({ kind: "sending" });
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        setStatus({ kind: "error", message: errorMessage(t.errors, body.error) });
        return;
      }
      form.reset();
      setStatus({ kind: "sent" });
    } catch {
      setStatus({ kind: "error", message: t.errors.default });
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="c-name" className={label}>
            {t.name}
          </label>
          <input id="c-name" name="name" required minLength={2} maxLength={80} autoComplete="name" className={field} />
        </div>
        <div>
          <label htmlFor="c-email" className={label}>
            {t.email}
          </label>
          <input
            id="c-email"
            name="email"
            type="email"
            required
            maxLength={120}
            autoComplete="email"
            className={field}
          />
        </div>
      </div>
      <div>
        <label htmlFor="c-msg" className={label}>
          {t.message}
        </label>
        <textarea id="c-msg" name="message" required minLength={10} maxLength={2000} rows={6} className={field} />
      </div>
      {/* Honeypot: invisible para personas, los bots lo rellenan */}
      <input name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
      <div className="flex flex-wrap items-center gap-5">
        <button type="submit" disabled={status.kind === "sending"} className="btn btn--red">
          {status.kind === "sending" ? t.sending : t.send}
        </button>
        <p role="status" aria-live="polite" className="text-lg">
          {status.kind === "sent" && t.sent}
          {status.kind === "error" && status.message}
        </p>
      </div>
    </form>
  );
}
