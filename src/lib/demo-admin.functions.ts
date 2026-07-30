import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

const idSchema = z.object({ id: z.string().uuid() });

const demoSiteSchema = z.object({
  id: z.string().uuid().optional(),
  slug: z
    .string()
    .trim()
    .min(2)
    .max(120)
    .regex(/^[a-z0-9-]+$/, "Use apenas letras minúsculas, números e hífen"),
  name: z.string().trim().min(2).max(160),
  niche: z.string().trim().min(2).max(120),
  cover_url: z.string().trim().max(500).nullable().optional(),
  is_published: z.boolean(),
  is_highlighted: z.boolean(),
  sort_order: z.number().int().min(0).max(999),
  tags: z.array(z.string().trim().max(40)).max(20),
  meta_title: z.string().trim().max(160).nullable().optional(),
  meta_description: z.string().trim().max(300).nullable().optional(),
  theme: z.record(z.string(), z.unknown()),
  content: z.record(z.string(), z.unknown()),
});

export const listDemoSites = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data } = await context.supabase
      .from("demo_sites")
      .select("*")
      .order("sort_order")
      .order("created_at");
    return data ?? [];
  });

export const saveDemoSite = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: unknown) => demoSiteSchema.parse(data))
  .handler(async ({ data, context }) => {
    const { id, ...values } = data;
    if (id) {
      const { error } = await context.supabase
        .from("demo_sites")
        .update(values as never)
        .eq("id", id);
      if (error) throw new Error("Não foi possível salvar o modelo.");
      return { ok: true, id };
    }
    const { data: created, error } = await context.supabase
      .from("demo_sites")
      .insert(values as never)
      .select("id")
      .single();
    if (error || !created) throw new Error("Não foi possível criar o modelo.");
    return { ok: true, id: created.id };
  });

export const duplicateDemoSite = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: unknown) =>
    z
      .object({
        id: z.string().uuid(),
        slug: z
          .string()
          .trim()
          .min(2)
          .max(120)
          .regex(/^[a-z0-9-]+$/, "Use apenas letras minúsculas, números e hífen"),
        name: z.string().trim().min(2).max(160),
      })
      .parse(data),
  )
  .handler(async ({ data, context }) => {
    const { data: source } = await context.supabase
      .from("demo_sites")
      .select("*")
      .eq("id", data.id)
      .maybeSingle();
    if (!source) throw new Error("Modelo original não encontrado.");

    const { data: created, error } = await context.supabase
      .from("demo_sites")
      .insert({
        slug: data.slug,
        name: data.name,
        niche: source.niche,
        cover_url: source.cover_url,
        tags: source.tags,
        theme: source.theme,
        content: source.content,
        meta_title: source.meta_title,
        meta_description: source.meta_description,
        is_published: false,
        is_master: false,
        is_highlighted: false,
        sort_order: (source.sort_order ?? 0) + 1,
      })
      .select("id")
      .single();
    if (error || !created) throw new Error("Não foi possível duplicar o modelo.");
    return { ok: true, id: created.id };
  });

export const deleteDemoSite = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: unknown) => idSchema.parse(data))
  .handler(async ({ data, context }) => {
    const { data: row } = await context.supabase
      .from("demo_sites")
      .select("is_master")
      .eq("id", data.id)
      .maybeSingle();
    if (row?.is_master) throw new Error("O modelo mestre não pode ser excluído.");
    const { error } = await context.supabase.from("demo_sites").delete().eq("id", data.id);
    if (error) throw new Error("Não foi possível excluir o modelo.");
    return { ok: true };
  });
