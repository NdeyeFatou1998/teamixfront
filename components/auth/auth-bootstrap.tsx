"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { apiFetch, setUnauthorizedHandler } from "@/lib/api";
import type { AuthUser, Membership } from "@/lib/types";
import { useAuthStore } from "@/store/auth-store";

type MeResponse = AuthUser & {
  memberships: Membership[];
  organizationId: string | null;
  permissions: string[];
};

export function AuthBootstrap({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { accessToken, setSession, clearSession } = useAuthStore();

  useEffect(() => {
    setUnauthorizedHandler(() => {
      clearSession();
      router.replace("/login");
    });
  }, [clearSession, router]);

  useEffect(() => {
    if (!accessToken) return;

    apiFetch<MeResponse>("/auth/me", { token: accessToken, skipAuthRedirect: true })
      .then((me) => {
        setSession({
          accessToken,
          user: {
            id: me.id,
            email: me.email,
            isPlatformSuperAdmin: me.isPlatformSuperAdmin,
          },
          memberships: me.memberships,
          organizationId: me.organizationId,
          permissions: me.permissions,
        });
      })
      .catch(() => {
        clearSession();
      });
  }, [accessToken, setSession, clearSession]);

  return <>{children}</>;
}
