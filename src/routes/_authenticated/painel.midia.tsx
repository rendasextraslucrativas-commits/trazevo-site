import { useRef, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { Copy, Trash2, Upload } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { deleteMedia } from "@/lib/admin.functions";
import { mediaQuery } from "@/lib/admin.queries";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/_authenticated/painel/midia")({
  component: MidiaPage,
});

const MAX_SIZE = 5 * 1024 * 1024;

function slugifyFile(name: string) {
  const dot = name.lastIndexOf(".");
  const base = (dot > 0 ? name.slice(0, dot) : name)
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 60);
  const ext = dot > 0 ? name.slice(dot).toLowerCase() : "";
  return `${Date.now()}-${base || "arquivo"}${ext}`;
}

function MidiaPage() {
  const { data: files } = useSuspenseQuery(mediaQuery);
  const queryClient = useQueryClient();
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const removeFile = useServerFn(deleteMedia);

  const invalidate = () => {
    queryClient.invalidateQueries({ queryKey: ["admin", "media"] });
    queryClient.invalidateQueries({ queryKey: ["site-content"] });
  };

  const remove = useMutation({
    mutationFn: (name: string) => removeFile({ data: { name } }),
    onSuccess: () => {
      toast.success("Arquivo excluído.");
      invalidate();
    },
    onError: () => toast.error("Não foi possível excluir o arquivo."),
  });

  async function upload(fileList: FileList | null) {
    const file = fileList?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast.error("Envie apenas imagens (JPG, PNG, WEBP ou SVG).");
      return;
    }
    if (file.size > MAX_SIZE) {
      toast.error("O arquivo deve ter no máximo 5 MB.");
      return;
    }
    setUploading(true);
    const { error } = await supabase.storage
      .from("midia")
      .upload(slugifyFile(file.name), file, { cacheControl: "3600", upsert: false });
    setUploading(false);
    if (inputRef.current) inputRef.current.value = "";
    if (error) {
      toast.error("Não foi possível enviar o arquivo.");
      return;
    }
    toast.success("Arquivo enviado.");
    invalidate();
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-brand">Biblioteca de mídia</h1>
        <p className="text-sm text-muted-foreground">
          Envie imagens e copie a referência para usar em capas de cases, artigos e depoimentos.
        </p>
      </div>

      <Card>
        <CardContent className="flex flex-wrap items-center gap-3 p-5">
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => void upload(e.target.files)}
          />
          <Button onClick={() => inputRef.current?.click()} disabled={uploading}>
            <Upload className="mr-2 h-4 w-4" aria-hidden />
            {uploading ? "Enviando..." : "Enviar imagem"}
          </Button>
          <span className="text-xs text-muted-foreground">JPG, PNG, WEBP ou SVG até 5 MB.</span>
        </CardContent>
      </Card>

      {files.length === 0 ? (
        <p className="text-sm text-muted-foreground">Nenhum arquivo enviado ainda.</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {files.map((file) => (
            <Card key={file.name}>
              <CardContent className="space-y-3 p-4">
                <div className="aspect-video overflow-hidden rounded-md bg-surface">
                  {file.url ? (
                    <img
                      src={file.url}
                      alt={file.name}
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                  ) : null}
                </div>
                <p className="truncate text-xs text-muted-foreground" title={file.name}>
                  {file.name}
                </p>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1"
                    onClick={() => {
                      void navigator.clipboard.writeText(file.ref);
                      toast.success("Referência copiada.");
                    }}
                  >
                    <Copy className="mr-2 h-3.5 w-3.5" aria-hidden />
                    Copiar
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    aria-label={`Excluir ${file.name}`}
                    onClick={() => remove.mutate(file.name)}
                  >
                    <Trash2 className="h-3.5 w-3.5 text-destructive" aria-hidden />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
