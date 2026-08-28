import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Check,
  CheckCircle,
  ClipboardList,
  Map,
  MessageCircle,
  Palette,
  PenTool,
  Rocket,
  Search,
  Smartphone,
  Sparkles,
  Users,
  Zap,
  type LucideIcon,
} from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SectionTitle } from "./site-shell";
import type {
  Benefit,
  Faq,
  Plan,
  ProcessStep,
  SiteSettings,
  Template,
} from "@/lib/site-content.types";
import { formatPrice, whatsappLink } from "@/lib/site-content.types";

const icons: Record<string, LucideIcon> = {
  palette: Palette,
  smartphone: Smartphone,
  zap: Zap,
  "message-circle": MessageCircle,
  search: Search,
  users: Users,
  "clipboard-list": ClipboardList,
  map: Map,
  "pen-tool": PenTool,
  "check-circle": CheckCircle,
  rocket: Rocket,
  sparkles: Sparkles,
};

function Icon({ name, className }: { name: string; className?: string }) {
  const Component = icons[name] ?? Sparkles;
  return <Component className={className} aria-hidden />;
}

export function BenefitsGrid({ benefits }: { benefits: Benefit[] }) {
  if (!benefits.length) return null;
  return (
    <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {benefits.map((benefit) => (
        <Card key={benefit.id} className="border-border shadow-[var(--shadow-soft)]">
          <CardHeader className="pb-2">
            <span className="grid h-10 w-10 place-items-center rounded-lg bg-accent text-accent-foreground">
              <Icon name={benefit.icon} className="h-5 w-5" />
            </span>
            <CardTitle className="mt-3 text-base">{benefit.title}</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">{benefit.description}</CardContent>
        </Card>
      ))}
    </div>
  );
}

const flow = ["Visitante", "Landing page", "Interesse", "Contato", "Oportunidade"];

export function FlowDiagram() {
  return (
    <div className="mt-10">
      <ol className="flex flex-col items-stretch gap-3 md:flex-row md:items-center md:justify-between">
        {flow.map((step, index) => (
          <li key={step} className="flex flex-1 items-center gap-3">
            <div className="flex-1 rounded-xl border border-border bg-card px-4 py-3 text-center text-sm font-medium text-foreground shadow-[var(--shadow-soft)]">
              {step}
            </div>
            {index < flow.length - 1 ? (
              <ArrowRight className="h-4 w-4 shrink-0 rotate-90 text-muted-foreground md:rotate-0" aria-hidden />
            ) : null}
          </li>
        ))}
      </ol>
      <p className="mt-6 text-center text-sm text-muted-foreground">
        A página conduz o visitante até uma ação concreta: solicitar orçamento, conversar no
        WhatsApp, fazer um cadastro, pedir informações ou realizar um pedido.
      </p>
    </div>
  );
}

