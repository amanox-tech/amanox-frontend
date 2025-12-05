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

        // Redirect after 5 seconds on success (matching your logic)
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
    <div className="min-h-screen w-full flex items-center justify-center bg-[#0a0a0a] font-sans relative overflow-hidden px-4">
      {/* --- BACKGROUND ANIMATION (Matches OTP & Register) --- */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[20%] right-[20%] w-[500px] h-[500px] bg-primary opacity-20 blur-[120px] rounded-full animate-blob"></div>
        <div className="absolute bottom-[20%] left-[20%] w-[500px] h-[500px] bg-blue-600 opacity-20 blur-[120px] rounded-full animate-blob animation-delay-2000"></div>

        {/* Energy Flow Texture */}
        <div className="absolute inset-0 bg-[url('/energy-flow.svg')] bg-repeat opacity-10 animate-energy-flow"></div>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03]"></div>
      </div>

      {/* --- GLASS CARD --- */}
      <div className="w-full max-w-md p-10 bg-secondary/40 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-[0_0_50px_rgba(0,0,0,0.5)] relative z-10 flex flex-col items-center text-center">
        {/* --- LOADING STATE --- */}
        {loading && (
          <div className="animate-in fade-in zoom-in duration-500 flex flex-col items-center">
            {/* Spinning Glow Ring */}
            <div className="relative w-20 h-20 mb-8 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border-t-2 border-l-2 border-primary animate-spin"></div>
              <div className="absolute inset-2 rounded-full border-r-2 border-b-2 border-blue-500/50 animate-spin-reverse-slow"></div>
              <svg
                className="w-8 h-8 text-primary animate-pulse"
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

            <h2 className="text-2xl font-bold text-white mb-3">
              Verifying Link
            </h2>
            <p className="text-gray-400">
              Please wait while we secure your connection...
            </p>
          </div>
        )}

        {/* --- SUCCESS STATE --- */}
        {!loading && successMessage && (
          <div className="animate-in fade-in zoom-in duration-500 flex flex-col items-center">
            {/* Success Icon with Glow */}
            <div className="w-24 h-24 mb-8 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center shadow-[0_0_40px_rgba(24,203,150,0.4)] relative">
              <div className="absolute inset-0 rounded-full border border-primary/30 animate-ping opacity-20"></div>
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

            <h2 className="text-2xl font-bold text-white mb-2">
              Email Verified!
            </h2>
            <p className="text-gray-300 mb-8 leading-relaxed">
              {successMessage}
            </p>

            <div className="w-full space-y-4">
              <Link
                href="/login"
                className="block w-full py-4 bg-primary hover:bg-primary-dark text-secondary font-bold rounded-xl shadow-[0_0_20px_rgba(24,203,150,0.2)] hover:shadow-[0_0_30px_rgba(24,203,150,0.4)] hover:-translate-y-0.5 transition-all duration-300"
              >
                Go to Login Now
              </Link>
              <p className="text-xs text-gray-500 uppercase tracking-widest">
                Redirecting automatically in 5s...
              </p>
            </div>
          </div>
        )}

        {/* --- ERROR STATE --- */}
        {!loading && errorMessage && (
          <div className="animate-in fade-in zoom-in duration-500 flex flex-col items-center w-full">
            {/* Error Icon with Red Glow */}
            <div className="w-24 h-24 mb-8 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center shadow-[0_0_40px_rgba(239,68,68,0.3)]">
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

            <h2 className="text-2xl font-bold text-white mb-2">
              Verification Failed
            </h2>
            <div className="bg-red-500/10 border border-red-500/20 px-4 py-3 rounded-xl mb-8 w-full">
              <p className="text-red-400 font-medium text-sm">{errorMessage}</p>
            </div>

            <div className="space-y-4 w-full">
              <Link
                href="/login"
                className="block w-full py-4 bg-white/10 hover:bg-white/20 text-white border border-white/10 rounded-xl font-bold transition-all duration-300"
              >
                Back to Login
              </Link>
              <p className="text-xs text-gray-500">
                The link may have expired. Try logging in to request a new one.
              </p>
            </div>
          </div>
        )}
      </div>

      <style jsx global>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 10s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }

        @keyframes energy-flow {
          0% {
            background-position: 0% 0%;
          }
          100% {
            background-position: 100% 100%;
          }
        }
        .animate-energy-flow {
          background-image: linear-gradient(
            45deg,
            transparent 45%,
            rgba(24, 203, 150, 0.05) 50%,
            transparent 55%
          );
          background-size: 60px 60px;
          animation: energy-flow 10s linear infinite;
        }

        @keyframes spin-reverse {
          from {
            transform: rotate(360deg);
          }
          to {
            transform: rotate(0deg);
          }
        }
        .animate-spin-reverse-slow {
          animation: spin-reverse 3s linear infinite;
        }
      `}</style>
    </div>
  );
}
