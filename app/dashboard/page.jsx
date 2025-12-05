"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { AppData } from "@/context/appContext";

export default function DashboardRedirect() {
  const { user, loading } = AppData();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push("/login");
      } else if (user.role === "recruiter") {
        router.push("/dashboard/recruiter");
      } else {
        router.push("/dashboard/candidate");
      }
    }
  }, [user, loading, router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <p>Redirecting...</p>
    </div>
  );
}
