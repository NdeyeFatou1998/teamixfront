import Link from "next/link";
import { TeamixLogo } from "@/components/brand/teamix-logo";
import { Button } from "@/components/ui/button";

export function LandingHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-3">
          <TeamixLogo variant="icon" width={36} height={36} priority />
          <span className="text-lg font-semibold text-white">Teamix</span>
        </Link>
        <nav className="hidden items-center gap-8 text-sm text-slate-400 md:flex">
          <a href="#fonctionnalites" className="transition hover:text-white">
            Fonctionnalités
          </a>
          <a href="#securite" className="transition hover:text-white">
            Sécurité
          </a>
          <a href="#contact" className="transition hover:text-white">
            Contact
          </a>
        </nav>
        <Link href="/login">
          <Button className="h-9 px-4 text-sm">Se connecter</Button>
        </Link>
      </div>
    </header>
  );
}
