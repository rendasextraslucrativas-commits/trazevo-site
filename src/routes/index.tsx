import { createFileRoute, Link } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { useSuspenseQuery } from "@tanstack/react-query";

import { Button } from "@/components/ui/button";
import { DeviceMockup } from "@/components/site/device-mockup";
import {
  BenefitsGrid,
  FinalCta,
  SectionTitle,
} from "@/components/site/sections";
import { TestimonialsGrid } from "@/components/site/showcase";
import { PricingSection } from "@/components/site/pricing-section";
import { HowItWorksSection } from "@/components/site/how-it-works-section";
import { PortfolioSection } from "@/components/site/portfolio-section";
import { AboutSection } from "@/components/site/about-section";
import { FaqSection } from "@/components/site/faq-section";
import { ContactSection } from "@/components/site/contact-section";
import { WhatsappFloat } from "@/components/site/whatsapp-float";
import { SiteShell } from "@/components/site/site-shell";
import { SHOW_SHOWCASE } from "@/lib/feature-flags";
import { siteContentQuery } from "@/lib/site-content.queries";
import { trackEvent } from "@/components/site/analytics-tracker";
import { findSection, whatsappLink } from "@/lib/site-content.types";

export const Route = createFileRoute("/")({
  loader: ({ context }) => context.queryClient.ensureQueryData(siteContentQuery),
  head: () => ({
    meta: [
      { title: "TRAZEVO | Sites profissionais para negócios que querem crescer" },
      {
        name: "description",
        content:
          "A TRAZEVO cria sites profissionais, landing pages e catálogos digitais para pequenos negócios, empresas locais e prestadores de serviços.",
      },
      { property: "og:title", content: "TRAZEVO | Sites profissionais" },
      {
        property: "og:description",
        content:
          "Sites profissionais, landing pages e catálogos digitais para negócios que querem crescer.",
      },
      { property: "og:url", content: "https://sunshine-stack-start.lovable.app/" },
    ],
  }),
  component: Index,
});

function Index() {
  const { data } = useSuspenseQuery(siteContentQuery);
  const hero = findSection(data, "hero");
  const beneficios = findSection(data, "beneficios");
  const fluxo = findSection(data, "fluxo");
  const processo = findSection(data, "processo");
  const ctaFinal = findSection(data, "cta_final");
  const wa = whatsappLink(data.settings);

  return (
    <SiteShell settings={data.settings}>
      {hero?.is_visible !== false ? (
        <section className="border-b border-border bg-gradient-to-b from-surface to-background">
          <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-16 lg:grid-cols-2 lg:py-24">
            <div>
              <p className="inline-flex items-center gap-2 rounded-full bg-brand-soft px-3 py-1.5 text-xs font-semibold tracking-wide text-brand-soft-foreground">
                <span className="font-extrabold uppercase tracking-[0.16em]">Trazevo</span>
                <span aria-hidden className="h-3 w-px bg-current opacity-30" />
                Sites profissionais para negócios que querem crescer
              </p>
              <h1 className="mt-4 text-3xl font-bold leading-tight tracking-tight text-brand sm:text-4xl lg:text-5xl">
                {hero?.title}
              </h1>
              <p className="mt-5 max-w-xl text-base text-muted-foreground sm:text-lg">
                {hero?.subtitle}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button asChild size="lg">
                  <Link to="/contato">Solicitar orçamento</Link>
                </Button>
                {SHOW_SHOWCASE ? (
                  <Button asChild size="lg" variant="outline">
                    <Link to="/" hash="portfolio">Ver portfólio</Link>
                  </Button>
                ) : (
                  <Button asChild size="lg" variant="outline">
                    <Link to="/planos">Ver planos</Link>
                  </Button>
                )}
                {wa ? (
                  <Button asChild size="lg" variant="ghost">
                    <a
                      href={wa}
                      target="_blank"
                      rel="noreferrer"
                      onClick={() => trackEvent("whatsapp", "home_hero")}
                    >
                      Falar no WhatsApp
                    </a>
                  </Button>
                ) : null}
              </div>
              <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm text-muted-foreground">
                {["Adaptado para celulares", "Integração com WhatsApp", "Atendimento personalizado"].map(
                  (item) => (
                    <li key={item} className="inline-flex items-center gap-2">
                      <Check className="h-4 w-4 text-primary" aria-hidden />
                      {item}
                    </li>
                  ),
                )}
              </ul>
            </div>
            <div className="pb-8">
              <DeviceMockup />
            </div>
          </div>
        </section>
      ) : null}

      {beneficios?.is_visible !== false ? (
        <section id="beneficios" className="mx-auto max-w-6xl px-4 py-16 sm:py-20">
          <SectionTitle title={beneficios?.title ?? ""} subtitle={beneficios?.subtitle} />
          <BenefitsGrid benefits={data.benefits} />
        </section>
      ) : null}

      {processo?.is_visible !== false || fluxo?.is_visible !== false ? (
        <div className="border-y border-border bg-surface">
          <HowItWorksSection
            cmsSteps={data.steps}
            whatsappUrl={wa}
            title={processo?.title ?? fluxo?.title}
            subtitle={processo?.subtitle ?? fluxo?.subtitle}
          />
        </div>
      ) : null}

      <PortfolioSection />

      <PricingSection />

      {SHOW_SHOWCASE && (data.testimonials?.length ?? 0) > 0 ? (
        <section className="mx-auto max-w-6xl px-4 py-16 sm:py-20">
          <SectionTitle
            title="Quem já publicou com a gente"
            subtitle="Depoimentos demonstrativos que ilustram o formato de entrega."
          />
          <div className="mt-10">
            <TestimonialsGrid testimonials={(data.testimonials ?? []).slice(0, 3)} />
          </div>
        </section>
      ) : null}

      <AboutSection />

      <FaqSection />

      <ContactSection />

      <FinalCta
        settings={data.settings}
        title={ctaFinal?.title ?? "Pronto para apresentar seu negócio de forma profissional?"}
        subtitle={ctaFinal?.subtitle}
      />

      <WhatsappFloat />
    </SiteShell>
  );
}
