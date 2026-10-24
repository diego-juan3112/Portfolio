"use client";

import { useRef, useState } from "react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";

type Message = { role: "user" | "assistant"; content: string };

export function ChatBox({ lang, t }: { lang: Locale; t: Dictionary["chat"] }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [failed, setFailed] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  async function send(text: string) {
    const content = text.trim();
    if (!content || loading) return;
    const next: Message[] = [...messages, { role: "user", content }];
    setMessages(next);
    setInput("");
    setFailed(false);
    setLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ locale: lang, messages: next.slice(-12) }),
      });
      if (!res.ok) throw new Error(String(res.status));
      const { reply } = (await res.json()) as { reply: string };
      setMessages([...next, { role: "assistant", content: reply }]);
    } catch {
      setFailed(true);
    } finally {
      setLoading(false);
      queueMicrotask(() => endRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" }));
    }
  }

  return (
    <div className="flex h-full flex-col rounded-3xl border border-border bg-surface p-5">
      <h3 className="font-display text-2xl uppercase">{t.title}</h3>
      <p className="mt-1 text-sm text-muted">{t.intro}</p>

      <div className="mt-4 max-h-72 min-h-32 flex-1 space-y-3 overflow-y-auto pr-1" aria-live="polite">
        {messages.length === 0 && (
          <ul className="flex flex-wrap gap-2">
            {t.suggestions.map((s) => (
              <li key={s}>
                <button
                  type="button"
                  onClick={() => send(s)}
                  className="rounded-full border border-border px-3 py-1.5 text-left text-xs text-muted transition-colors hover:text-foreground"
                >
                  {s}
                </button>
              </li>
            ))}
          </ul>
        )}
        {messages.map((m, i) => (
          <p
            key={i}
            className={`whitespace-pre-wrap rounded-2xl px-4 py-2 text-sm ${
              m.role === "user" ? "ml-8 bg-surface-2" : "mr-8 border border-border"
            }`}
          >
            {m.content}
          </p>
        ))}
        {loading && <p className="text-sm text-muted">{t.thinking}</p>}
        {failed && <p className="text-sm text-red-400">{t.error}</p>}
        <div ref={endRef} />
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          void send(input);
        }}
        className="mt-4 flex gap-2"
      >
        <label htmlFor="chat-input" className="sr-only">
          {t.title}
        </label>
        <input
          id="chat-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          maxLength={1000}
          placeholder={t.placeholder}
          className="min-w-0 flex-1 rounded-full border border-border bg-background px-4 py-2 text-sm outline-none focus:border-accent-via"
        />
        <button
          type="submit"
          disabled={loading}
          className="rounded-full bg-foreground px-5 py-2 text-xs font-bold uppercase tracking-widest text-background disabled:opacity-60"
        >
          {t.send}
        </button>
      </form>
    </div>
  );
}
