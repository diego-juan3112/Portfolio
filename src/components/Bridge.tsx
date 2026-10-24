"use client";

import { useEffect, useRef, useState } from "react";
import { Meter } from "./Meter";

export type Channel = {
  id: string;
  label: string;
  vu: number;
  evidenceLabel: string;
  sources: { id: string; label: string; href: string }[];
};

type Props = {
  channels: Channel[];
  title: string;
  note: string;
  evidenceTitle: string; // plantilla con {label}
};

/** Fila de vúmetros. Las agujas suben juntas al cargar; un canal abierto muestra sus pruebas. */
export function Bridge({ channels, title, note, evidenceTitle }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState<string | null>(null);
  const selected = channels.find((c) => c.id === open);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const frame = requestAnimationFrame(() => el.classList.add("is-live"));
    // El temblor de las agujas solo corre mientras el puente está en pantalla
    const io = new IntersectionObserver(([entry]) => el.classList.toggle("is-visible", entry.isIntersecting));
    io.observe(el);
    return () => {
      cancelAnimationFrame(frame);
      io.disconnect();
    };
  }, []);

  return (
    <div ref={ref} className="bridge">
      <h2 className="sr-only">{title}</h2>
      <ul className="grid grid-cols-2 gap-px bg-desk-3 sm:grid-cols-4 xl:grid-cols-8">
        {channels.map((c, i) => (
          <li key={c.id} className="bg-desk-2">
            <button
              type="button"
              aria-expanded={open === c.id}
              aria-controls="bridge-evidence"
              onClick={() => setOpen(open === c.id ? null : c.id)}
              className="group block w-full p-2 text-left transition-colors duration-200 hover:bg-desk-3 aria-expanded:bg-face aria-expanded:text-ink"
            >
              <Meter vu={c.vu} delay={i * 45} />
              <span className="mt-2 block px-1 font-cond text-lg font-semibold leading-tight">{c.label}</span>
              <span className="block px-1 pb-1 text-base text-on-desk-soft group-aria-expanded:text-ink-soft">
                {c.evidenceLabel}
              </span>
            </button>
          </li>
        ))}
      </ul>

      <div id="bridge-evidence" aria-live="polite" className="min-h-14">
        {selected ? (
          <div className="flex flex-wrap items-baseline gap-x-6 gap-y-2 bg-face px-4 py-4 text-ink">
            <p className="font-cond text-lg font-bold">{evidenceTitle.replace("{label}", selected.label)}</p>
            <ul className="flex flex-wrap gap-x-5 gap-y-1">
              {selected.sources.map((s) => (
                <li key={s.id}>
                  <a href={s.href} className="link">
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p className="px-1 pt-4 text-base text-on-desk-soft">{note}</p>
        )}
      </div>
    </div>
  );
}
