import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { analyticsQuery } from "@/lib/admin.queries";

export const Route = createFileRoute("/_authenticated/painel/analytics")({
  component: AnalyticsPage,
});

const ranges = [7, 30, 90] as const;

const eventLabels: Record<string, string> = {
  orcamento: "Pedidos de orçamento",
  whatsapp: "Cliques no WhatsApp",
  plano: "Cliques em planos",
  contato: "Contatos",
};

function countBy<T>(rows: T[], key: (row: T) => string | null) {
  const map = new Map<string, number>();
  for (const row of rows) {
    const k = key(row);
    if (!k) continue;
    map.set(k, (map.get(k) ?? 0) + 1);
  }
  return [...map.entries()].sort((a, b) => b[1] - a[1]);
}

function AnalyticsPage() {
  const [days, setDays] = useState<number>(30);
  const { data } = useSuspenseQuery(analyticsQuery(days));

  const views = data.views as { path: string; referrer: string | null; device: string | null; utm_source: string | null; session_id: string | null; created_at: string }[];
  const conversions = data.conversions as { event_type: string; label: string | null }[];

  const stats = useMemo(() => {
    const sessions = new Set(views.map((v) => v.session_id).filter(Boolean)).size;
    const rate = sessions > 0 ? (data.leadsCount / sessions) * 100 : 0;
    return {
      views: views.length,
      sessions,
      leads: data.leadsCount,
      rate: rate.toFixed(1),
    };
  }, [views, data.leadsCount]);

  const byPath = countBy(views, (v) => v.path).slice(0, 8);
  const bySource = countBy(views, (v) => v.utm_source ?? hostOf(v.referrer) ?? "direto").slice(0, 8);
  const byDevice = countBy(views, (v) => v.device);
  const byEvent = countBy(conversions, (c) => c.event_type);

  const maxPath = byPath[0]?.[1] ?? 1;

  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-semibold text-foreground">Analytics</h1>
          <p className="text-sm text-muted-foreground">
            Acessos, origens e conversões do site nos últimos {days} dias.
          </p>
        </div>
        <div className="flex gap-2">
          {ranges.map((r) => (
            <Button
              key={r}
              size="sm"
              variant={days === r ? "default" : "outline"}
              onClick={() => setDays(r)}
            >
              {r} dias
            </Button>
          ))}
        </div>
      </header>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Visitas", value: stats.views },
          { label: "Sessões", value: stats.sessions },
          { label: "Orçamentos recebidos", value: stats.leads },
          { label: "Taxa de conversão", value: `${stats.rate}%` },
        ].map((item) => (
          <Card key={item.label}>
            <CardContent className="p-4">
              <p className="text-xs uppercase tracking-wide text-muted-foreground">{item.label}</p>
              <p className="mt-1 text-2xl font-semibold text-foreground">{item.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardContent className="space-y-3 p-4">
            <h2 className="text-sm font-semibold text-foreground">Páginas mais acessadas</h2>
            {byPath.length === 0 ? (
              <p className="text-sm text-muted-foreground">Sem dados no período.</p>
            ) : (
              <ul className="space-y-2">
                {byPath.map(([path, count]) => (
                  <li key={path} className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="truncate text-foreground">{path}</span>
                      <span className="text-muted-foreground">{count}</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-muted">
                      <div
                        className="h-1.5 rounded-full bg-primary"
                        style={{ width: `${(count / maxPath) * 100}%` }}
                      />
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardContent className="space-y-3 p-4">
            <h2 className="text-sm font-semibold text-foreground">Origens do tráfego</h2>
            {bySource.length === 0 ? (
              <p className="text-sm text-muted-foreground">Sem dados no período.</p>
            ) : (
              <ul className="space-y-1 text-sm">
                {bySource.map(([source, count]) => (
                  <li key={source} className="flex justify-between">
                    <span className="truncate text-foreground">{source}</span>
                    <span className="text-muted-foreground">{count}</span>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardContent className="space-y-3 p-4">
            <h2 className="text-sm font-semibold text-foreground">Dispositivos</h2>
            {byDevice.length === 0 ? (
              <p className="text-sm text-muted-foreground">Sem dados no período.</p>
            ) : (
              <ul className="space-y-1 text-sm">
                {byDevice.map(([device, count]) => (
                  <li key={device} className="flex justify-between">
                    <span className="capitalize text-foreground">{device}</span>
                    <span className="text-muted-foreground">{count}</span>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardContent className="space-y-3 p-4">
            <h2 className="text-sm font-semibold text-foreground">Conversões</h2>
            {byEvent.length === 0 ? (
              <p className="text-sm text-muted-foreground">Sem conversões no período.</p>
            ) : (
              <ul className="space-y-1 text-sm">
                {byEvent.map(([event, count]) => (
                  <li key={event} className="flex justify-between">
                    <span className="text-foreground">{eventLabels[event] ?? event}</span>
                    <span className="text-muted-foreground">{count}</span>
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

function hostOf(referrer: string | null) {
  if (!referrer) return null;
  try {
    return new URL(referrer).hostname.replace(/^www\./, "");
  } catch {
    return null;
  }
}
