import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";

import { BenefitsGrid, FinalCta, FlowDiagram } from "@/components/site/sections";
import { PageHeader, SectionTitle, SiteShell } from "@/components/site/site-shell";
import { siteContentQuery } from "@/lib/site-content.queries";
import { findSection } from "@/lib/site-content.types";

export const Route = createFileRoute("/beneficios")({
  loader: ({ context }) => context.queryClient.ensureQueryData(siteContentQuery),
  head: () => ({
    meta: [
      { title: "Benefícios de uma landing page profissional" },
      {
        name: "description",
        content:
          "Design profissional, adaptação para celular, carregamento rápido, WhatsApp integrado e estrutura preparada para mecanismos de busca.",
      },
      { property: "og:title", content: "Benefícios de uma landing page profissional" },
      {
        property: "og:description",
        content: "O que você ganha com uma página feita para gerar contatos.",
      },
    ],
  }),
  component: BeneficiosPage,
});

function BeneficiosPage() {
  const { data } = useSuspenseQuery(siteContentQuery);
  const section = findSection(data, "beneficios");
  const fluxo = findSection(data, "fluxo");

  return (
    <SiteShell settings={data.settings}>
      <PageHeader
        eyebrow="Benefícios"
        title={section?.title ?? "Por que investir em uma landing page"}
        subtitle={section?.subtitle}
      />
      <section className="mx-auto max-w-6xl px-4 py-16">
        <BenefitsGrid benefits={data.benefits} />
      </section>
      <section className="border-t border-border bg-surface">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <SectionTitle title={fluxo?.title ?? ""} subtitle={fluxo?.subtitle} />
          <FlowDiagram />
        </div>
      </section>
      <FinalCta
        settings={data.settings}
        title="Quer uma página com essa estrutura?"
        subtitle="Peça um orçamento sem compromisso."
      />
    </SiteShell>
  );
}
