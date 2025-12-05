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

        setTimeout(() => router.push("/login"), 5000);
      } catch (error) {
        const msg =
          error?.response?.data?.message ||
          "Verification link expired or invalid.";
        setErrorMessage(msg);
      } finally {
        setLoading(false);
      }
    };

    verifyEmail();
  }, [token, router]);

  return (
    <div className="min-h-screen bg-linear-to-b from-white to-gray-50 flex items-center justify-center px-4 font-sans">
      {/* Subtle top gradient bar like Navbar/Footer */}
      <div className="absolute top-0 left-0 w-full h-0.5 bg-linear-to-r from-transparent via-primary to-transparent opacity-40"></div>

      {/* CARD */}
      <div className="relative w-full max-w-md bg-white border border-gray-200 rounded-3xl shadow-lg p-10 animate-in fade-in duration-300">
        {/* LOADING */}
        {loading && (
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="relative w-14 h-14 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border-t-2 border-primary animate-spin"></div>
              <svg
                className="w-6 h-6 text-primary"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>

            <h2 className="text-xl font-bold text-secondary">
              Verifying Your Email...
            </h2>
            <p className="text-gray-500 text-sm">
              Please wait while we complete the verification.
            </p>
          </div>
        )}

        {/* SUCCESS */}
        {!loading && successMessage && (
          <div className="flex flex-col items-center text-center space-y-6 animate-in fade-in duration-300">
            {/* Success Icon */}
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20 shadow-[0_0_20px_rgba(24,203,150,0.15)]">
              <svg
                className="w-10 h-10 text-primary"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={3}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-secondary mb-2">
                Email Verified!
              </h2>
              <p className="text-gray-600 text-sm leading-relaxed">
                {successMessage}
              </p>
            </div>

            <Link
              href="/login"
              className="w-full py-3 bg-primary hover:bg-[#13b985] text-white font-bold rounded-xl transition-all duration-300 shadow-md hover:shadow-lg"
            >
              Go to Login
            </Link>

            <p className="text-xs text-gray-500 uppercase tracking-wider">
              Redirecting automatically in 5 seconds…
            </p>
          </div>
        )}

        {/* ERROR */}
        {!loading && errorMessage && (
          <div className="flex flex-col items-center text-center space-y-6 animate-in fade-in duration-300">
            {/* Error Icon */}
            <div className="w-20 h-20 rounded-full bg-red-50 flex items-center justify-center border border-red-200 shadow-sm">
              <svg
                className="w-10 h-10 text-red-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>

            <div className="w-full">
              <h2 className="text-2xl font-bold text-secondary mb-2">
                Verification Failed
              </h2>

              <div className="bg-red-50 border border-red-200 text-red-600 text-sm p-4 rounded-xl mb-4">
                {errorMessage}
              </div>
            </div>

            <Link
              href="/login"
              className="w-full py-3 bg-gray-100 hover:bg-gray-200 text-secondary font-semibold rounded-xl transition-all duration-300 border border-gray-200"
            >
              Back to Login
            </Link>

            <p className="text-xs text-gray-500">
              The link may have expired. Try logging in to request a new one.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
