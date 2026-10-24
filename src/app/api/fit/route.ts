import { NextResponse } from "next/server";
import { z } from "zod";
import { AiNotConfiguredError, fitModel, getGemini } from "@/lib/ai/gemini";
import { fitSystemPrompt } from "@/lib/ai/prompts";
import { fitRequestSchema, fitResultSchema } from "@/lib/ai/schemas";
import { clientIp, rateLimit } from "@/lib/ratelimit";

export async function POST(request: Request) {
  if (!rateLimit(`fit:${clientIp(request)}`, 5, 10 * 60_000)) {
    return NextResponse.json({ error: "rate_limited" }, { status: 429 });
  }

  const parsed = fitRequestSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "invalid_request" }, { status: 400 });
  const { locale, criteria } = parsed.data;

  try {
    const response = await getGemini().models.generateContent({
      model: fitModel(),
      contents: `<criterios_de_la_vacante>\n${criteria}\n</criterios_de_la_vacante>`,
      config: {
        systemInstruction: fitSystemPrompt(locale),
        responseMimeType: "application/json",
        responseJsonSchema: z.toJSONSchema(fitResultSchema),
        maxOutputTokens: 2000,
        temperature: 0.2,
      },
    });
    const result = fitResultSchema.safeParse(JSON.parse(response.text ?? "{}"));
    if (!result.success) {
      return NextResponse.json({ error: "bad_model_output" }, { status: 502 });
    }
    return NextResponse.json(result.data);
  } catch (error) {
    if (error instanceof AiNotConfiguredError) {
      return NextResponse.json({ error: "not_configured" }, { status: 503 });
    }
    console.error("fit failed", error);
    return NextResponse.json({ error: "upstream_error" }, { status: 502 });
  }
}
