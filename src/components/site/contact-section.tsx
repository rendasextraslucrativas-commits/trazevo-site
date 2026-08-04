import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { Clock, Globe2, Mail } from "lucide-react";
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
import { SectionTitle } from "./site-shell";
import { trackEvent } from "./analytics-tracker";
import { submitLead } from "@/lib/site-content.functions";
import { WhatsAppIcon } from "./whatsapp-icon";

/* TEMPORÁRIO: substituir pelos dados reais de contato antes da publicação. */
export const CONTACT_WHATSAPP_NUMBER = "(00) 00000-0000";
export const CONTACT_WHATSAPP_BASE = "https://wa.me/5500000000000";
export const CONTACT_EMAIL = "contato@seudominio.com.br";

export function waLink(message: string) {
  return `${CONTACT_WHATSAPP_BASE}?text=${encodeURIComponent(message)}`;
}

const SEGMENTS = [
  "Saúde e odontologia",
  "Estética e beleza",
  "Construção e serviços locais",
  "Escritório ou serviço profissional",
  "Alimentação e delivery",
  "Comércio",
  "Educação",
  "Outro segmento",
];

const PROJECTS = [
  "Landing Page",
  "Site Institucional",
  "Catálogo Digital",
  "Loja Virtual",
  "Ainda não sei",
];

const BUDGETS = [
  "Até R$ 1.000",
  "De R$ 1.000 a R$ 2.000",
  "De R$ 2.000 a R$ 4.000",
  "Acima de R$ 4.000",
  "Prefiro conversar primeiro",
];

