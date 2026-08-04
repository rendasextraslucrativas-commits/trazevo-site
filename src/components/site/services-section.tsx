import { Check, LayoutTemplate, Store, Building2, type LucideIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SectionTitle } from "./site-shell";

const WHATSAPP = "https://wa.me/5500000000000";

type ServiceCard = {
  id: string;
  icon: LucideIcon;
  title: string;
  description: string;
  benefits: string[];
  cta: string;
  message: string;
  highlighted?: boolean;
};

const services: ServiceCard[] = [
  {
    id: "landing",
    icon: LayoutTemplate,
    title: "Landing Page",
    description:
      "Uma página estratégica para divulgar um serviço, produto, evento ou campanha.",
    benefits: [
      "Página única com até 6 seções",
      "Design personalizado",
      "Botão para WhatsApp",
      "Formulário de contato",
      "Versão adaptada para celular",
      "Configuração básica para mecanismos de busca",
    ],
    cta: "Quero uma Landing Page",
    message: "Olá! Gostaria de solicitar um orçamento para uma Landing Page.",
  },
  {
    id: "institucional",
    icon: Building2,
    title: "Site Institucional",
    description:
      "Um site profissional para apresentar sua empresa, seus serviços e seus diferenciais.",
    benefits: [
      "Até 5 páginas",
      "Página inicial",
      "Página sobre a empresa",
      "Página de serviços",
      "Página de contato",
      "Integração com WhatsApp",
      "Formulário de orçamento",
      "Design responsivo",
      "Configuração básica para mecanismos de busca",
    ],
    cta: "Quero um Site Profissional",
    message: "Olá! Gostaria de solicitar um orçamento para um Site Institucional.",
    highlighted: true,
  },
  {
    id: "catalogo",
    icon: Store,
    title: "Catálogo Digital",
    description:
      "Uma vitrine online para apresentar produtos ou serviços e receber pedidos pelo WhatsApp.",
    benefits: [
      "Até 30 produtos ou serviços",
      "Organização por categorias",
      "Fotos, descrições e preços",
      "Botões de pedido pelo WhatsApp",
      "Página de contato",
      "Versão adaptada para celular",
      "Orientação para futuras atualizações",
    ],
    cta: "Quero um Catálogo Digital",
    message: "Olá! Gostaria de solicitar um orçamento para um Catálogo Digital.",
  },
];

export function ServicesSection() {
  return (
    <section id="servicos" className="border-y border-border bg-surface">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:py-20">
      <SectionTitle
        title="Soluções digitais para fortalecer seu negócio"
        subtitle="Criamos sites modernos, rápidos e adaptados para celulares, desenvolvidos para apresentar sua empresa com profissionalismo e transformar visitantes em contatos."
      />
      <div className="mt-10 grid items-start gap-6 md:grid-cols-3">
        {services.map((service) => {
          const ServiceIcon = service.icon;
          return (
            <Card
              key={service.id}
              className={`relative flex h-full flex-col rounded-2xl transition-all duration-300 hover:-translate-y-1 ${
                service.highlighted
                  ? "border-primary/50 shadow-[var(--shadow-card)] hover:shadow-lg"
                  : "border-border shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-card)]"
              }`}
            >
              {service.highlighted ? (
                <Badge className="absolute -top-3 left-6">Mais escolhido</Badge>
              ) : null}
              <CardHeader className="pb-3">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-accent text-accent-foreground">
                  <ServiceIcon className="h-5 w-5" aria-hidden />
                </span>
                <CardTitle className="mt-4 text-xl text-brand">{service.title}</CardTitle>
                <p className="mt-1 text-sm text-muted-foreground">{service.description}</p>
              </CardHeader>
              <CardContent className="flex flex-1 flex-col">
                <ul className="space-y-2 text-sm">
                  {service.benefits.map((benefit) => (
                    <li key={benefit} className="flex min-w-0 gap-2 text-muted-foreground">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
                <Button asChild size="lg" className="mt-6 w-full sm:mt-auto">
                  <a
                    href={`${WHATSAPP}?text=${encodeURIComponent(service.message)}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {service.cta}
                  </a>
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
    </section>
  );
}