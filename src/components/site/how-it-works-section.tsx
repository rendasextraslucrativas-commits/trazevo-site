import {
  MessageCircle,
  ClipboardList,
  MonitorSmartphone,
  CheckCircle2,
  Rocket,
  CalendarClock,
  type LucideIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { SectionTitle } from "./site-shell";

const WHATSAPP = "https://wa.me/5500000000000";
const CTA_MESSAGE = "Olá! Gostaria de conversar sobre a criação de um site para o meu negócio.";

type Step = {
  id: string;
  icon: LucideIcon;
  title: string;
  description: string;
};

const steps: Step[] = [
  {
    id: "contato",
    icon: MessageCircle,
    title: "Primeiro contato",
    description:
      "O cliente entra em contato pelo WhatsApp e informa qual tipo de site precisa, seu segmento e o principal objetivo do projeto.",
  },
  {
    id: "planejamento",
    icon: ClipboardList,
    title: "Planejamento",
    description:
      "Reunimos as informações, referências, textos, imagens e funcionalidades necessárias para definir a estrutura do site.",
  },
  {
    id: "criacao",
    icon: MonitorSmartphone,
    title: "Criação do site",
    description:
      "Desenvolvemos o visual e a estrutura do projeto de acordo com a identidade e os objetivos do negócio.",
  },
  {
    id: "revisao",
    icon: CheckCircle2,
    title: "Revisão e aprovação",
    description:
      "O cliente recebe o projeto para análise e pode solicitar os ajustes previstos no plano contratado.",
  },
  {
    id: "publicacao",
    icon: Rocket,
    title: "Publicação",
    description:
      "Após a aprovação final e a conclusão do pagamento, o site é configurado e publicado no domínio escolhido.",
  },
];

export function HowItWorksSection({
  cmsSteps,
  whatsappUrl,
  title,
  subtitle,
}: {
  cmsSteps?: { id: string; title: string; description: string | null }[];
  whatsappUrl?: string | null;
  title?: string | null;
  subtitle?: string | null;
} = {}) {
  const items: Step[] =
    cmsSteps && cmsSteps.length
      ? cmsSteps.map((s, i) => ({
          id: s.id,
          icon: steps[i % steps.length].icon,
          title: s.title,
          description: s.description ?? "",
        }))
      : steps;
  const ctaHref = whatsappUrl ?? `${WHATSAPP}?text=${encodeURIComponent(CTA_MESSAGE)}`;

  return (
    <section id="como-funciona" className="mx-auto max-w-6xl px-4 py-16 sm:py-20">
      <SectionTitle
        title={title || "Seu site pronto em um processo simples e organizado"}
        subtitle={
          subtitle ||
          "Você acompanha todas as etapas do projeto, desde o planejamento inicial até a publicação do site."
        }
      />

      <ol className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
        {items.map((step, index) => {
          const StepIcon = step.icon;
          return (
            <li
              key={step.id}
              className="animate-in fade-in slide-in-from-bottom-2 relative flex h-full flex-col rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-soft)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-card)] fill-mode-both"
              style={{ animationDelay: `${index * 90}ms`, animationDuration: "500ms" }}
            >
              <span className="absolute -top-3 left-5 grid h-8 w-8 place-items-center rounded-full bg-primary text-sm font-bold text-primary-foreground shadow-[var(--shadow-soft)]">
                {index + 1}
              </span>
              <span className="mt-4 grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-accent text-accent-foreground">
                <StepIcon className="h-5 w-5" aria-hidden />
              </span>
              <p className="mt-4 font-semibold text-brand">{step.title}</p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {step.description}
              </p>
            </li>
          );
        })}
      </ol>

      <div className="mt-10 rounded-2xl border border-border bg-surface p-6 sm:p-8">
        <h3 className="flex items-center gap-2 text-lg font-semibold text-brand">
          <CalendarClock className="h-5 w-5 text-primary" aria-hidden />
          Quando o prazo começa a contar?
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          O prazo de desenvolvimento começa após a confirmação do pagamento inicial e o envio de
          todos os materiais necessários, como textos, imagens, logotipo e informações da empresa.
        </p>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          A demora no envio de materiais ou na aprovação das etapas poderá alterar a data de entrega.
        </p>
      </div>

      <div className="mt-10 rounded-2xl border border-border bg-card p-6 text-center shadow-[var(--shadow-soft)] sm:p-10">
        <h3 className="text-xl font-bold tracking-tight text-brand sm:text-2xl">
          Pronto para começar seu projeto?
        </h3>
        <p className="mx-auto mt-3 max-w-2xl text-sm text-muted-foreground sm:text-base">
          Conte um pouco sobre o seu negócio e receba uma orientação sobre a melhor solução para sua
          empresa.
        </p>
        <Button asChild size="lg" className="mt-6">
          <a
            href={`${WHATSAPP}?text=${encodeURIComponent(CTA_MESSAGE)}`}
            target="_blank"
            rel="noreferrer"
          >
            Falar sobre meu projeto
          </a>
        </Button>
      </div>
    </section>
  );
}
