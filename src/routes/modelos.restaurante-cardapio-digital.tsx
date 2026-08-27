import { useMemo, useState, type CSSProperties, type FormEvent } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  ChefHat,
  ClipboardList,
  Clock,
  Leaf,
  Mail,
  MapPin,
  Menu,
  Minus,
  Phone,
  Plus,
  ShoppingBag,
  Sparkles,
  Trash2,
  Truck,
  UtensilsCrossed,
  X,
  ChevronDown,
  type LucideIcon,
} from "lucide-react";

import { WhatsAppIcon } from "@/components/site/whatsapp-icon";
import heroImg from "@/assets/vila-hero.jpg";
import massaImg from "@/assets/vila-massa.jpg";
import lancheImg from "@/assets/vila-lanche.jpg";
import sobremesaImg from "@/assets/vila-sobremesa.jpg";
import ambienteImg from "@/assets/vila-ambiente.jpg";
import mesaImg from "@/assets/vila-mesa.jpg";
import porcaoImg from "@/assets/vila-porcao.jpg";
import bebidaImg from "@/assets/vila-bebida.jpg";

const CANONICAL =
  "https://sunshine-stack-start.lovable.app/modelos/restaurante-cardapio-digital";
const TITLE = "Sabor da Vila | Cardápio demonstrativo TRAZEVO";
const DESCRIPTION =
  "Modelo demonstrativo de site para restaurante com cardápio digital e pedidos pelo WhatsApp, desenvolvido pela TRAZEVO.";

const WHATS = "5511999995555";
const wa = (message: string) => `https://wa.me/${WHATS}?text=${encodeURIComponent(message)}`;
const WA_PEDIDO = wa("Olá! Conheci o Sabor da Vila pelo site e gostaria de fazer um pedido.");
const WA_INFO = wa("Olá! Gostaria de solicitar informações sobre o Sabor da Vila.");

export const Route = createFileRoute("/modelos/restaurante-cardapio-digital")({
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
  component: SaborDaVilaPage,
});

const palette = {
  "--sv-terra": "#B4572F",
  "--sv-terra-dark": "#8F4123",
  "--sv-olive": "#5C6B4A",
  "--sv-beige": "#F6EFE5",
  "--sv-cream": "#FCF9F4",
  "--sv-brown": "#3B2A20",
  "--sv-amber": "#E0A63B",
  "--sv-line": "#E6DACA",
  "--sv-muted": "#7B6A5D",
} as CSSProperties;

const nav = [
  { label: "Início", href: "#inicio" },
  { label: "Cardápio", href: "#cardapio" },
  { label: "Combos", href: "#combos" },
  { label: "Sobre", href: "#sobre" },
  { label: "Como pedir", href: "#como-pedir" },
  { label: "Dúvidas", href: "#duvidas" },
  { label: "Contato", href: "#contato" },
];

type Product = {
  id: string;
  name: string;
  description?: string;
  price: number;
  category: string;
  image: string;
};

const categories = [
  "Pratos principais",
  "Massas",
  "Lanches",
  "Porções",
  "Bebidas",
  "Sobremesas",
  "Combos",
];

const products: Product[] = [
  { id: "p1", name: "Frango grelhado especial", description: "Filé de frango grelhado, arroz, feijão, salada fresca e acompanhamento do dia.", price: 29.9, category: "Pratos principais", image: heroImg },
  { id: "p2", name: "Carne acebolada", description: "Tiras de carne com cebola, arroz, feijão, batata e salada.", price: 34.9, category: "Pratos principais", image: heroImg },
  { id: "p3", name: "Filé à parmegiana", description: "Filé empanado com molho artesanal, queijo, arroz e batata.", price: 39.9, category: "Pratos principais", image: heroImg },
  { id: "m1", name: "Espaguete ao molho da casa", description: "Massa acompanhada de molho artesanal de tomate e ervas.", price: 27.9, category: "Massas", image: massaImg },
  { id: "m2", name: "Talharim cremoso", description: "Massa com molho cremoso, queijo e temperos especiais.", price: 31.9, category: "Massas", image: massaImg },
  { id: "m3", name: "Lasanha da Vila", description: "Camadas de massa, molho, queijo e recheio especial da casa.", price: 36.9, category: "Massas", image: massaImg },
  { id: "l1", name: "Vila Burger", description: "Hambúrguer, queijo, alface, tomate, cebola e molho especial.", price: 25.9, category: "Lanches", image: lancheImg },
  { id: "l2", name: "Burger duplo", description: "Dois hambúrgueres, queijo, cebola caramelizada e molho da casa.", price: 32.9, category: "Lanches", image: lancheImg },
  { id: "l3", name: "Sanduíche de frango", description: "Frango grelhado, queijo, salada e molho especial.", price: 23.9, category: "Lanches", image: lancheImg },
  { id: "o1", name: "Batata frita", description: "Porção de batatas crocantes com molho da casa.", price: 18.9, category: "Porções", image: porcaoImg },
  { id: "o2", name: "Calabresa acebolada", description: "Calabresa grelhada com cebola e acompanhamento.", price: 24.9, category: "Porções", image: porcaoImg },
  { id: "o3", name: "Iscas de frango", description: "Frango empanado acompanhado de molho especial.", price: 28.9, category: "Porções", image: porcaoImg },
  { id: "b1", name: "Refrigerante em lata", price: 6, category: "Bebidas", image: bebidaImg },
  { id: "b2", name: "Suco natural", description: "Consulte os sabores disponíveis.", price: 9, category: "Bebidas", image: bebidaImg },
  { id: "b3", name: "Água mineral", price: 4, category: "Bebidas", image: bebidaImg },
  { id: "s1", name: "Pudim da casa", description: "Pudim cremoso com calda de caramelo.", price: 10.9, category: "Sobremesas", image: sobremesaImg },
  { id: "s2", name: "Brownie com sorvete", description: "Brownie acompanhado de sorvete e calda.", price: 16.9, category: "Sobremesas", image: sobremesaImg },
  { id: "s3", name: "Mousse artesanal", description: "Consulte o sabor disponível no dia.", price: 9.9, category: "Sobremesas", image: sobremesaImg },
  { id: "c1", name: "Combo Individual", description: "Um lanche, uma porção pequena e uma bebida.", price: 39.9, category: "Combos", image: lancheImg },
  { id: "c2", name: "Combo Duplo", description: "Dois lanches, uma porção média e duas bebidas.", price: 74.9, category: "Combos", image: lancheImg },
  { id: "c3", name: "Combo Família", description: "Quatro lanches, duas porções e quatro bebidas.", price: 139.9, category: "Combos", image: lancheImg },
];

