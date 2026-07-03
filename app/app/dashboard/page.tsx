"use client";

import { useQuery } from "@tanstack/react-query";
import { Building2, Shield, Users } from "lucide-react";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { apiFetch } from "@/lib/api";
import { useAuthStore } from "@/store/auth-store";

type CurrentOrg = {
  id: string;
  name: string;
  slug: string;
  status: string;
};

export default function AppDashboardPage() {
  const { accessToken, user, organizationId, permissions } = useAuthStore();

  const { data: org } = useQuery({
    queryKey: ["current-org", organizationId],
    queryFn: () =>
      apiFetch<CurrentOrg>("/organizations/current", { token: accessToken! }),
    enabled: !!accessToken && !!organizationId,
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Tableau de bord</h1>
        <p className="text-slate-400">
          Bienvenue{user?.email ? `, ${user.email.split("@")[0]}` : ""}
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Card>
          <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-sky-400/10">
            <Building2 className="h-5 w-5 text-sky-400" />
          </div>
          <CardTitle>{org?.name ?? "—"}</CardTitle>
          <CardDescription>Organisation active</CardDescription>
        </Card>

        <Card>
          <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-400/10">
            <Shield className="h-5 w-5 text-indigo-400" />
          </div>
          <CardTitle>{permissions.length}</CardTitle>
          <CardDescription>Permissions actives</CardDescription>
        </Card>

        <Card>
          <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-400/10">
            <Users className="h-5 w-5 text-emerald-400" />
          </div>
          <CardTitle>Phase 1</CardTitle>
          <CardDescription>Modules à venir : projets, congés, coffre-fort</CardDescription>
        </Card>
      </div>

      <Card>
        <CardTitle className="mb-2">Prochaines étapes</CardTitle>
        <ul className="list-inside list-disc space-y-1 text-sm text-slate-400">
          <li>Gestion des départements et employés</li>
          <li>Projets et reporting</li>
          <li>Demandes de congés</li>
        </ul>
      </Card>
    </div>
  );
}
