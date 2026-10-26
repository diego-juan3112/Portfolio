# Portafolio — Juan Diego Henao Quintero

Next.js 16 · Tailwind 4 · TypeScript · bilingüe ES/EN (`/es`, `/en`) · IA con Gemini · correo con Resend.

## Desarrollo

```bash
npm install
cp .env.example .env.local   # completa GEMINI_API_KEY, RESEND_API_KEY, etc.
npm run dev                  # http://localhost:3000
npm run lint && npm run build && npm run typecheck
```

`typecheck` necesita los tipos de rutas que genera `next build` (o `next typegen`).

## Contenido

Todo el contenido vive en `src/content` (perfil, habilidades, logros, proyectos) y `src/i18n/dictionaries.ts` (textos de la interfaz). Para añadir un proyecto, agrega un objeto en `src/content/projects.ts`.

## IA y correo

- `POST /api/chat`: asistente que responde solo con el CV y los proyectos (`src/lib/ai/knowledge.ts`).
- `POST /api/fit`: análisis de encaje contra una vacante, salida JSON validada con zod.
- `POST /api/contact`: formulario → Resend, con honeypot, Turnstile opcional y límite por IP.

Sin `GEMINI_API_KEY` o `RESEND_API_KEY` los endpoints responden 503 y la interfaz muestra un mensaje.

## Imágenes de los proyectos (carrusel)

Cada proyecto muestra un carrusel: primero su fragmento de interfaz y después las capturas que pongas en
`public/projects/<slug>/` (`kognia-voice-agent`, `alerta-ciudadana`, `tactical-grid`, `san-jose-cuadernillos`).

- Formatos: `.webp` (recomendado), `.avif`, `.png`, `.jpg`. Proporción ideal 16:10, unos 1600 × 1000 px.
- El orden sigue el nombre del archivo: usa prefijos `01-`, `02-`…
- El texto alternativo sale del nombre: `02-panel-de-consultas.webp` → «Kognia Voice Agent: Panel de consultas».
- Las carpetas se leen al compilar: tras añadir imágenes, haz commit y push (el despliegue vuelve a compilar).

## Despliegue en Vercel

1. Cada push a `main` despliega a producción; cada PR genera una vista previa.
2. Variables en **Settings → Environment Variables** (ver `.env.example`). `NEXT_PUBLIC_SITE_URL` se fija en build:
   si cambia, hay que redesplegar. Si no está definida se usa el dominio de producción de Vercel.
3. Dominio propio: **Settings → Domains**, añade el dominio y crea en tu registrador los registros DNS que Vercel
   indique. Vercel emite el certificado TLS solo. Luego pon `NEXT_PUBLIC_SITE_URL=https://tu-dominio` y redespliega.
