# Organizar o site com estrutura profissional

Objetivo: uma jornada única e clara na home (do problema à ação), sem seções repetidas, com ritmo visual consistente e navegação que aponta para o lugar certo.

## O que está desorganizado hoje

Na home existem blocos que dizem a mesma coisa duas vezes:

- "Como funciona" (seção) + "Fluxo" (diagrama) + "Processo" (lista de etapas) = três explicações do mesmo passo a passo.
- Portfólio e Sobre nós aparecem depois de Contato, ou seja, o cliente é convidado a agir antes de conhecer a empresa.
- Depoimentos e CTA final aparecem no fim, isolados do resto do argumento.
- As páginas /beneficios, /planos, /como-funciona, /perguntas-frequentes e /contato repetem exatamente as seções da home.

## Nova ordem da home

```text
1. Hero (proposta + CTA orçamento + WhatsApp)
2. Benefícios (por que ter um site profissional)
3. Como funciona (um único bloco: etapas do processo, unificando Fluxo + Processo)
4. Portfólio (modelos demonstrativos)
5. Planos e preços
6. Depoimentos
7. Sobre nós
8. Perguntas frequentes
9. Contato (formulário)
10. CTA final + WhatsApp flutuante
```

Lógica: interesse → confiança → prova → preço → objeções → ação.

## Ajustes de organização visual

- Alternância consistente de fundo (claro / superfície / escuro apenas em Sobre nós e CTA final), evitando dois blocos escuros seguidos.
- Espaçamento vertical padronizado em todas as seções (mesmo `py`), largura de conteúdo igual (`max-w-6xl`).
- Toda seção com título + subtítulo curto no mesmo padrão (SectionTitle), e apenas um CTA principal por seção.
- Numeração visual das etapas em "Como funciona" para leitura rápida.

## Navegação

- Menu enxuto e na mesma ordem da home: Início · Benefícios · Portfólio · Planos · Como funciona · Perguntas frequentes · Blog · Contato.
- Itens que hoje levam a páginas duplicadas passam a rolar para a seção correspondente da home (âncoras), mantendo o botão "Solicitar orçamento" como único CTA fixo do topo.
- As páginas duplicadas continuam existindo (não quebram links antigos), mas deixam de competir no menu; cada uma mantém seu próprio título e descrição de SEO.
- Rodapé reorganizado em colunas claras: Navegação · Modelos · Legal · Contato.

## Detalhes técnicos

- `src/routes/index.tsx`: reordenar a composição, remover os blocos `FlowDiagram` e `ProcessList` duplicados e manter apenas `HowItWorksSection` (incorporando as etapas vindas de `data.steps`).
- `src/components/site/how-it-works-section.tsx`: aceitar/renderizar as etapas do CMS (`process_steps`) para não perder conteúdo ao remover a lista duplicada.
- `src/components/site/site-header.tsx`: nova lista de navegação com âncoras (`to="/"` + `hash`).
- `src/components/site/site-footer.tsx`: agrupar links em colunas.
- Padronizar classes de seção (`py-16 sm:py-20`, `max-w-6xl`) e usar apenas tokens semânticos do design system (sem cores fixas).
- Sem mudanças de banco de dados, formulários ou lógica de envio de leads.
