import type { Tables } from "@/integrations/supabase/types";

export type SiteSettings = Tables<"site_settings">;
export type SiteSection = Tables<"site_sections">;
export type Benefit = Tables<"benefits">;
export type ProcessStep = Tables<"process_steps">;
export type PlanFeature = Tables<"plan_features">;
export type Plan = Tables<"plans"> & { features: PlanFeature[] };
export type Template = Tables<"templates">;
export type Faq = Tables<"faqs">;
export type Testimonial = Tables<"testimonials">;
export type PortfolioItem = Tables<"portfolio_items">;
export type BlogPost = Tables<"blog_posts">;
export type BlogPostSummary = Pick<
  BlogPost,
  "id" | "slug" | "title" | "excerpt" | "cover_url" | "tags" | "published_at"
>;

export type SiteContent = {
  settings: SiteSettings | null;
  sections: SiteSection[];
  benefits: Benefit[];
  steps: ProcessStep[];
  plans: Plan[];
  templates: Template[];
  faqs: Faq[];
  testimonials: Testimonial[];
  portfolio: PortfolioItem[];
};

export function findSection(content: SiteContent, slug: string) {
  return content.sections.find((section) => section.slug === slug) ?? null;
}

export function whatsappLink(settings: SiteSettings | null, message?: string) {
  const number = (settings?.whatsapp ?? "").replace(/\D/g, "");
  if (!number) return null;
  const text = encodeURIComponent(
    message ?? "Olá! Gostaria de saber mais sobre a criação de uma landing page.",
  );
  return `https://wa.me/${number}?text=${text}`;
}

export function formatPrice(value: number | null, currency = "BRL") {
  if (value == null) return null;
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}
