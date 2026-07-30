import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { CheckCircle2, Mail, MapPin, Phone } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { PageHeader, SiteShell } from "@/components/site/site-shell";
import { siteContentQuery } from "@/lib/site-content.queries";
import { submitLead } from "@/lib/site-content.functions";
import { trackEvent } from "@/components/site/analytics-tracker";
import { whatsappLink } from "@/lib/site-content.types";

export const Route = createFileRoute("/contato")({
  validateSearch: (search: Record<string, unknown>) => ({
    modelo: typeof search.modelo === "string" ? search.modelo.slice(0, 120) : undefined,
    origem: typeof search.origem === "string" ? search.origem.slice(0, 60) : undefined,
    url: typeof search.url === "string" ? search.url.slice(0, 400) : undefined,
  }),
  loader: ({ context }) => context.queryClient.ensureQueryData(siteContentQuery),
  head: () => ({
    meta: [
      { title: "Solicitar orçamento de landing page" },
      {
        name: "description",
        content:
          "Preencha o formulário com seu objetivo e receba uma proposta de landing page. Também atendemos por WhatsApp e e-mail.",
      },
      { property: "og:title", content: "Solicitar orçamento de landing page" },
      {
        property: "og:description",
        content: "Conte seu objetivo e receba uma proposta sem compromisso.",
      },
    ],
  }),
  component: ContatoPage,
});

const emptyForm = {
  name: "",
  email: "",
  whatsapp: "",
  company: "",
  city: "",
  niche: "",
  service: "",
  notes: "",
};

