import Link from "next/link";
import { profile } from "@/content/profile";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";

export function Header({ lang, t }: { lang: Locale; t: Dictionary }) {
  const links = [
    { href: "#projects", label: t.nav.projects },
    { href: "#journey", label: t.nav.journey },
    { href: "#assistant", label: t.nav.assistant },
    { href: "#contact", label: t.nav.contact },
  ];
  return (
    <header className="mx-auto flex w-full max-w-[90rem] flex-wrap items-center justify-between gap-x-8 gap-y-3 px-5 py-5 sm:px-8">
      <Link href={`/${lang}`} className="font-cond text-xl font-bold tracking-tight">
        {profile.name}
      </Link>
      <nav aria-label={t.nav.label} className="flex flex-wrap items-center gap-x-6 gap-y-2 text-base">
        {links.map((l) => (
          <a key={l.href} href={l.href} className="link">
            {l.label}
          </a>
        ))}
        <Link
          href={`/${t.lang.code}`}
          hrefLang={t.lang.code}
          lang={t.lang.code}
          className="link text-on-desk-soft"
        >
          {t.lang.switch}
        </Link>
        <a href="#measure" className="btn btn--quiet min-h-11">
          {t.nav.measure}
        </a>
      </nav>
    </header>
  );
}
