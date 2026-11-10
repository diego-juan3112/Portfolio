---
name: Portafolio Juan Diego Henao Quintero
description: Fichas de color retro sobre carbón; IA que responde con datos verificables.
colors:
  carbon: "#1b1a19"
  carbon-raised: "#242220"
  carbon-control: "#302d2a"
  cream: "#e8d8c9"
  cream-field: "#dccab9"
  cream-soft: "#b9aa9b"
  ink: "#1b1a19"
  ink-soft: "#5a4f46"
  slate: "#4b607f"
  slate-deep: "#2f3d52"
  orange: "#f3701e"
  orange-light: "#ff8a3d"
  orange-ink: "#9a420e"
typography:
  display:
    fontFamily: "Bricolage Grotesque, Barlow, sans-serif"
    fontSize: "clamp(3.2rem, 6.6vw, 7rem)"
    fontWeight: 800
    lineHeight: 0.95
    letterSpacing: "-0.03em"
  heading:
    fontFamily: "Bricolage Grotesque, Barlow, sans-serif"
    fontSize: "4.5rem"
    fontWeight: 800
    lineHeight: 0.95
    letterSpacing: "-0.03em"
  label:
    fontFamily: "Bricolage Grotesque, Barlow, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 700
  body:
    fontFamily: "Barlow, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.6
rounded:
  pill: "999px"
  card: "1.5rem"
  field: "1.25rem"
spacing:
  gutter-phone: "20px"
  gutter-desk: "32px"
  section-gap-phone: "96px"
  section-gap-desk: "128px"
components:
  button-accent:
    backgroundColor: "{colors.orange}"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    height: "48px"
    padding: "0 24px"
  button-accent-hover:
    backgroundColor: "{colors.orange-light}"
  button-ink:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.cream}"
    rounded: "{rounded.pill}"
    height: "48px"
  button-quiet:
    backgroundColor: "{colors.carbon-control}"
    textColor: "{colors.cream}"
    rounded: "{rounded.pill}"
    height: "48px"
  field-on-cream:
    backgroundColor: "{colors.cream-field}"
    textColor: "{colors.ink}"
    rounded: "{rounded.field}"
    padding: "16px 20px"
---

# Design System: Portafolio Juan Diego Henao Quintero

## Overview

Retro americano sobre carbón, tomado de una referencia de paletas. **La paleta guía, no encajona**: la página es una sola superficie de carbón y el color llega como ambiente (resplandores de pizarra y naranja que se desvanecen sin bordes) y como acento (cifras, puntos, barras, la acción). No hay paneles de color ni tarjetas por sección; la estructura sale del espacio, la tipografía y filetes finos. Solo lo que es interfaz real (el chat, los fragmentos de proyecto, los campos) lleva contenedor.

## Colors

### Primary
- **orange** `#f3701e`: botón principal, cifras y énfasis sobre carbón (6.7:1). Nunca como texto sobre crema: ahí se usa **orange-ink** `#9a420e` (5:1).

### Secondary
- **slate** `#4b607f` → **slate-deep** `#2f3d52`: resplandores de ambiente (`wash-slate`), barras de nivel «parcial» y el punto de la segunda área de enfoque. Nunca como texto sobre carbón (2.9:1).

### Neutral
- **carbon** `#1b1a19` / **carbon-raised** `#242220` / **carbon-control** `#302d2a`: fondo, campos y chat, y controles.
- **cream** `#e8d8c9` / **cream-field** `#dccab9`: texto principal, títulos y la burbuja del logo. **cream-soft** `#b9aa9b` es el texto secundario sobre carbón (7.6:1).
- **ink** `#1b1a19` / **ink-soft** `#5a4f46`: texto sobre crema y naranja.

### Named Rules
- **Un naranja por pantalla.** Si dos cosas compiten en naranja, una de ellas no es la acción.
- **Color como ambiente, no como caja.** Las secciones alternan resplandores (`wash-slate` a la izquierda, `wash-orange` a la derecha) que llegan a transparente antes del borde: nunca se ve un corte.
- **Degradados con propósito.** Resplandores de sección y del hero, y la línea naranja → crema → pizarra (progreso de lectura y puntaje). Nada de texto en degradado.

