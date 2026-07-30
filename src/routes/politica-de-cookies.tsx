import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";

import { PageHeader, SiteShell } from "@/components/site/site-shell";
import { siteContentQuery } from "@/lib/site-content.queries";

export const Route = createFileRoute("/politica-de-cookies")({
  loader: ({ context }) => context.queryClient.ensureQueryData(siteContentQuery),
  head: () => ({
    meta: [
      { title: "Política de Cookies" },
      {
        name: "description",
        content:
          "Quais cookies e registros de navegação usamos, para que servem e como você pode controlá-los no navegador.",
      },
      { property: "og:title", content: "Política de Cookies" },
      { property: "og:description", content: "Como usamos cookies e medições de navegação." },
    ],
  }),
  component: CookiesPage,
});

function CookiesPage() {
  const { data } = useSuspenseQuery(siteContentQuery);

  return (
    <SiteShell settings={data.settings}>
      <PageHeader eyebrow="Legal" title="Política de Cookies" />
      <article className="mx-auto max-w-3xl space-y-6 px-4 py-16 text-sm leading-relaxed text-muted-foreground">
        <section>
          <h2 className="text-lg font-semibold text-foreground">1. O que são cookies</h2>
          <p className="mt-2">
            Cookies são pequenos arquivos gravados no navegador que ajudam o site a funcionar e a
            entender como as páginas são utilizadas.
          </p>
        </section>
        <section>
          <h2 className="text-lg font-semibold text-foreground">2. Cookies essenciais</h2>
          <p className="mt-2">
            Usados para manter a sessão de usuários autenticados no painel administrativo. Sem eles
            o acesso restrito não funciona.
          </p>
        </section>
        <section>
          <h2 className="text-lg font-semibold text-foreground">3. Medição de navegação</h2>
          <p className="mt-2">
            Registramos, de forma agregada, visitas por página, origem do acesso e cliques em botões
            de contato. Esses dados são usados apenas para melhorar o site.
          </p>
        </section>
        <section>
          <h2 className="text-lg font-semibold text-foreground">4. Como controlar</h2>
          <p className="mt-2">
            Você pode bloquear ou apagar cookies nas configurações do seu navegador. Ao fazer isso,
            algumas funcionalidades podem deixar de operar corretamente.
          </p>
        </section>
      </article>
    </SiteShell>
  );
}
