"use client";

import Link from "next/link";
import { AppData } from "@/context/appContext";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const { isAuth, logoutUser } = AppData();
  const router = useRouter();

  const handleLogout = async () => {
    await logoutUser();
    router.push("/login");
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white border-b shadow-sm h-16 flex items-center justify-between px-6">
      <Link href="/" className="text-xl font-semibold text-gray-900">
        Searchly
      </Link>

      <div className="flex items-center gap-4">
        {!isAuth && (
          <>
            <Link
              href="/login"
              className="text-gray-700 hover:text-black transition"
            >
              Login
            </Link>

            <Link
              href="/register"
              className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition"
            >
              Register
            </Link>
          </>
        )}

        {isAuth && (
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}
