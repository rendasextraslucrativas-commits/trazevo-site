import { useState, type FormEvent } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  CalendarClock,
  Clock,
  Mail,
  MapPin,
  Menu,
  Phone,
  Scissors,
  Sparkles,
  Timer,
  UserCheck,
  Users,
  X,
  type LucideIcon,
} from "lucide-react";

import { WhatsAppIcon } from "@/components/site/whatsapp-icon";
import heroImg from "@/assets/bravio-hero.jpg";
import interiorImg from "@/assets/bravio-interior.jpg";
import fachadaImg from "@/assets/bravio-fachada.jpg";
import recepcaoImg from "@/assets/bravio-recepcao.jpg";
import cadeirasImg from "@/assets/bravio-cadeiras.jpg";
import esperaImg from "@/assets/bravio-espera.jpg";
import produtosImg from "@/assets/bravio-produtos.jpg";
import atendimentoImg from "@/assets/bravio-atendimento.jpg";

const CANONICAL = "https://sunshine-stack-start.lovable.app/modelos/barbearia-premium";
const TITLE = "Bravio Barbearia | Projeto demonstrativo TRAZEVO";
const DESCRIPTION = "Modelo demonstrativo de site para barbearia desenvolvido pela TRAZEVO.";

const WHATS = "5511999992222";
const wa = (message: string) => `https://wa.me/${WHATS}?text=${encodeURIComponent(message)}`;
const WA_MAIN = wa("Olá! Conheci a Bravio Barbearia pelo site e gostaria de agendar um horário.");

export const Route = createFileRoute("/modelos/barbearia-premium")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: CANONICAL },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex" },
    ],
    links: [{ rel: "canonical", href: CANONICAL }],
  }),
  component: BravioPage,
});

const palette = {
  "--bv-black": "#0C0C0D",
  "--bv-graphite": "#17181A",
  "--bv-line": "#2A2C2F",
  "--bv-sand": "#EFE7DB",
  "--bv-leather": "#7A5236",
  "--bv-gold": "#B99453",
  "--bv-muted": "#A9A29A",
} as React.CSSProperties;

const nav = [
  { label: "Início", href: "#inicio" },
  { label: "Serviços", href: "#servicos" },
  { label: "Profissionais", href: "#profissionais" },
  { label: "Espaço", href: "#espaco" },
  { label: "Avaliações", href: "#valores" },
  { label: "Dúvidas", href: "#duvidas" },
  { label: "Contato", href: "#contato" },
];

const benefits: { icon: LucideIcon; title: string; text: string }[] = [
  {
    icon: UserCheck,
    title: "Atendimento personalizado",
    text: "Cada serviço é realizado considerando seu estilo, suas preferências e sua rotina.",
  },
  {
    icon: Users,
    title: "Profissionais qualificados",
    text: "Uma equipe preparada para oferecer cortes modernos, clássicos e cuidados completos.",
  },
  {
    icon: Sparkles,
    title: "Ambiente confortável",
    text: "Um espaço pensado para você desacelerar, relaxar e cuidar do visual.",
  },
  {
    icon: CalendarClock,
    title: "Agendamento rápido",
    text: "Escolha o serviço e fale diretamente com nossa equipe pelo WhatsApp.",
  },
];

const services = [
  {
    name: "Corte tradicional",
    text: "Corte masculino realizado de acordo com seu estilo e preferência.",
    price: "R$ 50",
  },
  {
    name: "Corte degradê",
    text: "Acabamento moderno com transição precisa e atenção aos detalhes.",
    price: "R$ 60",
  },
  {
    name: "Barba completa",
    text: "Modelagem, acabamento e cuidados para valorizar o formato do rosto.",
    price: "R$ 40",
  },
  {
    name: "Corte e barba",
    text: "Experiência completa para renovar o cabelo e a barba no mesmo atendimento.",
    price: "R$ 85",
  },
  {
    name: "Acabamento",
    text: "Contorno e pequenos ajustes para manter o visual alinhado.",
    price: "R$ 25",
  },
  {
    name: "Cuidado premium",
    text: "Corte, barba, lavagem e finalização em uma experiência completa.",
    price: "R$ 120",
  },
];

