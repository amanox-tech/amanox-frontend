"use client";

import Link from "next/link";
import Image from "next/image";
import { AppData } from "@/context/appContext";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const { isAuth, user, logoutUser } = AppData();
  const router = useRouter();

  const handleLogout = async () => {
    await logoutUser();
    router.push("/login");
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-100/50 transition-all duration-300 supports-backdrop-filter:bg-white/60">
      {/* Container - Aligned with Hero Section max-width */}
      <div className="absolute bottom-0 left-0 w-full h-0.5 bg-linear-to-r from-transparent via-primary to-transparent opacity-50"></div>

      <div className="max-w-[1440px] mx-auto h-20 px-6 flex items-center justify-between">
        {/* LOGO - Left Side */}
        <Link
          href="/"
          className="flex items-center group relative bg-transparent"
        >
          <Image
            // Added ?v=2 to force browser to ignore cache
            src="/amanox-logo.png?v=2"
            alt="Amanox Logo"
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: "auto", height: "48px" }}
            // REMOVED mix-blend-multiply entirely
            className="object-contain opacity-100 group-hover:opacity-80 transition-opacity duration-300 bg-transparent"
            priority
            unoptimized={true} // Optional: Skips Next.js optimization cache if issues persist
          />
        </Link>

        {/* NAVIGATION ACTIONS - Right Side */}
        <div className="flex items-center gap-4 sm:gap-6">
          {!isAuth ? (
            <>
              <Link
                href="/login"
                className="hidden sm:block text-sm font-semibold text-gray-500 hover:text-secondary transition-colors"
              >
                Log In
              </Link>

              <Link
                href="/register"
                className="bg-secondary hover:bg-black text-white px-6 py-2.5 rounded-full text-sm font-bold shadow-lg shadow-secondary/10 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
              >
                Get Started
              </Link>
            </>
          ) : (
            <div className="flex items-center gap-4">
              {/* Dashboard Button (Primary Action for Logged In) */}
              <Link
                href="/dashboard"
                className="hidden sm:flex items-center gap-2 bg-primary/10 hover:bg-primary/20 text-primary px-5 py-2 rounded-full text-sm font-bold transition-all duration-300"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                  />
                </svg>
                Dashboard
              </Link>

              {/* User Profile / Logout */}
              <div className="flex items-center gap-3 pl-2 sm:border-l border-gray-200">
                {/* Mobile-only avatar placeholder or name */}
                {user && (
                  <div className="w-8 h-8 rounded-full bg-secondary text-white flex items-center justify-center text-xs font-bold sm:hidden">
                    {user.name?.charAt(0)}
                  </div>
                )}

                <span className="hidden md:block text-sm font-medium text-gray-500">
                  <span className="text-secondary font-bold">
                    {user?.name?.split(" ")[0]}
                  </span>
                </span>

                <button
                  onClick={handleLogout}
                  className="text-gray-400 hover:text-red-500 p-2 rounded-full hover:bg-red-50 transition-all duration-200"
                  title="Sign out"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
