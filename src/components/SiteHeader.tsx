"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { profile } from "@/content/profile";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { Logo } from "./Logo";

const SECTIONS = ["about", "measure", "projects", "journey", "assistant", "contact"] as const;
type SectionId = (typeof SECTIONS)[number];

/**
 * Cabecera fija y siempre visible: transparente sobre el hero y con fondo al bajar (solo cambia la
 * opacidad de una capa). Barra de progreso de lectura en degradado y sección activa resaltada.
 * El menú de hamburguesa abre un panel a pantalla completa (Esc o un enlace lo cierran).
 */
export function SiteHeader({ lang, t }: { lang: Locale; t: Dictionary }) {
  const headerRef = useRef<HTMLElement>(null);
  const burgerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<SectionId | null>(null);

  // Estado de scroll: fondo y progreso, sin re-render (un atributo y una variable CSS)
  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;
    let frame = 0;
    const update = () => {
      const y = scrollY;
      const max = document.documentElement.scrollHeight - innerHeight;
      const scrolled = String(y > 24);
      if (header.dataset.scrolled !== scrolled) header.dataset.scrolled = scrolled;
      header.style.setProperty("--progress", String(max > 0 ? Math.min(1, y / max) : 0));
    };
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };
    update();
    addEventListener("scroll", onScroll, { passive: true });
    return () => {
      removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  // Sección activa: la que cruza la franja central de la pantalla
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id as SectionId);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    SECTIONS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  // Menú abierto: bloquea el scroll, Esc cierra, el foco queda atrapado dentro y vuelve al botón al cerrar
  useEffect(() => {
    const header = headerRef.current;
    if (header) header.dataset.menu = open ? "open" : "closed";
    if (!open) return;
    document.body.style.overflow = "hidden";
    const first = menuRef.current?.querySelector<HTMLElement>("a, button");
    first?.focus();
    const burger = burgerRef.current;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
      if (e.key !== "Tab" || !menuRef.current) return;
      const focusables = [burger, ...menuRef.current.querySelectorAll<HTMLElement>("a, button")].filter(
        (el): el is HTMLElement => !!el,
      );
      const i = focusables.indexOf(document.activeElement as HTMLElement);
      const next = e.shiftKey ? (i <= 0 ? focusables.length - 1 : i - 1) : (i + 1) % focusables.length;
      e.preventDefault();
      focusables[next].focus();
    };
    addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      removeEventListener("keydown", onKey);
      burger?.focus();
    };
  }, [open]);

  const inline: SectionId[] = ["about", "projects", "journey", "contact"];

  return (
    <>
      <a
        href="#main"
        className="btn btn--accent fixed left-4 top-4 z-50 -translate-y-24 focus-visible:translate-y-0"
      >
        {t.nav.skip}
      </a>

      <header ref={headerRef} className="site-header" data-scrolled="false">
        <div className="mx-auto flex h-full w-full max-w-[90rem] items-center justify-between gap-6 px-5 sm:px-8">
          <Link href={`/${lang}`} aria-label={profile.name} onClick={() => setOpen(false)}>
            <Logo className="inline-flex sm:hidden" compact />
            <Logo className="hidden sm:inline-flex" />
          </Link>

          <nav aria-label={t.nav.label} className="flex items-center gap-2">
            <ul className="mr-2 hidden items-center gap-1 lg:flex">
              {inline.map((id) => (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    aria-current={active === id ? "location" : undefined}
                    className="rounded-full px-4 py-2 text-base text-cream-soft transition-colors hover:text-cream aria-[current=location]:bg-carbon-3 aria-[current=location]:text-cream"
                  >
                    {t.nav[id]}
                  </a>
                </li>
              ))}
            </ul>
            <a href="#measure" className="btn btn--accent hidden min-h-11 sm:inline-flex">
              {t.nav.measure}
            </a>
            <button
              ref={burgerRef}
              type="button"
              className="burger"
              aria-expanded={open}
              aria-controls="site-menu"
              aria-label={open ? t.nav.close : t.nav.open}
              onClick={() => setOpen((o) => !o)}
            >
              <span />
              <span />
              <span />
            </button>
          </nav>
        </div>
        <div className="site-header__progress" aria-hidden="true" />
      </header>

      <div
        ref={menuRef}
        id="site-menu"
        className="menu"
        data-open={open}
        role="dialog"
        aria-modal="true"
        aria-label={t.menu.title}
        aria-hidden={!open}
        inert={!open}
      >
        <div className="mx-auto grid h-full w-full max-w-[90rem] content-start gap-12 overflow-y-auto px-5 pb-10 pt-28 sm:px-8 lg:grid-cols-[1.4fr_1fr] lg:content-center">
          <ul className="space-y-1">
            {SECTIONS.map((id, i) => (
              <li key={id} className="menu__item" style={{ "--i": i } as React.CSSProperties}>
                <a
                  href={`#${id}`}
                  onClick={() => setOpen(false)}
                  aria-current={active === id ? "location" : undefined}
                  className="group flex flex-wrap items-baseline gap-x-5 gap-y-1 py-2"
                >
                  <span className="display text-5xl text-cream transition-colors group-hover:text-orange group-aria-[current=location]:text-orange sm:text-6xl">
                    {t.nav[id]}
                  </span>
                  <span className="text-base text-cream-soft">{t.menu[id]}</span>
                </a>
              </li>
            ))}
          </ul>

          <div className="menu__item space-y-6 self-end" style={{ "--i": SECTIONS.length } as React.CSSProperties}>
            <Link
              href={`/${t.lang.code}`}
              hrefLang={t.lang.code}
              lang={t.lang.code}
              className="btn btn--quiet"
              onClick={() => setOpen(false)}
            >
              {t.lang.switch}
            </Link>
            <div>
              <p className="text-base text-cream-soft">{t.menu.follow}</p>
              <ul className="mt-2 flex flex-wrap gap-x-6 gap-y-2 text-lg">
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
                <li>
                  <a href={`mailto:${profile.email}`} className="link">
                    {profile.email}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
