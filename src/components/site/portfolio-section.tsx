import { Link } from "@tanstack/react-router";
import { ArrowRight, Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import { SectionTitle } from "./site-shell";

import odontoImg from "@/assets/demo-odonto-hero.jpg";
import essenzaImg from "@/assets/essenza-hero.jpg";
import bravioImg from "@/assets/bravio-hero.jpg";
import solarisImg from "@/assets/solaris-hero.jpg";
import contabilImg from "@/assets/prime-contabil-hero.jpg";
import vilaImg from "@/assets/vila-hero.jpg";

const WHATSAPP = "https://wa.me/5500000000000";
const SECTION_CTA_MESSAGE =
  "Olá! Não encontrei meu segmento no portfólio e gostaria de conversar sobre a criação do meu site.";

type PortfolioItem = {
  id: string;
  to: string;
  image: string;
  alt: string;
  category: string;
  name: string;
  description: string;
  features: string[];
};

const items: PortfolioItem[] = [
  {
    id: "odonto",
    to: "/modelos/clinica-odontologica",
    image: odontoImg,
    alt: "Prévia do projeto demonstrativo de clínica odontológica",
    category: "Saúde e odontologia",
    name: "Clínica Sorriso",
    description:
      "Site profissional para apresentar tratamentos, especialistas, localização e facilitar o agendamento pelo WhatsApp.",
    features: ["Apresentação dos tratamentos", "Perfil dos profissionais", "Agendamento pelo WhatsApp"],
  },
  {
    id: "estetica",
    to: "/modelos/clinica-estetica",
    image: essenzaImg,
    alt: "Prévia do projeto demonstrativo de clínica de estética",
    category: "Estética e beleza",
    name: "Essenza Estética",
    description:
      "Site elegante para apresentar procedimentos, resultados, equipe e canais de agendamento.",
    features: ["Catálogo de procedimentos", "Galeria de resultados", "Botão de agendamento"],
  },
  {
    id: "barbearia",
    to: "/modelos/barbearia-premium",
    image: bravioImg,
    alt: "Prévia do projeto demonstrativo de barbearia",
    category: "Beleza masculina",
    name: "Barber Prime",
    description:
      "Site moderno para apresentar serviços, profissionais, localização, horários e agendamentos.",
    features: ["Lista de serviços", "Apresentação da equipe", "Reserva pelo WhatsApp"],
  },
  {
    id: "solar",
    to: "/modelos/energia-solar",
    image: solarisImg,
    alt: "Prévia do projeto demonstrativo de energia solar",
    category: "Energia e construção",
    name: "Solarize Energia",
    description:
      "Site empresarial para explicar soluções de energia solar e receber pedidos de orçamento.",
    features: ["Apresentação das soluções", "Simulação de economia", "Solicitação de orçamento"],
  },
  {
    id: "contabilidade",
    to: "/modelos/contabilidade",
    image: contabilImg,
    alt: "Prévia do projeto demonstrativo de escritório de contabilidade",
    category: "Serviços profissionais",
    name: "Prime Contábil",
    description:
      "Site institucional para apresentar serviços contábeis, transmitir credibilidade e captar empresas interessadas.",
    features: ["Áreas de atendimento", "Apresentação do escritório", "Formulário de contato"],
  },
  {
    id: "restaurante",
    to: "/modelos/restaurante-cardapio-digital",
    image: vilaImg,
    alt: "Prévia do projeto demonstrativo de restaurante com cardápio digital",
    category: "Alimentação e delivery",
    name: "Sabor da Casa",
    description:
      "Site para apresentar o restaurante, o cardápio, os horários e os canais de pedido.",
    features: ["Cardápio digital", "Informações de funcionamento", "Pedidos pelo WhatsApp"],
  },
];

export function PortfolioSection() {
  return (
    <section id="portfolio" className="mx-auto max-w-6xl px-4 py-16 sm:py-20">
      <SectionTitle
        title="Projetos criados para diferentes tipos de negócios"
        subtitle="Explore alguns projetos demonstrativos e veja como um site profissional pode apresentar serviços, transmitir confiança e facilitar o contato com novos clientes."
      />
      <p className="mx-auto mt-3 max-w-2xl text-center text-xs leading-relaxed text-muted-foreground">
        Os projetos abaixo são demonstrações conceituais criadas para apresentar possibilidades de
        estrutura, design e navegação.
      </p>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <article
            key={item.id}
            className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card"
          >
            <div className="bg-surface p-4">
              <div className="overflow-hidden rounded-xl border border-border bg-background">
                <div className="flex items-center gap-1.5 border-b border-border bg-card px-3 py-2">
                  <span className="h-2 w-2 rounded-full bg-muted-foreground/40" />
                  <span className="h-2 w-2 rounded-full bg-muted-foreground/40" />
                  <span className="h-2 w-2 rounded-full bg-muted-foreground/40" />
                </div>
                <img
                  src={item.image}
                  alt={item.alt}
                  width={1280}
                  height={800}
                  loading="lazy"
                  className="aspect-[16/10] w-full object-cover"
                />
              </div>
            </div>
            <div className="flex flex-1 flex-col px-5 pb-5">
              <p className="text-xs font-semibold uppercase tracking-widest text-primary">
                {item.category}
              </p>
              <h3 className="mt-2 text-lg font-semibold text-brand">{item.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {item.description}
              </p>
              <ul className="mt-4 space-y-1.5 text-sm">
                {item.features.map((feature) => (
                  <li key={feature} className="flex min-w-0 gap-2 text-muted-foreground">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Button asChild className="mt-6 w-full sm:mt-auto">
                <Link to={item.to} target="_blank">
                  Visualizar projeto
                  <ArrowRight className="ml-1 h-4 w-4" aria-hidden />
                </Link>
              </Button>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-12 rounded-2xl border border-border bg-surface p-6 text-center sm:p-10">
        <h3 className="text-xl font-bold tracking-tight text-brand sm:text-2xl">
          Não encontrou um projeto do seu segmento?
        </h3>
        <p className="mx-auto mt-3 max-w-2xl text-sm text-muted-foreground sm:text-base">
          Desenvolvemos sites para diferentes tipos de negócios. Conte sua ideia e receba uma
          sugestão de estrutura para o seu projeto.
        </p>
        <Button asChild size="lg" className="mt-6">
          <a
            href={`${WHATSAPP}?text=${encodeURIComponent(SECTION_CTA_MESSAGE)}`}
            target="_blank"
            rel="noreferrer"
          >
            Apresentar meu projeto
          </a>
        </Button>
      </div>
    </section>
  );
}
