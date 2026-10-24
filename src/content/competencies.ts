import type { Localized } from "./profile";

/**
 * Canales del puente de vúmetros. La aguja de cada canal cuenta sus pruebas públicas
 * (ids de fuente de src/lib/ai/sources.ts): proyectos, experiencia, logros y certificaciones.
 * Añadir o quitar una prueba aquí mueve la aguja; no hay porcentajes inventados.
 */
export type Competency = {
  id: string;
  label: Localized<string>;
  evidence: string[];
};

export const competencies: Competency[] = [
  {
    id: "python",
    label: { es: "Python", en: "Python" },
    evidence: [
      "proyecto:kognia-voice-agent",
      "proyecto:alerta-ciudadana",
      "proyecto:tactical-grid",
      "proyecto:san-jose-cuadernillos",
    ],
  },
  {
    id: "agents",
    label: { es: "Agentes de IA", en: "AI agents" },
    evidence: ["proyecto:kognia-voice-agent", "logro:colombia-5-0", "proyecto:tactical-grid"],
  },
  {
    id: "open-data",
    label: { es: "Datos abiertos", en: "Open data" },
    evidence: ["proyecto:kognia-voice-agent", "proyecto:alerta-ciudadana"],
  },
  {
    id: "fastapi",
    label: { es: "FastAPI", en: "FastAPI" },
    evidence: ["proyecto:kognia-voice-agent", "proyecto:alerta-ciudadana"],
  },
  {
    id: "automation",
    label: { es: "Automatización", en: "Automation" },
    evidence: ["logro:talento-tech-2023", "logro:talento-tech-2025"],
  },
  {
    id: "aws",
    label: { es: "AWS", en: "AWS" },
    evidence: ["certificacion:aws-academy", "certificacion:aws-educate"],
  },
  {
    id: "ml",
    label: { es: "Machine learning", en: "Machine learning" },
    evidence: ["proyecto:alerta-ciudadana"],
  },
  {
    id: "sql-java",
    label: { es: "SQL y Java", en: "SQL & Java" },
    evidence: ["experiencia"],
  },
];

/** Nivel en la escala VU según el número de pruebas: 3 o más ya pasa de cero. */
export function vuForEvidence(count: number): number {
  return [-20, -7, -3, 0, 2][Math.min(count, 4)];
}
