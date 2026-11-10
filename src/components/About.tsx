import Image from "next/image";
import { profile } from "@/content/profile";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { profilePhoto } from "@/lib/projectMedia";
import { LogoMark } from "./Logo";

/** Descripción general: quién soy, qué hago y qué busco, con cifras reales y la foto. */
export function About({ lang, t }: { lang: Locale; t: Dictionary }) {
  const photo = profilePhoto();
  const facts = [
    { label: t.about.location, value: profile.location },
    { label: t.about.education, value: profile.education[lang] },
    { label: t.about.languages, value: profile.languages[lang] },
  ];

  return (
    <section id="about" aria-labelledby="about-title" className="wash-slate">
      <div className="mx-auto grid w-full max-w-[90rem] items-center gap-x-16 gap-y-14 px-5 py-24 sm:px-8 sm:py-32 lg:grid-cols-[1.25fr_1fr]">
        <div className="min-w-0">
          <h2 id="about-title" className="display text-5xl sm:text-7xl" data-reveal>
            {t.about.title}
          </h2>
          {t.about.description.map((paragraph, i) => (
            <p
              key={i}
              className="mt-6 max-w-2xl text-xl leading-relaxed first:mt-8 sm:text-2xl"
              data-reveal
              style={{ "--i": i + 1 } as React.CSSProperties}
            >
              {paragraph}
            </p>
          ))}

          {/* Cifras en línea, separadas por un filete: sin tarjetas */}
          <ul className="mt-12 grid grid-cols-3 divide-x divide-cream/15">
            {t.about.stats.map((s, i) => (
              <li key={s.label} className="px-4 first:pl-0" data-reveal style={{ "--i": i + 3 } as React.CSSProperties}>
                <p className="display text-5xl text-orange sm:text-6xl">{s.value}</p>
                <p className="mt-2 text-sm leading-snug text-cream-soft sm:text-base">{s.label}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="min-w-0 lg:justify-self-end">
          {/* Arco para la foto: duotono de la paleta (sombras pizarra, luces naranja) y fundido inferior.
              Sin foto en public/images/profile/ muestra el espacio reservado con el logo. */}
          <figure className="photo-arch mx-auto lg:mx-0" data-reveal>
            {photo ? (
              <Image
                src={photo}
                alt={t.about.photoAlt}
                fill
                sizes="(min-width: 1024px) 26rem, 80vw"
                className="photo-arch__img"
              />
            ) : (
              <LogoMark className="absolute left-1/2 top-[38%] h-24 w-24 -translate-x-1/2 opacity-40" />
            )}
          </figure>

          <dl className="mt-8 grid gap-4 sm:grid-cols-3" data-reveal>
            {facts.map((f) => (
              <div key={f.label}>
                <dt className="font-display text-base font-bold text-cream-soft">{f.label}</dt>
                <dd className="mt-1 text-base leading-snug">{f.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
