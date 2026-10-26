"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import type { ProjectImage } from "@/lib/projectMedia";

type Props = {
  title: string;
  images: ProjectImage[];
  labels: { previous: string; next: string; count: string; region: string }; // count: plantilla {i} y {n}
  children: React.ReactNode; // primera diapositiva: el fragmento de interfaz del proyecto
};

/**
 * Carrusel de un proyecto: el fragmento de interfaz y, detrás, las capturas de public/projects/<slug>/.
 * Desplazamiento nativo con scroll-snap (táctil, trackpad y teclado), arrastre con ratón y botones.
 * Con una sola diapositiva no muestra controles.
 */
export function ProjectCarousel({ title, images, labels, children }: Props) {
  const trackRef = useRef<HTMLUListElement>(null);
  const drag = useRef<{ x: number; left: number; moved: boolean } | null>(null);
  const suppressClick = useRef(false); // el click llega después del pointerup
  const [index, setIndex] = useState(0);
  const total = images.length + 1;

  const goTo = useCallback((i: number) => {
    const track = trackRef.current;
    if (!track) return;
    const target = Math.max(0, Math.min(i, track.children.length - 1));
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    track.scrollTo({ left: target * track.clientWidth, behavior: reduced ? "auto" : "smooth" });
  }, []);

  // La diapositiva actual se deriva de la posición del scroll, venga de botón, dedo o teclado
  useEffect(() => {
    const track = trackRef.current;
    if (!track || total < 2) return;
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => setIndex(Math.round(track.scrollLeft / track.clientWidth)));
    };
    track.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      track.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, [total]);

  if (total < 2) return <>{children}</>;

  // Arrastre con ratón (el táctil ya desplaza de forma nativa)
  const onPointerDown = (e: React.PointerEvent<HTMLUListElement>) => {
    if (e.pointerType !== "mouse" || !trackRef.current) return;
    drag.current = { x: e.clientX, left: trackRef.current.scrollLeft, moved: false };
    trackRef.current.setPointerCapture(e.pointerId);
    trackRef.current.dataset.dragging = "true";
  };
  const onPointerMove = (e: React.PointerEvent<HTMLUListElement>) => {
    const d = drag.current;
    const track = trackRef.current;
    if (!d || !track) return;
    const dx = e.clientX - d.x;
    if (Math.abs(dx) > 4) d.moved = true;
    track.scrollLeft = d.left - dx;
  };
  const onPointerUp = (e: React.PointerEvent<HTMLUListElement>) => {
    const d = drag.current;
    const track = trackRef.current;
    if (!d || !track) return;
    drag.current = null;
    suppressClick.current = d.moved;
    delete track.dataset.dragging;
    track.releasePointerCapture(e.pointerId);
    // Suelta hacia la diapositiva siguiente si el gesto recorrió más de un 15 % del ancho
    const dx = e.clientX - d.x;
    const start = Math.round(d.left / track.clientWidth);
    const step = Math.abs(dx) > track.clientWidth * 0.15 ? (dx < 0 ? 1 : -1) : 0;
    goTo(start + step);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      goTo(index + 1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      goTo(index - 1);
    }
  };

  return (
    <div className="carousel" role="region" aria-roledescription="carousel" aria-label={`${labels.region}: ${title}`}>
      <ul
        ref={trackRef}
        className="carousel__track"
        tabIndex={0}
        onKeyDown={onKeyDown}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onClickCapture={(e) => {
          // Un arrastre no debe activar enlaces dentro de la diapositiva
          if (suppressClick.current) {
            e.preventDefault();
            suppressClick.current = false;
          }
        }}
      >
        <li className="carousel__slide" aria-roledescription="slide" aria-label={labels.count.replace("{i}", "1").replace("{n}", String(total))}>
          {children}
        </li>
        {images.map((img, i) => (
          <li
            key={img.src}
            className="carousel__slide"
            aria-roledescription="slide"
            aria-label={labels.count.replace("{i}", String(i + 2)).replace("{n}", String(total))}
          >
            <div className="carousel__frame">
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="object-contain"
                draggable={false}
              />
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-4 flex items-center gap-3">
        <button
          type="button"
          className="btn btn--quiet min-h-11 px-4"
          onClick={() => goTo(index - 1)}
          disabled={index === 0}
          aria-label={labels.previous}
        >
          <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true">
            <path d="M10 3 5 8l5 5" fill="none" stroke="currentColor" strokeWidth="2" />
          </svg>
        </button>
        <button
          type="button"
          className="btn btn--quiet min-h-11 px-4"
          onClick={() => goTo(index + 1)}
          disabled={index === total - 1}
          aria-label={labels.next}
        >
          <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true">
            <path d="m6 3 5 5-5 5" fill="none" stroke="currentColor" strokeWidth="2" />
          </svg>
        </button>
        <p className="text-base text-on-desk-soft" aria-live="polite">
          {labels.count.replace("{i}", String(index + 1)).replace("{n}", String(total))}
        </p>
      </div>
    </div>
  );
}
