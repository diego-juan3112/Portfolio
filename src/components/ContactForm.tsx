"use client";

import { useState } from "react";
import type { Dictionary } from "@/i18n/dictionaries";

type Status = "idle" | "sending" | "sent" | "error";

const field =
  "w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm outline-none transition-colors focus:border-accent-via";

export function ContactForm({ t }: { t: Dictionary["contact"] }) {
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error(String(res.status));
      form.reset();
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <label htmlFor="c-name" className="mb-1 block text-xs font-bold uppercase tracking-widest text-muted">
          {t.name}
        </label>
        <input id="c-name" name="name" required minLength={2} maxLength={80} autoComplete="name" className={field} />
      </div>
      <div>
        <label htmlFor="c-email" className="mb-1 block text-xs font-bold uppercase tracking-widest text-muted">
          {t.email}
        </label>
        <input id="c-email" name="email" type="email" required maxLength={120} autoComplete="email" className={field} />
      </div>
      <div>
        <label htmlFor="c-msg" className="mb-1 block text-xs font-bold uppercase tracking-widest text-muted">
          {t.message}
        </label>
        <textarea id="c-msg" name="message" required minLength={10} maxLength={2000} rows={5} className={field} />
      </div>
      {/* Honeypot: invisible para personas, los bots lo rellenan */}
      <input name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
      <button
        type="submit"
        disabled={status === "sending"}
        className="gradient-border inline-flex items-center px-7 py-3 text-xs font-extrabold uppercase tracking-widest transition-transform hover:scale-105 disabled:opacity-60"
      >
        {status === "sending" ? t.sending : t.send}
      </button>
      <p role="status" aria-live="polite" className="min-h-5 text-sm">
        {status === "sent" && <span className="text-emerald-400">{t.sent}</span>}
        {status === "error" && <span className="text-red-400">{t.error}</span>}
      </p>
    </form>
  );
}
