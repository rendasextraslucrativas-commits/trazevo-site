import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";

import { FinalCta, TemplatesGrid } from "@/components/site/sections";
import { PageHeader, SiteShell } from "@/components/site/site-shell";
import { siteContentQuery } from "@/lib/site-content.queries";
import { findSection } from "@/lib/site-content.types";

export const Route = createFileRoute("/modelos/")({
  loader: ({ context }) => context.queryClient.ensureQueryData(siteContentQuery),
  head: () => ({
    meta: [
      { title: "Modelos demonstrativos de landing pages por nicho" },
      {
        name: "description",
        content:
          "Modelos conceituais para clínica odontológica, estética, barbearia, energia solar, contabilidade e delivery, criados para demonstração.",
      },
      { property: "og:title", content: "Modelos demonstrativos de landing pages" },
      {
        property: "og:description",
        content: "Conheça modelos conceituais por nicho criados para fins de demonstração.",
      },
    ],
  }),
  component: ModelosPage,
});

function ModelosPage() {
  const { data } = useSuspenseQuery(siteContentQuery);
  const section = findSection(data, "modelos");

  return (
    <SiteShell settings={data.settings}>
      <PageHeader
        eyebrow="Modelos"
        title={section?.title ?? "Modelos demonstrativos"}
        subtitle={section?.subtitle ?? "Modelo conceitual criado para fins de demonstração."}
      />
      <section className="mx-auto max-w-6xl px-4 py-16">
        <TemplatesGrid templates={data.templates} />
        <p className="mt-10 rounded-lg bg-surface p-4 text-center text-sm text-muted-foreground">
          Estes modelos são conceituais e não representam clientes reais ou projetos contratados.
        </p>
      </section>
      <FinalCta
        settings={data.settings}
        title="Quer um modelo adaptado ao seu negócio?"
        subtitle="Conte o que você precisa e preparamos uma proposta."
      />
    </SiteShell>
  );
}
