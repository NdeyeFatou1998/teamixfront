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
    <div className="flex min-h-screen teamix-mesh">
      <div className="relative hidden w-1/2 flex-col justify-between overflow-hidden p-12 lg:flex">
        <div className="pointer-events-none absolute inset-0 teamix-rainbow-bg opacity-90" />
        <div className="pointer-events-none absolute inset-0 bg-black/10" />
        <Link href="/" className="relative z-10 flex items-center gap-3">
          <TeamixLogo variant="light-bg" width={48} height={48} priority />
          <span className="text-2xl font-black tracking-widest text-white">TEAMIX</span>
        </Link>
        <div className="relative z-10">
          <h2 className="text-4xl font-black leading-tight text-white">
            Un hub.
            <br />
            Une ambition :
            <br />
            <span className="text-white/90">faire avancer vos équipes.</span>
          </h2>
          <div className="mt-10 flex gap-3">
            {[
              { c: "#0dbfb8", l: "Collab" },
              { c: "#2196f3", l: "Projets" },
              { c: "#ff8c42", l: "RH" },
              { c: "#4caf50", l: "Vault" },
            ].map(({ c, l }) => (
              <div
                key={l}
                className="rounded-2xl bg-white/20 px-4 py-3 backdrop-blur-md"
              >
                <span className="block h-2 w-8 rounded-full" style={{ backgroundColor: c }} />
                <span className="mt-2 block text-xs font-bold text-white">{l}</span>
              </div>
            ))}
          </div>
        </div>
        <p className="relative z-10 text-sm font-medium text-white/70">© Teamix</p>
      </div>

      <div className="flex flex-1 items-center justify-center p-6">
        <Card className="w-full max-w-md border-0 shadow-2xl shadow-teamix-blue/15">
          <div className="mb-6 flex flex-col items-center gap-3 lg:hidden">
            <TeamixLogo variant="with-name" width={180} height={56} priority />
          </div>
          <div className="mb-6 hidden lg:block">
            <CardTitle className="text-2xl font-black">Connexion</CardTitle>
            <CardDescription className="mt-1 text-base">
              Accédez à votre espace Teamix
            </CardDescription>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="mb-1.5 block text-sm font-bold text-gray-700">Email</label>
              <Input type="email" placeholder="vous@entreprise.com" {...register("email")} />
              {errors.email && (
                <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-bold text-gray-700">Mot de passe</label>
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

            <Button type="submit" className="w-full h-12 rounded-2xl text-base" disabled={isSubmitting}>
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

          <p className="mt-6 text-center text-sm">
            <Link href="/" className="font-bold teamix-rainbow-text hover:opacity-80">
              ← Retour à l&apos;accueil
            </Link>
          </p>
        </Card>
      </div>
    </div>
  );
}
