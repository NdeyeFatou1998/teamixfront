"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { AuthUser, Membership } from "@/lib/types";

type AuthState = {
  accessToken: string | null;
  user: AuthUser | null;
  memberships: Membership[];
  organizationId: string | null;
  permissions: string[];
  setSession: (data: {
    accessToken: string;
    user: AuthUser;
    memberships?: Membership[];
    organizationId?: string | null;
    permissions?: string[];
  }) => void;
  clearSession: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: null,
      user: null,
      memberships: [],
      organizationId: null,
      permissions: [],
      setSession: (data) =>
        set({
          accessToken: data.accessToken,
          user: data.user,
          memberships: data.memberships ?? [],
          organizationId: data.organizationId ?? null,
          permissions: data.permissions ?? [],
        }),
      clearSession: () =>
        set({
          accessToken: null,
          user: null,
          memberships: [],
          organizationId: null,
          permissions: [],
        }),
    }),
    { name: "teamix-auth" },
  ),
);
