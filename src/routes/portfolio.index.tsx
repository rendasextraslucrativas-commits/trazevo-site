import { createFileRoute, Link } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";

import { Button } from "@/components/ui/button";

import { FinalCta } from "@/components/site/sections";
import { PortfolioGrid, TestimonialsGrid } from "@/components/site/showcase";
import { PageHeader, SectionTitle, SiteShell } from "@/components/site/site-shell";
import { siteContentQuery } from "@/lib/site-content.queries";

export const Route = createFileRoute("/portfolio/")({
  loader: ({ context }) => context.queryClient.ensureQueryData(siteContentQuery),
  head: () => ({
    meta: [
      { title: "Portfólio de cases demonstrativos de landing pages" },
      {
        name: "description",
        content:
          "Cases demonstrativos por nicho: desafio, solução aplicada e resultado esperado em cada landing page criada pela agência.",
      },
      { property: "og:title", content: "Portfólio de cases demonstrativos" },
      {
        property: "og:description",
        content: "Veja como estruturamos landing pages por nicho, do desafio ao resultado.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PortfolioPage,
});

function PortfolioPage() {
  const { data } = useSuspenseQuery(siteContentQuery);

  return (
    <SiteShell settings={data.settings}>
      <PageHeader
        eyebrow="Portfólio"
        title="Cases demonstrativos por nicho"
        subtitle="Exemplos conceituais que mostram como estruturamos cada página, do desafio ao resultado esperado."
      />
      <section className="mx-auto max-w-6xl px-4 pt-16">
        <div className="grid items-center gap-6 rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-soft)] sm:grid-cols-[minmax(0,1fr)_auto]">
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-widest text-primary">
              Modelo navegável
            </p>
            <h2 className="mt-2 text-xl font-bold text-brand">
              Mini site demonstrativo para clínicas odontológicas
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Explore um modelo completo com tratamentos, agendamento e WhatsApp. Projeto
              demonstrativo — não representa uma clínica real.
            </p>
          </div>
          <Button asChild size="lg">
            <Link to="/portfolio/clinica-odontologica">Visualizar modelo</Link>
          </Button>
        </div>
      </section>
      <section className="mx-auto max-w-6xl px-4 py-16">
        <PortfolioGrid items={data.portfolio} />
      </section>

      {data.testimonials.length > 0 ? (
        <section className="border-t border-border bg-surface">
          <div className="mx-auto max-w-6xl px-4 py-16">
            <SectionTitle
              title="O que dizem sobre o trabalho"
              subtitle="Depoimentos demonstrativos usados para ilustrar o formato da página."
            />
            <div className="mt-10">
              <TestimonialsGrid testimonials={data.testimonials} />
            </div>
          </div>
        </section>
      ) : null}
      <FinalCta
        settings={data.settings}
        title="Quer um case assim para o seu negócio?"
        subtitle="Conte o seu desafio e montamos a estrutura ideal."
      />
    </SiteShell>
  );
}
