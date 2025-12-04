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
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 transition-all duration-300">
      {/* Container */}
      <div className="w-full h-20 px-6 md:px-10 flex items-center justify-between">
        {/* LOGO - Left Side */}
        <Link href="/" className="flex items-center group relative h-full">
          {/* FIX APPLIED:
            1. width/height set to 'auto' via style to maintain aspect ratio
            2. mix-blend-multiply hides the white background box
            3. object-contain ensures it fits nicely
          */}
          <Image
            src="/amanox-logo.png"
            alt="Amanox Logo"
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: "auto", height: "70px" }} // Fixed height, auto width
            className="object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-300"
            priority
          />
        </Link>

        {/* NAVIGATION ACTIONS - Right Side */}
        <div className="flex items-center gap-6">
          {!isAuth && (
            <>
              <Link
                href="/login"
                className="text-sm font-semibold text-gray-500 hover:text-secondary transition-colors"
              >
                Log In
              </Link>

              <Link
                href="/register"
                className="bg-secondary hover:bg-[#232530] text-white px-6 py-2.5 rounded-full text-sm font-bold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
              >
                Get Started
              </Link>
            </>
          )}

          {isAuth && (
            <div className="flex items-center gap-4">
              {/* Optional: Show User Name if available */}
              {user && (
                <span className="hidden md:block text-sm font-medium text-gray-500">
                  Hi,{" "}
                  <span className="text-secondary font-bold">
                    {user.name?.split(" ")[0]}
                  </span>
                </span>
              )}

              <button
                onClick={handleLogout}
                className="border border-gray-200 text-gray-600 hover:text-red-500 hover:border-red-200 hover:bg-red-50 px-5 py-2 rounded-full text-sm font-medium transition-all duration-300"
              >
                Sign out
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
