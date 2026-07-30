CREATE POLICY "Midia leitura editores" ON storage.objects FOR SELECT TO authenticated
  USING (bucket_id = 'midia' AND public.can_edit_content(auth.uid()));
CREATE POLICY "Midia envio editores" ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'midia' AND public.can_edit_content(auth.uid()));
CREATE POLICY "Midia atualizacao editores" ON storage.objects FOR UPDATE TO authenticated
  USING (bucket_id = 'midia' AND public.can_edit_content(auth.uid()))
  WITH CHECK (bucket_id = 'midia' AND public.can_edit_content(auth.uid()));
CREATE POLICY "Midia exclusao editores" ON storage.objects FOR DELETE TO authenticated
  USING (bucket_id = 'midia' AND public.can_edit_content(auth.uid()));