"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Building2, Loader2 } from "lucide-react";
import { TeamixLogo } from "@/components/brand/teamix-logo";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { apiFetch } from "@/lib/api";
import { useAuthStore } from "@/store/auth-store";

export default function SelectOrganizationPage() {
  const router = useRouter();
  const { accessToken, user, memberships, setSession } = useAuthStore();
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!accessToken || !user) {
      router.replace("/login");
    } else {
      setReady(true);
    }
  }, [accessToken, user, router]);

  if (!ready || !accessToken || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950">
        <Loader2 className="h-8 w-8 animate-spin text-sky-400" />
      </div>
    );
  }

  async function selectOrg(organizationId: string) {
    setLoadingId(organizationId);
    setError(null);
    try {
      const result = await apiFetch<{
        accessToken: string;
        organizationId: string;
        permissions: string[];
      }>("/auth/select-organization", {
        method: "POST",
        token: accessToken!,
        body: JSON.stringify({ organizationId }),
      });

      setSession({
        accessToken: result.accessToken,
        user: user!,
        memberships,
        organizationId: result.organizationId,
        permissions: result.permissions,
      });

      router.push("/app/dashboard");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Sélection impossible");
    } finally {
      setLoadingId(null);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 p-4">
      <div className="w-full max-w-lg space-y-6">
        <div className="flex flex-col items-center gap-3">
          <TeamixLogo variant="icon" width={56} height={56} className="rounded-xl" />
          <div className="text-center">
            <h1 className="text-xl font-semibold text-white">Choisir une organisation</h1>
            <p className="text-sm text-slate-400">Sélectionnez l&apos;entreprise à gérer</p>
          </div>
        </div>

        <div className="space-y-3">
          {memberships.map((m) => (
            <Card key={m.id} className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-sky-400/10">
                  <Building2 className="h-5 w-5 text-sky-400" />
                </div>
                <div>
                  <CardTitle className="text-base">{m.organizationName}</CardTitle>
                  <CardDescription>{m.roleName ?? "Membre"}</CardDescription>
                </div>
              </div>
              <Button onClick={() => selectOrg(m.organizationId)} disabled={loadingId !== null}>
                {loadingId === m.organizationId ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  "Accéder"
                )}
              </Button>
            </Card>
          ))}
        </div>

        {error && <p className="text-center text-sm text-red-400">{error}</p>}

        {user.isPlatformSuperAdmin && (
          <div className="text-center">
            <Button variant="ghost" onClick={() => router.push("/platform/dashboard")}>
              Accéder au back-office platform
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
