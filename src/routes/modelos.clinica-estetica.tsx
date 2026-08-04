import { useState, type FormEvent } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Clock,
  Droplets,
  Flower2,
  HandHeart,
  Heart,
  Leaf,
  Mail,
  MapPin,
  Menu,
  Phone,
  ShieldCheck,
  Sparkles,
  Waves,
  X,
  type LucideIcon,
} from "lucide-react";

import { WhatsAppIcon } from "@/components/site/whatsapp-icon";
import heroImg from "@/assets/essenza-hero.jpg";
import recepcaoImg from "@/assets/essenza-recepcao.jpg";
import salaImg from "@/assets/essenza-sala.jpg";
import facialImg from "@/assets/essenza-facial.jpg";
import relaxImg from "@/assets/essenza-relax.jpg";

const CANONICAL = "https://sunshine-stack-start.lovable.app/modelos/clinica-estetica";
const TITLE = "Essenza Clínica de Estética | Projeto demonstrativo SiteFluxo";
const DESCRIPTION =
  "Modelo demonstrativo de site para clínica de estética desenvolvido pela SiteFluxo.";

const WHATS = "5511999991111";
const wa = (message: string) => `https://wa.me/${WHATS}?text=${encodeURIComponent(message)}`;
const WA_MAIN = wa(
  "Olá! Conheci a Essenza Estética pelo site e gostaria de agendar uma avaliação.",
);

export const Route = createFileRoute("/modelos/clinica-estetica")({
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
  component: EssenzaPage,
});

const palette = {
  "--ess-bg": "#FBF8F4",
  "--ess-sand": "#F2E9DF",
  "--ess-rose": "#D8A9A0",
  "--ess-rose-soft": "#F6E7E3",
  "--ess-brown": "#6B4F44",
  "--ess-brown-deep": "#4A362E",
  "--ess-sage": "#8FA58C",
  "--ess-text": "#5B4B43",
} as React.CSSProperties;

const nav = [
  { label: "Início", href: "#inicio" },
  { label: "Procedimentos", href: "#procedimentos" },
  { label: "Sobre", href: "#sobre" },
  { label: "Diferenciais", href: "#diferenciais" },
  { label: "Dúvidas", href: "#duvidas" },
  { label: "Contato", href: "#contato" },
];

const benefits: { icon: LucideIcon; title: string; text: string }[] = [
  {
    icon: HandHeart,
    title: "Atendimento personalizado",
    text: "Cada atendimento é planejado de acordo com as necessidades e os objetivos de cada pessoa.",
  },
  {
    icon: ShieldCheck,
    title: "Procedimentos seguros",
    text: "Protocolos cuidadosamente planejados para proporcionar mais conforto e segurança.",
  },
  {
    icon: Sparkles,
    title: "Tecnologia moderna",
    text: "Recursos modernos utilizados para oferecer uma experiência mais completa.",
  },
  {
    icon: Leaf,
    title: "Ambiente acolhedor",
    text: "Um espaço preparado para proporcionar tranquilidade, cuidado e bem-estar.",
  },
];

const procedures: { icon: LucideIcon; name: string; text: string }[] = [
  {
    icon: Droplets,
    name: "Limpeza de pele",
    text: "Cuidado completo para remover impurezas e melhorar a aparência e a textura da pele.",
  },
  {
    icon: Flower2,
    name: "Hidratação facial",
    text: "Tratamento pensado para recuperar a hidratação, a luminosidade e o conforto da pele.",
  },
  {
    icon: HandHeart,
    name: "Massagem modeladora",
    text: "Procedimento manual voltado ao cuidado corporal e à sensação de bem-estar.",
  },
  {
    icon: Waves,
    name: "Drenagem linfática",
    text: "Técnica manual realizada de maneira cuidadosa para favorecer o conforto corporal.",
  },
  {
    icon: Sparkles,
    name: "Peeling facial",
    text: "Procedimento estético que auxilia na renovação e na melhora da aparência da pele.",
  },
  {
    icon: Heart,
    name: "Tratamentos personalizados",
    text: "Combinação de cuidados definida após uma avaliação individual.",
  },
];

const about = [
  "Atendimento individual",
  "Avaliação personalizada",
  "Ambiente confortável",
  "Protocolos cuidadosamente planejados",
  "Comunicação clara",
  "Acompanhamento em cada etapa",
];

