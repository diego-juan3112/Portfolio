import { z } from "zod";

export const localeSchema = z.enum(["es", "en"]);

export const chatRequestSchema = z.object({
  locale: localeSchema,
  messages: z
    .array(
      z.object({
        role: z.enum(["user", "assistant"]),
        content: z.string().min(1).max(1000),
      }),
    )
    .min(1)
    .max(12),
});

export const fitRequestSchema = z.object({
  locale: localeSchema,
  criteria: z.string().trim().min(20).max(4000),
});

export const fitResultSchema = z.object({
  score: z.number().min(0).max(100),
  summary: z.string(),
  requirements: z
    .array(
      z.object({
        requirement: z.string(),
        level: z.enum(["strong", "partial", "gap"]),
        evidence: z.string(),
      }),
    )
    .max(12),
  gaps: z.array(z.object({ gap: z.string(), plan: z.string() })).max(8),
});
export type FitResult = z.infer<typeof fitResultSchema>;

export const contactSchema = z.object({
  name: z.string().trim().min(2).max(80),
  email: z.email().max(120),
  message: z.string().trim().min(10).max(2000),
  website: z.string().max(0).optional(), // honeypot: debe venir vacío
  turnstileToken: z.string().optional(),
});
