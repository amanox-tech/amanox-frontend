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

    const verifyEmailFunction = async () => {
      try {
        const { data } = await api.post(`/api/v1/auth/verify/${token}`);
        setSuccessMessage(data.message);

        // Redirect after 3 seconds on success
        setTimeout(() => {
          router.push("/login");
        }, 5000);
      } catch (error) {
        const msg =
          error?.response?.data?.message ||
          "Verification link expired or invalid";
        setErrorMessage(msg);
      } finally {
        setLoading(false);
      }
    };

    verifyEmailFunction();
  }, [token, router]);

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-white font-sans relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-primary/10 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[100px]"></div>
      </div>

      {/* Main Card */}
      <div className="w-full max-w-md p-10 bg-white border border-gray-100 rounded-2xl shadow-xl relative z-10 flex flex-col items-center text-center">
        {/* --- LOADING STATE --- */}
        {loading && (
          <>
            <div className="w-16 h-16 mb-6 rounded-full bg-primary/10 flex items-center justify-center">
              <svg
                className="animate-spin h-8 w-8 text-primary"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-secondary mb-2">
              Verifying Link
            </h2>
            <p className="text-gray-500">
              Please wait while we verify your email...
            </p>
          </>
        )}

        {/* --- SUCCESS STATE --- */}
        {!loading && successMessage && (
          <div className="animate-in fade-in zoom-in duration-500 flex flex-col items-center">
            <div className="w-20 h-20 mb-6 rounded-full bg-green-50 flex items-center justify-center shadow-[0_0_20px_rgba(24,203,150,0.3)]">
              <svg
                className="w-10 h-10 text-primary"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={3}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-secondary mb-2">
              Email Verified!
            </h2>
            <p className="text-gray-500 mb-6">{successMessage}</p>
            <p className="text-sm text-gray-400">
              Redirecting to login in 3 seconds...
            </p>

            <Link
              href="/login"
              className="mt-6 px-6 py-2 bg-secondary text-white rounded-full text-sm font-bold hover:shadow-lg transition-all"
            >
              Go to Login Now
            </Link>
          </div>
        )}

        {/* --- ERROR STATE --- */}
        {!loading && errorMessage && (
          <div className="animate-in fade-in zoom-in duration-500 flex flex-col items-center">
            <div className="w-20 h-20 mb-6 rounded-full bg-red-50 flex items-center justify-center">
              <svg
                className="w-10 h-10 text-red-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Verification Failed
            </h2>
            <p className="text-red-500 font-medium mb-6 bg-red-50 px-4 py-2 rounded-lg">
              {errorMessage}
            </p>

            <div className="space-y-3 w-full">
              <Link
                href="/login"
                className="block w-full py-3 bg-secondary text-white rounded-xl font-bold hover:bg-[#232530] transition-colors"
              >
                Back to Login
              </Link>
              <p className="text-xs text-gray-400">
                The link may have expired. Try logging in to request a new one.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
