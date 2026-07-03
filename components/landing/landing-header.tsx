import Link from "next/link";
import { TeamixLogo } from "@/components/brand/teamix-logo";
import { Button } from "@/components/ui/button";

export function LandingHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-3">
          <TeamixLogo variant="light-bg" width={40} height={40} priority />
          <span className="text-xl font-bold tracking-wide text-gray-900">TEAMIX</span>
        </Link>
        <nav className="hidden items-center gap-8 text-sm font-medium text-gray-600 md:flex">
          <a href="#fonctionnalites" className="transition hover:text-teamix-teal">
            Fonctionnalités
          </a>
          <a href="#securite" className="transition hover:text-teamix-blue">
            Sécurité
          </a>
          <a href="#contact" className="transition hover:text-teamix-orange">
            Contact
          </a>
        </nav>
        <Link href="/login">
          <Button className="h-9 px-5 text-sm">Se connecter</Button>
        </Link>
      </div>
    </header>
  );
}
