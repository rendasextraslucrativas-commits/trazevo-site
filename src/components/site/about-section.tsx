import { Handshake, Smartphone, Sparkles, Target } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import workspaceImg from "@/assets/sobre-nos-workspace.jpg";
import { WhatsAppIcon } from "./whatsapp-icon";

const WHATSAPP_LINK =
  "https://wa.me/5500000000000?text=" +
  encodeURIComponent(
    "Olá! Gostaria de conversar sobre a criação de um site para o meu negócio.",
  );

const differentials = [
  {
    icon: Handshake,
    title: "Atendimento próximo",
    text: "Conversamos com o cliente para entender o negócio, os objetivos e as necessidades do projeto.",
  },
  {
    icon: Sparkles,
    title: "Projetos personalizados",
    text: "Cada site é adaptado à identidade, ao segmento e à estratégia da empresa.",
  },
  {
    icon: Smartphone,
    title: "Experiência no celular",
    text: "Todos os projetos são desenvolvidos para funcionar corretamente em computadores, tablets e celulares.",
  },
  {
    icon: Target,
    title: "Foco em oportunidades",
    text: "Organizamos o conteúdo para facilitar o entendimento dos serviços e incentivar o contato pelo WhatsApp.",
  },
];

const values = [
  "Transparência",
  "Compromisso",
  "Organização",
  "Comunicação clara",
  "Qualidade visual",
  "Respeito aos prazos e acordos",
  "Melhoria contínua",
];

export function AboutSection() {
  return (
    <section id="sobre-nos" className="border-y border-ink bg-ink text-ink-foreground">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:py-20">
        <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-14">
          <div className="order-2 lg:order-1">
            <div className="overflow-hidden rounded-2xl border border-border bg-background shadow-sm animate-in fade-in duration-700">
              <img
                src={workspaceImg}
                alt="Computador exibindo o layout de um site em desenvolvimento sobre uma mesa de trabalho"
                loading="lazy"
                width={1280}
                height={1024}
                className="h-full w-full object-cover"
              />
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <Card className="border-border/70">
                <CardContent className="p-5">
                  <h3 className="text-sm font-semibold uppercase tracking-wide text-primary">
                    Nossa missão
                  </h3>
                  <p className="mt-2 text-sm text-ink-muted">
                    Ajudar empresas e profissionais a apresentarem seus negócios na internet de
                    maneira clara, moderna e confiável.
                  </p>
                </CardContent>
              </Card>
              <Card className="border-border/70">
                <CardContent className="p-5">
                  <h3 className="text-sm font-semibold uppercase tracking-wide text-primary">
                    Nossa visão
                  </h3>
                  <p className="mt-2 text-sm text-ink-muted">
                    Tornar a criação de sites mais acessível, organizada e estratégica para pequenos
                    negócios de diferentes segmentos.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <p className="text-xs font-semibold uppercase tracking-widest text-primary">Sobre nós</p>
            <h2 className="mt-3 text-2xl font-bold leading-tight tracking-tight text-ink-foreground sm:text-3xl lg:text-4xl">
              Criamos sites para transformar ideias em presença digital
            </h2>
            <div className="mt-5 space-y-4 text-base text-ink-muted">
              <p>
                Nossa agência nasceu com o objetivo de ajudar pequenos negócios, profissionais e
                empresas a construírem uma presença digital mais profissional.
              </p>
              <p>
                Desenvolvemos sites modernos, claros e adaptados para celulares, sempre pensando na
                experiência do visitante e na facilidade de contato com a empresa.
              </p>
              <p>
                Cada projeto é planejado de acordo com o segmento, os objetivos e a realidade de cada
                negócio. Mais do que criar páginas bonitas, buscamos desenvolver ferramentas que
                transmitam confiança, apresentem serviços e gerem novas oportunidades.
              </p>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {differentials.map(({ icon: Icon, title, text }) => (
                <div
                  key={title}
                  className="rounded-xl border border-white/15 bg-white/5 p-5 transition-colors hover:border-accent/50"
                >
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <h3 className="mt-3 text-base font-semibold text-ink-foreground">{title}</h3>
                  <p className="mt-1.5 text-sm text-ink-muted">{text}</p>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-primary">
                Nossos valores
              </h3>
              <ul className="mt-3 flex flex-wrap gap-2">
                {values.map((value) => (
                  <li
                    key={value}
                    className="rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-sm text-ink-muted"
                  >
                    {value}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 rounded-2xl border border-white/15 bg-white/5 p-6 text-center sm:p-10">
          <h3 className="text-xl font-bold tracking-tight text-ink-foreground sm:text-2xl">
            Vamos construir a presença digital do seu negócio?
          </h3>
          <p className="mx-auto mt-3 max-w-2xl text-ink-muted">
            Conte sua ideia e descubra qual tipo de site combina melhor com os objetivos da sua
            empresa.
          </p>
          <div className="mt-6">
            <Button asChild size="lg">
              <a href={WHATSAPP_LINK} target="_blank" rel="noreferrer">
                <WhatsAppIcon className="mr-2 h-4 w-4" />
                Conversar sobre meu projeto
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}