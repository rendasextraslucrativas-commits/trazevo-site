CREATE OR REPLACE FUNCTION public.ensure_profile_and_bootstrap_admin()
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_uid uuid := auth.uid();
  v_email text;
  v_name text;
BEGIN
  IF v_uid IS NULL THEN
    RAISE EXCEPTION 'not authenticated';
  END IF;

  SELECT lower(u.email), coalesce(u.raw_user_meta_data->>'full_name', u.raw_user_meta_data->>'name', u.email)
    INTO v_email, v_name
  FROM auth.users u WHERE u.id = v_uid;

  INSERT INTO public.profiles (id, full_name)
  VALUES (v_uid, v_name)
  ON CONFLICT (id) DO NOTHING;

  IF NOT EXISTS (SELECT 1 FROM public.user_roles WHERE role = 'admin')
     AND v_email = 'rendasextraslucrativas@gmail.com' THEN
    INSERT INTO public.user_roles (user_id, role)
    VALUES (v_uid, 'admin')
    ON CONFLICT (user_id, role) DO NOTHING;
  END IF;

  RETURN (SELECT role::text FROM public.user_roles WHERE user_id = v_uid ORDER BY created_at LIMIT 1);
END;
$$;

GRANT EXECUTE ON FUNCTION public.ensure_profile_and_bootstrap_admin() TO authenticated;