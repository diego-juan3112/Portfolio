import "server-only";
import { ApiError, GoogleGenAI } from "@google/genai";

let client: GoogleGenAI | null = null;

export class AiNotConfiguredError extends Error {
  constructor() {
    super("GEMINI_API_KEY is not set");
  }
}

export function getGemini(): GoogleGenAI {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw new AiNotConfiguredError();
  client ??= new GoogleGenAI({ apiKey });
  return client;
}

// Modelos rápidos primero; si uno está saturado o retirado se prueba el siguiente.
// Se pueden sobrescribir con una lista separada por comas en GEMINI_CHAT_MODEL / GEMINI_FIT_MODEL.
const DEFAULT_CHAIN = ["gemini-3.5-flash-lite", "gemini-3.1-flash-lite", "gemini-3.8-flash"];

function chainFrom(value: string | undefined): string[] {
  const models = value?.split(",").map((m) => m.trim()).filter(Boolean) ?? [];
  return models.length > 0 ? models : DEFAULT_CHAIN;
}

export const chatModels = () => chainFrom(process.env.GEMINI_CHAT_MODEL);
export const fitModels = () => chainFrom(process.env.GEMINI_FIT_MODEL);

/** Errores que justifican probar con otro modelo: saturación, cuota, modelo retirado o tiempo agotado. */
function isRetryable(error: unknown): boolean {
  if (error instanceof ApiError) return [404, 408, 429, 500, 502, 503, 504].includes(error.status);
  // DOMException no hereda de Error en todos los entornos: se compara por nombre
  const name = (error as { name?: unknown } | null)?.name;
  return name === "AbortError" || name === "TimeoutError";
}

/**
 * Ejecuta `attempt` con cada modelo de la cadena hasta que uno responda.
 * La señal se cancela si `attempt` no resuelve en `timeoutMs`; una vez resuelto el temporizador
 * se desactiva, así un stream que ya entregó su primer fragmento puede seguir sin límite.
 */
export async function withFallback<T>(
  models: string[],
  timeoutMs: number,
  attempt: (model: string, signal: AbortSignal) => Promise<T>,
): Promise<T> {
  let lastError: unknown;
  for (const model of models) {
    const controller = new AbortController();
    const timer = setTimeout(
      () => controller.abort(new DOMException(`${model} timed out`, "TimeoutError")),
      timeoutMs,
    );
    try {
      return await attempt(model, controller.signal);
    } catch (error) {
      lastError = error;
      if (error instanceof AiNotConfiguredError || !isRetryable(error)) throw error;
      console.warn(`gemini: ${model} failed, trying next model`, error instanceof ApiError ? error.status : error);
    } finally {
      clearTimeout(timer);
    }
  }
  throw lastError;
}
