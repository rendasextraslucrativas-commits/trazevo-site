import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Baby,
  Braces,
  Clock,
  Heart,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Phone,
  ShieldCheck,
  Smile,
  Sparkles,
  Stethoscope,
  Users,
  X,
  type LucideIcon,
} from "lucide-react";

import heroImg from "@/assets/lumina-hero.jpg";
import recepcaoImg from "@/assets/lumina-recepcao.jpg";
import consultorioImg from "@/assets/lumina-consultorio.jpg";
import esperaImg from "@/assets/lumina-espera.jpg";
import salaImg from "@/assets/demo-odonto-sala.jpg";

const CANONICAL = "https://supabasic-project-spark.lovable.app/modelos/clinica-odontologica";
const TITLE = "Clínica Lumina Odontologia | Projeto demonstrativo SiteFluxo";
const DESCRIPTION =
  "Modelo demonstrativo de site para clínica odontológica desenvolvido pela SiteFluxo.";

const WHATS = "5511999990000";
const wa = (message: string) => `https://wa.me/${WHATS}?text=${encodeURIComponent(message)}`;
const WA_MAIN = wa(
  "Olá! Conheci a Clínica Lumina pelo site e gostaria de agendar uma avaliação.",
);

export const Route = createFileRoute("/modelos/clinica-odontologica")({
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
  component: LuminaPage,
});

const palette = {
  "--lum-deep": "#0B3B6F",
  "--lum-blue": "#1D74C4",
  "--lum-light": "#E8F1FB",
  "--lum-grey": "#F6F8FB",
  "--lum-green": "#34C08A",
} as React.CSSProperties;

const nav = [
  { label: "Início", href: "#inicio" },
  { label: "Tratamentos", href: "#tratamentos" },
  { label: "Sobre", href: "#sobre" },
  { label: "Estrutura", href: "#estrutura" },
  { label: "Dúvidas", href: "#duvidas" },
  { label: "Contato", href: "#contato" },
];

const benefits: { icon: LucideIcon; title: string; text: string }[] = [
  {
    icon: Heart,
    title: "Atendimento humanizado",
    text: "Cada paciente recebe atenção individual e um plano de tratamento personalizado.",
  },
  {
    icon: Sparkles,
    title: "Tecnologia moderna",
    text: "Utilizamos recursos modernos para proporcionar mais precisão, conforto e segurança.",
  },
  {
    icon: Users,
    title: "Profissionais qualificados",
    text: "Equipe preparada para cuidar da saúde e da estética do seu sorriso.",
  },
  {
    icon: ShieldCheck,
    title: "Ambiente confortável",
    text: "Uma estrutura planejada para proporcionar tranquilidade durante o atendimento.",
  },
];

const treatments: { icon: LucideIcon; name: string; text: string }[] = [
  {
    icon: Stethoscope,
    name: "Clínica geral",
    text: "Prevenção, diagnóstico e cuidados essenciais para manter sua saúde bucal.",
  },
  {
    icon: ShieldCheck,
    name: "Implantes dentários",
    text: "Soluções para recuperar a função, a segurança e a aparência do sorriso.",
  },
  {
    icon: Braces,
    name: "Ortodontia",
    text: "Tratamentos para melhorar o alinhamento dos dentes e a harmonia do sorriso.",
  },
  {
    icon: Sparkles,
    name: "Clareamento dental",
    text: "Tratamento planejado para deixar o sorriso mais claro de maneira segura.",
  },
  {
    icon: Smile,
    name: "Lentes e facetas",
    text: "Soluções estéticas personalizadas para melhorar formato, cor e proporção dos dentes.",
  },
  {
    icon: Baby,
    name: "Odontopediatria",
    text: "Atendimento cuidadoso e acolhedor para a saúde bucal das crianças.",
  },
];

const about = [
  "Atendimento personalizado",
  "Planejamento individual",
  "Equipamentos modernos",
  "Ambiente acolhedor",
  "Comunicação clara",
  "Acompanhamento durante o tratamento",
];

const team = [
  { name: "Dra. Marina Alves", role: "Clínica geral e estética odontológica" },
  { name: "Dr. Rafael Lima", role: "Implantes e reabilitação oral" },
  { name: "Dra. Camila Rocha", role: "Ortodontia e odontopediatria" },
];

const gallery = [
  { src: recepcaoImg, alt: "Recepção moderna da clínica odontológica", label: "Recepção" },
  { src: consultorioImg, alt: "Consultório odontológico moderno e claro", label: "Consultório" },
  { src: salaImg, alt: "Sala de atendimento odontológico", label: "Sala de atendimento" },
  { src: esperaImg, alt: "Área de espera confortável da clínica", label: "Área de espera" },
];

