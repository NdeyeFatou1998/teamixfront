"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth-store";

export function AuthGuard({
  children,
  requirePlatform,
  requireOrganization,
}: {
  children: React.ReactNode;
  requirePlatform?: boolean;
  requireOrganization?: boolean;
}) {
  const router = useRouter();
  const { accessToken, user, organizationId } = useAuthStore();

  useEffect(() => {
    if (!accessToken || !user) {
      router.replace("/login");
      return;
    }

    if (requirePlatform && !user.isPlatformSuperAdmin) {
      router.replace("/app/dashboard");
      return;
    }

    if (requireOrganization && !organizationId) {
      router.replace("/select-organization");
    }
  }, [accessToken, user, organizationId, requirePlatform, requireOrganization, router]);

  if (!accessToken || !user) return null;
  if (requirePlatform && !user.isPlatformSuperAdmin) return null;
  if (requireOrganization && !organizationId) return null;

  return <>{children}</>;
}
