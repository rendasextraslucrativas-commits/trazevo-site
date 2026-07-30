import { createFileRoute, Link } from "@tanstack/react-router";

import { PageHeader, SiteShell } from "@/components/site/site-shell";
import { useSuspenseQuery } from "@tanstack/react-query";
import { siteContentQuery } from "@/lib/site-content.queries";

export const Route = createFileRoute("/politica-de-privacidade")({
  loader: ({ context }) => context.queryClient.ensureQueryData(siteContentQuery),
  head: () => ({
    meta: [
      { title: "Política de Privacidade" },
      {
        name: "description",
        content:
          "Como coletamos, usamos e protegemos os dados enviados nos formulários de orçamento e contato do site.",
      },
      { property: "og:title", content: "Política de Privacidade" },
      {
        property: "og:description",
        content: "Informações sobre o tratamento de dados pessoais neste site.",
      },
    ],
  }),
  component: PrivacidadePage,
});

function PrivacidadePage() {
  const { data } = useSuspenseQuery(siteContentQuery);
  const email = data.settings?.email ?? "contato@exemplo.com.br";

  return (
    <SiteShell settings={data.settings}>
      <PageHeader eyebrow="Legal" title="Política de Privacidade" />
      <article className="mx-auto max-w-3xl space-y-6 px-4 py-16 text-sm leading-relaxed text-muted-foreground">
        <section>
          <h2 className="text-lg font-semibold text-foreground">1. Dados que coletamos</h2>
          <p className="mt-2">
            Coletamos apenas os dados informados voluntariamente nos formulários do site: nome,
            e-mail, telefone/WhatsApp, nome do negócio, segmento, objetivo da página, plano de
            interesse e mensagem. Também registramos dados técnicos anônimos de navegação, como
            página visitada e origem do acesso.
          </p>
        </section>
        <section>
          <h2 className="text-lg font-semibold text-foreground">2. Como usamos os dados</h2>
          <p className="mt-2">
            Utilizamos as informações para responder solicitações de orçamento, elaborar propostas,
            executar projetos contratados e melhorar o conteúdo do site. Não vendemos nem alugamos
            dados pessoais.
          </p>
        </section>
        <section>
          <h2 className="text-lg font-semibold text-foreground">3. Compartilhamento</h2>
          <p className="mt-2">
            Os dados podem ser processados por fornecedores de infraestrutura e envio de mensagens
            estritamente necessários à operação do serviço, sempre com finalidade limitada ao
            atendimento.
          </p>
        </section>
        <section>
          <h2 className="text-lg font-semibold text-foreground">4. Armazenamento e segurança</h2>
          <p className="mt-2">
            Os registros ficam armazenados em banco de dados com controle de acesso por perfil de
            usuário. Somente pessoas autorizadas da equipe podem visualizar solicitações recebidas.
          </p>
        </section>
        <section>
          <h2 className="text-lg font-semibold text-foreground">5. Seus direitos</h2>
          <p className="mt-2">
            Você pode solicitar a confirmação, correção, portabilidade ou exclusão dos seus dados a
            qualquer momento pelo e-mail <strong className="text-foreground">{email}</strong>.
          </p>
        </section>
        <section>
          <h2 className="text-lg font-semibold text-foreground">6. Cookies</h2>
          <p className="mt-2">
            O uso de cookies e tecnologias semelhantes está descrito na{" "}
            <Link to="/politica-de-cookies" className="text-primary underline-offset-4 hover:underline">
              Política de Cookies
            </Link>
            .
          </p>
        </section>
      </article>
    </SiteShell>
  );
}
