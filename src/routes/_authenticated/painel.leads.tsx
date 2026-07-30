import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useDraggable,
  useDroppable,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragStartEvent,
} from "@dnd-kit/core";
import { useMutation, useQuery, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { GripVertical, LayoutGrid, List } from "lucide-react";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import { crmQuery, leadActivitiesQuery } from "@/lib/admin.queries";
import { addLeadActivity, updateLead } from "@/lib/admin.functions";

export const Route = createFileRoute("/_authenticated/painel/leads")({
  component: LeadsPage,
});

type Lead = ReturnType<typeof useCrm>["leads"][number];
type Stage = ReturnType<typeof useCrm>["stages"][number];

function useCrm() {
  return useSuspenseQuery(crmQuery).data;
}

const PRIORITIES = [
  { value: "baixa", label: "Baixa" },
  { value: "media", label: "Média" },
  { value: "alta", label: "Alta" },
] as const;

const ACTIVITY_TYPES = [
  { value: "nota", label: "Nota" },
  { value: "ligacao", label: "Ligação" },
  { value: "whatsapp", label: "WhatsApp" },
  { value: "email", label: "E-mail" },
  { value: "reuniao", label: "Reunião" },
] as const;

function priorityTone(priority: string) {
  if (priority === "alta") return "border-destructive/40 text-destructive";
  if (priority === "baixa") return "border-border text-muted-foreground";
  return "border-accent/40 text-accent";
}

function LeadCard({ lead, onOpen }: { lead: Lead; onOpen: (lead: Lead) => void }) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({ id: lead.id });

  return (
    <div
      ref={setNodeRef}
      className={`rounded-lg border border-border bg-card p-3 shadow-sm transition ${
        isDragging ? "opacity-40" : "hover:border-accent/50"
      }`}
    >
      <div className="flex items-start gap-2">
        <button
          type="button"
          aria-label="Arrastar lead"
          className="mt-0.5 cursor-grab text-muted-foreground active:cursor-grabbing"
          {...attributes}
          {...listeners}
        >
          <GripVertical className="h-4 w-4" />
        </button>
        <button type="button" className="flex-1 text-left" onClick={() => onOpen(lead)}>
          <p className="text-sm font-semibold text-foreground">{lead.name}</p>
          <p className="text-xs text-muted-foreground">{lead.company ?? lead.email ?? "—"}</p>
          <div className="mt-2 flex flex-wrap items-center gap-1">
            <Badge variant="outline" className={`text-[10px] ${priorityTone(lead.priority)}`}>
              {lead.priority}
            </Badge>
            {lead.next_contact_at ? (
              <Badge variant="secondary" className="text-[10px]">
                {new Date(`${lead.next_contact_at}T12:00:00`).toLocaleDateString("pt-BR")}
              </Badge>
            ) : null}
          </div>
        </button>
      </div>
    </div>
  );
}

