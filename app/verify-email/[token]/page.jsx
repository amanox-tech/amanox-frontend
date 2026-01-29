"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import api from "@/lib/axiosClient";
import Link from "next/link";

export default function VerifyEmailPage() {
  const { token } = useParams();
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (!token) return;

    const verifyEmail = async () => {
      try {
        const { data } = await api.post(`/api/v1/auth/verify/${token}`);
        setSuccessMessage(data.message);

        // Auto-redirect after 5 seconds
        setTimeout(() => router.push("/login"), 5000);
      } catch (error) {
        const msg =
          error?.response?.data?.message ||
          "This link is invalid or has already expired.";
        setErrorMessage(msg);
      } finally {
        setLoading(false);
      }
    };

    verifyEmail();
  }, [token, router]);

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-6 font-sans selection:bg-primary/20">
      {/* Subtle Background Elements */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-size-[32px_32px] pointer-events-none"></div>
      <div className="absolute top-0 left-0 w-full h-1.5 bg-linear-to-r from-transparent via-primary to-transparent opacity-30"></div>

      {/* VERIFICATION CARD */}
      <div className="relative w-full max-w-[450px] bg-white border border-gray-100 rounded-[3rem] shadow-2xl p-12 text-center animate-in fade-in slide-in-from-bottom-4 duration-500">
        {/* --- STATE: LOADING --- */}
        {loading && (
          <div className="flex flex-col items-center space-y-8">
            <div className="relative w-20 h-20 flex items-center justify-center">
              {/* Outer Pulse */}
              <div className="absolute inset-0 rounded-full border-2 border-primary/20 animate-ping"></div>
              {/* Spinning Ring */}
              <div className="absolute inset-0 rounded-full border-t-4 border-primary animate-spin"></div>
              {/* Center Icon */}
              <div className="relative w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-primary animate-pulse"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
            </div>

            <div className="space-y-2">
              <h2 className="text-3xl font-black text-secondary tracking-tighter">
                Verifying Now
              </h2>
              <p className="text-gray-500 font-medium">
                We are securing your Amanox Pro account...
              </p>
            </div>
          </div>
        )}

        {/* --- STATE: SUCCESS --- */}
        {!loading && successMessage && (
          <div className="flex flex-col items-center space-y-8 animate-in zoom-in-95 duration-500">
            <div className="w-24 h-24 rounded-4xl bg-primary/10 flex items-center justify-center border-2 border-primary/20 shadow-[0_0_40px_rgba(24,203,150,0.2)]">
              <svg
                className="w-12 h-12 text-primary"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={4}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>

            <div className="space-y-3">
              <h2 className="text-4xl font-black text-secondary tracking-tighter leading-none">
                Email Verified!
              </h2>
              <p className="text-gray-500 font-medium leading-relaxed">
                Your account is now active. Welcome to the elite tier of
                candidates.
              </p>
            </div>

            <Link
              href="/login"
              className="w-full py-5 bg-secondary text-white font-black rounded-2xl shadow-xl shadow-secondary/20 hover:bg-black hover:-translate-y-1 transition-all duration-300 uppercase tracking-widest text-xs"
            >
              Sign In to Start
            </Link>

            <p className="text-[10px] text-gray-400 font-black uppercase tracking-[0.3em] animate-pulse">
              Redirecting you in 5 seconds...
            </p>
          </div>
        )}

        {/* --- STATE: ERROR --- */}
        {!loading && errorMessage && (
          <div className="flex flex-col items-center space-y-8 animate-in slide-in-from-top-4 duration-500">
            <div className="w-24 h-24 rounded-4xl bg-red-50 flex items-center justify-center border-2 border-red-100 shadow-sm">
              <svg
                className="w-12 h-12 text-red-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={3}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>

            <div className="space-y-3 w-full">
              <h2 className="text-3xl font-black text-secondary tracking-tighter">
                Link Expired
              </h2>
              <div className="p-4 bg-red-50 rounded-2xl text-red-600 text-sm font-bold border border-red-100">
                {errorMessage}
              </div>
            </div>

            <Link
              href="/login"
              className="w-full py-5 bg-gray-50 text-secondary font-black rounded-2xl border border-gray-100 hover:bg-gray-100 transition-all text-xs uppercase tracking-widest"
            >
              Back to Sign In
            </Link>

            <p className="text-xs text-gray-400 font-medium italic">
              Try logging in to request a fresh verification link.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
