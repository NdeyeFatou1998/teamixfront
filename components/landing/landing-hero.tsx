import Link from "next/link";
import { ArrowRight, Building2, Shield } from "lucide-react";
import { TeamixLogo } from "@/components/brand/teamix-logo";
import { Button } from "@/components/ui/button";

export function LandingHero() {
  return (
    <section className="teamix-gradient-soft relative overflow-hidden px-6 pb-20 pt-16 md:pb-28 md:pt-24">
      <div className="pointer-events-none absolute -left-20 top-10 h-64 w-64 rounded-full bg-teamix-teal/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 bottom-10 h-64 w-64 rounded-full bg-teamix-blue/10 blur-3xl" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">
        <div className="space-y-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-teamix-teal/20 bg-teamix-teal-light px-4 py-1.5 text-sm font-medium text-teamix-teal">
            <span className="h-2 w-2 rounded-full bg-teamix-teal" />
            Plateforme B2B multi-tenant
          </div>

          <div className="space-y-4">
            <h1 className="text-4xl font-bold leading-tight tracking-tight text-gray-900 md:text-5xl lg:text-6xl">
              Pilotez votre entreprise,{" "}
              <span className="teamix-gradient-text">ensemble</span>
            </h1>
            <p className="max-w-xl text-lg leading-relaxed text-gray-600">
              Teamix centralise le reporting, les projets, les congés et le coffre-fort
              sécurisé de vos équipes — avec les couleurs et l&apos;énergie de votre
              organisation.
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

          <div className="flex flex-wrap gap-6 pt-2 text-sm text-gray-500">
            <span className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-teamix-teal" />
              Données isolées par entreprise
            </span>
            <span className="flex items-center gap-2">
              <Building2 className="h-4 w-4 text-teamix-blue" />
              Départements & employés
            </span>
          </div>
        </div>

        <div className="relative flex justify-center lg:justify-end">
          <div className="relative rounded-3xl border border-gray-100 bg-white p-10 shadow-xl shadow-gray-200/60">
            <TeamixLogo variant="with-name" width={300} height={96} priority className="mx-auto" />
            <div className="mt-8 grid gap-3">
              {[
                { label: "Teal · Collaboration", color: "bg-teamix-teal", bg: "bg-teamix-teal-light" },
                { label: "Bleu · Projets", color: "bg-teamix-blue", bg: "bg-teamix-blue-light" },
                { label: "Orange · RH & congés", color: "bg-teamix-orange", bg: "bg-teamix-orange-light" },
                { label: "Vert · Croissance", color: "bg-teamix-green", bg: "bg-teamix-green-light" },
              ].map((item) => (
                <div
                  key={item.label}
                  className={`flex items-center gap-3 rounded-xl px-4 py-3 ${item.bg}`}
                >
                  <span className={`h-3 w-3 rounded-full ${item.color}`} />
                  <span className="text-sm font-medium text-gray-700">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
