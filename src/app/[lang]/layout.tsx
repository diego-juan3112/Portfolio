import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { Barlow, Barlow_Condensed } from "next/font/google";
import { hasLocale, locales } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import "../globals.css";

// Barlow: la rotulación de los equipos de estudio; la condensada para titulares y escalas
const barlow = Barlow({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
  variable: "--font-barlow",
  display: "swap",
});
const barlowCond = Barlow_Condensed({
  weight: ["600", "700"],
  subsets: ["latin"],
  variable: "--font-barlow-cond",
  display: "swap",
});

// Se evalúa en build (las páginas son estáticas): define la URL antes de compilar.
// En Vercel, si no hay dominio propio configurado, se usa el dominio de producción del proyecto.
const vercelUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL;
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || (vercelUrl ? `https://${vercelUrl}` : "http://localhost:3000");

export const viewport: Viewport = { themeColor: "#16130f" };

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const t = getDictionary(lang).meta;
  return {
    metadataBase: new URL(siteUrl),
    title: t.title,
    description: t.description,
    alternates: { canonical: `/${lang}`, languages: { es: "/es", en: "/en" } },
    openGraph: {
      title: t.title,
      description: t.description,
      type: "website",
      locale: lang === "es" ? "es_CO" : "en_US",
      url: `/${lang}`,
    },
    twitter: { card: "summary_large_image", title: t.title, description: t.description },
  };
}

export default async function RootLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  return (
    <html lang={lang} className={`${barlow.variable} ${barlowCond.variable} antialiased`} suppressHydrationWarning>
      <head>
        {/* Activa los estados ocultos del movimiento solo cuando hay JS (ver globals.css) */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body className="flex min-h-dvh flex-col">{children}</body>
    </html>
  );
}
