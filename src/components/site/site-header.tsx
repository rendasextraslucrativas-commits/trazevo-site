import { Link } from "@tanstack/react-router";
import { Menu, MessageCircle } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { trackEvent } from "./analytics-tracker";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { SHOW_SHOWCASE } from "@/lib/feature-flags";
import type { SiteSettings } from "@/lib/site-content.types";
import { whatsappLink } from "@/lib/site-content.types";

const allNavItems = [
  { label: "Início", to: "/", showcase: false },
  { label: "Benefícios", to: "/beneficios", showcase: false },
  { label: "Portfólio", to: "/", hash: "portfolio", showcase: false },
  { label: "Blog", to: "/blog", showcase: false },
  { label: "Como funciona", to: "/como-funciona", showcase: false },
  { label: "Planos", to: "/planos", showcase: false },
  { label: "Perguntas frequentes", to: "/perguntas-frequentes", showcase: false },
  { label: "Contato", to: "/contato", showcase: false },
] as const;

const navItems = allNavItems.filter((item) => SHOW_SHOWCASE || !item.showcase);

export function SiteHeader({ settings }: { settings: SiteSettings | null }) {
  const [open, setOpen] = useState(false);
  const wa = whatsappLink(settings);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/70 bg-background/85 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4">
        <Link to="/" className="flex items-center gap-2" aria-label="Página inicial">
          {settings?.logo_url ? (
            <img
              src={settings.logo_url}
              alt={settings.agency_name}
              className="h-8 w-auto"
              loading="lazy"
            />
          ) : (
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-brand text-sm font-bold text-brand-foreground">
              A
            </span>
          )}
          <span className="text-sm font-semibold tracking-tight text-brand sm:text-base">
            {settings?.agency_name ?? "Agência de Landing Pages"}
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Navegação principal">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-surface hover:text-foreground"
              activeProps={{ className: "text-foreground font-medium" }}
              activeOptions={{ exact: item.to === "/" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button asChild size="sm" className="hidden sm:inline-flex">
            <Link to="/contato">Solicitar orçamento</Link>
          </Button>
          {wa ? (
            <Button asChild size="icon" variant="outline" className="sm:hidden">
              <a
                href={wa}
                target="_blank"
                rel="noreferrer"
                aria-label="Conversar pelo WhatsApp"
                onClick={() => trackEvent("whatsapp", "header")}
              >
                <MessageCircle className="h-4 w-4" />
              </a>
            </Button>
          ) : null}

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="lg:hidden" aria-label="Abrir menu">
                <Menu className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <SheetTitle className="text-left text-base">Menu</SheetTitle>
              <nav className="mt-6 flex flex-col gap-1" aria-label="Navegação mobile">
                {navItems.map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    onClick={() => setOpen(false)}
                    className="rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-surface hover:text-foreground"
                    activeProps={{ className: "text-foreground font-medium bg-surface" }}
                    activeOptions={{ exact: item.to === "/" }}
                  >
                    {item.label}
                  </Link>
                ))}
                <Button asChild className="mt-4">
                  <Link to="/contato" onClick={() => setOpen(false)}>
                    Solicitar orçamento
                  </Link>
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
