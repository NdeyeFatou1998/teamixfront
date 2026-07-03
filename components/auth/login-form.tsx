"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { TeamixLogo } from "@/components/brand/teamix-logo";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { apiFetch } from "@/lib/api";
import type { LoginResponse } from "@/lib/types";
import { useAuthStore } from "@/store/auth-store";

const schema = z.object({
  email: z.string().email("Email invalide"),
  password: z.string().min(8, "Minimum 8 caractères"),
});

type FormData = z.infer<typeof schema>;

export function LoginForm() {
  const router = useRouter();
  const setSession = useAuthStore((s) => s.setSession);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  async function onSubmit(data: FormData) {
    setError(null);
    try {
      const result = await apiFetch<LoginResponse>("/auth/login", {
        method: "POST",
        body: JSON.stringify(data),
      });

      setSession({
        accessToken: result.accessToken,
        user: result.user,
        memberships: result.memberships,
      });

      if (result.user.isPlatformSuperAdmin && result.memberships.length === 0) {
        router.push("/platform/dashboard");
        return;
      }

      if (result.memberships.length === 1) {
        const org = result.memberships[0];
        const selected = await apiFetch<{
          accessToken: string;
          organizationId: string;
          permissions: string[];
        }>("/auth/select-organization", {
          method: "POST",
          token: result.accessToken,
          body: JSON.stringify({ organizationId: org.organizationId }),
        });

        setSession({
          accessToken: selected.accessToken,
          user: result.user,
          memberships: result.memberships,
          organizationId: selected.organizationId,
          permissions: selected.permissions,
        });
        router.push("/app/dashboard");
        return;
      }

      if (result.memberships.length > 1) {
        router.push("/select-organization");
        return;
      }

      if (result.user.isPlatformSuperAdmin) {
        router.push("/platform/dashboard");
        return;
      }

      setError("Aucune organisation associée à ce compte. Contactez votre administrateur.");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Connexion impossible");
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-4">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-900/20 via-transparent to-transparent" />
      <Card className="relative w-full max-w-md">
        <div className="mb-6 flex flex-col items-center gap-3">
          <TeamixLogo variant="with-name" width={180} height={56} priority className="rounded-xl" />
          <div className="text-center">
            <CardTitle>Connexion Teamix</CardTitle>
            <CardDescription className="mt-1">
              Plateforme entreprise sécurisée
            </CardDescription>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="mb-1.5 block text-sm text-slate-300">Email</label>
            <Input type="email" placeholder="vous@entreprise.com" {...register("email")} />
            {errors.email && (
              <p className="mt-1 text-xs text-red-400">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label className="mb-1.5 block text-sm text-slate-300">Mot de passe</label>
            <Input type="password" placeholder="••••••••" {...register("password")} />
            {errors.password && (
              <p className="mt-1 text-xs text-red-400">{errors.password.message}</p>
            )}
          </div>

          {error && (
            <div className="rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-300">
              {error}
            </div>
          )}

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Connexion...
              </>
            ) : (
              "Se connecter"
            )}
          </Button>
        </form>
      </Card>
    </div>
  );
}
