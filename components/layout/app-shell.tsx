"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Building2, FolderTree, LayoutDashboard, LogOut, Settings, Users } from "lucide-react";
import { TeamixLogo } from "@/components/brand/teamix-logo";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/store/auth-store";
import { Button } from "@/components/ui/button";

const appLinks = [
  { href: "/app/dashboard", label: "Tableau de bord", icon: LayoutDashboard, color: "text-teamix-teal" },
  { href: "/app/departments", label: "Départements", icon: FolderTree, color: "text-teamix-blue" },
  { href: "/app/employees", label: "Employés", icon: Users, color: "text-teamix-orange" },
];

const platformLinks = [
  { href: "/platform/dashboard", label: "Vue d'ensemble", icon: LayoutDashboard, color: "text-teamix-teal" },
  { href: "/platform/organizations", label: "Organisations", icon: Building2, color: "text-teamix-blue" },
  { href: "/platform/users", label: "Utilisateurs", icon: Users, color: "text-teamix-orange" },
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
    <div className="flex min-h-screen bg-surface">
      <aside className="hidden w-64 flex-col border-r border-gray-200 bg-white md:flex">
        <div className="flex items-center gap-3 border-b border-gray-100 p-5">
          <TeamixLogo variant="light-bg" width={36} height={36} />
          <div>
            <p className="font-bold tracking-wide text-gray-900">TEAMIX</p>
            <p className="text-xs text-gray-500">
              {variant === "platform" ? "Back-office" : "Espace entreprise"}
            </p>
          </div>
        </div>

        <nav className="flex-1 space-y-1 p-3">
          {links.map(({ href, label, icon: Icon, color }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition",
                pathname === href
                  ? "bg-teamix-teal-light text-teamix-teal"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
              )}
            >
              <Icon className={cn("h-4 w-4", pathname === href ? "text-teamix-teal" : color)} />
              {label}
            </Link>
          ))}
        </nav>

        <div className="border-t border-gray-100 p-4">
          <p className="truncate text-sm font-medium text-gray-700">{user?.email}</p>
          <Button variant="ghost" className="mt-2 w-full justify-start px-0 text-gray-500" onClick={logout}>
            <LogOut className="mr-2 h-4 w-4" />
            Déconnexion
          </Button>
        </div>
      </aside>

      <div className="flex flex-1 flex-col">
        <header className="flex h-14 items-center justify-between border-b border-gray-200 bg-white px-4 md:px-6">
          <Link href="/" className="flex items-center gap-2 md:hidden">
            <TeamixLogo variant="light-bg" width={28} height={28} />
            <span className="font-bold text-gray-900">TEAMIX</span>
          </Link>
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
