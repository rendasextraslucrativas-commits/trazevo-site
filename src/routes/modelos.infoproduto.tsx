import { useState, type FormEvent } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  Aperture,
  ArrowRight,
  BookOpen,
  Camera,
  Check,
  ChevronDown,
  Compass,
  Crop,
  Image as ImageIcon,
  Layers,
  Lightbulb,
  Menu,
  MonitorSmartphone,
  Package,
  PlayCircle,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Users,
  Wand2,
  X,
  type LucideIcon,
} from "lucide-react";

import heroImg from "@/assets/fotopro-hero.jpg";
import aulaImg from "@/assets/fotopro-aula.jpg";
import instrutoraImg from "@/assets/fotopro-instrutora.jpg";
import retratoImg from "@/assets/fotopro-retrato.jpg";
import produtoImg from "@/assets/fotopro-produto.jpg";
import comidaImg from "@/assets/fotopro-comida.jpg";
import paisagemImg from "@/assets/fotopro-paisagem.jpg";
import conteudoImg from "@/assets/fotopro-conteudo.jpg";
import urbanaImg from "@/assets/fotopro-urbana.jpg";

const CANONICAL = "https://sunshine-stack-start.lovable.app/modelos/infoproduto";
const TITLE = "FotoPro Mobile | Projeto demonstrativo TRAZEVO";
const DESCRIPTION =
  "Modelo demonstrativo de landing page para curso online e infoproduto desenvolvido pela TRAZEVO.";

export const Route = createFileRoute("/modelos/infoproduto")({
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
  component: FotoProPage,
});

const palette = {
  "--fp-roxo": "#3B1E6E",
  "--fp-roxo-claro": "#6D3BD1",
  "--fp-azul": "#2563EB",
  "--fp-azul-claro": "#EAF0FE",
  "--fp-cinza": "#F6F6FA",
  "--fp-linha": "#E4E4EF",
  "--fp-texto": "#1C1B22",
  "--fp-muted": "#5D5C6B",
  "--fp-destaque": "#F59E0B",
} as React.CSSProperties;

const nav = [
  { label: "O curso", href: "#curso" },
  { label: "Conteúdo", href: "#conteudo" },
  { label: "Para quem é", href: "#para-quem" },
  { label: "Instrutora", href: "#instrutora" },
  { label: "Oferta", href: "#oferta" },
  { label: "Dúvidas", href: "#duvidas" },
];

const heroPontos = [
  "Aulas online",
  "Acesso pelo celular ou computador",
  "Conteúdo para iniciantes",
  "Aprendizado no próprio ritmo",
];

const problemas = [
  "As imagens ficam escuras ou sem destaque",
  "O enquadramento parece desorganizado",
  "Você não sabe aproveitar a luz",
  "As cores ficam diferentes do esperado",
  "As fotos não valorizam seus produtos ou momentos",
  "Os aplicativos de edição parecem complicados",
];

const beneficios: { icon: LucideIcon; title: string; text: string }[] = [
  {
    icon: Lightbulb,
    title: "Mais controle sobre a luz",
    text: "Aprenda a observar e aproveitar diferentes condições de iluminação.",
  },
  {
    icon: Crop,
    title: "Enquadramentos melhores",
    text: "Conheça técnicas para organizar os elementos dentro da fotografia.",
  },
  {
    icon: Wand2,
    title: "Edição mais natural",
    text: "Descubra ajustes que podem melhorar suas imagens sem exageros.",
  },
  {
    icon: Sparkles,
    title: "Mais criatividade",
    text: "Explore ângulos, estilos e composições para criar fotografias diferentes.",
  },
];

const paraQuem: { icon: LucideIcon; title: string; text: string }[] = [
  {
    icon: ImageIcon,
    title: "Criar fotos melhores para redes sociais",
    text: "Para quem deseja publicar imagens mais organizadas e atraentes.",
  },
  {
    icon: Package,
    title: "Fotografar produtos",
    text: "Para pequenos negócios que precisam apresentar melhor seus produtos.",
  },
  {
    icon: Compass,
    title: "Registrar viagens e momentos",
    text: "Para quem deseja criar lembranças com mais qualidade visual.",
  },
  {
    icon: Camera,
    title: "Começar na fotografia",
    text: "Para iniciantes que desejam compreender os fundamentos.",
  },
  {
    icon: Layers,
    title: "Produzir conteúdo",
    text: "Para criadores, profissionais autônomos e pequenos empreendedores.",
  },
  {
    icon: Wand2,
    title: "Aprender edição básica",
    text: "Para quem deseja editar fotos diretamente pelo celular.",
  },
];

