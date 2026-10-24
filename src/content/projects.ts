import type { Localized } from "./profile";

export type Project = {
  slug: string;
  repo: string;
  demo?: string;
  image?: string;
  tags: string[];
  category: "ai" | "data" | "backend" | "hackathon";
  title: string;
  tagline: Localized<string>;
  description: Localized<string>;
};

// Para añadir un proyecto (p. ej. PatronDesignDetector) agrega un objeto aquí; el resto se genera solo.
export const projects: Project[] = [
  {
    slug: "kognia-voice-agent",
    repo: "https://github.com/diego-juan3112/HackatonKognia",
    demo: "https://hackatonkognia-phi.vercel.app",
    tags: ["Python", "FastAPI", "LangGraph", "Astro", "OpenAI Realtime", "Gemini Live", "Vercel"],
    category: "ai",
    title: "Kognia Voice Agent",
    tagline: {
      es: "Agente de voz en tiempo real sobre datos abiertos de salud",
      en: "Real-time voice agent over open health data",
    },
    description: {
      es: "Agente de voz que consulta en vivo el registro de IPS de Colombia (datos.gov.co). Solo responde con datos de la fuente, muestra cada consulta SoQL y verifica las cifras antes de decirlas. Desarrollado en el hackathon Kognia Labs (09/10/2026).",
      en: "Voice agent that queries Colombia's live health-provider registry (datos.gov.co). It answers only from the source, shows every SoQL query and verifies figures before speaking them. Built at the Kognia Labs hackathon (2026-10-09).",
    },
  },
  {
    slug: "alerta-ciudadana",
    repo: "https://github.com/diego-juan3112/OpenDataProject2026",
    tags: ["Python", "FastAPI", "GeoPandas", "scikit-learn", "Streamlit", "React Native", "Expo"],
    category: "data",
    title: "Alerta Ciudadana",
    tagline: {
      es: "Alertas predictivas de seguridad para Bogotá",
      en: "Predictive public-safety alerts for Bogotá",
    },
    description: {
      es: "Sistema predictivo de seguridad ciudadana con metodología CRISP-ML(Q) y 5 fuentes de datos abiertos. Una API de un solo endpoint sirve el modelo a un dashboard Streamlit y a una app móvil que notifica al entrar a zonas de riesgo. Hackathon Datos al Ecosistema 2026.",
      en: "Predictive public-safety system built with CRISP-ML(Q) over 5 open data sources. A single-endpoint API serves the model to a Streamlit dashboard and a mobile app that notifies when entering high-risk zones. Datos al Ecosistema 2026 hackathon.",
    },
  },
  {
    slug: "tactical-grid",
    repo: "https://github.com/diego-juan3112/tactical-grid",
    tags: ["Python", "Minimax", "Informed search", "Uninformed search"],
    category: "ai",
    title: "Tactical Grid",
    tagline: {
      es: "Juego táctico 2D con búsqueda y minimax",
      en: "2D tactical game with search and minimax",
    },
    description: {
      es: "Juego táctico 2D de toma de decisiones que aplica algoritmos de búsqueda no informada e informada junto con minimax. Proyecto de Sistemas Inteligentes 1.",
      en: "2D decision-making tactical game applying uninformed and informed search algorithms together with minimax. Intelligent Systems 1 course project.",
    },
  },
  {
    slug: "san-jose-cuadernillos",
    repo: "https://github.com/diego-juan3112/san-jose-cuadernillos",
    tags: ["Python"],
    category: "backend",
    title: "San José Cuadernillos",
    tagline: {
      es: "Evaluaciones cognitivas en formato ICFES",
      en: "Cognitive assessments in ICFES format",
    },
    description: {
      es: "Aplicación para la Institución Educativa Técnica San José (Fresno, Tolima) que integra evaluaciones cognitivas en un cuadernillo tipo ICFES.",
      en: "Application for Institución Educativa Técnica San José (Fresno, Tolima) that integrates cognitive assessments into an ICFES-style booklet.",
    },
  },
];
