"use client";

import Link from "next/link";
import { useRouter } from "next/router";

const HomePage = () => {
  const { user, logoutUser } = AppData();

  const router = useRouter();

  const handleLogout = () => {
    logoutUser(router.push('/'));
  };

  const isAdmin = user?.role === "admin";

  return (
    <div className="flex gap-4 w-fit m-auto mt-40">
      <button
        className="bg-red-500 text-white p-2 rounded-md"
        onClick={handleLogout}
      >
        Logout
      </button>

      {isAdmin && (
        <Link
          href="/dashboard"
          className="bg-purple-500 text-white p-2 rounded-md"
        >
          Dashboard
        </Link>
      )}
    </div>
  );
};

export default HomePage;
