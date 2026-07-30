revoke execute on function public.has_role(uuid, public.app_role) from anon, public;
revoke execute on function public.can_edit_content(uuid) from anon, public;
revoke execute on function public.can_manage_crm(uuid) from anon, public;

drop policy "Secoes visiveis" on public.site_sections;
create policy "Secoes publicas" on public.site_sections for select to anon using (is_visible);
create policy "Secoes internas" on public.site_sections for select to authenticated using (is_visible or public.can_edit_content(auth.uid()));

drop policy "Beneficios visiveis" on public.benefits;
create policy "Beneficios publicos" on public.benefits for select to anon using (is_visible);
create policy "Beneficios internos" on public.benefits for select to authenticated using (is_visible or public.can_edit_content(auth.uid()));

drop policy "Etapas visiveis" on public.process_steps;
create policy "Etapas publicas" on public.process_steps for select to anon using (is_visible);
create policy "Etapas internas" on public.process_steps for select to authenticated using (is_visible or public.can_edit_content(auth.uid()));

drop policy "Planos visiveis" on public.plans;
create policy "Planos publicos" on public.plans for select to anon using (is_visible);
create policy "Planos internos" on public.plans for select to authenticated using (is_visible or public.can_edit_content(auth.uid()));

drop policy "Modelos publicados" on public.templates;
create policy "Modelos publicos" on public.templates for select to anon using (is_published);
create policy "Modelos internos" on public.templates for select to authenticated using (is_published or public.can_edit_content(auth.uid()));

drop policy "FAQ visivel" on public.faqs;
create policy "FAQ publico" on public.faqs for select to anon using (is_visible);
create policy "FAQ interno" on public.faqs for select to authenticated using (is_visible or public.can_edit_content(auth.uid()));

drop policy "Visitante pode enviar orcamento" on public.leads;
create policy "Visitante envia orcamento" on public.leads for insert to anon with check (consent = true and is_demo = false);
create policy "Usuario envia orcamento" on public.leads for insert to authenticated with check (consent = true and is_demo = false);