import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";

import { FinalCta, FlowDiagram, ProcessList } from "@/components/site/sections";
import { PageHeader, SectionTitle, SiteShell } from "@/components/site/site-shell";
import { siteContentQuery } from "@/lib/site-content.queries";
import { findSection } from "@/lib/site-content.types";

export const Route = createFileRoute("/como-funciona")({
  loader: ({ context }) => context.queryClient.ensureQueryData(siteContentQuery),
  head: () => ({
    meta: [
      { title: "Como funciona: do briefing à publicação" },
      {
        name: "description",
        content:
          "Nosso método em cinco etapas: briefing, planejamento, criação, revisão e publicação da sua landing page.",
      },
      { property: "og:title", content: "Como funciona nosso processo" },
      {
        property: "og:description",
        content: "Cinco etapas organizadas do briefing até a publicação da página.",
      },
    ],
  }),
  component: ComoFuncionaPage,
});

function ComoFuncionaPage() {
  const { data } = useSuspenseQuery(siteContentQuery);
  const processo = findSection(data, "processo");
  const fluxo = findSection(data, "fluxo");

  return (
    <SiteShell settings={data.settings}>
      <PageHeader
        eyebrow="Como funciona"
        title={processo?.title ?? "Nosso método de trabalho"}
        subtitle={processo?.subtitle}
      />
      <section className="mx-auto max-w-6xl px-4 py-16">
        <ProcessList steps={data.steps} />
      </section>
      <section className="border-t border-border bg-surface">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <SectionTitle title={fluxo?.title ?? ""} subtitle={fluxo?.subtitle} />
          <FlowDiagram />
        </div>
      </section>
      <FinalCta
        settings={data.settings}
        title="Vamos começar pelo briefing?"
        subtitle="Leva poucos minutos e não tem compromisso."
      />
    </SiteShell>
  );
}
