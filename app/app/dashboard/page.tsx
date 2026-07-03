"use client";

import Link from "next/link";
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
        <h1 className="text-2xl font-bold text-gray-900">Tableau de bord</h1>
        <p className="text-gray-600">
          Bienvenue{user?.email ? `, ${user.email.split("@")[0]}` : ""}
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Card>
          <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-teamix-teal-light">
            <Building2 className="h-5 w-5 text-teamix-teal" />
          </div>
          <CardTitle>{org?.name ?? "—"}</CardTitle>
          <CardDescription>Organisation active</CardDescription>
        </Card>

        <Card>
          <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-teamix-blue-light">
            <Shield className="h-5 w-5 text-teamix-blue" />
          </div>
          <CardTitle>{permissions.length}</CardTitle>
          <CardDescription>Permissions actives</CardDescription>
        </Card>

        <Card>
          <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-teamix-orange-light">
            <Users className="h-5 w-5 text-teamix-orange" />
          </div>
          <CardTitle>Phase 2</CardTitle>
          <CardDescription>Départements et employés disponibles</CardDescription>
        </Card>
      </div>

      <Card>
        <CardTitle className="mb-2">Accès rapide</CardTitle>
        <ul className="list-inside list-disc space-y-1 text-sm text-gray-600">
          <li>
            <Link href="/app/departments" className="text-teamix-teal hover:underline">
              Gérer les départements
            </Link>
          </li>
          <li>
            <Link href="/app/employees" className="text-teamix-blue hover:underline">
              Gérer les employés
            </Link>
          </li>
          <li>Projets et reporting (bientôt)</li>
          <li>Demandes de congés (bientôt)</li>
        </ul>
      </Card>
    </div>
  );
}