const brl = (value: number) =>
  value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

const beneficios: { icon: React.ComponentType<{ className?: string }>; title: string; text: string }[] = [
  { icon: Leaf, title: "Ingredientes selecionados", text: "Pratos preparados com ingredientes escolhidos para oferecer mais sabor e qualidade." },
  { icon: ChefHat, title: "Preparo cuidadoso", text: "Cada pedido é preparado com atenção para proporcionar uma experiência especial." },
  { icon: WhatsAppIcon, title: "Pedido pelo WhatsApp", text: "Escolha seus produtos e envie o pedido diretamente para nossa equipe." },
  { icon: Truck, title: "Entrega ou retirada", text: "Escolha a opção mais conveniente no momento de concluir seu pedido." },
];

const etapas = [
  { title: "Escolha seus produtos", text: "Navegue pelo cardápio e adicione seus itens favoritos." },
  { title: "Confira o pedido", text: "Revise produtos, quantidades e observações." },
  { title: "Escolha entrega ou retirada", text: "Informe como deseja receber seu pedido." },
  { title: "Envie pelo WhatsApp", text: "Seu pedido será organizado automaticamente em uma mensagem." },
];

const galeria = [
  { src: heroImg, alt: "Prato principal com frango grelhado, arroz e salada" },
  { src: massaImg, alt: "Massa com molho artesanal de tomate e ervas" },
  { src: lancheImg, alt: "Lanche artesanal com queijo e salada" },
  { src: sobremesaImg, alt: "Sobremesa de pudim com calda de caramelo" },
  { src: ambienteImg, alt: "Ambiente interno acolhedor do restaurante conceitual" },
  { src: mesaImg, alt: "Mesa preparada com louças e talheres" },
];

const faqs = [
  { q: "Como faço um pedido?", a: "Basta escolher os produtos no cardápio, ajustar quantidades e observações e enviar o resumo pelo WhatsApp. Este é um projeto demonstrativo: nenhum pedido real será processado." },
  { q: "Posso escolher retirada?", a: "Sim. No resumo do pedido é possível selecionar entrega ou retirada no restaurante. Em um projeto real, as condições são definidas pelo estabelecimento." },
  { q: "Como funciona a taxa de entrega?", a: "A taxa é calculada conforme o bairro. Os valores apresentados aqui são fictícios e precisam ser atualizados pelo restaurante real." },
  { q: "Quais formas de pagamento são aceitas?", a: "Neste modelo demonstrativo constam Pix, dinheiro e cartão na entrega. As formas aceitas dependem do restaurante." },
  { q: "Posso adicionar observações?", a: "Sim. Cada item permite uma observação, e há também um campo de observações gerais do pedido." },
  { q: "É possível retirar ingredientes?", a: "Basta informar na observação do item. A confirmação depende do estabelecimento." },
  { q: "Os preços estão atualizados?", a: "Não. Todos os valores deste projeto são fictícios e servem apenas para demonstração." },
  { q: "Quanto tempo demora a entrega?", a: "O prazo depende do restaurante, da região e do volume de pedidos. Consulte a previsão no momento do pedido." },
  { q: "O pedido é confirmado automaticamente?", a: "Não. O pedido precisa ser confirmado pelo estabelecimento, e a disponibilidade dos produtos pode variar." },
];

type CartItem = { id: string; name: string; price: number; qty: number; note: string };

function SaborDaVilaPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [category, setCategory] = useState("Pratos principais");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [drafts, setDrafts] = useState<Record<string, { qty: number; note: string }>>({});
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [tipo, setTipo] = useState("Entrega");
  const [endereco, setEndereco] = useState("");
  const [bairro, setBairro] = useState("");
  const [referencia, setReferencia] = useState("");
  const [pagamento, setPagamento] = useState("Pix");
  const [troco, setTroco] = useState("");
  const [obsGeral, setObsGeral] = useState("");
  const [erro, setErro] = useState<string | null>(null);

  const filtered = useMemo(
    () => products.filter((p) => p.category === category),
    [category],
  );
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);

  const draftOf = (id: string) => drafts[id] ?? { qty: 1, note: "" };
  const setDraft = (id: string, patch: Partial<{ qty: number; note: string }>) =>
    setDrafts((prev) => ({ ...prev, [id]: { ...draftOf(id), ...patch } }));

  const addToCart = (product: Product) => {
    const draft = draftOf(product.id);
    setCart((prev) => {
      const index = prev.findIndex((i) => i.id === product.id && i.note === draft.note);
      if (index >= 0) {
        const next = [...prev];
        next[index] = { ...next[index], qty: next[index].qty + draft.qty };
        return next;
      }
      return [
        ...prev,
        { id: product.id, name: product.name, price: product.price, qty: draft.qty, note: draft.note },
      ];
    });
    setDrafts((prev) => ({ ...prev, [product.id]: { qty: 1, note: "" } }));
    setCartOpen(true);
  };

  const changeQty = (index: number, delta: number) =>
    setCart((prev) =>
      prev
        .map((item, i) => (i === index ? { ...item, qty: Math.max(0, item.qty + delta) } : item))
        .filter((item) => item.qty > 0),
    );

  const removeItem = (index: number) => setCart((prev) => prev.filter((_, i) => i !== index));

  const sendOrder = (event: FormEvent) => {
    event.preventDefault();
    if (!cart.length) {
      setErro("Adicione ao menos um produto ao pedido.");
      return;
    }
    if (nome.trim().length < 2 || telefone.replace(/\D/g, "").length < 10) {
      setErro("Informe seu nome e um WhatsApp válido com DDD.");
      return;
    }
    if (tipo === "Entrega" && (endereco.trim().length < 5 || bairro.trim().length < 2)) {
      setErro("Para entrega, informe endereço e bairro.");
      return;
    }
    setErro(null);

    const linhas = cart
      .map(
        (item) =>
          `${item.qty}x ${item.name} — ${brl(item.price)} cada${item.note ? `\nObservação: ${item.note}` : ""}`,
      )
      .join("\n");

    const partes = [
      "Olá! Gostaria de fazer o seguinte pedido:",
      "",
      linhas,
      "",
      `Subtotal: ${brl(subtotal)}`,
      "",
      `Cliente: ${nome}`,
      `WhatsApp: ${telefone}`,
      `Tipo: ${tipo.toLowerCase()}`,
      ...(tipo === "Entrega"
        ? [`Endereço: ${endereco}`, `Bairro: ${bairro}`, referencia ? `Referência: ${referencia}` : ""]
        : ["Retirada no restaurante"]),
      `Pagamento: ${pagamento.toLowerCase()}`,
      ...(pagamento === "Dinheiro" && troco ? [`Troco para: ${troco}`] : []),
      ...(obsGeral ? [`Observações gerais: ${obsGeral}`] : []),
    ].filter(Boolean);

    window.open(wa(partes.join("\n")), "_blank", "noopener");
  };

  return (
    <div style={palette} className="min-h-screen bg-[var(--sv-cream)] text-[var(--sv-brown)]">
      <p className="bg-[var(--sv-brown)] px-4 py-2 text-center text-xs leading-relaxed text-[var(--sv-beige)] sm:text-sm">
        Projeto demonstrativo desenvolvido pela TRAZEVO. Produtos, preços, contatos e
        informações são fictícios.
      </p>

      <header className="sticky top-0 z-40 border-b border-[var(--sv-line)] bg-[var(--sv-cream)]/95 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4">
          <a href="#inicio" className="flex items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-[var(--sv-terra)] text-[var(--sv-cream)]">
              <UtensilsCrossed className="h-4 w-4" aria-hidden />
            </span>
            <span className="text-base font-semibold tracking-tight">Sabor da Vila</span>
          </a>

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Navegação principal">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="rounded-full px-3 py-2 text-sm text-[var(--sv-muted)] transition-colors hover:bg-[var(--sv-beige)] hover:text-[var(--sv-brown)]"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setCartOpen(true)}
              className="relative grid h-10 w-10 place-items-center rounded-full border border-[var(--sv-line)] bg-white transition-colors hover:bg-[var(--sv-beige)]"
              aria-label="Abrir resumo do pedido"
            >
              <ShoppingBag className="h-4 w-4" aria-hidden />
              {totalItems > 0 ? (
                <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-[var(--sv-terra)] px-1 text-[11px] font-semibold text-white">
                  {totalItems}
                </span>
              ) : null}
            </button>
            <a
              href="#cardapio"
              className="hidden rounded-full bg-[var(--sv-terra)] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--sv-terra-dark)] sm:inline-flex"
            >
              Fazer pedido
            </a>
            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              className="grid h-10 w-10 place-items-center rounded-full border border-[var(--sv-line)] bg-white lg:hidden"
              aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
              aria-expanded={menuOpen}
            >
              {menuOpen ? <X className="h-4 w-4" aria-hidden /> : <Menu className="h-4 w-4" aria-hidden />}
            </button>
          </div>
        </div>

        {menuOpen ? (
          <nav className="border-t border-[var(--sv-line)] bg-[var(--sv-cream)] px-4 py-3 lg:hidden" aria-label="Navegação mobile">
            <ul className="flex flex-col">
              {nav.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className="block rounded-lg px-3 py-3 text-sm text-[var(--sv-brown)] hover:bg-[var(--sv-beige)]"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
            <a
              href="#cardapio"
              onClick={() => setMenuOpen(false)}
              className="mt-2 block rounded-full bg-[var(--sv-terra)] px-5 py-3 text-center text-sm font-semibold text-white"
            >
              Fazer pedido
            </a>
          </nav>
        ) : null}
      </header>

      <main>
        {/* HERO */}
        <section id="inicio" className="border-b border-[var(--sv-line)] bg-[var(--sv-beige)]">
          <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-14 md:grid-cols-2 md:py-20">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-xs font-medium text-[var(--sv-olive)]">
                <Sparkles className="h-3.5 w-3.5" aria-hidden /> Comida feita com carinho, sabor e personalidade
              </span>
              <h1 className="mt-5 text-3xl font-bold leading-tight tracking-tight sm:text-4xl md:text-5xl">
                Comida de verdade para transformar qualquer momento.
              </h1>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-[var(--sv-muted)]">
                Pratos preparados com cuidado, ingredientes selecionados e aquele sabor especial
                que faz você querer repetir.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#cardapio"
                  className="rounded-full bg-[var(--sv-terra)] px-7 py-3.5 text-center text-sm font-semibold text-white transition-colors hover:bg-[var(--sv-terra-dark)]"
                >
                  Ver cardápio
                </a>
                <a
                  href={WA_PEDIDO}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-[var(--sv-olive)] px-7 py-3.5 text-center text-sm font-semibold text-[var(--sv-olive)] transition-colors hover:bg-white"
                >
                  Fazer pedido
                </a>
              </div>
            </div>
            <img
              src={heroImg}
              alt="Refeição bem apresentada com frango grelhado, arroz, feijão e salada"
              width={1600}
              height={1100}
              className="w-full rounded-3xl object-cover shadow-lg"
            />
          </div>
        </section>

        {/* BENEFÍCIOS */}
        <section className="mx-auto max-w-6xl px-4 py-14 md:py-16">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {beneficios.map(({ icon: Icon, title, text }) => (
              <div key={title} className="rounded-2xl border border-[var(--sv-line)] bg-white p-6 transition-shadow hover:shadow-md">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-[var(--sv-beige)] text-[var(--sv-terra)]">
                  <Icon className="h-5 w-5" aria-hidden />
                </span>
                <h3 className="mt-4 text-base font-semibold">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--sv-muted)]">{text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CARDÁPIO */}
        <section id="cardapio" className="border-y border-[var(--sv-line)] bg-white/70 py-14 md:py-20">
          <div className="mx-auto max-w-6xl px-4">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Cardápio digital</h2>
            <p className="mt-3 max-w-2xl text-[var(--sv-muted)]">
              Escolha uma categoria, ajuste a quantidade e adicione observações antes de montar
              seu pedido.
            </p>

            <div className="-mx-4 mt-8 overflow-x-auto px-4 pb-2">
              <div className="flex w-max gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setCategory(cat)}
                    className={
                      cat === category
                        ? "rounded-full bg-[var(--sv-olive)] px-5 py-2.5 text-sm font-semibold text-white"
                        : "rounded-full border border-[var(--sv-line)] bg-white px-5 py-2.5 text-sm text-[var(--sv-muted)] transition-colors hover:bg-[var(--sv-beige)]"
                    }
                    aria-pressed={cat === category}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((product) => {
                const draft = draftOf(product.id);
                return (
                  <article
                    key={product.id}
                    className="flex flex-col overflow-hidden rounded-2xl border border-[var(--sv-line)] bg-white transition-shadow hover:shadow-md"
                  >
                    <img
                      src={product.image}
                      alt={`Imagem ilustrativa de ${product.name}`}
                      width={1200}
                      height={900}
                      loading="lazy"
                      className="h-44 w-full object-cover"
                    />
                    <div className="flex flex-1 flex-col p-5">
                      <h3 className="text-base font-semibold">{product.name}</h3>
                      {product.description ? (
                        <p className="mt-1.5 text-sm leading-relaxed text-[var(--sv-muted)]">
                          {product.description}
                        </p>
                      ) : null}
                      <p className="mt-3 text-lg font-bold text-[var(--sv-terra)]">
                        {brl(product.price)}
                      </p>

                      <div className="mt-4 flex items-center gap-3">
                        <div className="flex items-center rounded-full border border-[var(--sv-line)]">
                          <button
                            type="button"
                            onClick={() => setDraft(product.id, { qty: Math.max(1, draft.qty - 1) })}
                            className="grid h-9 w-9 place-items-center rounded-full text-[var(--sv-muted)] hover:bg-[var(--sv-beige)]"
                            aria-label={`Diminuir quantidade de ${product.name}`}
                          >
                            <Minus className="h-4 w-4" aria-hidden />
                          </button>
                          <span className="w-8 text-center text-sm font-semibold">{draft.qty}</span>
                          <button
                            type="button"
                            onClick={() => setDraft(product.id, { qty: draft.qty + 1 })}
                            className="grid h-9 w-9 place-items-center rounded-full text-[var(--sv-muted)] hover:bg-[var(--sv-beige)]"
                            aria-label={`Aumentar quantidade de ${product.name}`}
                          >
                            <Plus className="h-4 w-4" aria-hidden />
                          </button>
                        </div>
                      </div>

                      <label className="mt-3 block text-xs font-medium text-[var(--sv-muted)]">
                        Observação (opcional)
                        <input
                          value={draft.note}
                          onChange={(e) => setDraft(product.id, { note: e.target.value })}
                          placeholder="Ex.: sem cebola"
                          className="mt-1 w-full rounded-lg border border-[var(--sv-line)] px-3 py-2 text-sm text-[var(--sv-brown)] outline-none focus:border-[var(--sv-olive)]"
                        />
                      </label>

                      <button
                        type="button"
                        onClick={() => addToCart(product)}
                        className="mt-4 w-full rounded-full bg-[var(--sv-terra)] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[var(--sv-terra-dark)]"
                      >
                        {product.category === "Combos" ? "Adicionar combo" : "Adicionar ao pedido"}
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>

            <p className="mt-8 rounded-xl bg-[var(--sv-beige)] p-4 text-center text-sm text-[var(--sv-muted)]">
              Produtos, ingredientes, imagens e preços apresentados neste projeto são fictícios.
            </p>
          </div>
        </section>

        {/* COMBOS */}
        <section id="combos" className="mx-auto max-w-6xl px-4 py-14 md:py-20">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Combos</h2>
          <p className="mt-3 max-w-2xl text-[var(--sv-muted)]">
            Opções montadas para diferentes momentos, prontas para adicionar ao pedido.
          </p>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {products
              .filter((p) => p.category === "Combos")
              .map((combo) => (
                <div key={combo.id} className="rounded-2xl border border-[var(--sv-line)] bg-white p-6">
                  <h3 className="text-lg font-semibold">{combo.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--sv-muted)]">
                    {combo.description}
                  </p>
                  <p className="mt-4 text-2xl font-bold text-[var(--sv-terra)]">{brl(combo.price)}</p>
                  <button
                    type="button"
                    onClick={() => addToCart(combo)}
                    className="mt-5 w-full rounded-full bg-[var(--sv-olive)] px-5 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                  >
                    Adicionar combo
                  </button>
                </div>
              ))}
          </div>
          <p className="mt-8 text-center text-sm text-[var(--sv-muted)]">
            Combos e valores fictícios utilizados exclusivamente para demonstração.
          </p>
        </section>

        {/* SOBRE */}
        <section id="sobre" className="border-y border-[var(--sv-line)] bg-[var(--sv-beige)] py-14 md:py-20">
          <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 md:grid-cols-2">
            <img
              src={ambienteImg}
              alt="Ambiente interno acolhedor do restaurante conceitual Sabor da Vila"
              width={1200}
              height={900}
              loading="lazy"
              className="w-full rounded-3xl object-cover shadow-md"
            />
            <div>
              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
                Uma experiência feita para compartilhar.
              </h2>
              <p className="mt-4 leading-relaxed text-[var(--sv-muted)]">
                O Sabor da Vila é um restaurante conceitual criado para demonstrar como um
                estabelecimento gastronômico pode apresentar seu cardápio, sua identidade e seus
                canais de atendimento de forma moderna e organizada.
              </p>
              <p className="mt-4 leading-relaxed text-[var(--sv-muted)]">
                Em um projeto real, o site pode ser adaptado ao estilo do restaurante, aos
                produtos oferecidos, à área de entrega e à rotina de atendimento.
              </p>
              <ul className="mt-6 grid gap-2 sm:grid-cols-2">
                {[
                  "Cardápio organizado",
                  "Pedidos pelo WhatsApp",
                  "Opção de entrega ou retirada",
                  "Destaques e promoções",
                  "Informações de atendimento",
                  "Boa experiência no celular",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-[var(--sv-brown)]">
                    <Leaf className="mt-0.5 h-4 w-4 shrink-0 text-[var(--sv-olive)]" aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* GALERIA */}
        <section className="mx-auto max-w-6xl px-4 py-14 md:py-20">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Sabores e momentos especiais.
          </h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {galeria.map((item) => (
              <img
                key={item.alt}
                src={item.src}
                alt={item.alt}
                width={1200}
                height={900}
                loading="lazy"
                className="h-56 w-full rounded-2xl object-cover transition-transform duration-300 hover:scale-[1.02]"
              />
            ))}
          </div>
          <p className="mt-6 text-center text-sm text-[var(--sv-muted)]">
            Imagens ilustrativas utilizadas exclusivamente para demonstração.
          </p>
        </section>

        {/* COMO PEDIR */}
        <section id="como-pedir" className="border-y border-[var(--sv-line)] bg-white/70 py-14 md:py-20">
          <div className="mx-auto max-w-6xl px-4">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Como pedir</h2>
            <ol className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {etapas.map((etapa, index) => (
                <li key={etapa.title} className="rounded-2xl border border-[var(--sv-line)] bg-[var(--sv-cream)] p-6">
                  <span className="grid h-9 w-9 place-items-center rounded-full bg-[var(--sv-terra)] text-sm font-bold text-white">
                    {index + 1}
                  </span>
                  <h3 className="mt-4 text-base font-semibold">{etapa.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--sv-muted)]">{etapa.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ENTREGA */}
        <section className="mx-auto max-w-6xl px-4 py-14 md:py-20">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Entrega e retirada</h2>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {[
              { icon: Truck, title: "Taxa de entrega", text: "Calculada conforme o bairro." },
              { icon: Clock, title: "Tempo estimado", text: "Consulte a previsão no momento do pedido." },
              { icon: ShoppingBag, title: "Retirada", text: "Disponível durante o horário de funcionamento." },
            ].map(({ icon: Icon, title, text }) => (
              <div key={title} className="rounded-2xl border border-[var(--sv-line)] bg-white p-6">
                <Icon className="h-5 w-5 text-[var(--sv-olive)]" aria-hidden />
                <h3 className="mt-3 text-base font-semibold">{title}</h3>
                <p className="mt-2 text-sm text-[var(--sv-muted)]">{text}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 text-sm text-[var(--sv-muted)]">
            Taxas, horários e condições apresentados são fictícios e devem ser confirmados em um
            projeto real.
          </p>
        </section>

        {/* PROMOÇÕES */}
        <section className="border-y border-[var(--sv-line)] bg-[var(--sv-beige)] py-14 md:py-16">
          <div className="mx-auto max-w-6xl px-4">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Ofertas da semana</h2>
            <div className="mt-8 grid gap-5 md:grid-cols-2">
              {[
                { title: "Quarta da Massa", text: "Massas selecionadas com condição especial." },
                { title: "Combo de Sexta", text: "Lanche, porção e bebida em um único pedido." },
              ].map((promo) => (
                <div key={promo.title} className="rounded-2xl border border-[var(--sv-amber)]/40 bg-white p-6">
                  <span className="inline-block rounded-full bg-[var(--sv-amber)]/20 px-3 py-1 text-xs font-semibold text-[var(--sv-terra-dark)]">
                    Demonstrativo
                  </span>
                  <h3 className="mt-3 text-lg font-semibold">{promo.title}</h3>
                  <p className="mt-2 text-sm text-[var(--sv-muted)]">{promo.text}</p>
                </div>
              ))}
            </div>
            <p className="mt-6 text-sm text-[var(--sv-muted)]">
              Promoções fictícias utilizadas exclusivamente para demonstração.
            </p>
          </div>
        </section>

        {/* FAQ */}
        <section id="duvidas" className="mx-auto max-w-3xl px-4 py-14 md:py-20">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Perguntas frequentes</h2>
          <div className="mt-8 divide-y divide-[var(--sv-line)] rounded-2xl border border-[var(--sv-line)] bg-white">
            {faqs.map((faq, index) => (
              <div key={faq.q}>
                <button
                  type="button"
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-sm font-semibold"
                  aria-expanded={openFaq === index}
                >
                  {faq.q}
                  <ChevronDown
                    className={`h-4 w-4 shrink-0 transition-transform ${openFaq === index ? "rotate-180" : ""}`}
                    aria-hidden
                  />
                </button>
                {openFaq === index ? (
                  <p className="px-5 pb-5 text-sm leading-relaxed text-[var(--sv-muted)]">{faq.a}</p>
                ) : null}
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="bg-[var(--sv-brown)] py-16">
          <div className="mx-auto max-w-3xl px-4 text-center">
            <h2 className="text-2xl font-bold tracking-tight text-[var(--sv-beige)] sm:text-3xl">
              Escolha seu prato e monte seu pedido.
            </h2>
            <p className="mt-4 text-[var(--sv-beige)]/80">
              Navegue pelo cardápio e veja como é simples enviar um pedido diretamente pelo
              WhatsApp.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <a
                href="#cardapio"
                className="rounded-full bg-[var(--sv-terra)] px-7 py-3.5 text-sm font-semibold text-white hover:bg-[var(--sv-terra-dark)]"
              >
                Ver cardápio
              </a>
              <a
                href={WA_PEDIDO}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-[var(--sv-beige)]/50 px-7 py-3.5 text-sm font-semibold text-[var(--sv-beige)] hover:bg-white/10"
              >
                Falar pelo WhatsApp
              </a>
            </div>
          </div>
        </section>

        {/* CONTATO */}
        <section id="contato" className="mx-auto max-w-6xl px-4 py-14 md:py-20">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Contato</h2>
          <p className="mt-3 text-sm text-[var(--sv-muted)]">
            Informações fictícias utilizadas exclusivamente para demonstração.
          </p>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-[var(--sv-line)] bg-white p-6">
              <ul className="space-y-4 text-sm">
                <li className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-[var(--sv-olive)]" aria-hidden /> (11) 99999-5555
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-[var(--sv-olive)]" aria-hidden /> contato@sabordavila.com.br
                </li>
                <li className="flex items-center gap-3">
                  <Clock className="h-4 w-4 text-[var(--sv-olive)]" aria-hidden /> Terça a domingo, das 11h às 23h
                </li>
                <li className="flex items-center gap-3">
                  <MapPin className="h-4 w-4 text-[var(--sv-olive)]" aria-hidden /> São Paulo — SP
                </li>
              </ul>
              <div className="mt-6 flex flex-wrap gap-3">
                <a href={WA_PEDIDO} target="_blank" rel="noreferrer" className="rounded-full bg-[var(--sv-terra)] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[var(--sv-terra-dark)]">
                  Fazer pedido
                </a>
                <a href="#cardapio" className="rounded-full border border-[var(--sv-line)] px-5 py-2.5 text-sm font-semibold text-[var(--sv-brown)] hover:bg-[var(--sv-beige)]">
                  Ver cardápio
                </a>
                <a href={WA_INFO} target="_blank" rel="noreferrer" className="rounded-full border border-[var(--sv-olive)] px-5 py-2.5 text-sm font-semibold text-[var(--sv-olive)] hover:bg-[var(--sv-beige)]">
                  Solicitar informações
                </a>
              </div>
            </div>
            <img
              src={mesaImg}
              alt="Mesa preparada com louças, talheres e decoração simples"
              width={1200}
              height={900}
              loading="lazy"
              className="h-full min-h-56 w-full rounded-2xl object-cover"
            />
          </div>
        </section>
      </main>

      <footer className="border-t border-[var(--sv-line)] bg-[var(--sv-beige)] py-12">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 md:grid-cols-2">
          <div>
            <p className="text-lg font-semibold">Sabor da Vila</p>
            <p className="mt-2 text-sm text-[var(--sv-muted)]">
              Comida feita com carinho, sabor e personalidade.
            </p>
          </div>
          <nav aria-label="Rodapé">
            <ul className="grid grid-cols-2 gap-2 text-sm text-[var(--sv-muted)]">
              {nav.map((item) => (
                <li key={item.href}>
                  <a href={item.href} className="hover:text-[var(--sv-brown)]">
                    {item.label}
                  </a>
                </li>
              ))}
              <li>
                <a href="/politica-de-privacidade" className="hover:text-[var(--sv-brown)]">
                  Política de Privacidade
                </a>
              </li>
            </ul>
          </nav>
        </div>
        <div className="mx-auto mt-8 max-w-6xl space-y-2 border-t border-[var(--sv-line)] px-4 pt-6 text-xs text-[var(--sv-muted)]">
          <p>
            Projeto conceitual desenvolvido pela{" "}
            <a href="/" className="font-semibold text-[var(--sv-terra)] hover:underline">
              TRAZEVO
            </a>
            .
          </p>
          <p>
            Este site é uma demonstração. Produtos, preços, imagens, contatos e informações são
            fictícios.
          </p>
        </div>
      </footer>

      {/* BOTÃO FLUTUANTE */}
      <a
        href={WA_PEDIDO}
        target="_blank"
        rel="noreferrer"
        aria-label="Fazer pedido pelo WhatsApp"
        className="fixed bottom-5 left-5 z-40 grid h-14 w-14 place-items-center rounded-full bg-[var(--sv-olive)] text-white shadow-lg transition-transform hover:scale-105"
      >
        <WhatsAppIcon className="h-6 w-6" />
      </a>

      {/* CARRINHO */}
      {cartOpen ? (
        <div className="fixed inset-0 z-50 flex justify-end">
          <button
            type="button"
            aria-label="Fechar resumo do pedido"
            onClick={() => setCartOpen(false)}
            className="flex-1 bg-black/40"
          />
          <aside className="flex h-full w-full max-w-md flex-col bg-[var(--sv-cream)] shadow-2xl sm:w-[26rem]">
            <div className="flex items-center justify-between border-b border-[var(--sv-line)] px-5 py-4">
              <h2 className="flex items-center gap-2 text-base font-semibold">
                <ClipboardList className="h-4 w-4" aria-hidden /> Resumo do pedido
              </h2>
              <button
                type="button"
                onClick={() => setCartOpen(false)}
                className="grid h-9 w-9 place-items-center rounded-full hover:bg-[var(--sv-beige)]"
                aria-label="Fechar"
              >
                <X className="h-4 w-4" aria-hidden />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-4">
              {cart.length === 0 ? (
                <p className="text-sm text-[var(--sv-muted)]">
                  Seu pedido está vazio. Adicione itens pelo cardápio.
                </p>
              ) : (
                <ul className="space-y-4">
                  {cart.map((item, index) => (
                    <li key={`${item.id}-${index}`} className="rounded-xl border border-[var(--sv-line)] bg-white p-4">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-sm font-semibold">{item.name}</p>
                          <p className="text-xs text-[var(--sv-muted)]">{brl(item.price)} cada</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeItem(index)}
                          className="grid h-8 w-8 place-items-center rounded-full text-[var(--sv-muted)] hover:bg-[var(--sv-beige)]"
                          aria-label={`Remover ${item.name}`}
                        >
                          <Trash2 className="h-4 w-4" aria-hidden />
                        </button>
                      </div>
                      <div className="mt-3 flex items-center justify-between">
                        <div className="flex items-center rounded-full border border-[var(--sv-line)]">
                          <button type="button" onClick={() => changeQty(index, -1)} className="grid h-9 w-9 place-items-center rounded-full hover:bg-[var(--sv-beige)]" aria-label={`Diminuir ${item.name}`}>
                            <Minus className="h-4 w-4" aria-hidden />
                          </button>
                          <span className="w-8 text-center text-sm font-semibold">{item.qty}</span>
                          <button type="button" onClick={() => changeQty(index, 1)} className="grid h-9 w-9 place-items-center rounded-full hover:bg-[var(--sv-beige)]" aria-label={`Aumentar ${item.name}`}>
                            <Plus className="h-4 w-4" aria-hidden />
                          </button>
                        </div>
                        <span className="text-sm font-bold text-[var(--sv-terra)]">
                          {brl(item.price * item.qty)}
                        </span>
                      </div>
                      <input
                        value={item.note}
                        onChange={(e) =>
                          setCart((prev) =>
                            prev.map((it, i) => (i === index ? { ...it, note: e.target.value } : it)),
                          )
                        }
                        placeholder="Observação do item"
                        className="mt-3 w-full rounded-lg border border-[var(--sv-line)] px-3 py-2 text-sm outline-none focus:border-[var(--sv-olive)]"
                      />
                    </li>
                  ))}
                </ul>
              )}

              <form onSubmit={sendOrder} className="mt-6 space-y-3" noValidate>
                <div className="flex items-center justify-between rounded-xl bg-[var(--sv-beige)] px-4 py-3 text-sm font-semibold">
                  <span>Subtotal</span>
                  <span>{brl(subtotal)}</span>
                </div>

                <Field label="Nome">
                  <input required value={nome} onChange={(e) => setNome(e.target.value)} className={inputClass} placeholder="Seu nome" />
                </Field>
                <Field label="WhatsApp">
                  <input required value={telefone} onChange={(e) => setTelefone(e.target.value)} className={inputClass} placeholder="(11) 90000-0000" inputMode="tel" />
                </Field>
                <Field label="Tipo de pedido">
                  <select value={tipo} onChange={(e) => setTipo(e.target.value)} className={inputClass}>
                    <option>Entrega</option>
                    <option>Retirada no restaurante</option>
                  </select>
                </Field>

                {tipo === "Entrega" ? (
                  <>
                    <Field label="Endereço">
                      <input value={endereco} onChange={(e) => setEndereco(e.target.value)} className={inputClass} placeholder="Rua e número" />
                    </Field>
                    <Field label="Bairro">
                      <input value={bairro} onChange={(e) => setBairro(e.target.value)} className={inputClass} placeholder="Bairro" />
                    </Field>
                    <Field label="Referência">
                      <input value={referencia} onChange={(e) => setReferencia(e.target.value)} className={inputClass} placeholder="Ponto de referência" />
                    </Field>
                  </>
                ) : null}

                <Field label="Forma de pagamento">
                  <select value={pagamento} onChange={(e) => setPagamento(e.target.value)} className={inputClass}>
                    <option>Pix</option>
                    <option>Dinheiro</option>
                    <option>Cartão na entrega</option>
                  </select>
                </Field>

                {pagamento === "Dinheiro" ? (
                  <Field label="Precisa de troco para quanto?">
                    <input value={troco} onChange={(e) => setTroco(e.target.value)} className={inputClass} placeholder="Ex.: R$ 100" />
                  </Field>
                ) : null}

                <Field label="Observações gerais">
                  <textarea value={obsGeral} onChange={(e) => setObsGeral(e.target.value)} rows={3} className={inputClass} placeholder="Alguma informação adicional?" />
                </Field>

                {erro ? <p className="text-sm font-medium text-[var(--sv-terra-dark)]">{erro}</p> : null}

                <button
                  type="submit"
                  className="w-full rounded-full bg-[var(--sv-terra)] px-5 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--sv-terra-dark)]"
                >
                  Enviar pedido pelo WhatsApp
                </button>
                <p className="text-center text-xs text-[var(--sv-muted)]">
                  Este projeto é demonstrativo. Nenhum pedido real será processado.
                </p>
              </form>
            </div>
          </aside>
        </div>
      ) : null}
    </div>
  );
}

const inputClass =
  "mt-1 w-full rounded-lg border border-[var(--sv-line)] bg-white px-3 py-2.5 text-sm text-[var(--sv-brown)] outline-none focus:border-[var(--sv-olive)]";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block text-xs font-medium text-[var(--sv-muted)]">
      {label}
      {children}
    </label>
  );
}
