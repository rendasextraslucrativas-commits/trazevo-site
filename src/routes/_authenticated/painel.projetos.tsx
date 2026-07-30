import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { CalendarClock, CheckCircle2, Circle, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { projectsQuery } from "@/lib/admin.queries";
import {
  deleteProject,
  deleteProjectTask,
  saveProject,
  saveProjectTask,
} from "@/lib/admin.functions";
import {
  projectStatuses,
  type ProjectInput,
  type ProjectTaskInput,
} from "@/lib/admin.schemas";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_authenticated/painel/projetos")({
  component: ProjetosPage,
});

const statusLabels: Record<string, string> = {
  proposta: "Proposta",
  producao: "Em produção",
  revisao: "Em revisão",
  entregue: "Entregue",
  pausado: "Pausado",
};

const emptyProject: ProjectInput = {
  title: "",
  client_name: "",
  client_contact: "",
  lead_id: "",
  plan_id: "",
  status: "proposta",
  progress: 0,
  price: null,
  started_at: "",
  due_date: "",
  delivered_at: "",
  live_url: "",
  notes: "",
};

type ProjectRow = {
  id: string;
  title: string;
  client_name: string;
  client_contact: string | null;
  lead_id: string | null;
  plan_id: string | null;
  status: string;
  progress: number;
  price: number | string | null;
  started_at: string | null;
  due_date: string | null;
  delivered_at: string | null;
  live_url: string | null;
  notes: string | null;
};

type TaskRow = {
  id: string;
  project_id: string;
  title: string;
  is_done: boolean;
  due_date: string | null;
  sort_order: number;
};

function toForm(row: ProjectRow): ProjectInput {
  return {
    id: row.id,
    title: row.title,
    client_name: row.client_name,
    client_contact: row.client_contact ?? "",
    lead_id: row.lead_id ?? "",
    plan_id: row.plan_id ?? "",
    status: (projectStatuses as readonly string[]).includes(row.status)
      ? (row.status as ProjectInput["status"])
      : "proposta",
    progress: row.progress ?? 0,
    price: row.price === null ? null : Number(row.price),
    started_at: row.started_at ?? "",
    due_date: row.due_date ?? "",
    delivered_at: row.delivered_at ?? "",
    live_url: row.live_url ?? "",
    notes: row.notes ?? "",
  };
}

