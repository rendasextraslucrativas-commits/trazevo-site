import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

const inboundLeadSchema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(200).optional().nullable(),
  whatsapp: z.string().trim().min(8).max(30).optional().nullable(),
  company: z.string().trim().max(120).optional().nullable(),
  city: z.string().trim().max(120).optional().nullable(),
  niche: z.string().trim().max(120).optional().nullable(),
  service: z.string().trim().max(120).optional().nullable(),
  notes: z.string().trim().max(2000).optional().nullable(),
  source: z.string().trim().max(60).optional().nullable(),
});

export const Route = createFileRoute("/api/public/leads")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const key = request.headers.get("x-api-key");
        const { getIntegrationsRow, onLeadCreated } = await import("@/lib/automations.server");
        const config = await getIntegrationsRow();
        if (!key || !config?.inbound_key || key !== config.inbound_key) {
          return new Response(JSON.stringify({ error: "unauthorized" }), {
            status: 401,
            headers: { "content-type": "application/json" },
          });
        }

        let payload: unknown;
        try {
          payload = await request.json();
        } catch {
          return new Response(JSON.stringify({ error: "invalid json" }), {
            status: 400,
            headers: { "content-type": "application/json" },
          });
        }

        const parsed = inboundLeadSchema.safeParse(payload);
        if (!parsed.success) {
          return new Response(JSON.stringify({ error: "invalid payload" }), {
            status: 422,
            headers: { "content-type": "application/json" },
          });
        }

        const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
        const { data, error } = await supabaseAdmin
          .from("leads")
          .insert({
            name: parsed.data.name,
            email: parsed.data.email || null,
            whatsapp: parsed.data.whatsapp || null,
            company: parsed.data.company || null,
            city: parsed.data.city || null,
            niche: parsed.data.niche || null,
            service: parsed.data.service || null,
            notes: parsed.data.notes || null,
            consent: true,
            source: parsed.data.source || "api",
            is_demo: false,
          })
          .select("id")
          .single();

        if (error) {
          return new Response(JSON.stringify({ error: "could not create lead" }), {
            status: 500,
            headers: { "content-type": "application/json" },
          });
        }

        await onLeadCreated({ id: data.id, ...parsed.data, name: parsed.data.name });

        return new Response(JSON.stringify({ ok: true, id: data.id }), {
          status: 201,
          headers: { "content-type": "application/json" },
        });
      },
    },
  },
});
