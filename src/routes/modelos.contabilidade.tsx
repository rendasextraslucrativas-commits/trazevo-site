import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Calculator,
  FileText,
  Building2,
  Users,
  ShieldCheck,
  Clock,
  Mail,
  MapPin,
  Phone,
  Menu,
  X,
  Check,
} from "lucide-react";

import heroImg from "@/assets/prime-contabil-hero.jpg";
import equipeImg from "@/assets/prime-contabil-equipe.jpg";

const WHATSAPP = "https://wa.me/5500000000000";
const DEMO_NOTICE =
  "Projeto demonstrativo criado para apresentar possibilidades de design e estrutura. As informações exibidas são fictícias.";
const SITE_CTA_MESSAGE =
  "Olá! Vi um projeto do portfólio e gostaria de criar um site semelhante para o meu negócio.";

const wa = (message: string) => `${WHATSAPP}?text=${encodeURIComponent(message)}`;

export const Route = createFileRoute("/modelos/contabilidade")({
  head: () => ({
    meta: [
      { title: "Prime Contábil | Projeto demonstrativo TRAZEVO" },
      {
        name: "description",
        content:
          "Projeto demonstrativo de site institucional para escritório de contabilidade, com áreas de atendimento, apresentação do escritório e contato.",
      },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:type", content: "website" },
      { property: "og:title", content: "Prime Contábil | Projeto demonstrativo" },
      {
        property: "og:description",
        content:
          "Modelo conceitual de site para escritório de contabilidade: serviços, credibilidade e contato direto.",
      },
    ],
    links: [
      {
        rel: "canonical",
        href: "https://sunshine-stack-start.lovable.app/modelos/contabilidade",
      },
    ],
  }),
  component: PrimeContabil,
});

const nav = [
  { label: "Início", href: "#inicio" },
  { label: "Serviços", href: "#servicos" },
  { label: "O escritório", href: "#escritorio" },
  { label: "Contato", href: "#contato" },
];

const services = [
  {
    icon: Calculator,
    title: "Contabilidade empresarial",
    description:
      "Escrituração contábil, balanços e relatórios periódicos para acompanhar a saúde financeira da empresa.",
  },
  {
    icon: FileText,
    title: "Rotinas fiscais",
    description:
      "Apuração de impostos, entrega de obrigações acessórias e orientação sobre o regime tributário adequado.",
  },
  {
    icon: Users,
    title: "Departamento pessoal",
    description:
      "Admissões, folha de pagamento, férias e rescisões conduzidas dentro dos prazos legais.",
  },
  {
    icon: Building2,
    title: "Abertura de empresas",
    description:
      "Registro, alvarás, inscrições e definição da estrutura societária para começar com segurança.",
  },
  {
    icon: ShieldCheck,
    title: "Consultoria tributária",
    description:
      "Análise de cenários e revisão de tributos para reduzir riscos e organizar obrigações.",
  },
  {
    icon: Clock,
    title: "Acompanhamento mensal",
    description:
      "Atendimento consultivo recorrente, com relatórios claros e canal direto para dúvidas.",
  },
];

const differentials = [
  "Atendimento consultivo e linguagem simples",
  "Prazos e obrigações organizados em calendário próprio",
  "Documentos digitais e acesso facilitado",
  "Orientação para decisões financeiras do dia a dia",
];

