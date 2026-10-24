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

## Despliegue

Importar el repo en Vercel, definir las variables de `.env.example` y desplegar desde `main`.