const modulos: { title: string; items: string[] }[] = [
  {
    title: "Módulo 1 — Conhecendo a câmera do celular",
    items: ["Funções principais", "Foco e exposição", "Resolução", "Cuidados com a lente", "Configurações básicas"],
  },
  {
    title: "Módulo 2 — Fundamentos da iluminação",
    items: ["Luz natural", "Direção da luz", "Sombras", "Horários", "Erros comuns"],
  },
  {
    title: "Módulo 3 — Enquadramento e composição",
    items: ["Regra dos terços", "Linhas", "Simetria", "Espaço negativo", "Organização dos elementos"],
  },
  {
    title: "Módulo 4 — Fotografando pessoas",
    items: ["Ângulos", "Poses naturais", "Luz para retratos", "Fundo", "Distância"],
  },
  {
    title: "Módulo 5 — Fotografia de produtos",
    items: [
      "Preparação do ambiente",
      "Fundo",
      "Iluminação",
      "Detalhes",
      "Fotografias para catálogos e redes sociais",
    ],
  },
  {
    title: "Módulo 6 — Fotografia para conteúdo",
    items: ["Planejamento visual", "Sequência de imagens", "Identidade", "Formatos", "Organização de referências"],
  },
  {
    title: "Módulo 7 — Edição pelo celular",
    items: ["Luz", "Contraste", "Cor", "Corte", "Nitidez", "Uso equilibrado de filtros"],
  },
  {
    title: "Módulo 8 — Projeto prático",
    items: [
      "Escolha de um tema",
      "Planejamento",
      "Produção das fotografias",
      "Seleção",
      "Edição",
      "Organização do resultado final",
    ],
  },
];

const formato: { icon: LucideIcon; title: string; text: string }[] = [
  {
    icon: PlayCircle,
    title: "Aulas gravadas",
    text: "Assista aos conteúdos de acordo com sua disponibilidade.",
  },
  {
    icon: MonitorSmartphone,
    title: "Acesso em diferentes dispositivos",
    text: "Visualize as aulas pelo celular, tablet ou computador.",
  },
  {
    icon: Check,
    title: "Exercícios práticos",
    text: "Coloque os conceitos em prática ao final de cada módulo.",
  },
  {
    icon: BookOpen,
    title: "Materiais de apoio",
    text: "Utilize guias e checklists para acompanhar o aprendizado.",
  },
  {
    icon: Users,
    title: "Comunidade demonstrativa",
    text: "Espaço conceitual para troca de experiências entre os participantes.",
  },
];

const resultados = [
  "Maior percepção de luz e composição",
  "Mais segurança para testar enquadramentos",
  "Melhor organização visual das imagens",
  "Conhecimento básico de edição",
  "Mais criatividade na produção de fotografias",
  "Capacidade de planejar uma sequência de imagens",
];

const galeria = [
  { img: retratoImg, label: "Retrato", alt: "Retrato com luz natural suave" },
  { img: produtoImg, label: "Fotografia de produto", alt: "Caneca de cerâmica fotografada sobre fundo claro" },
  { img: comidaImg, label: "Fotografia de comida", alt: "Prato de café da manhã visto de cima" },
  { img: paisagemImg, label: "Paisagem", alt: "Montanhas ao amanhecer" },
  { img: conteudoImg, label: "Conteúdo para redes sociais", alt: "Composição de mesa com caderno e objetos" },
  { img: urbanaImg, label: "Fotografia urbana", alt: "Avenida da cidade ao entardecer" },
];

const bonus = [
  {
    title: "Guia de enquadramentos",
    text: "Material visual com referências de composição para diferentes tipos de fotografia.",
  },
  {
    title: "Checklist de fotografia de produtos",
    text: "Lista de preparação para organizar ambiente, luz e elementos antes de fotografar.",
  },
  {
    title: "Guia de edição natural",
    text: "Orientações básicas para realizar ajustes sem deixar a imagem artificial.",
  },
];

const ofertaItens = [
  "Oito módulos",
  "Aulas gravadas",
  "Exercícios práticos",
  "Materiais de apoio",
  "Três bônus",
  "Acesso demonstrativo por 12 meses",
];

