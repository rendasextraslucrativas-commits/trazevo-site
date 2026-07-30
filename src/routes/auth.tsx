import { useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable/index";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Acesso à área administrativa" },
      {
        name: "description",
        content: "Entre na área restrita para gerenciar conteúdo do site, orçamentos e projetos.",
      },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Acesso à área administrativa" },
      { property: "og:description", content: "Login da equipe da agência." },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSignIn(event: React.FormEvent) {
    event.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) {
      const message = error.message.toLowerCase();
      if (message.includes("not confirmed")) {
        toast.error("E-mail ainda não confirmado.");
      } else if (message.includes("invalid login")) {
        toast.error("E-mail ou senha inválidos. Use 'Esqueci minha senha' para redefinir.");
      } else {
        toast.error(error.message);
      }
      return;
    }
    navigate({ to: "/painel" });
  }

  async function handleReset() {
    if (!email) {
      toast.error("Informe seu e-mail para receber o link de redefinição.");
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/redefinir-senha`,
    });
    setLoading(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("Enviamos um link de redefinição para o seu e-mail.");
  }


  async function handleSignUp(event: React.FormEvent) {
    event.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: window.location.origin,
        data: { full_name: name },
      },
    });
    setLoading(false);
    if (error) {
      toast.error(error.message.includes("already") ? "E-mail já cadastrado." : "Não foi possível criar a conta.");
      return;
    }
    toast.success("Conta criada. Verifique seu e-mail para confirmar o acesso.");
  }

  async function handleGoogle() {
    const result = await lovable.auth.signInWithOAuth("google", {
      redirect_uri: window.location.origin,
    });
    if (result.error) {
      toast.error("Não foi possível entrar com o Google.");
      return;
    }
    if (result.redirected) return;
    navigate({ to: "/painel" });
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-surface px-4 py-12">
      <Card className="w-full max-w-md border-border shadow-[var(--shadow-card)]">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl text-brand">Área administrativa</CardTitle>
          <CardDescription>Acesso restrito à equipe da agência.</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="entrar">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="entrar">Entrar</TabsTrigger>
              <TabsTrigger value="criar">Criar conta</TabsTrigger>
            </TabsList>

            <TabsContent value="entrar">
              <form onSubmit={handleSignIn} className="grid gap-4 pt-4">
                <div className="grid gap-2">
                  <Label htmlFor="email">E-mail</Label>
                  <Input
                    id="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password">Senha</Label>
                  <Input
                    id="password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <Button type="submit" disabled={loading}>
                  {loading ? "Entrando..." : "Entrar"}
                </Button>
                <button
                  type="button"
                  onClick={handleReset}
                  className="text-xs text-muted-foreground underline underline-offset-4 hover:text-foreground"
                >
                  Esqueci minha senha
                </button>
              </form>
            </TabsContent>

            <TabsContent value="criar">
              <form onSubmit={handleSignUp} className="grid gap-4 pt-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Nome completo</Label>
                  <Input
                    id="name"
                    required
                    maxLength={120}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email-new">E-mail</Label>
                  <Input
                    id="email-new"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password-new">Senha</Label>
                  <Input
                    id="password-new"
                    type="password"
                    required
                    minLength={8}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <Button type="submit" disabled={loading}>
                  {loading ? "Criando..." : "Criar conta"}
                </Button>
              </form>
            </TabsContent>
          </Tabs>

          <div className="my-5 flex items-center gap-3 text-xs text-muted-foreground">
            <span className="h-px flex-1 bg-border" />
            ou
            <span className="h-px flex-1 bg-border" />
          </div>

          <Button variant="outline" className="w-full" onClick={handleGoogle}>
            Continuar com Google
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
