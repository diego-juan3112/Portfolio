import { notFound } from "next/navigation";
import { Assistant } from "@/components/Assistant";
import { Contact } from "@/components/Contact";
import { FitSection } from "@/components/FitSection";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Journey } from "@/components/Journey";
import { Motion } from "@/components/Motion";
import { Projects } from "@/components/Projects";
import { profile } from "@/content/profile";
import { hasLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const t = getDictionary(lang);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    jobTitle: lang === "es" ? "Ingeniero de datos e IA" : "Data & AI Engineer",
    email: profile.email,
    address: { "@type": "PostalAddress", addressLocality: "Manizales", addressCountry: "CO" },
    sameAs: [profile.links.github, profile.links.linkedin, profile.links.credly],
  };
  // Escapa "<" para que el JSON no pueda cerrar la etiqueta <script>
  const jsonLdHtml = JSON.stringify(jsonLd).replaceAll("<", String.raw`\u003c`);

  return (
    <>
      <Header lang={lang} t={t} />
      <main className="flex-1">
        <Hero lang={lang} t={t} />
        <FitSection lang={lang} t={t.fit} />
        <Projects lang={lang} t={t} />
        <div className="mx-auto w-full max-w-[90rem] px-5 pb-28 sm:px-8 sm:pb-40">
          <p data-fill className="max-w-4xl font-cond text-2xl font-semibold leading-tight md:text-[2rem] lg:text-4xl">
            {t.statement}
          </p>
        </div>
        <Journey lang={lang} t={t} />
        <Assistant lang={lang} t={t.assistant} />
        <Contact t={t} />
      </main>
      <footer className="mx-auto w-full max-w-[90rem] px-5 pb-10 pt-16 sm:px-8">
        <p className="display text-[clamp(3.4rem,9.5vw,9.25rem)]">{profile.name}</p>
        <p className="mt-6 text-base text-on-desk-soft">{t.footer.made}</p>
      </footer>
      <Motion />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdHtml }} />
    </>
  );
}