const steps = [
  {
    title: "Solicite o atendimento",
    text: "Entre em contato pelo WhatsApp e informe o melhor horário para você.",
  },
  {
    title: "Faça sua avaliação",
    text: "Conversamos sobre suas necessidades e avaliamos sua saúde bucal.",
  },
  {
    title: "Receba seu planejamento",
    text: "Apresentamos as possibilidades de tratamento de maneira clara.",
  },
  {
    title: "Inicie seu cuidado",
    text: "Começamos o tratamento com acompanhamento em todas as etapas.",
  },
];

const faqs = [
  {
    q: "Como faço para agendar uma avaliação?",
    a: "Basta enviar uma mensagem pelo WhatsApp informando seu nome e o melhor horário. A equipe confirma a disponibilidade e cada caso é analisado em avaliação individual.",
  },
  {
    q: "Quais formas de pagamento são aceitas?",
    a: "As condições são apresentadas durante a avaliação, de acordo com o planejamento definido para cada caso.",
  },
  {
    q: "A clínica atende crianças?",
    a: "Sim, há atendimento voltado ao público infantil. A conduta é sempre definida após avaliação individual.",
  },
  {
    q: "Quanto tempo dura uma avaliação?",
    a: "A duração varia conforme a necessidade de cada paciente, já que cada caso exige avaliação individual.",
  },
  {
    q: "É possível solicitar informações pelo WhatsApp?",
    a: "Sim. Informações gerais podem ser enviadas por mensagem, mas qualquer orientação depende de avaliação presencial.",
  },
  {
    q: "O tratamento começa no mesmo dia?",
    a: "Depende do planejamento definido após a avaliação individual de cada paciente.",
  },
];

