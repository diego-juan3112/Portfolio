/**
 * Logos del portafolio. Seis propuestas, todas geométricas (sin depender de una fuente) para que el
 * mismo dibujo sirva de favicon. `LOGO_VARIANT` elige la que se usa en todo el sitio.
 *
 * - monogram: J y D en un solo trazo; el punto naranja dentro de la D es «el dato dentro de la fuente».
 * - badge:    sello redondeado con «jd» en minúscula; el punto de la j es el dato, en naranja.
 * - summit:   tres nodos (entrada → modelo → salida) que dibujan una cumbre: datos que suben a una
 *             respuesta, y las montañas de Manizales.
 * - sunset:   insignia retro: el sol de los 70 a franjas se oculta tras el Nevado del Ruiz.
 * - cited:    burbuja de chat con «jd» y un superíndice naranja: la respuesta lleva su fuente.
 *             Sobre fondos claros, define --bubble y --bubble-text para invertirla.
 * - cablecar: la cabina del cable aéreo de Manizales sube por la línea con paquetes de datos detrás.
 *
 */
export type LogoVariant = "monogram" | "badge" | "summit" | "sunset" | "cited" | "cablecar";

export const LOGO_VARIANT: LogoVariant = "cited";

type MarkProps = { variant?: LogoVariant; className?: string; title?: string };

export function LogoMark({ variant = LOGO_VARIANT, className, title }: MarkProps) {
  const a11y = title ? { role: "img", "aria-label": title } : { "aria-hidden": true };
  switch (variant) {
    case "sunset":
      return (
        <svg viewBox="0 0 64 64" className={className} {...a11y}>
          <circle cx="32" cy="32" r="29" fill="var(--slate)" />
          <circle cx="32" cy="36" r="17" fill="var(--orange)" />
          {/* franjas del sol de los 70: del color del cielo, solo se ven sobre el sol */}
          <rect x="6" y="30" width="52" height="1.8" fill="var(--slate)" />
          <rect x="6" y="34.5" width="52" height="2.6" fill="var(--slate)" />
          <rect x="6" y="39.5" width="52" height="3.4" fill="var(--slate)" />
          <path d="M9.3 50 21 35l6 6 11-17 16.7 26a29 29 0 0 1-45.4 0z" fill="var(--carbon)" />
          <path d="M38 24l3.85 6-2.25-1.2-2 2.2-2-2-1.5 1z" fill="var(--cream)" />
          <path d="M21 35l3.5 3.5-1.9-.9L21 39l-1.4-1.2-1.3.7z" fill="var(--cream)" />
          <circle cx="32" cy="32" r="29" fill="none" stroke="var(--cream)" strokeWidth="3.5" />
        </svg>
      );
    case "cited":
      return (
        <svg viewBox="0 0 64 64" className={className} {...a11y}>
          <rect x="5" y="9" width="48" height="39" rx="14" fill="var(--bubble, var(--cream))" />
          <path d="M13 44 9 57l16-11z" fill="var(--bubble, var(--cream))" />
          <circle cx="19.5" cy="17" r="3.4" fill="var(--bubble-text, var(--ink))" />
          <path d="M16.5 23h6v16a7 7 0 0 1-7 7h-2v-5.2h2a1.8 1.8 0 0 0 1-1.6z" fill="var(--bubble-text, var(--ink))" />
          <circle cx="34.5" cy="35.5" r="6.8" fill="none" stroke="var(--bubble-text, var(--ink))" strokeWidth="5.4" />
          <rect x="38.6" y="17" width="5.4" height="26" rx="2.7" fill="var(--bubble-text, var(--ink))" />
          {/* superíndice: la fuente de la respuesta */}
          <circle cx="53" cy="11" r="9" fill="var(--orange)" />
          <path d="M51.2 7.6 54.6 6v10" fill="none" stroke="var(--ink)" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "cablecar":
      return (
        <svg viewBox="0 0 64 64" className={className} {...a11y}>
          <path d="M3 14 61 37" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
          <circle cx="11" cy="17.2" r="3.4" fill="var(--slate)" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="20" cy="20.8" r="3.4" fill="var(--slate)" stroke="currentColor" strokeWidth="1.5" />
          <path d="M38 28.6V35" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
          <rect x="24" y="34" width="28" height="22" rx="7" fill="var(--orange)" />
          <rect x="28" y="38" width="9" height="8.5" rx="2.4" fill="var(--cream)" />
          <rect x="39" y="38" width="9" height="8.5" rx="2.4" fill="var(--cream)" />
          <rect x="24" y="50" width="28" height="2.6" fill="var(--carbon)" opacity=".35" />
        </svg>
      );
    case "badge":
      return (
        <svg viewBox="0 0 64 64" className={className} {...a11y}>
          <rect width="64" height="64" rx="18" fill="var(--slate)" />
          {/* j: asta con gancho y punto naranja */}
          <path d="M19 27h7v23a11 11 0 0 1-11 11h-3v-7h3a4 4 0 0 0 4-4z" fill="var(--cream)" />
          <circle cx="22.5" cy="18.5" r="4.5" fill="var(--orange)" />
          {/* d: cuenco y asta */}
          <circle cx="39" cy="40" r="9.5" fill="none" stroke="var(--cream)" strokeWidth="7" />
          <rect x="45" y="13" width="7" height="39" rx="3.5" fill="var(--cream)" />
        </svg>
      );
    case "summit":
      return (
        <svg viewBox="0 0 64 64" className={className} {...a11y}>
          <path
            d="M10 48 32 16 54 48"
            fill="none"
            stroke="currentColor"
            strokeWidth="6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="10" cy="48" r="7" fill="var(--slate)" stroke="currentColor" strokeWidth="3" />
          <circle cx="32" cy="16" r="7" fill="var(--cream)" stroke="currentColor" strokeWidth="3" />
          <circle cx="54" cy="48" r="8" fill="var(--orange)" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 64 64" className={className} {...a11y}>
          {/* J */}
          <path
            d="M19 9v30a8 8 0 0 1-16 0"
            fill="none"
            stroke="currentColor"
            strokeWidth="8"
            strokeLinecap="round"
          />
          {/* D */}
          <path
            d="M33 9h7a23 23 0 0 1 0 46h-7z"
            fill="none"
            stroke="currentColor"
            strokeWidth="8"
            strokeLinejoin="round"
          />
          <circle cx="41" cy="32" r="6" fill="var(--orange)" />
        </svg>
      );
  }
}

/** Marca + nombre. `compact` muestra solo «Juan Diego» (cabecera en pantallas pequeñas). */
export function Logo({ variant, compact = false, className }: { variant?: LogoVariant; compact?: boolean; className?: string }) {
  return (
    <span className={`items-center gap-3 ${className ?? "inline-flex"}`}>
      <LogoMark variant={variant} className="h-9 w-9 shrink-0" />
      <span className="flex flex-col leading-none">
        <span className="font-display text-lg font-bold tracking-tight">Juan Diego</span>
        {!compact && <span className="mt-1 text-sm text-cream-soft">Henao Quintero</span>}
      </span>
    </span>
  );
}
