import { supabaseAdmin } from "@/integrations/supabase/client.server";

type AutomationEvent = "lead.created" | "project.updated" | "test";

export async function getIntegrationsRow() {
  const { data } = await supabaseAdmin
    .from("integrations")
    .select("*")
    .order("created_at")
    .limit(1)
    .maybeSingle();
  if (data) return data;
  const { data: created } = await supabaseAdmin
    .from("integrations")
    .insert({ webhook_enabled: false })
    .select("*")
    .single();
  return created!;
}

export async function createNotification(input: {
  title: string;
  body?: string | null;
  type?: string;
  link?: string | null;
}) {
  await supabaseAdmin.from("notifications").insert({
    title: input.title,
    body: input.body ?? null,
    type: input.type ?? "info",
    link: input.link ?? null,
  });
}

export async function dispatchWebhook(event: AutomationEvent, payload: Record<string, unknown>) {
  const config = await getIntegrationsRow();
  if (!config?.webhook_enabled || !config.webhook_url) return { skipped: true };

  const body = JSON.stringify({ event, sent_at: new Date().toISOString(), data: payload });
  let status = "ok";
  let statusCode: number | null = null;
  let responseBody: string | null = null;

  try {
    const res = await fetch(config.webhook_url, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-webhook-event": event,
        ...(config.webhook_secret ? { "x-webhook-secret": config.webhook_secret } : {}),
      },
      body,
    });
    statusCode = res.status;
    responseBody = (await res.text()).slice(0, 500);
    if (!res.ok) status = "erro";
  } catch (error) {
    status = "erro";
    responseBody = error instanceof Error ? error.message.slice(0, 500) : "falha desconhecida";
  }

  await supabaseAdmin.from("webhook_deliveries").insert({
    event_type: event,
    target_url: config.webhook_url,
    status,
    status_code: statusCode,
    response_body: responseBody,
    payload: payload as never,
  });

  return { skipped: false, status, statusCode, responseBody };
}

export async function onLeadCreated(lead: {
  id?: string | null;
  name: string;
  email?: string | null;
  whatsapp?: string | null;
  service?: string | null;
  source?: string | null;
}) {
  try {
    const config = await getIntegrationsRow();
    if (config?.notify_on_lead) {
      await createNotification({
        title: `Novo orçamento: ${lead.name}`,
        body: [lead.service, lead.whatsapp, lead.email].filter(Boolean).join(" · ") || null,
        type: "lead",
        link: "/painel/leads",
      });
    }
    await dispatchWebhook("lead.created", lead as Record<string, unknown>);
  } catch {
    // automações nunca devem quebrar o envio do formulário
  }
}
