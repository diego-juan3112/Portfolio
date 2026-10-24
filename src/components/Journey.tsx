import { achievements, certifications, experience, profile } from "@/content/profile";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";

type Entry = { key: string; when: string; title: string; detail: string };

export function Journey({ lang, t }: { lang: Locale; t: Dictionary }) {
  const es = lang === "es";
  // Orden cronológico por fecha mm/aaaa
  const sortKey = (date: string) => {
    const [m, y] = date.split("/");
    return `${y}${m.padStart(2, "0")}`;
  };
  const entries: Entry[] = [
    ...achievements.map((a) => ({ key: a.id, when: a.date, title: a.title[lang], detail: a.detail[lang] })),
    ...certifications.map((c) => ({
      key: c.id,
      when: c.when,
      title: c.name,
      detail: es ? "Certificación de Amazon Web Services" : "Amazon Web Services certification",
    })),
  ].sort((a, b) => sortKey(a.when).localeCompare(sortKey(b.when)));

  return (
    <section id="journey" aria-labelledby="journey-title" className="scroll-mt-4 bg-desk-2">
      <div className="mx-auto grid w-full max-w-[90rem] gap-x-16 gap-y-14 px-5 py-24 sm:px-8 sm:py-36 lg:grid-cols-[1fr_1.15fr]">
        <div className="min-w-0">
          <h2 id="journey-title" className="display text-5xl sm:text-7xl" data-reveal>
            {t.journey.title}
          </h2>

          <h3 className="mt-12 font-cond text-2xl font-bold" data-reveal>
            {t.journey.experience}
          </h3>
          <div className="mt-3" data-reveal style={{ "--i": 1 } as React.CSSProperties}>
            <p className="text-xl font-semibold">{experience.title}</p>
            <p className="text-base text-on-desk-soft">
              {experience.org} · {experience.duration[lang]}
            </p>
            <ul className="mt-4 max-w-xl list-disc space-y-2 pl-5 text-lg marker:text-red">
              {experience.bullets[lang].map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          </div>

          <h3 className="mt-12 font-cond text-2xl font-bold" data-reveal>
            {t.journey.education}
          </h3>
          <p className="mt-3 max-w-xl text-lg" data-reveal style={{ "--i": 1 } as React.CSSProperties}>
            {profile.education[lang]}
          </p>
          <p className="mt-1 text-base text-on-desk-soft" data-reveal style={{ "--i": 2 } as React.CSSProperties}>
            {profile.languages[lang]}
          </p>
        </div>

        <div className="min-w-0 lg:pt-4">
          <h3 className="font-cond text-2xl font-bold" data-reveal>
            {t.journey.timeline}
          </h3>
          <ol className="mt-6">
            {entries.map((e, i) => (
              <li
                key={e.key}
                className="grid grid-cols-[6.5rem_1fr] gap-x-6 py-5 even:bg-desk-3/40 sm:grid-cols-[8rem_1fr]"
                data-reveal
                style={{ "--i": Math.min(i, 4) } as React.CSSProperties}
              >
                <p className="pl-3 font-cond text-2xl font-bold">{e.when}</p>
                <div className="pr-3">
                  <p className="text-lg font-semibold">{e.title}</p>
                  <p className="text-base text-on-desk-soft">{e.detail}</p>
                </div>
              </li>
            ))}
          </ol>
          <a
            href={profile.links.credly}
            target="_blank"
            rel="noopener noreferrer"
            className="link mt-6 inline-block text-lg"
            data-reveal
          >
            {t.journey.credly}
          </a>
        </div>
      </div>
    </section>
  );
}
