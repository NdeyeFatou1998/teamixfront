import Link from "next/link";
import { ArrowRight, Building2, Shield, Sparkles } from "lucide-react";
import { TeamixLogo } from "@/components/brand/teamix-logo";
import { Button } from "@/components/ui/button";

export function LandingHero() {
  return (
    <section className="relative overflow-hidden px-6 pb-20 pt-16 md:pb-28 md:pt-24">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-900/30 via-transparent to-transparent" />
      <div className="pointer-events-none absolute -right-32 top-20 h-96 w-96 rounded-full bg-indigo-500/10 blur-3xl" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">
        <div className="space-y-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-sky-400/20 bg-sky-400/10 px-4 py-1.5 text-sm text-sky-300">
            <Sparkles className="h-4 w-4" />
            Plateforme B2B multi-tenant
          </div>

          <div className="space-y-4">
            <h1 className="text-4xl font-bold leading-tight tracking-tight text-white md:text-5xl lg:text-6xl">
              Pilotez votre entreprise,{" "}
              <span className="bg-gradient-to-r from-sky-400 to-indigo-400 bg-clip-text text-transparent">
                en un seul endroit
              </span>
            </h1>
            <p className="max-w-xl text-lg leading-relaxed text-slate-400">
              Teamix centralise le reporting, les projets, les congés et le coffre-fort
              sécurisé de vos équipes. Une solution professionnelle pensée pour les
              entreprises exigeantes.
            </p>
          </div>

          <div className="flex flex-wrap gap-4">
            <Link href="/login">
              <Button className="h-12 px-8 text-base">
                Accéder à la plateforme
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <a href="#fonctionnalites">
              <Button variant="outline" className="h-12 px-8 text-base">
                Découvrir
              </Button>
            </a>
          </div>

          <div className="flex flex-wrap gap-6 pt-2 text-sm text-slate-500">
            <span className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-sky-400" />
              Données isolées par entreprise
            </span>
            <span className="flex items-center gap-2">
              <Building2 className="h-4 w-4 text-sky-400" />
              Départements & employés
            </span>
          </div>
        </div>

        <div className="relative flex justify-center lg:justify-end">
          <div className="relative rounded-3xl border border-slate-800 bg-slate-900/60 p-8 shadow-2xl shadow-sky-950/40 backdrop-blur-sm">
            <TeamixLogo variant="with-name" width={280} height={88} priority className="mx-auto" />
            <div className="mt-8 grid gap-3">
              {[
                { label: "Organisations actives", value: "Multi-tenant" },
                { label: "Modules", value: "RH · Projets · Vault" },
                { label: "Accès", value: "Permissions granulaires" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950/50 px-4 py-3"
                >
                  <span className="text-sm text-slate-400">{item.label}</span>
                  <span className="text-sm font-medium text-white">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
