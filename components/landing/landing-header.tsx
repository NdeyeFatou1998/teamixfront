import Link from "next/link";
import { TeamixLogo } from "@/components/brand/teamix-logo";
import { Button } from "@/components/ui/button";

export function LandingHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between rounded-2xl bento-glass px-5 shadow-lg shadow-teamix-blue/10">
        <Link href="/" className="flex items-center gap-2.5">
          <TeamixLogo variant="light-bg" width={36} height={36} priority />
          <span className="text-lg font-black tracking-widest text-gray-900">TEAMIX</span>
        </Link>
        <nav className="hidden items-center gap-1 md:flex">
          {[
            { href: "#fonctionnalites", label: "Modules", color: "hover:bg-teamix-teal/15 hover:text-teamix-teal" },
            { href: "#experience", label: "Expérience", color: "hover:bg-teamix-blue/15 hover:text-teamix-blue" },
            { href: "#securite", label: "Sécurité", color: "hover:bg-teamix-green/15 hover:text-teamix-green" },
          ].map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`rounded-xl px-4 py-2 text-sm font-semibold text-gray-600 transition ${item.color}`}
            >
              {item.label}
            </a>
          ))}
        </nav>
        <Link href="/login">
          <Button className="teamix-rainbow-bg h-9 border-0 px-5 text-sm shadow-lg shadow-teamix-orange/20">
            Se connecter
          </Button>
        </Link>
      </div>
    </header>
  );
}