function ProjetosPage() {
  const { data } = useSuspenseQuery(projectsQuery);
  const queryClient = useQueryClient();
  const [form, setForm] = useState<ProjectInput | null>(null);
  const [newTask, setNewTask] = useState<Record<string, string>>({});

  const projects = (data.projects ?? []) as ProjectRow[];
  const tasks = (data.tasks ?? []) as TaskRow[];

  const invalidate = () => queryClient.invalidateQueries({ queryKey: ["admin", "projects"] });

  const save = useMutation({
    mutationFn: (input: ProjectInput) => saveProject({ data: input }),
    onSuccess: async () => {
      toast.success("Projeto salvo.");
      setForm(null);
      await invalidate();
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const remove = useMutation({
    mutationFn: (id: string) => deleteProject({ data: { id } }),
    onSuccess: async () => {
      toast.success("Projeto excluído.");
      await invalidate();
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const saveTask = useMutation({
    mutationFn: (input: ProjectTaskInput) => saveProjectTask({ data: input }),
    onSuccess: async () => await invalidate(),
    onError: (e: Error) => toast.error(e.message),
  });

  const removeTask = useMutation({
    mutationFn: (id: string) => deleteProjectTask({ data: { id } }),
    onSuccess: async () => await invalidate(),
    onError: (e: Error) => toast.error(e.message),
  });

  const summary = useMemo(() => {
    const active = projects.filter((p) => p.status === "producao" || p.status === "revisao").length;
    const delivered = projects.filter((p) => p.status === "entregue").length;
    const today = new Date().toISOString().slice(0, 10);
    const late = projects.filter(
      (p) => p.due_date && p.due_date < today && p.status !== "entregue",
    ).length;
    return { active, delivered, late };
  }, [projects]);

  function update<K extends keyof ProjectInput>(key: K, value: ProjectInput[K]) {
    setForm((prev) => (prev ? { ...prev, [key]: value } : prev));
  }

  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-semibold text-foreground">Projetos</h1>
          <p className="text-sm text-muted-foreground">
            Acompanhe o andamento das landing pages contratadas.
          </p>
        </div>
        <Button onClick={() => setForm({ ...emptyProject })}>
          <Plus className="mr-2 h-4 w-4" aria-hidden />
          Novo projeto
        </Button>
      </header>

      <div className="grid gap-3 sm:grid-cols-3">
        {[
          { label: "Em andamento", value: summary.active },
          { label: "Entregues", value: summary.delivered },
          { label: "Prazo vencido", value: summary.late },
        ].map((item) => (
          <Card key={item.label}>
            <CardContent className="p-4">
              <p className="text-xs uppercase tracking-wide text-muted-foreground">{item.label}</p>
              <p className="mt-1 text-2xl font-semibold text-foreground">{item.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {form ? (
        <Card>
          <CardContent className="space-y-4 p-4">
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label htmlFor="title">Título</Label>
                <Input
                  id="title"
                  value={form.title}
                  onChange={(e) => update("title", e.target.value)}
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="client">Cliente</Label>
                <Input
                  id="client"
                  value={form.client_name}
                  onChange={(e) => update("client_name", e.target.value)}
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="contact">Contato</Label>
                <Input
                  id="contact"
                  value={form.client_contact ?? ""}
                  onChange={(e) => update("client_contact", e.target.value)}
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="status">Situação</Label>
                <select
                  id="status"
                  className="h-9 w-full rounded-md border border-input bg-background px-3 text-sm"
                  value={form.status}
                  onChange={(e) => update("status", e.target.value as ProjectInput["status"])}
                >
                  {projectStatuses.map((s) => (
                    <option key={s} value={s}>
                      {statusLabels[s]}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="lead">Orçamento de origem</Label>
                <select
                  id="lead"
                  className="h-9 w-full rounded-md border border-input bg-background px-3 text-sm"
                  value={form.lead_id ?? ""}
                  onChange={(e) => update("lead_id", e.target.value)}
                >
                  <option value="">Nenhum</option>
                  {(data.leads ?? []).map((l) => (
                    <option key={l.id} value={l.id}>
                      {l.name}
                      {l.company ? ` — ${l.company}` : ""}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="plan">Plano</Label>
                <select
                  id="plan"
                  className="h-9 w-full rounded-md border border-input bg-background px-3 text-sm"
                  value={form.plan_id ?? ""}
                  onChange={(e) => update("plan_id", e.target.value)}
                >
                  <option value="">Nenhum</option>
                  {(data.plans ?? []).map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="price">Valor (R$)</Label>
                <Input
                  id="price"
                  type="number"
                  min={0}
                  value={form.price ?? ""}
                  onChange={(e) =>
                    update("price", e.target.value === "" ? null : Number(e.target.value))
                  }
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="progress">Progresso (%)</Label>
                <Input
                  id="progress"
                  type="number"
                  min={0}
                  max={100}
                  value={form.progress}
                  onChange={(e) => update("progress", Number(e.target.value || 0))}
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="start">Início</Label>
                <Input
                  id="start"
                  type="date"
                  value={form.started_at ?? ""}
                  onChange={(e) => update("started_at", e.target.value)}
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="due">Prazo</Label>
                <Input
                  id="due"
                  type="date"
                  value={form.due_date ?? ""}
                  onChange={(e) => update("due_date", e.target.value)}
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="delivered">Entrega efetiva</Label>
                <Input
                  id="delivered"
                  type="date"
                  value={form.delivered_at ?? ""}
                  onChange={(e) => update("delivered_at", e.target.value)}
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="url">Link da LP</Label>
                <Input
                  id="url"
                  value={form.live_url ?? ""}
                  onChange={(e) => update("live_url", e.target.value)}
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="notes">Observações</Label>
              <Textarea
                id="notes"
                rows={3}
                value={form.notes ?? ""}
                onChange={(e) => update("notes", e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Button onClick={() => save.mutate(form)} disabled={save.isPending}>
                Salvar projeto
              </Button>
              <Button variant="outline" onClick={() => setForm(null)}>
                Cancelar
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : null}

      <div className="space-y-3">
        {projects.length === 0 ? (
          <p className="text-sm text-muted-foreground">Nenhum projeto cadastrado ainda.</p>
        ) : null}
        {projects.map((project) => {
          const projectTasks = tasks.filter((t) => t.project_id === project.id);
          const done = projectTasks.filter((t) => t.is_done).length;
          const overdue =
            project.due_date &&
            project.due_date < new Date().toISOString().slice(0, 10) &&
            project.status !== "entregue";
          return (
            <Card key={project.id}>
              <CardContent className="space-y-4 p-4">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="text-base font-semibold text-foreground">{project.title}</h2>
                      <Badge variant="secondary">{statusLabels[project.status] ?? project.status}</Badge>
                      {overdue ? <Badge variant="destructive">Atrasado</Badge> : null}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {project.client_name}
                      {project.due_date ? ` · prazo ${project.due_date}` : ""}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => setForm(toForm(project))}>
                      Editar
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => remove.mutate(project.id)}
                      aria-label={`Excluir ${project.title}`}
                    >
                      <Trash2 className="h-4 w-4" aria-hidden />
                    </Button>
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>Progresso</span>
                    <span>{project.progress}%</span>
                  </div>
                  <Progress value={project.progress} />
                </div>

                <div className="space-y-2">
                  <p className="text-xs uppercase tracking-wide text-muted-foreground">
                    Etapas ({done}/{projectTasks.length})
                  </p>
                  <ul className="space-y-1">
                    {projectTasks.map((task) => (
                      <li key={task.id} className="flex items-center gap-2 text-sm">
                        <button
                          type="button"
                          onClick={() =>
                            saveTask.mutate({
                              id: task.id,
                              project_id: project.id,
                              title: task.title,
                              description: "",
                              is_done: !task.is_done,
                              due_date: task.due_date ?? "",
                              sort_order: task.sort_order,
                            })
                          }
                          aria-label={task.is_done ? "Reabrir etapa" : "Concluir etapa"}
                        >
                          {task.is_done ? (
                            <CheckCircle2 className="h-4 w-4 text-primary" aria-hidden />
                          ) : (
                            <Circle className="h-4 w-4 text-muted-foreground" aria-hidden />
                          )}
                        </button>
                        <span className={cn(task.is_done && "text-muted-foreground line-through")}>
                          {task.title}
                        </span>
                        {task.due_date ? (
                          <span className="flex items-center gap-1 text-xs text-muted-foreground">
                            <CalendarClock className="h-3 w-3" aria-hidden />
                            {task.due_date}
                          </span>
                        ) : null}
                        <button
                          type="button"
                          className="ml-auto text-xs text-muted-foreground hover:text-destructive"
                          onClick={() => removeTask.mutate(task.id)}
                        >
                          remover
                        </button>
                      </li>
                    ))}
                  </ul>
                  <div className="flex gap-2">
                    <Input
                      value={newTask[project.id] ?? ""}
                      placeholder="Nova etapa"
                      onChange={(e) =>
                        setNewTask((prev) => ({ ...prev, [project.id]: e.target.value }))
                      }
                    />
                    <Button
                      variant="outline"
                      onClick={() => {
                        const title = (newTask[project.id] ?? "").trim();
                        if (title.length < 2) return;
                        saveTask.mutate({
                          project_id: project.id,
                          title,
                          description: "",
                          is_done: false,
                          due_date: "",
                          sort_order: projectTasks.length,
                        });
                        setNewTask((prev) => ({ ...prev, [project.id]: "" }));
                      }}
                    >
                      Adicionar
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
