import { NextResponse } from "next/server";
import { ThinkingLevel, type GenerateContentResponse } from "@google/genai";
import { AiNotConfiguredError, chatModels, getGemini, withFallback } from "@/lib/ai/gemini";
import { chatSystemPrompt } from "@/lib/ai/prompts";
import { chatRequestSchema } from "@/lib/ai/schemas";
import { clientIp, rateLimit } from "@/lib/ratelimit";

// Tiempo máximo para que un modelo entregue su primer fragmento antes de pasar al siguiente
const FIRST_CHUNK_TIMEOUT_MS = 8_000;

export async function POST(request: Request) {
  if (!rateLimit(`chat:${clientIp(request)}`, 15, 10 * 60_000)) {
    return NextResponse.json({ error: "rate_limited" }, { status: 429 });
  }

  const parsed = chatRequestSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "invalid_request" }, { status: 400 });
  const { locale, messages } = parsed.data;

  let first: IteratorResult<GenerateContentResponse>;
  let stream: AsyncGenerator<GenerateContentResponse>;
  try {
    // Se abre el stream y se espera el primer fragmento dentro del intento: así un modelo
    // saturado o lento cae al siguiente antes de que el visitante vea nada.
    [stream, first] = await withFallback(chatModels(), FIRST_CHUNK_TIMEOUT_MS, async (model, signal) => {
      const s = await getGemini().models.generateContentStream({
        model,
        contents: messages.map((m) => ({
          role: m.role === "assistant" ? "model" : "user",
          parts: [{ text: m.content }],
        })),
        config: {
          systemInstruction: chatSystemPrompt(locale),
          // El límite incluye los tokens de razonamiento: con poco margen la respuesta sale cortada
          maxOutputTokens: 1500,
          thinkingConfig: { thinkingLevel: ThinkingLevel.MINIMAL },
          temperature: 0.3,
          abortSignal: signal,
        },
      });
      return [s, await s.next()] as const;
    });
  } catch (error) {
    if (error instanceof AiNotConfiguredError) {
      return NextResponse.json({ error: "not_configured" }, { status: 503 });
    }
    console.error("chat failed", error);
    return NextResponse.json({ error: "upstream_error" }, { status: 502 });
  }

  const encoder = new TextEncoder();
  const body = new ReadableStream<Uint8Array>({
    async start(controller) {
      try {
        if (!first.done && first.value.text) controller.enqueue(encoder.encode(first.value.text));
        for await (const chunk of stream) {
          if (chunk.text) controller.enqueue(encoder.encode(chunk.text));
        }
      } catch (error) {
        console.error("chat stream interrupted", error);
      } finally {
        controller.close();
      }
    },
  });

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-store" },
  });
}