const differentials = [
  {
    title: "Avaliação cuidadosa",
    text: "Antes de qualquer procedimento, buscamos compreender suas necessidades e objetivos.",
  },
  {
    title: "Plano personalizado",
    text: "Os cuidados são definidos considerando as características individuais de cada pessoa.",
  },
  {
    title: "Experiência acolhedora",
    text: "Todo o atendimento é pensado para proporcionar conforto e tranquilidade.",
  },
  {
    title: "Orientações claras",
    text: "Explicamos cada etapa para que você se sinta segura durante o atendimento.",
  },
];

const team = [
  { name: "Juliana Martins", role: "Especialista em estética facial" },
  { name: "Fernanda Alves", role: "Especialista em estética corporal" },
];

const gallery = [
  { src: recepcaoImg, label: "Recepção", alt: "Recepção elegante da Essenza Clínica de Estética" },
  { src: salaImg, label: "Sala de atendimento", alt: "Sala de atendimento com maca e decoração minimalista" },
  { src: facialImg, label: "Espaço de cuidados faciais", alt: "Espaço dedicado a cuidados faciais com bancada e espelho" },
  { src: relaxImg, label: "Ambiente de relaxamento", alt: "Ambiente de relaxamento com poltrona confortável e luz suave" },
];

const steps = [
  {
    title: "Entre em contato",
    text: "Fale com nossa equipe pelo WhatsApp e informe o procedimento do seu interesse.",
  },
  {
    title: "Faça sua avaliação",
    text: "Conversamos sobre suas necessidades, expectativas e possíveis cuidados.",
  },
  {
    title: "Receba sua orientação",
    text: "Apresentamos as opções disponíveis e explicamos cada etapa.",
  },
  {
    title: "Agende seu atendimento",
    text: "Escolha o melhor dia e horário para iniciar seus cuidados.",
  },
];

const faqs = [
  {
    q: "Como faço para agendar uma avaliação?",
    a: "Basta enviar uma mensagem pelo WhatsApp ou preencher o formulário de contato. Nossa equipe retorna para combinar o melhor dia e horário.",
  },
  {
    q: "Qual procedimento é mais indicado para mim?",
    a: "Isso só pode ser definido após uma avaliação individual, pois cada caso é único e depende das características e dos objetivos de cada pessoa.",
  },
  {
    q: "Os resultados são iguais para todas as pessoas?",
    a: "Não. Os resultados podem variar de acordo com cada organismo, rotina e histórico de cuidados. Não existem garantias de resultado.",
  },
  {
    q: "Quanto tempo dura cada atendimento?",
    a: "A duração varia conforme o procedimento escolhido e é informada durante a avaliação.",
  },
  {
    q: "Quais formas de pagamento são aceitas?",
    a: "As condições são apresentadas no atendimento. Como este é um projeto demonstrativo, os valores e formas de pagamento são fictícios.",
  },
  {
    q: "Posso tirar dúvidas pelo WhatsApp?",
    a: "Sim. Você pode enviar suas dúvidas pelo WhatsApp, lembrando que orientações específicas dependem de uma avaliação presencial.",
  },
  {
    q: "Existe alguma preparação antes do procedimento?",
    a: "As orientações de preparo dependem do procedimento escolhido e são explicadas de forma clara antes do atendimento.",
  },
];

const inputClass =
  "w-full rounded-xl border border-[var(--ess-sand)] bg-white px-4 py-3 text-base text-[var(--ess-text)] outline-none transition focus:border-[var(--ess-rose)] focus:ring-2 focus:ring-[var(--ess-rose)]/30";

function EssenzaLogo() {
  return (
    <a href="#inicio" className="flex items-center gap-2.5">
      <span
        className="grid h-10 w-10 place-items-center rounded-full bg-[var(--ess-rose-soft)] text-[var(--ess-brown)]"
        aria-hidden
      >
        <Leaf className="h-5 w-5" />
      </span>
      <span className="leading-tight">
        <span className="block font-serif text-lg tracking-wide text-[var(--ess-brown-deep)]">
          Essenza
        </span>
        <span className="block text-[11px] uppercase tracking-[0.28em] text-[var(--ess-sage)]">
          Estética
        </span>
      </span>
    </a>
  );
}

