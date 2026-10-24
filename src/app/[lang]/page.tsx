import { notFound } from "next/navigation";
import { About } from "@/components/About";
import { Achievements } from "@/components/Achievements";
import { Contact } from "@/components/Contact";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Projects } from "@/components/Projects";
import { profile } from "@/content/profile";
import { projects } from "@/content/projects";
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
    jobTitle: profile.role[lang],
    email: profile.email,
    address: { "@type": "PostalAddress", addressLocality: "Manizales", addressCountry: "CO" },
    sameAs: [profile.links.github, profile.links.linkedin, profile.links.credly],
  };

  return (
    <>
      <Header lang={lang} t={t} />
      <main className="flex-1">
        <Hero lang={lang} t={t} />
        <About lang={lang} t={t} />
        <Projects lang={lang} t={t} projects={projects} />
        <Achievements lang={lang} t={t} />
        <Contact lang={lang} t={t} />
      </main>
      <footer className="border-t border-border px-5 py-8 text-center text-xs text-muted">
        © {profile.name}. {t.footer.rights}
      </footer>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replaceAll("<", "\\u003c") }} />
    </>
  );
}
