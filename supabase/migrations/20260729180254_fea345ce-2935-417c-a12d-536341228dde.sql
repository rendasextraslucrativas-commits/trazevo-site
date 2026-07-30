-- ENUMS
create type public.app_role as enum ('admin','comercial','editor','operacional');
create type public.lead_priority as enum ('baixa','media','alta');

-- updated_at helper
create or replace function public.update_updated_at_column()
returns trigger language plpgsql set search_path = public as $$
begin new.updated_at = now(); return new; end; $$;

-- PROFILES
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  avatar_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
grant select, insert, update on public.profiles to authenticated;
grant all on public.profiles to service_role;
alter table public.profiles enable row level security;

-- USER ROLES
create table public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  role public.app_role not null,
  created_at timestamptz not null default now(),
  unique (user_id, role)
);
grant select on public.user_roles to authenticated;
grant all on public.user_roles to service_role;
alter table public.user_roles enable row level security;

create or replace function public.has_role(_user_id uuid, _role public.app_role)
returns boolean language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.user_roles where user_id = _user_id and role = _role)
$$;

create or replace function public.can_edit_content(_user_id uuid)
returns boolean language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.user_roles where user_id = _user_id and role in ('admin','editor'))
$$;

create or replace function public.can_manage_crm(_user_id uuid)
returns boolean language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.user_roles where user_id = _user_id and role in ('admin','comercial'))
$$;

create policy "Perfil proprio visivel" on public.profiles for select to authenticated using (auth.uid() = id or public.has_role(auth.uid(),'admin'));
create policy "Perfil proprio editavel" on public.profiles for update to authenticated using (auth.uid() = id) with check (auth.uid() = id);
create policy "Perfil proprio criado" on public.profiles for insert to authenticated with check (auth.uid() = id);

create policy "Papeis visiveis ao dono e admin" on public.user_roles for select to authenticated using (auth.uid() = user_id or public.has_role(auth.uid(),'admin'));

create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, full_name)
  values (new.id, coalesce(new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'name', new.email));
  return new;
end; $$;
create trigger on_auth_user_created after insert on auth.users for each row execute function public.handle_new_user();

