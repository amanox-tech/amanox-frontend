"use client";

import Link from "next/link";
import { AppData } from "@/context/appContext";

export default function Home() {
  const { isAuth, user, logoutUser } = AppData();

  return (
    <div className="flex min-h-[70vh] items-center justify-center">
      <div className="bg-white p-10 rounded-xl shadow-md max-w-md w-full text-center">
        <h1 className="text-3xl font-semibold text-gray-900 mb-4">
          Welcome to Searchly
        </h1>

        {!isAuth && (
          <>
            <p className="text-gray-600 mb-6">
              Login or register to access your dashboard.
            </p>
            <div className="flex justify-center gap-4">
              <Link
                href="/login"
                className="px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="px-6 py-3 border border-gray-300 rounded-md hover:bg-gray-100 transition"
              >
                Register
              </Link>
            </div>
          </>
        )}

        {isAuth && (
          <>
            <p className="text-gray-700 mb-4">
              Logged in as <span className="font-medium">{user?.["name"]}</span>
            </p>

            <div className="flex justify-center gap-4">
              <Link
                href="/dashboard"
                className="px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
              >
                Go to Dashboard
              </Link>

              <button
                onClick={logoutUser}
                className="px-6 py-3 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
              >
                Logout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
