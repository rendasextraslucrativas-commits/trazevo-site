import type { Tables } from "@/integrations/supabase/types";

export type DemoSiteRow = Tables<"demo_sites">;

export type DemoTheme = {
  primary?: string;
  deep?: string;
  light?: string;
  mint?: string;
  surface?: string;
  text?: string;
  font?: string;
};

export type DemoNavItem = { label: string; href: string };
export type DemoSpecialty = {
  icon?: string;
  name: string;
  description?: string;
  visible?: boolean;
};
export type DemoDifferential = { icon?: string; title: string; description?: string };
export type DemoStep = { title: string; description?: string };
export type DemoGalleryItem = { label: string; image_url?: string | null };
export type DemoTeamMember = {
  name: string;
  role?: string;
  register?: string;
  bio?: string;
  image_url?: string | null;
  visible?: boolean;
};
export type DemoFaq = { question: string; answer: string };

export type DemoContent = {
  brand?: {
    name?: string;
    initials?: string;
    tagline?: string;
    phone?: string;
    whatsapp?: string;
    email?: string;
    address?: string;
    hours?: string;
    instagram?: string;
    facebook?: string;
  };
  demo_notice?: string;
  nav?: DemoNavItem[];
  hero?: {
    visible?: boolean;
    title?: string;
    subtitle?: string;
    cta_primary?: string;
    cta_secondary?: string;
    image_url?: string | null;
    badges?: string[];
  };
  specialties?: {
    visible?: boolean;
    title?: string;
    subtitle?: string;
    items?: DemoSpecialty[];
  };
  differentials?: { visible?: boolean; title?: string; items?: DemoDifferential[] };
  about?: {
    visible?: boolean;
    title?: string;
    body?: string;
    note?: string;
    image_url?: string | null;
  };
  steps?: { visible?: boolean; title?: string; items?: DemoStep[] };
  gallery?: { visible?: boolean; title?: string; note?: string; items?: DemoGalleryItem[] };
  team?: { visible?: boolean; title?: string; items?: DemoTeamMember[] };
  commitments?: { visible?: boolean; title?: string; items?: string[] };
  faq?: { visible?: boolean; title?: string; items?: DemoFaq[] };
  form?: {
    visible?: boolean;
    title?: string;
    subtitle?: string;
    treatments?: string[];
    periods?: string[];
    success_message?: string;
  };
  whatsapp?: { enabled?: boolean; message?: string };
  final_cta?: {
    visible?: boolean;
    title?: string;
    text?: string;
    cta_primary?: string;
    cta_secondary?: string;
    note?: string;
  };
  footer?: { description?: string; note?: string };
};

export type DemoSite = Omit<DemoSiteRow, "content" | "theme"> & {
  content: DemoContent;
  theme: DemoTheme;
};

export function demoWhatsappLink(number: string | undefined | null, message?: string) {
  const digits = (number ?? "").replace(/\D/g, "");
  if (!digits) return null;
  return `https://wa.me/${digits}?text=${encodeURIComponent(message ?? "Olá!")}`;
}
