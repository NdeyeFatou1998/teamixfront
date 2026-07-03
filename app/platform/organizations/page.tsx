"use client";

import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { apiFetch } from "@/lib/api";
import type { Organization } from "@/lib/types";
import { useAuthStore } from "@/store/auth-store";

export default function PlatformOrganizationsPage() {
  const accessToken = useAuthStore((s) => s.accessToken);
  const queryClient = useQueryClient();
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const { data: orgs, isLoading } = useQuery({
    queryKey: ["platform-orgs"],
    queryFn: () => apiFetch<Organization[]>("/platform/organizations", { token: accessToken! }),
    enabled: !!accessToken,
  });

  async function createOrg(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      await apiFetch("/platform/organizations", {
        method: "POST",
        token: accessToken!,
        body: JSON.stringify({ name, slug: slug || undefined }),
      });
      setName("");
      setSlug("");
      setShowForm(false);
      await queryClient.invalidateQueries({ queryKey: ["platform-orgs"] });
      await queryClient.invalidateQueries({ queryKey: ["platform-stats"] });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Organisations</h1>
          <p className="text-slate-400">Gérer les clients entreprise</p>
        </div>
        <Button onClick={() => setShowForm(!showForm)}>
          <Plus className="mr-2 h-4 w-4" />
          Nouvelle
        </Button>
      </div>

      {showForm && (
        <Card>
          <form onSubmit={createOrg} className="space-y-4">
            <div>
              <label className="mb-1 block text-sm text-slate-300">Nom</label>
              <Input
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (!slug) {
                    setSlug(
                      e.target.value
                        .toLowerCase()
                        .replace(/[^a-z0-9]+/g, "-")
                        .replace(/^-|-$/g, ""),
                    );
                  }
                }}
                placeholder="Acme Corp"
                required
              />
            </div>
            <div>
              <label className="mb-1 block text-sm text-slate-300">Slug</label>
              <Input
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                placeholder="acme-corp"
              />
            </div>
            {error && <p className="text-sm text-red-400">{error}</p>}
            <div className="flex gap-2">
              <Button type="submit" disabled={submitting}>
                {submitting ? "Création..." : "Créer"}
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
        {orgs?.map((org) => (
          <Card key={org.id} className="flex items-center justify-between">
            <div>
              <CardTitle className="text-base">{org.name}</CardTitle>
              <CardDescription>
                {org.slug} · {org.status} · {org._count?.members ?? 0} membre(s)
              </CardDescription>
            </div>
          </Card>
        ))}
        {!isLoading && orgs?.length === 0 && (
          <p className="text-center text-slate-500">Aucune organisation</p>
        )}
      </div>
    </div>
  );
}
