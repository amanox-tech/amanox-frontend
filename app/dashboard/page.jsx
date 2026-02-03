"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { AppData } from "@/context/appContext";

export default function DashboardRedirect() {
  const { user, loading } = AppData();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;

    if (!user) {
      router.replace("/login");
    } else if (user.role === "recruiter") {
      router.replace("/dashboard/recruiter");
    } else {
      router.replace("/dashboard/candidate");
    }
  }, [user, loading, router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <p>Redirecting...</p>
    </div>
  );
}
