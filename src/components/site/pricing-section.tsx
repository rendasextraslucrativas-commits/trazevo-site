import { Check, LayoutTemplate, Building2, Store, Clock, CreditCard, type LucideIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SectionTitle } from "./site-shell";

const WHATSAPP = "https://wa.me/5500000000000";

type PricingPlan = {
  id: string;
  icon: LucideIcon;
  name: string;
  price: string;
  description: string;
  features: string[];
  deadline: string;
  message: string;
  highlighted?: boolean;
};

const plans: PricingPlan[] = [
  {
    id: "landing",
    icon: LayoutTemplate,
    name: "Landing Page",
    price: "A partir de R$ 697",
    description:
      "Página estratégica para divulgar um serviço, produto, evento ou campanha e direcionar visitantes para o WhatsApp.",
    features: [
      "Página única com até 6 seções",
      "Design personalizado",
      "Botão para WhatsApp",
      "Formulário de contato",
      "Versão adaptada para celular",
      "Configuração básica para mecanismos de busca",
      "Até 2 rodadas de alterações",
      "Suporte inicial após a publicação",
    ],
    deadline: "5 a 7 dias úteis",
    message: "Olá! Gostaria de receber um orçamento para uma Landing Page.",
  },
  {
    id: "profissional",
    icon: Building2,
    name: "Site Profissional",
    price: "A partir de R$ 1.497",
    description:
      "Site institucional completo para apresentar sua empresa, seus serviços e seus diferenciais com profissionalismo.",
    features: [
      "Até 5 páginas",
      "Design personalizado",
      "Página inicial",
      "Página sobre a empresa",
      "Página de serviços",
      "Página de contato",
      "Integração com WhatsApp",
      "Formulário de orçamento",
      "Versão adaptada para celular",
      "Configuração básica para mecanismos de busca",
      "Até 3 rodadas de alterações",
      "Suporte inicial após a publicação",
    ],
    deadline: "10 a 15 dias úteis",
    message: "Olá! Gostaria de receber um orçamento para um Site Profissional.",
    highlighted: true,
  },
  {
    id: "catalogo",
    icon: Store,
    name: "Catálogo Digital",
    price: "A partir de R$ 1.897",
    description:
      "Vitrine digital para apresentar produtos ou serviços e receber pedidos diretamente pelo WhatsApp.",
    features: [
      "Até 30 produtos ou serviços",
      "Organização por categorias",
      "Fotos, descrições e preços",
      "Botões de pedido pelo WhatsApp",
      "Página institucional",
      "Página de contato",
      "Versão adaptada para celular",
      "Configuração básica para mecanismos de busca",
      "Até 3 rodadas de alterações",
      "Orientação para futuras atualizações",
    ],
    deadline: "12 a 18 dias úteis",
    message: "Olá! Gostaria de receber um orçamento para um Catálogo Digital.",
  },
];

const paymentTerms = [
  "50% do valor para iniciar o projeto",
  "50% após a aprovação final, antes da publicação",
  "Possibilidade de pagamento por Pix",
  "Pagamento por cartão poderá ter acréscimos da operadora",
  "Projetos com necessidades especiais recebem orçamento personalizado",
];

export function PricingSection() {
  return (
    <section id="planos" className="border-y border-border bg-surface">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:py-20">
        <SectionTitle
          title="Escolha a solução ideal para o seu negócio"
          subtitle="Projetos desenvolvidos de acordo com os objetivos da sua empresa, com valores claros e acompanhamento durante todo o processo."
        />

        <div className="mt-10 grid items-start gap-6 md:grid-cols-3">
          {plans.map((plan) => {
            const PlanIcon = plan.icon;
            return (
              <Card
                key={plan.id}
                className={`relative flex h-full flex-col rounded-2xl transition-all duration-300 hover:-translate-y-1 ${
                  plan.highlighted
                    ? "border-primary/50 shadow-[var(--shadow-card)] hover:shadow-lg"
                    : "border-border shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-card)]"
                }`}
              >
                {plan.highlighted ? (
                  <Badge className="absolute -top-3 left-6">Mais escolhido</Badge>
                ) : null}
                <CardHeader className="pb-3">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-accent text-accent-foreground">
                    <PlanIcon className="h-5 w-5" aria-hidden />
                  </span>
                  <CardTitle className="mt-4 text-xl text-brand">{plan.name}</CardTitle>
                  <p className="mt-2 text-2xl font-bold text-foreground">{plan.price}</p>
                  <p className="mt-2 text-sm text-muted-foreground">{plan.description}</p>
                </CardHeader>
                <CardContent className="flex flex-1 flex-col">
                  <ul className="space-y-2 text-sm">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex min-w-0 gap-2 text-muted-foreground">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-5 flex items-center gap-2 rounded-lg bg-accent/60 px-3 py-2 text-sm font-medium text-foreground">
                    <Clock className="h-4 w-4 shrink-0 text-primary" aria-hidden />
                    Prazo estimado: {plan.deadline}
                  </p>
                  <Button asChild size="lg" className="mt-6 w-full sm:mt-auto">
                    <a
                      href={`${WHATSAPP}?text=${encodeURIComponent(plan.message)}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Solicitar orçamento
                    </a>
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="mt-10 rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-soft)] sm:p-8">
          <h3 className="flex items-center gap-2 text-lg font-semibold text-brand">
            <CreditCard className="h-5 w-5 text-primary" aria-hidden />
            Condições de pagamento
          </h3>
          <ul className="mt-4 grid gap-2 text-sm sm:grid-cols-2">
            {paymentTerms.map((term) => (
              <li key={term} className="flex gap-2 text-muted-foreground">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
                <span>{term}</span>
              </li>
            ))}
          </ul>
          <p className="mt-5 rounded-lg bg-surface p-4 text-xs leading-relaxed text-muted-foreground">
            Domínio, hospedagem, banco de imagens, ferramentas pagas e serviços externos não estão
            incluídos nos valores iniciais, salvo quando informados na proposta comercial.
          </p>
        </div>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          Os valores apresentados são iniciais e podem variar conforme a quantidade de páginas,
          funcionalidades, materiais enviados e complexidade do projeto.
        </p>
      </div>
    </section>
  );
}
