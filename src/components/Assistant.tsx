"use client";

import { useRef, useState } from "react";
import type { Locale } from "@/i18n/config";
import { errorMessage, type Dictionary } from "@/i18n/dictionaries";
import { describeSource, parseAnswer, type Source } from "@/lib/ai/sources";

type Message = { role: "user" | "assistant"; content: string };

/** Párrafos y listas con "- " del texto plano que devuelve el modelo. */
function AnswerBody({ text }: { text: string }) {
  const blocks: { list: boolean; lines: string[] }[] = [];
  for (const raw of text.split("\n")) {
    const line = raw.trim();
    if (!line) continue;
    const isItem = line.startsWith("- ");
    const last = blocks.at(-1);
    if (last && last.list === isItem && isItem) last.lines.push(line.slice(2));
    else blocks.push({ list: isItem, lines: [isItem ? line.slice(2) : line] });
  }
  return (
    <div className="space-y-3">
      {blocks.map((b, i) =>
        b.list ? (
          <ul key={i} className="list-disc space-y-1 pl-5 marker:text-red">
            {b.lines.map((l) => (
              <li key={l}>{l}</li>
            ))}
          </ul>
        ) : (
          <p key={i}>{b.lines[0]}</p>
        ),
      )}
    </div>
  );
}

export function Assistant({ lang, t }: { lang: Locale; t: Dictionary["assistant"] }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const logRef = useRef<HTMLDivElement>(null);

  const scrollLog = () => logRef.current?.scrollTo({ top: logRef.current.scrollHeight, behavior: "smooth" });

  async function ask(text: string) {
    const content = text.trim();
    if (!content || loading) return;
    const history: Message[] = [...messages, { role: "user", content }];
    setMessages([...history, { role: "assistant", content: "" }]);
    setInput("");
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // Al modelo se le envía solo el texto visible de respuestas anteriores, sin la línea de fuentes
        body: JSON.stringify({
          locale: lang,
          messages: history.slice(-12).map((m) => ({ ...m, content: parseAnswer(m.content).body || m.content })),
        }),
      });
      if (!res.ok || !res.body) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error ?? "default");
      }
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let answer = "";
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        answer += decoder.decode(value, { stream: true });
        setMessages([...history, { role: "assistant", content: answer }]);
        scrollLog();
      }
      if (!parseAnswer(answer).body) throw new Error("default");
    } catch (e) {
      setMessages(history);
      setError(errorMessage(t.errors, e instanceof Error ? e.message : undefined));
    } finally {
      setLoading(false);
      scrollLog();
    }
  }

  return (
    <section id="assistant" aria-labelledby="assistant-title" className="on-face scroll-mt-4">
      <div className="mx-auto grid w-full max-w-[90rem] gap-x-16 gap-y-10 px-5 py-24 sm:px-8 sm:py-36 lg:grid-cols-[1fr_1.15fr]">
        <div className="min-w-0">
          <h2 id="assistant-title" className="display text-5xl sm:text-7xl" data-reveal>
            {t.title}
          </h2>
          <p className="mt-6 max-w-lg text-xl leading-snug" data-reveal style={{ "--i": 1 } as React.CSSProperties}>
            {t.intro}
          </p>
          <ul className="mt-8 space-y-2" data-reveal style={{ "--i": 2 } as React.CSSProperties}>
            {t.suggestions.map((s) => (
              <li key={s}>
                <button
                  type="button"
                  onClick={() => ask(s)}
                  disabled={loading}
                  className="link text-left text-lg disabled:opacity-60"
                >
                  {s}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex min-w-0 flex-col bg-ink text-on-desk lg:min-h-[28rem]" data-reveal style={{ "--i": 1 } as React.CSSProperties}>
          <div ref={logRef} className="max-h-[32rem] flex-1 space-y-6 overflow-y-auto p-5 sm:p-6" aria-live="polite">
            {messages.length === 0 && (
              <div>
                <p className="text-base text-on-desk-soft">{t.bot}</p>
                <p className="text-lg">{t.greeting}</p>
              </div>
            )}
            {messages.map((m, i) => {
              if (m.role === "user") {
                return (
                  <div key={i}>
                    <p className="text-base text-on-desk-soft">{t.you}</p>
                    <p className="text-lg font-semibold">{m.content}</p>
                  </div>
                );
              }
              const { body, sourceIds } = parseAnswer(m.content);
              const sources = sourceIds.map((id) => describeSource(id, lang)).filter((s): s is Source => s !== null);
              return (
                <div key={i}>
                  <p className="text-base text-on-desk-soft">{t.bot}</p>
                  {body ? (
                    <div className="text-lg">
                      <AnswerBody text={body} />
                    </div>
                  ) : (
                    <p className="text-lg text-on-desk-soft">{t.thinking}</p>
                  )}
                  {sources.length > 0 && (
                    <div className="mt-4 bg-desk-2 px-4 py-3">
                      <p className="text-base text-on-desk-soft">{t.sources}</p>
                      <ul className="mt-1 flex flex-wrap gap-x-5 gap-y-1">
                        {sources.map((s) => (
                          <li key={s.id}>
                            <a href={s.href} className="link text-base">
                              {s.label}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              );
            })}
            {error && (
              <p role="alert" className="text-lg text-face">
                {error}
              </p>
            )}
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              void ask(input);
            }}
            className="flex gap-2 bg-desk-2 p-3"
          >
            <label htmlFor="assistant-input" className="sr-only">
              {t.label}
            </label>
            <input
              id="assistant-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              maxLength={1000}
              placeholder={t.placeholder}
              className="min-w-0 flex-1 rounded-[2px] bg-desk-3 px-4 text-lg text-on-desk caret-red outline-none placeholder:text-on-desk-soft focus-visible:outline-2 focus-visible:outline-red"
            />
            <button type="submit" disabled={loading} className="btn btn--red">
              {t.send}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