function EssenzaPage() {
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
    const procedimento = String(data.get("procedimento") ?? "").trim();

    if (nome.length < 2) next.nome = "Informe seu nome.";
    if (whatsapp.replace(/\D/g, "").length < 10) next.whatsapp = "Informe um WhatsApp válido.";
    if (!procedimento) next.procedimento = "Selecione um procedimento.";

    setErrors(next);
    if (Object.keys(next).length === 0) {
      setSent(true);
      form.reset();
    }
  }

  return (
    <div
      style={palette}
      className="min-h-screen bg-[var(--ess-bg)] font-sans text-[var(--ess-text)] antialiased [scroll-behavior:smooth]"
    >
      <div className="fixed inset-x-0 top-0 z-50">
        <p className="bg-[var(--ess-brown-deep)] px-4 py-2 text-center text-[11px] leading-snug text-white/85 sm:text-xs">
          Projeto demonstrativo desenvolvido pela SiteFluxo. Todas as informações apresentadas são
          fictícias.
        </p>

        <header className="border-b border-[var(--ess-sand)] bg-[var(--ess-bg)]/95 backdrop-blur">
          <div className="mx-auto grid max-w-6xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-4 py-3">
            <EssenzaLogo />

            <nav aria-label="Navegação principal" className="hidden items-center gap-6 lg:flex">
              {nav.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-sm font-medium text-[var(--ess-text)]/80 transition hover:text-[var(--ess-brown-deep)]"
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
                className="hidden rounded-full bg-[var(--ess-brown)] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[var(--ess-brown-deep)] sm:inline-flex"
              >
                Agendar avaliação
              </a>
              <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                aria-expanded={open}
                aria-label={open ? "Fechar menu" : "Abrir menu"}
                className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-[var(--ess-sand)] text-[var(--ess-brown-deep)] lg:hidden"
              >
                {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>

          {open ? (
            <nav aria-label="Navegação mobile" className="border-t border-[var(--ess-sand)] bg-[var(--ess-bg)] lg:hidden">
              <ul className="mx-auto max-w-6xl px-4 py-3">
                {nav.map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="block rounded-xl px-3 py-3 text-base font-medium text-[var(--ess-text)] hover:bg-[var(--ess-sand)]"
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
                    className="block rounded-full bg-[var(--ess-brown)] px-4 py-3 text-center text-base font-semibold text-white"
                  >
                    Agendar avaliação
                  </a>
                </li>
              </ul>
            </nav>
          ) : null}
        </header>
      </div>

      <main className="pt-[124px] sm:pt-[116px]">
        {/* Hero */}
        <section id="inicio" className="scroll-mt-32">
          <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-14 sm:py-20 lg:grid-cols-2">
            <div>
              <span className="inline-flex rounded-full bg-[var(--ess-rose-soft)] px-4 py-1.5 text-xs font-medium tracking-wide text-[var(--ess-brown)]">
                Beleza, cuidado e confiança em cada detalhe.
              </span>
              <h1 className="mt-6 font-serif text-3xl leading-tight text-[var(--ess-brown-deep)] sm:text-4xl lg:text-5xl">
                Realce sua beleza com cuidado, segurança e naturalidade.
              </h1>
              <p className="mt-5 max-w-xl text-base leading-relaxed sm:text-lg">
                Procedimentos estéticos personalizados para valorizar sua beleza e proporcionar
                mais confiança em cada fase da sua jornada.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href={WA_MAIN}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center rounded-full bg-[var(--ess-brown)] px-7 py-4 text-base font-semibold text-white shadow-sm transition hover:bg-[var(--ess-brown-deep)]"
                >
                  Agendar uma avaliação
                </a>
                <a
                  href="#procedimentos"
                  className="inline-flex items-center justify-center rounded-full border border-[var(--ess-brown)]/25 bg-white px-7 py-4 text-base font-semibold text-[var(--ess-brown-deep)] transition hover:bg-[var(--ess-sand)]"
                >
                  Conhecer procedimentos
                </a>
              </div>
            </div>
            <div className="overflow-hidden rounded-[2rem] shadow-lg shadow-[var(--ess-sand)]">
              <img
                src={heroImg}
                alt="Profissional de estética conversando com uma cliente em ambiente acolhedor"
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
        <section className="mx-auto max-w-6xl px-4 py-12 sm:py-16">
          <h2 className="sr-only">Benefícios da clínica</h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map((item) => (
              <div
                key={item.title}
                className="rounded-3xl border border-[var(--ess-sand)] bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md"
              >
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-[var(--ess-rose-soft)] text-[var(--ess-brown)]">
                  <item.icon className="h-5 w-5" aria-hidden />
                </span>
                <h3 className="mt-4 font-serif text-lg text-[var(--ess-brown-deep)]">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Procedimentos */}
        <section id="procedimentos" className="scroll-mt-32 bg-[var(--ess-sand)]/60">
          <div className="mx-auto max-w-6xl px-4 py-16 sm:py-20">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="font-serif text-2xl text-[var(--ess-brown-deep)] sm:text-3xl">
                Procedimentos
              </h2>
              <p className="mt-3">
                Cuidados estéticos definidos após uma avaliação individual.
              </p>
            </div>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {procedures.map((item) => (
                <article
                  key={item.name}
                  className="flex flex-col rounded-3xl bg-white p-6 shadow-sm ring-1 ring-[var(--ess-sand)] transition duration-300 hover:-translate-y-1 hover:shadow-md"
                >
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-[var(--ess-rose-soft)] text-[var(--ess-brown)]">
                    <item.icon className="h-5 w-5" aria-hidden />
                  </span>
                  <h3 className="mt-4 font-serif text-xl text-[var(--ess-brown-deep)]">
                    {item.name}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed">{item.text}</p>
                  <a
                    href={wa(
                      `Olá! Gostaria de receber mais informações sobre ${item.name.toLowerCase()}.`,
                    )}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-6 inline-flex items-center justify-center rounded-full border border-[var(--ess-brown)]/25 px-5 py-3 text-sm font-semibold text-[var(--ess-brown)] transition hover:bg-[var(--ess-rose-soft)]"
                  >
                    Quero saber mais
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Sobre */}
        <section id="sobre" className="mx-auto max-w-6xl scroll-mt-32 px-4 py-16 sm:py-20">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div className="overflow-hidden rounded-[2rem] shadow-lg shadow-[var(--ess-sand)]">
              <img
                src={recepcaoImg}
                alt="Recepção elegante e minimalista da Essenza Clínica de Estética"
                width={1200}
                height={912}
                loading="lazy"
                decoding="async"
                className="aspect-[4/3] w-full object-cover"
              />
            </div>
            <div>
              <h2 className="font-serif text-2xl text-[var(--ess-brown-deep)] sm:text-3xl">
                Um espaço criado para cuidar de você.
              </h2>
              <p className="mt-4 leading-relaxed">
                A Essenza Estética nasceu com o propósito de oferecer uma experiência de cuidado
                mais tranquila, personalizada e acolhedora. Cada atendimento começa com uma conversa
                para compreender as necessidades, os objetivos e as expectativas de cada pessoa.
              </p>
              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {about.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm">
                    <span
                      className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[var(--ess-sage)]"
                      aria-hidden
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Diferenciais */}
        <section id="diferenciais" className="scroll-mt-32 bg-[var(--ess-rose-soft)]/50">
          <div className="mx-auto max-w-6xl px-4 py-16 sm:py-20">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="font-serif text-2xl text-[var(--ess-brown-deep)] sm:text-3xl">
                Cuidado em cada detalhe.
              </h2>
            </div>
            <div className="mt-10 grid gap-5 sm:grid-cols-2">
              {differentials.map((item) => (
                <div
                  key={item.title}
                  className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-[var(--ess-sand)]"
                >
                  <h3 className="font-serif text-lg text-[var(--ess-brown-deep)]">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Profissionais */}
        <section className="mx-auto max-w-6xl px-4 py-16 sm:py-20">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-serif text-2xl text-[var(--ess-brown-deep)] sm:text-3xl">
              Profissionais
            </h2>
          </div>
          <div className="mx-auto mt-10 grid max-w-3xl gap-6 sm:grid-cols-2">
            {team.map((person) => (
              <div
                key={person.name}
                className="rounded-3xl bg-white p-6 text-center shadow-sm ring-1 ring-[var(--ess-sand)]"
              >
                <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-[var(--ess-rose-soft)] font-serif text-xl text-[var(--ess-brown)]">
                  {person.name
                    .split(" ")
                    .map((w) => w[0])
                    .join("")
                    .slice(0, 2)}
                </span>
                <h3 className="mt-4 font-serif text-lg text-[var(--ess-brown-deep)]">
                  {person.name}
                </h3>
                <p className="mt-1 text-sm">{person.role}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 text-center text-xs text-[var(--ess-text)]/70">
            Profissionais e especialidades apresentados neste projeto são fictícios e utilizados
            exclusivamente para demonstração.
          </p>
        </section>

        {/* Ambiente */}
        <section className="bg-[var(--ess-sand)]/60">
          <div className="mx-auto max-w-6xl px-4 py-16 sm:py-20">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="font-serif text-2xl text-[var(--ess-brown-deep)] sm:text-3xl">
                Um ambiente pensado para seu bem-estar.
              </h2>
              <p className="mt-3">
                Cada espaço foi planejado para tornar sua experiência mais confortável, tranquila e
                especial.
              </p>
            </div>
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {gallery.map((item) => (
                <figure
                  key={item.label}
                  className="overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-[var(--ess-sand)]"
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
                  <figcaption className="px-4 py-3 text-sm font-medium text-[var(--ess-brown-deep)]">
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
            <h2 className="font-serif text-2xl text-[var(--ess-brown-deep)] sm:text-3xl">
              Como funciona
            </h2>
          </div>
          <ol className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, index) => (
              <li
                key={step.title}
                className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-[var(--ess-sand)]"
              >
                <span className="grid h-10 w-10 place-items-center rounded-full bg-[var(--ess-brown)] font-serif text-sm text-white">
                  {index + 1}
                </span>
                <h3 className="mt-4 font-serif text-lg text-[var(--ess-brown-deep)]">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed">{step.text}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* FAQ */}
        <section id="duvidas" className="scroll-mt-32 bg-[var(--ess-rose-soft)]/50">
          <div className="mx-auto max-w-3xl px-4 py-16 sm:py-20">
            <div className="text-center">
              <h2 className="font-serif text-2xl text-[var(--ess-brown-deep)] sm:text-3xl">
                Perguntas frequentes
              </h2>
            </div>
            <div className="mt-10 space-y-3">
              {faqs.map((faq) => (
                <details
                  key={faq.q}
                  className="group rounded-2xl border border-[var(--ess-sand)] bg-white p-5 shadow-sm"
                >
                  <summary className="cursor-pointer list-none text-base font-semibold text-[var(--ess-brown-deep)] marker:hidden">
                    {faq.q}
                  </summary>
                  <p className="mt-3 text-sm leading-relaxed">{faq.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-[var(--ess-brown-deep)]">
          <div className="mx-auto max-w-3xl px-4 py-16 text-center sm:py-20">
            <h2 className="font-serif text-2xl text-white sm:text-3xl">
              Reserve um momento para cuidar de você.
            </h2>
            <p className="mt-3 text-white/80">
              Converse com nossa equipe e solicite uma avaliação personalizada.
            </p>
            <a
              href={WA_MAIN}
              target="_blank"
              rel="noreferrer"
              className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-[var(--ess-rose)] px-7 py-4 text-base font-semibold text-[#3B2A23] transition hover:brightness-105"
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
              <h2 className="font-serif text-2xl text-[var(--ess-brown-deep)] sm:text-3xl">
                Contato
              </h2>
              <p className="mt-3 text-xs text-[var(--ess-text)]/70">
                Informações fictícias utilizadas exclusivamente para demonstração.
              </p>
              <ul className="mt-6 space-y-4 text-sm">
                <li className="flex items-center gap-3">
                  <Phone className="h-5 w-5 shrink-0 text-[var(--ess-sage)]" aria-hidden /> (11)
                  99999-1111
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="h-5 w-5 shrink-0 text-[var(--ess-sage)]" aria-hidden />
                  <span className="break-all">contato@essenzaestetica.com.br</span>
                </li>
                <li className="flex items-center gap-3">
                  <Clock className="h-5 w-5 shrink-0 text-[var(--ess-sage)]" aria-hidden /> Segunda a
                  sábado, das 9h às 19h
                </li>
                <li className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 shrink-0 text-[var(--ess-sage)]" aria-hidden /> São
                  Paulo — SP
                </li>
              </ul>
            </div>

            <form
              onSubmit={handleSubmit}
              noValidate
              className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-[var(--ess-sand)]"
            >
              <h3 className="font-serif text-lg text-[var(--ess-brown-deep)]">
                Solicite sua avaliação
              </h3>
              <div className="mt-5 space-y-4">
                <div>
                  <label htmlFor="nome" className="mb-1.5 block text-sm font-medium">
                    Nome
                  </label>
                  <input id="nome" name="nome" className={inputClass} autoComplete="name" />
                  {errors.nome ? <p className="mt-1 text-xs text-red-600">{errors.nome}</p> : null}
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
                    <p className="mt-1 text-xs text-red-600">{errors.whatsapp}</p>
                  ) : null}
                </div>
                <div>
                  <label htmlFor="procedimento" className="mb-1.5 block text-sm font-medium">
                    Procedimento de interesse
                  </label>
                  <select id="procedimento" name="procedimento" className={inputClass} defaultValue="">
                    <option value="">Selecione</option>
                    {procedures.map((p) => (
                      <option key={p.name} value={p.name}>
                        {p.name}
                      </option>
                    ))}
                  </select>
                  {errors.procedimento ? (
                    <p className="mt-1 text-xs text-red-600">{errors.procedimento}</p>
                  ) : null}
                </div>
                <div>
                  <label htmlFor="horario" className="mb-1.5 block text-sm font-medium">
                    Melhor horário para contato
                  </label>
                  <select id="horario" name="horario" className={inputClass} defaultValue="Manhã">
                    <option>Manhã</option>
                    <option>Tarde</option>
                    <option>Noite</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="mensagem" className="mb-1.5 block text-sm font-medium">
                    Mensagem
                  </label>
                  <textarea id="mensagem" name="mensagem" rows={4} className={inputClass} />
                </div>
                <button
                  type="submit"
                  className="w-full rounded-full bg-[var(--ess-brown)] px-6 py-4 text-base font-semibold text-white transition hover:bg-[var(--ess-brown-deep)]"
                >
                  Solicitar avaliação
                </button>
                {sent ? (
                  <p className="text-sm text-[var(--ess-sage)]">
                    Formulário demonstrativo: nenhum dado é enviado ou armazenado.
                  </p>
                ) : (
                  <p className="text-xs text-[var(--ess-text)]/70">
                    Formulário demonstrativo. Nenhum dado é enviado ou armazenado.
                  </p>
                )}
              </div>
            </form>
          </div>
        </section>
      </main>

      <footer className="border-t border-[var(--ess-sand)] bg-[var(--ess-sand)]/60">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:grid-cols-2">
          <div>
            <p className="font-serif text-xl text-[var(--ess-brown-deep)]">Essenza Estética</p>
            <p className="mt-2 text-sm">Beleza, cuidado e confiança em cada detalhe.</p>
          </div>
          <nav aria-label="Links do rodapé">
            <ul className="grid grid-cols-2 gap-2 text-sm">
              <li><a href="#inicio" className="hover:text-[var(--ess-brown-deep)]">Início</a></li>
              <li><a href="#procedimentos" className="hover:text-[var(--ess-brown-deep)]">Procedimentos</a></li>
              <li><a href="#sobre" className="hover:text-[var(--ess-brown-deep)]">Sobre</a></li>
              <li><a href="#duvidas" className="hover:text-[var(--ess-brown-deep)]">Dúvidas</a></li>
              <li><a href="#contato" className="hover:text-[var(--ess-brown-deep)]">Contato</a></li>
              <li>
                <Link to="/politica-de-privacidade" className="hover:text-[var(--ess-brown-deep)]">
                  Política de Privacidade
                </Link>
              </li>
            </ul>
          </nav>
        </div>
        <div className="border-t border-[var(--ess-sand)]">
          <div className="mx-auto max-w-6xl space-y-1 px-4 py-6 text-xs text-[var(--ess-text)]/70">
            <p>
              Projeto conceitual desenvolvido pela{" "}
              <Link to="/" className="font-semibold text-[var(--ess-brown)] underline">
                SiteFluxo
              </Link>
              .
            </p>
            <p>
              Este site é uma demonstração. Nomes, profissionais, contatos e informações são
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
