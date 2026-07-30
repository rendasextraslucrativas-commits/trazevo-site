import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import { createPublicSupabase } from "./supabase-public.server";
import { applyMedia, resolveMediaUrls } from "./media.server";
import type { DemoContent, DemoSite, DemoTheme } from "./demo-site.types";

export const getDemoSite = createServerFn({ method: "GET" })
  .inputValidator((data: unknown) => z.object({ slug: z.string().trim().max(120) }).parse(data))
  .handler(async ({ data }): Promise<DemoSite | null> => {
    const supabase = createPublicSupabase();
    const { data: row } = await supabase
      .from("demo_sites")
      .select("*")
      .eq("slug", data.slug)
      .eq("is_published", true)
      .maybeSingle();
    if (!row) return null;

    const content = (row.content ?? {}) as DemoContent;
    const refs = [
      row.cover_url,
      content.hero?.image_url,
      content.about?.image_url,
      ...(content.gallery?.items ?? []).map((item) => item.image_url),
      ...(content.team?.items ?? []).map((item) => item.image_url),
    ];
    const media = await resolveMediaUrls(refs);

    return {
      ...row,
      theme: (row.theme ?? {}) as DemoTheme,
      cover_url: applyMedia(media, row.cover_url),
      content: {
        ...content,
        hero: content.hero
          ? { ...content.hero, image_url: applyMedia(media, content.hero.image_url) }
          : content.hero,
        about: content.about
          ? { ...content.about, image_url: applyMedia(media, content.about.image_url) }
          : content.about,
        gallery: content.gallery
          ? {
              ...content.gallery,
              items: (content.gallery.items ?? []).map((item) => ({
                ...item,
                image_url: applyMedia(media, item.image_url),
              })),
            }
          : content.gallery,
        team: content.team
          ? {
              ...content.team,
              items: (content.team.items ?? []).map((item) => ({
                ...item,
                image_url: applyMedia(media, item.image_url),
              })),
            }
          : content.team,
      },
    };
  });

const demoLeadSchema = z.object({
  name: z.string().trim().min(2, "Informe seu nome").max(120),
  whatsapp: z.string().trim().min(8, "Informe um WhatsApp válido").max(30),
  email: z.string().trim().email("E-mail inválido").max(255).optional().or(z.literal("")),
  treatment: z.string().trim().max(120).optional().or(z.literal("")),
  period: z.string().trim().max(60).optional().or(z.literal("")),
  message: z.string().trim().max(1000).optional().or(z.literal("")),
  model: z.string().trim().max(120),
  page_url: z.string().trim().max(400),
  campaign: z.string().trim().max(120).optional().or(z.literal("")),
  consent: z.literal(true, {
    errorMap: () => ({ message: "É necessário aceitar a política de privacidade." }),
  }),
});

export type DemoLeadInput = z.infer<typeof demoLeadSchema>;

export const submitDemoLead = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => demoLeadSchema.parse(data))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const since = new Date(Date.now() - 5 * 60_000).toISOString();
    const { data: duplicate } = await supabaseAdmin
      .from("leads")
      .select("id")
      .eq("whatsapp", data.whatsapp)
      .eq("source", "portfolio")
      .gte("created_at", since)
      .maybeSingle();
    if (duplicate) return { ok: true, duplicated: true };

    const { data: lead, error } = await supabaseAdmin
      .from("leads")
      .insert({
        name: data.name,
        whatsapp: data.whatsapp,
        email: data.email || null,
        service: data.treatment || null,
        niche: data.model,
        source: "portfolio",
        campaign: data.campaign || null,
        consent: true,
        is_demo: false,
        notes: [
          `Modelo: ${data.model}`,
          `URL: ${data.page_url}`,
          data.period ? `Melhor período: ${data.period}` : null,
          data.message ? `Mensagem: ${data.message}` : null,
        ]
          .filter(Boolean)
          .join("\n"),
      })
      .select("id")
      .single();

    if (error || !lead) throw new Error("Não foi possível enviar sua solicitação agora.");

    await supabaseAdmin.from("lead_activities").insert({
      lead_id: lead.id,
      type: "nota",
      content: `Este lead visualizou o modelo demonstrativo de ${data.model.toLowerCase()}.`,
    });

    const { onLeadCreated } = await import("./automations.server");
    await onLeadCreated({
      name: data.name,
      email: data.email || null,
      whatsapp: data.whatsapp,
      service: data.treatment || null,
      source: "portfolio",
    });

    return { ok: true, duplicated: false };
  });
