import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";

import { FaqAccordion, FinalCta } from "@/components/site/sections";
import { PageHeader, SiteShell } from "@/components/site/site-shell";
import { siteContentQuery } from "@/lib/site-content.queries";
import { findSection } from "@/lib/site-content.types";

export const Route = createFileRoute("/perguntas-frequentes")({
  loader: ({ context }) => context.queryClient.ensureQueryData(siteContentQuery),
  head: () => ({
    meta: [
      { title: "Perguntas frequentes sobre criação de landing pages" },
      {
        name: "description",
        content:
          "Prazos, pagamento, revisões, domínio, hospedagem, suporte, conteúdo, WhatsApp e alterações futuras: tire suas dúvidas.",
      },
      { property: "og:title", content: "Perguntas frequentes" },
      {
        property: "og:description",
        content: "Respostas às dúvidas mais comuns antes de solicitar um orçamento.",
      },
    ],
  }),
  component: FaqPage,
});

function FaqPage() {
  const { data } = useSuspenseQuery(siteContentQuery);
  const section = findSection(data, "faq");

  return (
    <SiteShell settings={data.settings}>
      <PageHeader
        eyebrow="FAQ"
        title={section?.title ?? "Perguntas frequentes"}
        subtitle={section?.subtitle}
      />
      <section className="mx-auto max-w-6xl px-4 py-16">
        <FaqAccordion faqs={data.faqs} />
      </section>
      <FinalCta
        settings={data.settings}
        title="Ainda tem dúvidas?"
        subtitle="Fale com a gente e respondemos com clareza."
      />
    </SiteShell>
  );
}
