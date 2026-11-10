import type { Locale } from "./config";

// Los textos viajan a componentes cliente como props: solo cadenas, sin funciones.
// Las plantillas usan {n} y {label}; ver `fill` abajo.
const es = {
  meta: {
    title: "Juan Diego Henao Quintero — AI/Agent y Data Engineer",
    description:
      "Construyo agentes de IA y pipelines de datos que responden solo con datos verificables. Proyectos con código abierto, ganador de 3 hackathones nacionales.",
  },
  nav: {
    label: "Principal",
    about: "Sobre mí",
    measure: "Mide tu vacante",
    projects: "Proyectos",
    journey: "Trayectoria",
    assistant: "Asistente",
    contact: "Contacto",
    open: "Abrir menú",
    close: "Cerrar menú",
    skip: "Saltar al contenido",
  },
  menu: {
    title: "Navegación",
    about: "Quién soy y qué busco",
    measure: "Pega una vacante y mide el encaje",
    projects: "Cuatro proyectos con código abierto",
    journey: "Hackathones, experiencia y formación",
    assistant: "Pregúntale a la IA sobre mi perfil",
    contact: "Escríbeme directamente",
    follow: "También en",
  },
  hero: {
    greeting: "Hola, soy",
    role: "AI/Agent Engineer · Data Engineer",
    sub: "Construyo agentes de IA y pipelines de datos que responden solo con datos verificables. Busco mi primer rol como AI/Agent Engineer o Data Engineer junior.",
    cta: "Mide tu vacante",
    secondary: "Ver proyectos",
    focus: ["Agentes de IA", "Ingeniería de datos", "Datos abiertos", "Backend en Python"],
  },
  about: {
    title: "Sobre mí",
    description: [
      "Soy estudiante de Ingeniería de Sistemas y Computación en la Universidad de Caldas y construyo agentes de IA y pipelines de datos que responden solo con evidencia: consultan las fuentes en vivo, muestran cada consulta y dicen «no tengo evidencia» cuando el dato no está.",
      "Convierto datos abiertos en herramientas útiles, como un sistema de alertas de seguridad para Bogotá, y trabajo el backend con FastAPI, Spring Boot y AWS. Gané 3 hackathones nacionales entregando en menos de 48 horas. Busco mi primer rol como AI/Agent Engineer o Data Engineer junior.",
    ],
    photoAlt: "Foto de Juan Diego Henao Quintero",
    stats: [
      { value: "3", label: "hackathones nacionales ganados" },
      { value: "4", label: "proyectos con código abierto" },
      { value: "2", label: "certificaciones de AWS" },
    ],
    location: "Ubicación",
    education: "Formación",
    languages: "Idiomas",
  },
  fit: {
    title: "Mide tu vacante contra mi perfil",
    intro:
      "Pega los requisitos del puesto. Cada uno se mide contra mi evidencia, y lo que no tiene prueba queda marcado como brecha.",
    label: "Requisitos de la vacante",
    placeholder: "Ej.: Python, agentes con LLMs, FastAPI, SQL, despliegue en AWS, inglés B2…",
    hint: "Entre 20 y 4000 caracteres. No guardamos el texto.",
    analyze: "Medir encaje",
    analyzing: "Midiendo…",
    score: "Encaje estimado",
    strong: "Con evidencia",
    partial: "Evidencia parcial",
    gap: "Brecha",
    gaps: "Brechas y cómo las cerraría",
    disclaimer: "Estimación automática a partir de mi CV y proyectos; no es una evaluación definitiva.",
    errors: {
      rate_limited: "Hiciste varias mediciones seguidas. Espera unos minutos y vuelve a intentarlo.",
      invalid_request: "El texto debe tener entre 20 y 4000 caracteres.",
      default: "No pude medir la vacante ahora. Inténtalo de nuevo o escríbeme directamente.",
    },
  },
  projects: {
    title: "Proyectos con código abierto",
    intro: "Cuatro proyectos públicos en GitHub. Cada fragmento reproduce una pantalla de su interfaz o de su API.",
    repo: "Código en GitHub",
    demo: "Demo en vivo",
    illustrative: "Datos de ejemplo",
    carousel: { previous: "Imagen anterior", next: "Imagen siguiente", count: "{i} de {n}", region: "Capturas" },
  },
  statement:
    "Si el dato no está en la fuente, el sistema lo dice. Así construí el agente de Kognia y así responde este asistente.",
  journey: {
    title: "Trayectoria",
    experience: "Experiencia",
    education: "Formación",
    timeline: "Hackathones y certificaciones",
    credly: "Ver credenciales en Credly",
  },
  assistant: {
    title: "Pregúntale al asistente",
    intro: "Responde sobre mi experiencia usando solo mi CV y mis proyectos, y enlaza cada respuesta a su fuente.",
    label: "Tu pregunta",
    placeholder: "¿Qué experiencia tiene con agentes de IA?",
    send: "Preguntar",
    thinking: "Buscando en el CV…",
    sources: "Fuentes",
    you: "Tú",
    greeting: "Pregúntame por sus proyectos, su stack o sus logros. Cada respuesta enlaza a la sección donde está la prueba.",
    bot: "Asistente",
    suggestions: [
      "¿Qué proyectos prueban su experiencia con datos?",
      "¿Cómo evita que su IA invente datos?",
      "¿Qué logros tiene en hackathones?",
    ],
    errors: {
      rate_limited: "Hiciste muchas preguntas seguidas. Espera unos minutos.",
      not_configured: "El asistente no está disponible ahora. Escríbeme por el formulario.",
      default: "No pude responder ahora. Inténtalo de nuevo o escríbeme por el formulario.",
    },
  },
  contact: {
    title: "Hablemos",
    intro: "Escríbeme desde aquí y te respondo a tu correo, o usa los canales directos.",
    name: "Nombre",
    email: "Tu correo",
    message: "Mensaje",
    send: "Enviar mensaje",
    sending: "Enviando…",
    sent: "Mensaje enviado. Te responderé pronto a tu correo.",
    errors: {
      rate_limited: "Ya enviaste varios mensajes. Escríbeme directamente a mi correo.",
      invalid_request: "Revisa los campos: nombre, un correo válido y un mensaje de al menos 10 caracteres.",
      not_configured: "El formulario aún no está activo. Escríbeme directamente a mi correo.",
      default: "No se pudo enviar. Escríbeme directamente a mi correo o por LinkedIn.",
    },
    direct: "Canales directos",
  },
  footer: { updated: "Última actualización: {date}", made: "Hecho en Manizales con Next.js y Gemini.", top: "Volver arriba" },
  lang: { switch: "English", code: "en" },
};