export function PlansGrid({
  plans,
  currency = "BRL",
}: {
  plans: Plan[];
  currency?: string;
}) {
  if (!plans.length) return null;
  return (
    <div className="mt-10 grid gap-6 md:grid-cols-2">
      {plans.map((plan) => {
        const price = formatPrice(plan.promo_price ?? plan.price, currency);
        return (
          <Card
            key={plan.id}
            className={
              plan.is_highlighted
                ? "relative border-primary/50 shadow-[var(--shadow-card)]"
                : "border-border shadow-[var(--shadow-soft)]"
            }
          >
            {plan.is_highlighted ? (
              <Badge className="absolute -top-3 left-6">Mais completo</Badge>
            ) : null}
            <CardHeader>
              <CardTitle className="text-xl text-brand">{plan.name}</CardTitle>
              <p className="text-sm text-muted-foreground">{plan.description}</p>
              {plan.show_price && price ? (
                <p className="pt-4">
                  {plan.price_prefix ? (
                    <span className="block text-xs uppercase tracking-wide text-muted-foreground">
                      {plan.price_prefix}
                    </span>
                  ) : null}
                  <span className="text-3xl font-bold text-foreground">{price}</span>
                </p>
              ) : null}
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                {plan.features.map((feature) => (
                  <li key={feature.id} className="flex gap-2 text-muted-foreground">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
                    <span>{feature.label}</span>
                  </li>
                ))}
              </ul>
              <dl className="mt-5 grid grid-cols-2 gap-3 rounded-lg bg-surface p-3 text-xs text-muted-foreground">
                <div>
                  <dt className="font-medium text-foreground">Suporte</dt>
                  <dd>{plan.support_period ?? "A combinar"}</dd>
                </div>
                <div>
                  <dt className="font-medium text-foreground">Revisões</dt>
                  <dd>{plan.revisions ?? "A combinar"}</dd>
                </div>
              </dl>
              <Button asChild className="mt-6 w-full">
                <Link to="/contato">{plan.cta_label}</Link>
              </Button>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}

export function TemplatesGrid({ templates }: { templates: Template[] }) {
  if (!templates.length) return null;
  return (
    <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {templates.map((template) => (
        <Card key={template.id} className="overflow-hidden border-border shadow-[var(--shadow-soft)]">
          <div className="aspect-[16/10] bg-ink p-5">
            <p className="text-xs uppercase tracking-widest text-brand-foreground/80">
              {template.niche}
            </p>
            <p className="mt-2 text-lg font-semibold text-brand-foreground">{template.name}</p>
          </div>
          <CardContent className="pt-5">
            <Badge variant="secondary" className="mb-3">
              Modelo conceitual criado para fins de demonstração
            </Badge>
            <p className="text-sm text-muted-foreground">{template.description}</p>
            <ul className="mt-3 flex flex-wrap gap-1.5">
              {template.features.map((feature) => (
                <li
                  key={feature}
                  className="rounded-md bg-surface px-2 py-1 text-xs text-muted-foreground"
                >
                  {feature}
                </li>
              ))}
            </ul>
            <Button asChild variant="outline" className="mt-5 w-full">
              <Link to="/contato">Quero um modelo assim</Link>
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export function ProcessList({ steps }: { steps: ProcessStep[] }) {
  if (!steps.length) return null;
  return (
    <ol className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
      {steps.map((step, index) => (
        <li
          key={step.id}
          className="rounded-xl border border-border bg-card p-5 shadow-[var(--shadow-soft)]"
        >
          <div className="flex items-center gap-2">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-accent text-accent-foreground">
              <Icon name={step.icon} className="h-4 w-4" />
            </span>
            <span className="text-xs font-semibold text-muted-foreground">
              Etapa {index + 1}
            </span>
          </div>
          <p className="mt-3 font-semibold text-foreground">{step.title}</p>
          <p className="mt-1 text-sm text-muted-foreground">{step.description}</p>
        </li>
      ))}
    </ol>
  );
}

export function FaqAccordion({ faqs }: { faqs: Faq[] }) {
  if (!faqs.length) return null;
  return (
    <Accordion type="single" collapsible className="mx-auto mt-10 max-w-3xl">
      {faqs.map((faq) => (
        <AccordionItem key={faq.id} value={faq.id}>
          <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
          <AccordionContent className="text-muted-foreground">{faq.answer}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

export function FinalCta({
  settings,
  title,
  subtitle,
}: {
  settings: SiteSettings | null;
  title: string;
  subtitle?: string | null;
}) {
  const wa = whatsappLink(settings);
  return (
    <section className="bg-brand">
      <div className="mx-auto max-w-4xl px-4 py-16 text-center">
        <h2 className="text-2xl font-bold tracking-tight text-brand-foreground sm:text-3xl">
          {title}
        </h2>
        {subtitle ? <p className="mt-3 text-brand-foreground/80">{subtitle}</p> : null}
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button asChild size="lg">
            <Link to="/contato">Solicitar orçamento</Link>
          </Button>
          {wa ? (
            <Button asChild size="lg" variant="outline" className="bg-transparent text-brand-foreground hover:bg-brand-foreground/10">
              <a href={wa} target="_blank" rel="noreferrer">
                Conversar pelo WhatsApp
              </a>
            </Button>
          ) : null}
        </div>
      </div>
    </section>
  );
}

export { SectionTitle };
