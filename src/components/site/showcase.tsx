import { Link } from "@tanstack/react-router";
import { Quote, Star } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import type { BlogPostSummary, PortfolioItem, Testimonial } from "@/lib/site-content.types";

export function TestimonialsGrid({ testimonials }: { testimonials: Testimonial[] }) {
  if (testimonials.length === 0) return null;
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {testimonials.map((item) => (
        <Card key={item.id} className="h-full">
          <CardContent className="flex h-full flex-col gap-4 p-6">
            <Quote className="h-5 w-5 text-primary" aria-hidden />
            <p className="flex-1 text-sm leading-relaxed text-muted-foreground">“{item.quote}”</p>
            <div
              className="flex items-center gap-1"
              aria-label={`Avaliação ${item.rating} de 5`}
              role="img"
            >
              {Array.from({ length: 5 }).map((_, index) => (
                <Star
                  key={index}
                  className={
                    index < item.rating ? "h-3.5 w-3.5 fill-primary text-primary" : "h-3.5 w-3.5 text-border"
                  }
                  aria-hidden
                />
              ))}
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">{item.author_name}</p>
              <p className="text-xs text-muted-foreground">
                {[item.author_role, item.company].filter(Boolean).join(" · ")}
              </p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export function PortfolioGrid({ items }: { items: PortfolioItem[] }) {
  if (items.length === 0) {
    return <p className="text-sm text-muted-foreground">Nenhum case publicado ainda.</p>;
  }
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <Link
          key={item.id}
          to="/portfolio/$slug"
          params={{ slug: item.slug }}
          className="group rounded-xl border border-border bg-card transition-shadow hover:shadow-md"
        >
          <div className="aspect-[16/10] overflow-hidden rounded-t-xl bg-surface">
            {item.cover_url ? (
              <img
                src={item.cover_url}
                alt={`Capa do case ${item.title}`}
                loading="lazy"
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="grid h-full place-items-center text-xs uppercase tracking-widest text-muted-foreground">
                {item.niche}
              </div>
            )}
          </div>
          <div className="space-y-2 p-5">
            <Badge variant="secondary">{item.niche}</Badge>
            <h3 className="text-base font-semibold text-foreground group-hover:text-primary">
              {item.title}
            </h3>
            <p className="line-clamp-3 text-sm text-muted-foreground">{item.summary}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}

export function PostGrid({ posts }: { posts: BlogPostSummary[] }) {
  if (posts.length === 0) {
    return <p className="text-sm text-muted-foreground">Nenhum artigo publicado ainda.</p>;
  }
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => (
        <Link
          key={post.id}
          to="/blog/$slug"
          params={{ slug: post.slug }}
          className="group flex flex-col rounded-xl border border-border bg-card p-5 transition-shadow hover:shadow-md"
        >
          <p className="text-xs uppercase tracking-widest text-muted-foreground">
            {post.published_at
              ? new Date(post.published_at).toLocaleDateString("pt-BR", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                })
              : "Rascunho"}
          </p>
          <h3 className="mt-2 text-base font-semibold text-foreground group-hover:text-primary">
            {post.title}
          </h3>
          <p className="mt-2 line-clamp-3 flex-1 text-sm text-muted-foreground">{post.excerpt}</p>
          <span className="mt-4 text-sm font-medium text-primary">Ler artigo →</span>
        </Link>
      ))}
    </div>
  );
}

export function ArticleBody({ content }: { content: string }) {
  const blocks = content.split(/\n{2,}/).filter(Boolean);
  return (
    <div className="space-y-4">
      {blocks.map((block, index) =>
        block.startsWith("## ") ? (
          <h2 key={index} className="pt-4 text-xl font-semibold text-foreground">
            {block.replace("## ", "")}
          </h2>
        ) : (
          <p key={index} className="whitespace-pre-line text-base leading-relaxed text-muted-foreground">
            {block}
          </p>
        ),
      )}
    </div>
  );
}
