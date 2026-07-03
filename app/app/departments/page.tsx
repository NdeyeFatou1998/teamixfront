"use client";

import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { FolderTree, Plus } from "lucide-react";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { apiFetch } from "@/lib/api";
import type { Department } from "@/lib/types";
import { useAuthStore } from "@/store/auth-store";

export default function DepartmentsPage() {
  const accessToken = useAuthStore((s) => s.accessToken);
  const permissions = useAuthStore((s) => s.permissions);
  const queryClient = useQueryClient();
  const canCreate = permissions.includes("departments:create");

  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState<string | null>(null);

  const { data: departments, isLoading } = useQuery({
    queryKey: ["departments"],
    queryFn: () => apiFetch<Department[]>("/departments", { token: accessToken! }),
    enabled: !!accessToken,
  });

  const mutation = useMutation({
    mutationFn: () =>
      apiFetch<Department>("/departments", {
        method: "POST",
        token: accessToken!,
        body: JSON.stringify({ name, description: description || undefined }),
      }),
    onSuccess: () => {
      setName("");
      setDescription("");
      setShowForm(false);
      setError(null);
      queryClient.invalidateQueries({ queryKey: ["departments"] });
    },
    onError: (err: Error) => setError(err.message),
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Départements</h1>
          <p className="text-slate-400">Structurez votre organisation par équipes</p>
        </div>
        {canCreate && (
          <Button onClick={() => setShowForm(!showForm)}>
            <Plus className="mr-2 h-4 w-4" />
            Nouveau
          </Button>
        )}
      </div>

      {showForm && canCreate && (
        <Card>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              mutation.mutate();
            }}
            className="space-y-4"
          >
            <div>
              <label className="mb-1 block text-sm text-slate-300">Nom</label>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ressources Humaines"
                required
              />
            </div>
            <div>
              <label className="mb-1 block text-sm text-slate-300">Description</label>
              <Input
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Optionnel"
              />
            </div>
            {error && <p className="text-sm text-red-400">{error}</p>}
            <div className="flex gap-2">
              <Button type="submit" disabled={mutation.isPending}>
                {mutation.isPending ? "Création..." : "Créer"}
              </Button>
              <Button type="button" variant="ghost" onClick={() => setShowForm(false)}>
                Annuler
              </Button>
            </div>
          </form>
        </Card>
      )}

      <div className="grid gap-3">
        {isLoading && <p className="text-slate-400">Chargement...</p>}
        {departments?.map((dept) => (
          <Card key={dept.id} className="flex items-start gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-indigo-400/10">
              <FolderTree className="h-5 w-5 text-indigo-400" />
            </div>
            <div>
              <CardTitle className="text-base">{dept.name}</CardTitle>
              <CardDescription>
                {dept.description || "Aucune description"}
                {dept.parentDepartment ? ` · Sous ${dept.parentDepartment.name}` : ""}
              </CardDescription>
            </div>
          </Card>
        ))}
        {!isLoading && departments?.length === 0 && (
          <Card className="text-center">
            <CardDescription>Aucun département pour le moment</CardDescription>
          </Card>
        )}
      </div>
    </div>
  );
}
