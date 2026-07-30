import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import {
  benefitSchema,
  blogPostSchema,
  faqSchema,
  idSchema,
  leadActivitySchema,

  leadUpdateSchema,
  planSchema,
  portfolioSchema,
  projectSchema,
  projectTaskSchema,
  sectionSchema,
  testimonialSchema,
  settingsSchema,
} from "./admin.schemas";

export const getMe = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    // Garante o perfil e concede admin ao e-mail dono da agência no primeiro acesso.
    await context.supabase.rpc("ensure_profile_and_bootstrap_admin");
    const [profile, roles] = await Promise.all([
      context.supabase.from("profiles").select("*").eq("id", context.userId).maybeSingle(),
      context.supabase.from("user_roles").select("role").eq("user_id", context.userId),
    ]);
    return {
      userId: context.userId,
      email: (context.claims.email as string | undefined) ?? null,
      profile: profile.data ?? null,
      roles: (roles.data ?? []).map((r) => r.role),
    };
  });

export const getAdminContent = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const s = context.supabase;
    const [settings, sections, benefits, steps, plans, features, templates, faqs] =
      await Promise.all([
        s.from("site_settings").select("*").limit(1).maybeSingle(),
        s.from("site_sections").select("*").order("sort_order"),
        s.from("benefits").select("*").order("sort_order"),
        s.from("process_steps").select("*").order("sort_order"),
        s.from("plans").select("*").order("sort_order"),
        s.from("plan_features").select("*").order("sort_order"),
        s.from("templates").select("*").order("sort_order"),
        s.from("faqs").select("*").order("sort_order"),
      ]);
    return {
      settings: settings.data ?? null,
      sections: sections.data ?? [],
      benefits: benefits.data ?? [],
      steps: steps.data ?? [],
      plans: plans.data ?? [],
      features: features.data ?? [],
      templates: templates.data ?? [],
      faqs: faqs.data ?? [],
    };
  });

export const getCrmData = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const [stages, leads] = await Promise.all([
      context.supabase.from("lead_stages").select("*").order("sort_order"),
      context.supabase.from("leads").select("*").order("created_at", { ascending: false }),
    ]);
    return { stages: stages.data ?? [], leads: leads.data ?? [] };
  });

export const saveSettings = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: unknown) => settingsSchema.parse(data))
  .handler(async ({ data, context }) => {
    const current = await context.supabase.from("site_settings").select("id").limit(1).maybeSingle();
    if (!current.data) throw new Error("Configurações não encontradas.");
    const { error } = await context.supabase
      .from("site_settings")
      .update(data)
      .eq("id", current.data.id);
    if (error) throw new Error("Não foi possível salvar as configurações.");
    return { ok: true };
  });

export const saveSection = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: unknown) => sectionSchema.parse(data))
  .handler(async ({ data, context }) => {
    const { id, ...values } = data;
    const { error } = await context.supabase.from("site_sections").update(values).eq("id", id);
    if (error) throw new Error("Não foi possível salvar a seção.");
    return { ok: true };
  });

export const saveBenefit = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: unknown) => benefitSchema.parse(data))
  .handler(async ({ data, context }) => {
    const { id, ...values } = data;
    const query = id
      ? context.supabase.from("benefits").update(values).eq("id", id)
      : context.supabase.from("benefits").insert(values);
    const { error } = await query;
    if (error) throw new Error("Não foi possível salvar o benefício.");
    return { ok: true };
  });

export const deleteBenefit = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: unknown) => idSchema.parse(data))
  .handler(async ({ data, context }) => {
    const { error } = await context.supabase.from("benefits").delete().eq("id", data.id);
    if (error) throw new Error("Não foi possível excluir o benefício.");
    return { ok: true };
  });

export const saveFaq = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: unknown) => faqSchema.parse(data))
  .handler(async ({ data, context }) => {
    const { id, ...values } = data;
    const query = id
      ? context.supabase.from("faqs").update(values).eq("id", id)
      : context.supabase.from("faqs").insert(values);
    const { error } = await query;
    if (error) throw new Error("Não foi possível salvar a pergunta.");
    return { ok: true };
  });

