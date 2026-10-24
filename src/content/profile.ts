import type { Locale } from "@/i18n/config";

export type Localized<T> = Record<Locale, T>;

export const profile = {
  name: "Juan Diego Henao Quintero",
  firstName: "Juan Diego",
  role: {
    es: "Data Engineer & Backend Developer",
    en: "Data Engineer & Backend Developer",
  } satisfies Localized<string>,
  stackLine: "Python · Java · AWS Cloud",
  location: "Manizales, Colombia",
  email: "jdiegohenao04@outlook.com",
  phone: "+57 314 206 9599",
  links: {
    github: "https://github.com/diego-juan3112",
    linkedin: "https://www.linkedin.com/in/juan-diego-henao-quintero-128045345/",
    credly: "https://www.credly.com/users/juan-henao.886c14ad",
  },
  summary: {
    es: "Ingeniero de Sistemas en formación con enfoque en Data Engineering y desarrollo backend (Java / Python). He construido pipelines ETL, APIs con FastAPI y Spring Boot e infraestructura como código en AWS. Ganador de 3 hackathones nacionales entregando soluciones con IA e integración de APIs en menos de 48 horas. Miembro activo de AWS User Group Manizales.",
    en: "Systems Engineering student focused on Data Engineering and backend development (Java / Python). I have built ETL pipelines, FastAPI and Spring Boot APIs, and infrastructure as code on AWS. Winner of 3 national hackathons, delivering AI and API-integration solutions in under 48 hours. Active member of AWS User Group Manizales.",
  } satisfies Localized<string>,
  languages: {
    es: "Español (nativo) · Inglés B1 (EF SET)",
    en: "Spanish (native) · English B1 (EF SET)",
  } satisfies Localized<string>,
  education: {
    es: "Ingeniería de Sistemas y Computación · Universidad de Caldas · Ago. 2022 – actualidad",
    en: "Systems & Computer Engineering · Universidad de Caldas · Aug 2022 – present",
  } satisfies Localized<string>,
};

export const skillGroups: {
  id: string;
  label: Localized<string>;
  items: string[];
}[] = [
  {
    id: "backend",
    label: { es: "Backend y lenguajes", en: "Backend & languages" },
    items: ["Python", "FastAPI", "Django", "Java", "Spring Boot", "Node.js", "SQL", "GraphQL", "JUnit", "pytest"],
  },
  {
    id: "data",
    label: { es: "Datos y ML", en: "Data & ML" },
    items: ["ETL", "Pandas", "NumPy", "Scikit-learn", "Predictive Analytics", "Streamlit", "Looker Studio"],
  },
  {
    id: "cloud",
    label: { es: "Cloud y DevOps", en: "Cloud & DevOps" },
    items: ["AWS", "CloudFormation", "EC2", "S3", "IAM", "RDS", "Docker", "Kubernetes", "Terraform", "GitHub Actions", "n8n"],
  },
  {
    id: "db",
    label: { es: "Bases de datos", en: "Databases" },
    items: ["PostgreSQL", "MySQL", "MongoDB", "Firestore", "Redis"],
  },
  {
    id: "front",
    label: { es: "Frontend", en: "Frontend" },
    items: ["React", "Next.js", "Tailwind CSS", "React Native"],
  },
];

export const experience = {
  title: "Java Engineer en el Sistema Biblioteca Rogelio Salmona",
  org: "Universidad de Caldas",
  duration: { es: "6 meses", en: "6 months" } satisfies Localized<string>,
  bullets: {
    es: [
      "Optimicé consultas y esquemas en MySQL del sistema de préstamos y registros, reduciendo tiempos de respuesta en operaciones críticas.",
      "Diseñé procesos de limpieza y mantenimiento de datos que garantizan la integridad de los registros académicos en producción.",
      "Mantuve y optimicé módulos backend en Java y gestioné dependencias con Maven para reducir errores de compilación.",
    ],
    en: [
      "Optimized MySQL queries and schemas behind the library loan and records system, reducing response times in critical operations.",
      "Designed data cleaning and maintenance processes that keep academic records consistent in production.",
      "Maintained and optimized Java backend modules and managed Maven dependencies to reduce build errors.",
    ],
  } satisfies Localized<string[]>,
};

export const achievements: {
  id: string;
  date: string;
  title: Localized<string>;
  detail: Localized<string>;
}[] = [
  {
    id: "talento-tech-2023",
    date: "10/2023",
    title: { es: "Ganador de Talento Tech", en: "Winner of Talento Tech" },
    detail: {
      es: "Solución de automatización y procesamiento de datos entregada en menos de 48 horas.",
      en: "Automation and data-processing solution delivered in under 48 hours.",
    },
  },
  {
    id: "talento-tech-2025",
    date: "07/2025",
    title: { es: "Ganador de Talento Tech", en: "Winner of Talento Tech" },
    detail: {
      es: "Segunda victoria: automatización y procesamiento de datos en menos de 48 horas.",
      en: "Second win: automation and data processing in under 48 hours.",
    },
  },
  {
    id: "colombia-5-0",
    date: "03/2026",
    title: { es: "Ganador de Colombia 5.0 (MinTIC)", en: "Winner of Colombia 5.0 (MinTIC)" },
    detail: {
      es: "Solución basada en IA e integración de APIs desarrollada bajo presión de tiempo.",
      en: "AI and API-integration solution built under time pressure.",
    },
  },
];

export const certifications = [
  { id: "aws-academy", name: "AWS Academy Graduate: Cloud Foundations", date: "Sep 2025", when: "09/2025" },
  { id: "aws-educate", name: "AWS Educate: Introduction to Cloud 101", date: "Mar 2026", when: "03/2026" },
];
