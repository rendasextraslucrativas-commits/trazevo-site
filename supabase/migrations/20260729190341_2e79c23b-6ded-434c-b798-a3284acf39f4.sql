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