function StageColumn({
  stage,
  leads,
  onOpen,
}: {
  stage: Stage;
  leads: Lead[];
  onOpen: (lead: Lead) => void;
}) {
  const { setNodeRef, isOver } = useDroppable({ id: stage.id });

  return (
    <div
      ref={setNodeRef}
      className={`flex w-72 shrink-0 flex-col gap-3 rounded-xl border p-3 transition ${
        isOver ? "border-accent bg-accent/5" : "border-border bg-surface"
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: stage.color }} />
          <p className="text-sm font-semibold text-foreground">{stage.name}</p>
        </div>
        <span className="text-xs text-muted-foreground">{leads.length}</span>
      </div>
      <div className="flex flex-col gap-2">
        {leads.map((lead) => (
          <LeadCard key={lead.id} lead={lead} onOpen={onOpen} />
        ))}
        {leads.length === 0 ? (
          <p className="rounded-md border border-dashed border-border py-6 text-center text-xs text-muted-foreground">
            Solte um lead aqui
          </p>
        ) : null}
      </div>
    </div>
  );
}

function LeadDetail({ lead, stages, onClose }: { lead: Lead | null; stages: Stage[]; onClose: () => void }) {
  const queryClient = useQueryClient();
  const save = useServerFn(updateLead);
  const log = useServerFn(addLeadActivity);
  const [note, setNote] = useState("");
  const [type, setType] = useState<(typeof ACTIVITY_TYPES)[number]["value"]>("nota");

  const activities = useQuery({
    ...leadActivitiesQuery(lead?.id ?? ""),
    enabled: Boolean(lead),
  });

  const update = useMutation({
    mutationFn: (input: Record<string, unknown>) => save({ data: { id: lead!.id, ...input } }),
    onSuccess: () => {
      toast.success("Lead atualizado.");
      queryClient.invalidateQueries({ queryKey: ["admin", "crm"] });
    },
    onError: () => toast.error("Não foi possível atualizar."),
  });

  const addNote = useMutation({
    mutationFn: () => log({ data: { lead_id: lead!.id, type, content: note.trim() } }),
    onSuccess: () => {
      setNote("");
      toast.success("Interação registrada.");
      queryClient.invalidateQueries({ queryKey: ["admin", "crm", "activities", lead?.id] });
    },
    onError: () => toast.error("Não foi possível registrar."),
  });

  return (
    <Sheet open={Boolean(lead)} onOpenChange={(open) => (!open ? onClose() : null)}>
      <SheetContent className="w-full overflow-y-auto sm:max-w-lg">
        {lead ? (
          <>
            <SheetHeader>
              <SheetTitle>{lead.name}</SheetTitle>
              <SheetDescription>
                {lead.company ?? "Sem empresa"} · recebido em{" "}
                {new Date(lead.created_at).toLocaleDateString("pt-BR")}
              </SheetDescription>
            </SheetHeader>

            <div className="mt-6 space-y-5">
              <dl className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <dt className="text-xs uppercase text-muted-foreground">E-mail</dt>
                  <dd className="break-all">{lead.email ?? "—"}</dd>
                </div>
                <div>
                  <dt className="text-xs uppercase text-muted-foreground">WhatsApp</dt>
                  <dd>{lead.whatsapp ?? "—"}</dd>
                </div>
                <div>
                  <dt className="text-xs uppercase text-muted-foreground">Segmento</dt>
                  <dd>{lead.niche ?? "—"}</dd>
                </div>
                <div>
                  <dt className="text-xs uppercase text-muted-foreground">Serviço</dt>
                  <dd>{lead.service ?? "—"}</dd>
                </div>
              </dl>

              <div className="grid gap-3 sm:grid-cols-2">
                <div className="grid gap-1.5">
                  <Label>Etapa</Label>
                  <Select
                    value={lead.stage_id ?? undefined}
                    onValueChange={(value) => update.mutate({ stage_id: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecionar" />
                    </SelectTrigger>
                    <SelectContent>
                      {stages.map((stage) => (
                        <SelectItem key={stage.id} value={stage.id}>
                          {stage.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-1.5">
                  <Label>Prioridade</Label>
                  <Select
                    value={lead.priority}
                    onValueChange={(value) => update.mutate({ priority: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {PRIORITIES.map((item) => (
                        <SelectItem key={item.value} value={item.value}>
                          {item.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-1.5">
                  <Label htmlFor="next-contact">Próximo contato</Label>
                  <Input
                    id="next-contact"
                    type="date"
                    defaultValue={lead.next_contact_at ?? ""}
                    onBlur={(e) => update.mutate({ next_contact_at: e.target.value })}
                  />
                </div>
                <div className="grid gap-1.5">
                  <Label htmlFor="budget">Orçamento (R$)</Label>
                  <Input
                    id="budget"
                    type="number"
                    min={0}
                    defaultValue={lead.budget ?? ""}
                    onBlur={(e) =>
                      update.mutate({ budget: e.target.value === "" ? null : Number(e.target.value) })
                    }
                  />
                </div>
              </div>

              <div className="grid gap-1.5">
                <Label htmlFor="notes">Observações internas</Label>
                <Textarea
                  id="notes"
                  rows={3}
                  defaultValue={lead.notes ?? ""}
                  onBlur={(e) => update.mutate({ notes: e.target.value })}
                />
              </div>

              <div className="flex gap-2">
                <Button asChild size="sm" variant="outline">
                  <a
                    href={`https://wa.me/${(lead.whatsapp ?? "").replace(/\D/g, "")}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    WhatsApp
                  </a>
                </Button>
                <Button asChild size="sm" variant="ghost">
                  <a href={`mailto:${lead.email}`}>E-mail</a>
                </Button>
              </div>

              <div className="space-y-3 border-t border-border pt-5">
                <h3 className="text-sm font-semibold">Histórico de interações</h3>
                <div className="flex gap-2">
                  <Select value={type} onValueChange={(value) => setType(value as typeof type)}>
                    <SelectTrigger className="w-36">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {ACTIVITY_TYPES.map((item) => (
                        <SelectItem key={item.value} value={item.value}>
                          {item.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Input
                    placeholder="O que aconteceu?"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                  />
                  <Button
                    size="sm"
                    disabled={!note.trim() || addNote.isPending}
                    onClick={() => addNote.mutate()}
                  >
                    Salvar
                  </Button>
                </div>
                <ul className="space-y-2">
                  {(activities.data ?? []).map((item) => (
                    <li key={item.id} className="rounded-md bg-surface p-3 text-sm">
                      <p className="text-xs uppercase text-muted-foreground">
                        {item.type} · {new Date(item.created_at).toLocaleString("pt-BR")}
                      </p>
                      <p className="text-foreground">{item.content}</p>
                    </li>
                  ))}
                  {activities.data?.length === 0 ? (
                    <li className="text-sm text-muted-foreground">Nenhuma interação registrada.</li>
                  ) : null}
                </ul>
              </div>
            </div>
          </>
        ) : null}
      </SheetContent>
    </Sheet>
  );
}

function LeadsPage() {
  const data = useCrm();
  const queryClient = useQueryClient();
  const change = useServerFn(updateLead);
  const [search, setSearch] = useState("");
  const [view, setView] = useState<"kanban" | "lista">("kanban");
  const [selected, setSelected] = useState<Lead | null>(null);
  const [dragging, setDragging] = useState<Lead | null>(null);

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }));

  const move = useMutation({
    mutationFn: (input: { id: string; stage_id: string }) => change({ data: input }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["admin", "crm"] }),
    onError: () => toast.error("Não foi possível mover o lead."),
  });

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return data.leads;
    return data.leads.filter((lead) =>
      [lead.name, lead.email, lead.company, lead.niche, lead.service]
        .filter(Boolean)
        .some((value) => String(value).toLowerCase().includes(term)),
    );
  }, [data.leads, search]);

  const firstStage = data.stages[0]?.id ?? null;
  const byStage = useMemo(() => {
    const map = new Map<string, Lead[]>();
    for (const stage of data.stages) map.set(stage.id, []);
    for (const lead of filtered) {
      const key = lead.stage_id ?? firstStage;
      if (key && map.has(key)) map.get(key)!.push(lead);
    }
    return map;
  }, [data.stages, filtered, firstStage]);

  function handleDragStart(event: DragStartEvent) {
    setDragging(data.leads.find((lead) => lead.id === event.active.id) ?? null);
  }

  function handleDragEnd(event: DragEndEvent) {
    setDragging(null);
    const stageId = event.over?.id ? String(event.over.id) : null;
    const leadId = String(event.active.id);
    if (!stageId) return;
    const lead = data.leads.find((item) => item.id === leadId);
    if (!lead || lead.stage_id === stageId) return;
    queryClient.setQueryData(crmQuery.queryKey, (old: typeof data | undefined) =>
      old
        ? {
            ...old,
            leads: old.leads.map((item) =>
              item.id === leadId ? { ...item, stage_id: stageId } : item,
            ),
          }
        : old,
    );
    move.mutate({ id: leadId, stage_id: stageId });
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-brand">Funil de vendas</h1>
          <p className="text-sm text-muted-foreground">
            {data.leads.length} pedido(s) de orçamento. Arraste os cartões para mudar de etapa.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Input
            className="w-56"
            placeholder="Buscar lead"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Button
            variant={view === "kanban" ? "default" : "outline"}
            size="icon"
            aria-label="Ver como quadro"
            onClick={() => setView("kanban")}
          >
            <LayoutGrid className="h-4 w-4" />
          </Button>
          <Button
            variant={view === "lista" ? "default" : "outline"}
            size="icon"
            aria-label="Ver como lista"
            onClick={() => setView("lista")}
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {view === "kanban" ? (
        <DndContext sensors={sensors} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
          <div className="flex gap-4 overflow-x-auto pb-4">
            {data.stages.map((stage) => (
              <StageColumn
                key={stage.id}
                stage={stage}
                leads={byStage.get(stage.id) ?? []}
                onOpen={setSelected}
              />
            ))}
          </div>
          <DragOverlay>
            {dragging ? (
              <div className="w-64 rounded-lg border border-accent bg-card p-3 shadow-lg">
                <p className="text-sm font-semibold">{dragging.name}</p>
                <p className="text-xs text-muted-foreground">{dragging.company ?? "—"}</p>
              </div>
            ) : null}
          </DragOverlay>
        </DndContext>
      ) : filtered.length === 0 ? (
        <Card className="border-border">
          <CardContent className="py-12 text-center text-sm text-muted-foreground">
            Nenhum pedido encontrado.
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 lg:grid-cols-2">
          {filtered.map((lead) => (
            <Card key={lead.id} className="border-border">
              <CardHeader className="flex-row items-start justify-between space-y-0 pb-2">
                <div>
                  <CardTitle className="text-base">{lead.name}</CardTitle>
                  <p className="text-xs text-muted-foreground">
                    {new Date(lead.created_at).toLocaleString("pt-BR")}
                  </p>
                </div>
                <Badge variant="outline" className={priorityTone(lead.priority)}>
                  {lead.priority}
                </Badge>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <dl className="grid grid-cols-2 gap-2 text-muted-foreground">
                  <div>
                    <dt className="text-xs uppercase">E-mail</dt>
                    <dd className="break-all text-foreground">{lead.email}</dd>
                  </div>
                  <div>
                    <dt className="text-xs uppercase">WhatsApp</dt>
                    <dd className="text-foreground">{lead.whatsapp ?? "—"}</dd>
                  </div>
                </dl>
                <Button size="sm" variant="outline" onClick={() => setSelected(lead)}>
                  Abrir detalhes
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <LeadDetail lead={selected} stages={data.stages} onClose={() => setSelected(null)} />
    </div>
  );
}
