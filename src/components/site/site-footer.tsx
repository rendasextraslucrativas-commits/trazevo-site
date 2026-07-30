import { Link } from "@tanstack/react-router";
import { Instagram, Linkedin, Facebook, Mail, MessageCircle } from "lucide-react";

import { SHOW_SHOWCASE } from "@/lib/feature-flags";
import type { SiteSettings } from "@/lib/site-content.types";
import { trackEvent } from "./analytics-tracker";
import { whatsappLink } from "@/lib/site-content.types";

export function SiteFooter({ settings }: { settings: SiteSettings | null }) {
  const wa = whatsappLink(settings);
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="text-base font-semibold text-brand">
            {settings?.agency_name ?? "Agência de Landing Pages"}
          </p>
          <p className="mt-3 max-w-xs text-sm text-muted-foreground">
            {settings?.footer_description ??
              "Criamos landing pages modernas, rápidas e preparadas para gerar contatos."}
          </p>
        </div>

        <nav aria-label="Rodapé — navegação">
          <p className="text-sm font-semibold text-foreground">Navegação</p>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li>
              <Link to="/beneficios" className="hover:text-foreground">
                Benefícios
              </Link>
            </li>
            {SHOW_SHOWCASE ? (
              <li>
                <Link to="/modelos" className="hover:text-foreground">
                  Modelos
                </Link>
              </li>
            ) : null}
            <li>
              <Link to="/planos" className="hover:text-foreground">
                Planos
              </Link>
            </li>
            <li>
              <Link to="/perguntas-frequentes" className="hover:text-foreground">
                Perguntas frequentes
              </Link>
            </li>
            <li>
              <Link to="/contato" className="hover:text-foreground">
                Contato
              </Link>
            </li>
          </ul>
        </nav>

        <div>
          <p className="text-sm font-semibold text-foreground">Contato</p>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            {settings?.email ? (
              <li>
                <a
                  href={`mailto:${settings.email}`}
                  className="inline-flex items-center gap-2 hover:text-foreground"
                >
                  <Mail className="h-4 w-4" aria-hidden /> {settings.email}
                </a>
              </li>
            ) : null}
            {wa ? (
              <li>
                <a
                  href={wa}
                  onClick={() => trackEvent("whatsapp", "rodape")}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 hover:text-foreground"
                >
                  <MessageCircle className="h-4 w-4" aria-hidden /> WhatsApp
                </a>
              </li>
            ) : null}
          </ul>
          <div className="mt-4 flex gap-3">
            {settings?.instagram_url ? (
              <a href={settings.instagram_url} aria-label="Instagram" className="text-muted-foreground hover:text-foreground">
                <Instagram className="h-5 w-5" />
              </a>
            ) : null}
            {settings?.facebook_url ? (
              <a href={settings.facebook_url} aria-label="Facebook" className="text-muted-foreground hover:text-foreground">
                <Facebook className="h-5 w-5" />
              </a>
            ) : null}
            {settings?.linkedin_url ? (
              <a href={settings.linkedin_url} aria-label="LinkedIn" className="text-muted-foreground hover:text-foreground">
                <Linkedin className="h-5 w-5" />
              </a>
            ) : null}
          </div>
        </div>

        <nav aria-label="Rodapé — informações legais">
          <p className="text-sm font-semibold text-foreground">Legal</p>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li>
              <Link to="/politica-de-privacidade" className="hover:text-foreground">
                Política de Privacidade
              </Link>
            </li>
            <li>
              <Link to="/termos-de-uso" className="hover:text-foreground">
                Termos de Uso
              </Link>
            </li>
            <li>
              <Link to="/politica-de-cookies" className="hover:text-foreground">
                Política de Cookies
              </Link>
            </li>
            <li>
              <Link to="/auth" className="hover:text-foreground">
                Acesso restrito
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      <div className="border-t border-border/70 py-6 text-center text-xs text-muted-foreground">
        © {year} {settings?.agency_name ?? "Agência de Landing Pages"}. Todos os direitos
        reservados.
      </div>
    </footer>
  );
}
