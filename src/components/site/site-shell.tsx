import type { ReactNode } from "react";

import { SiteFooter } from "./site-footer";
import { SiteHeader } from "./site-header";
import type { SiteSettings } from "@/lib/site-content.types";

export function SiteShell({
  settings,
  children,
}: {
  settings: SiteSettings | null;
  children: ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-background font-sans">
      <SiteHeader settings={settings} />
      <main className="flex-1">{children}</main>
      <SiteFooter settings={settings} />
    </div>
  );
}

export function PageHeader({
  title,
  subtitle,
  eyebrow,
}: {
  title: string;
  subtitle?: string | null;
  eyebrow?: string;
}) {
  return (
    <section className="border-b border-border bg-surface">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:py-20">
        {eyebrow ? (
          <p className="text-xs font-semibold uppercase tracking-widest text-primary">{eyebrow}</p>
        ) : null}
        <h1 className="mt-3 max-w-3xl text-3xl font-bold tracking-tight text-brand sm:text-4xl">
          {title}
        </h1>
        {subtitle ? (
          <p className="mt-4 max-w-2xl text-base text-muted-foreground">{subtitle}</p>
        ) : null}
      </div>
    </section>
  );
}

export function SectionTitle({
  title,
  subtitle,
  align = "center",
}: {
  title: string;
  subtitle?: string | null;
  align?: "center" | "left";
}) {
  return (
    <div className={align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <h2 className="text-2xl font-bold tracking-tight text-brand sm:text-3xl">{title}</h2>
      {subtitle ? <p className="mt-3 text-muted-foreground">{subtitle}</p> : null}
    </div>
  );
}