## Typography

**Bricolage Grotesque** (800/700) para titulares y rótulos: rotunda y con un punto retro. **Barlow** (400–600) para el texto: sobria y muy legible. Dos familias, cinco tamaños visibles: display, heading (72px), label (20–24px), body (17–20px) y small (14–16px).

## Layout

Rejilla de 90rem con márgenes de 20px (teléfono) y 32px (≥640px), secciones a sangre completa separadas por 96–128px de espacio. Dos columnas asimétricas `1fr / 1.15fr` en escritorio y una en teléfono. Listas con filetes (`border-cream/10`) en lugar de tarjetas.

Orden: Hero → Sobre mí → Mide tu vacante → Proyectos → frase → Trayectoria → Asistente → Contacto → pie.

## Elevation & Depth

Plano. La profundidad sale de los resplandores. Sombra y desenfoque solo en la cabecera al desplazarse; anillo de 1px (`ring-cream/10`) en los campos y el chat.

## Shapes

Botones en píldora; campos y chat con 1rem; fragmentos de proyecto con 1.25rem. Las secciones no tienen forma propia.

## Components

### Cabecera
Fija y **siempre visible**: no se esconde al hacer scroll. Sobre el hero es transparente; al bajar, una capa de fondo carbón al 94 % aparece por opacidad (300ms). Sin `backdrop-filter`: detrás pasa el resplandor animado del hero y desenfocarlo en cada cuadro es caro en móviles. Línea de progreso de lectura en degradado. En escritorio, cuatro enlaces con la sección activa resaltada, la acción «Mide tu vacante» y el botón de menú.

### Menú de hamburguesa
Panel a pantalla completa que aparece por opacidad (320ms) con los enlaces escalonados (45ms). Sin clip-path ni desenfoques animados, para que sea fluido en cualquier equipo. `scrollbar-gutter: stable` evita el salto de la página al bloquear el scroll. Esc o un enlace lo cierran; el foco queda atrapado dentro y vuelve al botón.

### Logo
**Respuesta citada** (elegida): burbuja de chat crema con «jd» y un superíndice naranja ¹ en la esquina. La respuesta lleva su fuente: el posicionamiento «IA que no inventa» hecho marca. Sobre fondos claros se invierte definiendo `--bubble` y `--bubble-text`. Las seis variantes (monograma, sello, cumbre, nevado, respuesta citada, cable aéreo) viven en `src/components/Logo.tsx`; `LOGO_VARIANT` elige la del sitio. El favicon (`src/app/icon.svg`) es la burbuja sobre carbón redondeado.

### Hero
Nombre en dos líneas (la segunda en naranja), rol, frase y dos acciones. A la derecha, el logo grande con un halo naranja difuminado y las tres áreas de enfoque como lista tipográfica, cada una con un punto de la paleta.

### Sobre mí
Descripción condensada en dos párrafos, cifras en línea con filetes y, a la derecha, la foto en un **arco** (radio completo arriba, 1.5rem abajo) con duotono: la imagen en escala de grises con `mix-blend-mode: luminosity` sobre un degradado pizarra → naranja, un toque de luz cálida arriba y fundido inferior hacia la página. La foto vive en `public/images/profile/`.

### Pie
Marca, fecha de «última actualización» (la fecha de compilación, `BUILD_DATE` en `next.config.ts`, en hora de Colombia), navegación, contacto y «volver arriba».

### Analizador
Puntaje grande en naranja con barra en degradado; cada requisito en una fila con filete inferior, etiqueta de veredicto y barra de nivel (naranja con evidencia, pizarra parcial, crema suave brecha).

## Do's and Don'ts

### Do:
- Separar capítulos con espacio y resplandores, no con cajas.
- Mantener el contenido visible sin JS y con movimiento reducido.
- Verificar contraste al poner texto sobre pizarra o naranja.

### Don't:
- No poner naranja como texto sobre crema.
- No volver a encerrar secciones en paneles de color ni convertir listas en tarjetas.
- No inventar cifras: las de «Sobre mí» salen del CV.
