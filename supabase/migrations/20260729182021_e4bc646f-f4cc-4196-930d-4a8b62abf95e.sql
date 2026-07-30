-- TESTIMONIALS
CREATE TABLE public.testimonials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  author_name text NOT NULL,
  author_role text,
  company text,
  quote text NOT NULL,
  rating smallint NOT NULL DEFAULT 5,
  avatar_url text,
  is_demo boolean NOT NULL DEFAULT true,
  sort_order integer NOT NULL DEFAULT 0,
  is_visible boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.testimonials TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.testimonials TO authenticated;
GRANT ALL ON public.testimonials TO service_role;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Depoimentos publicos" ON public.testimonials FOR SELECT TO anon USING (is_visible);
CREATE POLICY "Depoimentos internos" ON public.testimonials FOR SELECT TO authenticated USING (is_visible OR public.can_edit_content(auth.uid()));
CREATE POLICY "Gerir depoimentos" ON public.testimonials FOR ALL TO authenticated USING (public.can_edit_content(auth.uid())) WITH CHECK (public.can_edit_content(auth.uid()));
CREATE TRIGGER trg_testimonials_updated BEFORE UPDATE ON public.testimonials FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- PORTFOLIO (cases demonstrativos)
CREATE TABLE public.portfolio_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE,
  title text NOT NULL,
  niche text NOT NULL,
  summary text,
  challenge text,
  solution text,
  result text,
  cover_url text,
  gallery text[] NOT NULL DEFAULT '{}',
  tags text[] NOT NULL DEFAULT '{}',
  is_demo boolean NOT NULL DEFAULT true,
  sort_order integer NOT NULL DEFAULT 0,
  is_published boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.portfolio_items TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.portfolio_items TO authenticated;
GRANT ALL ON public.portfolio_items TO service_role;
ALTER TABLE public.portfolio_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Portfolio publico" ON public.portfolio_items FOR SELECT TO anon USING (is_published);
CREATE POLICY "Portfolio interno" ON public.portfolio_items FOR SELECT TO authenticated USING (is_published OR public.can_edit_content(auth.uid()));
CREATE POLICY "Gerir portfolio" ON public.portfolio_items FOR ALL TO authenticated USING (public.can_edit_content(auth.uid())) WITH CHECK (public.can_edit_content(auth.uid()));
CREATE TRIGGER trg_portfolio_updated BEFORE UPDATE ON public.portfolio_items FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- BLOG
CREATE TABLE public.blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE,
  title text NOT NULL,
  excerpt text,
  content text NOT NULL DEFAULT '',
  cover_url text,
  tags text[] NOT NULL DEFAULT '{}',
  author_name text,
  meta_title text,
  meta_description text,
  is_published boolean NOT NULL DEFAULT false,
  published_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.blog_posts TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.blog_posts TO authenticated;
GRANT ALL ON public.blog_posts TO service_role;
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Blog publico" ON public.blog_posts FOR SELECT TO anon USING (is_published);
CREATE POLICY "Blog interno" ON public.blog_posts FOR SELECT TO authenticated USING (is_published OR public.can_edit_content(auth.uid()));
CREATE POLICY "Gerir blog" ON public.blog_posts FOR ALL TO authenticated USING (public.can_edit_content(auth.uid())) WITH CHECK (public.can_edit_content(auth.uid()));
CREATE TRIGGER trg_blog_updated BEFORE UPDATE ON public.blog_posts FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- SEED
INSERT INTO public.testimonials (author_name, author_role, company, quote, rating, sort_order) VALUES
('Marina Alves','Proprietária','Clínica Sorriso (demonstração)','A página ficou pronta rápido e o formulário caiu direto no WhatsApp. Conteúdo demonstrativo.',5,1),
('Rafael Souza','Sócio','Barbearia Norte (demonstração)','Estrutura clara, carregamento rápido e agendamento simples. Conteúdo demonstrativo.',5,2),
('Camila Prado','Gerente de marketing','Solar Mais (demonstração)','Organizamos as ofertas por região e acompanhamos os pedidos pelo painel. Conteúdo demonstrativo.',5,3);

INSERT INTO public.portfolio_items (slug, title, niche, summary, challenge, solution, result, tags, sort_order) VALUES
('clinica-odontologica','Clínica odontológica','Saúde','Página de agendamento com prova social e mapa.','Muitos contatos perdidos no direct.','Formulário curto, WhatsApp fixo e blocos de confiança.','Modelo demonstrativo com foco em agendamento.', ARRAY['agendamento','saúde'],1),
('energia-solar','Energia solar','Energia','Simulação de economia e captação de orçamentos.','Explicar economia sem complicar.','Calculadora simples e seções de dúvidas frequentes.','Modelo demonstrativo com foco em geração de orçamento.', ARRAY['orçamento','energia'],2),
('delivery-regional','Delivery regional','Alimentação','Cardápio resumido com pedido por WhatsApp.','Cardápio extenso e lento no celular.','Destaques do cardápio e botão de pedido sempre visível.','Modelo demonstrativo com foco em pedidos rápidos.', ARRAY['delivery','mobile'],3);

INSERT INTO public.blog_posts (slug, title, excerpt, content, tags, author_name, is_published, published_at) VALUES
('o-que-e-landing-page','O que é uma landing page e quando usar','Entenda a diferença entre site institucional e landing page focada em conversão.','Uma landing page é uma página única criada para uma ação específica: pedir orçamento, agendar uma visita ou baixar um material.

## Quando usar
Use uma landing page quando existe uma oferta clara e um público definido. Sites institucionais explicam a empresa inteira; a landing page conduz a uma decisão.

## O que não pode faltar
Proposta de valor no topo, prova social, explicação da oferta, perguntas frequentes e um formulário curto.', ARRAY['conversão','fundamentos'],'Equipe editorial', true, now()),
('checklist-antes-de-publicar','Checklist antes de publicar sua landing page','Dez verificações rápidas de desempenho, SEO e formulário antes de colocar a página no ar.','Antes de publicar, revise os pontos abaixo.

1. Título único e descritivo.
2. Descrição meta com até 160 caracteres.
3. Imagens comprimidas e com texto alternativo.
4. Formulário testado do envio até o recebimento.
5. Botão de WhatsApp funcionando no celular.
6. Política de privacidade acessível.
7. Velocidade verificada em rede móvel.
8. Textos revisados.
9. Contatos corretos no rodapé.
10. Acompanhamento de pedidos ativo no painel.', ARRAY['checklist','seo'],'Equipe editorial', true, now()),
('formularios-que-convertem','Formulários que convertem mais','Menos campos, mensagens de erro claras e confirmação imediata aumentam o número de pedidos.','Formulários longos afastam pedidos. Comece com nome, WhatsApp e e-mail.

## Boas práticas
Mostre o erro ao lado do campo, confirme o envio na tela e informe o prazo de retorno. Se possível, ofereça também um caminho direto pelo WhatsApp.', ARRAY['formulários','conversão'],'Equipe editorial', true, now());