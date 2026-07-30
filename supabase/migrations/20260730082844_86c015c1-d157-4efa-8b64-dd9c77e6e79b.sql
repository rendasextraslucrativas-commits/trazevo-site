CREATE POLICY "Midia leitura editores" ON storage.objects FOR SELECT TO authenticated
  USING (bucket_id = 'midia' AND public.can_edit_content(auth.uid()));
CREATE POLICY "Midia envio editores" ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'midia' AND public.can_edit_content(auth.uid()));
CREATE POLICY "Midia atualizacao editores" ON storage.objects FOR UPDATE TO authenticated
  USING (bucket_id = 'midia' AND public.can_edit_content(auth.uid()))
  WITH CHECK (bucket_id = 'midia' AND public.can_edit_content(auth.uid()));
CREATE POLICY "Midia exclusao editores" ON storage.objects FOR DELETE TO authenticated
  USING (bucket_id = 'midia' AND public.can_edit_content(auth.uid()));

REVOKE EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.can_edit_content(uuid) FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.can_manage_crm(uuid) FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.update_updated_at_column() FROM PUBLIC, anon, authenticated;

CREATE SCHEMA IF NOT EXISTS private;
REVOKE ALL ON SCHEMA private FROM PUBLIC, anon, authenticated;
GRANT USAGE ON SCHEMA private TO authenticated, service_role;

ALTER FUNCTION public.has_role(uuid, public.app_role) SET SCHEMA private;
ALTER FUNCTION public.can_edit_content(uuid) SET SCHEMA private;
ALTER FUNCTION public.can_manage_crm(uuid) SET SCHEMA private;

ALTER FUNCTION private.has_role(uuid, public.app_role) SET search_path = public;
ALTER FUNCTION private.can_edit_content(uuid) SET search_path = public;
ALTER FUNCTION private.can_manage_crm(uuid) SET search_path = public;

GRANT EXECUTE ON FUNCTION private.has_role(uuid, public.app_role) TO authenticated, service_role;
GRANT EXECUTE ON FUNCTION private.can_edit_content(uuid) TO authenticated, service_role;
GRANT EXECUTE ON FUNCTION private.can_manage_crm(uuid) TO authenticated, service_role;

CREATE TYPE public.project_status AS ENUM ('proposta','producao','revisao','entregue','pausado');

CREATE TABLE public.projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  client_name text NOT NULL,
  client_contact text,
  lead_id uuid REFERENCES public.leads(id) ON DELETE SET NULL,
  plan_id uuid REFERENCES public.plans(id) ON DELETE SET NULL,
  status public.project_status NOT NULL DEFAULT 'proposta',
  progress integer NOT NULL DEFAULT 0 CHECK (progress >= 0 AND progress <= 100),
  price numeric(12,2),
  started_at date,
  due_date date,
  delivered_at date,
  live_url text,
  notes text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.project_tasks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id uuid NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  title text NOT NULL,
  description text,
  is_done boolean NOT NULL DEFAULT false,
  due_date date,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX projects_status_idx ON public.projects(status);
CREATE INDEX project_tasks_project_idx ON public.project_tasks(project_id);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.projects TO authenticated;
GRANT ALL ON public.projects TO service_role;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.project_tasks TO authenticated;
GRANT ALL ON public.project_tasks TO service_role;

ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_tasks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Equipe gerencia projetos" ON public.projects
  FOR ALL TO authenticated
  USING (private.can_manage_crm(auth.uid()))
  WITH CHECK (private.can_manage_crm(auth.uid()));

CREATE POLICY "Equipe gerencia etapas" ON public.project_tasks
  FOR ALL TO authenticated
  USING (private.can_manage_crm(auth.uid()))
  WITH CHECK (private.can_manage_crm(auth.uid()));