function LuminaPage() {
  const [open, setOpen] = useState(false);
  const [sent, setSent] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    const previous = document.documentElement.style.scrollBehavior;
    document.documentElement.style.scrollBehavior = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches
      ? "auto"
      : "smooth";
    return () => {
      document.documentElement.style.scrollBehavior = previous;
    };
  }, []);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const next: Record<string, string> = {};
    const name = String(form.get("nome") ?? "").trim();
    const phone = String(form.get("whatsapp") ?? "").trim();
    if (name.length < 2) next.nome = "Informe seu nome.";
    if (phone.replace(/\D/g, "").length < 10) next.whatsapp = "Informe um WhatsApp válido.";
    setErrors(next);
    if (Object.keys(next).length) return;
    setSent(true);
    event.currentTarget.reset();
  }

  const inputClass =
    "w-full rounded-xl border border-[var(--lum-light)] bg-white px-4 py-3 text-[15px] text-slate-800 outline-none transition focus:border-[var(--lum-blue)] focus:ring-2 focus:ring-[var(--lum-blue)]/25";

  return (
    <div style={palette} className="min-h-screen bg-white font-sans text-slate-700 antialiased">
      {/* Aviso de demonstração */}
      <div className="fixed inset-x-0 top-0 z-50 bg-[var(--lum-deep)] px-4 py-1.5 text-center text-[11px] leading-snug text-white/90 sm:text-xs">
        Projeto demonstrativo criado pela SiteFluxo. Todas as informações apresentadas são
        fictícias.
      </div>

      <header className="fixed inset-x-0 top-[26px] z-40 border-b border-slate-100 bg-white/90 backdrop-blur sm:top-[30px]">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
          <a href="#inicio" className="flex items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-[var(--lum-deep)] text-white">
              <Smile className="h-5 w-5" aria-hidden />
            </span>
            <span className="leading-tight">
              <span className="block text-base font-semibold text-[var(--lum-deep)]">
                Lumina
              </span>
              <span className="block text-[10px] uppercase tracking-[0.18em] text-[var(--lum-blue)]">
                Odontologia
              </span>
            </span>
          </a>

          <nav aria-label="Navegação principal" className="hidden items-center gap-6 lg:flex">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-slate-600 transition hover:text-[var(--lum-blue)]"
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
              className="hidden rounded-xl bg-[var(--lum-blue)] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[var(--lum-deep)] sm:inline-flex"
            >
              Agendar avaliação
            </a>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-label={open ? "Fechar menu" : "Abrir menu"}
              className="grid h-11 w-11 place-items-center rounded-xl border border-slate-200 text-[var(--lum-deep)] lg:hidden"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {open ? (
          <nav aria-label="Navegação mobile" className="border-t border-slate-100 bg-white lg:hidden">
            <ul className="mx-auto max-w-6xl px-4 py-3">
              {nav.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-lg px-2 py-3 text-base font-medium text-slate-700 hover:bg-[var(--lum-grey)]"
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
                  className="block rounded-xl bg-[var(--lum-blue)] px-4 py-3 text-center text-base font-semibold text-white"
                >
                  Agendar avaliação
                </a>
              </li>
            </ul>
          </nav>
        ) : null}
      </header>

      <main className="pt-[92px]">
        {/* Hero */}
        <section id="inicio" className="bg-[var(--lum-grey)]">
          <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 sm:py-20 lg:grid-cols-2">
            <div>
              <span className="inline-flex rounded-full bg-[var(--lum-light)] px-3 py-1 text-xs font-semibold text-[var(--lum-deep)]">
                Cuidado, tecnologia e confiança para o seu sorriso.
              </span>
              <h1 className="mt-5 text-3xl font-bold leading-tight tracking-tight text-[var(--lum-deep)] sm:text-4xl lg:text-5xl">
                Seu sorriso cuidado com atenção, tecnologia e confiança.
              </h1>
              <p className="mt-5 max-w-xl text-base text-slate-600 sm:text-lg">
                Tratamentos odontológicos personalizados para você cuidar da saúde, da estética e
                da confiança do seu sorriso.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href={WA_MAIN}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center rounded-xl bg-[var(--lum-blue)] px-6 py-4 text-base font-semibold text-white shadow-sm transition hover:bg-[var(--lum-deep)]"
                >
                  Agendar uma avaliação
                </a>
                <a
                  href="#tratamentos"
                  className="inline-flex items-center justify-center rounded-xl border border-[var(--lum-deep)]/20 bg-white px-6 py-4 text-base font-semibold text-[var(--lum-deep)] transition hover:bg-[var(--lum-light)]"
                >
                  Conhecer tratamentos
                </a>
              </div>
            </div>
            <div className="overflow-hidden rounded-3xl shadow-lg shadow-slate-200">
              <img
                src={heroImg}
                alt="Dentista conversando com paciente em atendimento odontológico humanizado"
                width={1400}
                height={1000}
                fetchPriority="high"
                decoding="async"
                className="aspect-[7/5] w-full object-cover"
              />
            </div>
          </div>
        </section>

        {/* Benefícios */}
        <section className="mx-auto max-w-6xl px-4 py-16 sm:py-20">
          <h2 className="sr-only">Benefícios da clínica</h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition hover:shadow-md"
              >
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-[var(--lum-light)] text-[var(--lum-deep)]">
                  <item.icon className="h-5 w-5" aria-hidden />
                </span>
                <h3 className="mt-4 text-base font-semibold text-[var(--lum-deep)]">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Tratamentos */}
        <section id="tratamentos" className="bg-[var(--lum-grey)]">
          <div className="mx-auto max-w-6xl px-4 py-16 sm:py-20">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-2xl font-bold tracking-tight text-[var(--lum-deep)] sm:text-3xl">
                Tratamentos
              </h2>
              <p className="mt-3 text-slate-600">
                Cuidados odontológicos planejados de acordo com a necessidade de cada paciente.
              </p>
            </div>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {treatments.map((item) => (
                <div
                  key={item.name}
                  className="flex flex-col rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-100"
                >
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-[var(--lum-light)] text-[var(--lum-blue)]">
                    <item.icon className="h-5 w-5" aria-hidden />
                  </span>
                  <h3 className="mt-4 text-lg font-semibold text-[var(--lum-deep)]">
                    {item.name}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">{item.text}</p>
                  <a
                    href={wa(
                      `Olá! Conheci a Clínica Lumina pelo site e gostaria de saber mais sobre ${item.name}.`,
                    )}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-5 inline-flex items-center justify-center rounded-xl border border-[var(--lum-blue)]/30 px-4 py-3 text-sm font-semibold text-[var(--lum-blue)] transition hover:bg-[var(--lum-light)]"
                  >
                    Quero saber mais
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Sobre */}
        <section id="sobre" className="mx-auto max-w-6xl px-4 py-16 sm:py-20">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div className="overflow-hidden rounded-3xl shadow-lg shadow-slate-200">
              <img
                src={recepcaoImg}
                alt="Recepção moderna da Clínica Lumina Odontologia"
                width={1200}
                height={900}
                loading="lazy"
                decoding="async"
                className="aspect-[4/3] w-full object-cover"
              />
            </div>
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-[var(--lum-deep)] sm:text-3xl">
                Cuidado odontológico pensado para você.
              </h2>
              <p className="mt-4 leading-relaxed text-slate-600">
                A Clínica Lumina Odontologia nasceu com o propósito de oferecer uma experiência
                odontológica mais tranquila, moderna e humanizada. Cada atendimento começa com uma
                conversa cuidadosa, permitindo compreender as necessidades de cada paciente e
                definir o tratamento mais adequado.
              </p>
              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {about.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-slate-700">
                    <span
                      className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[var(--lum-green)]"
                      aria-hidden
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Equipe */}
        <section className="bg-[var(--lum-grey)]">
          <div className="mx-auto max-w-6xl px-4 py-16 sm:py-20">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-2xl font-bold tracking-tight text-[var(--lum-deep)] sm:text-3xl">
                Nossa equipe
              </h2>
            </div>
            <div className="mt-10 grid gap-6 sm:grid-cols-3">
              {team.map((person) => (
                <div
                  key={person.name}
                  className="rounded-2xl bg-white p-6 text-center shadow-sm ring-1 ring-slate-100"
                >
                  <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-[var(--lum-light)] text-xl font-semibold text-[var(--lum-deep)]">
                    {person.name
                      .replace(/^Dra?\.\s*/, "")
                      .split(" ")
                      .map((w) => w[0])
                      .join("")
                      .slice(0, 2)}
                  </span>
                  <h3 className="mt-4 text-base font-semibold text-[var(--lum-deep)]">
                    {person.name}
                  </h3>
                  <p className="mt-1 text-sm text-slate-600">{person.role}</p>
                </div>
              ))}
            </div>
            <p className="mt-6 text-center text-xs text-slate-500">
              Profissionais apresentados neste projeto são fictícios e utilizados apenas para
              demonstração.
            </p>
          </div>
        </section>

        {/* Estrutura */}
        <section id="estrutura" className="mx-auto max-w-6xl px-4 py-16 sm:py-20">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-bold tracking-tight text-[var(--lum-deep)] sm:text-3xl">
              Uma estrutura preparada para o seu conforto.
            </h2>
            <p className="mt-3 text-slate-600">
              Cada espaço foi planejado para tornar sua experiência mais confortável, tranquila e
              segura.
            </p>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {gallery.map((item) => (
              <figure
                key={item.label}
                className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-100"
              >
                <img
                  src={item.src}
                  alt={item.alt}
                  width={1200}
                  height={900}
                  loading="lazy"
                  decoding="async"
                  className="aspect-[4/3] w-full object-cover"
                />
                <figcaption className="px-4 py-3 text-sm font-medium text-[var(--lum-deep)]">
                  {item.label}
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        {/* Como funciona */}
        <section className="bg-[var(--lum-grey)]">
          <div className="mx-auto max-w-6xl px-4 py-16 sm:py-20">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-2xl font-bold tracking-tight text-[var(--lum-deep)] sm:text-3xl">
                Como funciona
              </h2>
            </div>
            <ol className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {steps.map((step, index) => (
                <li key={step.title} className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-100">
                  <span className="grid h-9 w-9 place-items-center rounded-lg bg-[var(--lum-deep)] text-sm font-semibold text-white">
                    {index + 1}
                  </span>
                  <h3 className="mt-4 text-base font-semibold text-[var(--lum-deep)]">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{step.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* FAQ */}
        <section id="duvidas" className="mx-auto max-w-3xl px-4 py-16 sm:py-20">
          <div className="text-center">
            <h2 className="text-2xl font-bold tracking-tight text-[var(--lum-deep)] sm:text-3xl">
              Perguntas frequentes
            </h2>
          </div>
          <div className="mt-10 space-y-3">
            {faqs.map((faq) => (
              <details
                key={faq.q}
                className="group rounded-2xl border border-slate-100 bg-white p-5 shadow-sm"
              >
                <summary className="cursor-pointer list-none text-base font-semibold text-[var(--lum-deep)] marker:hidden">
                  {faq.q}
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">{faq.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="bg-[var(--lum-deep)]">
          <div className="mx-auto max-w-3xl px-4 py-16 text-center sm:py-20">
            <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
              Dê o primeiro passo para cuidar do seu sorriso.
            </h2>
            <p className="mt-3 text-white/80">
              Converse com nossa equipe e solicite uma avaliação personalizada.
            </p>
            <a
              href={WA_MAIN}
              target="_blank"
              rel="noreferrer"
              className="mt-8 inline-flex items-center justify-center gap-2 rounded-xl bg-[var(--lum-green)] px-6 py-4 text-base font-semibold text-[#06331f] transition hover:brightness-105"
            >
              <MessageCircle className="h-5 w-5" aria-hidden />
              Agendar pelo WhatsApp
            </a>
          </div>
        </section>

        {/* Contato */}
        <section id="contato" className="mx-auto max-w-6xl px-4 py-16 sm:py-20">
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-[var(--lum-deep)] sm:text-3xl">
                Contato
              </h2>
              <p className="mt-3 text-xs text-slate-500">
                Informações fictícias utilizadas exclusivamente para demonstração.
              </p>
              <ul className="mt-6 space-y-4 text-sm text-slate-700">
                <li className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-[var(--lum-blue)]" aria-hidden /> (11) 99999-0000
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-[var(--lum-blue)]" aria-hidden />{" "}
                  contato@luminaodontologia.com.br
                </li>
                <li className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-[var(--lum-blue)]" aria-hidden /> Segunda a sexta,
                  das 8h às 18h
                </li>
                <li className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-[var(--lum-blue)]" aria-hidden /> São Paulo — SP
                </li>
              </ul>
            </div>

            <form
              onSubmit={handleSubmit}
              noValidate
              className="rounded-2xl bg-[var(--lum-grey)] p-6 shadow-sm ring-1 ring-slate-100"
            >
              <div className="space-y-4">
                <div>
                  <label htmlFor="nome" className="mb-1.5 block text-sm font-medium text-slate-700">
                    Nome
                  </label>
                  <input id="nome" name="nome" className={inputClass} autoComplete="name" />
                  {errors.nome ? (
                    <p className="mt-1 text-xs text-red-600">{errors.nome}</p>
                  ) : null}
                </div>
                <div>
                  <label
                    htmlFor="whatsapp"
                    className="mb-1.5 block text-sm font-medium text-slate-700"
                  >
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
                  <label
                    htmlFor="tratamento"
                    className="mb-1.5 block text-sm font-medium text-slate-700"
                  >
                    Tratamento de interesse
                  </label>
                  <select id="tratamento" name="tratamento" className={inputClass}>
                    <option value="">Selecione</option>
                    {treatments.map((item) => (
                      <option key={item.name} value={item.name}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="mensagem"
                    className="mb-1.5 block text-sm font-medium text-slate-700"
                  >
                    Mensagem
                  </label>
                  <textarea id="mensagem" name="mensagem" rows={4} className={inputClass} />
                </div>
                <button
                  type="submit"
                  className="w-full rounded-xl bg-[var(--lum-blue)] px-6 py-4 text-base font-semibold text-white transition hover:bg-[var(--lum-deep)]"
                >
                  Solicitar atendimento
                </button>
                <p aria-live="polite" className="text-xs text-slate-500">
                  {sent
                    ? "Formulário demonstrativo: nenhuma informação foi enviada ou armazenada."
                    : "Este formulário é apenas demonstrativo e não envia nem armazena dados."}
                </p>
              </div>
            </form>
          </div>
        </section>
      </main>

      <footer className="bg-[var(--lum-deep)] text-white/80">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-14 sm:grid-cols-2">
          <div>
            <p className="text-lg font-semibold text-white">Lumina Odontologia</p>
            <p className="mt-2 text-sm">Cuidado, tecnologia e confiança para o seu sorriso.</p>
          </div>
          <nav aria-label="Rodapé">
            <ul className="grid grid-cols-2 gap-2 text-sm">
              <li>
                <a href="#inicio" className="hover:text-white">
                  Início
                </a>
              </li>
              <li>
                <a href="#tratamentos" className="hover:text-white">
                  Tratamentos
                </a>
              </li>
              <li>
                <a href="#sobre" className="hover:text-white">
                  Sobre
                </a>
              </li>
              <li>
                <a href="#contato" className="hover:text-white">
                  Contato
                </a>
              </li>
              <li className="col-span-2">
                <Link to="/politica-de-privacidade" className="hover:text-white">
                  Política de Privacidade
                </Link>
              </li>
            </ul>
          </nav>
        </div>
        <div className="border-t border-white/10">
          <div className="mx-auto max-w-6xl space-y-1 px-4 py-6 text-xs">
            <p>
              Projeto conceitual desenvolvido pela{" "}
              <Link to="/" className="font-semibold text-white underline">
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
        aria-label="Agendar avaliação pelo WhatsApp"
        className="fixed bottom-5 right-5 z-50 grid h-14 w-14 place-items-center rounded-full bg-[var(--lum-green)] text-[#06331f] shadow-lg transition hover:brightness-105"
      >
        <MessageCircle className="h-6 w-6" aria-hidden />
      </a>
    </div>
  );
}