function maskPhone(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  if (digits.length <= 2) return digits.length ? `(${digits}` : "";
  if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  if (digits.length <= 10)
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

const emptyForm = {
  name: "",
  company: "",
  whatsapp: "",
  email: "",
  niche: "",
  service: "",
  budget: "",
  notes: "",
};

type FormState = typeof emptyForm;
type Errors = Partial<Record<keyof FormState | "consent", string>>;

const infoBlocks = [
  {
    icon: WhatsAppIcon,
    title: "WhatsApp",
    lines: ["Atendimento comercial pelo WhatsApp", CONTACT_WHATSAPP_NUMBER],
  },
  { icon: Mail, title: "E-mail", lines: [CONTACT_EMAIL] },
  { icon: Globe2, title: "Atendimento", lines: ["Atendimento online para todo o Brasil"] },
  {
    icon: Clock,
    title: "Horário de atendimento",
    lines: [
      "Segunda a sexta-feira, das 9h às 18h",
      "Mensagens enviadas fora do horário serão respondidas no próximo período de atendimento.",
    ],
  },
];

export function ContactSection() {
  const send = useServerFn(submitLead);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [consent, setConsent] = useState(false);
  const [honeypot, setHoneypot] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [lastSentAt, setLastSentAt] = useState(0);

  const set = (key: keyof FormState) => (value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  function validate(): Errors {
    const next: Errors = {};
    if (form.name.trim().length < 2) next.name = "Informe seu nome.";
    if (form.whatsapp.replace(/\D/g, "").length < 10)
      next.whatsapp = "Informe um WhatsApp válido com DDD.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email.trim()))
      next.email = "Informe um e-mail válido.";
    if (!form.niche) next.niche = "Selecione o segmento do negócio.";
    if (!form.service) next.service = "Selecione o tipo de projeto.";
    if (form.notes.trim().length < 10) next.notes = "Conte um pouco sobre o seu negócio.";
    if (!consent) next.consent = "É necessário concordar para continuar.";
    return next;
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const next = validate();
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    // Proteção anti-spam: honeypot invisível + limite de envios por minuto.
    if (honeypot.trim() !== "") {
      setSent(true);
      return;
    }
    if (Date.now() - lastSentAt < 60_000) {
      setSent(true);
      return;
    }

    setSending(true);
    try {
      await send({
        data: {
          name: form.name.trim(),
          email: form.email.trim(),
          whatsapp: form.whatsapp.trim(),
          company: form.company.trim(),
          niche: form.niche,
          service: form.service,
          notes: form.budget
            ? `${form.notes.trim()}\n\nFaixa de investimento: ${form.budget}`
            : form.notes.trim(),
          consent: true,
        },
      });
      trackEvent("contato", "contato_home");
      setLastSentAt(Date.now());
      setSent(true);
      setForm(emptyForm);
      setConsent(false);
      toast.success("Solicitação enviada com sucesso. Entraremos em contato assim que possível.");
    } catch {
      toast.error(
        "Não foi possível enviar sua solicitação. Tente novamente ou entre em contato pelo WhatsApp.",
      );
    } finally {
      setSending(false);
    }
  }

  return (
    <section id="contato" className="border-y border-border bg-surface">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:py-20">
        <SectionTitle
          title="Vamos conversar sobre o seu projeto?"
          subtitle="Conte um pouco sobre o seu negócio e receba uma orientação sobre a solução mais adequada para seus objetivos."
        />

        <div className="mt-12 grid gap-8 lg:grid-cols-2 lg:gap-12">
          <div>
            <p className="max-w-xl text-muted-foreground">
              Estamos prontos para entender sua ideia e ajudar você a construir uma presença
              digital mais profissional. Entre em contato pelo WhatsApp ou envie suas informações
              pelo formulário.
            </p>

            <ul className="mt-8 space-y-4">
              {infoBlocks.map((block) => (
                <li
                  key={block.title}
                  className="flex gap-4 rounded-xl border border-border bg-background p-4"
                >
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
                    <block.icon className="h-5 w-5" aria-hidden />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{block.title}</p>
                    {block.lines.map((line) => (
                      <p key={line} className="mt-1 text-sm text-muted-foreground">
                        {line}
                      </p>
                    ))}
                  </div>
                </li>
              ))}
            </ul>

            <Button asChild size="lg" className="mt-8 w-full sm:w-auto">
              <a
                href={waLink(
                  "Olá! Gostaria de conversar sobre a criação de um site para o meu negócio.",
                )}
                target="_blank"
                rel="noreferrer"
                onClick={() => trackEvent("whatsapp", "contato_home")}
              >
                <WhatsAppIcon className="mr-2 h-4 w-4" />
                Chamar no WhatsApp
              </a>
            </Button>
          </div>

          <Card className="border-border bg-background">
            <CardContent className="p-6 sm:p-8">
              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                <div className="hidden" aria-hidden>
                  <label htmlFor="contato-assunto-extra">Não preencher</label>
                  <input
                    id="contato-assunto-extra"
                    name="assunto_extra"
                    tabIndex={-1}
                    autoComplete="off"
                    value={honeypot}
                    onChange={(event) => setHoneypot(event.target.value)}
                  />
                </div>

                <Field id="c-name" label="Nome" error={errors.name} required>
                  <Input
                    id="c-name"
                    placeholder="Digite seu nome"
                    value={form.name}
                    maxLength={120}
                    onChange={(event) => set("name")(event.target.value)}
                  />
                </Field>

                <Field id="c-company" label="Nome da empresa (opcional)">
                  <Input
                    id="c-company"
                    placeholder="Digite o nome da empresa"
                    value={form.company}
                    maxLength={120}
                    onChange={(event) => set("company")(event.target.value)}
                  />
                </Field>

                <div className="grid gap-5 sm:grid-cols-2">
                  <Field id="c-whatsapp" label="WhatsApp" error={errors.whatsapp} required>
                    <Input
                      id="c-whatsapp"
                      inputMode="tel"
                      placeholder="Digite seu WhatsApp"
                      value={form.whatsapp}
                      onChange={(event) => set("whatsapp")(maskPhone(event.target.value))}
                    />
                  </Field>
                  <Field id="c-email" label="E-mail" error={errors.email} required>
                    <Input
                      id="c-email"
                      type="email"
                      placeholder="Digite seu melhor e-mail"
                      value={form.email}
                      maxLength={255}
                      onChange={(event) => set("email")(event.target.value)}
                    />
                  </Field>
                </div>

                <Field id="c-niche" label="Segmento do negócio" error={errors.niche} required>
                  <Select value={form.niche} onValueChange={set("niche")}>
                    <SelectTrigger id="c-niche">
                      <SelectValue placeholder="Selecione o segmento" />
                    </SelectTrigger>
                    <SelectContent>
                      {SEGMENTS.map((item) => (
                        <SelectItem key={item} value={item}>
                          {item}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Field>

                <Field id="c-service" label="Tipo de projeto" error={errors.service} required>
                  <Select value={form.service} onValueChange={set("service")}>
                    <SelectTrigger id="c-service">
                      <SelectValue placeholder="Selecione o tipo de projeto" />
                    </SelectTrigger>
                    <SelectContent>
                      {PROJECTS.map((item) => (
                        <SelectItem key={item} value={item}>
                          {item}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Field>

                <Field id="c-budget" label="Faixa de investimento (opcional)">
                  <Select value={form.budget} onValueChange={set("budget")}>
                    <SelectTrigger id="c-budget">
                      <SelectValue placeholder="Selecione uma faixa" />
                    </SelectTrigger>
                    <SelectContent>
                      {BUDGETS.map((item) => (
                        <SelectItem key={item} value={item}>
                          {item}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Field>

                <Field id="c-notes" label="Mensagem" error={errors.notes} required>
                  <Textarea
                    id="c-notes"
                    rows={5}
                    maxLength={1500}
                    placeholder="Conte um pouco sobre o seu negócio e o que você precisa no site."
                    value={form.notes}
                    onChange={(event) => set("notes")(event.target.value)}
                  />
                </Field>

                <div className="flex items-start gap-3">
                  <Checkbox
                    id="c-consent"
                    checked={consent}
                    onCheckedChange={(value) => setConsent(value === true)}
                  />
                  <div>
                    <Label htmlFor="c-consent" className="text-sm font-normal leading-relaxed">
                      Li e concordo com o uso dos meus dados para retorno do atendimento, conforme
                      a{" "}
                      <Link to="/politica-de-privacidade" className="underline">
                        Política de Privacidade
                      </Link>
                      .
                    </Label>
                    {errors.consent ? (
                      <p className="mt-1 text-sm text-destructive">{errors.consent}</p>
                    ) : null}
                  </div>
                </div>

                <Button type="submit" size="lg" className="w-full" disabled={sending}>
                  {sending ? "Enviando…" : "Enviar solicitação"}
                </Button>

                {sent ? (
                  <p role="status" className="rounded-lg bg-primary/10 p-3 text-sm text-foreground">
                    Solicitação enviada com sucesso. Entraremos em contato assim que possível.
                  </p>
                ) : null}

                <p className="text-xs text-muted-foreground">
                  Seus dados serão utilizados exclusivamente para responder ao seu contato e
                  preparar uma possível proposta comercial.
                </p>
              </form>
            </CardContent>
          </Card>
        </div>

        <div className="mt-14 rounded-2xl border border-border bg-background p-8 text-center sm:p-12">
          <h3 className="text-2xl font-bold tracking-tight text-brand sm:text-3xl">
            Seu negócio merece uma presença digital profissional
          </h3>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Dê o primeiro passo para criar um site moderno, claro e preparado para gerar novas
            oportunidades.
          </p>
          <Button asChild size="lg" className="mt-8">
            <a
              href={waLink("Olá! Gostaria de solicitar um orçamento para criação de site.")}
              target="_blank"
              rel="noreferrer"
              onClick={() => trackEvent("whatsapp", "contato_faixa_final")}
            >
              Solicitar meu orçamento
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}

function Field({
  id,
  label,
  error,
  required,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>
        {label}
        {required ? <span className="ml-1 text-destructive">*</span> : null}
      </Label>
      {children}
      {error ? <p className="text-sm text-destructive">{error}</p> : null}
    </div>
  );
}