CREATE TRIGGER projects_set_updated_at BEFORE UPDATE ON public.projects
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER project_tasks_set_updated_at BEFORE UPDATE ON public.project_tasks
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TABLE public.page_views (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  path text NOT NULL,
  referrer text,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  device text,
  session_id text,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.conversion_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  event_type text NOT NULL,
  path text,
  label text,
  session_id text,
  metadata jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX page_views_created_idx ON public.page_views(created_at DESC);
CREATE INDEX page_views_path_idx ON public.page_views(path);
CREATE INDEX conversion_events_created_idx ON public.conversion_events(created_at DESC);

GRANT SELECT ON public.page_views TO authenticated;
GRANT ALL ON public.page_views TO service_role;
GRANT SELECT ON public.conversion_events TO authenticated;
GRANT ALL ON public.conversion_events TO service_role;

ALTER TABLE public.page_views ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.conversion_events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Equipe le visitas" ON public.page_views
  FOR SELECT TO authenticated USING (private.can_manage_crm(auth.uid()));
CREATE POLICY "Equipe le conversoes" ON public.conversion_events
  FOR SELECT TO authenticated USING (private.can_manage_crm(auth.uid()));

CREATE TABLE public.integrations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  webhook_url text,
  webhook_secret text,
  inbound_key text NOT NULL DEFAULT encode(gen_random_bytes(24), 'hex'),
  whatsapp_notify_number text,
  notify_email text,
  notify_on_lead boolean NOT NULL DEFAULT true,
  notify_on_project boolean NOT NULL DEFAULT false,
  webhook_enabled boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.webhook_deliveries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  event_type text NOT NULL,
  target_url text,
  status text NOT NULL DEFAULT 'pending',
  status_code integer,
  response_body text,
  payload jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  body text,
  type text NOT NULL DEFAULT 'info',
  link text,
  read_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.integrations TO authenticated;
GRANT ALL ON public.integrations TO service_role;
GRANT SELECT, DELETE ON public.webhook_deliveries TO authenticated;
GRANT ALL ON public.webhook_deliveries TO service_role;
GRANT SELECT, UPDATE, DELETE ON public.notifications TO authenticated;
GRANT ALL ON public.notifications TO service_role;

ALTER TABLE public.integrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.webhook_deliveries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "crm manage integrations" ON public.integrations FOR ALL TO authenticated
  USING (private.can_manage_crm(auth.uid())) WITH CHECK (private.can_manage_crm(auth.uid()));

CREATE POLICY "crm read deliveries" ON public.webhook_deliveries FOR SELECT TO authenticated
  USING (private.can_manage_crm(auth.uid()));
CREATE POLICY "crm delete deliveries" ON public.webhook_deliveries FOR DELETE TO authenticated
  USING (private.can_manage_crm(auth.uid()));

CREATE POLICY "crm read notifications" ON public.notifications FOR SELECT TO authenticated
  USING (private.can_manage_crm(auth.uid()));
CREATE POLICY "crm update notifications" ON public.notifications FOR UPDATE TO authenticated
  USING (private.can_manage_crm(auth.uid())) WITH CHECK (private.can_manage_crm(auth.uid()));
CREATE POLICY "crm delete notifications" ON public.notifications FOR DELETE TO authenticated
  USING (private.can_manage_crm(auth.uid()));

CREATE TRIGGER update_integrations_updated_at BEFORE UPDATE ON public.integrations
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE INDEX idx_webhook_deliveries_created ON public.webhook_deliveries (created_at DESC);
CREATE INDEX idx_notifications_created ON public.notifications (created_at DESC);

INSERT INTO public.integrations (webhook_enabled) VALUES (false);

CREATE OR REPLACE FUNCTION public.bootstrap_first_admin()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_email text;
BEGIN
  IF EXISTS (SELECT 1 FROM public.user_roles WHERE role = 'admin') THEN
    RETURN NEW;
  END IF;

  SELECT lower(email) INTO v_email FROM auth.users WHERE id = NEW.id;

  IF v_email = 'rendasextraslucrativas@gmail.com' THEN
    INSERT INTO public.user_roles (user_id, role)
    VALUES (NEW.id, 'admin')
    ON CONFLICT (user_id, role) DO NOTHING;
  END IF;

  RETURN NEW;
END;
$$;

REVOKE EXECUTE ON FUNCTION public.bootstrap_first_admin() FROM PUBLIC, anon, authenticated;

CREATE TRIGGER on_profile_created_bootstrap_admin
AFTER INSERT ON public.profiles
FOR EACH ROW EXECUTE FUNCTION public.bootstrap_first_admin();

CREATE TABLE public.demo_sites (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE,
  name text NOT NULL,
  niche text NOT NULL,
  cover_url text,
  is_published boolean NOT NULL DEFAULT false,
  is_master boolean NOT NULL DEFAULT false,
  is_highlighted boolean NOT NULL DEFAULT false,
  sort_order integer NOT NULL DEFAULT 0,
  tags text[] NOT NULL DEFAULT '{}',
  meta_title text,
  meta_description text,
  theme jsonb NOT NULL DEFAULT '{}'::jsonb,
  content jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.demo_sites TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.demo_sites TO authenticated;
GRANT ALL ON public.demo_sites TO service_role;

ALTER TABLE public.demo_sites ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Modelos publicados sao publicos"
  ON public.demo_sites FOR SELECT TO anon
  USING (is_published = true);

CREATE POLICY "Equipe le todos os modelos"
  ON public.demo_sites FOR SELECT TO authenticated
  USING (is_published = true OR private.can_edit_content(auth.uid()));

CREATE POLICY "Equipe gerencia modelos"
  ON public.demo_sites FOR ALL TO authenticated
  USING (private.can_edit_content(auth.uid()))
  WITH CHECK (private.can_edit_content(auth.uid()));

CREATE TRIGGER update_demo_sites_updated_at
  BEFORE UPDATE ON public.demo_sites
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

INSERT INTO public.demo_sites (slug, name, niche, is_published, is_master, is_highlighted, sort_order, tags, meta_title, meta_description, theme, content)
VALUES (
  'clinica-odontologica',
  'Clínica Odontológica Modelo',
  'Saúde e Odontologia',
  true,
  true,
  true,
  1,
  ARRAY['odontologia','clínica','agendamento'],
  'Modelo de Site para Clínica Odontológica | Portfólio',
  'Conheça um modelo profissional de landing page para clínicas odontológicas, com tratamentos, agendamento, WhatsApp e estrutura responsiva.',
  '{"primary":"#0f3b6d","deep":"#0a2748","light":"#dbeafe","mint":"#7fd1c1","surface":"#f4f7fb","text":"#1f2937","font":"Inter, system-ui, sans-serif"}'::jsonb,
  '{
    "brand": {
      "name": "Clínica Odontológica Modelo",
      "initials": "CO",
      "tagline": "Odontologia moderna e humanizada",
      "phone": "A definir pelo cliente",
      "whatsapp": "",
      "email": "contato@exemplo-modelo.com",
      "address": "Endereço a ser informado pelo cliente",
      "hours": "Horário de atendimento a ser informado pelo cliente",
      "instagram": "",
      "facebook": ""
    },
    "demo_notice": "Modelo demonstrativo criado para fins de apresentação. Esta não é uma clínica real.",
    "nav": [
      {"label":"Início","href":"#inicio"},
      {"label":"Tratamentos","href":"#tratamentos"},
      {"label":"Diferenciais","href":"#diferenciais"},
      {"label":"Como funciona","href":"#como-funciona"},
      {"label":"Estrutura","href":"#estrutura"},
      {"label":"Dúvidas","href":"#duvidas"},
      {"label":"Contato","href":"#contato"}
    ],
    "hero": {
      "visible": true,
      "title": "Seu sorriso merece um atendimento de excelência.",
      "subtitle": "Atendimento humanizado, tecnologia moderna e cuidado em cada etapa para você sorrir com mais confiança.",
      "cta_primary": "Agendar avaliação",
      "cta_secondary": "Conversar pelo WhatsApp",
      "image_url": null,
      "badges": ["Atendimento personalizado","Ambiente confortável","Tecnologia moderna","Agendamento facilitado"]
    },
    "specialties": {
      "visible": true,
      "title": "Tratamentos para cuidar do seu sorriso",
      "subtitle": "Especialidades demonstrativas que podem ser ajustadas conforme a clínica.",
      "items": [
        {"icon":"stethoscope","name":"Avaliação odontológica","description":"Primeira consulta para entender necessidades e orientar o próximo passo.","visible":true},
        {"icon":"heart-pulse","name":"Clínica geral","description":"Cuidados de rotina, restaurações e acompanhamento preventivo.","visible":true},
        {"icon":"anchor","name":"Implantes dentários","description":"Reabilitação planejada para devolver função e naturalidade ao sorriso.","visible":true},
        {"icon":"sparkles","name":"Clareamento","description":"Protocolos para uniformizar o tom dos dentes com conforto.","visible":true},
        {"icon":"align-center","name":"Ortodontia","description":"Alinhamento dentário com acompanhamento periódico.","visible":true},
        {"icon":"gem","name":"Lentes e estética dental","description":"Planejamento estético com foco em harmonia e naturalidade.","visible":true},
        {"icon":"baby","name":"Odontopediatria","description":"Atendimento acolhedor para crianças em cada fase.","visible":true},
        {"icon":"shield-check","name":"Prevenção e limpeza","description":"Higienização profissional e orientação de cuidados diários.","visible":true}
      ]
    },
    "differentials": {
      "visible": true,
      "title": "Um atendimento pensado para você",
      "items": [
        {"icon":"heart","title":"Atendimento humanizado","description":"Cada paciente recebe atenção individual, explicações claras e um plano de cuidado adequado às suas necessidades."},
        {"icon":"cpu","title":"Tecnologia moderna","description":"Estrutura preparada para oferecer diagnósticos e tratamentos com mais precisão, conforto e segurança."},
        {"icon":"sofa","title":"Ambiente acolhedor","description":"Espaços planejados para proporcionar tranquilidade desde a recepção até o atendimento."},
        {"icon":"calendar-check","title":"Agendamento simplificado","description":"Contato rápido pelo WhatsApp e formulário online para facilitar o agendamento."},
        {"icon":"file-text","title":"Planejamento transparente","description":"Apresentação clara das etapas, opções e orientações antes do início de cada tratamento."},
        {"icon":"life-buoy","title":"Acompanhamento","description":"Cuidado contínuo antes, durante e após os procedimentos."}
      ]
    },
    "about": {
      "visible": true,
      "title": "Cuidado odontológico com confiança e atenção",
      "body": "Este modelo apresenta como uma clínica odontológica pode comunicar seus serviços de maneira profissional, acolhedora e organizada. A estrutura foi pensada para transmitir confiança, facilitar o contato e orientar o paciente até o agendamento.",
      "note": "Conteúdo demonstrativo. Informações e imagens devem ser substituídas pelos dados reais do cliente durante a personalização.",
      "image_url": null
    },
    "steps": {
      "visible": true,
      "title": "Como funciona o atendimento",
      "items": [
        {"title":"Agendamento","description":"O paciente solicita atendimento pelo site ou WhatsApp."},
        {"title":"Avaliação","description":"A equipe realiza uma avaliação inicial e entende as necessidades do paciente."},
        {"title":"Plano de tratamento","description":"As opções e etapas são apresentadas de maneira clara."},
        {"title":"Acompanhamento","description":"O paciente recebe orientações e acompanhamento durante todo o processo."}
      ]
    },
    "gallery": {
      "visible": true,
      "title": "Estrutura e tecnologia",
      "note": "Imagens demonstrativas. A personalização final utilizará fotografias reais do cliente.",
      "items": [
        {"label":"Recepção","image_url":null},
        {"label":"Consultório","image_url":null},
        {"label":"Equipamentos","image_url":null},
        {"label":"Sala de atendimento","image_url":null},
        {"label":"Ambiente infantil","image_url":null},
        {"label":"Área de esterilização","image_url":null}
      ]
    },
    "team": {
      "visible": false,
      "title": "Equipe",
      "items": [
        {"name":"Profissional 1","role":"Especialista em Ortodontia","register":"Registro a ser informado pelo cliente","bio":"Descrição a ser preenchida na personalização.","image_url":null,"visible":true},
        {"name":"Profissional 2","role":"Especialista em Implantodontia","register":"Registro a ser informado pelo cliente","bio":"Descrição a ser preenchida na personalização.","image_url":null,"visible":true}
      ]
    },
    "commitments": {
      "visible": true,
      "title": "Compromissos com o paciente",
      "items": [
        "Clareza nas informações",
        "Respeito ao paciente",
        "Higiene e organização",
        "Atendimento individualizado",
        "Orientações antes e após os procedimentos",
        "Facilidade de comunicação"
      ]
    },
    "faq": {
      "visible": true,
      "title": "Perguntas frequentes",
      "items": [
        {"question":"Como faço para agendar uma avaliação?","answer":"Você pode solicitar um horário pelo formulário ou pelo botão do WhatsApp."},
        {"question":"Quais tratamentos a clínica oferece?","answer":"Os serviços disponíveis aparecem na seção de tratamentos e podem ser personalizados conforme as especialidades da clínica."},
        {"question":"A clínica atende convênios?","answer":"Essa informação deve ser configurada de acordo com cada clínica."},
        {"question":"Quais formas de pagamento são aceitas?","answer":"As condições devem ser informadas pela clínica durante a personalização do site."},
        {"question":"É possível remarcar o atendimento?","answer":"As regras de cancelamento e reagendamento devem ser definidas pela clínica."},
        {"question":"Como chegar à clínica?","answer":"O endereço, o mapa e as orientações de acesso serão inseridos com os dados reais do cliente."}
      ]
    },
    "form": {
      "visible": true,
      "title": "Solicite seu agendamento",
      "subtitle": "Preencha os dados e a equipe entrará em contato para verificar a disponibilidade.",
      "treatments": ["Avaliação","Implante","Clareamento","Ortodontia","Estética dental","Odontopediatria","Outro"],
      "periods": ["Manhã","Tarde","Noite","Qualquer período"],
      "success_message": "Recebemos sua solicitação. A equipe entrará em contato para verificar a disponibilidade do atendimento."
    },
    "whatsapp": {
      "enabled": true,
      "message": "Olá! Vi o modelo de site para clínica odontológica e gostaria de receber informações para criar um projeto semelhante."
    },
    "final_cta": {
      "visible": true,
      "title": "Dê o primeiro passo para cuidar do seu sorriso.",
      "text": "Solicite uma avaliação e converse com a equipe para receber mais informações.",
      "cta_primary": "Solicitar avaliação",
      "cta_secondary": "Falar pelo WhatsApp",
      "note": "Modelo demonstrativo. O conteúdo será personalizado com os dados reais de cada clínica."
    },
    "footer": {
      "description": "Modelo de site para clínicas odontológicas, com foco em clareza, confiança e agendamento simples.",
      "note": "Modelo demonstrativo. Não representa uma clínica real."
    }
  }'::jsonb
);