import {
  achievements,
  certifications,
  experience,
  profile,
  skillGroups,
} from "@/content/profile";
import { projects } from "@/content/projects";

/**
 * Corpus de conocimiento para la IA, generado desde `src/content`.
 * El modelo solo puede afirmar lo que está aquí; cada bloque lleva una etiqueta [fuente] para citar.
 */
export function buildKnowledge(): string {
  const lines: string[] = [];

  lines.push(`[perfil] ${profile.name}, ${profile.role.es}. ${profile.location}. ${profile.summary.es}`);
  lines.push(`[educacion] ${profile.education.es}. Idiomas: ${profile.languages.es}.`);
  lines.push(
    `[habilidades] ${skillGroups.map((g) => `${g.label.es}: ${g.items.join(", ")}`).join(" | ")}`,
  );
  lines.push(
    `[experiencia] ${experience.title} (${experience.org}, ${experience.duration.es}). ${experience.bullets.es.join(" ")}`,
  );
  for (const a of achievements) {
    lines.push(`[logro:${a.id}] ${a.date} ${a.title.es}. ${a.detail.es}`);
  }
  for (const c of certifications) {
    lines.push(`[certificacion:${c.id}] ${c.name} (${c.date}).`);
  }
  for (const p of projects) {
    lines.push(
      `[proyecto:${p.slug}] ${p.title} — ${p.tagline.es}. ${p.description.es} Stack: ${p.tags.join(", ")}. Repo: ${p.repo}${p.demo ? ` Demo: ${p.demo}` : ""}`,
    );
  }
  return lines.join("\n");
}

export const KNOWLEDGE = buildKnowledge();
