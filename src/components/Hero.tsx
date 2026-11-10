import { profile } from "@/content/profile";
import type { Dictionary } from "@/i18n/dictionaries";
import { LogoMark } from "./Logo";

// Un punto de la paleta por área de enfoque: el color acompaña, no encierra
const DOTS = ["bg-cream", "bg-slate", "bg-orange"];

export function Hero({ t }: { t: Dictionary }) {
  const [first, ...rest] = profile.name.split(" ");
  const lineOne = `${first} ${rest[0]}`;
  const lineTwo = rest.slice(1).join(" ");

  return (
    <section className="hero-glow">
      <div className="mx-auto grid min-h-[100svh] w-full max-w-[90rem] items-center gap-x-16 gap-y-14 px-5 pb-20 pt-32 sm:px-8 lg:grid-cols-[1.3fr_1fr] lg:pt-36">
        <div>
          <p data-load style={{ "--d": "60ms" } as React.CSSProperties} className="text-xl text-cream-soft">
            {t.hero.greeting}
          </p>
          <h1 className="display lines mt-2" style={{ fontSize: "clamp(3.2rem, 6.6vw, 7rem)" }}>
            <span className="line">
              <span data-line style={{ "--i": 0 } as React.CSSProperties}>
                {lineOne}
              </span>
            </span>
            <span className="line">
              <span data-line style={{ "--i": 1 } as React.CSSProperties} className="text-orange">
                {lineTwo}
              </span>
            </span>
          </h1>
          <p data-load style={{ "--d": "380ms" } as React.CSSProperties} className="mt-6 font-display text-2xl font-bold">
            {t.hero.role}
          </p>
          <p data-load style={{ "--d": "440ms" } as React.CSSProperties} className="mt-4 max-w-xl text-xl leading-snug">
            {t.hero.sub}
          </p>
          <div data-load style={{ "--d": "520ms" } as React.CSSProperties} className="mt-9 flex flex-wrap gap-3">
            <a href="#measure" className="btn btn--accent">
              {t.hero.cta}
            </a>
            <a href="#projects" className="btn btn--quiet">
              {t.hero.secondary}
            </a>
          </div>
        </div>

        <div data-load style={{ "--d": "300ms" } as React.CSSProperties} className="lg:justify-self-end">
          <div className="relative isolate w-fit">
            {/* Halo: un resplandor detrás de la marca, sin borde */}
            <div
              aria-hidden="true"
              className="absolute -inset-10 -z-10 rounded-full opacity-70"
              style={{ background: "radial-gradient(closest-side, color-mix(in oklab, var(--orange) 35%, transparent), transparent)" }}
            />
            <LogoMark className="h-28 w-28 sm:h-40 sm:w-40" title={profile.name} />
          </div>
          <ul className="mt-10 space-y-4">
            {t.hero.focus.slice(0, 3).map((label, i) => (
              <li key={label} className="flex items-center gap-4">
                <span aria-hidden="true" className={`h-3 w-3 shrink-0 rounded-full ${DOTS[i]}`} />
                <span className="font-display text-2xl font-bold sm:text-3xl">{label}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
