import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import { createPublicSupabase } from "./supabase-public.server";
import { applyMedia, resolveMediaUrls } from "./media.server";
import type { BlogPost, BlogPostSummary, PortfolioItem, SiteContent } from "./site-content.types";

export const getSiteContent = createServerFn({ method: "GET" }).handler(
  async (): Promise<SiteContent> => {
    const supabase = createPublicSupabase();

    const [
      settings,
      sections,
      benefits,
      steps,
      plans,
      features,
      templates,
      faqs,
      testimonials,
      portfolio,
    ] = await Promise.all([
        supabase.from("site_settings").select("*").limit(1).maybeSingle(),
        supabase.from("site_sections").select("*").order("sort_order"),
        supabase.from("benefits").select("*").order("sort_order"),
        supabase.from("process_steps").select("*").order("sort_order"),
        supabase.from("plans").select("*").order("sort_order"),
        supabase.from("plan_features").select("*").order("sort_order"),
        supabase.from("templates").select("*").order("sort_order"),
        supabase.from("faqs").select("*").order("sort_order"),
        supabase.from("testimonials").select("*").order("sort_order"),
        supabase.from("portfolio_items").select("*").order("sort_order"),
      ]);

    const media = await resolveMediaUrls([
      settings.data?.logo_url,
      ...(templates.data ?? []).map((t) => t.cover_url),
      ...(testimonials.data ?? []).map((t) => t.avatar_url),
      ...(portfolio.data ?? []).map((p) => p.cover_url),
    ]);

    return {
      settings: settings.data ?? null,
      sections: sections.data ?? [],
      benefits: benefits.data ?? [],
      steps: steps.data ?? [],
      plans: (plans.data ?? []).map((plan) => ({
        ...plan,
        features: (features.data ?? []).filter((f) => f.plan_id === plan.id),
      })),
      templates: (templates.data ?? []).map((t) => ({
        ...t,
        cover_url: applyMedia(media, t.cover_url),
      })),
      faqs: faqs.data ?? [],
      testimonials: (testimonials.data ?? []).map((t) => ({
        ...t,
        avatar_url: applyMedia(media, t.avatar_url),
      })),
      portfolio: (portfolio.data ?? []).map((p) => ({
        ...p,
        cover_url: applyMedia(media, p.cover_url),
      })),
    };
  },
);

export const getPortfolioItem = createServerFn({ method: "GET" })
  .inputValidator((data: unknown) => z.object({ slug: z.string().max(120) }).parse(data))
  .handler(async ({ data }): Promise<PortfolioItem | null> => {
    const supabase = createPublicSupabase();
    const { data: item } = await supabase
      .from("portfolio_items")
      .select("*")
      .eq("slug", data.slug)
      .eq("is_published", true)
      .maybeSingle();
    if (!item) return null;
    const media = await resolveMediaUrls([item.cover_url, ...item.gallery]);
    return {
      ...item,
      cover_url: applyMedia(media, item.cover_url),
      gallery: item.gallery.map((g) => applyMedia(media, g) ?? g),
    };
  });

export const listBlogPosts = createServerFn({ method: "GET" }).handler(
  async (): Promise<BlogPostSummary[]> => {
    const supabase = createPublicSupabase();
    const { data } = await supabase
      .from("blog_posts")
      .select("id, slug, title, excerpt, cover_url, tags, published_at")
      .eq("is_published", true)
      .order("published_at", { ascending: false });
    const posts = data ?? [];
    const media = await resolveMediaUrls(posts.map((p) => p.cover_url));
    return posts.map((p) => ({ ...p, cover_url: applyMedia(media, p.cover_url) }));
  },
);

export const getBlogPost = createServerFn({ method: "GET" })
  .inputValidator((data: unknown) => z.object({ slug: z.string().max(120) }).parse(data))
  .handler(async ({ data }): Promise<BlogPost | null> => {
    const supabase = createPublicSupabase();
    const { data: post } = await supabase
      .from("blog_posts")
      .select("*")
      .eq("slug", data.slug)
      .eq("is_published", true)
      .maybeSingle();
    if (!post) return null;
    const media = await resolveMediaUrls([post.cover_url]);
    return { ...post, cover_url: applyMedia(media, post.cover_url) };
  });

const leadSchema = z.object({
  name: z.string().trim().min(2, "Informe seu nome").max(120),
  email: z.string().trim().email("E-mail inválido").max(255),
  whatsapp: z.string().trim().min(8, "Informe um WhatsApp válido").max(30),
  company: z.string().trim().max(120).optional().or(z.literal("")),
  city: z.string().trim().max(120).optional().or(z.literal("")),
  niche: z.string().trim().max(120).optional().or(z.literal("")),
  service: z.string().trim().max(160).optional().or(z.literal("")),
  notes: z.string().trim().max(1500).optional().or(z.literal("")),
  consent: z.literal(true, { errorMap: () => ({ message: "É necessário aceitar a política." }) }),
});

export type LeadInput = z.infer<typeof leadSchema>;

export const submitLead = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => leadSchema.parse(data))
  .handler(async ({ data }) => {
    const supabase = createPublicSupabase();
    const { error } = await supabase.from("leads").insert({
      name: data.name,
      email: data.email,
      whatsapp: data.whatsapp,
      company: data.company || null,
      city: data.city || null,
      niche: data.niche || null,
      service: data.service || null,
      notes: data.notes || null,
      consent: true,
      source: "site",
      is_demo: false,
    });
    if (error) throw new Error("Não foi possível enviar seu pedido agora.");
    const { onLeadCreated } = await import("./automations.server");
    await onLeadCreated({
      name: data.name,
      email: data.email,
      whatsapp: data.whatsapp,
      service: data.service || null,
      source: "site",
    });
    return { ok: true };
  });
