"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";

export default function EnrollButton({ courseId }) {
  const { isSignedIn } = useUser();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleEnroll = async () => {
    if (!isSignedIn) {
      alert("Please sign in to enroll");
      return;
    }

    setLoading(true);

    const res = await fetch(`/api/enroll/${courseId}`, {
      method: "POST",
      credentials: "include",
    });
    console.log("Enroll courseId:", courseId);

    setLoading(false);

    if (res.ok) {
      alert("Enrolled successfully!");
      router.refresh();
    } else {
      const msg = await res.text();
      alert(msg || "Failed to enroll");
    }
  };

  return (
    <button
      onClick={handleEnroll}
      disabled={loading}
      className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
    >
      {loading ? "Enrolling..." : "Enroll"}
    </button>
  );
}
