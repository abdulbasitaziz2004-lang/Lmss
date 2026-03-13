"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

/**
 * Polls /api/me every N seconds.
 * If the user's role no longer satisfies allowedRoles, redirects them out.
 *
 * Usage:
 *   useRoleGuard(["admin", "instructor"])  // on instructor pages
 *   useRoleGuard(["admin"])                // on admin pages
 */
export default function useRoleGuard(allowedRoles = [], intervalMs = 5000) {
  const router  = useRouter();
  const warned  = useRef(false);

  useEffect(() => {
    const check = async () => {
      try {
        const res  = await fetch("/api/me");
        if (!res.ok) return;
        const { role } = await res.json();

        if (!allowedRoles.includes(role) && !warned.current) {
          warned.current = true;
          toast.error("Your role has been updated. Redirecting...");
          setTimeout(() => {
            router.push("/dashboard");
            router.refresh(); // force server component re-render
          }, 1500);
        }
      } catch {
        // network blip — silently ignore
      }
    };

    // Check immediately on mount, then on interval
    check();
    const id = setInterval(check, intervalMs);
    return () => clearInterval(id);
  }, [allowedRoles, intervalMs, router]);
}