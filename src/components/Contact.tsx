import { profile } from "@/content/profile";
import type { Dictionary } from "@/i18n/dictionaries";
import { ContactForm } from "./ContactForm";

export function Contact({ t }: { t: Dictionary }) {
  const channels = [
    { href: `mailto:${profile.email}`, label: profile.email },
    { href: `tel:${profile.phone.replace(/\s/g, "")}`, label: profile.phone },
    { href: profile.links.linkedin, label: "LinkedIn", external: true },
    { href: profile.links.github, label: "GitHub", external: true },
  ];
  return (
    <section id="contact" aria-labelledby="contact-title" className="scroll-mt-4">
      <div className="mx-auto grid w-full max-w-[90rem] gap-x-16 gap-y-12 px-5 py-24 sm:px-8 sm:py-36 lg:grid-cols-[1fr_1.15fr]">
        <div className="min-w-0">
          <h2 id="contact-title" className="display text-5xl sm:text-7xl" data-reveal>
            {t.contact.title}
          </h2>
          <p className="mt-6 max-w-lg text-xl leading-snug" data-reveal style={{ "--i": 1 } as React.CSSProperties}>
            {t.contact.intro}
          </p>
          <h3 className="mt-12 font-cond text-2xl font-bold" data-reveal>
            {t.contact.direct}
          </h3>
          <ul className="mt-3 space-y-2 text-xl" data-reveal style={{ "--i": 1 } as React.CSSProperties}>
            {channels.map((c) => (
              <li key={c.href}>
                <a
                  href={c.href}
                  className="link"
                  {...(c.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                >
                  {c.label}
                </a>
              </li>
            ))}
            <li className="text-on-desk-soft">{profile.location}</li>
          </ul>
        </div>
        <div className="min-w-0 lg:pt-4" data-reveal style={{ "--i": 2 } as React.CSSProperties}>
          <ContactForm t={t.contact} />
        </div>
      </div>
    </section>
  );
}
