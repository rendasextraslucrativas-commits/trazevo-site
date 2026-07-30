import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";

import { Badge } from "@/components/ui/badge";
import { FinalCta } from "@/components/site/sections";
import { PageHeader, SiteShell } from "@/components/site/site-shell";
import { portfolioItemQuery, siteContentQuery } from "@/lib/site-content.queries";

export const Route = createFileRoute("/portfolio/$slug")({
  loader: async ({ context, params }) => {
    const [, item] = await Promise.all([
      context.queryClient.ensureQueryData(siteContentQuery),
      context.queryClient.ensureQueryData(portfolioItemQuery(params.slug)),
    ]);
    if (!item) throw notFound();
    return { title: item.title, summary: item.summary };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Case indisponível" }, { name: "robots", content: "noindex" }],
      };
    }
    const description =
      loaderData.summary ?? "Case demonstrativo de landing page criado pela agência.";
    return {
      meta: [
        { title: `${loaderData.title} — case demonstrativo` },
        { name: "description", content: description },
        { property: "og:title", content: loaderData.title },
        { property: "og:description", content: description },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  notFoundComponent: () => <NotFoundCase />,
  errorComponent: () => <NotFoundCase />,
  component: PortfolioDetail,
});

function NotFoundCase() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-24 text-center">
      <h1 className="text-2xl font-bold text-brand">Case não encontrado</h1>
      <p className="mt-3 text-muted-foreground">
        O conteúdo pode ter sido removido ou ainda não foi publicado.
      </p>
      <Link to="/portfolio" className="mt-6 inline-block text-primary underline">
        Voltar ao portfólio
      </Link>
    </div>
  );
}

function PortfolioDetail() {
  const { slug } = Route.useParams();
  const { data: content } = useSuspenseQuery(siteContentQuery);
  const { data: item } = useSuspenseQuery(portfolioItemQuery(slug));

  if (!item) return <NotFoundCase />;

  const blocks = [
    { label: "Desafio", value: item.challenge },
    { label: "Solução", value: item.solution },
    { label: "Resultado", value: item.result },
  ].filter((block) => block.value);

  return (
    <SiteShell settings={content.settings}>
      <PageHeader eyebrow={item.niche} title={item.title} subtitle={item.summary} />
      <article className="mx-auto max-w-3xl px-4 py-16">
        {item.cover_url ? (
          <img
            src={item.cover_url}
            alt={`Capa do case ${item.title}`}
            className="mb-10 w-full rounded-xl border border-border object-cover"
          />
        ) : null}
        <div className="space-y-8">
          {blocks.map((block) => (
            <section key={block.label}>
              <h2 className="text-lg font-semibold text-brand">{block.label}</h2>
              <p className="mt-2 whitespace-pre-line text-muted-foreground">{block.value}</p>
            </section>
          ))}
        </div>
        {item.tags.length > 0 ? (
          <div className="mt-10 flex flex-wrap gap-2">
            {item.tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
        ) : null}
        {item.is_demo ? (
          <p className="mt-10 rounded-lg bg-surface p-4 text-sm text-muted-foreground">
            Case demonstrativo criado para ilustrar a metodologia. Não representa cliente real.
          </p>
        ) : null}
      </article>
      <FinalCta
        settings={content.settings}
        title="Vamos construir a sua página?"
        subtitle="Solicite um orçamento e receba uma proposta com prazo e escopo."
      />
    </SiteShell>
  );
}
