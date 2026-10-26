import type { Localized } from "./profile";

/**
 * Canales del puente de vúmetros, en dos grupos de cuatro (una fila de medidores por grupo).
 * La aguja de cada canal cuenta sus pruebas públicas (ids de fuente de src/lib/ai/sources.ts):
 * proyectos, experiencia, logros y certificaciones. Añadir o quitar una prueba aquí mueve la aguja;
 * no hay porcentajes inventados. Los canales son áreas generales, no herramientas sueltas: el detalle
 * de stack vive en cada proyecto.
 */
export type CompetencyGroup = "data-ai" | "product";

export type Competency = {
  id: string;
  group: CompetencyGroup;
  label: Localized<string>;
  evidence: string[];
};

export const competencyGroups: { id: CompetencyGroup; label: Localized<string> }[] = [
  { id: "data-ai", label: { es: "Datos e IA", en: "Data & AI" } },
  { id: "product", label: { es: "Producto y entrega", en: "Product & delivery" } },
];

export const competencies: Competency[] = [
  // Datos e IA: la especialidad que busca el perfil
  {
    id: "ai-agents",
    group: "data-ai",
    label: { es: "IA y agentes", en: "AI & agents" },
    evidence: ["proyecto:kognia-voice-agent", "logro:colombia-5-0", "proyecto:tactical-grid"],
  },
  {
    id: "machine-learning",
    group: "data-ai",
    label: { es: "Machine learning", en: "Machine learning" },
    evidence: ["proyecto:alerta-ciudadana"],
  },
  {
    id: "data-engineering",
    group: "data-ai",
    label: { es: "Ingeniería de datos", en: "Data engineering" },
    evidence: [
      "proyecto:kognia-voice-agent",
      "proyecto:alerta-ciudadana",
      "logro:talento-tech-2023",
      "logro:talento-tech-2025",
    ],
  },
  {
    id: "databases",
    group: "data-ai",
    label: { es: "Bases de datos", en: "Databases" },
    evidence: ["experiencia"],
  },
  // Producto y entrega: cómo llega el trabajo a producción
  {
    id: "backend",
    group: "product",
    label: { es: "Backend y APIs", en: "Backend & APIs" },
    evidence: [
      "proyecto:kognia-voice-agent",
      "proyecto:alerta-ciudadana",
      "experiencia",
      "proyecto:san-jose-cuadernillos",
    ],
  },
  {
    id: "cloud",
    group: "product",
    label: { es: "Cloud y despliegue", en: "Cloud & deployment" },
    evidence: ["certificacion:aws-academy", "certificacion:aws-educate", "proyecto:kognia-voice-agent"],
  },
  {
    id: "frontend",
    group: "product",
    label: { es: "Frontend y móvil", en: "Frontend & mobile" },
    evidence: ["proyecto:kognia-voice-agent", "proyecto:alerta-ciudadana"],
  },
  {
    id: "hackathons",
    group: "product",
    label: { es: "Hackathones", en: "Hackathons" },
    evidence: [
      "logro:talento-tech-2023",
      "logro:talento-tech-2025",
      "logro:colombia-5-0",
      "proyecto:kognia-voice-agent",
      "proyecto:alerta-ciudadana",
    ],
  },
];

/** Nivel en la escala VU según el número de pruebas: 3 o más ya pasa de cero. */
export function vuForEvidence(count: number): number {
  return [-20, -7, -3, 0, 2][Math.min(count, 4)];
}
