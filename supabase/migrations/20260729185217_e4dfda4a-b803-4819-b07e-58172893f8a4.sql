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

GRANT INSERT ON public.page_views TO anon, authenticated;
GRANT SELECT ON public.page_views TO authenticated;
GRANT ALL ON public.page_views TO service_role;
GRANT INSERT ON public.conversion_events TO anon, authenticated;
GRANT SELECT ON public.conversion_events TO authenticated;
GRANT ALL ON public.conversion_events TO service_role;

ALTER TABLE public.page_views ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.conversion_events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Qualquer um registra visita" ON public.page_views
  FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Equipe le visitas" ON public.page_views
  FOR SELECT TO authenticated USING (private.can_manage_crm(auth.uid()));

CREATE POLICY "Qualquer um registra conversao" ON public.conversion_events
  FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Equipe le conversoes" ON public.conversion_events
  FOR SELECT TO authenticated USING (private.can_manage_crm(auth.uid()));