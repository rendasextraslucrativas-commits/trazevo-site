import { z } from "zod";

export const settingsSchema = z.object({
  agency_name: z.string().trim().min(2).max(120),
  slogan: z.string().trim().max(200).nullable().optional(),
  email: z.string().trim().email().max(255).nullable().or(z.literal("")),
  whatsapp: z.string().trim().max(40).nullable().or(z.literal("")),
  address: z.string().trim().max(200).nullable().or(z.literal("")),
  instagram_url: z.string().trim().max(255).nullable().or(z.literal("")),
  facebook_url: z.string().trim().max(255).nullable().or(z.literal("")),
  linkedin_url: z.string().trim().max(255).nullable().or(z.literal("")),
  footer_description: z.string().trim().max(400).nullable().or(z.literal("")),
  meta_title: z.string().trim().max(120).nullable().or(z.literal("")),
  meta_description: z.string().trim().max(300).nullable().or(z.literal("")),
});
export type SettingsInput = z.infer<typeof settingsSchema>;

export const sectionSchema = z.object({
  id: z.string().uuid(),
  title: z.string().trim().min(2).max(200),
  subtitle: z.string().trim().max(500).nullable().or(z.literal("")),
  is_visible: z.boolean(),
});
export type SectionInput = z.infer<typeof sectionSchema>;

export const benefitSchema = z.object({
  id: z.string().uuid().optional(),
  icon: z.string().trim().min(1).max(60),
  title: z.string().trim().min(2).max(120),
  description: z.string().trim().min(2).max(400),
  sort_order: z.number().int().min(0).max(999),
  is_visible: z.boolean(),
});
export type BenefitInput = z.infer<typeof benefitSchema>;

export const faqSchema = z.object({
  id: z.string().uuid().optional(),
  question: z.string().trim().min(4).max(250),
  answer: z.string().trim().min(4).max(1500),
  sort_order: z.number().int().min(0).max(999),
  is_visible: z.boolean(),
});
export type FaqInput = z.infer<typeof faqSchema>;

export const planSchema = z.object({
  id: z.string().uuid(),
  name: z.string().trim().min(2).max(120),
  description: z.string().trim().max(400).nullable().or(z.literal("")),
  price: z.number().min(0).max(1_000_000).nullable(),
  promo_price: z.number().min(0).max(1_000_000).nullable(),
  show_price: z.boolean(),
  is_highlighted: z.boolean(),
  support_period: z.string().trim().max(80).nullable().or(z.literal("")),
  revisions: z.string().trim().max(80).nullable().or(z.literal("")),
  cta_label: z.string().trim().min(2).max(80),
  is_visible: z.boolean(),
});
export type PlanInput = z.infer<typeof planSchema>;

export const leadUpdateSchema = z.object({
  id: z.string().uuid(),
  stage_id: z.string().uuid().nullable().optional(),
  priority: z.enum(["baixa", "media", "alta"]).optional(),
  notes: z.string().trim().max(2000).nullable().optional(),
  next_contact_at: z
    .string()
    .trim()
    .regex(/^\d{4}-\d{2}-\d{2}$/)
    .nullable()
    .optional()
    .or(z.literal("")),
  budget: z.number().min(0).max(10_000_000).nullable().optional(),
});
export type LeadUpdateInput = z.infer<typeof leadUpdateSchema>;

export const leadActivitySchema = z.object({
  lead_id: z.string().uuid(),
  type: z.enum(["nota", "ligacao", "whatsapp", "email", "reuniao", "etapa"]),
  content: z.string().trim().min(1).max(1500),
});
export type LeadActivityInput = z.infer<typeof leadActivitySchema>;

export const idSchema = z.object({ id: z.string().uuid() });


