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
    <div className="min-h-screen w-full flex font-sans bg-white pt-15 overflow-hidden">
      {/* --- LEFT SIDE - FORM --- */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center px-6 lg:px-24 py-12 bg-white text-secondary relative z-20">
        <div className="w-full max-w-[440px]">
          {/* Header */}
          <div className="mb-10 text-center lg:text-left">
            <h1 className="text-4xl font-bold tracking-tight text-secondary mb-3">
              Reset Password
            </h1>
            <p className="text-gray-500 text-lg">
              Create a new, strong password to secure your account.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={submitHandler} className="space-y-6">
            {/* Password Field */}
            <div className="group space-y-2">
              <label className="text-sm font-semibold text-gray-700 ml-1">
                New Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  {/* Lock Icon */}
                  <svg
                    className="h-5 w-5 text-gray-400 group-focus-within:text-primary transition-colors duration-300"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </div>
                <input
                  type="password"
                  className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all duration-300 font-medium text-gray-800 placeholder-gray-400"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              disabled={loading}
              className="w-full bg-secondary hover:bg-[#232530] text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center gap-2"
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5 text-primary"
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
                  <span>Updating...</span>
                </>
              ) : (
                "Set New Password"
              )}
            </button>

            {/* Back to Login */}
            <div className="text-center mt-6">
              <Link
                href="/login"
                className="inline-flex items-center gap-2 text-sm font-bold text-gray-400 hover:text-secondary transition-colors"
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
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
                Back to Login
              </Link>
            </div>
          </form>
        </div>
      </div>

      {/* --- RIGHT SIDE - BRANDING (DARK + ANIMATION) --- */}
      <div className="hidden lg:flex lg:w-1/2 bg-secondary relative overflow-hidden items-center justify-center p-12">
        {/* Dark Overlay/Grid */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5"></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-size-[40px_40px]"></div>

        {/* --- ANIMATION LAYER: Data Beams --- */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Beam 1 */}
          <div className="absolute top-[20%] left-[-20%] w-[150%] h-0.5 bg-linear-to-r from-transparent via-primary/30 to-transparent animate-flow-fast"></div>
          {/* Beam 2 */}
          <div className="absolute top-[40%] left-[-20%] w-[150%] h-px bg-linear-to-r from-transparent via-primary/20 to-transparent animate-flow-medium delay-700"></div>
          {/* Beam 3 */}
          <div className="absolute top-[60%] left-[-20%] w-[150%] h-[3px] bg-linear-to-r from-transparent via-primary/40 to-transparent animate-flow-slow delay-1000"></div>
          {/* Beam 4 */}
          <div className="absolute top-[80%] left-[-20%] w-[150%] h-px bg-linear-to-r from-transparent via-blue-400/20 to-transparent animate-flow-medium delay-300"></div>
        </div>

        {/* Glow Orb */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/20 blur-[120px] rounded-full translate-x-1/3 -translate-y-1/4"></div>

        {/* Content Card */}
        <div className="relative z-10 max-w-lg text-white">
          <div className="mb-8 inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 shadow-[0_0_40px_rgba(24,203,150,0.3)]">
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
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>

          <h2 className="text-5xl font-bold leading-tight mb-6 tracking-tight">
            Security <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-emerald-300">
              Restored.
            </span>
          </h2>
          <p className="text-gray-300 text-xl leading-relaxed opacity-90">
            Your account safety is our priority. Set your new credentials to get
            back on track.
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
          animation: flow 3s linear infinite;
        }
        .animate-flow-medium {
          animation: flow 5s linear infinite;
        }
        .animate-flow-slow {
          animation: flow 7s linear infinite;
        }
        .delay-300 {
          animation-delay: 300ms;
        }
        .delay-700 {
          animation-delay: 700ms;
        }
        .delay-1000 {
          animation-delay: 1000ms;
        }
      `}</style>
    </div>
  );
}
