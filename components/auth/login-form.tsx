"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Link from "next/link";
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
    <div className="flex min-h-screen teamix-gradient-soft">
      <div className="hidden w-1/2 flex-col justify-between bg-white p-12 lg:flex">
        <Link href="/" className="flex items-center gap-3">
          <TeamixLogo variant="light-bg" width={48} height={48} priority />
          <span className="text-2xl font-bold tracking-wide text-gray-900">TEAMIX</span>
        </Link>
        <div>
          <h2 className="text-3xl font-bold text-gray-900">
            Bienvenue sur votre espace{" "}
            <span className="teamix-gradient-text">professionnel</span>
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Gérez vos équipes, départements et projets avec une plateforme
            colorée, claire et sécurisée.
          </p>
          <div className="mt-8 flex gap-3">
            {["#0dbfb8", "#2196f3", "#ff8c42", "#4caf50"].map((c) => (
              <span key={c} className="h-4 w-4 rounded-full" style={{ backgroundColor: c }} />
            ))}
          </div>
        </div>
        <p className="text-sm text-gray-400">© Teamix — Plateforme entreprise</p>
      </div>

      <div className="flex flex-1 items-center justify-center p-6">
        <Card className="w-full max-w-md border-gray-100 shadow-lg">
          <div className="mb-6 flex flex-col items-center gap-3 lg:hidden">
            <TeamixLogo variant="with-name" width={180} height={56} priority />
          </div>
          <div className="mb-6 hidden lg:block">
            <CardTitle className="text-2xl">Connexion</CardTitle>
            <CardDescription className="mt-1">
              Accédez à votre espace Teamix
            </CardDescription>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">Email</label>
              <Input type="email" placeholder="vous@entreprise.com" {...register("email")} />
              {errors.email && (
                <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">Mot de passe</label>
              <Input type="password" placeholder="••••••••" {...register("password")} />
              {errors.password && (
                <p className="mt-1 text-xs text-red-500">{errors.password.message}</p>
              )}
            </div>

            {error && (
              <div className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600">
                {error}
              </div>
            )}

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Connexion...
                </>
              ) : (
                "Se connecter"
              )}
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-500">
            <Link href="/" className="text-teamix-teal hover:underline">
              ← Retour à l&apos;accueil
            </Link>
          </p>
        </Card>
      </div>
    </div>
  );
}
