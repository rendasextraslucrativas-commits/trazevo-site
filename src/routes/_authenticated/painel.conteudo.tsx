import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { adminContentQuery } from "@/lib/admin.queries";
import {
  deleteBenefit,
  deleteFaq,
  saveBenefit,
  saveFaq,
  savePlan,
  saveSection,
  saveSettings,
} from "@/lib/admin.functions";

export const Route = createFileRoute("/_authenticated/painel/conteudo")({
  component: ConteudoPage,
});

function ConteudoPage() {
  const { data } = useSuspenseQuery(adminContentQuery);
  const queryClient = useQueryClient();
  const invalidate = () => {
    queryClient.invalidateQueries({ queryKey: ["admin", "content"] });
    queryClient.invalidateQueries({ queryKey: ["site-content"] });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-brand">Conteúdo do site</h1>
        <p className="text-sm text-muted-foreground">
          Tudo que você editar aqui é publicado imediatamente nas páginas públicas.
        </p>
      </div>

      <Tabs defaultValue="identidade">
        <TabsList className="flex-wrap">
          <TabsTrigger value="identidade">Identidade</TabsTrigger>
          <TabsTrigger value="secoes">Seções</TabsTrigger>
          <TabsTrigger value="beneficios">Benefícios</TabsTrigger>
          <TabsTrigger value="planos">Planos</TabsTrigger>
          <TabsTrigger value="faq">FAQ</TabsTrigger>
        </TabsList>

        <TabsContent value="identidade" className="pt-4">
          <SettingsForm settings={data.settings} onSaved={invalidate} />
        </TabsContent>
        <TabsContent value="secoes" className="pt-4">
          <SectionsForm sections={data.sections} onSaved={invalidate} />
        </TabsContent>
        <TabsContent value="beneficios" className="pt-4">
          <BenefitsForm benefits={data.benefits} onSaved={invalidate} />
        </TabsContent>
        <TabsContent value="planos" className="pt-4">
          <PlansForm plans={data.plans} onSaved={invalidate} />
        </TabsContent>
        <TabsContent value="faq" className="pt-4">
          <FaqForm faqs={data.faqs} onSaved={invalidate} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

function SettingsForm({
  settings,
  onSaved,
}: {
  settings: { [key: string]: unknown } | null;
  onSaved: () => void;
}) {
  const save = useServerFn(saveSettings);
  const [form, setForm] = useState(() => ({
    agency_name: String(settings?.agency_name ?? ""),
    slogan: String(settings?.slogan ?? ""),
    email: String(settings?.email ?? ""),
    whatsapp: String(settings?.whatsapp ?? ""),
    address: String(settings?.address ?? ""),
    instagram_url: String(settings?.instagram_url ?? ""),
    facebook_url: String(settings?.facebook_url ?? ""),
    linkedin_url: String(settings?.linkedin_url ?? ""),
    footer_description: String(settings?.footer_description ?? ""),
    meta_title: String(settings?.meta_title ?? ""),
    meta_description: String(settings?.meta_description ?? ""),
  }));

  const mutation = useMutation({
    mutationFn: () => save({ data: form }),
    onSuccess: () => {
      toast.success("Identidade atualizada.");
      onSaved();
    },
    onError: () => toast.error("Confira os campos e tente novamente."),
  });

  const field = (key: keyof typeof form, label: string, textarea = false) => (
    <div className="grid gap-2" key={key}>
      <Label htmlFor={key}>{label}</Label>
      {textarea ? (
        <Textarea
          id={key}
          rows={3}
          value={form[key]}
          onChange={(e) => setForm((p) => ({ ...p, [key]: e.target.value }))}
        />
      ) : (
        <Input
          id={key}
          value={form[key]}
          onChange={(e) => setForm((p) => ({ ...p, [key]: e.target.value }))}
        />
      )}
    </div>
  );

  return (
    <Card className="border-border">
      <CardContent className="grid gap-4 pt-6 sm:grid-cols-2">
        {field("agency_name", "Nome da agência")}
        {field("slogan", "Slogan")}
        {field("email", "E-mail de contato")}
        {field("whatsapp", "WhatsApp")}
        {field("address", "Endereço / cidade")}
        {field("instagram_url", "Instagram")}
        {field("facebook_url", "Facebook")}
        {field("linkedin_url", "LinkedIn")}
        {field("meta_title", "Título para buscadores")}
        {field("meta_description", "Descrição para buscadores")}
        <div className="sm:col-span-2">{field("footer_description", "Texto do rodapé", true)}</div>
        <div className="sm:col-span-2">
          <Button onClick={() => mutation.mutate()} disabled={mutation.isPending}>
            {mutation.isPending ? "Salvando..." : "Salvar identidade"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function SectionsForm({
  sections,
  onSaved,
}: {
  sections: Array<{
    id: string;
    slug: string;
    title: string | null;
    subtitle: string | null;
    is_visible: boolean;
  }>;
  onSaved: () => void;
}) {
  const save = useServerFn(saveSection);
  const [items, setItems] = useState(sections);

  const mutation = useMutation({
    mutationFn: (item: (typeof sections)[number]) =>
      save({
        data: {
          id: item.id,
          title: item.title ?? "",
          subtitle: item.subtitle ?? "",
          is_visible: item.is_visible,
        },
      }),
    onSuccess: () => {
      toast.success("Seção atualizada.");
      onSaved();
    },
    onError: () => toast.error("Não foi possível salvar a seção."),
  });

  return (
    <div className="grid gap-4">
      {items.map((section, index) => (
        <Card key={section.id} className="border-border">
          <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm uppercase tracking-wide text-muted-foreground">
              {section.slug}
            </CardTitle>
            <div className="flex items-center gap-2">
              <Label htmlFor={`vis-${section.id}`} className="text-xs">
                Visível
              </Label>
              <Switch
                id={`vis-${section.id}`}
                checked={section.is_visible}
                onCheckedChange={(value) =>
                  setItems((prev) =>
                    prev.map((s, i) => (i === index ? { ...s, is_visible: value } : s)),
                  )
                }
              />
            </div>
          </CardHeader>
          <CardContent className="grid gap-3">
            <Input
              value={section.title ?? ""}
              onChange={(e) =>
                setItems((prev) =>
                  prev.map((s, i) => (i === index ? { ...s, title: e.target.value } : s)),
                )
              }
            />
            <Textarea
              rows={2}
              value={section.subtitle ?? ""}
              onChange={(e) =>
                setItems((prev) =>
                  prev.map((s, i) => (i === index ? { ...s, subtitle: e.target.value } : s)),
                )
              }
            />
            <div>
              <Button size="sm" variant="outline" onClick={() => mutation.mutate(section)}>
                Salvar
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

function BenefitsForm({
  benefits,
  onSaved,
}: {
  benefits: Array<{
    id: string;
    icon: string;
    title: string;
    description: string | null;
    sort_order: number;
    is_visible: boolean;
  }>;
  onSaved: () => void;
}) {
  const save = useServerFn(saveBenefit);
  const remove = useServerFn(deleteBenefit);
  const [items, setItems] = useState(benefits);

  const saveMutation = useMutation({
    mutationFn: (item: (typeof benefits)[number]) =>
      save({
        data: {
          id: item.id,
          icon: item.icon,
          title: item.title,
          description: item.description ?? "",
          sort_order: item.sort_order,
          is_visible: item.is_visible,
        },
      }),
    onSuccess: () => {
      toast.success("Benefício salvo.");
      onSaved();
    },
    onError: () => toast.error("Não foi possível salvar."),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => remove({ data: { id } }),
    onSuccess: () => {
      toast.success("Benefício removido.");
      onSaved();
    },
    onError: () => toast.error("Não foi possível remover."),
  });

  const createMutation = useMutation({
    mutationFn: () =>
      save({
        data: {
          icon: "sparkles",
          title: "Novo benefício",
          description: "Descreva o benefício.",
          sort_order: items.length + 1,
          is_visible: true,
        },
      }),
    onSuccess: () => {
      toast.success("Benefício criado.");
      onSaved();
    },
    onError: () => toast.error("Não foi possível criar."),
  });

  return (
    <div className="grid gap-4">
      <div>
        <Button size="sm" onClick={() => createMutation.mutate()} disabled={createMutation.isPending}>
          <Plus className="mr-2 h-4 w-4" aria-hidden />
          Novo benefício
        </Button>
      </div>
      {items.map((item, index) => (
        <Card key={item.id} className="border-border">
          <CardContent className="grid gap-3 pt-6 sm:grid-cols-[160px_1fr]">
            <Input
              aria-label="Ícone"
              value={item.icon}
              onChange={(e) =>
                setItems((prev) => prev.map((b, i) => (i === index ? { ...b, icon: e.target.value } : b)))
              }
            />
            <Input
              aria-label="Título"
              value={item.title}
              onChange={(e) =>
                setItems((prev) => prev.map((b, i) => (i === index ? { ...b, title: e.target.value } : b)))
              }
            />
            <Textarea
              className="sm:col-span-2"
              rows={2}
              value={item.description ?? ""}
              onChange={(e) =>
                setItems((prev) =>
                  prev.map((b, i) => (i === index ? { ...b, description: e.target.value } : b)),
                )
              }
            />
            <div className="flex items-center gap-3 sm:col-span-2">
              <Switch
                checked={item.is_visible}
                onCheckedChange={(value) =>
                  setItems((prev) => prev.map((b, i) => (i === index ? { ...b, is_visible: value } : b)))
                }
              />
              <span className="text-xs text-muted-foreground">Visível no site</span>
              <Button size="sm" variant="outline" onClick={() => saveMutation.mutate(item)}>
                Salvar
              </Button>
              <Button
                size="sm"
                variant="ghost"
                className="text-destructive"
                onClick={() => deleteMutation.mutate(item.id)}
              >
                <Trash2 className="h-4 w-4" aria-hidden />
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

function PlansForm({
  plans,
  onSaved,
}: {
  plans: Array<{
    id: string;
    name: string;
    description: string | null;
    price: number | null;
    promo_price: number | null;
    show_price: boolean;
    is_highlighted: boolean;
    support_period: string | null;
    revisions: string | null;
    cta_label: string;
    is_visible: boolean;
  }>;
  onSaved: () => void;
}) {
  const save = useServerFn(savePlan);
  const [items, setItems] = useState(plans);

  const mutation = useMutation({
    mutationFn: (item: (typeof plans)[number]) =>
      save({
        data: {
          id: item.id,
          name: item.name,
          description: item.description ?? "",
          price: item.price,
          promo_price: item.promo_price,
          show_price: item.show_price,
          is_highlighted: item.is_highlighted,
          support_period: item.support_period ?? "",
          revisions: item.revisions ?? "",
          cta_label: item.cta_label,
          is_visible: item.is_visible,
        },
      }),
    onSuccess: () => {
      toast.success("Plano atualizado.");
      onSaved();
    },
    onError: () => toast.error("Não foi possível salvar o plano."),
  });

  const update = (index: number, patch: Partial<(typeof plans)[number]>) =>
    setItems((prev) => prev.map((p, i) => (i === index ? { ...p, ...patch } : p)));

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      {items.map((plan, index) => (
        <Card key={plan.id} className="border-border">
          <CardContent className="grid gap-3 pt-6">
            <Input value={plan.name} onChange={(e) => update(index, { name: e.target.value })} />
            <Textarea
              rows={2}
              value={plan.description ?? ""}
              onChange={(e) => update(index, { description: e.target.value })}
            />
            <div className="grid grid-cols-2 gap-3">
              <div className="grid gap-1">
                <Label className="text-xs">Preço</Label>
                <Input
                  type="number"
                  min={0}
                  value={plan.price ?? ""}
                  onChange={(e) =>
                    update(index, { price: e.target.value === "" ? null : Number(e.target.value) })
                  }
                />
              </div>
              <div className="grid gap-1">
                <Label className="text-xs">Preço promocional</Label>
                <Input
                  type="number"
                  min={0}
                  value={plan.promo_price ?? ""}
                  onChange={(e) =>
                    update(index, {
                      promo_price: e.target.value === "" ? null : Number(e.target.value),
                    })
                  }
                />
              </div>
              <div className="grid gap-1">
                <Label className="text-xs">Suporte</Label>
                <Input
                  value={plan.support_period ?? ""}
                  onChange={(e) => update(index, { support_period: e.target.value })}
                />
              </div>
              <div className="grid gap-1">
                <Label className="text-xs">Revisões</Label>
                <Input
                  value={plan.revisions ?? ""}
                  onChange={(e) => update(index, { revisions: e.target.value })}
                />
              </div>
            </div>
            <Input
              value={plan.cta_label}
              onChange={(e) => update(index, { cta_label: e.target.value })}
            />
            <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
              <label className="flex items-center gap-2">
                <Switch
                  checked={plan.show_price}
                  onCheckedChange={(v) => update(index, { show_price: v })}
                />
                Exibir preço
              </label>
              <label className="flex items-center gap-2">
                <Switch
                  checked={plan.is_highlighted}
                  onCheckedChange={(v) => update(index, { is_highlighted: v })}
                />
                Destacar
              </label>
              <label className="flex items-center gap-2">
                <Switch
                  checked={plan.is_visible}
                  onCheckedChange={(v) => update(index, { is_visible: v })}
                />
                Visível
              </label>
            </div>
            <div>
              <Button size="sm" variant="outline" onClick={() => mutation.mutate(plan)}>
                Salvar plano
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

function FaqForm({
  faqs,
  onSaved,
}: {
  faqs: Array<{
    id: string;
    question: string;
    answer: string;
    sort_order: number;
    is_visible: boolean;
  }>;
  onSaved: () => void;
}) {
  const save = useServerFn(saveFaq);
  const remove = useServerFn(deleteFaq);
  const [items, setItems] = useState(faqs);

  const saveMutation = useMutation({
    mutationFn: (item: (typeof faqs)[number]) =>
      save({
        data: {
          id: item.id,
          question: item.question,
          answer: item.answer,
          sort_order: item.sort_order,
          is_visible: item.is_visible,
        },
      }),
    onSuccess: () => {
      toast.success("Pergunta salva.");
      onSaved();
    },
    onError: () => toast.error("Não foi possível salvar."),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => remove({ data: { id } }),
    onSuccess: () => {
      toast.success("Pergunta removida.");
      onSaved();
    },
    onError: () => toast.error("Não foi possível remover."),
  });

  const createMutation = useMutation({
    mutationFn: () =>
      save({
        data: {
          question: "Nova pergunta?",
          answer: "Escreva a resposta.",
          sort_order: items.length + 1,
          is_visible: true,
        },
      }),
    onSuccess: () => {
      toast.success("Pergunta criada.");
      onSaved();
    },
    onError: () => toast.error("Não foi possível criar."),
  });

  return (
    <div className="grid gap-4">
      <div>
        <Button size="sm" onClick={() => createMutation.mutate()} disabled={createMutation.isPending}>
          <Plus className="mr-2 h-4 w-4" aria-hidden />
          Nova pergunta
        </Button>
      </div>
      {items.map((item, index) => (
        <Card key={item.id} className="border-border">
          <CardContent className="grid gap-3 pt-6">
            <Input
              value={item.question}
              onChange={(e) =>
                setItems((prev) =>
                  prev.map((f, i) => (i === index ? { ...f, question: e.target.value } : f)),
                )
              }
            />
            <Textarea
              rows={3}
              value={item.answer}
              onChange={(e) =>
                setItems((prev) =>
                  prev.map((f, i) => (i === index ? { ...f, answer: e.target.value } : f)),
                )
              }
            />
            <div className="flex items-center gap-3">
              <Switch
                checked={item.is_visible}
                onCheckedChange={(value) =>
                  setItems((prev) => prev.map((f, i) => (i === index ? { ...f, is_visible: value } : f)))
                }
              />
              <span className="text-xs text-muted-foreground">Visível no site</span>
              <Button size="sm" variant="outline" onClick={() => saveMutation.mutate(item)}>
                Salvar
              </Button>
              <Button
                size="sm"
                variant="ghost"
                className="text-destructive"
                onClick={() => deleteMutation.mutate(item.id)}
              >
                <Trash2 className="h-4 w-4" aria-hidden />
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
