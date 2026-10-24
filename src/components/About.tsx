import { experience, profile, skillGroups } from "@/content/profile";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";

export function About({ lang, t }: { lang: Locale; t: Dictionary }) {
  return (
    <section id="about" className="scroll-mt-8 px-5 py-20">
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2">
        <div>
          <h2 className="font-display text-4xl uppercase sm:text-5xl">{t.about.title}</h2>
          <p className="mt-6 leading-relaxed text-foreground/85">{profile.summary[lang]}</p>
          <dl className="mt-8 space-y-4 text-sm">
            <div>
              <dt className="font-mono text-xs uppercase tracking-widest text-muted">{t.about.education}</dt>
              <dd className="mt-1">{profile.education[lang]}</dd>
              <dd className="text-muted">{profile.languages[lang]}</dd>
            </div>
          </dl>

          <h3 className="mt-12 font-display text-2xl uppercase">{t.experience.title}</h3>
          <article className="mt-4 rounded-2xl border border-border bg-surface p-5">
            <h4 className="font-bold">{experience.title}</h4>
            <p className="text-sm text-muted">
              {experience.org} · {experience.duration[lang]}
            </p>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-foreground/85">
              {experience.bullets[lang].map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          </article>
        </div>

        <div>
          <h3 className="font-display text-2xl uppercase">{t.about.skills}</h3>
          <div className="mt-6 space-y-6">
            {skillGroups.map((g) => (
              <div key={g.id}>
                <p className="font-mono text-xs uppercase tracking-widest text-muted">{g.label[lang]}</p>
                <ul className="mt-2 flex flex-wrap gap-2">
                  {g.items.map((item) => (
                    <li key={item} className="rounded-full border border-border bg-surface px-3 py-1 text-sm">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
