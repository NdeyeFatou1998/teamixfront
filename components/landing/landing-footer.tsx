import Link from "next/link";
import { TeamixLogo } from "@/components/brand/teamix-logo";
import { Button } from "@/components/ui/button";

export function LandingCta() {
  return (
    <section className="px-6 py-24">
      <div className="relative mx-auto max-w-5xl overflow-hidden rounded-[2.5rem] teamix-rainbow-bg p-12 text-center shadow-2xl md:p-20">
        <div className="pointer-events-none absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wOCI+PHBhdGggIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNiIvPjwvZz48L2c+PC9zdmc+')] opacity-60" />
        <div className="relative">
          <h2 className="text-4xl font-black text-white md:text-5xl">
            Rejoignez l&apos;écosystème Teamix
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-lg font-medium text-white/90">
            Votre espace entreprise ou back-office platform vous attend.
          </p>
          <Link href="/login" className="mt-10 inline-block">
            <Button className="h-14 rounded-2xl bg-white px-12 text-base font-black text-gray-900 shadow-xl hover:bg-white/95 hover:opacity-100">
              Commencer →
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

export function LandingFooter() {
  return (
    <footer id="contact" className="border-t border-gray-200/80 bg-white px-6 py-14">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-8 md:flex-row">
        <div className="flex items-center gap-4">
          <div className="rounded-2xl p-1 teamix-rainbow-bg">
            <div className="rounded-xl bg-white p-1.5">
              <TeamixLogo variant="light-bg" width={36} height={36} />
            </div>
          </div>
          <div>
            <p className="text-lg font-black tracking-widest text-gray-900">TEAMIX</p>
            <p className="text-sm text-gray-500">
              © {new Date().getFullYear()} — Tous droits réservés
            </p>
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-4">
          {[
            { href: "mailto:contact@teamix.pro", label: "contact@teamix.pro", cls: "bento-teal" },
            { href: "/login", label: "Connexion", cls: "bento-blue" },
          ].map((link) => (
            <a
              key={link.label}
              href={link.href}
              className={`rounded-full ${link.cls} px-5 py-2.5 text-sm font-bold text-white shadow-md transition hover:scale-105`}
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