export const deleteFaq = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: unknown) => idSchema.parse(data))
  .handler(async ({ data, context }) => {
    const { error } = await context.supabase.from("faqs").delete().eq("id", data.id);
    if (error) throw new Error("Não foi possível excluir a pergunta.");
    return { ok: true };
  });

export const savePlan = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: unknown) => planSchema.parse(data))
  .handler(async ({ data, context }) => {
    const { id, ...values } = data;
    const { error } = await context.supabase.from("plans").update(values).eq("id", id);
    if (error) throw new Error("Não foi possível salvar o plano.");
    return { ok: true };
  });

export const updateLead = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: unknown) => leadUpdateSchema.parse(data))
  .handler(async ({ data, context }) => {
    const { id, next_contact_at, ...rest } = data;
    const values = {
      ...rest,
      ...(next_contact_at === undefined ? {} : { next_contact_at: next_contact_at || null }),
    };
    const { error } = await context.supabase.from("leads").update(values).eq("id", id);
    if (error) throw new Error("Não foi possível atualizar o lead.");
    return { ok: true };
  });

export const getLeadActivities = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: unknown) => idSchema.parse(data))
  .handler(async ({ data, context }) => {
    const { data: rows, error } = await context.supabase
      .from("lead_activities")
      .select("*")
      .eq("lead_id", data.id)
      .order("created_at", { ascending: false });
    if (error) throw new Error("Não foi possível carregar o histórico.");
    return rows ?? [];
  });

export const addLeadActivity = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: unknown) => leadActivitySchema.parse(data))
  .handler(async ({ data, context }) => {
    const { error } = await context.supabase
      .from("lead_activities")
      .insert({ ...data, user_id: context.userId });
    if (error) throw new Error("Não foi possível registrar a interação.");
    return { ok: true };
  });


export const getAdminShowcase = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const [testimonials, portfolio, posts] = await Promise.all([
      context.supabase.from("testimonials").select("*").order("sort_order"),
      context.supabase.from("portfolio_items").select("*").order("sort_order"),
      context.supabase.from("blog_posts").select("*").order("created_at", { ascending: false }),
    ]);
    return {
      testimonials: testimonials.data ?? [],
      portfolio: portfolio.data ?? [],
      posts: posts.data ?? [],
    };
  });

export const saveTestimonial = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: unknown) => testimonialSchema.parse(data))
  .handler(async ({ data, context }) => {
    const { id, ...values } = data;
    const query = id
      ? context.supabase.from("testimonials").update(values).eq("id", id)
      : context.supabase.from("testimonials").insert(values);
    const { error } = await query;
    if (error) throw new Error("Não foi possível salvar o depoimento.");
    return { ok: true };
  });

export const deleteTestimonial = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: unknown) => idSchema.parse(data))
  .handler(async ({ data, context }) => {
    const { error } = await context.supabase.from("testimonials").delete().eq("id", data.id);
    if (error) throw new Error("Não foi possível excluir o depoimento.");
    return { ok: true };
  });

export const savePortfolioItem = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: unknown) => portfolioSchema.parse(data))
  .handler(async ({ data, context }) => {
    const { id, ...values } = data;
    const query = id
      ? context.supabase.from("portfolio_items").update(values).eq("id", id)
      : context.supabase.from("portfolio_items").insert(values);
    const { error } = await query;
    if (error) {
      throw new Error(
        error.code === "23505"
          ? "Já existe um case com esse endereço."
          : "Não foi possível salvar o case.",
      );
    }
    return { ok: true };
  });

export const deletePortfolioItem = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: unknown) => idSchema.parse(data))
  .handler(async ({ data, context }) => {
    const { error } = await context.supabase.from("portfolio_items").delete().eq("id", data.id);
    if (error) throw new Error("Não foi possível excluir o case.");
    return { ok: true };
  });