function ContatoPage() {
  const { data } = useSuspenseQuery(siteContentQuery);
  const search = Route.useSearch();
  const send = useServerFn(submitLead);
  const [form, setForm] = useState(emptyForm);
  const [consent, setConsent] = useState(false);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const wa = whatsappLink(data.settings);

  useEffect(() => {
    if (!search.modelo) return;
    setForm((prev) => ({
      ...prev,
      niche: prev.niche || search.modelo!,
      service: prev.service || "Landing page a partir de modelo",
      notes:
        prev.notes ||
        [
          `Modelo escolhido: ${search.modelo}`,
          `Origem: ${search.origem ?? "portfólio"}`,
          search.url ? `URL do modelo: ${search.url}` : null,
          `Data e hora: ${new Date().toLocaleString("pt-BR")}`,
        ]
          .filter(Boolean)
          .join("\n"),
    }));
  }, [search.modelo, search.origem, search.url]);



  const set = (key: keyof typeof emptyForm) => (value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!consent) {
      toast.error("É necessário aceitar a política de privacidade.");
      return;
    }
    setSending(true);
    try {
      await send({ data: { ...form, consent: true } });
      setSent(true);
      trackEvent("orcamento", "formulario_contato");
      setForm(emptyForm);
      setConsent(false);
      toast.success("Pedido enviado! Retornaremos em breve.");
    } catch (error) {
      toast.error(
        error instanceof Error && error.message
          ? "Confira os dados informados e tente novamente."
          : "Não foi possível enviar agora.",
      );
    } finally {
      setSending(false);
    }
  }

  return (
    <SiteShell settings={data.settings}>
      <PageHeader
        eyebrow="Contato"
        title="Solicite seu orçamento"
        subtitle="Responda algumas perguntas rápidas sobre o seu negócio e preparamos uma proposta adequada ao seu objetivo."
      />
      <section className="mx-auto grid max-w-6xl gap-10 px-4 py-16 lg:grid-cols-[1.4fr_1fr]">
        <Card className="border-border shadow-[var(--shadow-card)]">
          <CardContent className="pt-6">
            {sent ? (
              <div className="py-10 text-center">
                <CheckCircle2 className="mx-auto h-10 w-10 text-primary" aria-hidden />
                <h2 className="mt-4 text-xl font-semibold text-foreground">
                  Recebemos seu pedido
                </h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  Nossa equipe entrará em contato pelo WhatsApp ou e-mail informado.
                </p>
                <Button className="mt-6" variant="outline" onClick={() => setSent(false)}>
                  Enviar outro pedido
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-2">
                <div className="grid gap-2">
                  <Label htmlFor="name">Nome completo *</Label>
                  <Input
                    id="name"
                    required
                    maxLength={120}
                    value={form.name}
                    onChange={(e) => set("name")(e.target.value)}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">E-mail *</Label>
                  <Input
                    id="email"
                    type="email"
                    required
                    maxLength={255}
                    value={form.email}
                    onChange={(e) => set("email")(e.target.value)}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="whatsapp">WhatsApp *</Label>
                  <Input
                    id="whatsapp"
                    required
                    maxLength={30}
                    placeholder="(00) 00000-0000"
                    value={form.whatsapp}
                    onChange={(e) => set("whatsapp")(e.target.value)}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="company">Nome do negócio</Label>
                  <Input
                    id="company"
                    maxLength={120}
                    value={form.company}
                    onChange={(e) => set("company")(e.target.value)}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="city">Cidade</Label>
                  <Input
                    id="city"
                    maxLength={120}
                    value={form.city}
                    onChange={(e) => set("city")(e.target.value)}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="niche">Segmento</Label>
                  <Input
                    id="niche"
                    maxLength={120}
                    placeholder="Ex.: odontologia, estética, delivery"
                    value={form.niche}
                    onChange={(e) => set("niche")(e.target.value)}
                  />
                </div>
                <div className="grid gap-2 sm:col-span-2">
                  <Label htmlFor="service">Plano de interesse</Label>
                  <Select value={form.service} onValueChange={set("service")}>
                    <SelectTrigger id="service">
                      <SelectValue placeholder="Selecione uma opção" />
                    </SelectTrigger>
                    <SelectContent>
                      {data.plans.map((plan) => (
                        <SelectItem key={plan.id} value={plan.name}>
                          {plan.name}
                        </SelectItem>
                      ))}
                      <SelectItem value="Ainda não sei">Ainda não sei</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2 sm:col-span-2">
                  <Label htmlFor="notes">Objetivo da página</Label>
                  <Textarea
                    id="notes"
                    rows={5}
                    maxLength={1500}
                    placeholder="Conte o que você quer alcançar: mais contatos, agendamentos, pedidos..."
                    value={form.notes}
                    onChange={(e) => set("notes")(e.target.value)}
                  />
                </div>
                <div className="flex items-start gap-3 sm:col-span-2">
                  <Checkbox
                    id="consent"
                    checked={consent}
                    onCheckedChange={(value) => setConsent(value === true)}
                  />
                  <Label htmlFor="consent" className="text-sm font-normal text-muted-foreground">
                    Autorizo o contato e o tratamento dos meus dados conforme a{" "}
                    <Link
                      to="/politica-de-privacidade"
                      className="text-primary underline-offset-4 hover:underline"
                    >
                      Política de Privacidade
                    </Link>
                    .
                  </Label>
                </div>
                <div className="sm:col-span-2">
                  <Button type="submit" size="lg" disabled={sending} className="w-full sm:w-auto">
                    {sending ? "Enviando..." : "Enviar pedido de orçamento"}
                  </Button>
                </div>
              </form>
            )}
          </CardContent>
        </Card>

        <aside className="space-y-4">
          <Card className="border-border">
            <CardContent className="space-y-4 pt-6 text-sm">
              {data.settings?.whatsapp ? (
                <p className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-primary" aria-hidden />
                  <span className="text-muted-foreground">{data.settings.whatsapp}</span>
                </p>
              ) : null}
              {data.settings?.email ? (
                <p className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-primary" aria-hidden />
                  <span className="text-muted-foreground">{data.settings.email}</span>
                </p>
              ) : null}
              {data.settings?.address ? (
                <p className="flex items-center gap-3">
                  <MapPin className="h-4 w-4 text-primary" aria-hidden />
                  <span className="text-muted-foreground">{data.settings.address}</span>
                </p>
              ) : null}

              {wa ? (
                <Button asChild variant="outline" className="w-full">
                  <a href={wa} target="_blank" rel="noreferrer" onClick={() => trackEvent("whatsapp", "contato")}>
                    Conversar pelo WhatsApp
                  </a>
                </Button>
              ) : null}
            </CardContent>
          </Card>
          <Card className="border-border bg-surface">
            <CardContent className="pt-6 text-sm text-muted-foreground">
              <p className="font-medium text-foreground">O que acontece depois do envio</p>
              <ol className="mt-3 list-decimal space-y-1 pl-4">
                <li>Analisamos seu objetivo e segmento.</li>
                <li>Entramos em contato para alinhar detalhes.</li>
                <li>Enviamos a proposta com prazo e escopo.</li>
              </ol>
            </CardContent>
          </Card>
        </aside>
      </section>
    </SiteShell>
  );
}
