"use client";

import { useState } from "react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import type { FitResult } from "@/lib/ai/schemas";

const levelStyle = {
  strong: "bg-emerald-500/15 text-emerald-300",
  partial: "bg-amber-500/15 text-amber-300",
  gap: "bg-red-500/15 text-red-300",
} as const;

export function FitAnalyzer({ lang, t }: { lang: Locale; t: Dictionary["fit"] }) {
  const [criteria, setCriteria] = useState("");
  const [loading, setLoading] = useState(false);
  const [failed, setFailed] = useState(false);
  const [result, setResult] = useState<FitResult | null>(null);

  async function analyze(event: React.FormEvent) {
    event.preventDefault();
    setLoading(true);
    setFailed(false);
    setResult(null);
    try {
      const res = await fetch("/api/fit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ locale: lang, criteria }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setResult((await res.json()) as FitResult);
    } catch {
      setFailed(true);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-3xl border border-border bg-surface p-5">
      <h3 className="font-display text-2xl uppercase">{t.title}</h3>
      <p className="mt-1 text-sm text-muted">{t.intro}</p>

      <form onSubmit={analyze} className="mt-4 space-y-3">
        <label htmlFor="fit-criteria" className="sr-only">
          {t.title}
        </label>
        <textarea
          id="fit-criteria"
          value={criteria}
          onChange={(e) => setCriteria(e.target.value)}
          minLength={20}
          maxLength={4000}
          rows={5}
          required
          placeholder={t.placeholder}
          className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-accent-via"
        />
        <button
          type="submit"
          disabled={loading}
          className="gradient-border inline-flex items-center px-6 py-2.5 text-xs font-extrabold uppercase tracking-widest disabled:opacity-60"
        >
          {loading ? t.analyzing : t.analyze}
        </button>
      </form>

      <div aria-live="polite">
        {failed && <p className="mt-4 text-sm text-red-400">{t.error}</p>}
        {result && (
          <div className="mt-6 space-y-5">
            <div className="flex items-center gap-4">
              <p className="font-display text-6xl gradient-text">{Math.round(result.score)}%</p>
              <p className="text-sm text-muted">
                {t.score}
                <span className="mt-1 block text-foreground/85">{result.summary}</span>
              </p>
            </div>
            <ul className="space-y-2">
              {result.requirements.map((r) => (
                <li key={r.requirement} className="rounded-xl border border-border p-3 text-sm">
                  <div className="flex items-start justify-between gap-3">
                    <span className="font-semibold">{r.requirement}</span>
                    <span className={`shrink-0 rounded-full px-2 py-0.5 text-[11px] font-bold ${levelStyle[r.level]}`}>
                      {t[r.level]}
                    </span>
                  </div>
                  <p className="mt-1 text-muted">{r.evidence}</p>
                </li>
              ))}
            </ul>
            {result.gaps.length > 0 && (
              <div>
                <h4 className="text-xs font-bold uppercase tracking-widest text-muted">{t.gaps}</h4>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-sm">
                  {result.gaps.map((g) => (
                    <li key={g.gap}>
                      <strong>{g.gap}:</strong> {g.plan}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
      <p className="mt-5 text-xs text-muted">{t.disclaimer}</p>
    </div>
  );
}