export const testimonialSchema = z.object({
  id: z.string().uuid().optional(),
  author_name: z.string().trim().min(2).max(120),
  author_role: z.string().trim().max(120).nullable().or(z.literal("")),
  company: z.string().trim().max(120).nullable().or(z.literal("")),
  quote: z.string().trim().min(10).max(800),
  rating: z.number().int().min(1).max(5),
  avatar_url: z.string().trim().max(500).nullable().or(z.literal("")),
  is_demo: z.boolean(),
  sort_order: z.number().int().min(0).max(999),
  is_visible: z.boolean(),
});
export type TestimonialInput = z.infer<typeof testimonialSchema>;

export const portfolioSchema = z.object({
  id: z.string().uuid().optional(),
  slug: z
    .string()
    .trim()
    .min(2)
    .max(120)
    .regex(/^[a-z0-9-]+$/, "Use apenas letras minúsculas, números e hífens."),
  title: z.string().trim().min(2).max(160),
  niche: z.string().trim().min(2).max(80),
  summary: z.string().trim().max(400).nullable().or(z.literal("")),
  challenge: z.string().trim().max(2000).nullable().or(z.literal("")),
  solution: z.string().trim().max(2000).nullable().or(z.literal("")),
  result: z.string().trim().max(2000).nullable().or(z.literal("")),
  cover_url: z.string().trim().max(500).nullable().or(z.literal("")),
  tags: z.array(z.string().trim().min(1).max(40)).max(12),
  is_demo: z.boolean(),
  sort_order: z.number().int().min(0).max(999),
  is_published: z.boolean(),
});
export type PortfolioInput = z.infer<typeof portfolioSchema>;

export const blogPostSchema = z.object({
  id: z.string().uuid().optional(),
  slug: z
    .string()
    .trim()
    .min(2)
    .max(120)
    .regex(/^[a-z0-9-]+$/, "Use apenas letras minúsculas, números e hífens."),
  title: z.string().trim().min(4).max(160),
  excerpt: z.string().trim().max(300).nullable().or(z.literal("")),
  content: z.string().trim().min(20).max(40000),
  cover_url: z.string().trim().max(500).nullable().or(z.literal("")),
  tags: z.array(z.string().trim().min(1).max(40)).max(12),
  author_name: z.string().trim().max(120).nullable().or(z.literal("")),
  meta_title: z.string().trim().max(120).nullable().or(z.literal("")),
  meta_description: z.string().trim().max(300).nullable().or(z.literal("")),
  is_published: z.boolean(),
});
export type BlogPostInput = z.infer<typeof blogPostSchema>;

const dateField = z
  .string()
  .trim()
  .regex(/^\d{4}-\d{2}-\d{2}$/)
  .nullable()
  .optional()
  .or(z.literal(""));

export const projectStatuses = ["proposta", "producao", "revisao", "entregue", "pausado"] as const;

export const projectSchema = z.object({
  id: z.string().uuid().optional(),
  title: z.string().trim().min(2).max(160),
  client_name: z.string().trim().min(2).max(160),
  client_contact: z.string().trim().max(160).nullable().or(z.literal("")),
  lead_id: z.string().uuid().nullable().optional().or(z.literal("")),
  plan_id: z.string().uuid().nullable().optional().or(z.literal("")),
  status: z.enum(projectStatuses),
  progress: z.number().int().min(0).max(100),
  price: z.number().min(0).max(10_000_000).nullable(),
  started_at: dateField,
  due_date: dateField,
  delivered_at: dateField,
  live_url: z.string().trim().max(500).nullable().or(z.literal("")),
  notes: z.string().trim().max(4000).nullable().or(z.literal("")),
});
export type ProjectInput = z.infer<typeof projectSchema>;

export const projectTaskSchema = z.object({
  id: z.string().uuid().optional(),
  project_id: z.string().uuid(),
  title: z.string().trim().min(2).max(200),
  description: z.string().trim().max(1000).nullable().or(z.literal("")),
  is_done: z.boolean(),
  due_date: dateField,
  sort_order: z.number().int().min(0).max(999),
});
export type ProjectTaskInput = z.infer<typeof projectTaskSchema>;
