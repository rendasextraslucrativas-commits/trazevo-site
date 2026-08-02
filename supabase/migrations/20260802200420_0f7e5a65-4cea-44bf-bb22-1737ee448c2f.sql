-- 1) Bootstrap function: no longer callable by signed-in users; server-only with explicit user id
DROP FUNCTION IF EXISTS public.ensure_profile_and_bootstrap_admin();

CREATE OR REPLACE FUNCTION public.ensure_profile_and_bootstrap_admin(_user_id uuid)
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
DECLARE
  v_email text;
  v_name text;
BEGIN
  IF _user_id IS NULL THEN
    RAISE EXCEPTION 'user id required';
  END IF;

  SELECT lower(u.email),
         coalesce(u.raw_user_meta_data->>'full_name', u.raw_user_meta_data->>'name', u.email)
    INTO v_email, v_name
  FROM auth.users u WHERE u.id = _user_id;

  IF v_email IS NULL THEN
    RAISE EXCEPTION 'user not found';
  END IF;

  INSERT INTO public.profiles (id, full_name)
  VALUES (_user_id, v_name)
  ON CONFLICT (id) DO NOTHING;

  IF NOT EXISTS (SELECT 1 FROM public.user_roles WHERE role = 'admin')
     AND v_email = 'rendasextraslucrativas@gmail.com' THEN
    INSERT INTO public.user_roles (user_id, role)
    VALUES (_user_id, 'admin')
    ON CONFLICT (user_id, role) DO NOTHING;
  END IF;

  RETURN (SELECT role::text FROM public.user_roles WHERE user_id = _user_id ORDER BY created_at LIMIT 1);
END;
$function$;

REVOKE ALL ON FUNCTION public.ensure_profile_and_bootstrap_admin(uuid) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.ensure_profile_and_bootstrap_admin(uuid) FROM anon;
REVOKE ALL ON FUNCTION public.ensure_profile_and_bootstrap_admin(uuid) FROM authenticated;
GRANT EXECUTE ON FUNCTION public.ensure_profile_and_bootstrap_admin(uuid) TO service_role;

-- 2) Restrict public lead submissions to non-internal fields only
DROP POLICY IF EXISTS "Visitante envia orcamento" ON public.leads;
DROP POLICY IF EXISTS "Usuario envia orcamento" ON public.leads;

CREATE POLICY "Visitante envia orcamento" ON public.leads
  FOR INSERT TO anon
  WITH CHECK (
    consent = true
    AND is_demo = false
    AND owner_id IS NULL
    AND stage_id IS NULL
    AND plan_id IS NULL
    AND priority = 'media'::lead_priority
  );

CREATE POLICY "Usuario envia orcamento" ON public.leads
  FOR INSERT TO authenticated
  WITH CHECK (
    consent = true
    AND is_demo = false
    AND owner_id IS NULL
    AND stage_id IS NULL
    AND plan_id IS NULL
    AND priority = 'media'::lead_priority
  );