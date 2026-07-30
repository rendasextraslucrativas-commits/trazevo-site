import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import {
  AlignCenter,
  Anchor,
  ArrowLeft,
  Baby,
  CalendarCheck,
  CheckCircle2,
  Cpu,
  FileText,
  Gem,
  Heart,
  HeartPulse,
  LifeBuoy,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Phone,
  ShieldCheck,
  Sofa,
  Sparkles,
  Stethoscope,
  X,
  type LucideIcon,
} from "lucide-react";
import { toast } from "sonner";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { trackEvent } from "@/components/site/analytics-tracker";
import { submitDemoLead } from "@/lib/demo-site.functions";
import { demoWhatsappLink, type DemoSite } from "@/lib/demo-site.types";
import heroImage from "@/assets/demo-odonto-hero.jpg";
import roomImage from "@/assets/demo-odonto-sala.jpg";

const icons: Record<string, LucideIcon> = {
  stethoscope: Stethoscope,
  "heart-pulse": HeartPulse,
  anchor: Anchor,
  sparkles: Sparkles,
  "align-center": AlignCenter,
  gem: Gem,
  baby: Baby,
  "shield-check": ShieldCheck,
  heart: Heart,
  cpu: Cpu,
  sofa: Sofa,
  "calendar-check": CalendarCheck,
  "file-text": FileText,
  "life-buoy": LifeBuoy,
};

function DemoIcon({ name, className }: { name?: string; className?: string }) {
  const Component = (name && icons[name]) || Sparkles;
  return <Component className={className} aria-hidden />;
}

function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches === true
  );
}

function scrollToId(id: string) {
  const el = document.getElementById(id.replace("#", ""));
  if (el)
    el.scrollIntoView({
      behavior: prefersReducedMotion() ? "auto" : "smooth",
      block: "start",
    });
}