const about = [
  "Atendimento com horário marcado",
  "Cortes clássicos e modernos",
  "Produtos profissionais",
  "Ambiente climatizado",
  "Orientação de estilo",
  "Atendimento personalizado",
];

const team = [
  { name: "Lucas Martins", role: "Cortes clássicos e acabamento" },
  { name: "Gabriel Rocha", role: "Degradê e cortes modernos" },
  { name: "Mateus Almeida", role: "Barba e cuidados masculinos" },
];

const gallery = [
  { src: fachadaImg, label: "Fachada", alt: "Fachada escura e moderna da Bravio Barbearia ao entardecer" },
  { src: recepcaoImg, label: "Recepção", alt: "Balcão de recepção em madeira escura com luminária dourada" },
  { src: cadeirasImg, label: "Cadeiras de atendimento", alt: "Cadeiras de barbeiro em couro marrom diante de espelhos" },
  { src: esperaImg, label: "Área de espera", alt: "Sofá de couro escuro na área de espera da barbearia" },
  { src: produtosImg, label: "Espaço de produtos", alt: "Prateleiras com produtos masculinos sem marca em vidros âmbar" },
  { src: atendimentoImg, label: "Atendimento em andamento", alt: "Barbeiro aparando a barba de um cliente com atenção aos detalhes" },
];

const steps = [
  {
    title: "Escolha o serviço",
    text: "Conheça nossas opções e escolha o cuidado ideal para o seu momento.",
  },
  {
    title: "Entre em contato",
    text: "Fale pelo WhatsApp e informe o serviço e o profissional desejado.",
  },
  {
    title: "Escolha o horário",
    text: "Consulte os horários disponíveis e escolha a melhor opção.",
  },
  {
    title: "Compareça ao atendimento",
    text: "Chegue no horário combinado e aproveite sua experiência.",
  },
];

const commitments: { icon: LucideIcon; title: string; text: string }[] = [
  {
    icon: Timer,
    title: "Pontualidade",
    text: "Organização para respeitar o horário de cada cliente.",
  },
  {
    icon: Scissors,
    title: "Atenção aos detalhes",
    text: "Cuidado em cada etapa do corte, da barba e da finalização.",
  },
  {
    icon: Sparkles,
    title: "Experiência confortável",
    text: "Um ambiente tranquilo para você aproveitar seu momento.",
  },
];

const faqs = [
  {
    q: "Preciso agendar antes de ir?",
    a: "O agendamento é recomendado para garantir o horário desejado, já que a disponibilidade depende da agenda do dia.",
  },
  {
    q: "Como faço para escolher um profissional?",
    a: "Basta informar o nome do profissional ao entrar em contato pelo WhatsApp. A confirmação depende da agenda dele.",
  },
  {
    q: "Quais formas de pagamento são aceitas?",
    a: "As condições são combinadas no atendimento. Neste projeto demonstrativo, todas as informações são fictícias.",
  },
  {
    q: "Quanto tempo dura um atendimento?",
    a: "A duração varia conforme o serviço escolhido e é informada no momento do agendamento.",
  },
  {
    q: "A barbearia atende crianças?",
    a: "Sim, mediante agendamento prévio e conforme a disponibilidade da agenda.",
  },
  {
    q: "Posso reagendar meu horário?",
    a: "Sim. Basta avisar com antecedência pelo WhatsApp para verificarmos um novo horário disponível.",
  },
  {
    q: "Os valores apresentados são definitivos?",
    a: "Não. Os valores exibidos são fictícios e utilizados apenas para demonstração deste modelo de site.",
  },
];

const inputClass =
  "w-full rounded-sm border border-[var(--bv-line)] bg-[var(--bv-black)] px-4 py-3 text-base text-[var(--bv-sand)] outline-none transition placeholder:text-[var(--bv-muted)] focus:border-[var(--bv-gold)]";

function BravioLogo() {
  return (
    <a href="#inicio" className="flex items-center gap-3">
      <span
        className="grid h-10 w-10 shrink-0 place-items-center border border-[var(--bv-gold)]/60 text-sm font-bold tracking-widest text-[var(--bv-gold)]"
        aria-hidden
      >
        B
      </span>
      <span className="leading-tight">
        <span className="block text-lg font-extrabold uppercase tracking-[0.18em] text-[var(--bv-sand)]">
          Bravio
        </span>
        <span className="block text-[10px] uppercase tracking-[0.4em] text-[var(--bv-muted)]">
          Barbearia
        </span>
      </span>
    </a>
  );
}

