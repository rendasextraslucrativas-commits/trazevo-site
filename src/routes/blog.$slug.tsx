import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";

import { Badge } from "@/components/ui/badge";
import { ArticleBody } from "@/components/site/showcase";
import { FinalCta } from "@/components/site/sections";
import { PageHeader, SiteShell } from "@/components/site/site-shell";
import { blogPostQuery, siteContentQuery } from "@/lib/site-content.queries";

export const Route = createFileRoute("/blog/$slug")({
  loader: async ({ context, params }) => {
    const [, post] = await Promise.all([
      context.queryClient.ensureQueryData(siteContentQuery),
      context.queryClient.ensureQueryData(blogPostQuery(params.slug)),
    ]);
    if (!post) throw notFound();
    return {
      title: post.meta_title ?? post.title,
      description: post.meta_description ?? post.excerpt ?? "",
    };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Artigo indisponível" }, { name: "robots", content: "noindex" }] };
    }
    return {
      meta: [
        { title: loaderData.title },
        { name: "description", content: loaderData.description },
        { property: "og:title", content: loaderData.title },
        { property: "og:description", content: loaderData.description },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  notFoundComponent: () => <NotFoundPost />,
  errorComponent: () => <NotFoundPost />,
  component: PostPage,
});

function NotFoundPost() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-24 text-center">
      <h1 className="text-2xl font-bold text-brand">Artigo não encontrado</h1>
      <p className="mt-3 text-muted-foreground">Este conteúdo não está publicado.</p>
      <Link to="/blog" className="mt-6 inline-block text-primary underline">
        Voltar ao blog
      </Link>
    </div>
  );
}

function PostPage() {
  const { slug } = Route.useParams();
  const { data: content } = useSuspenseQuery(siteContentQuery);
  const { data: post } = useSuspenseQuery(blogPostQuery(slug));

  if (!post) return <NotFoundPost />;

  return (
    <SiteShell settings={content.settings}>
      <PageHeader
        eyebrow={
          post.published_at
            ? new Date(post.published_at).toLocaleDateString("pt-BR", {
                day: "2-digit",
                month: "long",
                year: "numeric",
              })
            : "Blog"
        }
        title={post.title}
        subtitle={post.excerpt}
      />
      <article className="mx-auto max-w-3xl px-4 py-16">
        {post.cover_url ? (
          <img
            src={post.cover_url}
            alt={`Imagem do artigo ${post.title}`}
            className="mb-10 w-full rounded-xl border border-border object-cover"
          />
        ) : null}
        <ArticleBody content={post.content} />
        <div className="mt-10 flex flex-wrap items-center gap-2">
          {post.tags.map((tag) => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
          {post.author_name ? (
            <span className="text-sm text-muted-foreground">Por {post.author_name}</span>
          ) : null}
        </div>
      </article>
      <FinalCta
        settings={content.settings}
        title="Quer aplicar isso na sua página?"
        subtitle="Solicite um orçamento e cuidamos da execução."
      />
    </SiteShell>
  );
}
