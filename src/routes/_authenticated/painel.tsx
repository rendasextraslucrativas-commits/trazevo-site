import { createFileRoute, Link, Outlet, useNavigate, useRouterState } from "@tanstack/react-router";
import { useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import {
  BarChart3,
  FileText,
  Image as ImageIcon,
  LayoutDashboard,
  Plug,
  LogOut,
  FolderKanban,
  Newspaper,
  Palette,
  Sparkles,
  Users,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { meQuery } from "@/lib/admin.queries";
import { supabase } from "@/integrations/supabase/client";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_authenticated/painel")({
  component: PainelLayout,
});

const nav = [
  { to: "/painel", label: "Visão geral", icon: LayoutDashboard },
  { to: "/painel/conteudo", label: "Conteúdo", icon: FileText },
  { to: "/painel/vitrine", label: "Vitrine", icon: Sparkles },
  { to: "/painel/modelos", label: "Modelos", icon: Palette },
  { to: "/painel/blog", label: "Blog", icon: Newspaper },
  { to: "/painel/midia", label: "Mídia", icon: ImageIcon },
  { to: "/painel/leads", label: "Orçamentos", icon: Users },
  { to: "/painel/projetos", label: "Projetos", icon: FolderKanban },
  { to: "/painel/analytics", label: "Analytics", icon: BarChart3 },
  { to: "/painel/integracoes", label: "Integrações", icon: Plug },
] as const;

function PainelLayout() {
  const { data: me } = useSuspenseQuery(meQuery);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  async function signOut() {
    await queryClient.cancelQueries();
    queryClient.clear();
    await supabase.auth.signOut();
    navigate({ to: "/auth", replace: true });
  }

  return (
    <div className="flex min-h-screen bg-surface font-sans">
      <aside className="hidden w-60 shrink-0 flex-col border-r border-border bg-card p-4 md:flex">
        <Link to="/" className="mb-6 flex items-center gap-2">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-brand text-sm font-bold text-brand-foreground">
            A
          </span>
          <span className="text-sm font-semibold text-foreground">Painel</span>
        </Link>
        <nav className="flex flex-col gap-1">
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={cn(
                "flex items-center gap-2 rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground",
                pathname === item.to && "bg-accent font-medium text-accent-foreground",
              )}
            >
              <item.icon className="h-4 w-4" aria-hidden />
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="mt-auto space-y-2 pt-6 text-xs text-muted-foreground">
          <p className="truncate">{me.email}</p>
          <p className="uppercase tracking-wide">{me.roles.join(", ") || "sem papel definido"}</p>
          <Button variant="outline" size="sm" className="w-full" onClick={signOut}>
            <LogOut className="mr-2 h-3.5 w-3.5" aria-hidden />
            Sair
          </Button>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex items-center gap-3 border-b border-border bg-card px-4 py-3 md:hidden">
          <BarChart3 className="h-4 w-4 text-primary" aria-hidden />
          <span className="text-sm font-semibold">Painel</span>
          <div className="ml-auto flex gap-2">
            {nav.map((item) => (
              <Link key={item.to} to={item.to} className="text-xs text-muted-foreground">
                {item.label}
              </Link>
            ))}
          </div>
        </header>
        <main className="flex-1 p-4 sm:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
