"use client";

import { TeamixLogo } from "@/components/brand/teamix-logo";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Building2, FolderTree, LayoutDashboard, LogOut, Settings, Users } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/store/auth-store";
import { Button } from "@/components/ui/button";

const appLinks = [
  { href: "/app/dashboard", label: "Tableau de bord", icon: LayoutDashboard },
  { href: "/app/departments", label: "Départements", icon: FolderTree },
];

const platformLinks = [
  { href: "/platform/dashboard", label: "Vue d'ensemble", icon: LayoutDashboard },
  { href: "/platform/organizations", label: "Organisations", icon: Building2 },
  { href: "/platform/users", label: "Utilisateurs", icon: Users },
];

export function AppShell({
  children,
  variant,
}: {
  children: React.ReactNode;
  variant: "app" | "platform";
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, clearSession } = useAuthStore();
  const links = variant === "platform" ? platformLinks : appLinks;

  function logout() {
    clearSession();
    router.push("/login");
  }

  return (
    <div className="flex min-h-screen bg-slate-950">
      <aside className="hidden w-64 flex-col border-r border-slate-800 bg-slate-900/50 md:flex">
        <div className="flex items-center gap-3 border-b border-slate-800 p-5">
          <TeamixLogo variant="icon" width={36} height={36} className="rounded-lg" />
          <div>
            <p className="font-semibold text-white">Teamix</p>
            <p className="text-xs text-slate-400">
              {variant === "platform" ? "Back-office" : "Espace entreprise"}
            </p>
          </div>
        </div>

        <nav className="flex-1 space-y-1 p-3">
          {links.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition",
                pathname === href
                  ? "bg-sky-400/10 text-sky-400"
                  : "text-slate-400 hover:bg-slate-800 hover:text-white",
              )}
            >
              <Icon className="h-4 w-4" />
              {label}
            </Link>
          ))}
        </nav>

        <div className="border-t border-slate-800 p-4">
          <p className="truncate text-sm text-slate-300">{user?.email}</p>
          <Button variant="ghost" className="mt-2 w-full justify-start px-0" onClick={logout}>
            <LogOut className="mr-2 h-4 w-4" />
            Déconnexion
          </Button>
        </div>
      </aside>

      <div className="flex flex-1 flex-col">
        <header className="flex h-14 items-center justify-between border-b border-slate-800 px-4 md:px-6">
          <h1 className="text-sm font-medium text-slate-300 md:hidden">
            {variant === "platform" ? "Back-office" : "Teamix"}
          </h1>
          {user?.isPlatformSuperAdmin && (
            <div className="ml-auto flex gap-2">
              {variant === "app" ? (
                <Link href="/platform/dashboard">
                  <Button variant="outline" className="h-8 text-xs">
                    <Settings className="mr-1 h-3 w-3" />
                    Platform
                  </Button>
                </Link>
              ) : (
                <Link href="/app/dashboard">
                  <Button variant="outline" className="h-8 text-xs">
                    Espace entreprise
                  </Button>
                </Link>
              )}
            </div>
          )}
        </header>
        <main className="flex-1 p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
}
