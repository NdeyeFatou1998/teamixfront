import Link from "next/link";
import { TeamixLogo } from "@/components/brand/teamix-logo";
import { Button } from "@/components/ui/button";

export function LandingCta() {
  return (
    <section className="px-6 py-20 md:py-28">
      <div className="mx-auto max-w-4xl overflow-hidden rounded-3xl teamix-gradient-bg p-10 text-center text-white shadow-xl shadow-teamix-teal/30 md:p-16">
        <h2 className="text-3xl font-bold md:text-4xl">
          Prêt à simplifier la gestion de votre entreprise ?
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-lg text-white/90">
          Connectez-vous à Teamix et accédez à votre espace entreprise ou au
          back-office platform.
        </p>
        <Link href="/login" className="mt-8 inline-block">
          <Button className="h-12 bg-white px-10 text-base text-teamix-teal hover:bg-gray-50 hover:opacity-100">
            Commencer maintenant
          </Button>
        </Link>
      </div>
    </section>
  );
}

export function LandingFooter() {
  return (
    <footer id="contact" className="border-t border-gray-100 bg-white px-6 py-12">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 md:flex-row">
        <div className="flex items-center gap-3">
          <TeamixLogo variant="light-bg" width={36} height={36} />
          <div>
            <p className="font-bold tracking-wide text-gray-900">TEAMIX</p>
            <p className="text-sm text-gray-500">
              © {new Date().getFullYear()} Teamix. Tous droits réservés.
            </p>
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-500">
          <a href="mailto:contact@teamix.pro" className="transition hover:text-teamix-teal">
            contact@teamix.pro
          </a>
          <Link href="/login" className="transition hover:text-teamix-blue">
            Connexion
          </Link>
        </div>
      </div>
    </footer>
  );
}
