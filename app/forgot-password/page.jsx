"use client";

import { useState } from "react";
import { toast } from "react-hot-toast";
import api from "@/lib/axiosClient";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data } = await api.post("/api/v1/auth/forgot-password", {
        email,
      });

      toast.success(data.message);
      router.push("/login");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
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
            <h1 className="text-4xl font-black tracking-tighter text-secondary mb-3">
              Forgot Password?
            </h1>
            <p className="text-gray-500 text-lg font-medium">
              Don&apos;t worry. Enter your email and we&apos;ll help you get
              back in.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={submitHandler} className="space-y-6">
            {/* Email Field */}
            <div className="group space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-1">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
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
                      d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                    />
                  </svg>
                </div>
                <input
                  type="email"
                  className="w-full pl-11 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all duration-300 font-bold text-secondary placeholder-gray-300"
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              disabled={loading}
              className="w-full bg-secondary hover:bg-black text-white font-black py-4 rounded-2xl shadow-xl shadow-secondary/20 hover:shadow-primary/10 hover:-translate-y-1 transition-all duration-500 disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center gap-2"
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
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  <span>Sending...</span>
                </>
              ) : (
                "Send Reset Link"
              )}
            </button>

            {/* Back to Login */}
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
                Back to Login
              </Link>
            </div>
          </form>
        </div>
      </div>

      {/* --- RIGHT SIDE - BRANDING --- */}
      <div className="hidden lg:flex lg:w-1/2 bg-secondary relative overflow-hidden items-center justify-center p-16">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5"></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-size-[40px_40px]"></div>

        {/* Neural Pulse Animation */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[30%] left-[-20%] w-[150%] h-px bg-linear-to-r from-transparent via-primary/20 to-transparent animate-flow-fast"></div>
          <div className="absolute top-[70%] left-[-20%] w-[150%] h-px bg-linear-to-r from-transparent via-primary/10 to-transparent animate-flow-slow delay-1000"></div>
        </div>

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
                d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
              />
            </svg>
          </div>

          <h2 className="text-6xl font-black leading-[0.95] mb-8 tracking-tighter">
            Secure <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-primary via-emerald-400 to-teal-500">
              Recovery.
            </span>
          </h2>
          <p className="text-gray-400 text-xl leading-relaxed font-medium">
            We use advanced security protocols to protect your career data.
            Confirm your email to reset your Amanox Pro password.
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
        .animate-flow-slow {
          animation: flow 10s linear infinite;
        }
        .delay-1000 {
          animation-delay: 1000ms;
        }
      `}</style>
    </div>
  );
}
