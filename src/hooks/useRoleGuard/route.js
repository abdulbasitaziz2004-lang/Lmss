"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function useRoleGuard(allowedRoles = [], intervalMs = 10000) {
  const router       = useRouter();
  const redirecting  = useRef(false);

  useEffect(() => {
    redirecting.current = false; // reset on every fresh mount

    const check = async () => {
      if (redirecting.current) return;
      try {
        const res = await fetch("/api/me");
        if (!res.ok) return;
        const { role } = await res.json();

        if (!allowedRoles.includes(role)) {
          redirecting.current = true;
          toast.error("Your role has been updated. Redirecting...");
          setTimeout(() => {
            window.location.href = "/dashboard"; // hard redirect, kills interval
          }, 1500);
        }
      } catch {
        // ignore network blips
      }
    };

    check();
    const id = setInterval(check, intervalMs);
    return () => clearInterval(id);
  }, []);
}