import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

const integrationsSchema = z.object({
  webhook_url: z.string().trim().url("Informe uma URL válida").max(500).nullable().or(z.literal("")),
  webhook_secret: z.string().trim().max(200).nullable().or(z.literal("")),
  whatsapp_notify_number: z.string().trim().max(30).nullable().or(z.literal("")),
  notify_email: z.string().trim().max(200).nullable().or(z.literal("")),
  notify_on_lead: z.boolean(),
  notify_on_project: z.boolean(),
  webhook_enabled: z.boolean(),
});

export const getIntegrationsData = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { getIntegrationsRow } = await import("./automations.server");
    const config = await getIntegrationsRow();
    const [deliveries, notifications] = await Promise.all([
      context.supabase
        .from("webhook_deliveries")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(30),
      context.supabase
        .from("notifications")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(30),
    ]);
    return {
      config,
      deliveries: deliveries.data ?? [],
      notifications: notifications.data ?? [],
    };
  });

export const saveIntegrations = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: unknown) => integrationsSchema.parse(data))
  .handler(async ({ context, data }) => {
    const { getIntegrationsRow } = await import("./automations.server");
    const current = await getIntegrationsRow();
    const { error } = await context.supabase
      .from("integrations")
      .update({
        webhook_url: data.webhook_url || null,
        webhook_secret: data.webhook_secret || null,
        whatsapp_notify_number: data.whatsapp_notify_number || null,
        notify_email: data.notify_email || null,
        notify_on_lead: data.notify_on_lead,
        notify_on_project: data.notify_on_project,
        webhook_enabled: data.webhook_enabled,
      })
      .eq("id", current.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const sendTestWebhook = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async () => {
    const { dispatchWebhook } = await import("./automations.server");
    return dispatchWebhook("test", { message: "Disparo de teste do painel" });
  });

export const markNotificationsRead = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: unknown) => z.object({ id: z.string().uuid().nullable() }).parse(data))
  .handler(async ({ context, data }) => {
    let query = context.supabase.from("notifications").update({ read_at: new Date().toISOString() });
    query = data.id ? query.eq("id", data.id) : query.is("read_at", null);
    const { error } = await query;
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const rotateInboundKey = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { getIntegrationsRow } = await import("./automations.server");
    const current = await getIntegrationsRow();
    const key = crypto.randomUUID().replace(/-/g, "") + crypto.randomUUID().replace(/-/g, "");
    const { error } = await context.supabase
      .from("integrations")
      .update({ inbound_key: key })
      .eq("id", current.id);
    if (error) throw new Error(error.message);
    return { inbound_key: key };
  });
