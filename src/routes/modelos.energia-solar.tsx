import { useState, type FormEvent } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowRight,
  Building2,
  ChevronDown,
  ClipboardCheck,
  Clock,
  Factory,
  Handshake,
  Home,
  Leaf,
  LineChart,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Phone,
  PiggyBank,
  Ruler,
  ShieldCheck,
  Sparkles,
  Sun,
  Tractor,
  Wrench,
  X,
  type LucideIcon,
} from "lucide-react";

import heroImg from "@/assets/solaris-hero.jpg";
import equipeImg from "@/assets/solaris-equipe.jpg";
import residenciaImg from "@/assets/solaris-residencia.jpg";
import empresaImg from "@/assets/solaris-empresa.jpg";
import ruralImg from "@/assets/solaris-rural.jpg";
import usinaImg from "@/assets/solaris-usina.jpg";

const CANONICAL = "https://sunshine-stack-start.lovable.app/modelos/energia-solar";
const TITLE = "Solaris Energia Solar | Projeto demonstrativo SiteFluxo";
const DESCRIPTION =
  "Modelo demonstrativo de site para empresa de energia solar desenvolvido pela SiteFluxo.";

const WHATS = "5511999993333";
const wa = (message: string) => `https://wa.me/${WHATS}?text=${encodeURIComponent(message)}`;
const WA_MAIN = wa(
  "Olá! Conheci a Solaris Energia pelo site e gostaria de solicitar uma simulação de energia solar.",
);
const WA_ESPECIALISTA = wa("Olá! Gostaria de falar com um especialista da Solaris Energia.");

export const Route = createFileRoute("/modelos/energia-solar")({
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
  component: SolarisPage,
});

const palette = {
  "--sl-navy": "#0B2545",
  "--sl-blue": "#1668C6",
  "--sl-blue-soft": "#E8F1FC",
  "--sl-yellow": "#FBBF24",
  "--sl-gray": "#F5F7FA",
  "--sl-line": "#DCE3EC",
  "--sl-text": "#1B2733",
  "--sl-muted": "#5B6B7C",
  "--sl-green": "#1E8E63",
} as React.CSSProperties;

const nav = [
  { label: "Início", href: "#inicio" },
  { label: "Soluções", href: "#solucoes" },
  { label: "Como funciona", href: "#como-funciona" },
  { label: "Benefícios", href: "#beneficios" },
  { label: "Sobre", href: "#sobre" },
  { label: "Dúvidas", href: "#duvidas" },
  { label: "Contato", href: "#contato" },
];

const beneficios: { icon: LucideIcon; title: string; text: string }[] = [
  {
    icon: PiggyBank,
    title: "Economia na conta",
    text: "Produza parte da energia consumida pelo imóvel e reduza a dependência da rede elétrica.",
  },
  {
    icon: LineChart,
    title: "Valorização do imóvel",
    text: "Uma estrutura de energia solar pode contribuir para tornar o imóvel mais moderno e valorizado.",
  },
  {
    icon: Leaf,
    title: "Energia renovável",
    text: "Utilize uma fonte de energia limpa, abundante e de baixo impacto ambiental.",
  },
  {
    icon: Ruler,
    title: "Projeto personalizado",
    text: "Cada sistema é planejado conforme o consumo, o espaço disponível e as características do imóvel.",
  },
];

const solucoes: { icon: LucideIcon; title: string; text: string; wa: string }[] = [
  {
    icon: Home,
    title: "Energia solar residencial",
    text: "Projetos planejados para casas que desejam reduzir gastos e produzir energia própria.",
    wa: "energia solar residencial",
  },
  {
    icon: Building2,
    title: "Energia solar empresarial",
    text: "Soluções para empresas, lojas, escritórios e indústrias que buscam maior previsibilidade nos custos.",
    wa: "energia solar empresarial",
  },
  {
    icon: Tractor,
    title: "Energia solar rural",
    text: "Projetos para propriedades rurais, sistemas de irrigação, galpões e operações agrícolas.",
    wa: "energia solar rural",
  },
  {
    icon: Wrench,
    title: "Manutenção e suporte",
    text: "Inspeções, orientações e cuidados para manter o funcionamento adequado do sistema.",
    wa: "manutenção e suporte de sistemas solares",
  },
];

