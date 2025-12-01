"use client";

import { AppData } from "@/context/appContext";

export default function DashboardPage() {
  const { user, loading } = AppData();

  if (loading) {
    return (
      <div className="mt-40 text-center text-lg text-gray-700">
        Loading user...
      </div>
    );
  }

  return (
    <div className="mt-32 mx-auto max-w-lg text-center">
      <h1 className="text-3xl font-semibold text-gray-900">
        Welcome, {user?.name}
      </h1>
      <p className="text-gray-600 mt-2">{user?.email}</p>
    </div>
  );
}
