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