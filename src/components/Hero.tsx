import Image from "next/image";
import { profile } from "@/content/profile";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";

export function Hero({ lang, t }: { lang: Locale; t: Dictionary }) {
  return (
    <section className="relative overflow-hidden px-5 pb-16 pt-28 sm:pt-32">
      <div className="mx-auto max-w-6xl">
        <div className="relative pb-20 sm:pb-0">
          <h1
            className="reveal font-display uppercase leading-[0.9] tracking-tight text-foreground/90"
            style={{ fontSize: "clamp(3.2rem, 14vw, 11rem)" }}
          >
            <span className="block">{t.hero.hi}</span>
            <span className="block gradient-text">{profile.firstName}</span>
          </h1>

          <div
            className="pointer-events-none absolute right-0 top-[34%] z-10 w-[clamp(9rem,30vw,20rem)] sm:right-[10%] sm:top-[6%]"
            style={{
              maskImage: "radial-gradient(closest-side, #000 62%, transparent 100%)",
              WebkitMaskImage: "radial-gradient(closest-side, #000 62%, transparent 100%)",
            }}
          >
            <Image
              src="/images/avatar.png"
              alt={t.hero.avatarAlt}
              width={200}
              height={200}
              priority
              sizes="(max-width: 640px) 9rem, 20rem"
              className="h-auto w-full mix-blend-lighten"
            />
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-8 sm:mt-14 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-sm">
            <p className="font-mono text-xs uppercase tracking-widest text-muted">{profile.role[lang]}</p>
            <p className="mt-3 text-base leading-relaxed text-foreground/85">{t.hero.sub}</p>
            <p className="mt-2 font-mono text-xs text-muted">{profile.stackLine}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a
              href="#contact"
              className="gradient-border inline-flex items-center px-7 py-3 text-xs font-extrabold uppercase tracking-widest transition-transform hover:scale-105"
            >
              {t.hero.cta}
            </a>
            <a
              href="#projects"
              className="inline-flex items-center rounded-full border border-border px-7 py-3 text-xs font-bold uppercase tracking-widest text-muted transition-colors hover:text-foreground"
            >
              {t.hero.ctaProjects}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
