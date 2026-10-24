---
name: Portafolio Juan Diego Henao Quintero
description: Un puente de vúmetros donde cada competencia se mide por sus pruebas públicas.
colors:
  desk: "#16130f"
  desk-raised: "#211c17"
  desk-control: "#2c261f"
  meter-face: "#e6e3dc"
  meter-face-shade: "#d7d3ca"
  ink: "#151412"
  ink-soft: "#4a4339"
  on-desk: "#e9e6e0"
  on-desk-soft: "#b0aba1"
  signal-red: "#b3261e"
  signal-red-deep: "#8f1d17"
  steel: "#8c949a"
typography:
  display:
    fontFamily: "Barlow Condensed, Barlow, sans-serif"
    fontSize: "clamp(3.4rem, 9.5vw, 9.25rem)"
    fontWeight: 700
    lineHeight: 0.92
    letterSpacing: "-0.02em"
  heading:
    fontFamily: "Barlow Condensed, Barlow, sans-serif"
    fontSize: "4.5rem"
    fontWeight: 700
    lineHeight: 0.92
    letterSpacing: "-0.02em"
  label:
    fontFamily: "Barlow Condensed, Barlow, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 600
    lineHeight: 1.25
  lead:
    fontFamily: "Barlow, system-ui, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 400
    lineHeight: 1.375
  body:
    fontFamily: "Barlow, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.55
rounded:
  switch: "2px"
spacing:
  gutter-phone: "20px"
  gutter-desk: "32px"
  section-phone: "96px"
  section-desk: "144px"
components:
  button-primary:
    backgroundColor: "{colors.signal-red}"
    textColor: "{colors.meter-face}"
    typography: "{typography.label}"
    rounded: "{rounded.switch}"
    padding: "0 22px"
    height: "48px"
  button-primary-hover:
    backgroundColor: "{colors.signal-red-deep}"
  button-quiet:
    backgroundColor: "{colors.desk-control}"
    textColor: "{colors.on-desk}"
    rounded: "{rounded.switch}"
    padding: "0 22px"
    height: "48px"
  button-quiet-hover:
    backgroundColor: "{colors.meter-face}"
    textColor: "{colors.ink}"
  input-on-face:
    backgroundColor: "{colors.meter-face-shade}"
    textColor: "{colors.ink}"
    rounded: "{rounded.switch}"
    padding: "12px 16px"
  input-on-desk:
    backgroundColor: "{colors.desk-control}"
    textColor: "{colors.on-desk}"
    rounded: "{rounded.switch}"
    padding: "12px 16px"
---

# Design System: Portafolio Juan Diego Henao Quintero

## Overview

La página es una consola de estudio de grabación: un escritorio de nogal casi negro donde las superficies de trabajo son caras de vúmetro color hueso. Cada competencia es un canal cuya aguja cuenta pruebas públicas (proyectos, experiencia, logros, certificaciones), y el analizador de vacantes reconfigura el puente con un canal por requisito. El sistema no decora: mide. Lo que tiene evidencia pasa de cero y se marca en rojo; lo que no, se queda a la izquierda.

Los capítulos alternan campo de escritorio (oscuro) y campo de medidor (hueso) con cortes duros, nunca degradados. El rojo está reservado: la acción principal y la zona «pasado de cero» de la escala.

## Colors

### Primary
- **signal-red** `#b3261e`: la zona roja de la escala VU, la acción principal y el veredicto «con evidencia». Nunca como texto sobre el escritorio oscuro (contraste insuficiente); sí como fondo de botón con texto hueso (8.4:1) y como texto sobre hueso.

### Neutral
- **desk** `#16130f` / **desk-raised** `#211c17` / **desk-control** `#2c261f`: el escritorio y sus escalones de tono para separar superficies sin líneas ni sombras.
- **meter-face** `#e6e3dc` / **meter-face-shade** `#d7d3ca`: caras de medidor y capítulos claros (analizador, asistente).
- **ink** `#151412`: arcos, numerales, agujas y texto sobre hueso.
- **on-desk** `#e9e6e0` / **on-desk-soft** `#b0aba1`: texto sobre escritorio; el suave solo para notas secundarias (≥ 7:1).

