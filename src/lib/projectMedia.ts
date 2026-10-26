import "server-only";
import { readdirSync } from "node:fs";
import { join } from "node:path";

export type ProjectImage = { src: string; alt: string };

const IMAGE_FILE = /\.(avif|webp|png|jpe?g)$/i;

/** "02-panel_de-consultas.webp" → "Panel de consultas" */
function altFromFile(file: string): string {
  const words = file
    .replace(IMAGE_FILE, "")
    .replace(/^\d+[-_.\s]*/, "")
    .replace(/[-_]+/g, " ")
    .trim();
  return words ? words.charAt(0).toUpperCase() + words.slice(1) : "";
}

/**
 * Capturas de un proyecto: todos los archivos de imagen de `public/projects/<slug>/`, ordenados por
 * nombre (usa prefijos 01-, 02-… para fijar el orden). El texto alternativo sale del nombre del archivo,
 * así que nómbralos por lo que muestran. Se lee en build: tras añadir imágenes hay que volver a desplegar.
 */
export function projectImages(slug: string, title: string): ProjectImage[] {
  const dir = join(process.cwd(), "public", "projects", slug);
  let files: string[];
  try {
    files = readdirSync(dir);
  } catch {
    return []; // la carpeta aún no existe: el carrusel muestra solo el fragmento de interfaz
  }
  return files
    .filter((f) => IMAGE_FILE.test(f))
    .sort((a, b) => a.localeCompare(b, "en", { numeric: true }))
    .map((f) => {
      const caption = altFromFile(f);
      return {
        src: `/projects/${slug}/${encodeURIComponent(f)}`,
        alt: caption ? `${title}: ${caption}` : title,
      };
    });
}
