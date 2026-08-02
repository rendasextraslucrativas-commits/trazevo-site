import { createFileRoute, Link } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";

import { Button } from "@/components/ui/button";
import { DeviceMockup } from "@/components/site/device-mockup";
import {
  BenefitsGrid,
  FaqAccordion,
  FinalCta,
  FlowDiagram,
  PlansGrid,
  ProcessList,
  SectionTitle,
  TemplatesGrid,
} from "@/components/site/sections";
import { PortfolioGrid, TestimonialsGrid } from "@/components/site/showcase";
import { ServicesSection } from "@/components/site/services-section";
import { PricingSection } from "@/components/site/pricing-section";
import { SiteShell } from "@/components/site/site-shell";
import { SHOW_SHOWCASE } from "@/lib/feature-flags";
import { siteContentQuery } from "@/lib/site-content.queries";
import { trackEvent } from "@/components/site/analytics-tracker";
import { findSection, whatsappLink } from "@/lib/site-content.types";

export const Route = createFileRoute("/")({
  loader: ({ context }) => context.queryClient.ensureQueryData(siteContentQuery),
  head: () => ({
    meta: [
      { title: "Agência de Landing Pages | Páginas que geram contatos" },
      {
        name: "description",
        content:
          "Criamos landing pages modernas, rápidas e estratégicas para apresentar seu negócio, gerar contatos e facilitar o atendimento pelo WhatsApp.",
      },
      { property: "og:title", content: "Agência de Landing Pages" },
      {
        property: "og:description",
        content:
          "Landing pages profissionais para transformar visitantes em oportunidades reais de contato.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  const { data } = useSuspenseQuery(siteContentQuery);
  const hero = findSection(data, "hero");
  const beneficios = findSection(data, "beneficios");
  const fluxo = findSection(data, "fluxo");
  const servicos = findSection(data, "servicos");
  const modelos = findSection(data, "modelos");
  const processo = findSection(data, "processo");
  const sobre = findSection(data, "sobre");
  const faq = findSection(data, "faq");
  const ctaFinal = findSection(data, "cta_final");
  const wa = whatsappLink(data.settings);

  return (
    <SiteShell settings={data.settings}>
      {hero?.is_visible !== false ? (
        <section className="border-b border-border bg-gradient-to-b from-surface to-background">
          <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-16 lg:grid-cols-2 lg:py-24">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-primary">
                {data.settings?.agency_name ?? "Agência de Landing Pages"}
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
                    <Link to="/modelos">Conhecer modelos</Link>
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
            </div>
            <div className="pb-8">
              <DeviceMockup />
            </div>
          </div>
        </section>
      ) : null}

      {beneficios?.is_visible !== false ? (
        <section className="mx-auto max-w-6xl px-4 py-16 sm:py-20">
          <SectionTitle title={beneficios?.title ?? ""} subtitle={beneficios?.subtitle} />
          <BenefitsGrid benefits={data.benefits} />
        </section>
      ) : null}

      <ServicesSection />

      <PricingSection />

      {servicos?.is_visible !== false ? (
        <section className="border-y border-border bg-surface">
          <div className="mx-auto max-w-6xl px-4 py-16 sm:py-20">
            <SectionTitle title={servicos?.title ?? ""} subtitle={servicos?.subtitle} />
            <PlansGrid plans={data.plans} currency={data.settings?.currency ?? "BRL"} />
          </div>
        </section>
      ) : null}

      {fluxo?.is_visible !== false ? (
        <section className="mx-auto max-w-6xl px-4 py-16 sm:py-20">
          <SectionTitle title={fluxo?.title ?? ""} subtitle={fluxo?.subtitle} />
          <FlowDiagram />
        </section>
      ) : null}

      {processo?.is_visible !== false ? (
        <section className="border-y border-border bg-surface">
          <div className="mx-auto max-w-6xl px-4 py-16 sm:py-20">
            <SectionTitle title={processo?.title ?? ""} subtitle={processo?.subtitle} />
            <ProcessList steps={data.steps} />
          </div>
        </section>
      ) : null}

      {SHOW_SHOWCASE ? (
        <>
          {modelos?.is_visible !== false ? (
            <section className="mx-auto max-w-6xl px-4 py-16 sm:py-20">
              <SectionTitle title={modelos?.title ?? ""} subtitle={modelos?.subtitle} />
              <TemplatesGrid templates={(data.templates ?? []).slice(0, 3)} />
              <div className="mt-8 text-center">
                <Button asChild variant="outline">
                  <Link to="/modelos">Ver todos os modelos</Link>
                </Button>
              </div>
            </section>
          ) : null}

          {(data.testimonials?.length ?? 0) > 0 ? (
            <section className="border-y border-border bg-surface">
              <div className="mx-auto max-w-6xl px-4 py-16 sm:py-20">
                <SectionTitle
                  title="Quem já publicou com a gente"
                  subtitle="Depoimentos demonstrativos que ilustram o formato de entrega."
                />
                <div className="mt-10">
                  <TestimonialsGrid testimonials={(data.testimonials ?? []).slice(0, 3)} />
                </div>
              </div>
            </section>
          ) : null}

          {(data.portfolio?.length ?? 0) > 0 ? (
            <section className="mx-auto max-w-6xl px-4 py-16 sm:py-20">
              <SectionTitle
                title="Cases demonstrativos"
                subtitle="Veja o desafio, a solução e o resultado esperado em cada nicho."
              />
              <div className="mt-10">
                <PortfolioGrid items={(data.portfolio ?? []).slice(0, 3)} />
              </div>
              <div className="mt-8 text-center">
                <Button asChild variant="outline">
                  <Link to="/portfolio">Ver portfólio completo</Link>
                </Button>
              </div>
            </section>
          ) : null}
        </>
      ) : (
        <section className="mx-auto max-w-3xl px-4 py-16 text-center sm:py-20">
          <h2 className="text-2xl font-bold tracking-tight text-brand sm:text-3xl">
            Novos projetos estão chegando
          </h2>
          <p className="mt-4 text-muted-foreground">
            Estamos preparando modelos exclusivos de sites para diferentes segmentos. Em breve, você
            poderá conhecer cada projeto desenvolvido pela SiteFluxo.
          </p>
          <div className="mt-8">
            <Button asChild size="lg">
              <Link to="/contato">Quero criar meu site</Link>
            </Button>
          </div>
        </section>
      )}

      {sobre?.is_visible !== false ? (
        <section className="border-y border-border bg-surface">
          <div className="mx-auto max-w-3xl px-4 py-16 text-center sm:py-20">
            <h2 className="text-2xl font-bold tracking-tight text-brand sm:text-3xl">
              {sobre?.title}
            </h2>
            <p className="mt-4 text-muted-foreground">{sobre?.subtitle}</p>
          </div>
        </section>
      ) : null}

      {faq?.is_visible !== false ? (
        <section className="mx-auto max-w-6xl px-4 py-16 sm:py-20">
          <SectionTitle title={faq?.title ?? ""} subtitle={faq?.subtitle} />
          <FaqAccordion faqs={data.faqs.slice(0, 6)} />
          <div className="mt-8 text-center">
            <Button asChild variant="outline">
              <Link to="/perguntas-frequentes">Ver todas as perguntas</Link>
            </Button>
          </div>
        </section>
      ) : null}

      <FinalCta
        settings={data.settings}
        title={ctaFinal?.title ?? "Pronto para apresentar seu negócio de forma profissional?"}
        subtitle={ctaFinal?.subtitle}
      />
    </SiteShell>
  );
}
