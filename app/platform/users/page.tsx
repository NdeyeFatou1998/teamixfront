"use client";

import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { apiFetch } from "@/lib/api";
import type { Organization } from "@/lib/types";
import { useAuthStore } from "@/store/auth-store";

export default function PlatformUsersPage() {
  const accessToken = useAuthStore((s) => s.accessToken);
  const queryClient = useQueryClient();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [organizationId, setOrganizationId] = useState("");
  const [roleName, setRoleName] = useState("Org Admin");
  const [message, setMessage] = useState<string | null>(null);

  const { data: orgs } = useQuery({
    queryKey: ["platform-orgs"],
    queryFn: () => apiFetch<Organization[]>("/platform/organizations", { token: accessToken! }),
    enabled: !!accessToken,
  });

  const mutation = useMutation({
    mutationFn: () =>
      apiFetch("/platform/users", {
        method: "POST",
        token: accessToken!,
        body: JSON.stringify({ email, password, organizationId, roleName }),
      }),
    onSuccess: () => {
      setMessage("Utilisateur créé avec succès");
      setEmail("");
      setPassword("");
      queryClient.invalidateQueries({ queryKey: ["platform-stats"] });
    },
    onError: (err: Error) => setMessage(err.message),
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Utilisateurs</h1>
        <p className="text-slate-400">Inviter un utilisateur dans une organisation</p>
      </div>

      <Card className="max-w-lg">
        <CardTitle className="mb-4">Nouvel utilisateur</CardTitle>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setMessage(null);
            mutation.mutate();
          }}
          className="space-y-4"
        >
          <div>
            <label className="mb-1 block text-sm text-slate-300">Organisation</label>
            <select
              value={organizationId}
              onChange={(e) => setOrganizationId(e.target.value)}
              required
              className="flex h-10 w-full rounded-lg border border-slate-700 bg-slate-900/80 px-3 text-sm text-slate-100 outline-none focus:border-sky-400"
            >
              <option value="">Sélectionner...</option>
              {orgs?.map((org) => (
                <option key={org.id} value={org.id}>
                  {org.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-1 block text-sm text-slate-300">Rôle</label>
            <Input value={roleName} onChange={(e) => setRoleName(e.target.value)} required />
          </div>
          <div>
            <label className="mb-1 block text-sm text-slate-300">Email</label>
            <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div>
            <label className="mb-1 block text-sm text-slate-300">Mot de passe</label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={8}
            />
          </div>
          {message && (
            <CardDescription className={mutation.isError ? "text-red-400" : "text-emerald-400"}>
              {message}
            </CardDescription>
          )}
          <Button type="submit" disabled={mutation.isPending || !organizationId}>
            {mutation.isPending ? "Création..." : "Créer l'utilisateur"}
          </Button>
        </form>
      </Card>
    </div>
  );
}
