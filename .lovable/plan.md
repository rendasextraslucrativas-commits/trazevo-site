# Design System Global TRAZEVO — Consolidação da Paleta Oficial

## Diagnóstico (verificado no código)

Os tokens da paleta oficial já existem em `src/styles.css` (Navy, Primary Blue, Soft Blue, Background, Surface, Text, Muted, Border). A auditoria encontrou duas lacunas:

1. **Primary Hover (#1D4ED8) não existe como token** — o componente `Button` usa `bg-primary/90` (opacidade) no hover, não a cor oficial `#1D4ED8`.
2. **Não há verificação formal da proporção 70/20/10** nas seções da home (branco/off-white predominante, navy em áreas de contraste, azul só em destaques).

Os mini-sites demonstrativos (`src/routes/modelos.*` e `src/components/demo/*`) usam cores fixas de propósito — são sites de "clientes fictícios" com identidades próprias e **não serão alterados**.

## O que será feito

### 1. Token de hover oficial
- Adicionar `--primary-hover: #1D4ED8` (oklch equivalente) em `:root` e mapear `--color-primary-hover` no `@theme inline` de `src/styles.css`.
- Atualizar `src/components/ui/button.tsx` para usar `hover:bg-primary-hover` nas variantes `default`/`primary`, substituindo `bg-primary/90`.
- Aplicar o mesmo hover em links e elementos interativos das seções do site principal que hoje usam opacidade ou escala de cinza.

### 2. Revisão da proporção visual 70/20/10 (orientação, não matemática)
Auditar cada seção da home (`src/routes/index.tsx` + `src/components/site/*`) e ajustar apenas onde houver desvio:
- **~70% claro:** fundos `bg-background` (#F8FAFC) e `bg-surface` (#FFFFFF) predominantes, bastante espaço em branco.
- **~20% navy:** Hero, CTA final e Footer em `bg-ink` (#0B1F3A); nenhuma seção extra em navy.
- **~10% azul:** `bg-primary`/`text-primary` apenas em CTAs, ícones, links e destaques; chips e fundos sutis em `bg-accent`/`bg-brand-soft` (#EFF6FF).

### 3. Limpeza de excessos
- Garantir que não restem gradientes decorativos, sombras fortes ou animações flutuantes nas seções do site principal (sombras limitadas a `--shadow-soft`/`--shadow-card` já definidas).

## O que NÃO será feito
- Nenhuma alteração em conteúdo, preços, textos comerciais ou ordem das seções.
- Nenhuma alteração nas cores dos mini-sites demonstrativos.
- Nenhuma mudança estrutural de rotas ou funcionalidades.

## Detalhes técnicos
- Arquivos principais: `src/styles.css`, `src/components/ui/button.tsx`, `src/routes/index.tsx`, `src/components/site/*.tsx`.
- Conversão de `#1D4ED8` para oklch ≈ `oklch(0.50 0.19 262)` (já documentada no cabeçalho do CSS).
- Verificação: build + inspeção visual das seções no preview após as mudanças.

## Verificação
- Confirmar que o hover de todos os botões primários usa #1D4ED8.
- Confirmar alternância clara de fundos e ausência de cores fora da paleta nas seções do site principal.
