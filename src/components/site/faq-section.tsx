import { Plus, Minus } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SectionTitle } from "./site-shell";
import { WhatsAppIcon } from "./whatsapp-icon";

const WHATSAPP = "https://wa.me/5500000000000";
const CTA_MESSAGE = "Olá! Tenho uma dúvida sobre a criação de um site.";

type Faq = {
  id: string;
  question: string;
  answer: React.ReactNode;
};

const faqs: Faq[] = [
  {
    id: "prazo",
    question: "Quanto tempo demora para criar um site?",
    answer: (
      <>
        <p>
          O prazo depende do tipo e da complexidade do projeto. Uma landing page pode levar entre 5 e 7 dias úteis, um site institucional entre 10 e 15 dias úteis e um catálogo digital entre 12 e 18 dias úteis.
        </p>
        <p className="mt-2">
          O prazo começa após a confirmação do pagamento inicial e o envio de todos os materiais necessários.
        </p>
      </>
    ),
  },
  {
    id: "materiais",
    question: "O que preciso enviar para iniciar o projeto?",
    answer: (
      <>
        <p>
          O cliente deverá enviar as informações da empresa, textos, serviços, imagens, logotipo, dados de contato, referências visuais e demais materiais necessários para a criação do site.
        </p>
        <p className="mt-2">
          Caso algum material ainda não esteja pronto, orientaremos sobre o que será necessário providenciar.
        </p>
      </>
    ),
  },
  {
    id: "textos",
    question: "Vocês também criam os textos do site?",
    answer: (
      <>
        <p>
          A organização e a revisão básica dos textos podem estar incluídas conforme o plano contratado.
        </p>
        <p className="mt-2">
          A criação completa de textos comerciais, conteúdos técnicos ou textos extensos poderá ser oferecida como um serviço adicional.
        </p>
      </>
    ),
  },
  {
    id: "responsivo",
    question: "O site funcionará no celular?",
    answer: (
      <>
        <p>
          Sim. Todos os projetos são desenvolvidos para funcionar corretamente em computadores, tablets e celulares.
        </p>
        <p className="mt-2">
          O layout será adaptado para diferentes tamanhos de tela, facilitando a leitura e a navegação.
        </p>
      </>
    ),
  },
  {
    id: "alteracoes",
    question: "Posso solicitar alterações?",
    answer: (
      <>
        <p>
          Sim. Cada plano possui uma quantidade definida de rodadas de alterações.
        </p>
        <p className="mt-2">
          As alterações devem ser solicitadas durante a etapa de revisão. Mudanças que alterem totalmente a estrutura aprovada ou incluam novas funcionalidades poderão gerar um orçamento adicional.
        </p>
      </>
    ),
  },
  {
    id: "dominio",
    question: "O domínio está incluído?",
    answer: (
      <>
        <p>
          O domínio não está incluído nos valores iniciais, salvo quando informado na proposta comercial.
        </p>
        <p className="mt-2">
          O cliente poderá registrar um domínio próprio, como <strong>nomedaempresa.com.br</strong>. Podemos orientar o cliente durante o processo de registro.
        </p>
      </>
    ),
  },
  {
    id: "hospedagem",
    question: "A hospedagem está incluída?",
    answer: (
      <>
        <p>
          A hospedagem não está incluída nos valores iniciais, salvo quando indicada na proposta comercial.
        </p>
        <p className="mt-2">
          O valor e o tipo de hospedagem dependerão da estrutura e das funcionalidades do projeto.
        </p>
      </>
    ),
  },
  {
    id: "google",
    question: "O site aparecerá no Google?",
    answer: (
      <>
        <p>
          O site será desenvolvido com configurações básicas para mecanismos de busca, como títulos, descrições, organização de conteúdo e estrutura responsiva.
        </p>
        <p className="mt-2">
          No entanto, nenhuma posição específica nos resultados do Google pode ser garantida. Resultados mais avançados podem exigir produção de conteúdo, estratégias de SEO e acompanhamento contínuo.
        </p>
      </>
    ),
  },
  {
    id: "pagamento",
    question: "Como funciona o pagamento?",
    answer: (
      <>
        <p>O pagamento será dividido da seguinte forma:</p>
        <ul className="mt-2 list-disc space-y-1 pl-5">
          <li>50% para iniciar o projeto;</li>
          <li>50% após a aprovação final e antes da publicação.</li>
        </ul>
        <p className="mt-2">
          O pagamento poderá ser realizado por Pix. Pagamentos por cartão poderão ter acréscimos conforme as taxas da operadora.
        </p>
      </>
    ),
  },
  {
    id: "whatsapp",
    question: "O site terá integração com WhatsApp?",
    answer: (
      <>
        <p>
          Sim. Os projetos poderão ter botões de contato, orçamento, agendamento ou pedido direcionados para o WhatsApp da empresa.
        </p>
        <p className="mt-2">
          As mensagens poderão ser configuradas de acordo com cada serviço ou página.
        </p>
      </>
    ),
  },
  {
    id: "atualizacao",
    question: "Posso atualizar o site depois de publicado?",
    answer: (
      <>
        <p>
          Sim. As atualizações podem ser realizadas por meio de um plano de manutenção ou mediante solicitação de orçamento.
        </p>
        <p className="mt-2">
          Dependendo do tipo de projeto, também poderá ser fornecida uma orientação básica para atualização de informações.
        </p>
      </>
    ),
  },
  {
    id: "lojas",
    question: "Vocês criam lojas virtuais?",
    answer: (
      <>
        <p>
          Projetos de loja virtual com carrinho, pagamento online, cálculo de frete e gestão de pedidos exigem uma estrutura específica e recebem orçamento personalizado.
        </p>
        <p className="mt-2">
          O catálogo digital apresentado nos planos é direcionado principalmente para exibição de produtos e pedidos pelo WhatsApp.
        </p>
      </>
    ),
  },
  {
    id: "propriedade",
    question: "O site será meu depois da entrega?",
    answer: (
      <>
        <p>
          Após a aprovação, conclusão do pagamento e publicação, o cliente terá direito ao uso do projeto conforme as condições definidas na proposta comercial.
        </p>
        <p className="mt-2">
          Serviços externos, plataformas, licenças, domínio e hospedagem continuarão sujeitos às regras e cobranças dos respectivos fornecedores.
        </p>
      </>
    ),
  },
];

