import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";

import { FinalCta, PlansGrid } from "@/components/site/sections";
import { PageHeader, SiteShell } from "@/components/site/site-shell";
import { siteContentQuery } from "@/lib/site-content.queries";
import { findSection } from "@/lib/site-content.types";

export const Route = createFileRoute("/planos")({
  loader: ({ context }) => context.queryClient.ensureQueryData(siteContentQuery),
  head: () => ({
    meta: [
      { title: "Planos e preços de landing pages" },
      {
        name: "description",
        content:
          "Conheça os planos Essencial e Premium: recursos, período de suporte, revisões e valores a partir de R$ 697.",
      },
      { property: "og:title", content: "Planos e preços de landing pages" },
      {
        property: "og:description",
        content: "Compare os planos Essencial e Premium e escolha o que faz sentido para você.",
      },
    ],
  }),
  component: PlanosPage,
});

function PlanosPage() {
  const { data } = useSuspenseQuery(siteContentQuery);
  const section = findSection(data, "servicos");

  return (
    <SiteShell settings={data.settings}>
      <PageHeader
        eyebrow="Planos"
        title={section?.title ?? "Nossos planos"}
        subtitle={section?.subtitle}
      />
      <section className="mx-auto max-w-5xl px-4 py-16">
        <PlansGrid plans={data.plans} currency={data.settings?.currency ?? "BRL"} />
        <p className="mt-10 text-center text-sm text-muted-foreground">
          Os valores são iniciais e podem variar conforme o escopo definido no briefing.
        </p>
      </section>
      <FinalCta
        settings={data.settings}
        title="Ficou em dúvida entre os planos?"
        subtitle="Conte seu objetivo e indicamos a opção mais adequada."
      />
    </SiteShell>
  );
}
