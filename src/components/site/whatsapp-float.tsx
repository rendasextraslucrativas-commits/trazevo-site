import { MessageCircle } from "lucide-react";

import { trackEvent } from "./analytics-tracker";
import { waLink } from "./contact-section";

export function WhatsappFloat() {
  return (
    <a
      href={waLink(
        "Olá! Visitei o site e gostaria de saber mais sobre a criação de um projeto.",
      )}
      target="_blank"
      rel="noreferrer"
      aria-label="Conversar pelo WhatsApp"
      title="Conversar pelo WhatsApp"
      onClick={() => trackEvent("whatsapp", "botao_flutuante")}
      className="fixed bottom-5 right-5 z-40 grid h-14 w-14 place-items-center rounded-full bg-primary text-primary-foreground shadow-lg transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 sm:h-16 sm:w-16"
    >
      <MessageCircle className="h-6 w-6 sm:h-7 sm:w-7" aria-hidden />
      <span className="sr-only">Chamar no WhatsApp</span>
    </a>
  );
}
