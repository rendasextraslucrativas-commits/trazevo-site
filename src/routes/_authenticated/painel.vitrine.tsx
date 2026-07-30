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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { adminShowcaseQuery } from "@/lib/admin.queries";
import {
  deletePortfolioItem,
  deleteTestimonial,
  savePortfolioItem,
  saveTestimonial,
} from "@/lib/admin.functions";
import type { PortfolioInput, TestimonialInput } from "@/lib/admin.schemas";
import type { PortfolioItem, Testimonial } from "@/lib/site-content.types";

export const Route = createFileRoute("/_authenticated/painel/vitrine")({
  component: VitrinePage,
});

const emptyTestimonial: TestimonialInput = {
  author_name: "",
  author_role: "",
  company: "",
  quote: "",
  rating: 5,
  avatar_url: "",
  is_demo: true,
  sort_order: 0,
  is_visible: true,
};

const emptyCase: PortfolioInput = {
  slug: "",
  title: "",
  niche: "",
  summary: "",
  challenge: "",
  solution: "",
  result: "",
  cover_url: "",
  tags: [],
  is_demo: true,
  sort_order: 0,
  is_published: true,
};

function VitrinePage() {
  const { data } = useSuspenseQuery(adminShowcaseQuery);
  const queryClient = useQueryClient();
  const invalidate = () => {
    queryClient.invalidateQueries({ queryKey: ["admin", "showcase"] });
    queryClient.invalidateQueries({ queryKey: ["site-content"] });
    queryClient.invalidateQueries({ queryKey: ["portfolio"] });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-brand">Vitrine</h1>
        <p className="text-sm text-muted-foreground">
          Depoimentos e cases demonstrativos exibidos na home e na página de portfólio.
        </p>
      </div>

      <Tabs defaultValue="depoimentos">
        <TabsList>
          <TabsTrigger value="depoimentos">Depoimentos</TabsTrigger>
          <TabsTrigger value="portfolio">Portfólio</TabsTrigger>
        </TabsList>
        <TabsContent value="depoimentos" className="pt-4">
          <TestimonialsAdmin items={data.testimonials} onSaved={invalidate} />
        </TabsContent>
        <TabsContent value="portfolio" className="pt-4">
          <PortfolioAdmin items={data.portfolio} onSaved={invalidate} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

function TestimonialsAdmin({
  items,
  onSaved,
}: {
  items: Testimonial[];
  onSaved: () => void;
}) {
  const [draft, setDraft] = useState<TestimonialInput | null>(null);
  const save = useServerFn(saveTestimonial);
  const remove = useServerFn(deleteTestimonial);

  const saveMutation = useMutation({
    mutationFn: (input: TestimonialInput) => save({ data: input }),
    onSuccess: () => {
      toast.success("Depoimento salvo.");
      setDraft(null);
      onSaved();
    },
    onError: () => toast.error("Confira os campos e tente novamente."),
  });

  const removeMutation = useMutation({
    mutationFn: (id: string) => remove({ data: { id } }),
    onSuccess: () => {
      toast.success("Depoimento excluído.");
      onSaved();
    },
    onError: () => toast.error("Não foi possível excluir."),
  });

  return (
    <div className="space-y-4">
      <Button onClick={() => setDraft({ ...emptyTestimonial, sort_order: items.length + 1 })}>
        <Plus className="mr-2 h-4 w-4" aria-hidden />
        Novo depoimento
      </Button>

      {draft ? (
        <Card>
          <CardContent className="grid gap-4 p-5 sm:grid-cols-2">
            <div className="grid gap-2">
              <Label htmlFor="t-name">Nome</Label>
              <Input
                id="t-name"
                value={draft.author_name}
                onChange={(e) => setDraft({ ...draft, author_name: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="t-role">Cargo</Label>
              <Input
                id="t-role"
                value={draft.author_role ?? ""}
                onChange={(e) => setDraft({ ...draft, author_role: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="t-company">Empresa</Label>
              <Input
                id="t-company"
                value={draft.company ?? ""}
                onChange={(e) => setDraft({ ...draft, company: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="t-rating">Nota (1 a 5)</Label>
              <Input
                id="t-rating"
                type="number"
                min={1}
                max={5}
                value={draft.rating}
                onChange={(e) => setDraft({ ...draft, rating: Number(e.target.value) })}
              />
            </div>
            <div className="grid gap-2 sm:col-span-2">
              <Label htmlFor="t-quote">Depoimento</Label>
              <Textarea
                id="t-quote"
                rows={3}
                value={draft.quote}
                onChange={(e) => setDraft({ ...draft, quote: e.target.value })}
              />
            </div>
            <div className="grid gap-2 sm:col-span-2">
              <Label htmlFor="t-avatar">Foto (referência da mídia ou URL)</Label>
              <Input
                id="t-avatar"
                placeholder="storage:arquivo.jpg"
                value={draft.avatar_url ?? ""}
                onChange={(e) => setDraft({ ...draft, avatar_url: e.target.value })}
              />
            </div>
            <div className="flex items-center gap-3">
              <Switch
                id="t-visible"
                checked={draft.is_visible}
                onCheckedChange={(v) => setDraft({ ...draft, is_visible: v })}
              />
              <Label htmlFor="t-visible">Visível no site</Label>
            </div>
            <div className="flex items-center gap-3">
              <Switch
                id="t-demo"
                checked={draft.is_demo}
                onCheckedChange={(v) => setDraft({ ...draft, is_demo: v })}
              />
              <Label htmlFor="t-demo">Conteúdo demonstrativo</Label>
            </div>
            <div className="flex gap-2 sm:col-span-2">
              <Button
                onClick={() => saveMutation.mutate(draft)}
                disabled={saveMutation.isPending}
              >
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
        {items.map((item) => (
          <Card key={item.id}>
            <CardContent className="flex flex-wrap items-center gap-3 p-4">
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-foreground">
                  {item.author_name}
                  {item.is_visible ? "" : " (oculto)"}
                </p>
                <p className="line-clamp-2 text-xs text-muted-foreground">{item.quote}</p>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() =>
                  setDraft({
                    id: item.id,
                    author_name: item.author_name,
                    author_role: item.author_role ?? "",
                    company: item.company ?? "",
                    quote: item.quote,
                    rating: item.rating,
                    avatar_url: item.avatar_url ?? "",
                    is_demo: item.is_demo,
                    sort_order: item.sort_order,
                    is_visible: item.is_visible,
                  })
                }
              >
                Editar
              </Button>
              <Button
                size="sm"
                variant="ghost"
                aria-label={`Excluir depoimento de ${item.author_name}`}
                onClick={() => removeMutation.mutate(item.id)}
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

function PortfolioAdmin({ items, onSaved }: { items: PortfolioItem[]; onSaved: () => void }) {
  const [draft, setDraft] = useState<PortfolioInput | null>(null);
  const save = useServerFn(savePortfolioItem);
  const remove = useServerFn(deletePortfolioItem);

  const saveMutation = useMutation({
    mutationFn: (input: PortfolioInput) => save({ data: input }),
    onSuccess: () => {
      toast.success("Case salvo.");
      setDraft(null);
      onSaved();
    },
    onError: (error: Error) => toast.error(error.message || "Confira os campos."),
  });

  const removeMutation = useMutation({
    mutationFn: (id: string) => remove({ data: { id } }),
    onSuccess: () => {
      toast.success("Case excluído.");
      onSaved();
    },
    onError: () => toast.error("Não foi possível excluir."),
  });

  return (
    <div className="space-y-4">
      <Button onClick={() => setDraft({ ...emptyCase, sort_order: items.length + 1 })}>
        <Plus className="mr-2 h-4 w-4" aria-hidden />
        Novo case
      </Button>

      {draft ? (
        <Card>
          <CardContent className="grid gap-4 p-5 sm:grid-cols-2">
            <div className="grid gap-2">
              <Label htmlFor="p-title">Título</Label>
              <Input
                id="p-title"
                value={draft.title}
                onChange={(e) => setDraft({ ...draft, title: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="p-slug">Endereço (slug)</Label>
              <Input
                id="p-slug"
                placeholder="clinica-odontologica"
                value={draft.slug}
                onChange={(e) => setDraft({ ...draft, slug: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="p-niche">Nicho</Label>
              <Input
                id="p-niche"
                value={draft.niche}
                onChange={(e) => setDraft({ ...draft, niche: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="p-cover">Capa (referência da mídia ou URL)</Label>
              <Input
                id="p-cover"
                placeholder="storage:arquivo.jpg"
                value={draft.cover_url ?? ""}
                onChange={(e) => setDraft({ ...draft, cover_url: e.target.value })}
              />
            </div>
            <div className="grid gap-2 sm:col-span-2">
              <Label htmlFor="p-summary">Resumo</Label>
              <Textarea
                id="p-summary"
                rows={2}
                value={draft.summary ?? ""}
                onChange={(e) => setDraft({ ...draft, summary: e.target.value })}
              />
            </div>
            {(
              [
                ["challenge", "Desafio"],
                ["solution", "Solução"],
                ["result", "Resultado"],
              ] as const
            ).map(([key, label]) => (
              <div className="grid gap-2 sm:col-span-2" key={key}>
                <Label htmlFor={`p-${key}`}>{label}</Label>
                <Textarea
                  id={`p-${key}`}
                  rows={3}
                  value={draft[key] ?? ""}
                  onChange={(e) => setDraft({ ...draft, [key]: e.target.value })}
                />
              </div>
            ))}
            <div className="grid gap-2 sm:col-span-2">
              <Label htmlFor="p-tags">Marcadores (separados por vírgula)</Label>
              <Input
                id="p-tags"
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
                id="p-published"
                checked={draft.is_published}
                onCheckedChange={(v) => setDraft({ ...draft, is_published: v })}
              />
              <Label htmlFor="p-published">Publicado</Label>
            </div>
            <div className="flex items-center gap-3">
              <Switch
                id="p-demo"
                checked={draft.is_demo}
                onCheckedChange={(v) => setDraft({ ...draft, is_demo: v })}
              />
              <Label htmlFor="p-demo">Conteúdo demonstrativo</Label>
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
        {items.map((item) => (
          <Card key={item.id}>
            <CardContent className="flex flex-wrap items-center gap-3 p-4">
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-foreground">
                  {item.title}
                  {item.is_published ? "" : " (rascunho)"}
                </p>
                <p className="text-xs text-muted-foreground">
                  /portfolio/{item.slug} · {item.niche}
                </p>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() =>
                  setDraft({
                    id: item.id,
                    slug: item.slug,
                    title: item.title,
                    niche: item.niche,
                    summary: item.summary ?? "",
                    challenge: item.challenge ?? "",
                    solution: item.solution ?? "",
                    result: item.result ?? "",
                    cover_url: item.cover_url ?? "",
                    tags: item.tags,
                    is_demo: item.is_demo,
                    sort_order: item.sort_order,
                    is_published: item.is_published,
                  })
                }
              >
                Editar
              </Button>
              <Button
                size="sm"
                variant="ghost"
                aria-label={`Excluir case ${item.title}`}
                onClick={() => removeMutation.mutate(item.id)}
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