export type Dictionary = typeof es;

const en: Dictionary = {
  meta: {
    title: "Juan Diego Henao Quintero — AI/Agent & Data Engineer",
    description:
      "I build AI agents and data pipelines that answer only from verifiable data. Open-source projects, winner of 3 national hackathons.",
  },
  nav: {
    label: "Main",
    about: "About",
    measure: "Measure your role",
    projects: "Projects",
    journey: "Journey",
    assistant: "Assistant",
    contact: "Contact",
    open: "Open menu",
    close: "Close menu",
    skip: "Skip to content",
  },
  menu: {
    title: "Navigation",
    about: "Who I am and what I'm looking for",
    measure: "Paste a job post and measure the fit",
    projects: "Four open-source projects",
    journey: "Hackathons, experience and education",
    assistant: "Ask the AI about my profile",
    contact: "Write to me directly",
    follow: "Also on",
  },
  hero: {
    greeting: "Hi, I'm",
    role: "AI/Agent Engineer · Data Engineer",
    sub: "I build AI agents and data pipelines that answer only from verifiable data. I'm looking for my first role as an AI/Agent Engineer or junior Data Engineer.",
    cta: "Measure your role",
    secondary: "See projects",
    focus: ["AI agents", "Data engineering", "Open data", "Python backend"],
  },
  about: {
    title: "About me",
    description: [
      "I'm a Systems & Computer Engineering student at Universidad de Caldas, and I build AI agents and data pipelines that answer only with evidence: they query sources live, show every query and say \"I have no evidence\" when the data isn't there.",
      "I turn open data into useful tools, like a public-safety alert system for Bogotá, and work on the backend with FastAPI, Spring Boot and AWS. I've won 3 national hackathons, delivering in under 48 hours. I'm looking for my first role as an AI/Agent Engineer or junior Data Engineer.",
    ],
    photoAlt: "Photo of Juan Diego Henao Quintero",
    stats: [
      { value: "3", label: "national hackathons won" },
      { value: "4", label: "open-source projects" },
      { value: "2", label: "AWS certifications" },
    ],
    location: "Location",
    education: "Education",
    languages: "Languages",
  },
  fit: {
    title: "Measure your role against my profile",
    intro:
      "Paste the job requirements. Each one is measured against my evidence, and anything without proof is marked as a gap.",
    label: "Job requirements",
    placeholder: "E.g. Python, LLM agents, FastAPI, SQL, AWS deployment, B2 English…",
    hint: "Between 20 and 4000 characters. The text is not stored.",
    analyze: "Measure fit",
    analyzing: "Measuring…",
    score: "Estimated fit",
    strong: "Evidenced",
    partial: "Partial evidence",
    gap: "Gap",
    gaps: "Gaps and how I would close them",
    disclaimer: "Automatic estimate based on my CV and projects; not a definitive evaluation.",
    errors: {
      rate_limited: "You ran several measurements in a row. Wait a few minutes and try again.",
      invalid_request: "The text must be between 20 and 4000 characters.",
      default: "I couldn't measure the role right now. Try again or contact me directly.",
    },
  },
  projects: {
    title: "Open-source projects",
    intro: "Four public projects on GitHub. Each fragment reproduces a screen from its interface or API.",
    repo: "Code on GitHub",
    demo: "Live demo",
    illustrative: "Sample data",
    carousel: { previous: "Previous image", next: "Next image", count: "{i} of {n}", region: "Screenshots" },
  },
  statement:
    "If the data isn't in the source, the system says so. That's how I built the Kognia agent and how this assistant answers.",
  journey: {
    title: "Journey",
    experience: "Experience",
    education: "Education",
    timeline: "Hackathons and certifications",
    credly: "See credentials on Credly",
  },
  assistant: {
    title: "Ask the assistant",
    intro: "It answers about my experience using only my CV and projects, and links every answer to its source.",
    label: "Your question",
    placeholder: "What experience does he have with AI agents?",
    send: "Ask",
    thinking: "Searching the CV…",
    sources: "Sources",
    you: "You",
    greeting: "Ask me about his projects, stack or awards. Every answer links to the section that holds the proof.",
    bot: "Assistant",
    suggestions: [
      "Which projects prove his data experience?",
      "How does he keep his AI from making things up?",
      "What hackathon awards does he have?",
    ],
    errors: {
      rate_limited: "You asked many questions in a row. Wait a few minutes.",
      not_configured: "The assistant is unavailable right now. Please use the contact form.",
      default: "I couldn't answer right now. Try again or use the contact form.",
    },
  },
  contact: {
    title: "Let's talk",
    intro: "Write to me from here and I'll reply to your email, or use the direct channels.",
    name: "Name",
    email: "Your email",
    message: "Message",
    send: "Send message",
    sending: "Sending…",
    sent: "Message sent. I'll reply to your email soon.",
    errors: {
      rate_limited: "You've already sent several messages. Email me directly instead.",
      invalid_request: "Check the fields: a name, a valid email and a message of at least 10 characters.",
      not_configured: "The form isn't active yet. Email me directly instead.",
      default: "It couldn't be sent. Email me directly or reach me on LinkedIn.",
    },
    direct: "Direct channels",
  },
  footer: { updated: "Last updated: {date}", made: "Made in Manizales with Next.js and Gemini.", top: "Back to top" },
  lang: { switch: "Español", code: "es" },
};

const dictionaries: Record<Locale, Dictionary> = { es, en };

export const getDictionary = (locale: Locale): Dictionary => dictionaries[locale];

/** Rellena una plantilla con {n}, {label}, etc. */
export const fill = (template: string, values: Record<string, string | number>) =>
  template.replace(/\{(\w+)\}/g, (_, key: string) => String(values[key] ?? ""));

/** Mensaje de error de una API según su código, con uno genérico por defecto. */
export const errorMessage = (errors: { default: string } & Record<string, string>, code: string | undefined) =>
  (code && errors[code]) || errors.default;
