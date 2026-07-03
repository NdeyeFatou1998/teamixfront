import Link from "next/link";
import { ArrowRight, Sparkles, Zap } from "lucide-react";
import { TeamixLogo } from "@/components/brand/teamix-logo";
import { Button } from "@/components/ui/button";

export function LandingHero() {
  return (
    <section className="teamix-mesh relative min-h-screen overflow-hidden px-6 pb-24 pt-32">
      {/* Floating orbs */}
      <div className="pointer-events-none absolute left-[8%] top-[18%] h-32 w-32 rounded-full bg-teamix-teal/50 blur-2xl orb-float-a" />
      <div className="pointer-events-none absolute right-[12%] top-[28%] h-40 w-40 rounded-full bg-teamix-blue/45 blur-2xl orb-float-b" />
      <div className="pointer-events-none absolute bottom-[20%] left-[20%] h-36 w-36 rounded-full bg-teamix-orange/40 blur-2xl orb-float-b" />
      <div className="pointer-events-none absolute bottom-[30%] right-[18%] h-28 w-28 rounded-full bg-teamix-green/45 blur-2xl orb-float-a" />

      <div className="relative mx-auto max-w-6xl">
        <div className="mb-10 flex justify-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/60 bg-white/70 px-5 py-2 text-sm font-bold shadow-lg backdrop-blur-sm">
            <Sparkles className="h-4 w-4 text-teamix-orange" />
            <span className="font-semibold text-gray-800">Plateforme entreprise · Hub central</span>
          </div>
        </div>

        <div className="text-center">
          <h1 className="mx-auto max-w-4xl text-5xl font-black leading-[1.05] tracking-tight text-gray-900 md:text-7xl">
            Tout votre métier,{" "}
            <span className="teamix-rainbow-text">un seul hub.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg font-medium text-gray-600 md:text-xl">
            Reporting, projets, congés, coffre-fort : une plateforme unique pour
            piloter, collaborer et sécuriser vos opérations au quotidien.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link href="/login">
              <Button className="teamix-rainbow-bg h-14 rounded-2xl px-10 text-base font-bold shadow-xl shadow-teamix-teal/30 hover:scale-[1.02] hover:opacity-95">
                Lancer Teamix
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
            <a href="#fonctionnalites">
              <Button
                variant="outline"
                className="h-14 rounded-2xl border-2 border-gray-900/10 bg-white/80 px-10 text-base font-bold backdrop-blur-sm hover:border-teamix-blue hover:text-teamix-blue"
              >
                Explorer les modules
              </Button>
            </a>
          </div>
        </div>

        {/* Bento showcase */}
        <div className="relative mx-auto mt-20 max-w-5xl">
          <div className="absolute -inset-4 teamix-rainbow-bg rounded-[2rem] opacity-20 blur-2xl" />
          <div className="relative grid gap-4 md:grid-cols-12 md:grid-rows-2">
            <div className="bento-glass relative flex flex-col items-center justify-center rounded-3xl p-8 shadow-xl md:col-span-5 md:row-span-2">
              <div className="absolute -right-3 -top-3 h-16 w-16 rounded-2xl bento-teal opacity-80 blur-sm" />
              <div className="absolute -bottom-3 -left-3 h-14 w-14 rounded-full bento-orange opacity-70 blur-sm" />
              <TeamixLogo variant="with-name" width={260} height={82} priority className="relative z-10" />
              <div className="relative z-10 mt-6 flex flex-wrap justify-center gap-2">
                {["SaaS B2B", "Multi-tenant", "Permissions fines", "Évolutif"].map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-gray-200 bg-white/90 px-3 py-1 text-xs font-semibold text-gray-600"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="bento-teal flex flex-col justify-between rounded-3xl p-6 text-white shadow-xl md:col-span-4">
              <Zap className="h-8 w-8 opacity-90" />
              <div>
                <p className="text-3xl font-black">Multi-tenant</p>
                <p className="mt-1 text-sm text-white/80">Chaque entreprise, son univers isolé</p>
              </div>
            </div>

            <div className="bento-blue flex flex-col justify-between rounded-3xl p-6 text-white shadow-xl md:col-span-3">
              <p className="text-4xl font-black">∞</p>
              <p className="text-sm font-semibold text-white/90">Organisations & équipes</p>
            </div>

            <div className="bento-orange rounded-3xl p-6 text-white shadow-xl md:col-span-3">
              <p className="text-2xl font-black">RH</p>
              <p className="text-sm text-white/85">Départements · Employés · Congés</p>
            </div>

            <div className="bento-green rounded-3xl p-6 text-white shadow-xl md:col-span-4">
              <p className="text-2xl font-black">Coffre-fort sécurisé</p>
              <p className="text-sm text-white/85">Secrets partagés avec contrôle fin</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
