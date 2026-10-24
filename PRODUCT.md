# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

- **Líderes técnicos** que evalúan a un candidato: abren los repositorios, miran arquitectura, stack y cómo se resolvió cada problema.
- **Reclutadores / RR. HH.** que llegan desde LinkedIn y deciden en pocos minutos si pasan al candidato a entrevista. Usan el analizador de encaje para contrastar una vacante con el perfil.

## Product Purpose

Portafolio personal bilingüe (ES/EN) de Juan Diego Henao Quintero, estudiante de Ingeniería de Sistemas y Computación (Universidad de Caldas, Manizales). Su trabajo es conseguir entrevistas para puestos de **AI / Agent Engineer** y **Data Engineer junior**. Éxito: el visitante entiende en segundos quién es y qué hace, encuentra la evidencia (proyectos con código, logros) y contacta o pide una entrevista.

## Positioning

Lo que el sitio debe probar primero:

1. **IA que no inventa.** Construye sistemas de IA cerrados a la fuente: el agente de voz de Kognia solo responde con datos consultados en vivo a datos.gov.co, muestra cada consulta y verifica las cifras antes de decirlas. El propio asistente del portafolio sigue la misma regla (responde solo con el CV y los proyectos, y dice "no tengo evidencia" cuando no la hay).
2. **Datos abiertos con impacto.** Convierte datos públicos en herramientas útiles: Alerta Ciudadana (seguridad en Bogotá, CRISP-ML(Q), 5 fuentes abiertas) y el registro de IPS de Colombia.

## Operating Context

- El visitante llega casi siempre desde un enlace de LinkedIn, a menudo en el teléfono.
- Los líderes técnicos saltan del sitio a GitHub (`github.com/diego-juan3112`) y a las demos.
- Los reclutadores pegan la descripción de una vacante en el analizador de encaje.

## Capabilities and Constraints

- Next.js 16 (App Router) + Tailwind 4, desplegado en Vercel. Rutas `/es` y `/en`.
- Asistente de chat (`/api/chat`) y analizador de encaje (`/api/fit`) con Gemini; corpus generado desde `src/content`.
- Formulario de contacto (`/api/contact`) vía Resend.
- **Sin fotografía ni imágenes del autor** (decisión del usuario, 2026-10-24).
- PatronDesignDetector existe en un repositorio privado de una organización; el usuario lo añadirá después.

## Evidence on Hand

- CV (ago. 2026): experiencia como Java Engineer en el Sistema Biblioteca Rogelio Salmona (Universidad de Caldas, 6 meses).
- Proyectos públicos: Kognia Voice Agent (demo en Vercel), Alerta Ciudadana, Tactical Grid, San José Cuadernillos.
- Logros: ganador Talento Tech (10/2023 y 07/2025), ganador Colombia 5.0 MinTIC (03/2026).
- Certificaciones: AWS Academy Cloud Foundations (sep. 2025), AWS Educate Cloud 101 (mar. 2026). Inglés B1 (EF SET).
- **No existen** testimonios, clientes, métricas de negocio ni prensa: no se deben inventar.

## Product Principles

1. Toda afirmación lleva su prueba (repositorio, demo, logro fechado).
2. La IA del sitio demuestra el posicionamiento: rápida, honesta y con fuentes.
3. Primero lo que un líder técnico necesita para juzgar; después lo demás.
4. Bilingüe de verdad: el inglés no es una traducción de segunda.

## Accessibility & Inclusion

WCAG 2.2 AA: contraste, foco visible, navegación por teclado y `prefers-reduced-motion` respetado en todas las transiciones.
