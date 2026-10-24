import { projects } from "@/content/projects";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { ProjectFragment } from "./Fragments";

export function Projects({ lang, t }: { lang: Locale; t: Dictionary }) {
  return (
    <section id="projects" aria-labelledby="projects-title" className="scroll-mt-4">
      <div className="mx-auto w-full max-w-[90rem] px-5 py-24 sm:px-8 sm:py-36">
        <div className="grid gap-x-16 gap-y-4 lg:grid-cols-[1fr_1.15fr]">
          <h2 id="projects-title" className="display text-5xl sm:text-7xl" data-reveal>
            {t.projects.title}
          </h2>
          <p className="max-w-lg self-end text-xl leading-snug" data-reveal style={{ "--i": 1 } as React.CSSProperties}>
            {t.projects.intro}
          </p>
        </div>

        <ol className="mt-16 space-y-20 sm:mt-20 sm:space-y-36">
          {projects.map((p, i) => (
            <li
              key={p.slug}
              id={`project-${p.slug}`}
              className="grid scroll-mt-8 items-center gap-x-16 gap-y-8 lg:grid-cols-2"
            >
              <div className={i % 2 === 1 ? "min-w-0 lg:order-2" : "min-w-0"}>
                <h3 className="display text-5xl" data-reveal>
                  {p.title}
                </h3>
                <p className="mt-3 font-cond text-2xl font-semibold" data-reveal style={{ "--i": 1 } as React.CSSProperties}>
                  {p.tagline[lang]}
                </p>
                <p className="mt-4 max-w-xl text-lg" data-reveal style={{ "--i": 2 } as React.CSSProperties}>
                  {p.description[lang]}
                </p>
                <p className="mt-4 max-w-xl text-base text-on-desk-soft" data-reveal style={{ "--i": 3 } as React.CSSProperties}>
                  {p.tags.join(" · ")}
                </p>
                <div className="mt-6 flex flex-wrap gap-3" data-reveal style={{ "--i": 4 } as React.CSSProperties}>
                  <a href={p.repo} target="_blank" rel="noopener noreferrer" className="btn btn--quiet">
                    {t.projects.repo}
                  </a>
                  {p.demo && (
                    <a href={p.demo} target="_blank" rel="noopener noreferrer" className="btn btn--quiet">
                      {t.projects.demo}
                    </a>
                  )}
                </div>
              </div>
              <div data-wipe className="min-w-0">
                <ProjectFragment slug={p.slug} lang={lang} sample={t.projects.illustrative} />
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
