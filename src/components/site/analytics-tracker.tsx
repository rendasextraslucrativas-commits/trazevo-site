import { useEffect } from "react";
import { useRouterState } from "@tanstack/react-router";

import { trackConversion, trackPageView } from "@/lib/analytics.functions";

const SESSION_KEY = "lp_session_id";

function sessionId() {
  if (typeof window === "undefined") return null;
  try {
    let id = window.sessionStorage.getItem(SESSION_KEY);
    if (!id) {
      id = crypto.randomUUID();
      window.sessionStorage.setItem(SESSION_KEY, id);
    }
    return id;
  } catch {
    return null;
  }
}

function device(): "mobile" | "tablet" | "desktop" {
  const w = window.innerWidth;
  if (w < 640) return "mobile";
  if (w < 1024) return "tablet";
  return "desktop";
}

export type ConversionEvent =
  | "orcamento"
  | "whatsapp"
  | "plano"
  | "contato"
  | "modelo_view"
  | "modelo_cta"
  | "agendamento"
  | "tratamento"
  | "galeria"
  | "faq"
  | "scroll"
  | "form_erro"
  | "retorno_portfolio";

export function trackEvent(event_type: ConversionEvent, label?: string) {
  if (typeof window === "undefined") return;
  void trackConversion({
    data: {
      event_type,
      label: label ?? null,
      path: window.location.pathname,
      session_id: sessionId(),
    },
  }).catch(() => undefined);
}

export function AnalyticsTracker() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    if (pathname.startsWith("/painel") || pathname.startsWith("/auth")) return;
    const params = new URLSearchParams(window.location.search);
    void trackPageView({
      data: {
        path: pathname,
        referrer: document.referrer || null,
        utm_source: params.get("utm_source"),
        utm_medium: params.get("utm_medium"),
        utm_campaign: params.get("utm_campaign"),
        device: device(),
        session_id: sessionId(),
      },
    }).catch(() => undefined);
  }, [pathname]);

  return null;
}
