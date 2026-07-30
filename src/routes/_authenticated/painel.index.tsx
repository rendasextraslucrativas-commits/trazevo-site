import { createFileRoute, Link } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { adminContentQuery, crmQuery } from "@/lib/admin.queries";

export const Route = createFileRoute("/_authenticated/painel/")({
  component: PainelOverview,
});

function PainelOverview() {
  const { data: crm } = useSuspenseQuery(crmQuery);
  const { data: content } = useSuspenseQuery(adminContentQuery);

  const now = Date.now();
  const last30 = crm.leads.filter(
    (lead) => now - new Date(lead.created_at).getTime() < 30 * 864e5,
  ).length;

  const cards = [
    { label: "Orçamentos recebidos", value: crm.leads.length },
    { label: "Nos últimos 30 dias", value: last30 },
    { label: "Planos publicados", value: content.plans.filter((p) => p.is_visible).length },
    { label: "Modelos publicados", value: content.templates.filter((t) => t.is_published).length },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-brand">Visão geral</h1>
        <p className="text-sm text-muted-foreground">
          Acompanhe os pedidos de orçamento e o conteúdo publicado no site.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((card) => (
          <Card key={card.label} className="border-border">
            <CardHeader className="pb-1">
              <CardTitle className="text-3xl text-foreground">{card.value}</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">{card.label}</CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-border">
        <CardHeader className="flex-row items-center justify-between space-y-0">
          <CardTitle className="text-base">Últimos pedidos</CardTitle>
          <Button asChild variant="outline" size="sm">
            <Link to="/painel/leads">Ver todos</Link>
          </Button>
        </CardHeader>
        <CardContent>
          {crm.leads.length === 0 ? (
            <p className="text-sm text-muted-foreground">Nenhum pedido recebido até agora.</p>
          ) : (
            <ul className="divide-y divide-border text-sm">
              {crm.leads.slice(0, 6).map((lead) => (
                <li key={lead.id} className="flex flex-wrap justify-between gap-2 py-3">
                  <span className="font-medium text-foreground">{lead.name}</span>
                  <span className="text-muted-foreground">{lead.service ?? "Sem plano definido"}</span>
                  <span className="text-muted-foreground">
                    {new Date(lead.created_at).toLocaleDateString("pt-BR")}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