export function DemoClinicSite({
  site,
  agencyWhatsapp,
}: {
  site: DemoSite;
  agencyWhatsapp?: string | null;
}) {
  const content = site.content ?? {};
  const brand = content.brand ?? {};
  const [menuOpen, setMenuOpen] = useState(false);
  const [lightbox, setLightbox] = useState<{ label: string; url: string } | null>(null);
  const trackedDepth = useRef(new Set<number>());

  const pagePath = `/portfolio/${site.slug}`;

  const agencyWa = demoWhatsappLink(
    agencyWhatsapp,
    content.whatsapp?.message ??
      "Olá! Vi o modelo de site e gostaria de informações para criar um projeto semelhante.",
  );

  const contactSearch = useMemo(
    () => ({
      modelo: site.name,
      origem: "portfolio",
      url: pagePath,
    }),
    [site.name, pagePath],
  );

  useEffect(() => {
    trackEvent("modelo_view", site.slug);
  }, [site.slug]);

  useEffect(() => {
    function onScroll() {
      const total = document.body.scrollHeight - window.innerHeight;
      if (total <= 0) return;
      const percent = Math.round((window.scrollY / total) * 100);
      for (const mark of [25, 50, 75, 100]) {
        if (percent >= mark && !trackedDepth.current.has(mark)) {
          trackedDepth.current.add(mark);
          trackEvent("scroll", `${site.slug}:${mark}`);
        }
      }
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [site.slug]);

  const nav = content.nav ?? [];

  return (
    <div
      className="min-h-screen bg-white text-slate-700"
      style={{ fontFamily: site.theme?.font ?? "Inter, system-ui, sans-serif" }}
    >
      {/* Barra demonstrativa */}
      <div className="bg-slate-900 text-white">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-2.5 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
          <p className="min-w-0 text-xs leading-snug text-white/90 sm:text-sm">
            Você está visualizando um modelo demonstrativo para clínicas odontológicas.
          </p>
          <div className="flex shrink-0 flex-wrap items-center gap-2">
            <Button
              asChild
              size="sm"
              className="min-h-9 bg-sky-300 font-semibold text-slate-900 hover:bg-sky-200"
              onClick={() => trackEvent("modelo_cta", `${site.slug}:barra`)}
            >
              <Link to="/contato" search={contactSearch}>
                Quero um site como este
              </Link>
            </Button>
            <Button
              asChild
              size="sm"
              variant="ghost"
              className="min-h-9 text-white hover:bg-white/10 hover:text-white"
              onClick={() => trackEvent("retorno_portfolio", `${site.slug}:barra`)}
            >
              <Link to="/portfolio">
                <ArrowLeft className="mr-1 h-4 w-4" aria-hidden /> Voltar ao portfólio
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Cabeçalho */}
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
          <a
            href="#inicio"
            onClick={(e) => {
              e.preventDefault();
              scrollToId("inicio");
            }}
            className="flex min-w-0 items-center gap-2 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-600 focus-visible:ring-offset-2"
          >
            <span
              className="grid h-10 w-10 shrink-0 place-items-center rounded-xl text-sm font-bold text-white"
              style={{ backgroundColor: site.theme?.primary ?? "#0f3b6d" }}
            >
              {brand.initials ?? "CO"}
            </span>
            <span className="min-w-0">
              <span className="block truncate text-sm font-semibold text-slate-900">
                {brand.name}
              </span>
              <span className="hidden truncate text-xs text-slate-500 sm:block">
                {brand.tagline}
              </span>
            </span>
          </a>
          <nav className="hidden items-center gap-1 lg:flex" aria-label="Navegação do modelo">
            {nav.map((item) => (
              <button
                key={item.href}
                type="button"
                onClick={() => scrollToId(item.href)}
                className="rounded-md px-2.5 py-2 text-sm text-slate-600 transition hover:bg-slate-100 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-600"
              >
                {item.label}
              </button>
            ))}
          </nav>
          <div className="flex shrink-0 items-center gap-2">
            <Button
              className="hidden min-h-11 text-white sm:inline-flex"
              style={{ backgroundColor: site.theme?.primary ?? "#0f3b6d" }}
              onClick={() => {
                trackEvent("agendamento", `${site.slug}:header`);
                scrollToId("contato");
              }}
            >
              Agendar avaliação
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="min-h-11 min-w-11 lg:hidden"
              aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
              aria-expanded={menuOpen}
              aria-controls="demo-menu-movel"
              onClick={() => setMenuOpen((v) => !v)}
            >
              {menuOpen ? (
                <X className="h-5 w-5" aria-hidden />
              ) : (
                <Menu className="h-5 w-5" aria-hidden />
              )}
            </Button>
          </div>
        </div>
        {menuOpen ? (
          <nav
            id="demo-menu-movel"
            className="border-t border-slate-200 bg-white lg:hidden"
            aria-label="Menu móvel"
          >
            <ul className="mx-auto max-w-6xl px-4 py-2">
              {nav.map((item) => (
                <li key={item.href}>
                  <button
                    type="button"
                    className="min-h-11 w-full rounded-md px-2 py-3 text-left text-base text-slate-700 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-600"
                    onClick={() => {
                      setMenuOpen(false);
                      scrollToId(item.href);
                    }}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
              <li className="py-3">
                <Button
                  className="min-h-11 w-full text-white"
                  style={{ backgroundColor: site.theme?.primary ?? "#0f3b6d" }}
                  onClick={() => {
                    setMenuOpen(false);
                    trackEvent("agendamento", `${site.slug}:menu`);
                    scrollToId("contato");
                  }}
                >
                  Agendar avaliação
                </Button>
              </li>
            </ul>
          </nav>
        ) : null}
      </header>


      {/* Hero */}
      {content.hero?.visible !== false ? (
        <section id="inicio" className="bg-slate-50">
          <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 sm:py-20 lg:grid-cols-2 lg:gap-14 lg:py-24">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-sky-800">
                {brand.tagline}
              </p>
              <h1 className="mt-4 text-3xl font-bold leading-tight text-slate-900 sm:text-4xl lg:text-5xl">
                {content.hero?.title}
              </h1>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-600 sm:text-lg">
                {content.hero?.subtitle}
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button
                  size="lg"
                  className="min-h-12 w-full text-white sm:w-auto"
                  style={{ backgroundColor: site.theme?.primary ?? "#0f3b6d" }}
                  onClick={() => {
                    trackEvent("agendamento", `${site.slug}:hero`);
                    scrollToId("contato");
                  }}
                >
                  {content.hero?.cta_primary ?? "Agendar avaliação"}
                </Button>
                {agencyWa ? (
                  <Button
                    asChild
                    size="lg"
                    variant="outline"
                    className="min-h-12 w-full border-slate-300 sm:w-auto"
                    onClick={() => trackEvent("whatsapp", `${site.slug}:hero`)}
                  >
                    <a href={agencyWa} target="_blank" rel="noreferrer">
                      {content.hero?.cta_secondary ?? "Conversar pelo WhatsApp"}
                    </a>
                  </Button>
                ) : null}
              </div>
              <ul className="mt-8 grid gap-2.5 sm:grid-cols-2">
                {(content.hero?.badges ?? []).map((badge) => (
                  <li key={badge} className="flex items-center gap-2 text-sm text-slate-600">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-teal-700" aria-hidden />
                    {badge}
                  </li>
                ))}
              </ul>
            </div>
            <img
              src={content.hero?.image_url ?? heroImage}
              alt="Ambiente de recepção de uma clínica odontológica moderna e acolhedora"
              width={1600}
              height={1100}
              decoding="async"
              fetchPriority="high"
              className="aspect-[4/3] w-full rounded-2xl border border-slate-200 object-cover shadow-sm"
            />
          </div>

          <p className="mx-auto max-w-6xl px-4 pb-8 text-xs text-slate-500">
            {content.demo_notice}
          </p>
        </section>
      ) : null}

      {/* Tratamentos */}
      {content.specialties?.visible !== false ? (
        <section id="tratamentos" className="mx-auto max-w-6xl px-4 py-16 sm:py-20">
          <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
            {content.specialties?.title}
          </h2>
          {content.specialties?.subtitle ? (
            <p className="mt-3 max-w-2xl text-slate-600">{content.specialties.subtitle}</p>
          ) : null}
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {(content.specialties?.items ?? [])
              .filter((item) => item.visible !== false)
              .map((item) => (
                <article
                  key={item.name}
                  className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md"
                >
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-sky-50 text-sky-800">
                    <DemoIcon name={item.icon} className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 text-base font-semibold text-slate-900">{item.name}</h3>
                  <p className="mt-2 text-sm text-slate-600">{item.description}</p>
                  <button
                    type="button"
                    className="mt-4 text-sm font-medium text-sky-800 underline-offset-4 hover:underline"
                    onClick={() => {
                      trackEvent("tratamento", `${site.slug}:${item.name}`);
                      scrollToId("contato");
                    }}
                  >
                    Saiba mais
                  </button>
                </article>
              ))}
          </div>
        </section>
      ) : null}

      {/* Diferenciais */}
      {content.differentials?.visible !== false ? (
        <section id="diferenciais" className="bg-slate-50">
          <div className="mx-auto max-w-6xl px-4 py-16 sm:py-20">
            <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
              {content.differentials?.title}
            </h2>
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {(content.differentials?.items ?? []).map((item) => (
                <article key={item.title} className="rounded-2xl bg-white p-6 shadow-sm">
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-teal-50 text-teal-700">
                    <DemoIcon name={item.icon} className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 text-base font-semibold text-slate-900">{item.title}</h3>
                  <p className="mt-2 text-sm text-slate-600">{item.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* Sobre */}
      {content.about?.visible !== false ? (
        <section className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 sm:py-20 lg:grid-cols-2">
          <img
            src={content.about?.image_url ?? roomImage}
            alt="Consultório odontológico moderno preparado para atendimento"
            width={1200}
            height={900}
            loading="lazy"
            className="aspect-[4/3] w-full rounded-2xl border border-slate-200 object-cover"
          />
          <div>
            <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">{content.about?.title}</h2>
            <p className="mt-4 text-slate-600">{content.about?.body}</p>
            <p className="mt-6 rounded-xl bg-slate-50 p-4 text-sm text-slate-500">
              {content.about?.note}
            </p>
          </div>
        </section>
      ) : null}

      {/* Como funciona */}
      {content.steps?.visible !== false ? (
        <section id="como-funciona" className="bg-slate-900 text-white">
          <div className="mx-auto max-w-6xl px-4 py-16 sm:py-20">
            <h2 className="text-2xl font-bold sm:text-3xl">{content.steps?.title}</h2>
            <ol className="mt-10 grid gap-5 md:grid-cols-4">
              {(content.steps?.items ?? []).map((step, index) => (
                <li key={step.title} className="rounded-2xl bg-white/5 p-5">
                  <span className="grid h-9 w-9 place-items-center rounded-lg bg-sky-400 text-sm font-bold text-slate-900">
                    {index + 1}
                  </span>
                  <h3 className="mt-4 font-semibold">{step.title}</h3>
                  <p className="mt-2 text-sm text-white/70">{step.description}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>
      ) : null}

      {/* Estrutura */}
      {content.gallery?.visible !== false ? (
        <section id="estrutura" className="mx-auto max-w-6xl px-4 py-16 sm:py-20">
          <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
            {content.gallery?.title}
          </h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {(content.gallery?.items ?? []).map((item) => {
              const url = item.image_url ?? roomImage;
              return (
                <button
                  key={item.label}
                  type="button"
                  className="group overflow-hidden rounded-2xl border border-slate-200 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
                  onClick={() => {
                    setLightbox({ label: item.label, url });
                    trackEvent("galeria", `${site.slug}:${item.label}`);
                  }}
                >
                  <img
                    src={url}
                    alt={`Imagem demonstrativa: ${item.label}`}
                    width={1200}
                    height={900}
                    loading="lazy"
                    className="aspect-[4/3] w-full object-cover transition duration-200 group-hover:scale-[1.02] motion-reduce:transform-none"
                  />
                  <span className="block px-4 py-3 text-sm font-medium text-slate-700">
                    {item.label}
                  </span>
                </button>
              );
            })}
          </div>
          <p className="mt-6 text-sm text-slate-500">{content.gallery?.note}</p>
        </section>
      ) : null}

      {/* Equipe (opcional) */}
      {content.team?.visible ? (
        <section className="bg-slate-50">
          <div className="mx-auto max-w-6xl px-4 py-16 sm:py-20">
            <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">{content.team?.title}</h2>
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {(content.team?.items ?? [])
                .filter((member) => member.visible !== false)
                .map((member) => (
                  <article key={member.name} className="rounded-2xl bg-white p-6 shadow-sm">
                    <h3 className="font-semibold text-slate-900">{member.name}</h3>
                    <p className="text-sm text-sky-800">{member.role}</p>
                    <p className="mt-2 text-xs text-slate-500">{member.register}</p>
                    <p className="mt-3 text-sm text-slate-600">{member.bio}</p>
                  </article>
                ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* Compromissos */}
      {content.commitments?.visible !== false ? (
        <section className="mx-auto max-w-6xl px-4 py-16 sm:py-20">
          <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
            {content.commitments?.title}
          </h2>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {(content.commitments?.items ?? []).map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 rounded-xl border border-slate-200 p-4 text-sm text-slate-700"
              >
                <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-teal-600" aria-hidden />
                {item}
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {/* FAQ */}
      {content.faq?.visible !== false ? (
        <section id="duvidas" className="bg-slate-50">
          <div className="mx-auto max-w-3xl px-4 py-16 sm:py-20">
            <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">{content.faq?.title}</h2>
            <Accordion
              type="single"
              collapsible
              className="mt-8"
              onValueChange={(value) => value && trackEvent("faq", `${site.slug}:${value}`)}
            >
              {(content.faq?.items ?? []).map((item) => (
                <AccordionItem key={item.question} value={item.question}>
                  <AccordionTrigger className="text-left text-slate-900">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-slate-600">{item.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>
      ) : null}

      {/* Formulário */}
      {content.form?.visible !== false ? (
        <DemoForm site={site} fallbackPath={pagePath} />
      ) : null}

      {/* CTA final */}
      {content.final_cta?.visible !== false ? (
        <section
          className="text-white"
          style={{ backgroundColor: site.theme?.deep ?? "#0a2748" }}
        >
          <div className="mx-auto max-w-3xl px-4 py-16 sm:py-20 text-center">
            <h2 className="text-2xl font-bold sm:text-3xl">{content.final_cta?.title}</h2>
            <p className="mt-3 text-white/80">{content.final_cta?.text}</p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Button
                size="lg"
                className="bg-sky-400 text-slate-900 hover:bg-sky-300"
                onClick={() => {
                  trackEvent("agendamento", `${site.slug}:cta-final`);
                  scrollToId("contato");
                }}
              >
                {content.final_cta?.cta_primary ?? "Solicitar avaliação"}
              </Button>
              {agencyWa ? (
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-white/40 bg-transparent text-white hover:bg-white/10"
                  onClick={() => trackEvent("whatsapp", `${site.slug}:cta-final`)}
                >
                  <a href={agencyWa} target="_blank" rel="noreferrer">
                    {content.final_cta?.cta_secondary ?? "Falar pelo WhatsApp"}
                  </a>
                </Button>
              ) : null}
            </div>
            <p className="mt-8 text-xs text-white/60">{content.final_cta?.note}</p>
          </div>
        </section>
      ) : null}

      {/* Rodapé */}
      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-2">
              <span
                className="grid h-9 w-9 place-items-center rounded-lg text-xs font-bold text-white"
                style={{ backgroundColor: site.theme?.primary ?? "#0f3b6d" }}
              >
                {brand.initials ?? "CO"}
              </span>
              <span className="text-sm font-semibold text-slate-900">{brand.name}</span>
            </div>
            <p className="mt-3 text-sm text-slate-600">{content.footer?.description}</p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-slate-900">Navegação</h3>
            <ul className="mt-3 space-y-2 text-sm text-slate-600">
              {nav.map((item) => (
                <li key={item.href}>
                  <button type="button" onClick={() => scrollToId(item.href)}>
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-slate-900">Contato</h3>
            <ul className="mt-3 space-y-2 text-sm text-slate-600">
              <li className="flex items-start gap-2">
                <Phone className="mt-0.5 h-4 w-4 shrink-0" aria-hidden /> {brand.phone}
              </li>
              <li className="flex items-start gap-2">
                <Mail className="mt-0.5 h-4 w-4 shrink-0" aria-hidden /> {brand.email}
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0" aria-hidden /> {brand.address}
              </li>
              <li>{brand.hours}</li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-slate-900">Informações legais</h3>
            <ul className="mt-3 space-y-2 text-sm text-slate-600">
              <li>
                <Link to="/politica-de-privacidade">Política de Privacidade</Link>
              </li>
              <li>
                <Link to="/termos-de-uso">Termos de Uso</Link>
              </li>
              <li>
                <Link to="/politica-de-cookies">Política de Cookies</Link>
              </li>
              <li>
                <Link to="/portfolio" onClick={() => trackEvent("retorno_portfolio", site.slug)}>
                  Voltar ao portfólio
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <p className="border-t border-slate-200 px-4 py-5 text-center text-xs text-slate-500">
          {content.footer?.note ?? content.demo_notice}
        </p>
      </footer>

      {/* WhatsApp flutuante */}
      {content.whatsapp?.enabled !== false && agencyWa ? (
        <a
          href={agencyWa}
          target="_blank"
          rel="noreferrer"
          aria-label="Conversar pelo WhatsApp"
          onClick={() => trackEvent("whatsapp", `${site.slug}:flutuante`)}
          className="fixed bottom-[max(1.25rem,env(safe-area-inset-bottom))] right-5 z-40 grid h-14 w-14 place-items-center rounded-full bg-emerald-600 text-white shadow-lg transition hover:bg-emerald-700 focus-visible:ring-2 focus-visible:ring-emerald-300"
        >
          <MessageCircle className="h-6 w-6" aria-hidden />
        </a>
      ) : null}

      <Dialog open={!!lightbox} onOpenChange={(open) => !open && setLightbox(null)}>
        <DialogContent className="max-w-3xl">
          <DialogTitle className="text-base">{lightbox?.label}</DialogTitle>
          {lightbox ? (
            <img
              src={lightbox.url}
              alt={`Imagem ampliada: ${lightbox.label}`}
              className="w-full rounded-lg object-cover"
            />
          ) : null}
          <p className="text-xs text-slate-500">{content.gallery?.note}</p>
        </DialogContent>
      </Dialog>
    </div>
  );
}

const emptyForm = {
  name: "",
  whatsapp: "",
  email: "",
  treatment: "",
  period: "",
  message: "",
};

type FieldErrors = Partial<Record<"name" | "whatsapp" | "email" | "consent", string>>;

const SUCCESS_MESSAGE =
  "Recebemos sua solicitação. A equipe entrará em contato para verificar a disponibilidade do atendimento.";

function validate(values: typeof emptyForm, consent: boolean): FieldErrors {
  const errors: FieldErrors = {};
  if (values.name.trim().length < 2) errors.name = "Informe seu nome completo.";
  const digits = values.whatsapp.replace(/\D/g, "");
  if (!values.whatsapp.trim()) errors.whatsapp = "Informe um número de WhatsApp.";
  else if (digits.length < 10 || digits.length > 13)
    errors.whatsapp = "Use o formato com DDD, por exemplo (11) 99999-9999.";
  if (values.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email.trim()))
    errors.email = "Informe um e-mail válido.";
  if (!consent) errors.consent = "É necessário aceitar a política de privacidade.";
  return errors;
}

function DemoForm({ site, fallbackPath }: { site: DemoSite; fallbackPath: string }) {
  const send = useServerFn(submitDemoLead);
  const form = site.content?.form ?? {};
  const [values, setValues] = useState(emptyForm);
  const [consent, setConsent] = useState(false);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [failure, setFailure] = useState<string | null>(null);

  const set = (key: keyof typeof emptyForm) => (value: string) => {
    setValues((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (sending) return;
    const found = validate(values, consent);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      setFailure(null);
      trackEvent("form_erro", `${site.slug}:validacao`);
      toast.error("Verifique os campos destacados no formulário.");
      return;
    }
    setSending(true);
    setFailure(null);
    try {
      await send({
        data: {
          ...values,
          consent: true,
          model: site.name,
          page_url: typeof window !== "undefined" ? window.location.href : fallbackPath,
          campaign:
            typeof window !== "undefined"
              ? (new URLSearchParams(window.location.search).get("utm_campaign") ?? "")
              : "",
        },
      });
      setSent(true);
      setValues(emptyForm);
      setConsent(false);
      trackEvent("orcamento", `${site.slug}:formulario`);
      toast.success("Solicitação enviada!");
    } catch (error) {
      console.error("[demo-lead] falha ao enviar solicitação", error);
      trackEvent("form_erro", `${site.slug}:envio`);
      setFailure(
        "Não foi possível enviar sua solicitação agora. Seus dados foram mantidos no formulário — tente novamente em instantes.",
      );
      toast.error("Não foi possível enviar agora. Tente novamente.");
    } finally {
      setSending(false);
    }
  }


  return (
    <section id="contato" className="mx-auto max-w-3xl px-4 py-16 sm:py-20">
      <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">{form.title}</h2>
      <p className="mt-3 text-slate-600">{form.subtitle}</p>

      {sent ? (
        <div
          role="status"
          className="mt-8 rounded-2xl border border-emerald-200 bg-emerald-50 p-6 text-emerald-900"
        >
          <CheckCircle2 className="h-6 w-6" aria-hidden />
          <p className="mt-3 font-medium">{form.success_message ?? SUCCESS_MESSAGE}</p>
          <Button variant="outline" className="mt-5 min-h-11" onClick={() => setSent(false)}>
            Enviar nova solicitação
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="mt-8 grid gap-5 sm:grid-cols-2" noValidate>
          {failure ? (
            <p
              role="alert"
              className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800 sm:col-span-2"
            >
              {failure}
            </p>
          ) : null}
          <div className="grid gap-2">
            <Label htmlFor="demo-nome">Nome</Label>
            <Input
              id="demo-nome"
              required
              maxLength={120}
              value={values.name}
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? "demo-nome-erro" : undefined}
              onChange={(e) => set("name")(e.target.value)}
            />
            {errors.name ? (
              <p id="demo-nome-erro" className="text-sm text-red-700">
                {errors.name}
              </p>
            ) : null}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="demo-whatsapp">WhatsApp</Label>
            <Input
              id="demo-whatsapp"
              required
              inputMode="tel"
              placeholder="(11) 99999-9999"
              maxLength={30}
              value={values.whatsapp}
              aria-invalid={!!errors.whatsapp}
              aria-describedby={errors.whatsapp ? "demo-whatsapp-erro" : undefined}
              onChange={(e) => set("whatsapp")(e.target.value)}
            />
            {errors.whatsapp ? (
              <p id="demo-whatsapp-erro" className="text-sm text-red-700">
                {errors.whatsapp}
              </p>
            ) : null}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="demo-email">E-mail (opcional)</Label>
            <Input
              id="demo-email"
              type="email"
              maxLength={255}
              value={values.email}
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "demo-email-erro" : undefined}
              onChange={(e) => set("email")(e.target.value)}
            />
            {errors.email ? (
              <p id="demo-email-erro" className="text-sm text-red-700">
                {errors.email}
              </p>
            ) : null}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="demo-tratamento">Tratamento de interesse</Label>
            <Select value={values.treatment} onValueChange={set("treatment")}>
              <SelectTrigger id="demo-tratamento">
                <SelectValue placeholder="Selecione" />
              </SelectTrigger>
              <SelectContent>
                {(form.treatments ?? []).map((item) => (
                  <SelectItem key={item} value={item}>
                    {item}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="demo-periodo">Melhor período</Label>
            <Select value={values.period} onValueChange={set("period")}>
              <SelectTrigger id="demo-periodo">
                <SelectValue placeholder="Selecione" />
              </SelectTrigger>
              <SelectContent>
                {(form.periods ?? []).map((item) => (
                  <SelectItem key={item} value={item}>
                    {item}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2 sm:col-span-2">
            <Label htmlFor="demo-mensagem">Mensagem</Label>
            <Textarea
              id="demo-mensagem"
              rows={4}
              maxLength={1000}
              value={values.message}
              onChange={(e) => set("message")(e.target.value)}
            />
          </div>
          <div className="grid gap-2 sm:col-span-2">
            <div className="flex items-start gap-3">
              <Checkbox
                id="demo-consent"
                checked={consent}
                aria-invalid={!!errors.consent}
                aria-describedby={errors.consent ? "demo-consent-erro" : undefined}
                onCheckedChange={(v) => {
                  setConsent(v === true);
                  setErrors((prev) => ({ ...prev, consent: undefined }));
                }}
              />
              <Label
                htmlFor="demo-consent"
                className="text-sm font-normal leading-snug text-slate-600"
              >
                Autorizo o contato e o uso dos meus dados para retorno desta solicitação, conforme a{" "}
                <Link to="/politica-de-privacidade" className="underline">
                  Política de Privacidade
                </Link>
                .
              </Label>
            </div>
            {errors.consent ? (
              <p id="demo-consent-erro" className="text-sm text-red-700">
                {errors.consent}
              </p>
            ) : null}
          </div>
          <Button
            type="submit"
            size="lg"
            disabled={sending}
            className="min-h-12 w-full text-white sm:col-span-2"
            style={{ backgroundColor: site.theme?.primary ?? "#0f3b6d" }}
          >
            {sending ? "Enviando..." : "Solicitar agendamento"}
          </Button>

        </form>
      )}
      <p className="mt-4 text-xs text-slate-500">
        Coletamos apenas os dados necessários para o primeiro contato. Nenhuma informação de saúde
        detalhada deve ser enviada por este formulário.
      </p>
    </section>
  );
}

export { X as DemoCloseIcon };
