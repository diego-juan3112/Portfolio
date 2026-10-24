import type { Locale } from "./config";

const es = {
  meta: {
    title: "Juan Diego Henao Quintero — Data Engineer & Backend Developer",
    description:
      "Portafolio de Juan Diego Henao Quintero: proyectos de datos, backend e IA, ganador de 3 hackathones nacionales.",
  },
  nav: { about: "Sobre mí", projects: "Proyectos", achievements: "Logros", contact: "Contacto" },
  hero: {
    hi: "Hola, soy",
    sub: "Construyo pipelines de datos, APIs y soluciones con IA. Ganador de 3 hackathones nacionales.",
    cta: "Contáctame",
    ctaProjects: "Ver proyectos",
    avatarAlt: "Avatar 3D estilizado de Juan Diego",
  },
  about: { title: "Sobre mí", skills: "Habilidades", education: "Educación" },
  projects: {
    title: "Proyectos destacados",
    intro: "Trabajos reales, con código abierto en GitHub.",
    repo: "Código",
    demo: "Demo",
    all: "Todos",
    filters: { ai: "IA", data: "Datos", backend: "Backend", hackathon: "Hackathon" },
  },
  experience: { title: "Experiencia" },
  achievements: { title: "Logros y certificaciones" },
  contact: {
    title: "Hablemos",
    intro: "Escríbeme directamente desde aquí o usa el asistente para conocer mi perfil.",
    name: "Nombre",
    email: "Tu correo",
    message: "Mensaje",
    send: "Enviar mensaje",
    sending: "Enviando…",
    sent: "¡Mensaje enviado! Te responderé pronto.",
    error: "No se pudo enviar. Inténtalo de nuevo o escríbeme por LinkedIn.",
  },
  chat: {
    title: "Pregúntale a mi asistente",
    intro: "Responde sobre mi experiencia usando solo la información de mi CV y proyectos.",
    placeholder: "¿Qué experiencia tiene Juan Diego con AWS?",
    send: "Enviar",
    thinking: "Pensando…",
    error: "El asistente no está disponible ahora. Escríbeme por el formulario.",
    suggestions: [
      "¿Qué proyectos demuestran su experiencia en datos?",
      "¿Qué stack backend domina?",
      "¿Qué logros tiene en hackathones?",
    ],
  },
  fit: {
    title: "¿Qué tan bien encajo en tu vacante?",
    intro: "Pega los criterios o la oferta y obtén una aproximación honesta, con evidencias y brechas.",
    placeholder: "Pega aquí los requisitos del puesto (máx. 4000 caracteres)…",
    analyze: "Analizar encaje",
    analyzing: "Analizando…",
    score: "Encaje estimado",
    strong: "Fuerte",
    partial: "Parcial",
    gap: "Brecha",
    gaps: "Brechas y cómo las cerraría",
    disclaimer:
      "Estimación automática basada en mi CV y proyectos; no es una evaluación definitiva. No guardamos el texto que pegas.",
    error: "No se pudo analizar. Inténtalo de nuevo o escríbeme directamente.",
  },
  footer: { rights: "Todos los derechos reservados." },
  lang: { switch: "English", code: "en" },
};

export type Dictionary = typeof es;

const en: Dictionary = {
  meta: {
    title: "Juan Diego Henao Quintero — Data Engineer & Backend Developer",
    description:
      "Portfolio of Juan Diego Henao Quintero: data, backend and AI projects, winner of 3 national hackathons.",
  },
  nav: { about: "About", projects: "Projects", achievements: "Achievements", contact: "Contact" },
  hero: {
    hi: "Hi, I'm",
    sub: "I build data pipelines, APIs and AI-powered solutions. Winner of 3 national hackathons.",
    cta: "Contact me",
    ctaProjects: "View projects",
    avatarAlt: "Stylized 3D avatar of Juan Diego",
  },
  about: { title: "About me", skills: "Skills", education: "Education" },
  projects: {
    title: "Featured projects",
    intro: "Real work, open source on GitHub.",
    repo: "Code",
    demo: "Demo",
    all: "All",
    filters: { ai: "AI", data: "Data", backend: "Backend", hackathon: "Hackathon" },
  },
  experience: { title: "Experience" },
  achievements: { title: "Achievements & certifications" },
  contact: {
    title: "Let's talk",
    intro: "Write to me straight from here, or use the assistant to learn about my profile.",
    name: "Name",
    email: "Your email",
    message: "Message",
    send: "Send message",
    sending: "Sending…",
    sent: "Message sent! I'll get back to you soon.",
    error: "Could not send. Try again or reach me on LinkedIn.",
  },
  chat: {
    title: "Ask my assistant",
    intro: "It answers about my experience using only the information in my CV and projects.",
    placeholder: "What AWS experience does Juan Diego have?",
    send: "Send",
    thinking: "Thinking…",
    error: "The assistant is unavailable right now. Please use the contact form.",
    suggestions: [
      "Which projects show his data experience?",
      "What backend stack does he work with?",
      "What hackathon achievements does he have?",
    ],
  },
  fit: {
    title: "How well do I fit your role?",
    intro: "Paste the criteria or job post and get an honest estimate with evidence and gaps.",
    placeholder: "Paste the role requirements here (max 4000 characters)…",
    analyze: "Analyze fit",
    analyzing: "Analyzing…",
    score: "Estimated fit",
    strong: "Strong",
    partial: "Partial",
    gap: "Gap",
    gaps: "Gaps and how I would close them",
    disclaimer:
      "Automatic estimate based on my CV and projects; not a definitive evaluation. The text you paste is not stored.",
    error: "Could not analyze. Try again or contact me directly.",
  },
  footer: { rights: "All rights reserved." },
  lang: { switch: "Español", code: "es" },
};

const dictionaries: Record<Locale, Dictionary> = { es, en };

export const getDictionary = (locale: Locale): Dictionary => dictionaries[locale];