const faqs = [
  {
    q: "Preciso ter experiência com fotografia?",
    a: "Não. A estrutura foi pensada para iniciantes. Lembrando que este é um projeto demonstrativo e o curso não está sendo comercializado.",
  },
  {
    q: "Preciso ter um celular específico?",
    a: "Não. Os conceitos apresentados são gerais e podem ser aplicados com o aparelho que você já utiliza. Trata-se de um conteúdo fictício, criado apenas para demonstração.",
  },
  {
    q: "Como as aulas são acessadas?",
    a: "Em um projeto real, as aulas seriam disponibilizadas em uma plataforma escolhida pelo produtor. Aqui não existe área de membros nem cadastro.",
  },
  {
    q: "Por quanto tempo o curso fica disponível?",
    a: "O prazo de 12 meses citado na oferta é fictício e serve apenas para ilustrar como essa informação aparece em uma página de vendas.",
  },
  {
    q: "O curso possui certificado?",
    a: "O certificado é um elemento fictício desta demonstração. Em um projeto real, a emissão precisaria ser definida pelo produtor.",
  },
  {
    q: "Posso assistir pelo celular?",
    a: "A proposta demonstrativa prevê acesso por celular, tablet ou computador. Nenhum conteúdo real está disponível nesta página.",
  },
  {
    q: "Os resultados são garantidos?",
    a: "Não. Os resultados dependem de prática, dedicação, equipamento e das características individuais de cada participante.",
  },
  {
    q: "Como funciona a garantia?",
    a: "A garantia apresentada é fictícia. Em uma oferta real, as condições seriam definidas pelo produtor e pela plataforma de pagamento.",
  },
  {
    q: "Existe suporte para dúvidas?",
    a: "Nesta demonstração não há suporte, pois nenhum curso está sendo vendido. Em um projeto real, o canal de atendimento seria definido pelo produtor.",
  },
  {
    q: "Como faço a inscrição?",
    a: "Nenhuma inscrição será processada. Os botões abrem apenas um aviso informando que se trata de uma demonstração da TRAZEVO.",
  },
];

function Logo() {
  return (
    <a href="#topo" className="flex items-center gap-2.5">
      <span
        className="grid h-9 w-9 place-items-center rounded-xl text-white"
        style={{ background: "linear-gradient(135deg, var(--fp-roxo), var(--fp-azul))" }}
      >
        <Aperture className="h-5 w-5" aria-hidden />
      </span>
      <span className="text-[15px] font-semibold tracking-tight" style={{ color: "var(--fp-texto)" }}>
        FotoPro <span style={{ color: "var(--fp-roxo-claro)" }}>Mobile</span>
      </span>
    </a>
  );
}

function Faixa() {
  return (
    <div
      className="px-4 py-2.5 text-center text-[12px] leading-snug text-white sm:text-[13px]"
      style={{ background: "linear-gradient(90deg, var(--fp-roxo), var(--fp-azul))" }}
    >
      Projeto demonstrativo desenvolvido pela TRAZEVO. O curso, a oferta e todas as informações
      apresentadas são fictícios.
    </div>
  );
}

