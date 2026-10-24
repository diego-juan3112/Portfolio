import { profile } from "@/content/profile";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { ChatBox } from "./ChatBox";
import { ContactForm } from "./ContactForm";
import { FitAnalyzer } from "./FitAnalyzer";

export function Contact({ lang, t }: { lang: Locale; t: Dictionary }) {
  return (
    <section id="contact" className="scroll-mt-8 px-5 py-20">
      <div className="mx-auto max-w-6xl">
        <h2 className="font-display text-4xl uppercase sm:text-5xl">{t.contact.title}</h2>
        <p className="mt-3 max-w-xl text-muted">{t.contact.intro}</p>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <ChatBox lang={lang} t={t.chat} />
          <FitAnalyzer lang={lang} t={t.fit} />
        </div>

        <div className="mt-6 grid gap-6 rounded-3xl border border-border bg-surface p-6 lg:grid-cols-2">
          <ContactForm t={t.contact} />
          <ul className="space-y-3 self-center text-sm">
            <li>
              <a href={`mailto:${profile.email}`} className="hover:text-accent-via">
                {profile.email}
              </a>
            </li>
            <li>
              <a href={`tel:${profile.phone.replace(/\s/g, "")}`} className="hover:text-accent-via">
                {profile.phone}
              </a>
            </li>
            <li className="text-muted">{profile.location}</li>
            <li className="flex gap-4 pt-2 text-xs font-bold uppercase tracking-widest">
              <a href={profile.links.github} target="_blank" rel="noopener noreferrer" className="hover:text-accent-via">
                GitHub ↗
              </a>
              <a href={profile.links.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-accent-via">
                LinkedIn ↗
              </a>
              <a href={profile.links.credly} target="_blank" rel="noopener noreferrer" className="hover:text-accent-via">
                Credly ↗
              </a>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
