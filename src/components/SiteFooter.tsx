import { profile } from "@/content/profile";
import type { Locale } from "@/i18n/config";
import { fill, type Dictionary } from "@/i18n/dictionaries";
import { Logo } from "./Logo";

/** Pie limpio: marca y fecha de última actualización, navegación, contacto y «volver arriba». */
export function SiteFooter({ lang, t }: { lang: Locale; t: Dictionary }) {
  // BUILD_DATE se fija al compilar (next.config.ts): cada despliegue actualiza la fecha
  const updated = new Intl.DateTimeFormat(lang === "es" ? "es-CO" : "en-US", {
    dateStyle: "long",
    timeZone: "America/Bogota",
  }).format(new Date(process.env.BUILD_DATE ?? "2026-01-01"));
  const nav = ["about", "measure", "projects", "journey", "assistant", "contact"] as const;
  return (
    <footer className="mx-auto w-full max-w-[90rem] px-5 pb-10 pt-20 sm:px-8">
      <div className="grid gap-12 md:grid-cols-[1.2fr_1fr_1fr]">
        <div>
          <Logo />
          <p className="mt-5 text-base text-cream-soft">{fill(t.footer.updated, { date: updated })}</p>
        </div>
        <nav aria-label={t.nav.label}>
          <ul className="grid grid-cols-2 gap-x-6 gap-y-2 text-base">
            {nav.map((id) => (
              <li key={id}>
                <a href={`#${id}`} className="link text-cream-soft hover:text-cream">
                  {t.nav[id]}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <ul className="space-y-2 text-base">
          <li>
            <a href={`mailto:${profile.email}`} className="link">
              {profile.email}
            </a>
          </li>
          <li>
            <a href={profile.links.linkedin} target="_blank" rel="noopener noreferrer" className="link">
              LinkedIn
            </a>
          </li>
          <li>
            <a href={profile.links.github} target="_blank" rel="noopener noreferrer" className="link">
              GitHub
            </a>
          </li>
        </ul>
      </div>

      <div className="mt-14 h-px" style={{ background: "var(--grad-line)" }} aria-hidden="true" />
      <div className="mt-6 flex flex-wrap items-center justify-between gap-4 text-sm text-cream-soft">
        <p>
          © {profile.name} · {t.footer.made}
        </p>
        <a href="#main" className="link">
          {t.footer.top} ↑
        </a>
      </div>
    </footer>
  );
}
