"use client";

import { AuthGuard } from "@/components/auth/auth-guard";
import { AppShell } from "@/components/layout/app-shell";

export default function PlatformLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthGuard requirePlatform>
      <AppShell variant="platform">{children}</AppShell>
    </AuthGuard>
  );
}
