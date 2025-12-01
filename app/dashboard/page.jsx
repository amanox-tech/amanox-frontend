"use client";

import React from "react";
import { AppData } from "@/context/appContext";

const DashboardPage = () => {
  const { user } = AppData();

  if (!user) {
    return (
      <div className="w-fit m-auto mt-40 text-xl font-semibold">
        Loading user...
      </div>
    );
  }

  return (
    <div className="w-fit m-auto mt-40 text-xl font-semibold">
      <div>Welcome, {user.name}</div>
      <div className="text-gray-600 text-base mt-2">{user.email}</div>
    </div>
  );
};

export default DashboardPage;
