"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { toast } from "react-hot-toast";
import api from "@/lib/axiosClient";
import Link from "next/link";

export default function ResetPasswordPage() {
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data } = await api.post("/api/v1/auth/reset-password", {
        token,
        password,
      });

      toast.success(data.message);
      router.push("/login");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Unable to reset password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex font-sans bg-white pt-15 overflow-hidden selection:bg-primary/20">
      {/* --- LEFT SIDE - FORM --- */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center px-6 lg:px-24 py-12 bg-white text-secondary relative z-20">
        <div className="w-full max-w-[440px]">
          {/* Header */}
          <div className="mb-10 text-center lg:text-left">
            <h1 className="text-4xl font-black tracking-tighter text-secondary mb-3 leading-none">
              Reset Password
            </h1>
            <p className="text-gray-500 text-lg font-medium">
              Create a new, strong password to secure your Amanox account.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={submitHandler} className="space-y-8">
            {/* Password Field */}
            <div className="group space-y-3">
              <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-1">
                New Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                  <svg
                    className="h-5 w-5 text-gray-300 group-focus-within:text-primary transition-colors duration-300"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </div>
                <input
                  type="password"
                  className="w-full pl-12 pr-4 py-5 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all duration-300 font-bold text-secondary placeholder-gray-200"
                  placeholder="At least 8 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              disabled={loading}
              className="w-full bg-secondary hover:bg-black text-white font-black py-4 rounded-2xl shadow-xl shadow-secondary/20 hover:-translate-y-1 transition-all duration-500 disabled:opacity-70 flex justify-center items-center gap-2"
            >
              {loading ? (
                <svg
                  className="animate-spin h-5 w-5 text-primary"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
              ) : (
                "Update Password"
              )}
            </button>

            {/* Back Link */}
            <div className="text-center mt-8">
              <Link
                href="/login"
                className="inline-flex items-center gap-2 text-xs font-black text-gray-400 hover:text-primary uppercase tracking-widest transition-all group"
              >
                <svg
                  className="w-4 h-4 group-hover:-translate-x-1 transition-transform"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
                Cancel & Login
              </Link>
            </div>
          </form>
        </div>
      </div>

      {/* --- RIGHT SIDE - BRANDING --- */}
      <div className="hidden lg:flex lg:w-1/2 bg-secondary relative overflow-hidden items-center justify-center p-16">
        {/* Tech Grid Overlay */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5"></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-size-[40px_40px]"></div>

        {/* Neural Flow Animation */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[40%] left-[-20%] w-[150%] h-0.5 bg-linear-to-r from-transparent via-primary/20 to-transparent animate-flow-fast"></div>
        </div>

        {/* Glow Aura */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/10 blur-[120px] rounded-full translate-x-1/4 -translate-y-1/4"></div>

        <div className="relative z-10 max-w-lg text-white">
          <div className="mb-10 inline-flex items-center justify-center w-20 h-20 rounded-4xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl">
            <svg
              className="w-10 h-10 text-primary animate-pulse"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>

          <h2 className="text-6xl font-black leading-[0.95] mb-8 tracking-tighter">
            Security <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-primary via-emerald-400 to-teal-500">
              Restored.
            </span>
          </h2>
          <p className="text-gray-400 text-xl leading-relaxed font-medium">
            Your account safety is our priority. Set your new password to get
            back to optimizing your career with Amanox Pro Intelligence.
          </p>
        </div>
      </div>

      <style jsx global>{`
        @keyframes flow {
          0% {
            transform: translateX(-100%);
            opacity: 0;
          }
          40% {
            opacity: 1;
          }
          100% {
            transform: translateX(100%);
            opacity: 0;
          }
        }
        .animate-flow-fast {
          animation: flow 5s linear infinite;
        }
      `}</style>
    </div>
  );
}