### Named Rules
- **Pasado de cero.** El rojo significa «hay evidencia suficiente». Si algo es rojo, debe poder abrirse su prueba.
- **Escalón, no línea.** Las superficies se separan por un paso de tono (desk → desk-raised → desk-control), nunca por bordes de 1px ni sombras.

## Typography

Una sola familia: Barlow, con su corte condensado para titulares, escalas y rótulos, como la rotulación de los equipos de estudio. Monoespaciada solo dentro de bloques de código reales de los fragmentos de proyecto.

### Hierarchy
- **Display** (hero y pie): Barlow Condensed 700, `clamp(3.4rem, 9.5vw, 9.25rem)`, interlineado 0.92, tracking −0.02em. El nombre en dos líneas.
- **Heading** (títulos de sección): 48px en teléfono, 72px en escritorio. Dos líneas como máximo.
- **Label** (subtítulos, botones, rótulos de canal): Barlow Condensed 600, 18–24px.
- **Lead**: Barlow 20px. **Body**: Barlow 17–18px, interlineado 1.55. **Small**: 16px, nunca menos.

### Named Rules
- **Sin etiquetas pequeñas en mayúsculas.** Todo en minúscula de oración y a tamaño legible.

## Layout

Una cuadrícula de 90rem con márgenes iguales de 20px (teléfono) y 32px (desde 640px). Las secciones de contenido son dos columnas asimétricas `1fr / 1.15fr`: el título y el argumento a la izquierda, el instrumento o el contenido a la derecha. Separación entre secciones de 96px en teléfono y 128–144px en escritorio. El puente usa unidades enteras de medidor: 2, 4 u 8 canales por fila, nunca fracciones.

## Elevation & Depth

Plano. Sin sombras ni brillos. La profundidad sale del tono (escritorio, panel, control) y del recorte (`clip-path`) de los fragmentos al entrar.

## Shapes

Esquinas rectas de 2px en botones y campos, como interruptores de consola. Las caras de medidor son rectángulos sin radio.

## Components

### Buttons
- **Primario**: rojo con texto hueso, 48px de alto, Barlow Condensed 600. Hover más oscuro, `:active` a escala 0.97.
- **Silencioso**: escalón de escritorio con texto hueso; en hover pasa a cara de medidor con tinta.

### Inputs / Fields
Sin borde: un escalón de tono (hueso oscurecido sobre campo claro, control sobre escritorio). Foco con contorno de 2px en tinta o rojo según el campo. Caret rojo.

### Navigation
Barra plana: nombre como marca, cuatro enlaces subrayados, cambio de idioma y una sola acción («Mide tu vacante»).

### Vúmetro (componente insignia)
SVG 200×140: cara hueso, arco negro de −20 a 0 y arco rojo de 0 a +3, numerales VU en Barlow Condensed, aguja negra con pivote abajo. La aguja gira desde el tope izquierdo con balística (leve sobrepaso y asentamiento) y tiembla menos de 1° solo mientras el puente está en pantalla. Escala no lineal como un medidor real. Con movimiento reducido, la aguja ya está en su valor.

### Fragmentos de proyecto
Pantallas de interfaz o API construidas en HTML (`data-ui`) en lugar de imágenes. Pueden llevar código monoespaciado. Los valores de ejemplo se rotulan «Datos de ejemplo».

## Do's and Don'ts

### Do:
- Medir antes que afirmar: cada nivel de aguja sale de pruebas enlazables.
- Alternar capítulos escritorio/hueso con cortes duros.
- Mantener el contenido visible sin JS y con movimiento reducido.

### Don't:
- No usar degradados, brillos, sombras en reposo ni vidrio.
- No poner rojo como texto sobre el escritorio.
- No usar etiquetas sobre los títulos (eyebrows), numeración 01/02 ni tarjetas idénticas con icono.
- No inventar porcentajes de habilidad: la aguja cuenta pruebas, no autoestima.
