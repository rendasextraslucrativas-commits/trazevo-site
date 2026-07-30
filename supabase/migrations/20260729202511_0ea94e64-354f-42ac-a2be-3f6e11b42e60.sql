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