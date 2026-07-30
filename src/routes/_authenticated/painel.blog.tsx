import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { adminShowcaseQuery } from "@/lib/admin.queries";
import { deleteBlogPost, saveBlogPost } from "@/lib/admin.functions";
import type { BlogPostInput } from "@/lib/admin.schemas";

export const Route = createFileRoute("/_authenticated/painel/blog")({
  component: BlogAdminPage,
});

const emptyPost: BlogPostInput = {
  slug: "",
  title: "",
  excerpt: "",
  content: "",
  cover_url: "",
  tags: [],
  author_name: "",
  meta_title: "",
  meta_description: "",
  is_published: false,
};

function slugify(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 100);
}

function BlogAdminPage() {
  const { data } = useSuspenseQuery(adminShowcaseQuery);
  const queryClient = useQueryClient();
  const [draft, setDraft] = useState<BlogPostInput | null>(null);
  const save = useServerFn(saveBlogPost);
  const remove = useServerFn(deleteBlogPost);

  const invalidate = () => {
    queryClient.invalidateQueries({ queryKey: ["admin", "showcase"] });
    queryClient.invalidateQueries({ queryKey: ["blog"] });
  };

  const saveMutation = useMutation({
    mutationFn: (input: BlogPostInput) => save({ data: input }),
    onSuccess: () => {
      toast.success("Artigo salvo.");
      setDraft(null);
      invalidate();
    },
    onError: (error: Error) => toast.error(error.message || "Confira os campos."),
  });

  const removeMutation = useMutation({
    mutationFn: (id: string) => remove({ data: { id } }),
    onSuccess: () => {
      toast.success("Artigo excluído.");
      invalidate();
    },
    onError: () => toast.error("Não foi possível excluir o artigo."),
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-brand">Blog</h1>
        <p className="text-sm text-muted-foreground">
          Escreva artigos, defina o endereço e os dados para buscadores. Use “## ” para subtítulos.
        </p>
      </div>

      <Button onClick={() => setDraft({ ...emptyPost })}>
        <Plus className="mr-2 h-4 w-4" aria-hidden />
        Novo artigo
      </Button>

      {draft ? (
        <Card>
          <CardContent className="grid gap-4 p-5 sm:grid-cols-2">
            <div className="grid gap-2">
              <Label htmlFor="b-title">Título</Label>
              <Input
                id="b-title"
                value={draft.title}
                onChange={(e) =>
                  setDraft({
                    ...draft,
                    title: e.target.value,
                    slug: draft.id ? draft.slug : slugify(e.target.value),
                  })
                }
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="b-slug">Endereço (slug)</Label>
              <Input
                id="b-slug"
                value={draft.slug}
                onChange={(e) => setDraft({ ...draft, slug: e.target.value })}
              />
            </div>
            <div className="grid gap-2 sm:col-span-2">
              <Label htmlFor="b-excerpt">Resumo</Label>
              <Textarea
                id="b-excerpt"
                rows={2}
                value={draft.excerpt ?? ""}
                onChange={(e) => setDraft({ ...draft, excerpt: e.target.value })}
              />
            </div>
            <div className="grid gap-2 sm:col-span-2">
              <Label htmlFor="b-content">Conteúdo</Label>
              <Textarea
                id="b-content"
                rows={14}
                value={draft.content}
                onChange={(e) => setDraft({ ...draft, content: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="b-cover">Capa (referência da mídia ou URL)</Label>
              <Input
                id="b-cover"
                placeholder="storage:arquivo.jpg"
                value={draft.cover_url ?? ""}
                onChange={(e) => setDraft({ ...draft, cover_url: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="b-author">Autor</Label>
              <Input
                id="b-author"
                value={draft.author_name ?? ""}
                onChange={(e) => setDraft({ ...draft, author_name: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="b-metatitle">Título para buscadores</Label>
              <Input
                id="b-metatitle"
                value={draft.meta_title ?? ""}
                onChange={(e) => setDraft({ ...draft, meta_title: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="b-metadesc">Descrição para buscadores</Label>
              <Input
                id="b-metadesc"
                value={draft.meta_description ?? ""}
                onChange={(e) => setDraft({ ...draft, meta_description: e.target.value })}
              />
            </div>
            <div className="grid gap-2 sm:col-span-2">
              <Label htmlFor="b-tags">Marcadores (separados por vírgula)</Label>
              <Input
                id="b-tags"
                value={draft.tags.join(", ")}
                onChange={(e) =>
                  setDraft({
                    ...draft,
                    tags: e.target.value
                      .split(",")
                      .map((t) => t.trim())
                      .filter(Boolean),
                  })
                }
              />
            </div>
            <div className="flex items-center gap-3">
              <Switch
                id="b-published"
                checked={draft.is_published}
                onCheckedChange={(v) => setDraft({ ...draft, is_published: v })}
              />
              <Label htmlFor="b-published">Publicado</Label>
            </div>
            <div className="flex gap-2 sm:col-span-2">
              <Button onClick={() => saveMutation.mutate(draft)} disabled={saveMutation.isPending}>
                Salvar
              </Button>
              <Button variant="ghost" onClick={() => setDraft(null)}>
                Cancelar
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : null}

      <div className="space-y-3">
        {data.posts.map((post) => (
          <Card key={post.id}>
            <CardContent className="flex flex-wrap items-center gap-3 p-4">
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-foreground">
                  {post.title}
                  {post.is_published ? "" : " (rascunho)"}
                </p>
                <p className="text-xs text-muted-foreground">/blog/{post.slug}</p>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() =>
                  setDraft({
                    id: post.id,
                    slug: post.slug,
                    title: post.title,
                    excerpt: post.excerpt ?? "",
                    content: post.content,
                    cover_url: post.cover_url ?? "",
                    tags: post.tags,
                    author_name: post.author_name ?? "",
                    meta_title: post.meta_title ?? "",
                    meta_description: post.meta_description ?? "",
                    is_published: post.is_published,
                  })
                }
              >
                Editar
              </Button>
              <Button
                size="sm"
                variant="ghost"
                aria-label={`Excluir artigo ${post.title}`}
                onClick={() => removeMutation.mutate(post.id)}
              >
                <Trash2 className="h-4 w-4 text-destructive" aria-hidden />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
