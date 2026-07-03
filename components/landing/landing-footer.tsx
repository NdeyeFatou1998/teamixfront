import Link from "next/link";
import { TeamixLogo } from "@/components/brand/teamix-logo";
import { Button } from "@/components/ui/button";

export function LandingCta() {
  return (
    <section className="px-6 py-20 md:py-28">
      <div className="mx-auto max-w-4xl rounded-3xl border border-sky-400/20 bg-gradient-to-br from-sky-950/50 to-indigo-950/30 p-10 text-center md:p-16">
        <h2 className="text-3xl font-bold text-white md:text-4xl">
          Prêt à simplifier la gestion de votre entreprise ?
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-lg text-slate-400">
          Connectez-vous à Teamix et accédez à votre espace entreprise ou au
          back-office platform.
        </p>
        <Link href="/login" className="mt-8 inline-block">
          <Button className="h-12 px-10 text-base">Commencer maintenant</Button>
        </Link>
      </div>
    </section>
  );
}

export function LandingFooter() {
  return (
    <footer id="contact" className="border-t border-slate-800/80 px-6 py-12">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 md:flex-row">
        <div className="flex items-center gap-3">
          <TeamixLogo variant="icon" width={32} height={32} />
          <div>
            <p className="font-semibold text-white">Teamix</p>
            <p className="text-sm text-slate-500">© {new Date().getFullYear()} Teamix. Tous droits réservés.</p>
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-slate-500">
          <a href="mailto:contact@teamix.pro" className="transition hover:text-sky-400">
            contact@teamix.pro
          </a>
          <Link href="/login" className="transition hover:text-sky-400">
            Connexion
          </Link>
        </div>
      </div>
    </footer>
  );
}
