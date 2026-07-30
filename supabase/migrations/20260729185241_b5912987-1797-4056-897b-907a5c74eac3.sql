DROP POLICY "Qualquer um registra visita" ON public.page_views;
DROP POLICY "Qualquer um registra conversao" ON public.conversion_events;
REVOKE INSERT ON public.page_views FROM anon, authenticated;
REVOKE INSERT ON public.conversion_events FROM anon, authenticated;