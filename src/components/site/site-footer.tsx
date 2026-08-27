import { Link } from "@tanstack/react-router";
import { Facebook, Globe2, Instagram, Mail } from "lucide-react";

import type { SiteSettings } from "@/lib/site-content.types";
import { trackEvent } from "./analytics-tracker";
import { BrandLogo } from "./brand-mark";
import {
  CONTACT_EMAIL,
  CONTACT_WHATSAPP_NUMBER,
  waLink,
} from "./contact-section";
import { WhatsAppIcon } from "./whatsapp-icon";

/* TEMPORÁRIO: substituir pelos perfis reais das redes sociais. */
const SOCIAL_INSTAGRAM = "https://instagram.com/seuperfil";
const SOCIAL_FACEBOOK = "https://facebook.com/seuperfil";

const navLinks = [
  { label: "Início", hash: undefined },
  { label: "Benefícios", hash: "beneficios" },
  { label: "Como funciona", hash: "como-funciona" },
  { label: "Portfólio", hash: "portfolio" },
  { label: "Planos", hash: "planos" },
  { label: "Sobre nós", hash: "sobre-nos" },
  { label: "Perguntas frequentes", hash: "perguntas-frequentes" },
  { label: "Contato", hash: "contato" },
] as const;

const serviceLinks = [
  { label: "Landing Page", message: "Olá! Gostaria de um orçamento para uma Landing Page." },
  { label: "Site Institucional", message: "Olá! Gostaria de um orçamento para um Site Institucional." },
  { label: "Catálogo Digital", message: "Olá! Gostaria de um orçamento para um Catálogo Digital." },
  { label: "Projetos personalizados", message: "Olá! Gostaria de conversar sobre um projeto personalizado." },
];

export function SiteFooter({ settings }: { settings: SiteSettings | null }) {
  void settings;
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-ink bg-ink text-ink-foreground">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <BrandLogo tone="dark" />
          <p className="mt-2 text-xs font-medium uppercase tracking-[0.14em] text-ink-muted">
            Sites profissionais para negócios que querem crescer
          </p>
          <p className="mt-4 max-w-xs text-sm text-ink-muted">
            Criação de sites profissionais, landing pages e catálogos digitais para pequenos
            negócios, empresas locais e prestadores de serviços.
          </p>
          <div className="mt-5 flex gap-3">
            <a
              href={SOCIAL_INSTAGRAM}
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="text-ink-muted transition-colors hover:text-accent"
            >
              <Instagram className="h-5 w-5" aria-hidden />
            </a>
            <a
              href={SOCIAL_FACEBOOK}
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
              className="text-ink-muted transition-colors hover:text-accent"
            >
              <Facebook className="h-5 w-5" aria-hidden />
            </a>
            <a
              href={waLink("Olá! Gostaria de saber mais sobre a criação de um site.")}
              target="_blank"
              rel="noreferrer"
              aria-label="WhatsApp"
              onClick={() => trackEvent("whatsapp", "rodape_social")}
              className="text-ink-muted transition-colors hover:text-accent"
            >
              <WhatsAppIcon className="h-5 w-5" />
            </a>
          </div>
        </div>

        <nav aria-label="Rodapé — navegação">
          <p className="text-sm font-semibold text-ink-foreground">Navegação</p>
          <ul className="mt-3 space-y-2 text-sm text-ink-muted">
            {navLinks.map((item) => (
              <li key={item.label}>
                <Link to="/" hash={item.hash} className="transition-colors hover:text-accent">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Rodapé — serviços">
          <p className="text-sm font-semibold text-ink-foreground">Serviços</p>
          <ul className="mt-3 space-y-2 text-sm text-ink-muted">
            {serviceLinks.map((item) => (
              <li key={item.label}>
                <a
                  href={waLink(item.message)}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => trackEvent("whatsapp", "rodape_servicos")}
                  className="transition-colors hover:text-accent"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="text-sm font-semibold text-ink-foreground">Contato</p>
          <ul className="mt-3 space-y-2 text-sm text-ink-muted">
            <li>
              <a
                href={waLink("Olá! Gostaria de conversar sobre a criação de um site.")}
                target="_blank"
                rel="noreferrer"
                onClick={() => trackEvent("whatsapp", "rodape")}
                className="inline-flex items-center gap-2 transition-colors hover:text-accent"
              >
                <WhatsAppIcon className="h-4 w-4" /> {CONTACT_WHATSAPP_NUMBER}
              </a>
            </li>
            <li>
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="inline-flex items-center gap-2 transition-colors hover:text-accent"
              >
                <Mail className="h-4 w-4" aria-hidden /> {CONTACT_EMAIL}
              </a>
            </li>
            <li>
              <a
                href={SOCIAL_INSTAGRAM}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 transition-colors hover:text-accent"
              >
                <Instagram className="h-4 w-4" aria-hidden /> Instagram
              </a>
            </li>
            <li className="inline-flex items-center gap-2">
              <Globe2 className="h-4 w-4" aria-hidden /> Atendimento online para todo o Brasil
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 py-6">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-3 px-4 text-xs text-ink-muted sm:flex-row sm:justify-between">
          <p>© {year} TRAZEVO. Todos os direitos reservados.</p>
          <nav aria-label="Rodapé — informações legais">
            <ul className="flex flex-wrap items-center justify-center gap-4">
              <li>
                <Link to="/politica-de-privacidade" className="transition-colors hover:text-accent">
                  Política de Privacidade
                </Link>
              </li>
              <li>
                <Link to="/termos-de-uso" className="transition-colors hover:text-accent">
                  Termos de Uso
                </Link>
              </li>
              <li>
                <Link to="/politica-de-cookies" className="transition-colors hover:text-accent">
                  Política de Cookies
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
}
