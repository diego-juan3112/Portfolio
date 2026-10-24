"use client";

import { useState } from "react";
import type { Project } from "@/content/projects";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";

type Filter = "all" | Project["category"];

export function Projects({ lang, t, projects }: { lang: Locale; t: Dictionary; projects: Project[] }) {
  const [filter, setFilter] = useState<Filter>("all");
  const categories = Array.from(new Set(projects.map((p) => p.category)));
  const visible = filter === "all" ? projects : projects.filter((p) => p.category === filter);

  return (
    <section id="projects" className="scroll-mt-8 px-5 py-20">
      <div className="mx-auto max-w-6xl">
        <h2 className="font-display text-4xl uppercase sm:text-5xl">{t.projects.title}</h2>
        <p className="mt-3 text-muted">{t.projects.intro}</p>

        <div className="mt-8 flex flex-wrap gap-2" role="group" aria-label={t.projects.title}>
          {(["all", ...categories] as Filter[]).map((c) => (
            <button
              key={c}
              type="button"
              aria-pressed={filter === c}
              onClick={() => setFilter(c)}
              className={`rounded-full border px-4 py-1.5 text-xs font-bold uppercase tracking-widest transition-colors ${
                filter === c
                  ? "border-transparent bg-foreground text-background"
                  : "border-border text-muted hover:text-foreground"
              }`}
            >
              {c === "all" ? t.projects.all : t.projects.filters[c]}
            </button>
          ))}
        </div>

        <ol className="mt-10 grid gap-6 md:grid-cols-2">
          {visible.map((p, i) => (
            <li
              key={p.slug}
              className="group relative flex flex-col rounded-3xl border border-border bg-surface p-6 transition-colors hover:border-accent-via/60"
            >
              <span className="font-display text-5xl text-border transition-colors group-hover:text-accent-via">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-4 text-2xl font-bold">{p.title}</h3>
              <p className="mt-1 text-sm text-accent-to">{p.tagline[lang]}</p>
              <p className="mt-4 flex-1 text-sm leading-relaxed text-foreground/80">{p.description[lang]}</p>
              <ul className="mt-5 flex flex-wrap gap-2">
                {p.tags.map((tag) => (
                  <li key={tag} className="rounded-md bg-surface-2 px-2 py-1 font-mono text-[11px] text-muted">
                    {tag}
                  </li>
                ))}
              </ul>
              <div className="mt-6 flex gap-4 text-xs font-bold uppercase tracking-widest">
                <a href={p.repo} target="_blank" rel="noopener noreferrer" className="hover:text-accent-via">
                  {t.projects.repo} ↗
                </a>
                {p.demo && (
                  <a href={p.demo} target="_blank" rel="noopener noreferrer" className="hover:text-accent-via">
                    {t.projects.demo} ↗
                  </a>
                )}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
