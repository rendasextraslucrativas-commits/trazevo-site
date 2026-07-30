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