const etapas = [
  {
    title: "Análise do consumo",
    text: "Avaliamos a média de consumo e as características principais do imóvel.",
  },
  {
    title: "Estudo do local",
    text: "Analisamos o espaço disponível, a posição do telhado e as condições para instalação.",
  },
  {
    title: "Projeto personalizado",
    text: "Definimos uma solução conforme as necessidades e as possibilidades do imóvel.",
  },
  {
    title: "Instalação",
    text: "A estrutura é instalada seguindo o planejamento e as orientações técnicas necessárias.",
  },
  {
    title: "Ativação e acompanhamento",
    text: "Após as etapas de aprovação, o sistema é preparado para iniciar a geração de energia.",
  },
];

const beneficiosDetalhados: { icon: LucideIcon; text: string }[] = [
  { icon: LineChart, text: "Maior controle sobre os custos de energia" },
  { icon: Leaf, text: "Fonte de energia renovável" },
  { icon: ShieldCheck, text: "Sistema de longa utilização" },
  { icon: Wrench, text: "Baixa necessidade de manutenção" },
  { icon: Building2, text: "Possibilidade de atender diferentes tipos de imóveis" },
  { icon: ClipboardCheck, text: "Planejamento conforme o perfil de consumo" },
];

const categorias = [
  {
    title: "Residências",
    text: "Projetos para casas, condomínios e imóveis familiares.",
    img: residenciaImg,
    alt: "Casa moderna com painéis solares instalados no telhado",
  },
  {
    title: "Empresas",
    text: "Soluções para comércios, escritórios, lojas e operações empresariais.",
    img: empresaImg,
    alt: "Prédio comercial com telhado coberto por painéis solares",
  },
  {
    title: "Propriedades rurais",
    text: "Sistemas planejados para atividades agrícolas e instalações rurais.",
    img: ruralImg,
    alt: "Propriedade rural com painéis solares próximos a um galpão",
  },
  {
    title: "Grandes áreas",
    text: "Projetos que podem utilizar telhados amplos ou instalação diretamente no solo.",
    img: usinaImg,
    alt: "Grande área aberta com painéis solares instalados no solo",
  },
];

const compromissos: { icon: LucideIcon; title: string; text: string }[] = [
  {
    icon: Sparkles,
    title: "Clareza",
    text: "Explicações objetivas sobre cada etapa e cada decisão do projeto.",
  },
  {
    icon: ClipboardCheck,
    title: "Planejamento",
    text: "Soluções desenvolvidas conforme as características de cada imóvel.",
  },
  {
    icon: ShieldCheck,
    title: "Segurança",
    text: "Prioridade para boas práticas técnicas e instalação responsável.",
  },
  {
    icon: Handshake,
    title: "Acompanhamento",
    text: "Comunicação durante todas as etapas do atendimento.",
  },
];

const faq = [
  {
    q: "Como funciona a energia solar?",
    a: "Os painéis captam a luz do sol e geram energia elétrica, que passa por um inversor antes de ser utilizada no imóvel. O desempenho depende do projeto, da região e das condições de instalação.",
  },
  {
    q: "É possível zerar completamente a conta de energia?",
    a: "Não existe garantia universal de economia. Mesmo com geração própria, a conta pode continuar apresentando cobranças obrigatórias definidas pela concessionária.",
  },
  {
    q: "Quanto custa instalar energia solar?",
    a: "O valor depende do consumo, do tipo de imóvel, do espaço disponível e das características técnicas da instalação. Por isso, cada projeto passa por uma análise antes de qualquer orçamento.",
  },
  {
    q: "Qualquer imóvel pode receber painéis solares?",
    a: "É necessário avaliar o espaço, a estrutura e as condições do local. Alguns imóveis exigem soluções alternativas, como instalação em solo.",
  },
  {
    q: "Como saber quantos painéis serão necessários?",
    a: "A quantidade é definida a partir da análise do consumo e das condições do imóvel. Não é possível estimar com precisão sem essa avaliação.",
  },
  {
    q: "A energia solar funciona em dias nublados?",
    a: "O sistema continua funcionando, porém a geração varia conforme o clima, a região e a incidência de luz ao longo do dia.",
  },
  {
    q: "É necessário realizar manutenção?",
    a: "A necessidade costuma ser baixa, mas inspeções e cuidados periódicos ajudam a manter o funcionamento adequado do sistema.",
  },
  {
    q: "Quanto tempo leva para instalar?",
    a: "Os prazos dependem da complexidade do projeto e das etapas de aprovação envolvidas, por isso não trabalhamos com prazos fixos.",
  },
  {
    q: "O sistema funciona quando falta energia?",
    a: "Depende do tipo de sistema. Instalações conectadas à rede normalmente são desligadas por segurança durante uma falta de energia.",
  },
];