function PrimeContabil() {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#f6f8fb] text-[#16233a]">
      <p className="bg-[#16233a] px-4 py-2 text-center text-[11px] leading-snug text-white/80">
        {DEMO_NOTICE}
      </p>

      <header className="sticky top-0 z-40 border-b border-[#dfe6ef] bg-white/90 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4">
          <a href="#inicio" className="flex items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-[#16233a] text-sm font-bold text-white">
              PC
            </span>
            <span className="text-sm font-semibold tracking-tight sm:text-base">
              Prime Contábil
            </span>
          </a>
          <nav className="hidden items-center gap-1 md:flex">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="rounded-md px-3 py-2 text-sm text-[#4c5b73] transition-colors hover:bg-[#eef2f8] hover:text-[#16233a]"
              >
                {item.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <a
              href={wa("Olá! Gostaria de falar com a Prime Contábil.")}
              target="_blank"
              rel="noreferrer"
              className="hidden rounded-lg bg-[#1f6feb] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#1a5ed0] sm:inline-flex"
            >
              Falar no WhatsApp
            </a>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label="Abrir menu"
              className="grid h-10 w-10 place-items-center rounded-lg border border-[#dfe6ef] md:hidden"
            >
              {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>
        {open ? (
          <nav className="border-t border-[#dfe6ef] bg-white px-4 py-3 md:hidden">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="block rounded-md px-3 py-2 text-sm text-[#4c5b73] hover:bg-[#eef2f8]"
              >
                {item.label}
              </a>
            ))}
          </nav>
        ) : null}
      </header>

      <section id="inicio" className="border-b border-[#e4eaf2] bg-white">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-14 lg:grid-cols-2 lg:py-20">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-[#1f6feb]">
              Serviços contábeis para empresas
            </p>
            <h1 className="mt-4 text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
              Contabilidade organizada para sua empresa crescer com segurança
            </h1>
            <p className="mt-5 max-w-xl text-base text-[#4c5b73] sm:text-lg">
              Cuidamos das obrigações contábeis, fiscais e trabalhistas do seu negócio com
              atendimento próximo e informações claras para a tomada de decisão.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={wa("Olá! Gostaria de conhecer os serviços da Prime Contábil.")}
                target="_blank"
                rel="noreferrer"
                className="rounded-lg bg-[#1f6feb] px-5 py-3 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
              >
                Solicitar atendimento
              </a>
              <a
                href="#servicos"
                className="rounded-lg border border-[#c9d5e5] px-5 py-3 text-sm font-semibold text-[#16233a] transition-colors hover:bg-[#eef2f8]"
              >
                Ver áreas de atendimento
              </a>
            </div>
          </div>
          <div className="overflow-hidden rounded-2xl border border-[#e4eaf2] shadow-sm">
            <img
              src={heroImg}
              alt="Escritório de contabilidade moderno e iluminado"
              width={1280}
              height={800}
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </section>

      <section id="servicos" className="mx-auto max-w-6xl px-4 py-14 sm:py-20">
        <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Áreas de atendimento</h2>
        <p className="mt-3 max-w-2xl text-[#4c5b73]">
          Estrutura de serviços pensada para empresas de diferentes portes e regimes tributários.
        </p>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => {
            const ServiceIcon = service.icon;
            return (
              <article
                key={service.title}
                className="flex h-full flex-col rounded-2xl border border-[#e4eaf2] bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
              >
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-[#eef2f8] text-[#1f6feb]">
                  <ServiceIcon className="h-5 w-5" aria-hidden />
                </span>
                <h3 className="mt-4 text-lg font-semibold">{service.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#4c5b73]">{service.description}</p>
                <a
                  href={wa(`Olá! Gostaria de informações sobre ${service.title}.`)}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-5 inline-flex text-sm font-semibold text-[#1f6feb] hover:underline"
                >
                  Falar sobre este serviço
                </a>
              </article>
            );
          })}
        </div>
      </section>

      <section id="escritorio" className="border-y border-[#e4eaf2] bg-white">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-14 lg:grid-cols-2 sm:py-20">
          <div className="overflow-hidden rounded-2xl border border-[#e4eaf2] shadow-sm">
            <img
              src={equipeImg}
              alt="Profissionais analisando relatórios contábeis em uma sala de reunião"
              width={1280}
              height={800}
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </div>
          <div>
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">O escritório</h2>
            <p className="mt-4 text-[#4c5b73]">
              A Prime Contábil é um escritório fictício criado para este projeto demonstrativo.
              A proposta apresentada é de atendimento consultivo, com rotinas organizadas,
              prazos acompanhados de perto e comunicação simples com o empresário.
            </p>
            <ul className="mt-6 space-y-2 text-sm">
              {differentials.map((item) => (
                <li key={item} className="flex gap-2 text-[#4c5b73]">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#1f6feb]" aria-hidden />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section id="contato" className="mx-auto max-w-6xl px-4 py-14 sm:py-20">
        <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Contato</h2>
        <p className="mt-3 max-w-2xl text-[#4c5b73]">
          Dados de contato fictícios, apresentados apenas para ilustrar a estrutura da página.
        </p>
        <div className="mt-8 grid gap-5 sm:grid-cols-3">
          <div className="rounded-2xl border border-[#e4eaf2] bg-white p-5 shadow-sm">
            <Phone className="h-5 w-5 text-[#1f6feb]" aria-hidden />
            <p className="mt-3 text-sm font-semibold">Telefone</p>
            <p className="text-sm text-[#4c5b73]">(00) 0000-0000</p>
          </div>
          <div className="rounded-2xl border border-[#e4eaf2] bg-white p-5 shadow-sm">
            <Mail className="h-5 w-5 text-[#1f6feb]" aria-hidden />
            <p className="mt-3 text-sm font-semibold">E-mail</p>
            <p className="text-sm text-[#4c5b73]">contato@primecontabil.exemplo</p>
          </div>
          <div className="rounded-2xl border border-[#e4eaf2] bg-white p-5 shadow-sm">
            <MapPin className="h-5 w-5 text-[#1f6feb]" aria-hidden />
            <p className="mt-3 text-sm font-semibold">Endereço</p>
            <p className="text-sm text-[#4c5b73]">Av. Exemplo, 000 — Centro</p>
          </div>
        </div>
        <div className="mt-8 rounded-2xl border border-[#e4eaf2] bg-white p-6 shadow-sm">
          <p className="text-sm font-semibold">Formulário de contato</p>
          <p className="mt-1 text-xs text-[#6b7a92]">
            Formulário apenas visual: os dados não são enviados nem armazenados.
          </p>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <input
              placeholder="Nome"
              className="rounded-lg border border-[#dfe6ef] bg-[#f9fbfd] px-3 py-2 text-sm"
            />
            <input
              placeholder="Empresa"
              className="rounded-lg border border-[#dfe6ef] bg-[#f9fbfd] px-3 py-2 text-sm"
            />
            <input
              placeholder="E-mail"
              className="rounded-lg border border-[#dfe6ef] bg-[#f9fbfd] px-3 py-2 text-sm"
            />
            <input
              placeholder="Telefone"
              className="rounded-lg border border-[#dfe6ef] bg-[#f9fbfd] px-3 py-2 text-sm"
            />
            <textarea
              placeholder="Como podemos ajudar?"
              rows={4}
              className="rounded-lg border border-[#dfe6ef] bg-[#f9fbfd] px-3 py-2 text-sm sm:col-span-2"
            />
          </div>
          <a
            href={wa("Olá! Gostaria de falar com a Prime Contábil sobre serviços contábeis.")}
            target="_blank"
            rel="noreferrer"
            className="mt-5 inline-flex rounded-lg bg-[#1f6feb] px-5 py-3 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
          >
            Falar no WhatsApp
          </a>
        </div>
      </section>

      <section className="bg-[#16233a] px-4 py-14 text-center text-white sm:py-16">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Gostou deste estilo de site?
          </h2>
          <p className="mt-3 text-white/80">
            Podemos desenvolver um projeto personalizado para o seu negócio, com suas informações,
            identidade visual e objetivos.
          </p>
          <a
            href={wa(SITE_CTA_MESSAGE)}
            target="_blank"
            rel="noreferrer"
            className="mt-7 inline-flex rounded-lg bg-[#1f6feb] px-6 py-3 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
          >
            Quero um site como este
          </a>
        </div>
      </section>

      <footer className="border-t border-[#e4eaf2] bg-white px-4 py-8 text-center">
        <p className="text-sm font-semibold">Prime Contábil</p>
        <p className="mx-auto mt-2 max-w-2xl text-xs leading-relaxed text-[#6b7a92]">{DEMO_NOTICE}</p>
      </footer>
    </div>
  );
}
