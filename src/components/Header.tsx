import Link from "next/link";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";

export function Header({ lang, t }: { lang: Locale; t: Dictionary }) {
  const links = [
    { href: "#about", label: t.nav.about },
    { href: "#projects", label: t.nav.projects },
    { href: "#achievements", label: t.nav.achievements },
    { href: "#contact", label: t.nav.contact },
  ];
  return (
    <header className="absolute inset-x-0 top-0 z-30">
      <nav
        aria-label="Principal"
        className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-5 text-[11px] font-bold uppercase tracking-widest sm:text-xs"
      >
        <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="transition-colors hover:text-accent-via focus-visible:text-accent-via">
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <Link
          href={`/${t.lang.code}`}
          hrefLang={t.lang.code}
          className="rounded-full border border-border px-3 py-1 text-muted transition-colors hover:text-foreground"
          aria-label={`${t.lang.switch} (${lang === "es" ? "EN" : "ES"})`}
        >
          {t.lang.code.toUpperCase()}
        </Link>
      </nav>
    </header>
  );
}
