"use client";

import { useEffect } from "react";

/**
 * Capa de movimiento de la página: revela [data-reveal] y [data-wipe] una sola vez al entrar en
 * pantalla, y parte en palabras la frase [data-fill] para el relleno de tinta ligado al scroll.
 * Sin JS, o con movimiento reducido, todo queda visible en su estado final (ver globals.css).
 */
export function Motion() {
  useEffect(() => {
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const targets = document.querySelectorAll<HTMLElement>("[data-reveal], [data-wipe]");

    if (reduced || !("IntersectionObserver" in window)) {
      targets.forEach((el) => el.classList.add("is-in"));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          e.target.classList.add("is-in");
          io.unobserve(e.target);
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.1 },
    );
    targets.forEach((el) => io.observe(el));

    if (CSS.supports("animation-timeline: view()")) {
      document.querySelectorAll<HTMLElement>("[data-fill]:not(.is-filling)").forEach((el) => {
        const words = (el.textContent ?? "").trim().split(/\s+/);
        el.textContent = "";
        words.forEach((word, i) => {
          const span = document.createElement("span");
          span.textContent = word;
          el.append(span, i < words.length - 1 ? " " : "");
        });
        el.classList.add("is-filling");
      });
    }

    return () => io.disconnect();
  }, []);

  return null;
}
