"use client";

import { useEffect, useRef, useState } from "react";
import type { Locale } from "@/i18n/config";
import { errorMessage, type Dictionary } from "@/i18n/dictionaries";
import type { FitResult } from "@/lib/ai/schemas";

// Cada veredicto: cuánto se llena la barra y su color (todos legibles sobre carbón)
const LEVEL = {
  strong: { fill: 1, bar: "bg-orange", label: "text-orange" },
  partial: { fill: 0.55, bar: "bg-slate", label: "text-cream" },
  gap: { fill: 0.12, bar: "bg-cream-soft", label: "text-cream-soft" },
} as const;

export function FitSection({ lang, t }: { lang: Locale; t: Dictionary["fit"] }) {
  const [criteria, setCriteria] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<FitResult | null>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (result) resultRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [result]);

  async function measure(event: React.FormEvent) {
    event.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/fit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ locale: lang, criteria }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(errorMessage(t.errors, data.error));
        return;
      }
      setResult(data as FitResult);
    } catch {
      setError(t.errors.default);
    } finally {
      setLoading(false);
    }
  }

  const score = result ? Math.round(result.score) : 0;

  return (
    <section id="measure" aria-labelledby="measure-title" className="wash-orange">
      <div className="mx-auto grid w-full max-w-[90rem] gap-x-16 gap-y-10 px-5 py-24 sm:px-8 sm:py-32 lg:grid-cols-[1fr_1.15fr]">
        <div className="min-w-0">
          <h2 id="measure-title" className="display text-5xl sm:text-7xl" data-reveal>
            {t.title}
          </h2>
          <p className="mt-6 max-w-lg text-xl leading-snug text-cream-soft" data-reveal style={{ "--i": 1 } as React.CSSProperties}>
            {t.intro}
          </p>
        </div>

        <form onSubmit={measure} className="min-w-0 self-end" data-reveal style={{ "--i": 2 } as React.CSSProperties}>
          <label htmlFor="fit-criteria" className="font-display text-lg font-bold">
            {t.label}
          </label>
          <textarea
            id="fit-criteria"
            value={criteria}
            onChange={(e) => setCriteria(e.target.value)}
            minLength={20}
            maxLength={4000}
            rows={6}
            required
            aria-describedby="fit-hint"
            placeholder={t.placeholder}
            className="mt-2 block w-full resize-y rounded-2xl bg-carbon-2 px-5 py-4 text-lg text-cream caret-orange outline-none ring-1 ring-cream/10 transition-shadow placeholder:text-cream-soft/70 focus-visible:ring-2 focus-visible:ring-orange"
          />
          <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
            <p id="fit-hint" className="text-base text-cream-soft">
              {t.hint}
            </p>
            <button type="submit" disabled={loading} className="btn btn--accent">
              {loading ? t.analyzing : t.analyze}
            </button>
          </div>
          <p role="alert" className="mt-3 min-h-6 text-base font-semibold text-orange">
            {error}
          </p>
        </form>

        {result && (
          <div ref={resultRef} className="min-w-0 lg:col-span-2" aria-live="polite">
            <div className="grid items-end gap-x-10 gap-y-4 sm:grid-cols-[auto_1fr]">
              <div>
                <h3 className="font-display text-lg font-bold text-cream-soft">{t.score}</h3>
                <p className="display text-8xl text-orange">{score}%</p>
              </div>
              <div className="min-w-0 pb-3">
                <div
                  className="level-bar h-2 overflow-clip rounded-full bg-carbon-3"
                  role="meter"
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-valuenow={score}
                  aria-label={t.score}
                >
                  <i className="block h-full rounded-full" style={{ width: `${score}%`, background: "var(--grad-line)" }} />
                </div>
                <p className="mt-4 max-w-3xl text-lg">{result.summary}</p>
              </div>
            </div>

            {/* Requisitos como lista con divisores: sin tarjetas */}
            <ul className="mt-10 grid gap-x-12 border-t border-cream/10 md:grid-cols-2">
              {result.requirements.map((r, i) => {
                const level = LEVEL[r.level];
                return (
                  <li
                    key={`${r.requirement}-${i}`}
                    className="result-row border-b border-cream/10 py-5"
                    style={{ "--i": i } as React.CSSProperties}
                  >
                    <div className="flex items-baseline justify-between gap-3">
                      <p className="font-display text-xl font-bold leading-tight">{r.requirement}</p>
                      <p className={`shrink-0 text-base font-bold ${level.label}`}>{t[r.level]}</p>
                    </div>
                    <div className="level-bar mt-3 h-1.5 overflow-clip rounded-full bg-carbon-3" aria-hidden="true">
                      <i
                        className={`block h-full rounded-full ${level.bar}`}
                        style={{ width: `${level.fill * 100}%`, "--i": i } as React.CSSProperties}
                      />
                    </div>
                    <p className="mt-3 text-base text-cream-soft">{r.evidence}</p>
                  </li>
                );
              })}
            </ul>

            {result.gaps.length > 0 && (
              <div className="mt-12 max-w-3xl">
                <h3 className="font-display text-2xl font-bold">{t.gaps}</h3>
                <ul className="mt-3 space-y-2 text-lg">
                  {result.gaps.map((g) => (
                    <li key={g.gap}>
                      <strong className="font-semibold">{g.gap}.</strong> <span className="text-cream-soft">{g.plan}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <p className="mt-8 text-base text-cream-soft">{t.disclaimer}</p>
          </div>
        )}
      </div>
    </section>
  );
}
