import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { integrationsQuery } from "@/lib/admin.queries";
import {
  markNotificationsRead,
  rotateInboundKey,
  saveIntegrations,
  sendTestWebhook,
} from "@/lib/integrations.functions";

export const Route = createFileRoute("/_authenticated/painel/integracoes")({
  component: IntegracoesPage,
});

function IntegracoesPage() {
  const { data } = useSuspenseQuery(integrationsQuery);
  const queryClient = useQueryClient();
  const [form, setForm] = useState({
    webhook_url: data.config.webhook_url ?? "",
    webhook_secret: data.config.webhook_secret ?? "",
    whatsapp_notify_number: data.config.whatsapp_notify_number ?? "",
    notify_email: data.config.notify_email ?? "",
    notify_on_lead: data.config.notify_on_lead,
    notify_on_project: data.config.notify_on_project,
    webhook_enabled: data.config.webhook_enabled,
  });

  const invalidate = () => queryClient.invalidateQueries({ queryKey: ["admin", "integrations"] });

  const save = useMutation({
    mutationFn: () => saveIntegrations({ data: form }),
    onSuccess: () => {
      toast.success("Integrações salvas");
      invalidate();
    },
    onError: (error: Error) => toast.error(error.message),
  });

  const test = useMutation({
    mutationFn: () => sendTestWebhook(),
    onSuccess: (result) => {
      if (result.skipped) toast.info("Ative o webhook e salve a URL antes de testar.");
      else if (result.status === "ok") toast.success(`Webhook respondeu ${result.statusCode}`);
      else toast.error(`Falha no webhook: ${result.responseBody ?? "sem resposta"}`);
      invalidate();
    },
    onError: (error: Error) => toast.error(error.message),
  });

  const rotate = useMutation({
    mutationFn: () => rotateInboundKey(),
    onSuccess: () => {
      toast.success("Nova chave gerada");
      invalidate();
    },
  });

  const readAll = useMutation({
    mutationFn: () => markNotificationsRead({ data: { id: null } }),
    onSuccess: invalidate,
  });

  const endpoint = `${typeof window !== "undefined" ? window.location.origin : ""}/api/public/leads`;

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-semibold text-foreground">Integrações e automações</h1>
        <p className="text-sm text-muted-foreground">
          Envie novos orçamentos para outras ferramentas e receba avisos no painel.
        </p>
      </header>

      <Card>
        <CardContent className="space-y-4 p-5">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-foreground">Webhook de saída</p>
              <p className="text-xs text-muted-foreground">
                Dispara um POST a cada novo orçamento recebido.
              </p>
            </div>
            <Switch
              checked={form.webhook_enabled}
              onCheckedChange={(v) => setForm((f) => ({ ...f, webhook_enabled: v }))}
              aria-label="Ativar webhook"
            />
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="webhook_url">URL do webhook</Label>
              <Input
                id="webhook_url"
                placeholder="https://hooks.exemplo.com/abc"
                value={form.webhook_url}
                onChange={(e) => setForm((f) => ({ ...f, webhook_url: e.target.value }))}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="webhook_secret">Chave enviada no cabeçalho</Label>
              <Input
                id="webhook_secret"
                value={form.webhook_secret}
                onChange={(e) => setForm((f) => ({ ...f, webhook_secret: e.target.value }))}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="whatsapp_notify_number">WhatsApp para avisos</Label>
              <Input
                id="whatsapp_notify_number"
                placeholder="5511999999999"
                value={form.whatsapp_notify_number}
                onChange={(e) =>
                  setForm((f) => ({ ...f, whatsapp_notify_number: e.target.value }))
                }
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="notify_email">E-mail para avisos</Label>
              <Input
                id="notify_email"
                value={form.notify_email}
                onChange={(e) => setForm((f) => ({ ...f, notify_email: e.target.value }))}
              />
            </div>
          </div>
          <div className="flex flex-wrap gap-6">
            <label className="flex items-center gap-2 text-sm text-foreground">
              <Switch
                checked={form.notify_on_lead}
                onCheckedChange={(v) => setForm((f) => ({ ...f, notify_on_lead: v }))}
              />
              Avisar no painel a cada orçamento
            </label>
            <label className="flex items-center gap-2 text-sm text-foreground">
              <Switch
                checked={form.notify_on_project}
                onCheckedChange={(v) => setForm((f) => ({ ...f, notify_on_project: v }))}
              />
              Avisar sobre projetos
            </label>
          </div>
          <div className="flex gap-2">
            <Button onClick={() => save.mutate()} disabled={save.isPending}>
              Salvar
            </Button>
            <Button variant="outline" onClick={() => test.mutate()} disabled={test.isPending}>
              Disparar teste
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="space-y-3 p-5">
          <p className="text-sm font-medium text-foreground">Receber orçamentos de fora</p>
          <p className="text-xs text-muted-foreground">
            Envie um POST em JSON para o endereço abaixo com o cabeçalho{" "}
            <code className="rounded bg-muted px-1">x-api-key</code>.
          </p>
          <div className="grid gap-2 md:grid-cols-2">
            <Input readOnly value={endpoint} onFocus={(e) => e.currentTarget.select()} />
            <Input
              readOnly
              value={data.config.inbound_key ?? ""}
              onFocus={(e) => e.currentTarget.select()}
            />
          </div>
          <Button variant="outline" size="sm" onClick={() => rotate.mutate()}>
            Gerar nova chave
          </Button>
        </CardContent>
      </Card>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardContent className="space-y-3 p-5">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-foreground">Avisos recentes</p>
              <Button variant="ghost" size="sm" onClick={() => readAll.mutate()}>
                Marcar como lidos
              </Button>
            </div>
            {data.notifications.length === 0 ? (
              <p className="text-xs text-muted-foreground">Nenhum aviso ainda.</p>
            ) : (
              <ul className="space-y-2">
                {data.notifications.map((n) => (
                  <li
                    key={n.id}
                    className="rounded-md border border-border p-3 text-sm"
                  >
                    <p className="font-medium text-foreground">
                      {n.title}
                      {!n.read_at && (
                        <span className="ml-2 rounded-full bg-brand px-2 py-0.5 text-[10px] uppercase text-brand-foreground">
                          novo
                        </span>
                      )}
                    </p>
                    {n.body && <p className="text-xs text-muted-foreground">{n.body}</p>}
                    <p className="mt-1 text-[11px] text-muted-foreground">
                      {new Date(n.created_at).toLocaleString("pt-BR")}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardContent className="space-y-3 p-5">
            <p className="text-sm font-medium text-foreground">Histórico de envios</p>
            {data.deliveries.length === 0 ? (
              <p className="text-xs text-muted-foreground">Nenhum envio registrado.</p>
            ) : (
              <ul className="space-y-2">
                {data.deliveries.map((d) => (
                  <li key={d.id} className="rounded-md border border-border p-3 text-sm">
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-medium text-foreground">{d.event_type}</span>
                      <span
                        className={
                          d.status === "ok"
                            ? "text-xs text-emerald-600"
                            : "text-xs text-destructive"
                        }
                      >
                        {d.status} {d.status_code ?? ""}
                      </span>
                    </div>
                    <p className="mt-1 text-[11px] text-muted-foreground">
                      {new Date(d.created_at).toLocaleString("pt-BR")}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
