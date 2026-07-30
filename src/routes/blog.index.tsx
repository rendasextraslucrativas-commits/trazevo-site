import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";

import { FinalCta } from "@/components/site/sections";
import { PostGrid } from "@/components/site/showcase";
import { PageHeader, SiteShell } from "@/components/site/site-shell";
import { blogPostsQuery, siteContentQuery } from "@/lib/site-content.queries";

export const Route = createFileRoute("/blog/")({
  loader: ({ context }) =>
    Promise.all([
      context.queryClient.ensureQueryData(siteContentQuery),
      context.queryClient.ensureQueryData(blogPostsQuery),
    ]),
  head: () => ({
    meta: [
      { title: "Blog sobre landing pages, conversão e SEO" },
      {
        name: "description",
        content:
          "Artigos práticos sobre estrutura de landing pages, formulários que convertem, desempenho e otimização para buscadores.",
      },
      { property: "og:title", content: "Blog da agência de landing pages" },
      {
        property: "og:description",
        content: "Conteúdos sobre conversão, SEO e boas práticas para páginas de venda.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: BlogPage,
});

function BlogPage() {
  const { data: content } = useSuspenseQuery(siteContentQuery);
  const { data: posts } = useSuspenseQuery(blogPostsQuery);

  return (
    <SiteShell settings={content.settings}>
      <PageHeader
        eyebrow="Blog"
        title="Conteúdos sobre páginas que convertem"
        subtitle="Guias curtos sobre estrutura, formulários, desempenho e otimização para buscadores."
      />
      <section className="mx-auto max-w-6xl px-4 py-16">
        <PostGrid posts={posts} />
      </section>
      <FinalCta
        settings={content.settings}
        title="Precisa de ajuda para aplicar isso?"
        subtitle="Fazemos a página inteira para você, do texto à publicação."
      />
    </SiteShell>
  );
}
