// hooks/useRoleGuard.js
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function useRoleGuard(allowedRoles = [], intervalMs = 10000) {
  const router = useRouter();

  useEffect(() => {
    let redirecting = false;

    const check = async () => {
      if (redirecting) return;
      try {
        const res = await fetch("/api/me");
        if (!res.ok) return;
        const { role } = await res.json();

        if (!allowedRoles.includes(role)) {
          redirecting = true;
          toast.error("Your role has been updated. Redirecting...");
          setTimeout(() => {
            router.push("/dashboard");
            router.refresh();
          }, 1500);
        }
      } catch {
        // network blip — silently ignore
      }
    };

    check();
    const id = setInterval(check, intervalMs);
    return () => {
      clearInterval(id);
      redirecting = false;
    };
  }, []); // empty deps — only runs once on mount
}