-- SITE SETTINGS
create table public.site_settings (
  id uuid primary key default gen_random_uuid(),
  agency_name text not null default 'Agência de Landing Pages',
  slogan text,
  logo_url text,
  favicon_url text,
  primary_color text not null default '#0B2A5B',
  accent_color text not null default '#1D6FF2',
  font_family text not null default 'Plus Jakarta Sans',
  email text,
  whatsapp text,
  address text,
  instagram_url text,
  facebook_url text,
  linkedin_url text,
  domain text,
  locale text not null default 'pt-BR',
  timezone text not null default 'America/Sao_Paulo',
  currency text not null default 'BRL',
  footer_description text,
  privacy_policy text,
  terms_of_use text,
  cookie_policy text,
  meta_title text,
  meta_description text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
grant select on public.site_settings to anon, authenticated;
grant insert, update on public.site_settings to authenticated;
grant all on public.site_settings to service_role;
alter table public.site_settings enable row level security;
create policy "Configuracoes publicas" on public.site_settings for select to anon, authenticated using (true);
create policy "Editar configuracoes" on public.site_settings for update to authenticated using (public.can_edit_content(auth.uid())) with check (public.can_edit_content(auth.uid()));
create trigger t_site_settings_updated before update on public.site_settings for each row execute function public.update_updated_at_column();

-- SITE SECTIONS
create table public.site_sections (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text,
  subtitle text,
  body text,
  cta_label text,
  cta_url text,
  sort_order int not null default 0,
  is_visible boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
grant select on public.site_sections to anon, authenticated;
grant insert, update, delete on public.site_sections to authenticated;
grant all on public.site_sections to service_role;
alter table public.site_sections enable row level security;
create policy "Secoes visiveis" on public.site_sections for select to anon, authenticated using (is_visible or public.can_edit_content(auth.uid()));
create policy "Gerir secoes" on public.site_sections for all to authenticated using (public.can_edit_content(auth.uid())) with check (public.can_edit_content(auth.uid()));
create trigger t_site_sections_updated before update on public.site_sections for each row execute function public.update_updated_at_column();

-- BENEFITS
create table public.benefits (
  id uuid primary key default gen_random_uuid(),
  icon text not null default 'sparkles',
  title text not null,
  description text,
  sort_order int not null default 0,
  is_visible boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
grant select on public.benefits to anon, authenticated;
grant insert, update, delete on public.benefits to authenticated;
grant all on public.benefits to service_role;
alter table public.benefits enable row level security;
create policy "Beneficios visiveis" on public.benefits for select to anon, authenticated using (is_visible or public.can_edit_content(auth.uid()));
create policy "Gerir beneficios" on public.benefits for all to authenticated using (public.can_edit_content(auth.uid())) with check (public.can_edit_content(auth.uid()));
create trigger t_benefits_updated before update on public.benefits for each row execute function public.update_updated_at_column();

-- PROCESS STEPS
create table public.process_steps (
  id uuid primary key default gen_random_uuid(),
  icon text not null default 'clipboard-list',
  title text not null,
  description text,
  sort_order int not null default 0,
  is_visible boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
grant select on public.process_steps to anon, authenticated;
grant insert, update, delete on public.process_steps to authenticated;
grant all on public.process_steps to service_role;
alter table public.process_steps enable row level security;
create policy "Etapas visiveis" on public.process_steps for select to anon, authenticated using (is_visible or public.can_edit_content(auth.uid()));
create policy "Gerir etapas" on public.process_steps for all to authenticated using (public.can_edit_content(auth.uid())) with check (public.can_edit_content(auth.uid()));
create trigger t_process_steps_updated before update on public.process_steps for each row execute function public.update_updated_at_column();

-- PLANS
create table public.plans (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  price numeric(10,2),
  promo_price numeric(10,2),
  price_prefix text default 'A partir de',
  show_price boolean not null default true,
  is_highlighted boolean not null default false,
  cta_label text not null default 'Solicitar orçamento',
  cta_url text default '/contato',
  support_period text,
  revisions text,
  sort_order int not null default 0,
  is_visible boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
grant select on public.plans to anon, authenticated;
grant insert, update, delete on public.plans to authenticated;
grant all on public.plans to service_role;
alter table public.plans enable row level security;
create policy "Planos visiveis" on public.plans for select to anon, authenticated using (is_visible or public.can_edit_content(auth.uid()));
create policy "Gerir planos" on public.plans for all to authenticated using (public.can_edit_content(auth.uid())) with check (public.can_edit_content(auth.uid()));
create trigger t_plans_updated before update on public.plans for each row execute function public.update_updated_at_column();

create table public.plan_features (
  id uuid primary key default gen_random_uuid(),
  plan_id uuid not null references public.plans(id) on delete cascade,
  label text not null,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);
grant select on public.plan_features to anon, authenticated;
grant insert, update, delete on public.plan_features to authenticated;
grant all on public.plan_features to service_role;
alter table public.plan_features enable row level security;
create policy "Recursos visiveis" on public.plan_features for select to anon, authenticated using (true);
create policy "Gerir recursos" on public.plan_features for all to authenticated using (public.can_edit_content(auth.uid())) with check (public.can_edit_content(auth.uid()));

-- TEMPLATES
create table public.templates (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  niche text not null,
  description text,
  cover_url text,
  features text[] not null default '{}',
  preview_url text,
  is_published boolean not null default true,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
grant select on public.templates to anon, authenticated;
grant insert, update, delete on public.templates to authenticated;
grant all on public.templates to service_role;
alter table public.templates enable row level security;
create policy "Modelos publicados" on public.templates for select to anon, authenticated using (is_published or public.can_edit_content(auth.uid()));
create policy "Gerir modelos" on public.templates for all to authenticated using (public.can_edit_content(auth.uid())) with check (public.can_edit_content(auth.uid()));
create trigger t_templates_updated before update on public.templates for each row execute function public.update_updated_at_column();

-- FAQ
create table public.faqs (
  id uuid primary key default gen_random_uuid(),
  question text not null,
  answer text not null,
  category text,
  sort_order int not null default 0,
  is_visible boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
grant select on public.faqs to anon, authenticated;
grant insert, update, delete on public.faqs to authenticated;
grant all on public.faqs to service_role;
alter table public.faqs enable row level security;
create policy "FAQ visivel" on public.faqs for select to anon, authenticated using (is_visible or public.can_edit_content(auth.uid()));
create policy "Gerir FAQ" on public.faqs for all to authenticated using (public.can_edit_content(auth.uid())) with check (public.can_edit_content(auth.uid()));
create trigger t_faqs_updated before update on public.faqs for each row execute function public.update_updated_at_column();

-- LEAD STAGES
create table public.lead_stages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  color text not null default '#1D6FF2',
  sort_order int not null default 0,
  is_visible boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
grant select, insert, update, delete on public.lead_stages to authenticated;
grant all on public.lead_stages to service_role;
alter table public.lead_stages enable row level security;
create policy "Ver etapas do funil" on public.lead_stages for select to authenticated using (public.can_manage_crm(auth.uid()));
create policy "Gerir etapas do funil" on public.lead_stages for all to authenticated using (public.has_role(auth.uid(),'admin')) with check (public.has_role(auth.uid(),'admin'));
create trigger t_lead_stages_updated before update on public.lead_stages for each row execute function public.update_updated_at_column();

-- LEADS
create table public.leads (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  company text,
  whatsapp text,
  email text,
  city text,
  state text,
  niche text,
  service text,
  plan_id uuid references public.plans(id) on delete set null,
  budget numeric(10,2),
  source text default 'site',
  campaign text,
  owner_id uuid references auth.users(id) on delete set null,
  stage_id uuid references public.lead_stages(id) on delete set null,
  priority public.lead_priority not null default 'media',
  next_contact_at date,
  notes text,
  tags text[] not null default '{}',
  consent boolean not null default false,
  is_demo boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
grant select, insert, update, delete on public.leads to authenticated;
grant insert on public.leads to anon;
grant all on public.leads to service_role;
alter table public.leads enable row level security;
create policy "Visitante pode enviar orcamento" on public.leads for insert to anon, authenticated with check (consent = true and is_demo = false);
create policy "CRM ve leads" on public.leads for select to authenticated using (public.can_manage_crm(auth.uid()));
create policy "CRM edita leads" on public.leads for update to authenticated using (public.can_manage_crm(auth.uid())) with check (public.can_manage_crm(auth.uid()));
create policy "Admin apaga leads" on public.leads for delete to authenticated using (public.has_role(auth.uid(),'admin'));
create trigger t_leads_updated before update on public.leads for each row execute function public.update_updated_at_column();

-- LEAD ACTIVITIES
create table public.lead_activities (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid not null references public.leads(id) on delete cascade,
  user_id uuid references auth.users(id) on delete set null,
  type text not null default 'nota',
  content text,
  created_at timestamptz not null default now()
);
grant select, insert on public.lead_activities to authenticated;
grant all on public.lead_activities to service_role;
alter table public.lead_activities enable row level security;
create policy "CRM ve historico" on public.lead_activities for select to authenticated using (public.can_manage_crm(auth.uid()));
create policy "CRM cria historico" on public.lead_activities for insert to authenticated with check (public.can_manage_crm(auth.uid()));

-- SEED
insert into public.site_settings (slogan, email, whatsapp, footer_description, meta_title, meta_description)
values ('Landing pages profissionais para pequenos negócios','contato@exemplo.com.br','5511999999999',
'Criamos landing pages modernas, rápidas e preparadas para gerar contatos.',
'Agência de Landing Pages | Páginas profissionais que geram contatos',
'Criamos landing pages modernas, rápidas e estratégicas para apresentar seu negócio e gerar oportunidades pelo WhatsApp.');

insert into public.site_sections (slug, title, subtitle, cta_label, cta_url, sort_order) values
('hero','Landing pages profissionais para transformar visitantes em oportunidades.','Criamos páginas modernas, rápidas e estratégicas para apresentar seu negócio, gerar contatos e facilitar o atendimento pelo WhatsApp.','Solicitar orçamento','/contato',1),
('beneficios','Por que investir em uma landing page','Estrutura pensada para clareza, velocidade e contato direto.',null,null,2),
('fluxo','Como uma landing page gera oportunidades','A página conduz o visitante até uma ação concreta.',null,null,3),
('servicos','Nossos serviços','Duas opções para começar com o pé direito.',null,null,4),
('modelos','Modelos demonstrativos','Modelos conceituais criados para fins de demonstração.',null,null,5),
('processo','Nosso método de trabalho','Cinco etapas simples do briefing à publicação.',null,null,6),
('sobre','Sobre a agência','Esta agência foi criada para ajudar pequenos negócios e profissionais a construírem uma presença digital mais profissional, clara e preparada para gerar contatos. Cada projeto é desenvolvido de forma organizada, responsiva e alinhada aos objetivos do cliente.',null,null,7),
('faq','Perguntas frequentes','Tire suas dúvidas antes de solicitar um orçamento.',null,null,8),
('cta_final','Pronto para apresentar seu negócio de forma profissional?','Fale com a gente e receba um orçamento sem compromisso.','Solicitar orçamento','/contato',9);

insert into public.benefits (icon,title,description,sort_order) values
('palette','Design profissional','Layout limpo e coerente com o posicionamento do seu negócio.',1),
('smartphone','Adaptado para celular','Experiência cuidada em telas pequenas, onde está a maior parte do tráfego.',2),
('zap','Carregamento rápido','Páginas leves, com imagens otimizadas e carregamento progressivo.',3),
('message-circle','Integração com WhatsApp','Botão de contato direto para facilitar o atendimento.',4),
('search','Estrutura preparada para busca','Títulos, metadados e semântica organizados desde o início.',5),
('users','Atendimento personalizado','Acompanhamento próximo do briefing até a publicação.',6);

insert into public.process_steps (icon,title,description,sort_order) values
('clipboard-list','Briefing','Entendemos o negócio, o público e o objetivo da página.',1),
('map','Planejamento','Definimos estrutura, seções e a jornada até o contato.',2),
('pen-tool','Criação','Desenvolvemos o design e o conteúdo da página.',3),
('check-circle','Revisão','Ajustamos os detalhes conforme seu retorno.',4),
('rocket','Publicação','Colocamos no ar e acompanhamos os primeiros dias.',5);

with p as (
  insert into public.plans (name,description,price,is_highlighted,support_period,revisions,sort_order) values
  ('Landing Page Essencial','Para profissionais e pequenos negócios que precisam apresentar um serviço e receber contatos.',697.00,false,'30 dias','2 revisões',1),
  ('Landing Page Premium','Para negócios que precisam de uma solução mais completa, administrável e preparada para receber pedidos.',1497.00,true,'90 dias','4 revisões',2)
  returning id, name
)
insert into public.plan_features (plan_id,label,sort_order)
select p.id, f.label, f.ord from p
join (values
 ('Landing Page Essencial','Uma página com até oito seções',1),
 ('Landing Page Essencial','Layout responsivo',2),
 ('Landing Page Essencial','Botão do WhatsApp',3),
 ('Landing Page Essencial','Formulário de contato',4),
 ('Landing Page Essencial','Mapa opcional',5),
 ('Landing Page Essencial','Configuração básica de SEO',6),
 ('Landing Page Essencial','Integração básica com Analytics',7),
 ('Landing Page Essencial','Publicação e suporte inicial',8),
 ('Landing Page Premium','Tudo do plano Essencial',1),
 ('Landing Page Premium','Mais seções e recursos personalizados',2),
 ('Landing Page Premium','Painel administrativo',3),
 ('Landing Page Premium','Gestão de conteúdos',4),
 ('Landing Page Premium','Gestão de leads ou pedidos',5),
 ('Landing Page Premium','Formulários avançados',6),
 ('Landing Page Premium','Relatórios básicos e integrações',7),
 ('Landing Page Premium','Treinamento e suporte ampliado',8)
) as f(plan_name,label,ord) on f.plan_name = p.name;

insert into public.templates (name,niche,description,features,sort_order) values
('Sorriso Claro','Clínica odontológica','Modelo conceitual com destaque para tratamentos e agendamento.','{Agendamento,Tratamentos,Depoimentos em branco,Mapa}',1),
('Pele Viva','Clínica de estética','Modelo conceitual focado em procedimentos e captação de contatos.','{Procedimentos,Antes e depois,Formulário,WhatsApp}',2),
('Navalha Urbana','Barbearia','Modelo conceitual com serviços, horários e reserva rápida.','{Serviços,Horários,Galeria,Reserva}',3),
('Sol Direto','Energia solar','Modelo conceitual com simulação de economia e orçamento.','{Simulador,Benefícios,Orçamento,FAQ}',4),
('Conta Certa','Escritório de contabilidade','Modelo conceitual com serviços contábeis e captação de leads.','{Serviços,Planos,Formulário,Blog}',5),
('Mesa Boa','Restaurante ou delivery','Modelo conceitual com cardápio e pedido pelo WhatsApp.','{Cardápio,Pedido,Horários,Localização}',6);

insert into public.faqs (question,answer,category,sort_order) values
('Qual é o prazo de entrega?','O prazo depende do plano e do envio do conteúdo. Definimos uma data no briefing e acompanhamos durante o projeto.','Prazo',1),
('Quais são as formas de pagamento?','As condições são combinadas na proposta, com entrada e saldo na entrega.','Pagamento',2),
('Quantas revisões estão incluídas?','A quantidade de revisões é definida em cada plano e informada na proposta.','Revisões',3),
('O domínio está incluído?','O domínio é registrado em nome do cliente. Ajudamos na configuração.','Domínio',4),
('E a hospedagem?','Indicamos e configuramos a hospedagem adequada ao projeto.','Hospedagem',5),
('Como funciona o suporte?','Cada plano tem um período de suporte para ajustes e dúvidas após a publicação.','Suporte',6),
('Quem produz o conteúdo?','Trabalhamos com o material enviado pelo cliente e ajudamos na organização dos textos.','Conteúdo',7),
('A página integra com WhatsApp?','Sim, incluímos botão de contato direto para WhatsApp.','WhatsApp',8),
('A página funciona bem no celular?','Sim, todos os projetos são responsivos para celular, tablet e computador.','Responsividade',9),
('Tenho painel administrativo?','O painel está disponível no plano Premium.','Painel',10),
('Posso fazer alterações no futuro?','Sim, alterações posteriores podem ser contratadas separadamente.','Alterações',11);

insert into public.lead_stages (name,color,sort_order) values
('Novo lead','#1D6FF2',1),('Primeiro contato','#3B82F6',2),('Qualificação','#6366F1',3),
('Briefing','#8B5CF6',4),('Proposta','#F59E0B',5),('Negociação','#F97316',6),
('Fechado','#16A34A',7),('Perdido','#DC2626',8);