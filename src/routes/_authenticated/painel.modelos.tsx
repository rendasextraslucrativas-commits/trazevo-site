import { useEffect, useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { createFileRoute } from "@tanstack/react-router";
import { useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { Copy, ExternalLink, Save, Trash2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { demoSitesQuery } from "@/lib/demo-admin.queries";
import {
  deleteDemoSite,
  duplicateDemoSite,
  saveDemoSite,
} from "@/lib/demo-admin.functions";

export const Route = createFileRoute("/_authenticated/painel/modelos")({
  loader: ({ context }) => context.queryClient.ensureQueryData(demoSitesQuery),
  component: PainelModelos,
});

type Draft = {
  id: string;
  slug: string;
  name: string;
  niche: string;
  cover_url: string;
  is_published: boolean;
  is_highlighted: boolean;
  sort_order: number;
  tags: string;
  meta_title: string;
  meta_description: string;
  theme: string;
  content: string;
};

function PainelModelos() {
  const { data: sites } = useSuspenseQuery(demoSitesQuery);
  const queryClient = useQueryClient();
  const save = useServerFn(saveDemoSite);
  const duplicate = useServerFn(duplicateDemoSite);
  const remove = useServerFn(deleteDemoSite);

  const [selectedId, setSelectedId] = useState(sites[0]?.id ?? "");
  const selected = useMemo(
    () => sites.find((s) => s.id === selectedId) ?? sites[0] ?? null,
    [sites, selectedId],
  );
  const [draft, setDraft] = useState<Draft | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!selected) {
      setDraft(null);
      return;
    }
    setDraft({
      id: selected.id,
      slug: selected.slug,
      name: selected.name,
      niche: selected.niche,
      cover_url: selected.cover_url ?? "",
      is_published: selected.is_published,
      is_highlighted: selected.is_highlighted,
      sort_order: selected.sort_order,
      tags: (selected.tags ?? []).join(", "),
      meta_title: selected.meta_title ?? "",
      meta_description: selected.meta_description ?? "",
      theme: JSON.stringify(selected.theme ?? {}, null, 2),
      content: JSON.stringify(selected.content ?? {}, null, 2),
    });
  }, [selected]);

  const contentObject = useMemo(() => {
    if (!draft) return null;
    try {
      return JSON.parse(draft.content) as Record<string, any>;
    } catch {
      return null;
    }
  }, [draft]);

  function patchContent(mutate: (value: Record<string, any>) => void) {
    if (!draft || !contentObject) return;
    const next = structuredClone(contentObject);
    mutate(next);
    setDraft({ ...draft, content: JSON.stringify(next, null, 2) });
  }

  async function handleSave() {
    if (!draft) return;
    let theme: unknown;
    let content: unknown;
    try {
      theme = JSON.parse(draft.theme);
      content = JSON.parse(draft.content);
    } catch {
      toast.error("Conteúdo ou paleta com formato inválido.");
      return;
    }
    setSaving(true);
    try {
      await save({
        data: {
          id: draft.id,
          slug: draft.slug,
          name: draft.name,
          niche: draft.niche,
          cover_url: draft.cover_url || null,
          is_published: draft.is_published,
          is_highlighted: draft.is_highlighted,
          sort_order: Number(draft.sort_order) || 0,
          tags: draft.tags
            .split(",")
            .map((t) => t.trim())
            .filter(Boolean),
          meta_title: draft.meta_title || null,
          meta_description: draft.meta_description || null,
          theme: theme as Record<string, unknown>,
          content: content as Record<string, unknown>,
        },
      });
      await queryClient.invalidateQueries({ queryKey: ["admin", "demo-sites"] });
      await queryClient.invalidateQueries({ queryKey: ["demo-site"] });
      toast.success("Modelo salvo.");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Não foi possível salvar.");
    } finally {
      setSaving(false);
    }
  }

  async function handleDuplicate() {
    if (!draft) return;
    const name = window.prompt("Nome do novo projeto", `${draft.name} — cópia`);
    if (!name) return;
    const slug = window.prompt("Slug da nova rota (letras minúsculas e hífen)", `${draft.slug}-copia`);
    if (!slug) return;
    try {
      const result = await duplicate({ data: { id: draft.id, name, slug } });
      await queryClient.invalidateQueries({ queryKey: ["admin", "demo-sites"] });
      setSelectedId(result.id);
      toast.success("Cópia criada como rascunho. O modelo mestre permanece intacto.");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Não foi possível duplicar.");
    }
  }

  async function handleDelete() {
    if (!draft) return;
    if (!window.confirm("Excluir este modelo? A ação não pode ser desfeita.")) return;
    try {
      await remove({ data: { id: draft.id } });
      await queryClient.invalidateQueries({ queryKey: ["admin", "demo-sites"] });
      setSelectedId("");
      toast.success("Modelo excluído.");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Não foi possível excluir.");
    }
  }

  if (!draft) {
    return (
      <div className="rounded-xl border border-border bg-card p-8 text-center text-muted-foreground">
        Nenhum modelo demonstrativo cadastrado.
      </div>
    );
  }

  const sectionKeys: { key: string; label: string }[] = [
    { key: "hero", label: "Hero" },
    { key: "specialties", label: "Tratamentos" },
    { key: "differentials", label: "Diferenciais" },
    { key: "about", label: "Sobre" },
    { key: "steps", label: "Como funciona" },
    { key: "gallery", label: "Estrutura" },
    { key: "team", label: "Equipe" },
    { key: "commitments", label: "Compromissos" },
    { key: "faq", label: "Dúvidas" },
    { key: "form", label: "Formulário" },
    { key: "final_cta", label: "Chamada final" },
  ];

  return (
    <div className="space-y-6">
      <header className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 sm:flex sm:justify-between">
        <div className="min-w-0">
          <h1 className="truncate text-xl font-bold text-foreground">Modelos demonstrativos</h1>
          <p className="text-sm text-muted-foreground">
            Mini sites de portfólio editáveis, publicáveis e duplicáveis.
          </p>
        </div>
        <div className="flex shrink-0 gap-2">
          <Button variant="outline" onClick={handleDuplicate}>
            <Copy className="mr-2 h-4 w-4" /> Duplicar
          </Button>
          <Button onClick={handleSave} disabled={saving}>
            <Save className="mr-2 h-4 w-4" /> {saving ? "Salvando..." : "Salvar"}
          </Button>
        </div>
      </header>

      <div className="flex flex-wrap gap-2">
        {sites.map((site) => (
          <Button
            key={site.id}
            size="sm"
            variant={site.id === draft.id ? "default" : "outline"}
            onClick={() => setSelectedId(site.id)}
          >
            {site.name}
            {site.is_master ? " (mestre)" : ""}
            {!site.is_published ? " · rascunho" : ""}
          </Button>
        ))}
      </div>

      <Tabs defaultValue="geral">
        <TabsList className="flex-wrap">
          <TabsTrigger value="geral">Geral e SEO</TabsTrigger>
          <TabsTrigger value="visual">Visual</TabsTrigger>
          <TabsTrigger value="secoes">Seções</TabsTrigger>
          <TabsTrigger value="conteudo">Conteúdo completo</TabsTrigger>
        </TabsList>

        <TabsContent value="geral" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Identificação</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4 sm:grid-cols-2">
              <Field label="Nome do modelo">
                <Input value={draft.name} onChange={(e) => setDraft({ ...draft, name: e.target.value })} />
              </Field>
              <Field label="Categoria / nicho">
                <Input value={draft.niche} onChange={(e) => setDraft({ ...draft, niche: e.target.value })} />
              </Field>
              <Field label="Slug (rota)">
                <Input value={draft.slug} onChange={(e) => setDraft({ ...draft, slug: e.target.value })} />
              </Field>
              <Field label="Imagem de capa (URL ou storage:caminho)">
                <Input
                  value={draft.cover_url}
                  onChange={(e) => setDraft({ ...draft, cover_url: e.target.value })}
                />
              </Field>
              <Field label="Ordem de exibição">
                <Input
                  type="number"
                  value={draft.sort_order}
                  onChange={(e) => setDraft({ ...draft, sort_order: Number(e.target.value) })}
                />
              </Field>
              <Field label="Tags (separadas por vírgula)">
                <Input value={draft.tags} onChange={(e) => setDraft({ ...draft, tags: e.target.value })} />
              </Field>
              <Field label="Meta title">
                <Input
                  value={draft.meta_title}
                  onChange={(e) => setDraft({ ...draft, meta_title: e.target.value })}
                />
              </Field>
              <Field label="Meta description">
                <Textarea
                  rows={3}
                  value={draft.meta_description}
                  onChange={(e) => setDraft({ ...draft, meta_description: e.target.value })}
                />
              </Field>
              <div className="flex items-center justify-between rounded-lg border border-border p-3">
                <span className="text-sm">Publicado</span>
                <Switch
                  checked={draft.is_published}
                  onCheckedChange={(v) => setDraft({ ...draft, is_published: v })}
                />
              </div>
              <div className="flex items-center justify-between rounded-lg border border-border p-3">
                <span className="text-sm">Destaque</span>
                <Switch
                  checked={draft.is_highlighted}
                  onCheckedChange={(v) => setDraft({ ...draft, is_highlighted: v })}
                />
              </div>
              <div className="sm:col-span-2 flex flex-wrap gap-2">
                <Button asChild variant="outline">
                  <Link to="/portfolio/clinica-odontologica" target="_blank">
                    <ExternalLink className="mr-2 h-4 w-4" /> Visualizar modelo
                  </Link>
                </Button>
                {!selected?.is_master ? (
                  <Button variant="destructive" onClick={handleDelete}>
                    <Trash2 className="mr-2 h-4 w-4" /> Excluir
                  </Button>
                ) : (
                  <p className="self-center text-xs text-muted-foreground">
                    Modelo mestre protegido contra exclusão.
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="visual" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Paleta e tipografia</CardTitle>
            </CardHeader>
            <CardContent>
              <Label className="text-sm">JSON de tema (cores e fonte)</Label>
              <Textarea
                rows={10}
                className="mt-2 font-mono text-xs"
                value={draft.theme}
                onChange={(e) => setDraft({ ...draft, theme: e.target.value })}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="secoes" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Visibilidade das seções</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-3 sm:grid-cols-2">
              {contentObject ? (
                sectionKeys.map((section) => (
                  <div
                    key={section.key}
                    className="flex items-center justify-between rounded-lg border border-border p-3"
                  >
                    <span className="text-sm">{section.label}</span>
                    <Switch
                      checked={contentObject[section.key]?.visible !== false}
                      onCheckedChange={(v) =>
                        patchContent((next) => {
                          next[section.key] = { ...(next[section.key] ?? {}), visible: v };
                        })
                      }
                    />
                  </div>
                ))
              ) : (
                <p className="text-sm text-destructive">
                  Corrija o JSON de conteúdo para editar as seções.
                </p>
              )}
              {contentObject ? (
                <div className="flex items-center justify-between rounded-lg border border-border p-3">
                  <span className="text-sm">Botão flutuante de WhatsApp</span>
                  <Switch
                    checked={contentObject.whatsapp?.enabled !== false}
                    onCheckedChange={(v) =>
                      patchContent((next) => {
                        next.whatsapp = { ...(next.whatsapp ?? {}), enabled: v };
                      })
                    }
                  />
                </div>
              ) : null}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="conteudo" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Conteúdo completo do mini site</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-3 text-sm text-muted-foreground">
                Edite textos, tratamentos, diferenciais, etapas, galeria, equipe, compromissos,
                dúvidas, formulário, rodapé e avisos legais.
              </p>
              <Textarea
                rows={26}
                className="font-mono text-xs"
                value={draft.content}
                onChange={(e) => setDraft({ ...draft, content: e.target.value })}
              />
              {!contentObject ? (
                <p className="mt-2 text-sm text-destructive">JSON inválido.</p>
              ) : null}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid gap-2">
      <Label className="text-sm">{label}</Label>
      {children}
    </div>
  );
}
