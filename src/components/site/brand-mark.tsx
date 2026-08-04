/**
 * TEMPORÁRIO: símbolo neutro (janela de navegador + cursor) usado enquanto
 * o nome e o logotipo definitivos da empresa não estiverem definidos.
 * Não contém letras nem iniciais.
 */
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
        isDark ? "border border-white/15 bg-white/10" : "bg-brand-soft"
      } ${className}`}
    >
      <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
        <rect
          x="2.5"
          y="4"
          width="19"
          height="16"
          rx="3.5"
          stroke="currentColor"
          strokeWidth="1.7"
          className="text-primary"
        />
        <path d="M2.5 8.5h19" stroke="currentColor" strokeWidth="1.7" className="text-primary" />
        <circle cx="6" cy="6.25" r="0.9" fill="currentColor" className="text-primary" />
        <path
          d="M9 12.5l2.6 5.6 1-2.2 2.2-1L9 12.5z"
          fill="currentColor"
          className="text-primary"
        />
      </svg>
    </span>
  );
}
