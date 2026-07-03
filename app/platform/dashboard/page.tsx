"use client";

import { useQuery } from "@tanstack/react-query";
import { Building2, Users, UserCheck } from "lucide-react";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { apiFetch } from "@/lib/api";
import type { PlatformStats } from "@/lib/types";
import { useAuthStore } from "@/store/auth-store";

export default function PlatformDashboardPage() {
  const accessToken = useAuthStore((s) => s.accessToken);

  const { data: stats, isLoading } = useQuery({
    queryKey: ["platform-stats"],
    queryFn: () => apiFetch<PlatformStats>("/platform/stats", { token: accessToken! }),
    enabled: !!accessToken,
  });

  const cards = [
    {
      label: "Organisations",
      value: stats?.organizations ?? 0,
      icon: Building2,
      color: "text-sky-400",
      bg: "bg-sky-400/10",
    },
    {
      label: "Utilisateurs",
      value: stats?.users ?? 0,
      icon: Users,
      color: "text-indigo-400",
      bg: "bg-indigo-400/10",
    },
    {
      label: "Membres actifs",
      value: stats?.members ?? 0,
      icon: UserCheck,
      color: "text-emerald-400",
      bg: "bg-emerald-400/10",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Back-office Platform</h1>
        <p className="text-slate-400">Vue d&apos;ensemble de la plateforme Teamix</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {cards.map(({ label, value, icon: Icon, color, bg }) => (
          <Card key={label}>
            <div className={`mb-3 flex h-10 w-10 items-center justify-center rounded-lg ${bg}`}>
              <Icon className={`h-5 w-5 ${color}`} />
            </div>
            <CardTitle>{isLoading ? "…" : value}</CardTitle>
            <CardDescription>{label}</CardDescription>
          </Card>
        ))}
      </div>
    </div>
  );
}
