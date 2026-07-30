export function DeviceMockup() {
  return (
    <div className="relative mx-auto w-full max-w-xl" aria-hidden>
      {/* Notebook */}
      <div className="rounded-2xl border border-border bg-card p-3 shadow-[var(--shadow-card)]">
        <div className="flex items-center gap-1.5 pb-3">
          <span className="h-2.5 w-2.5 rounded-full bg-border" />
          <span className="h-2.5 w-2.5 rounded-full bg-border" />
          <span className="h-2.5 w-2.5 rounded-full bg-border" />
        </div>
        <div className="overflow-hidden rounded-xl bg-surface">
          <div className="h-24 bg-brand/90 p-4">
            <div className="h-2.5 w-24 rounded bg-brand-foreground/70" />
            <div className="mt-3 h-2 w-40 rounded bg-brand-foreground/40" />
            <div className="mt-4 h-6 w-28 rounded-md bg-primary" />
          </div>
          <div className="grid grid-cols-3 gap-3 p-4">
            {[0, 1, 2].map((i) => (
              <div key={i} className="rounded-lg border border-border bg-card p-3">
                <div className="h-5 w-5 rounded bg-primary/20" />
                <div className="mt-2 h-2 w-full rounded bg-muted" />
                <div className="mt-1.5 h-2 w-2/3 rounded bg-muted" />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="mx-auto h-2 w-2/3 rounded-b-xl bg-border" />

      {/* Celular */}
      <div className="absolute -bottom-6 -right-2 w-28 rounded-2xl border border-border bg-card p-1.5 shadow-[var(--shadow-card)] sm:-right-6 sm:w-32">
        <div className="overflow-hidden rounded-xl bg-surface">
          <div className="h-14 bg-brand/90 p-2">
            <div className="h-1.5 w-12 rounded bg-brand-foreground/70" />
            <div className="mt-2 h-1.5 w-16 rounded bg-brand-foreground/40" />
          </div>
          <div className="space-y-2 p-2">
            <div className="h-8 rounded-md border border-border bg-card" />
            <div className="h-8 rounded-md border border-border bg-card" />
            <div className="h-6 rounded-md bg-primary" />
          </div>
        </div>
      </div>
    </div>
  );
}