export function FaqSection() {
  return (
    <section id="perguntas-frequentes" className="mx-auto max-w-6xl px-4 py-16 sm:py-20">
      <SectionTitle
        title="Dúvidas frequentes sobre a criação do seu site"
        subtitle="Confira as respostas para as principais dúvidas sobre prazos, pagamentos, materiais e funcionamento do projeto."
      />

      <div className="mx-auto mt-10 max-w-3xl">
        <Accordion type="single" collapsible className="space-y-3">
          {faqs.map((faq) => (
            <AccordionItem
              key={faq.id}
              value={faq.id}
              className="rounded-2xl border border-border bg-card px-5 shadow-[var(--shadow-soft)] transition-shadow duration-300 data-[state=open]:shadow-[var(--shadow-card)]"
            >
              <AccordionTrigger className="py-5 text-base font-semibold text-brand hover:no-underline [&>svg]:hidden [&[data-state=open]_.icon-open]:hidden [&[data-state=closed]_.icon-close]:hidden">
                <span className="flex items-center gap-3 pr-4 text-left">
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-primary/10 text-primary">
                    <Plus className="icon-open h-4 w-4" aria-hidden />
                    <Minus className="icon-close h-4 w-4" aria-hidden />
                  </span>
                  {faq.question}
                </span>
              </AccordionTrigger>
              <AccordionContent className="pb-5 pl-10 text-muted-foreground leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>

      <div className="mt-12 rounded-2xl border border-border bg-surface p-6 text-center sm:p-10">
        <h3 className="text-xl font-bold tracking-tight text-brand sm:text-2xl">
          Ainda ficou com alguma dúvida?
        </h3>
        <p className="mx-auto mt-3 max-w-2xl text-sm text-muted-foreground sm:text-base">
          Fale conosco pelo WhatsApp e receba uma orientação sobre o seu projeto.
        </p>
        <Button asChild size="lg" className="mt-6">
          <a
            href={`${WHATSAPP}?text=${encodeURIComponent(CTA_MESSAGE)}`}
            target="_blank"
            rel="noreferrer"
          >
            <WhatsAppIcon className="mr-2 h-4 w-4" />
            Tirar minha dúvida
          </a>
        </Button>
      </div>
    </section>
  );
}
