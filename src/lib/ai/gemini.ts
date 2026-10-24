import "server-only";
import { GoogleGenAI } from "@google/genai";

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

export const chatModel = () => process.env.GEMINI_CHAT_MODEL ?? "gemini-3.8-flash";
export const fitModel = () => process.env.GEMINI_FIT_MODEL ?? "gemini-3.8-flash";
