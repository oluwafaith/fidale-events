"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Lock, ShieldAlert } from "lucide-react";
import { useFidaleEvents } from "@/context/FidaleEventsContext";
import { UserRole, homePathForRole } from "@/lib/auth-store";

/**
 * Client-side route guard. Redirects anonymous visitors to /login?next=…
 * and shows an "access denied" card when the signed-in role is not allowed.
 * (In production, enforce this on the server too — middleware + API checks.)
 */
export function RequireAuth({ roles, children }: { roles: UserRole[]; children: React.ReactNode }) {
  const { user, authReady } = useFidaleEvents();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (authReady && !user) {
      router.replace(`/login?next=${encodeURIComponent(pathname || "/")}`);
    }
  }, [authReady, user, router, pathname]);

  if (!authReady || !user) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="flex items-center gap-2 text-xs font-semibold text-stone-500">
          <div className="w-4 h-4 border-2 border-coral-500 border-t-transparent rounded-full animate-spin" />
          <span>Checking your session…</span>
        </div>
      </div>
    );
  }

  if (!roles.includes(user.role)) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <div className="max-w-sm w-full bg-white border border-stone-200 rounded-3xl p-8 text-center shadow-sm">
          <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mx-auto">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <h1 className="mt-4 font-display text-xl font-bold text-stone-900">You don&apos;t have access</h1>
          <p className="mt-2 text-xs text-stone-500 leading-relaxed">
            This area is for <strong>{roles.join(" / ")}</strong> accounts. You&apos;re signed in as a{" "}
            <strong>{user.role}</strong>.
          </p>
          <div className="mt-6 flex flex-col gap-2">
            <Link
              href={homePathForRole(user.role)}
              className="w-full py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold"
            >
              Go to my dashboard
            </Link>
            <Link
              href={`/login?next=${encodeURIComponent(pathname || "/")}`}
              className="w-full py-2.5 rounded-xl border border-stone-300 text-stone-700 text-xs font-bold inline-flex items-center justify-center gap-1.5"
            >
              <Lock className="w-3.5 h-3.5" />
              Switch account
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
