import { competencies, vuForEvidence } from "@/content/competencies";
import { profile } from "@/content/profile";
import type { Locale } from "@/i18n/config";
import { fill, type Dictionary } from "@/i18n/dictionaries";
import { describeSource, type Source } from "@/lib/ai/sources";
import { Bridge, type Channel } from "./Bridge";

export function Hero({ lang, t }: { lang: Locale; t: Dictionary }) {
  const channels: Channel[] = competencies.map((c) => ({
    id: c.id,
    label: c.label[lang],
    vu: vuForEvidence(c.evidence.length),
    evidenceLabel:
      c.evidence.length === 1 ? t.hero.evidenceOne : fill(t.hero.evidenceMany, { n: c.evidence.length }),
    sources: c.evidence.map((id) => describeSource(id, lang)).filter((s): s is Source => s !== null),
  }));

  const [first, ...rest] = profile.name.split(" ");
  const lineOne = `${first} ${rest[0]}`;
  const lineTwo = rest.slice(1).join(" ");

  return (
    <section className="mx-auto w-full max-w-[90rem] px-5 pb-24 pt-10 sm:px-8 sm:pt-16">
      <div className="grid items-end gap-x-12 gap-y-8 lg:grid-cols-[1.4fr_1fr]">
        <h1 className="display lines" style={{ fontSize: "clamp(3.4rem, 9.5vw, 9.25rem)" }}>
          <span className="line">
            <span data-line style={{ "--i": 0 } as React.CSSProperties}>
              {lineOne}
            </span>
          </span>
          <span className="line">
            <span data-line style={{ "--i": 1 } as React.CSSProperties}>
              {lineTwo}
            </span>
          </span>
        </h1>
        <div className="max-w-xl lg:pb-3">
          <p data-load style={{ "--d": "420ms" } as React.CSSProperties} className="text-xl leading-snug">
            {t.hero.sub}
          </p>
          <div data-load style={{ "--d": "500ms" } as React.CSSProperties} className="mt-8 flex flex-wrap gap-3">
            <a href="#measure" className="btn btn--red">
              {t.hero.cta}
            </a>
            <a href="#projects" className="btn btn--quiet">
              {t.hero.secondary}
            </a>
          </div>
        </div>
      </div>

      <div className="mt-14 sm:mt-20">
        <Bridge
          channels={channels}
          title={t.hero.bridgeTitle}
          note={t.hero.bridgeNote}
          evidenceTitle={t.hero.evidenceTitle}
        />
      </div>
    </section>
  );
}
