import { achievements, certifications } from "@/content/profile";
import { projects } from "@/content/projects";
import type { Locale } from "@/i18n/config";

/** Línea final con la que el modelo declara sus fuentes (ver chatSystemPrompt). */
export const SOURCES_MARKER = "FUENTES:";

export type Source = { id: string; label: string; href: string };

/** Separa el texto visible de la línea de fuentes, que puede llegar a medias durante el streaming. */
export function parseAnswer(raw: string): { body: string; sourceIds: string[] } {
  const index = raw.indexOf(SOURCES_MARKER);
  // Mientras llega la línea de fuentes, oculta un prefijo parcial ("FUEN…") al final del texto
  const partial = index === -1 ? raw.search(/\n?F(U(E(N(T(E(S)?)?)?)?)?)?$/) : -1;
  const body = (index === -1 ? (partial === -1 ? raw : raw.slice(0, partial)) : raw.slice(0, index))
    // Red de seguridad: borra identificadores entre corchetes si el modelo los escribe igual
    .replace(/\s?\[[a-z0-9:_-]+\]/gi, "")
    .trim();
  const sourceIds =
    index === -1
      ? []
      : raw
          .slice(index + SOURCES_MARKER.length)
          .split(",")
          .map((s) => s.trim().toLowerCase())
          .filter(Boolean);
  return { body, sourceIds };
}

export function describeSource(id: string, lang: Locale): Source | null {
  const [kind, key] = id.split(":");
  const es = lang === "es";
  switch (kind) {
    case "perfil":
      return { id, label: es ? "Perfil" : "Profile", href: "#about" };
    case "educacion":
      return { id, label: es ? "Educación" : "Education", href: "#about" };
    case "habilidades":
      return { id, label: es ? "Habilidades" : "Skills", href: "#about" };
    case "experiencia":
      return { id, label: es ? "Experiencia" : "Experience", href: "#about" };
    case "proyecto": {
      const project = projects.find((p) => p.slug === key);
      return project ? { id, label: project.title, href: `#project-${project.slug}` } : null;
    }
    case "logro": {
      const achievement = achievements.find((a) => a.id === key);
      return achievement
        ? { id, label: `${achievement.title[lang]} · ${achievement.date}`, href: "#achievements" }
        : null;
    }
    case "certificacion": {
      const cert = certifications.find((c) => c.id === key);
      return cert ? { id, label: cert.name, href: "#achievements" } : null;
    }
    default:
      return null;
  }
}
