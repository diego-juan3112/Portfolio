import { NextResponse } from "next/server";
import { ThinkingLevel } from "@google/genai";
import { AiNotConfiguredError, chatModel, getGemini } from "@/lib/ai/gemini";
import { chatSystemPrompt } from "@/lib/ai/prompts";
import { chatRequestSchema } from "@/lib/ai/schemas";
import { clientIp, rateLimit } from "@/lib/ratelimit";

export async function POST(request: Request) {
  if (!rateLimit(`chat:${clientIp(request)}`, 15, 10 * 60_000)) {
    return NextResponse.json({ error: "rate_limited" }, { status: 429 });
  }

  const parsed = chatRequestSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "invalid_request" }, { status: 400 });
  const { locale, messages } = parsed.data;

  try {
    const response = await getGemini().models.generateContent({
      model: chatModel(),
      contents: messages.map((m) => ({
        role: m.role === "assistant" ? "model" : "user",
        parts: [{ text: m.content }],
      })),
      config: {
        systemInstruction: chatSystemPrompt(locale),
        // El límite incluye los tokens de razonamiento del modelo: con poco margen la respuesta sale cortada
        maxOutputTokens: 1024,
        thinkingConfig: { thinkingLevel: ThinkingLevel.LOW },
        temperature: 0.3,
      },
    });
    return NextResponse.json({ reply: response.text ?? "" });
  } catch (error) {
    if (error instanceof AiNotConfiguredError) {
      return NextResponse.json({ error: "not_configured" }, { status: 503 });
    }
    console.error("chat failed", error);
    return NextResponse.json({ error: "upstream_error" }, { status: 502 });
  }
}
