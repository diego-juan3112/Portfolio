"use client";

import { useEffect, useRef, useState } from "react";
import type { Locale } from "@/i18n/config";
import { errorMessage, type Dictionary } from "@/i18n/dictionaries";
import type { FitResult } from "@/lib/ai/schemas";
import { Meter } from "./Meter";

// Nivel de la aguja por veredicto: solo la evidencia clara pasa de cero
const LEVEL_VU = { strong: 1, partial: -5, gap: -20 } as const;

export function FitSection({ lang, t }: { lang: Locale; t: Dictionary["fit"] }) {
  const [criteria, setCriteria] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<FitResult | null>(null);
  const bridgeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = bridgeRef.current;
    if (!result || !el) return;
    el.classList.remove("is-live");
    const frame = requestAnimationFrame(() => el.classList.add("is-live", "is-visible"));
    el.scrollIntoView({ behavior: "smooth", block: "nearest" });
    return () => cancelAnimationFrame(frame);
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

  return (
    <section id="measure" aria-labelledby="measure-title" className="on-face scroll-mt-4">
      <div className="mx-auto grid w-full max-w-[90rem] gap-x-16 gap-y-10 px-5 py-24 sm:px-8 sm:py-32 lg:grid-cols-[1fr_1.15fr]">
        <div className="min-w-0">
          <h2 id="measure-title" className="display text-5xl sm:text-7xl" data-reveal>
            {t.title}
          </h2>
          <p className="mt-6 max-w-lg text-xl leading-snug text-ink" data-reveal style={{ "--i": 1 } as React.CSSProperties}>
            {t.intro}
          </p>
        </div>

        <form onSubmit={measure} className="min-w-0 self-end" data-reveal style={{ "--i": 2 } as React.CSSProperties}>
          <label htmlFor="fit-criteria" className="font-cond text-lg font-semibold">
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
            className="mt-2 block w-full resize-y rounded-[2px] bg-face-2 px-4 py-3 text-lg text-ink caret-red outline-none placeholder:text-ink-soft focus-visible:outline-2 focus-visible:outline-ink"
          />
          <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
            <p id="fit-hint" className="text-base text-ink-soft">
              {t.hint}
            </p>
            <button type="submit" disabled={loading} className="btn btn--red">
              {loading ? t.analyzing : t.analyze}
            </button>
          </div>
          <p role="alert" className="mt-3 min-h-6 text-base font-medium text-red">
            {error}
          </p>
        </form>

        {result && (
          <div ref={bridgeRef} className="bridge min-w-0 lg:col-span-2" aria-live="polite">
            <div className="flex flex-wrap items-end gap-x-10 gap-y-4">
              <p className="display text-8xl sm:text-9xl">{Math.round(result.score)}%</p>
              <div className="max-w-2xl pb-2">
                <h3 className="font-cond text-2xl font-bold">{t.score}</h3>
                <p className="mt-1 text-lg">{result.summary}</p>
              </div>
            </div>

            <ul className="mt-10 grid gap-px bg-face-2 sm:grid-cols-2 xl:grid-cols-3">
              {result.requirements.map((r, i) => (
                <li
                  key={`${r.requirement}-${i}`}
                  className="result-row grid grid-cols-[7.5rem_1fr] items-start gap-4 bg-face p-4"
                  style={{ "--i": i } as React.CSSProperties}
                >
                  <div className="bg-ink p-1">
                    <Meter vu={LEVEL_VU[r.level]} delay={i * 70} />
                  </div>
                  <div>
                    <p className="font-cond text-xl font-bold leading-tight">{r.requirement}</p>
                    <p className={`mt-1 text-base font-semibold ${r.level === "strong" ? "text-red" : "text-ink"}`}>
                      {t[r.level]}
                    </p>
                    <p className="mt-1 text-base text-ink-soft">{r.evidence}</p>
                  </div>
                </li>
              ))}
            </ul>

            {result.gaps.length > 0 && (
              <div className="mt-10 max-w-3xl">
                <h3 className="font-cond text-2xl font-bold">{t.gaps}</h3>
                <ul className="mt-3 space-y-2 text-lg">
                  {result.gaps.map((g) => (
                    <li key={g.gap}>
                      <strong className="font-semibold">{g.gap}.</strong> {g.plan}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <p className="mt-8 text-base text-ink-soft">{t.disclaimer}</p>
          </div>
        )}
      </div>
    </section>
  );
}
