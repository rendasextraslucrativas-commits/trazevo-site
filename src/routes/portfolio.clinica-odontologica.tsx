import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";

import { DemoClinicSite } from "@/components/demo/demo-clinic-site";
import { demoSiteQuery } from "@/lib/demo-site.queries";
import { siteContentQuery } from "@/lib/site-content.queries";

const SLUG = "clinica-odontologica";
const CANONICAL = "https://supabasic-project-spark.lovable.app/portfolio/clinica-odontologica";

export const Route = createFileRoute("/portfolio/clinica-odontologica")({
  loader: async ({ context }) => {
    const [, site] = await Promise.all([
      context.queryClient.ensureQueryData(siteContentQuery),
      context.queryClient.ensureQueryData(demoSiteQuery(SLUG)),
    ]);
    if (!site) throw notFound();
    return { meta_title: site.meta_title, meta_description: site.meta_description };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Modelo indisponível" }, { name: "robots", content: "noindex" }],
      };
    }
    const title = loaderData.meta_title ?? "Modelo de Site para Clínica Odontológica | Portfólio";
    const description =
      loaderData.meta_description ??
      "Conheça um modelo profissional de landing page para clínicas odontológicas.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "article" },
        { property: "og:url", content: CANONICAL },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      links: [{ rel: "canonical", href: CANONICAL }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CreativeWork",
            name: "Modelo de site para clínica odontológica",
            description,
            url: CANONICAL,
            genre: "Demonstração de landing page",
          }),
        },
      ],
    };
  },
  notFoundComponent: () => <ModeloIndisponivel />,
  errorComponent: () => <ModeloIndisponivel />,
  component: ModeloClinicaPage,
});

function ModeloIndisponivel() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-24 text-center">
      <h1 className="text-2xl font-bold text-brand">Modelo indisponível</h1>
      <p className="mt-3 text-muted-foreground">
        Este modelo pode estar em rascunho ou ter sido removido.
      </p>
      <Link to="/portfolio" className="mt-6 inline-block text-primary underline">
        Voltar ao portfólio
      </Link>
    </div>
  );
}

function ModeloClinicaPage() {
  const { data: site } = useSuspenseQuery(demoSiteQuery(SLUG));
  const { data: content } = useSuspenseQuery(siteContentQuery);

  if (!site) return <ModeloIndisponivel />;

  return <DemoClinicSite site={site} agencyWhatsapp={content.settings?.whatsapp ?? null} />;
}
