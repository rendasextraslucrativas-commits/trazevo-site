import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

const trackViewSchema = z.object({
  path: z.string().trim().min(1).max(300),
  referrer: z.string().trim().max(500).nullable().optional(),
  utm_source: z.string().trim().max(120).nullable().optional(),
  utm_medium: z.string().trim().max(120).nullable().optional(),
  utm_campaign: z.string().trim().max(120).nullable().optional(),
  device: z.enum(["mobile", "tablet", "desktop"]).nullable().optional(),
  session_id: z.string().trim().max(60).nullable().optional(),
});

const trackConversionSchema = z.object({
  event_type: z.enum([
    "orcamento",
    "whatsapp",
    "plano",
    "contato",
    "modelo_view",
    "modelo_cta",
    "agendamento",
    "tratamento",
    "galeria",
    "faq",
    "scroll",
    "form_erro",
    "retorno_portfolio",
  ]),
  path: z.string().trim().max(300).nullable().optional(),
  label: z.string().trim().max(200).nullable().optional(),
  session_id: z.string().trim().max(60).nullable().optional(),
});

export const trackPageView = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => trackViewSchema.parse(data))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    await supabaseAdmin.from("page_views").insert({
      path: data.path,
      referrer: data.referrer || null,
      utm_source: data.utm_source || null,
      utm_medium: data.utm_medium || null,
      utm_campaign: data.utm_campaign || null,
      device: data.device || null,
      session_id: data.session_id || null,
    });
    return { ok: true };
  });

export const trackConversion = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => trackConversionSchema.parse(data))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    await supabaseAdmin.from("conversion_events").insert({
      event_type: data.event_type,
      path: data.path || null,
      label: data.label || null,
      session_id: data.session_id || null,
    });
    return { ok: true };
  });

export const getAnalytics = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: unknown) =>
    z.object({ days: z.number().int().min(1).max(180).default(30) }).parse(data ?? {}),
  )
  .handler(async ({ data, context }) => {
    const since = new Date(Date.now() - data.days * 86_400_000).toISOString();
    const [views, conversions, leads] = await Promise.all([
      context.supabase.from("page_views").select("*").gte("created_at", since),
      context.supabase.from("conversion_events").select("*").gte("created_at", since),
      context.supabase.from("leads").select("id, created_at").gte("created_at", since),
    ]);
    return {
      days: data.days,
      views: views.data ?? [],
      conversions: conversions.data ?? [],
      leadsCount: (leads.data ?? []).length,
    };
  });
