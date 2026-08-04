import { trackEvent } from "./analytics-tracker";
import { waLink } from "./contact-section";
import { WhatsAppIcon } from "./whatsapp-icon";

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
      className="fixed bottom-5 right-5 z-40 grid h-14 w-14 place-items-center rounded-full bg-whatsapp text-whatsapp-foreground shadow-lg transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 sm:h-16 sm:w-16"
    >
      <WhatsAppIcon className="h-7 w-7 sm:h-8 sm:w-8" />
      <span className="sr-only">Chamar no WhatsApp</span>
    </a>
  );
}
