REVOKE ALL ON FUNCTION public.ensure_profile_and_bootstrap_admin() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.ensure_profile_and_bootstrap_admin() TO authenticated;