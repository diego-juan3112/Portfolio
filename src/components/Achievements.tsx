import { achievements, certifications } from "@/content/profile";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";

export function Achievements({ lang, t }: { lang: Locale; t: Dictionary }) {
  return (
    <section id="achievements" className="scroll-mt-8 px-5 py-20">
      <div className="mx-auto max-w-6xl">
        <h2 className="font-display text-4xl uppercase sm:text-5xl">{t.achievements.title}</h2>
        <ol className="mt-10 grid gap-4 md:grid-cols-3">
          {achievements.map((a) => (
            <li key={a.id} className="rounded-3xl border border-border bg-surface p-6">
              <p className="font-mono text-xs text-accent-to">{a.date}</p>
              <h3 className="mt-2 text-xl font-bold">{a.title[lang]}</h3>
              <p className="mt-2 text-sm text-foreground/80">{a.detail[lang]}</p>
            </li>
          ))}
        </ol>
        <ul className="mt-6 flex flex-wrap gap-3 text-sm text-muted">
          {certifications.map((c) => (
            <li key={c.id} className="rounded-full border border-border px-4 py-1.5">
              {c.name} · {c.date}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