export const saveBlogPost = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: unknown) => blogPostSchema.parse(data))
  .handler(async ({ data, context }) => {
    const { id, ...values } = data;
    const payload = {
      ...values,
      published_at: values.is_published ? new Date().toISOString() : null,
    };
    const query = id
      ? context.supabase.from("blog_posts").update(payload).eq("id", id)
      : context.supabase.from("blog_posts").insert(payload);
    const { error } = await query;
    if (error) {
      throw new Error(
        error.code === "23505"
          ? "Já existe um artigo com esse endereço."
          : "Não foi possível salvar o artigo.",
      );
    }
    return { ok: true };
  });

export const deleteBlogPost = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: unknown) => idSchema.parse(data))
  .handler(async ({ data, context }) => {
    const { error } = await context.supabase.from("blog_posts").delete().eq("id", data.id);
    if (error) throw new Error("Não foi possível excluir o artigo.");
    return { ok: true };
  });

export const listMedia = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data, error } = await context.supabase.storage
      .from("midia")
      .list("", { limit: 100, sortBy: { column: "created_at", order: "desc" } });
    if (error) throw new Error("Não foi possível carregar a biblioteca de mídia.");
    const files = (data ?? []).filter((item) => item.id);
    if (files.length === 0) return [];
    const { data: signed } = await context.supabase.storage
      .from("midia")
      .createSignedUrls(files.map((f) => f.name), 3600);
    return files.map((file) => ({
      name: file.name,
      ref: `storage:${file.name}`,
      size: (file.metadata as { size?: number } | null)?.size ?? 0,
      url: signed?.find((s) => s.path === file.name)?.signedUrl ?? null,
    }));
  });

export const deleteMedia = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: unknown) => z.object({ name: z.string().min(1).max(300) }).parse(data))
  .handler(async ({ data, context }) => {
    const { error } = await context.supabase.storage.from("midia").remove([data.name]);
    if (error) throw new Error("Não foi possível excluir o arquivo.");
    return { ok: true };
  });

export const getProjectsData = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const s = context.supabase;
    const [projects, tasks, leads, plans] = await Promise.all([
      s.from("projects").select("*").order("created_at", { ascending: false }),
      s.from("project_tasks").select("*").order("sort_order"),
      s.from("leads").select("id, name, company").order("created_at", { ascending: false }),
      s.from("plans").select("id, name").order("sort_order"),
    ]);
    return {
      projects: projects.data ?? [],
      tasks: tasks.data ?? [],
      leads: leads.data ?? [],
      plans: plans.data ?? [],
    };
  });

export const saveProject = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: unknown) => projectSchema.parse(data))
  .handler(async ({ data, context }) => {
    const { id, ...rest } = data;
    const values = {
      ...rest,
      client_contact: rest.client_contact || null,
      lead_id: rest.lead_id || null,
      plan_id: rest.plan_id || null,
      started_at: rest.started_at || null,
      due_date: rest.due_date || null,
      delivered_at: rest.delivered_at || null,
      live_url: rest.live_url || null,
      notes: rest.notes || null,
    };
    const query = id
      ? context.supabase.from("projects").update(values).eq("id", id)
      : context.supabase.from("projects").insert(values);
    const { error } = await query;
    if (error) throw new Error("Não foi possível salvar o projeto.");
    return { ok: true };
  });

export const deleteProject = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: unknown) => idSchema.parse(data))
  .handler(async ({ data, context }) => {
    const { error } = await context.supabase.from("projects").delete().eq("id", data.id);
    if (error) throw new Error("Não foi possível excluir o projeto.");
    return { ok: true };
  });

export const saveProjectTask = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: unknown) => projectTaskSchema.parse(data))
  .handler(async ({ data, context }) => {
    const { id, ...rest } = data;
    const values = {
      ...rest,
      description: rest.description || null,
      due_date: rest.due_date || null,
    };
    const query = id
      ? context.supabase.from("project_tasks").update(values).eq("id", id)
      : context.supabase.from("project_tasks").insert(values);
    const { error } = await query;
    if (error) throw new Error("Não foi possível salvar a etapa.");
    return { ok: true };
  });

export const deleteProjectTask = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: unknown) => idSchema.parse(data))
  .handler(async ({ data, context }) => {
    const { error } = await context.supabase.from("project_tasks").delete().eq("id", data.id);
    if (error) throw new Error("Não foi possível excluir a etapa.");
    return { ok: true };
  });