function SectionHead({
  eyebrow,
  title,
  text,
  center = true,
}: {
  eyebrow?: string;
  title: string;
  text?: string;
  center?: boolean;
}) {
  return (
    <div className={center ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      {eyebrow ? (
        <p className="text-xs font-semibold uppercase tracking-[0.18em]" style={{ color: "var(--fp-roxo-claro)" }}>
          {eyebrow}
        </p>
      ) : null}
      <h2 className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl" style={{ color: "var(--fp-texto)" }}>
        {title}
      </h2>
      {text ? (
        <p className="mt-3 text-[15px] leading-relaxed" style={{ color: "var(--fp-muted)" }}>
          {text}
        </p>
      ) : null}
    </div>
  );
}

function FotoProPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [modal, setModal] = useState(false);
  const [player, setPlayer] = useState(false);
  const [aberto, setAberto] = useState<number | null>(0);
  const [faqAberta, setFaqAberta] = useState<number | null>(null);
  const [leadEnviado, setLeadEnviado] = useState(false);

  const enviarLead = (event: FormEvent) => {
    event.preventDefault();
    setLeadEnviado(true);
  };

  const cta =
    "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-[15px] font-semibold text-white shadow-lg transition-transform hover:-translate-y-0.5";
  const ctaBg = { background: "linear-gradient(135deg, var(--fp-roxo), var(--fp-azul))" };
  const ctaGhost =
    "inline-flex items-center justify-center gap-2 rounded-full border px-6 py-3.5 text-[15px] font-semibold transition-colors";

  return (
    <div id="topo" style={{ ...palette, background: "#fff", color: "var(--fp-texto)" }}>
      <Faixa />

      <header
        className="sticky top-0 z-40 border-b bg-white/90 backdrop-blur"
        style={{ borderColor: "var(--fp-linha)" }}
      >
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4">
          <Logo />
          <nav className="hidden items-center gap-1 lg:flex" aria-label="Navegação do curso">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="rounded-full px-3 py-2 text-sm transition-colors hover:bg-[var(--fp-cinza)]"
                style={{ color: "var(--fp-muted)" }}
              >
                {item.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <a href="#oferta" className="hidden rounded-full px-5 py-2.5 text-sm font-semibold text-white sm:inline-flex" style={ctaBg}>
              Quero conhecer o curso
            </a>
            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              className="grid h-10 w-10 place-items-center rounded-full border lg:hidden"
              style={{ borderColor: "var(--fp-linha)" }}
              aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
            >
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
        {menuOpen ? (
          <div className="border-t px-4 py-3 lg:hidden" style={{ borderColor: "var(--fp-linha)" }}>
            <nav className="flex flex-col" aria-label="Navegação mobile">
              {nav.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="rounded-lg px-3 py-3 text-sm"
                  style={{ color: "var(--fp-muted)" }}
                >
                  {item.label}
                </a>
              ))}
              <a href="#oferta" onClick={() => setMenuOpen(false)} className={`${cta} mt-2`} style={ctaBg}>
                Quero conhecer o curso
              </a>
            </nav>
          </div>
        ) : null}
      </header>

      <main>
        {/* Hero */}
        <section id="curso" className="relative overflow-hidden" style={{ background: "var(--fp-cinza)" }}>
          <div className="mx-auto grid max-w-6xl gap-12 px-4 py-16 lg:grid-cols-[1.05fr_.95fr] lg:items-center lg:py-24">
            <div>
              <span
                className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold"
                style={{ background: "var(--fp-azul-claro)", color: "var(--fp-roxo)" }}
              >
                <Camera className="h-3.5 w-3.5" aria-hidden /> Curso online para iniciantes
              </span>
              <h1 className="mt-5 text-[34px] font-bold leading-[1.1] tracking-tight sm:text-5xl">
                Aprenda a criar fotos incríveis usando apenas o seu celular.
              </h1>
              <p className="mt-5 max-w-xl text-[16px] leading-relaxed" style={{ color: "var(--fp-muted)" }}>
                Descubra técnicas simples de luz, enquadramento, composição e edição para produzir
                imagens mais bonitas, profissionais e criativas.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a href="#oferta" className={cta} style={ctaBg}>
                  Quero conhecer o curso <ArrowRight className="h-4 w-4" aria-hidden />
                </a>
                <a href="#conteudo" className={ctaGhost} style={{ borderColor: "var(--fp-linha)", color: "var(--fp-texto)" }}>
                  Ver o conteúdo das aulas
                </a>
              </div>
              <ul className="mt-8 grid gap-2 sm:grid-cols-2">
                {heroPontos.map((ponto) => (
                  <li key={ponto} className="flex items-center gap-2 text-sm" style={{ color: "var(--fp-muted)" }}>
                    <Check className="h-4 w-4 shrink-0" style={{ color: "var(--fp-azul)" }} aria-hidden />
                    {ponto}
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative mx-auto w-full max-w-md">
              <div
                className="absolute -inset-6 -z-10 rounded-[40px] opacity-25 blur-2xl"
                style={{ background: "linear-gradient(135deg, var(--fp-roxo), var(--fp-azul))" }}
                aria-hidden
              />
              <div
                className="mx-auto w-[280px] rounded-[38px] border-8 bg-white p-2 shadow-2xl sm:w-[320px]"
                style={{ borderColor: "#15141B" }}
              >
                <div className="overflow-hidden rounded-[26px]">
                  <img
                    src={heroImg}
                    alt="Pessoa fotografando uma composição com o celular"
                    width={1280}
                    height={960}
                    className="h-[420px] w-full object-cover sm:h-[470px]"
                  />
                </div>
              </div>
              <div
                className="absolute -bottom-4 left-0 rounded-2xl border bg-white px-4 py-3 shadow-lg"
                style={{ borderColor: "var(--fp-linha)" }}
              >
                <p className="text-xs font-semibold">Aula 03 · Luz natural</p>
                <p className="text-[11px]" style={{ color: "var(--fp-muted)" }}>
                  Conteúdo demonstrativo
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Problema */}
        <section className="mx-auto max-w-6xl px-4 py-16 sm:py-20">
          <SectionHead title="Suas fotos não ficam como você imaginava?" />
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {problemas.map((item) => (
              <li
                key={item}
                className="rounded-2xl border p-5 text-sm"
                style={{ borderColor: "var(--fp-linha)", color: "var(--fp-muted)" }}
              >
                {item}
              </li>
            ))}
          </ul>
          <p
            className="mx-auto mt-10 max-w-3xl rounded-2xl p-6 text-center text-[15px] leading-relaxed"
            style={{ background: "var(--fp-azul-claro)", color: "var(--fp-roxo)" }}
          >
            Você não precisa começar com uma câmera profissional. Entender os fundamentos da
            fotografia pode ajudar a aproveitar melhor o equipamento que já está em suas mãos.
          </p>
        </section>

        {/* Solução */}
        <section className="py-16 sm:py-20" style={{ background: "var(--fp-cinza)" }}>
          <div className="mx-auto max-w-6xl px-4">
            <SectionHead
              eyebrow="A proposta"
              title="Fotografia pode ser mais simples do que parece."
              text="O FotoPro Mobile é um curso conceitual criado para ensinar os fundamentos da fotografia com celular de maneira prática, visual e acessível."
            />
            <p
              className="mx-auto mt-4 max-w-2xl text-center text-[15px] leading-relaxed"
              style={{ color: "var(--fp-muted)" }}
            >
              As aulas apresentam conceitos de iluminação, enquadramento, composição, configuração e
              edição para ajudar iniciantes a desenvolverem um olhar mais cuidadoso para suas imagens.
            </p>
            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {beneficios.map(({ icon: Icon, title, text }) => (
                <div key={title} className="rounded-2xl border bg-white p-6" style={{ borderColor: "var(--fp-linha)" }}>
                  <span
                    className="grid h-11 w-11 place-items-center rounded-xl text-white"
                    style={{ background: "linear-gradient(135deg, var(--fp-roxo), var(--fp-azul))" }}
                  >
                    <Icon className="h-5 w-5" aria-hidden />
                  </span>
                  <h3 className="mt-4 text-base font-semibold">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed" style={{ color: "var(--fp-muted)" }}>
                    {text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Para quem é */}
        <section id="para-quem" className="mx-auto max-w-6xl px-4 py-16 sm:py-20">
          <SectionHead eyebrow="Público" title="Este curso foi pensado para quem deseja…" />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {paraQuem.map(({ icon: Icon, title, text }) => (
              <div
                key={title}
                className="rounded-2xl border p-6 transition-shadow hover:shadow-md"
                style={{ borderColor: "var(--fp-linha)" }}
              >
                <Icon className="h-6 w-6" style={{ color: "var(--fp-roxo-claro)" }} aria-hidden />
                <h3 className="mt-4 text-base font-semibold">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed" style={{ color: "var(--fp-muted)" }}>
                  {text}
                </p>
              </div>
            ))}
          </div>
          <p className="mt-8 text-center text-sm" style={{ color: "var(--fp-muted)" }}>
            Não é necessário possuir câmera profissional ou experiência anterior.
          </p>
        </section>

        {/* Conteúdo */}
        <section id="conteudo" className="py-16 sm:py-20" style={{ background: "var(--fp-cinza)" }}>
          <div className="mx-auto max-w-4xl px-4">
            <SectionHead eyebrow="Conteúdo" title="O que você vai encontrar no FotoPro Mobile" />
            <div className="mt-10 space-y-3">
              {modulos.map((modulo, index) => {
                const open = aberto === index;
                return (
                  <div key={modulo.title} className="overflow-hidden rounded-2xl border bg-white" style={{ borderColor: "var(--fp-linha)" }}>
                    <button
                      type="button"
                      onClick={() => setAberto(open ? null : index)}
                      aria-expanded={open}
                      className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                    >
                      <span className="text-[15px] font-semibold">{modulo.title}</span>
                      <ChevronDown
                        className={`h-5 w-5 shrink-0 transition-transform ${open ? "rotate-180" : ""}`}
                        style={{ color: "var(--fp-roxo-claro)" }}
                        aria-hidden
                      />
                    </button>
                    {open ? (
                      <ul className="grid gap-2 px-5 pb-5 sm:grid-cols-2">
                        {modulo.items.map((item) => (
                          <li key={item} className="flex items-center gap-2 text-sm" style={{ color: "var(--fp-muted)" }}>
                            <Check className="h-4 w-4 shrink-0" style={{ color: "var(--fp-azul)" }} aria-hidden />
                            {item}
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </div>
                );
              })}
            </div>
            <p className="mt-6 text-center text-xs" style={{ color: "var(--fp-muted)" }}>
              Estrutura fictícia criada exclusivamente para este projeto demonstrativo.
            </p>
          </div>
        </section>

        {/* Formato */}
        <section className="mx-auto max-w-6xl px-4 py-16 sm:py-20">
          <SectionHead eyebrow="Formato" title="Aprenda no seu ritmo." />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {formato.map(({ icon: Icon, title, text }) => (
              <div key={title} className="rounded-2xl border p-6" style={{ borderColor: "var(--fp-linha)" }}>
                <span
                  className="grid h-10 w-10 place-items-center rounded-xl"
                  style={{ background: "var(--fp-azul-claro)", color: "var(--fp-roxo)" }}
                >
                  <Icon className="h-5 w-5" aria-hidden />
                </span>
                <h3 className="mt-4 text-base font-semibold">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed" style={{ color: "var(--fp-muted)" }}>
                  {text}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Instrutora */}
        <section id="instrutora" className="py-16 sm:py-20" style={{ background: "var(--fp-cinza)" }}>
          <div className="mx-auto grid max-w-6xl gap-10 px-4 lg:grid-cols-[.85fr_1.15fr] lg:items-center">
            <img
              src={instrutoraImg}
              alt="Fotografia genérica de uma fotógrafa em estúdio, utilizada como imagem ilustrativa"
              width={900}
              height={1100}
              loading="lazy"
              className="w-full rounded-3xl object-cover shadow-lg"
            />
            <div>
              <SectionHead eyebrow="Instrutora" title="Marina Campos" center={false} />
              <p className="mt-3 text-sm font-medium" style={{ color: "var(--fp-roxo-claro)" }}>
                Fotógrafa e educadora fictícia criada exclusivamente para este projeto demonstrativo.
              </p>
              <p className="mt-4 text-[15px] leading-relaxed" style={{ color: "var(--fp-muted)" }}>
                Marina apresenta os fundamentos da fotografia de forma simples e visual, ajudando
                iniciantes a compreenderem como luz, enquadramento e edição influenciam o resultado de
                uma imagem.
              </p>
              <p
                className="mt-6 rounded-2xl border p-4 text-sm"
                style={{ borderColor: "var(--fp-linha)", background: "#fff", color: "var(--fp-muted)" }}
              >
                A instrutora, sua imagem, formação e trajetória são fictícias.
              </p>
            </div>
          </div>
        </section>

        {/* Player */}
        <section className="mx-auto max-w-4xl px-4 py-16 sm:py-20">
          <SectionHead
            eyebrow="Demonstração"
            title="Conheça a experiência do curso."
            text="Assista a uma apresentação demonstrativa e veja como os conteúdos podem ser organizados em uma página de vendas profissional."
          />
          <button
            type="button"
            onClick={() => setPlayer(true)}
            className="group relative mt-10 block w-full overflow-hidden rounded-3xl border"
            style={{ borderColor: "var(--fp-linha)" }}
            aria-label="Abrir vídeo demonstrativo"
          >
            <img
              src={aulaImg}
              alt="Capa da aula demonstrativa com celular em tripé"
              width={1280}
              height={720}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <span className="absolute inset-0 grid place-items-center bg-black/35">
              <span className="grid h-16 w-16 place-items-center rounded-full bg-white/95">
                <PlayCircle className="h-9 w-9" style={{ color: "var(--fp-roxo)" }} aria-hidden />
              </span>
            </span>
          </button>
          {player ? (
            <div
              className="mt-4 rounded-2xl border p-4 text-center text-sm"
              style={{ borderColor: "var(--fp-linha)", color: "var(--fp-muted)" }}
              role="status"
            >
              Vídeo demonstrativo. Nenhum conteúdo real foi adicionado.
              <button
                type="button"
                onClick={() => setPlayer(false)}
                className="ml-2 font-semibold underline"
                style={{ color: "var(--fp-roxo)" }}
              >
                Fechar
              </button>
            </div>
          ) : null}
        </section>

        {/* Resultados */}
        <section className="py-16 sm:py-20" style={{ background: "var(--fp-cinza)" }}>
          <div className="mx-auto max-w-5xl px-4">
            <SectionHead title="O que você poderá desenvolver durante o curso" />
            <ul className="mt-10 grid gap-4 sm:grid-cols-2">
              {resultados.map((item) => (
                <li key={item} className="flex items-start gap-3 rounded-2xl border bg-white p-5 text-sm" style={{ borderColor: "var(--fp-linha)" }}>
                  <Check className="mt-0.5 h-4 w-4 shrink-0" style={{ color: "var(--fp-azul)" }} aria-hidden />
                  <span style={{ color: "var(--fp-muted)" }}>{item}</span>
                </li>
              ))}
            </ul>
            <p className="mt-8 text-center text-xs" style={{ color: "var(--fp-muted)" }}>
              Os resultados dependem da dedicação, da prática, do equipamento e das características
              individuais de cada participante.
            </p>
          </div>
        </section>

        {/* Galeria */}
        <section className="mx-auto max-w-6xl px-4 py-16 sm:py-20">
          <SectionHead eyebrow="Inspiração" title="Possibilidades que você pode explorar" />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {galeria.map((item) => (
              <figure key={item.label} className="overflow-hidden rounded-2xl border" style={{ borderColor: "var(--fp-linha)" }}>
                <img
                  src={item.img}
                  alt={item.alt}
                  width={900}
                  height={900}
                  loading="lazy"
                  className="h-56 w-full object-cover transition-transform duration-500 hover:scale-105"
                />
                <figcaption className="px-4 py-3 text-sm font-medium">{item.label}</figcaption>
              </figure>
            ))}
          </div>
          <p className="mt-8 text-center text-xs" style={{ color: "var(--fp-muted)" }}>
            Imagens ilustrativas. Não representam resultados de alunos.
          </p>
        </section>

        {/* Bônus */}
        <section className="py-16 sm:py-20" style={{ background: "var(--fp-cinza)" }}>
          <div className="mx-auto max-w-6xl px-4">
            <SectionHead eyebrow="Bônus" title="Materiais complementares" />
            <div className="mt-10 grid gap-5 lg:grid-cols-3">
              {bonus.map((item) => (
                <div key={item.title} className="rounded-2xl border bg-white p-6" style={{ borderColor: "var(--fp-linha)" }}>
                  <span
                    className="inline-flex rounded-lg px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide"
                    style={{ background: "rgba(245,158,11,.15)", color: "#B45309" }}
                  >
                    Bônus
                  </span>
                  <h3 className="mt-3 text-base font-semibold">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed" style={{ color: "var(--fp-muted)" }}>
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
            <p className="mt-6 text-center text-xs" style={{ color: "var(--fp-muted)" }}>
              Bônus fictícios utilizados exclusivamente para demonstração da oferta.
            </p>
          </div>
        </section>

        {/* Oferta */}
        <section id="oferta" className="mx-auto max-w-4xl px-4 py-16 sm:py-20">
          <div
            className="overflow-hidden rounded-3xl p-8 text-white sm:p-12"
            style={{ background: "linear-gradient(135deg, var(--fp-roxo), var(--fp-azul))" }}
          >
            <h2 className="text-center text-2xl font-bold sm:text-3xl">Acesso completo ao FotoPro Mobile</h2>
            <ul className="mx-auto mt-8 grid max-w-xl gap-3 sm:grid-cols-2">
              {ofertaItens.map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm text-white/90">
                  <Check className="h-4 w-4 shrink-0" style={{ color: "var(--fp-destaque)" }} aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-10 rounded-2xl bg-white/10 p-6 text-center">
              <p className="text-sm text-white/70 line-through">De R$ 297</p>
              <p className="mt-1 text-4xl font-bold sm:text-5xl">R$ 97 à vista</p>
              <p className="mt-2 text-sm text-white/80">ou 12 parcelas fictícias de R$ 9,74</p>
              <button type="button" onClick={() => setModal(true)} className={`${cta} mt-6 w-full sm:w-auto`} style={{ background: "var(--fp-destaque)", color: "#231402" }}>
                Quero acessar o curso <ArrowRight className="h-4 w-4" aria-hidden />
              </button>
            </div>
          </div>
          <p className="mt-6 text-center text-xs" style={{ color: "var(--fp-muted)" }}>
            Preço, parcelamento, condições e conteúdo apresentados são fictícios.
          </p>
        </section>

        {/* Garantia */}
        <section className="mx-auto max-w-4xl px-4 pb-16 sm:pb-20">
          <div className="rounded-3xl border p-8 text-center" style={{ borderColor: "var(--fp-linha)", background: "var(--fp-cinza)" }}>
            <ShieldCheck className="mx-auto h-10 w-10" style={{ color: "var(--fp-roxo-claro)" }} aria-hidden />
            <h2 className="mt-4 text-xl font-bold sm:text-2xl">Garantia demonstrativa de sete dias</h2>
            <p className="mx-auto mt-3 max-w-2xl text-[15px] leading-relaxed" style={{ color: "var(--fp-muted)" }}>
              Em uma oferta real, esta seção pode apresentar as condições de garantia definidas pelo
              produtor e pela plataforma de pagamento.
            </p>
            <p className="mt-4 text-xs" style={{ color: "var(--fp-muted)" }}>
              A garantia apresentada é fictícia e existe apenas para demonstrar a estrutura de uma
              landing page de infoproduto.
            </p>
          </div>
        </section>

        {/* FAQ */}
        <section id="duvidas" className="py-16 sm:py-20" style={{ background: "var(--fp-cinza)" }}>
          <div className="mx-auto max-w-3xl px-4">
            <SectionHead eyebrow="Dúvidas" title="Perguntas frequentes" />
            <div className="mt-10 space-y-3">
              {faqs.map((faq, index) => {
                const open = faqAberta === index;
                return (
                  <div key={faq.q} className="overflow-hidden rounded-2xl border bg-white" style={{ borderColor: "var(--fp-linha)" }}>
                    <button
                      type="button"
                      onClick={() => setFaqAberta(open ? null : index)}
                      aria-expanded={open}
                      className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                    >
                      <span className="text-[15px] font-medium">{faq.q}</span>
                      <ChevronDown
                        className={`h-5 w-5 shrink-0 transition-transform ${open ? "rotate-180" : ""}`}
                        style={{ color: "var(--fp-roxo-claro)" }}
                        aria-hidden
                      />
                    </button>
                    {open ? (
                      <p className="px-5 pb-5 text-sm leading-relaxed" style={{ color: "var(--fp-muted)" }}>
                        {faq.a}
                      </p>
                    ) : null}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA final */}
        <section className="mx-auto max-w-4xl px-4 py-16 text-center sm:py-20">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Comece a enxergar novas possibilidades em cada fotografia.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-[15px] leading-relaxed" style={{ color: "var(--fp-muted)" }}>
            Conheça uma estrutura de curso criada para transformar conhecimento em uma experiência
            digital clara, organizada e profissional.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <button type="button" onClick={() => setModal(true)} className={cta} style={ctaBg}>
              Quero conhecer o curso
            </button>
            <a href="/" className={ctaGhost} style={{ borderColor: "var(--fp-linha)", color: "var(--fp-texto)" }}>
              Conhecer a TRAZEVO
            </a>
          </div>
        </section>

        {/* Lead */}
        <section className="py-16 sm:py-20" style={{ background: "var(--fp-cinza)" }}>
          <div className="mx-auto max-w-2xl px-4">
            <SectionHead eyebrow="Aula introdutória" title="Receba uma aula introdutória" />
            <form onSubmit={enviarLead} className="mt-8 space-y-4 rounded-3xl border bg-white p-6" style={{ borderColor: "var(--fp-linha)" }}>
              <div>
                <label htmlFor="fp-nome" className="text-sm font-medium">Nome</label>
                <input id="fp-nome" name="nome" className="mt-1.5 w-full rounded-xl border px-4 py-3 text-sm outline-none" style={{ borderColor: "var(--fp-linha)" }} placeholder="Seu nome" />
              </div>
              <div>
                <label htmlFor="fp-email" className="text-sm font-medium">E-mail</label>
                <input id="fp-email" name="email" type="email" className="mt-1.5 w-full rounded-xl border px-4 py-3 text-sm outline-none" style={{ borderColor: "var(--fp-linha)" }} placeholder="voce@email.com" />
              </div>
              <div>
                <label htmlFor="fp-whats" className="text-sm font-medium">WhatsApp (opcional)</label>
                <input id="fp-whats" name="whatsapp" className="mt-1.5 w-full rounded-xl border px-4 py-3 text-sm outline-none" style={{ borderColor: "var(--fp-linha)" }} placeholder="(11) 90000-0000" />
              </div>
              <button type="submit" className={`${cta} w-full`} style={ctaBg}>
                Quero receber
              </button>
              {leadEnviado ? (
                <p className="rounded-xl px-4 py-3 text-center text-sm" style={{ background: "var(--fp-azul-claro)", color: "var(--fp-roxo)" }} role="status">
                  Formulário demonstrativo. Nenhum dado foi enviado ou armazenado.
                </p>
              ) : null}
            </form>
            <p className="mt-4 text-center text-xs" style={{ color: "var(--fp-muted)" }}>
              Em um projeto real, esta área pode ser integrada a uma plataforma de e-mail marketing
              mediante autorização do usuário.
            </p>
          </div>
        </section>
      </main>

      <footer className="border-t bg-white" style={{ borderColor: "var(--fp-linha)" }}>
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:grid-cols-2">
          <div>
            <Logo />
            <p className="mt-3 max-w-sm text-sm" style={{ color: "var(--fp-muted)" }}>
              Transforme fotos comuns em imagens que chamam atenção.
            </p>
          </div>
          <nav className="grid grid-cols-2 gap-2 text-sm" aria-label="Rodapé">
            {nav.map((item) => (
              <a key={item.href} href={item.href} style={{ color: "var(--fp-muted)" }}>
                {item.label}
              </a>
            ))}
            <a href="/politica-de-privacidade" style={{ color: "var(--fp-muted)" }}>
              Política de Privacidade
            </a>
          </nav>
        </div>
        <div className="border-t px-4 py-6 text-center text-xs" style={{ borderColor: "var(--fp-linha)", color: "var(--fp-muted)" }}>
          <p>
            Projeto conceitual desenvolvido pela{" "}
            <a href="/" className="font-semibold underline" style={{ color: "var(--fp-roxo)" }}>
              TRAZEVO
            </a>
            .
          </p>
          <p className="mx-auto mt-2 max-w-3xl">
            Este site é uma demonstração. O curso, a instrutora, o preço, os materiais e todas as
            informações apresentadas são fictícios.
          </p>
        </div>
      </footer>

      {modal ? (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/60 px-4" role="dialog" aria-modal="true" aria-label="Aviso de demonstração">
          <div className="w-full max-w-md rounded-3xl bg-white p-7 text-center">
            <span
              className="mx-auto grid h-12 w-12 place-items-center rounded-2xl text-white"
              style={{ background: "linear-gradient(135deg, var(--fp-roxo), var(--fp-azul))" }}
            >
              <Smartphone className="h-6 w-6" aria-hidden />
            </span>
            <p className="mt-5 text-[15px] leading-relaxed" style={{ color: "var(--fp-texto)" }}>
              Este é um projeto demonstrativo desenvolvido pela TRAZEVO. Nenhuma compra ou inscrição
              real será processada.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => setModal(false)}
                className={`${ctaGhost} flex-1`}
                style={{ borderColor: "var(--fp-linha)", color: "var(--fp-texto)" }}
              >
                Fechar
              </button>
              <a href="/" className={`${cta} flex-1`} style={ctaBg}>
                Conhecer a TRAZEVO
              </a>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
