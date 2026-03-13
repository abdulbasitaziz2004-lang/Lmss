"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import toast, { Toaster } from "react-hot-toast";

export default function EnrollButton({ courseId, isEnrolled = false }) {
  const { isSignedIn } = useUser();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleEnroll = async () => {
    if (!isSignedIn) {
      toast.error("Please sign in to enroll");
      return;
    }
    if (isEnrolled) {
      toast("You are already enrolled in this course!");
      return;
    }

    setLoading(true);

    const res = await fetch(`/api/enroll/${courseId}`, {
      method: "POST",
      credentials: "include",
    });

    setLoading(false);

    if (res.ok) {
      toast.success("Enrolled successfully! Start learning now.");
      router.refresh();
    } else {
      const data = await res.json().catch(() => ({}));
      toast.error(data.error || "Failed to enroll. Please try again.");
    }
  };

  return (
    <>
      <Toaster position="top-right" />
      <button
        onClick={handleEnroll}
        disabled={loading || isEnrolled}
        className={`relative inline-flex items-center gap-2 px-8 py-3 rounded-xl font-semibold text-white transition-all duration-200 shadow-lg border
          ${isEnrolled
            ? "bg-green-600/20 border-green-500/40 text-green-400 cursor-default"
            : "bg-linear-to-r from-purple-600 to-purple-500 hover:from-purple-500 hover:to-purple-400 border-purple-500/30 shadow-purple-900/30 disabled:opacity-60 disabled:cursor-not-allowed"
          }`}
      >
        {loading ? (
          <>
            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            Enrolling...
          </>
        ) : isEnrolled ? (
          "✓ Enrolled"
        ) : (
          "Enroll Now"
        )}
      </button>
    </>
  );
}