import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";

import { PageHeader, SiteShell } from "@/components/site/site-shell";
import { siteContentQuery } from "@/lib/site-content.queries";

export const Route = createFileRoute("/termos-de-uso")({
  loader: ({ context }) => context.queryClient.ensureQueryData(siteContentQuery),
  head: () => ({
    meta: [
      { title: "Termos de Uso" },
      {
        name: "description",
        content:
          "Condições de uso do site, escopo dos serviços de criação de landing pages, prazos, revisões e responsabilidades.",
      },
      { property: "og:title", content: "Termos de Uso" },
      { property: "og:description", content: "Regras e condições para uso do site e dos serviços." },
    ],
  }),
  component: TermosPage,
});

function TermosPage() {
  const { data } = useSuspenseQuery(siteContentQuery);

  return (
    <SiteShell settings={data.settings}>
      <PageHeader eyebrow="Legal" title="Termos de Uso" />
      <article className="mx-auto max-w-3xl space-y-6 px-4 py-16 text-sm leading-relaxed text-muted-foreground">
        <section>
          <h2 className="text-lg font-semibold text-foreground">1. Objeto</h2>
          <p className="mt-2">
            Este site apresenta serviços de criação de landing pages. O envio de um formulário não
            constitui contrato: representa apenas uma solicitação de orçamento.
          </p>
        </section>
        <section>
          <h2 className="text-lg font-semibold text-foreground">2. Escopo dos serviços</h2>
          <p className="mt-2">
            O escopo de cada projeto é definido em proposta específica, incluindo número de seções,
            revisões previstas, período de suporte e prazos estimados de entrega.
          </p>
        </section>
        <section>
          <h2 className="text-lg font-semibold text-foreground">3. Conteúdo do cliente</h2>
          <p className="mt-2">
            Textos, imagens e logotipos enviados pelo cliente são de sua responsabilidade, incluindo
            direitos de uso. Podemos sugerir ajustes de redação e organização.
          </p>
        </section>
        <section>
          <h2 className="text-lg font-semibold text-foreground">4. Modelos demonstrativos</h2>
          <p className="mt-2">
            Os modelos exibidos são conceituais, criados para fins de demonstração, e não
            representam clientes reais nem garantem resultados específicos.
          </p>
        </section>
        <section>
          <h2 className="text-lg font-semibold text-foreground">5. Prazos e revisões</h2>
          <p className="mt-2">
            Prazos começam a contar após o recebimento completo do briefing e dos materiais. As
            revisões seguem a quantidade prevista no plano contratado.
          </p>
        </section>
        <section>
          <h2 className="text-lg font-semibold text-foreground">6. Alterações destes termos</h2>
          <p className="mt-2">
            Estes termos podem ser atualizados a qualquer momento; a versão vigente é sempre a
            publicada nesta página.
          </p>
        </section>
      </article>
    </SiteShell>
  );
}