function BravioPage() {
  const [open, setOpen] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const next: Record<string, string> = {};
    const nome = String(data.get("nome") ?? "").trim();
    const whatsapp = String(data.get("whatsapp") ?? "").trim();
    const servico = String(data.get("servico") ?? "").trim();

    if (nome.length < 2) next.nome = "Informe seu nome.";
    if (whatsapp.replace(/\D/g, "").length < 10) next.whatsapp = "Informe um WhatsApp válido.";
    if (!servico) next.servico = "Selecione um serviço.";

    setErrors(next);
    if (Object.keys(next).length === 0) {
      setSent(true);
      form.reset();
    }
  }

  return (
    <div
      style={palette}
      className="min-h-screen bg-[var(--bv-black)] font-sans text-[var(--bv-sand)] antialiased [scroll-behavior:smooth]"
    >
      <div className="fixed inset-x-0 top-0 z-50">
        <p className="border-b border-[var(--bv-line)] bg-[var(--bv-graphite)] px-4 py-2 text-center text-[11px] leading-snug text-[var(--bv-muted)] sm:text-xs">
          Projeto demonstrativo desenvolvido pela TRAZEVO. Todas as informações apresentadas são
          fictícias.
        </p>

        <header className="border-b border-[var(--bv-line)] bg-[var(--bv-black)]/95 backdrop-blur">
          <div className="mx-auto grid max-w-6xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-4 py-3 xl:flex xl:justify-between">
            <BravioLogo />

            <nav aria-label="Navegação principal" className="hidden items-center gap-5 xl:flex">
              {nav.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--bv-muted)] transition hover:text-[var(--bv-gold)]"
                >
                  {item.label}
                </a>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              <a
                href={WA_MAIN}
                target="_blank"
                rel="noreferrer"
                className="hidden rounded-sm bg-[var(--bv-gold)] px-5 py-2.5 text-sm font-bold uppercase tracking-wide text-[var(--bv-black)] transition hover:brightness-110 sm:inline-flex"
              >
                Agendar horário
              </a>
              <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                aria-expanded={open}
                aria-label={open ? "Fechar menu" : "Abrir menu"}
                className="grid h-11 w-11 shrink-0 place-items-center rounded-sm border border-[var(--bv-line)] text-[var(--bv-sand)] xl:hidden"
              >
                {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>

          {open ? (
            <nav
              aria-label="Navegação mobile"
              className="border-t border-[var(--bv-line)] bg-[var(--bv-graphite)] xl:hidden"
            >
              <ul className="mx-auto max-w-6xl px-4 py-3">
                {nav.map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="block rounded-sm px-3 py-3 text-base font-medium text-[var(--bv-sand)] hover:bg-[var(--bv-line)]"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
                <li className="pt-2">
                  <a
                    href={WA_MAIN}
                    target="_blank"
                    rel="noreferrer"
                    className="block rounded-sm bg-[var(--bv-gold)] px-4 py-3 text-center text-base font-bold uppercase text-[var(--bv-black)]"
                  >
                    Agendar horário
                  </a>
                </li>
              </ul>
            </nav>
          ) : null}
        </header>
      </div>

      <main className="pt-[124px] sm:pt-[116px]">
        {/* Hero */}
        <section id="inicio" className="scroll-mt-32 border-b border-[var(--bv-line)]">
          <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-14 sm:py-20 lg:grid-cols-2">
            <div>
              <span className="inline-flex rounded-sm border border-[var(--bv-gold)]/40 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.25em] text-[var(--bv-gold)]">
                Estilo, precisão e personalidade
              </span>
              <h1 className="mt-6 text-3xl font-extrabold uppercase leading-[1.1] tracking-tight sm:text-4xl lg:text-5xl">
                Seu estilo merece precisão em cada detalhe.
              </h1>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-[var(--bv-muted)] sm:text-lg">
                Cortes, barba e cuidados masculinos em um ambiente preparado para você relaxar e
                renovar o visual.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href={WA_MAIN}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center rounded-sm bg-[var(--bv-gold)] px-7 py-4 text-base font-bold uppercase tracking-wide text-[var(--bv-black)] transition hover:brightness-110"
                >
                  Agendar meu horário
                </a>
                <a
                  href="#servicos"
                  className="inline-flex items-center justify-center rounded-sm border border-[var(--bv-line)] px-7 py-4 text-base font-bold uppercase tracking-wide text-[var(--bv-sand)] transition hover:border-[var(--bv-gold)] hover:text-[var(--bv-gold)]"
                >
                  Conhecer serviços
                </a>
              </div>
            </div>
            <div className="overflow-hidden rounded-sm border border-[var(--bv-line)]">
              <img
                src={heroImg}
                alt="Barbeiro realizando um corte masculino em barbearia moderna com iluminação quente"
                width={1408}
                height={1008}
                fetchPriority="high"
                decoding="async"
                className="aspect-[7/5] w-full object-cover"
              />
            </div>
          </div>
        </section>

        {/* Benefícios */}
        <section className="bg-[var(--bv-graphite)]">
          <div className="mx-auto max-w-6xl px-4 py-14 sm:py-16">
            <h2 className="sr-only">Benefícios da barbearia</h2>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {benefits.map((item) => (
                <div
                  key={item.title}
                  className="rounded-sm border border-[var(--bv-line)] bg-[var(--bv-black)] p-6 transition duration-300 hover:-translate-y-1 hover:border-[var(--bv-gold)]/50"
                >
                  <span className="grid h-11 w-11 place-items-center rounded-sm border border-[var(--bv-gold)]/40 text-[var(--bv-gold)]">
                    <item.icon className="h-5 w-5" aria-hidden />
                  </span>
                  <h3 className="mt-4 text-base font-bold uppercase tracking-wide">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--bv-muted)]">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Serviços */}
        <section id="servicos" className="scroll-mt-32">
          <div className="mx-auto max-w-6xl px-4 py-16 sm:py-20">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-2xl font-extrabold uppercase tracking-tight sm:text-3xl">
                Serviços e valores
              </h2>
              <p className="mt-3 text-[var(--bv-muted)]">
                Escolha o cuidado ideal e agende diretamente pelo WhatsApp.
              </p>
            </div>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {services.map((item) => (
                <article
                  key={item.name}
                  className="flex flex-col rounded-sm border border-[var(--bv-line)] bg-[var(--bv-graphite)] p-6 transition duration-300 hover:-translate-y-1 hover:border-[var(--bv-gold)]/50"
                >
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-lg font-bold uppercase tracking-wide">{item.name}</h3>
                    <span className="shrink-0 text-lg font-bold text-[var(--bv-gold)]">
                      {item.price}
                    </span>
                  </div>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-[var(--bv-muted)]">
                    {item.text}
                  </p>
                  <a
                    href={wa(`Olá! Gostaria de agendar o serviço ${item.name}.`)}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-6 inline-flex items-center justify-center rounded-sm border border-[var(--bv-gold)]/50 px-5 py-3 text-sm font-bold uppercase tracking-wide text-[var(--bv-gold)] transition hover:bg-[var(--bv-gold)] hover:text-[var(--bv-black)]"
                  >
                    Agendar este serviço
                  </a>
                </article>
              ))}
            </div>
            <p className="mt-6 text-center text-xs text-[var(--bv-muted)]">
              Valores fictícios utilizados exclusivamente neste projeto demonstrativo.
            </p>
          </div>
        </section>

        {/* Sobre */}
        <section className="bg-[var(--bv-graphite)]">
          <div className="mx-auto max-w-6xl px-4 py-16 sm:py-20">
            <div className="grid items-center gap-10 lg:grid-cols-2">
              <div>
                <h2 className="text-2xl font-extrabold uppercase tracking-tight sm:text-3xl">
                  Mais que um corte. Uma experiência.
                </h2>
                <p className="mt-4 leading-relaxed text-[var(--bv-muted)]">
                  A Bravio Barbearia foi criada para oferecer uma experiência de cuidado masculino
                  com atendimento atencioso, ambiente confortável e atenção a cada detalhe. Nosso
                  objetivo é ajudar cada cliente a encontrar um estilo que combine com sua
                  personalidade.
                </p>
                <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                  {about.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm">
                      <span
                        className="mt-1.5 h-1.5 w-4 shrink-0 bg-[var(--bv-gold)]"
                        aria-hidden
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="overflow-hidden rounded-sm border border-[var(--bv-line)]">
                <img
                  src={interiorImg}
                  alt="Interior elegante da Bravio Barbearia com cadeiras de couro e iluminação quente"
                  width={1200}
                  height={912}
                  loading="lazy"
                  decoding="async"
                  className="aspect-[4/3] w-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Profissionais */}
        <section id="profissionais" className="scroll-mt-32">
          <div className="mx-auto max-w-6xl px-4 py-16 sm:py-20">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-2xl font-extrabold uppercase tracking-tight sm:text-3xl">
                Profissionais
              </h2>
            </div>
            <div className="mt-10 grid gap-6 sm:grid-cols-3">
              {team.map((person) => (
                <div
                  key={person.name}
                  className="rounded-sm border border-[var(--bv-line)] bg-[var(--bv-graphite)] p-6 text-center"
                >
                  <span className="mx-auto grid h-16 w-16 place-items-center rounded-sm border border-[var(--bv-gold)]/40 text-xl font-bold text-[var(--bv-gold)]">
                    {person.name
                      .split(" ")
                      .map((w) => w[0])
                      .join("")
                      .slice(0, 2)}
                  </span>
                  <h3 className="mt-4 text-base font-bold uppercase tracking-wide">{person.name}</h3>
                  <p className="mt-1 text-sm text-[var(--bv-muted)]">{person.role}</p>
                  <a
                    href={wa(`Olá! Gostaria de agendar um horário com ${person.name}.`)}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-5 inline-flex w-full items-center justify-center rounded-sm border border-[var(--bv-gold)]/50 px-4 py-3 text-sm font-bold uppercase tracking-wide text-[var(--bv-gold)] transition hover:bg-[var(--bv-gold)] hover:text-[var(--bv-black)]"
                  >
                    Agendar com este profissional
                  </a>
                </div>
              ))}
            </div>
            <p className="mt-6 text-center text-xs text-[var(--bv-muted)]">
              Profissionais apresentados neste projeto são fictícios e utilizados exclusivamente
              para demonstração.
            </p>
          </div>
        </section>

        {/* Espaço */}
        <section id="espaco" className="scroll-mt-32 bg-[var(--bv-graphite)]">
          <div className="mx-auto max-w-6xl px-4 py-16 sm:py-20">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-2xl font-extrabold uppercase tracking-tight sm:text-3xl">
                Um espaço preparado para seu momento.
              </h2>
              <p className="mt-3 text-[var(--bv-muted)]">
                Conforto, personalidade e uma atmosfera pensada para transformar o cuidado com o
                visual em uma experiência completa.
              </p>
            </div>
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {gallery.map((item) => (
                <figure
                  key={item.label}
                  className="overflow-hidden rounded-sm border border-[var(--bv-line)] bg-[var(--bv-black)]"
                >
                  <img
                    src={item.src}
                    alt={item.alt}
                    width={1200}
                    height={912}
                    loading="lazy"
                    decoding="async"
                    className="aspect-[4/3] w-full object-cover transition duration-500 hover:scale-105"
                  />
                  <figcaption className="px-4 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--bv-muted)]">
                    {item.label}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        {/* Como funciona */}
        <section className="mx-auto max-w-6xl px-4 py-16 sm:py-20">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-extrabold uppercase tracking-tight sm:text-3xl">
              Como funciona
            </h2>
          </div>
          <ol className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, index) => (
              <li
                key={step.title}
                className="rounded-sm border border-[var(--bv-line)] bg-[var(--bv-graphite)] p-6"
              >
                <span className="text-2xl font-extrabold text-[var(--bv-gold)]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 text-base font-bold uppercase tracking-wide">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--bv-muted)]">{step.text}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* Valores / compromissos */}
        <section id="valores" className="scroll-mt-32 bg-[var(--bv-graphite)]">
          <div className="mx-auto max-w-6xl px-4 py-16 sm:py-20">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-2xl font-extrabold uppercase tracking-tight sm:text-3xl">
                O que valorizamos em cada atendimento
              </h2>
            </div>
            <div className="mt-10 grid gap-5 sm:grid-cols-3">
              {commitments.map((item) => (
                <div
                  key={item.title}
                  className="rounded-sm border border-[var(--bv-line)] bg-[var(--bv-black)] p-6"
                >
                  <span className="grid h-11 w-11 place-items-center rounded-sm border border-[var(--bv-gold)]/40 text-[var(--bv-gold)]">
                    <item.icon className="h-5 w-5" aria-hidden />
                  </span>
                  <h3 className="mt-4 text-base font-bold uppercase tracking-wide">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--bv-muted)]">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="duvidas" className="scroll-mt-32">
          <div className="mx-auto max-w-3xl px-4 py-16 sm:py-20">
            <div className="text-center">
              <h2 className="text-2xl font-extrabold uppercase tracking-tight sm:text-3xl">
                Perguntas frequentes
              </h2>
            </div>
            <div className="mt-10 space-y-3">
              {faqs.map((faq) => (
                <details
                  key={faq.q}
                  className="group rounded-sm border border-[var(--bv-line)] bg-[var(--bv-graphite)] p-5"
                >
                  <summary className="cursor-pointer list-none text-base font-semibold text-[var(--bv-sand)] marker:hidden">
                    {faq.q}
                  </summary>
                  <p className="mt-3 text-sm leading-relaxed text-[var(--bv-muted)]">{faq.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="border-y border-[var(--bv-line)] bg-[var(--bv-graphite)]">
          <div className="mx-auto max-w-3xl px-4 py-16 text-center sm:py-20">
            <h2 className="text-2xl font-extrabold uppercase tracking-tight sm:text-3xl">
              Pronto para renovar seu estilo?
            </h2>
            <p className="mt-3 text-[var(--bv-muted)]">
              Escolha seu serviço e fale com nossa equipe para agendar um horário.
            </p>
            <a
              href={WA_MAIN}
              target="_blank"
              rel="noreferrer"
              className="mt-8 inline-flex items-center justify-center gap-2 rounded-sm bg-[var(--bv-gold)] px-7 py-4 text-base font-bold uppercase tracking-wide text-[var(--bv-black)] transition hover:brightness-110"
            >
              <WhatsAppIcon className="h-5 w-5" />
              Agendar pelo WhatsApp
            </a>
          </div>
        </section>

        {/* Contato */}
        <section id="contato" className="mx-auto max-w-6xl scroll-mt-32 px-4 py-16 sm:py-20">
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <h2 className="text-2xl font-extrabold uppercase tracking-tight sm:text-3xl">
                Contato
              </h2>
              <p className="mt-3 text-xs text-[var(--bv-muted)]">
                Informações fictícias utilizadas exclusivamente para demonstração.
              </p>
              <ul className="mt-6 space-y-4 text-sm">
                <li className="flex items-center gap-3">
                  <Phone className="h-5 w-5 shrink-0 text-[var(--bv-gold)]" aria-hidden /> (11)
                  99999-2222
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="h-5 w-5 shrink-0 text-[var(--bv-gold)]" aria-hidden />
                  <span className="break-all">contato@braviobarbearia.com.br</span>
                </li>
                <li className="flex items-center gap-3">
                  <Clock className="h-5 w-5 shrink-0 text-[var(--bv-gold)]" aria-hidden /> Terça a
                  sábado, das 9h às 20h
                </li>
                <li className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 shrink-0 text-[var(--bv-gold)]" aria-hidden /> São
                  Paulo — SP
                </li>
              </ul>
            </div>

            <form
              onSubmit={handleSubmit}
              noValidate
              className="rounded-sm border border-[var(--bv-line)] bg-[var(--bv-graphite)] p-6"
            >
              <h3 className="text-lg font-bold uppercase tracking-wide">Solicitar agendamento</h3>
              <div className="mt-5 space-y-4">
                <div>
                  <label htmlFor="nome" className="mb-1.5 block text-sm font-medium">
                    Nome
                  </label>
                  <input id="nome" name="nome" className={inputClass} autoComplete="name" />
                  {errors.nome ? <p className="mt-1 text-xs text-red-400">{errors.nome}</p> : null}
                </div>
                <div>
                  <label htmlFor="whatsapp" className="mb-1.5 block text-sm font-medium">
                    WhatsApp
                  </label>
                  <input
                    id="whatsapp"
                    name="whatsapp"
                    inputMode="tel"
                    className={inputClass}
                    autoComplete="tel"
                  />
                  {errors.whatsapp ? (
                    <p className="mt-1 text-xs text-red-400">{errors.whatsapp}</p>
                  ) : null}
                </div>
                <div>
                  <label htmlFor="servico" className="mb-1.5 block text-sm font-medium">
                    Serviço desejado
                  </label>
                  <select id="servico" name="servico" className={inputClass} defaultValue="">
                    <option value="">Selecione</option>
                    {services.map((s) => (
                      <option key={s.name} value={s.name}>
                        {s.name}
                      </option>
                    ))}
                  </select>
                  {errors.servico ? (
                    <p className="mt-1 text-xs text-red-400">{errors.servico}</p>
                  ) : null}
                </div>
                <div>
                  <label htmlFor="profissional" className="mb-1.5 block text-sm font-medium">
                    Profissional desejado
                  </label>
                  <select
                    id="profissional"
                    name="profissional"
                    className={inputClass}
                    defaultValue="Sem preferência"
                  >
                    <option>Sem preferência</option>
                    {team.map((p) => (
                      <option key={p.name}>{p.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="dia" className="mb-1.5 block text-sm font-medium">
                    Dia de preferência
                  </label>
                  <input id="dia" name="dia" type="date" className={inputClass} />
                </div>
                <div>
                  <label htmlFor="mensagem" className="mb-1.5 block text-sm font-medium">
                    Mensagem
                  </label>
                  <textarea id="mensagem" name="mensagem" rows={4} className={inputClass} />
                </div>
                <button
                  type="submit"
                  className="w-full rounded-sm bg-[var(--bv-gold)] px-6 py-4 text-base font-bold uppercase tracking-wide text-[var(--bv-black)] transition hover:brightness-110"
                >
                  Solicitar agendamento
                </button>
                <p className="text-xs text-[var(--bv-muted)]">
                  {sent
                    ? "Formulário demonstrativo: nenhum dado é enviado ou armazenado."
                    : "Formulário demonstrativo. Nenhum dado é enviado ou armazenado."}
                </p>
              </div>
            </form>
          </div>
        </section>
      </main>

      <footer className="border-t border-[var(--bv-line)] bg-[var(--bv-graphite)]">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:grid-cols-2">
          <div>
            <p className="text-xl font-extrabold uppercase tracking-[0.18em]">Bravio Barbearia</p>
            <p className="mt-2 text-sm text-[var(--bv-muted)]">Estilo, precisão e personalidade.</p>
          </div>
          <nav aria-label="Links do rodapé">
            <ul className="grid grid-cols-2 gap-2 text-sm text-[var(--bv-muted)]">
              <li><a href="#inicio" className="hover:text-[var(--bv-gold)]">Início</a></li>
              <li><a href="#servicos" className="hover:text-[var(--bv-gold)]">Serviços</a></li>
              <li><a href="#profissionais" className="hover:text-[var(--bv-gold)]">Profissionais</a></li>
              <li><a href="#espaco" className="hover:text-[var(--bv-gold)]">Espaço</a></li>
              <li><a href="#duvidas" className="hover:text-[var(--bv-gold)]">Dúvidas</a></li>
              <li><a href="#contato" className="hover:text-[var(--bv-gold)]">Contato</a></li>
              <li>
                <Link to="/politica-de-privacidade" className="hover:text-[var(--bv-gold)]">
                  Política de Privacidade
                </Link>
              </li>
            </ul>
          </nav>
        </div>
        <div className="border-t border-[var(--bv-line)]">
          <div className="mx-auto max-w-6xl space-y-1 px-4 py-6 text-xs text-[var(--bv-muted)]">
            <p>
              Projeto conceitual desenvolvido pela{" "}
              <Link to="/" className="font-semibold text-[var(--bv-gold)] underline">
                TRAZEVO
              </Link>
              .
            </p>
            <p>
              Este site é uma demonstração. Nomes, profissionais, preços, contatos e informações são
              fictícios.
            </p>
          </div>
        </div>
      </footer>

      <a
        href={WA_MAIN}
        target="_blank"
        rel="noreferrer"
        aria-label="Falar pelo WhatsApp"
        className="fixed bottom-5 right-5 z-50 grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-lg transition hover:brightness-105"
      >
        <WhatsAppIcon className="h-6 w-6" />
      </a>
    </div>
  );
}