const sobreLista = [
  "Atendimento consultivo",
  "Análise individual",
  "Projeto personalizado",
  "Comunicação clara",
  "Acompanhamento das etapas",
  "Suporte após a instalação",
];

function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <a href="#inicio" className="flex items-center gap-2.5">
      <span
        className="grid h-10 w-10 place-items-center rounded-xl"
        style={{ background: "linear-gradient(135deg, var(--sl-navy), var(--sl-blue))" }}
      >
        <Sun className="h-5 w-5" style={{ color: "var(--sl-yellow)" }} strokeWidth={2.4} />
      </span>
      <span className="leading-tight">
        <span
          className="block text-[17px] font-extrabold tracking-tight"
          style={{ color: "var(--sl-navy)" }}
        >
          Solaris<span style={{ color: "var(--sl-blue)" }}> Energia</span>
        </span>
        {!compact && (
          <span
            className="block text-[10px] font-medium uppercase tracking-[0.18em]"
            style={{ color: "var(--sl-muted)" }}
          >
            Energia inteligente
          </span>
        )}
      </span>
    </a>
  );
}

function SolarisPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div style={palette} className="min-h-screen" data-solaris>
      <style>{`[data-solaris]{background:#fff;color:var(--sl-text);font-family:ui-sans-serif,system-ui,-apple-system,"Segoe UI",sans-serif;scroll-behavior:smooth}
      [data-solaris] section{scroll-margin-top:120px}`}</style>

      <div
        className="fixed inset-x-0 top-0 z-50 px-4 py-2 text-center text-[11px] leading-snug sm:text-xs"
        style={{ background: "var(--sl-navy)", color: "#DCE7F5" }}
      >
        Projeto demonstrativo desenvolvido pela SiteFluxo. Todas as informações apresentadas são
        fictícias.
      </div>

      <header
        className="fixed inset-x-0 top-[34px] z-40 border-b bg-white/95 backdrop-blur sm:top-[32px]"
        style={{ borderColor: "var(--sl-line)" }}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
          <Logo />
          <nav className="hidden items-center gap-5 xl:flex">
            {nav.map((i) => (
              <a
                key={i.href}
                href={i.href}
                className="text-sm font-medium transition-colors hover:opacity-70"
                style={{ color: "var(--sl-text)" }}
              >
                {i.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <a
              href={WA_MAIN}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden rounded-full px-5 py-2.5 text-sm font-semibold shadow-sm transition-transform hover:-translate-y-0.5 md:inline-flex"
              style={{ background: "var(--sl-yellow)", color: "var(--sl-navy)" }}
            >
              Solicitar simulação
            </a>
            <button
              type="button"
              aria-label="Abrir menu"
              onClick={() => setMenuOpen((v) => !v)}
              className="grid h-10 w-10 place-items-center rounded-xl border xl:hidden"
              style={{ borderColor: "var(--sl-line)", color: "var(--sl-navy)" }}
            >
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
        {menuOpen && (
          <div className="border-t xl:hidden" style={{ borderColor: "var(--sl-line)" }}>
            <nav className="mx-auto grid max-w-6xl gap-1 px-4 py-3">
              {nav.map((i) => (
                <a
                  key={i.href}
                  href={i.href}
                  onClick={() => setMenuOpen(false)}
                  className="rounded-lg px-3 py-3 text-sm font-medium"
                  style={{ background: "var(--sl-gray)" }}
                >
                  {i.label}
                </a>
              ))}
              <a
                href={WA_MAIN}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 rounded-lg px-3 py-3 text-center text-sm font-semibold"
                style={{ background: "var(--sl-yellow)", color: "var(--sl-navy)" }}
              >
                Solicitar simulação
              </a>
            </nav>
          </div>
        )}
      </header>

      <main className="pt-[104px]">
        {/* HERO */}
        <section id="inicio" className="relative overflow-hidden" style={{ background: "var(--sl-gray)" }}>
          <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-14 lg:grid-cols-2 lg:py-20">
            <div>
              <span
                className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em]"
                style={{ background: "var(--sl-blue-soft)", color: "var(--sl-blue)" }}
              >
                <Sun className="h-3.5 w-3.5" /> Energia inteligente para economizar e crescer
              </span>
              <h1
                className="mt-5 text-3xl font-extrabold leading-[1.1] tracking-tight sm:text-4xl lg:text-5xl"
                style={{ color: "var(--sl-navy)" }}
              >
                Transforme a luz do sol em economia para seu imóvel.
              </h1>
              <p className="mt-5 max-w-xl text-base leading-relaxed" style={{ color: "var(--sl-muted)" }}>
                Projetos de energia solar planejados para residências, empresas e propriedades rurais
                que desejam reduzir custos e produzir sua própria energia.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href={WA_MAIN}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full px-7 py-4 text-sm font-bold shadow-lg transition-transform hover:-translate-y-0.5"
                  style={{ background: "var(--sl-yellow)", color: "var(--sl-navy)" }}
                >
                  Solicitar simulação <ArrowRight className="h-4 w-4" />
                </a>
                <a
                  href="#como-funciona"
                  className="inline-flex items-center justify-center rounded-full border px-7 py-4 text-sm font-semibold"
                  style={{ borderColor: "var(--sl-navy)", color: "var(--sl-navy)" }}
                >
                  Entender como funciona
                </a>
              </div>
            </div>
            <div className="relative">
              <div
                className="absolute -right-6 -top-6 hidden h-28 w-28 rounded-3xl lg:block"
                style={{ background: "var(--sl-yellow)", opacity: 0.25 }}
              />
              <img
                src={heroImg}
                width={1600}
                height={1000}
                alt="Painéis solares instalados no telhado de uma residência moderna"
                className="relative w-full rounded-3xl object-cover shadow-xl"
              />
            </div>
          </div>
        </section>

        {/* BENEFÍCIOS PRINCIPAIS */}
        <section className="mx-auto max-w-6xl px-4 py-16">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl" style={{ color: "var(--sl-navy)" }}>
            Benefícios principais
          </h2>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {beneficios.map(({ icon: Icon, title, text }) => (
              <div
                key={title}
                className="rounded-2xl border p-6 transition-shadow hover:shadow-md"
                style={{ borderColor: "var(--sl-line)" }}
              >
                <span
                  className="grid h-11 w-11 place-items-center rounded-xl"
                  style={{ background: "var(--sl-blue-soft)", color: "var(--sl-blue)" }}
                >
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 text-base font-bold" style={{ color: "var(--sl-navy)" }}>
                  {title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed" style={{ color: "var(--sl-muted)" }}>
                  {text}
                </p>
              </div>
            ))}
          </div>
          <p className="mt-6 text-xs" style={{ color: "var(--sl-muted)" }}>
            A economia e o desempenho variam conforme o projeto, o consumo, a região e as condições de
            instalação.
          </p>
        </section>

        {/* SOLUÇÕES */}
        <section id="solucoes" style={{ background: "var(--sl-gray)" }}>
          <div className="mx-auto max-w-6xl px-4 py-16">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl" style={{ color: "var(--sl-navy)" }}>
              Soluções
            </h2>
            <div className="mt-8 grid gap-5 sm:grid-cols-2">
              {solucoes.map(({ icon: Icon, title, text, wa: waTopic }) => (
                <div key={title} className="flex flex-col rounded-2xl bg-white p-6 shadow-sm">
                  <span
                    className="grid h-11 w-11 place-items-center rounded-xl"
                    style={{ background: "var(--sl-navy)", color: "var(--sl-yellow)" }}
                  >
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 text-lg font-bold" style={{ color: "var(--sl-navy)" }}>
                    {title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed" style={{ color: "var(--sl-muted)" }}>
                    {text}
                  </p>
                  <a
                    href={wa(`Olá! Gostaria de receber informações sobre ${waTopic}.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-5 inline-flex items-center justify-center gap-2 rounded-full border px-5 py-3 text-sm font-semibold"
                    style={{ borderColor: "var(--sl-blue)", color: "var(--sl-blue)" }}
                  >
                    Solicitar informações <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        <Simulador />

        {/* COMO FUNCIONA */}
        <section id="como-funciona" className="mx-auto max-w-6xl px-4 py-16">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl" style={{ color: "var(--sl-navy)" }}>
            Da análise à geração de energia.
          </h2>
          <ol className="mt-9 grid gap-5 md:grid-cols-2 lg:grid-cols-5">
            {etapas.map((e, i) => (
              <li
                key={e.title}
                className="rounded-2xl border p-6"
                style={{ borderColor: "var(--sl-line)" }}
              >
                <span
                  className="grid h-9 w-9 place-items-center rounded-lg text-sm font-extrabold"
                  style={{ background: "var(--sl-yellow)", color: "var(--sl-navy)" }}
                >
                  {i + 1}
                </span>
                <h3 className="mt-4 text-base font-bold" style={{ color: "var(--sl-navy)" }}>
                  {e.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed" style={{ color: "var(--sl-muted)" }}>
                  {e.text}
                </p>
              </li>
            ))}
          </ol>
        </section>

        {/* BENEFÍCIOS DETALHADOS */}
        <section id="beneficios" style={{ background: "var(--sl-navy)" }}>
          <div className="mx-auto max-w-6xl px-4 py-16">
            <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
              Por que investir em energia solar?
            </h2>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {beneficiosDetalhados.map(({ icon: Icon, text }) => (
                <div
                  key={text}
                  className="flex items-start gap-3 rounded-2xl p-5"
                  style={{ background: "rgba(255,255,255,0.07)" }}
                >
                  <Icon className="mt-0.5 h-5 w-5 shrink-0" style={{ color: "var(--sl-yellow)" }} />
                  <p className="text-sm font-medium leading-relaxed text-white">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SOBRE */}
        <section id="sobre" className="mx-auto max-w-6xl px-4 py-16">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <img
              src={equipeImg}
              width={1400}
              height={1000}
              loading="lazy"
              alt="Profissionais analisando uma instalação de painéis solares"
              className="w-full rounded-3xl object-cover shadow-lg"
            />
            <div>
              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl" style={{ color: "var(--sl-navy)" }}>
                Tecnologia e planejamento para cada projeto.
              </h2>
              <p className="mt-5 text-sm leading-relaxed" style={{ color: "var(--sl-muted)" }}>
                A Solaris Energia é uma empresa conceitual criada para demonstrar como uma empresa do
                setor solar pode apresentar seus serviços de maneira clara, profissional e preparada
                para gerar pedidos de orçamento.
              </p>
              <p className="mt-4 text-sm leading-relaxed" style={{ color: "var(--sl-muted)" }}>
                Em um projeto real, cada instalação começa com uma análise cuidadosa do consumo, do
                imóvel e das necessidades do cliente. O planejamento adequado é essencial para definir
                uma solução segura e compatível com cada situação.
              </p>
              <ul className="mt-6 grid gap-2 sm:grid-cols-2">
                {sobreLista.map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm font-medium">
                    <ShieldCheck className="h-4 w-4" style={{ color: "var(--sl-green)" }} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* TIPOS DE PROJETOS */}
        <section style={{ background: "var(--sl-gray)" }}>
          <div className="mx-auto max-w-6xl px-4 py-16">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl" style={{ color: "var(--sl-navy)" }}>
              Tipos de projetos
            </h2>
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {categorias.map((c) => (
                <figure key={c.title} className="overflow-hidden rounded-2xl bg-white shadow-sm">
                  <img
                    src={c.img}
                    width={1200}
                    height={900}
                    loading="lazy"
                    alt={c.alt}
                    className="h-44 w-full object-cover"
                  />
                  <figcaption className="p-5">
                    <h3 className="text-base font-bold" style={{ color: "var(--sl-navy)" }}>
                      {c.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed" style={{ color: "var(--sl-muted)" }}>
                      {c.text}
                    </p>
                  </figcaption>
                </figure>
              ))}
            </div>
            <p className="mt-6 text-xs" style={{ color: "var(--sl-muted)" }}>
              Imagens ilustrativas utilizadas exclusivamente para demonstração.
            </p>
          </div>
        </section>

        {/* COMPROMISSOS */}
        <section className="mx-auto max-w-6xl px-4 py-16">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl" style={{ color: "var(--sl-navy)" }}>
            Nosso compromisso em cada projeto
          </h2>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {compromissos.map(({ icon: Icon, title, text }) => (
              <div
                key={title}
                className="rounded-2xl border-t-4 p-6 shadow-sm"
                style={{ borderColor: "var(--sl-yellow)", background: "var(--sl-gray)" }}
              >
                <Icon className="h-6 w-6" style={{ color: "var(--sl-blue)" }} />
                <h3 className="mt-4 text-base font-bold" style={{ color: "var(--sl-navy)" }}>
                  {title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed" style={{ color: "var(--sl-muted)" }}>
                  {text}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section id="duvidas" style={{ background: "var(--sl-gray)" }}>
          <div className="mx-auto max-w-3xl px-4 py-16">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl" style={{ color: "var(--sl-navy)" }}>
              Perguntas frequentes
            </h2>
            <div className="mt-8 space-y-3">
              {faq.map((f, i) => (
                <div key={f.q} className="overflow-hidden rounded-2xl bg-white shadow-sm">
                  <button
                    type="button"
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    aria-expanded={openFaq === i}
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-sm font-semibold"
                    style={{ color: "var(--sl-navy)" }}
                  >
                    {f.q}
                    <ChevronDown
                      className={`h-4 w-4 shrink-0 transition-transform ${openFaq === i ? "rotate-180" : ""}`}
                    />
                  </button>
                  {openFaq === i && (
                    <p className="px-5 pb-5 text-sm leading-relaxed" style={{ color: "var(--sl-muted)" }}>
                      {f.a}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="mx-auto max-w-6xl px-4 py-16">
          <div
            className="rounded-3xl px-6 py-12 text-center sm:px-12"
            style={{ background: "linear-gradient(135deg, var(--sl-navy), var(--sl-blue))" }}
          >
            <h2 className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
              Comece sua análise de energia solar.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed" style={{ color: "#CFE0F5" }}>
              Envie algumas informações sobre seu imóvel e receba uma orientação inicial para seu
              projeto.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <a
                href={WA_MAIN}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full px-7 py-4 text-sm font-bold"
                style={{ background: "var(--sl-yellow)", color: "var(--sl-navy)" }}
              >
                Solicitar simulação
              </a>
              <a
                href={WA_ESPECIALISTA}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border px-7 py-4 text-sm font-semibold text-white"
                style={{ borderColor: "rgba(255,255,255,0.5)" }}
              >
                Falar com um especialista
              </a>
            </div>
          </div>
        </section>

        <Contato />
      </main>

      <footer style={{ background: "var(--sl-navy)" }}>
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 md:grid-cols-3">
          <div>
            <p className="text-lg font-extrabold text-white">Solaris Energia</p>
            <p className="mt-2 text-sm" style={{ color: "#A9BDD6" }}>
              Energia inteligente para economizar e crescer.
            </p>
          </div>
          <nav className="grid grid-cols-2 gap-2 text-sm">
            {[...nav, { label: "Política de Privacidade", href: "#" }].map((i) => (
              <a key={i.label} href={i.href} className="hover:underline" style={{ color: "#A9BDD6" }}>
                {i.label}
              </a>
            ))}
          </nav>
          <div className="text-sm" style={{ color: "#A9BDD6" }}>
            <p>
              Projeto conceitual desenvolvido pela{" "}
              <a href="/" className="font-semibold underline" style={{ color: "var(--sl-yellow)" }}>
                SiteFluxo
              </a>
              .
            </p>
            <p className="mt-3 text-xs leading-relaxed">
              Este site é uma demonstração. Nomes, contatos, projetos, imagens e informações são
              fictícios.
            </p>
          </div>
        </div>
      </footer>

      <a
        href={WA_MAIN}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Falar no WhatsApp"
        className="fixed bottom-5 right-5 z-50 grid h-14 w-14 place-items-center rounded-full shadow-xl transition-transform hover:scale-105"
        style={{ background: "#25D366", color: "#fff" }}
      >
        <MessageCircle className="h-6 w-6" />
      </a>
    </div>
  );
}

function field(label: string) {
  return (
    <span className="mb-1.5 block text-xs font-semibold" style={{ color: "var(--sl-navy)" }}>
      {label}
    </span>
  );
}

const inputCls =
  "w-full rounded-xl border bg-white px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-offset-0";
const inputStyle = { borderColor: "var(--sl-line)", color: "var(--sl-text)" } as React.CSSProperties;

function Simulador() {
  const [form, setForm] = useState({
    tipo: "Residencial",
    cidade: "",
    conta: "",
    instalacao: "Telhado",
    nome: "",
    whatsapp: "",
  });

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const msg = `Olá! Gostaria de solicitar uma análise de energia solar. Meu nome é ${form.nome}, meu imóvel é ${form.tipo.toLowerCase()}, fica em ${form.cidade}, minha conta média é de R$ ${form.conta} e a instalação seria em ${form.instalacao.toLowerCase()}. Meu WhatsApp: ${form.whatsapp}.`;
    window.open(wa(msg), "_blank", "noopener,noreferrer");
  };

  return (
    <section id="simulador" className="mx-auto max-w-5xl px-4 py-16">
      <div className="rounded-3xl border p-6 shadow-sm sm:p-10" style={{ borderColor: "var(--sl-line)" }}>
        <h2 className="text-2xl font-bold tracking-tight sm:text-3xl" style={{ color: "var(--sl-navy)" }}>
          Descubra se a energia solar faz sentido para você.
        </h2>
        <form className="mt-8 grid gap-4 sm:grid-cols-2" onSubmit={onSubmit}>
          <label>
            {field("Tipo de imóvel")}
            <select
              className={inputCls}
              style={inputStyle}
              value={form.tipo}
              onChange={(e) => setForm({ ...form, tipo: e.target.value })}
            >
              {["Residencial", "Comercial", "Rural", "Industrial"].map((o) => (
                <option key={o}>{o}</option>
              ))}
            </select>
          </label>
          <label>
            {field("Cidade e estado")}
            <input
              required
              className={inputCls}
              style={inputStyle}
              placeholder="São Paulo - SP"
              value={form.cidade}
              onChange={(e) => setForm({ ...form, cidade: e.target.value })}
            />
          </label>
          <label>
            {field("Valor médio da conta de energia")}
            <input
              required
              className={inputCls}
              style={inputStyle}
              placeholder="500"
              value={form.conta}
              onChange={(e) => setForm({ ...form, conta: e.target.value })}
            />
          </label>
          <label>
            {field("Tipo de instalação")}
            <select
              className={inputCls}
              style={inputStyle}
              value={form.instalacao}
              onChange={(e) => setForm({ ...form, instalacao: e.target.value })}
            >
              {["Telhado", "Solo", "Ainda não sei"].map((o) => (
                <option key={o}>{o}</option>
              ))}
            </select>
          </label>
          <label>
            {field("Nome")}
            <input
              required
              className={inputCls}
              style={inputStyle}
              value={form.nome}
              onChange={(e) => setForm({ ...form, nome: e.target.value })}
            />
          </label>
          <label>
            {field("WhatsApp")}
            <input
              required
              className={inputCls}
              style={inputStyle}
              placeholder="(11) 90000-0000"
              value={form.whatsapp}
              onChange={(e) => setForm({ ...form, whatsapp: e.target.value })}
            />
          </label>
          <div className="sm:col-span-2">
            <button
              type="submit"
              className="w-full rounded-full px-7 py-4 text-sm font-bold shadow-md transition-transform hover:-translate-y-0.5"
              style={{ background: "var(--sl-yellow)", color: "var(--sl-navy)" }}
            >
              Solicitar análise gratuita
            </button>
            <p className="mt-4 text-xs leading-relaxed" style={{ color: "var(--sl-muted)" }}>
              Esta solicitação é uma análise inicial. Valores, geração e economia dependem de avaliação
              técnica.
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}

function Contato() {
  const [form, setForm] = useState({
    nome: "",
    whatsapp: "",
    email: "",
    tipo: "Residencial",
    cidade: "",
    conta: "",
    mensagem: "",
  });

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const msg = `Olá! Gostaria de solicitar um orçamento de energia solar.\nNome: ${form.nome}\nWhatsApp: ${form.whatsapp}\nE-mail: ${form.email}\nTipo de imóvel: ${form.tipo}\nCidade: ${form.cidade}\nConta média: R$ ${form.conta}\nMensagem: ${form.mensagem}`;
    window.open(wa(msg), "_blank", "noopener,noreferrer");
  };

  return (
    <section id="contato" style={{ background: "var(--sl-gray)" }}>
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 lg:grid-cols-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl" style={{ color: "var(--sl-navy)" }}>
            Contato
          </h2>
          <p className="mt-3 text-xs" style={{ color: "var(--sl-muted)" }}>
            Informações fictícias utilizadas exclusivamente para demonstração.
          </p>
          <ul className="mt-6 space-y-4 text-sm">
            {[
              { icon: Phone, label: "(11) 99999-3333" },
              { icon: Mail, label: "contato@solarisenergia.com.br" },
              { icon: Clock, label: "Segunda a sexta, das 8h às 18h" },
              { icon: MapPin, label: "Atendimento em São Paulo e região" },
            ].map(({ icon: Icon, label }) => (
              <li key={label} className="flex items-center gap-3">
                <span
                  className="grid h-10 w-10 shrink-0 place-items-center rounded-xl"
                  style={{ background: "var(--sl-blue-soft)", color: "var(--sl-blue)" }}
                >
                  <Icon className="h-4 w-4" />
                </span>
                <span style={{ color: "var(--sl-text)" }}>{label}</span>
              </li>
            ))}
          </ul>
          <div className="mt-8 flex items-center gap-3 rounded-2xl bg-white p-5 shadow-sm">
            <Factory className="h-5 w-5" style={{ color: "var(--sl-navy)" }} />
            <p className="text-xs leading-relaxed" style={{ color: "var(--sl-muted)" }}>
              Este formulário é apenas demonstrativo: os dados preenchidos são enviados diretamente
              para o WhatsApp e não são armazenados.
            </p>
          </div>
        </div>

        <form className="grid gap-4 rounded-3xl bg-white p-6 shadow-sm sm:grid-cols-2 sm:p-8" onSubmit={onSubmit}>
          <label>
            {field("Nome")}
            <input required className={inputCls} style={inputStyle} value={form.nome} onChange={(e) => setForm({ ...form, nome: e.target.value })} />
          </label>
          <label>
            {field("WhatsApp")}
            <input required className={inputCls} style={inputStyle} value={form.whatsapp} onChange={(e) => setForm({ ...form, whatsapp: e.target.value })} />
          </label>
          <label>
            {field("E-mail")}
            <input required type="email" className={inputCls} style={inputStyle} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          </label>
          <label>
            {field("Tipo de imóvel")}
            <select className={inputCls} style={inputStyle} value={form.tipo} onChange={(e) => setForm({ ...form, tipo: e.target.value })}>
              {["Residencial", "Comercial", "Rural", "Industrial"].map((o) => (
                <option key={o}>{o}</option>
              ))}
            </select>
          </label>
          <label>
            {field("Cidade")}
            <input required className={inputCls} style={inputStyle} value={form.cidade} onChange={(e) => setForm({ ...form, cidade: e.target.value })} />
          </label>
          <label>
            {field("Valor médio da conta de energia")}
            <input required className={inputCls} style={inputStyle} placeholder="500" value={form.conta} onChange={(e) => setForm({ ...form, conta: e.target.value })} />
          </label>
          <label className="sm:col-span-2">
            {field("Mensagem")}
            <textarea rows={4} className={inputCls} style={inputStyle} value={form.mensagem} onChange={(e) => setForm({ ...form, mensagem: e.target.value })} />
          </label>
          <button
            type="submit"
            className="sm:col-span-2 rounded-full px-7 py-4 text-sm font-bold shadow-md transition-transform hover:-translate-y-0.5"
            style={{ background: "var(--sl-yellow)", color: "var(--sl-navy)" }}
          >
            Solicitar orçamento
          </button>
        </form>
      </div>
    </section>
  );
}
