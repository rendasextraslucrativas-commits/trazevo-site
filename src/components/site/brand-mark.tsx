/**
 * Identidade TRAZEVO.
 * Símbolo próprio: três colunas ascendentes (crescimento / construção digital)
 * unidas por uma barra superior que forma a letra T de forma geométrica.
 */

export function BrandSymbol({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      {/* barra superior (topo do T / estrutura) */}
      <rect x="3" y="3.5" width="18" height="3.4" rx="1.2" fill="currentColor" />
      {/* colunas ascendentes */}
      <rect x="3" y="14.6" width="3.4" height="6" rx="1.2" fill="currentColor" opacity="0.55" />
      <rect x="8.65" y="11.4" width="3.4" height="9.2" rx="1.2" fill="currentColor" opacity="0.78" />
      {/* haste central do T, mais alta (evolução) */}
      <rect x="14.3" y="8.4" width="3.4" height="12.2" rx="1.2" fill="currentColor" />
    </svg>
  );
}

export function BrandMark({
  className = "h-9 w-9",
  tone = "light",
}: {
  className?: string;
  tone?: "light" | "dark";
}) {
  const isDark = tone === "dark";
  return (
    <span
      aria-hidden
      className={`grid shrink-0 place-items-center rounded-xl ${
        isDark
          ? "border border-white/15 bg-white/10 text-accent"
          : "bg-brand-soft text-primary"
      } ${className}`}
    >
      <BrandSymbol className="h-[58%] w-[58%]" />
    </span>
  );
}

/** Logo horizontal: símbolo + wordmark TRAZEVO. */
export function BrandLogo({
  tone = "light",
  className = "",
  size = "md",
}: {
  tone?: "light" | "dark";
  className?: string;
  size?: "sm" | "md";
}) {
  const isDark = tone === "dark";
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <BrandMark className={size === "sm" ? "h-8 w-8" : "h-9 w-9"} tone={tone} />
      <span className="leading-none">
        <span
          className={`block font-extrabold uppercase tracking-[0.18em] ${
            size === "sm" ? "text-sm" : "text-base"
          } ${isDark ? "text-ink-foreground" : "text-brand"}`}
        >
          Trazevo
        </span>
      </span>
    </span>
  );
}
