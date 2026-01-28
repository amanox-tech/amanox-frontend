"use client";

import { useState } from "react";
import { toast } from "react-hot-toast";
import Link from "next/link";
import { useRouter } from "next/navigation";
import api from "@/lib/axiosClient";
import GoogleLoginButton from "@/components/GoogleLoginButton";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [btnLoading, setBtnLoading] = useState(false);

  const router = useRouter();

  const submitHandler = async (e) => {
    e.preventDefault();
    setBtnLoading(true);

    try {
      const { data } = await api.post("/api/v1/auth/login", {
        email,
        password,
      });
      toast.success(data.message);

      localStorage.setItem("email", email);
      router.push("/verify-otp");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Login failed");
    } finally {
      setBtnLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex font-sans bg-white pt-15 overflow-hidden">
      {/* LEFT SIDE - FORM */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center px-6 lg:px-24 py-12 bg-white text-secondary relative z-20">
        <div className="w-full max-w-[440px]">
          {/* Header */}
          <div className="mb-10 text-center lg:text-left">
            <h1 className="text-4xl font-black tracking-tighter text-secondary mb-3">
              Welcome back
            </h1>
            <p className="text-gray-500 text-lg font-medium">
              Log in to access your Premium AI Audit.
            </p>
          </div>

          {/* Google Login Wrapper */}
          <div className="w-full mb-8">
            <GoogleLoginButton />
          </div>

          {/* Divider */}
          <div className="relative flex items-center justify-center mb-8">
            <div className="border-t border-gray-100 w-full"></div>
            <span className="bg-white px-4 text-xs text-gray-400 uppercase tracking-[0.2em] font-black">
              or
            </span>
            <div className="border-t border-gray-100 w-full"></div>
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

            {/* Password Field */}
            <div className="group space-y-2">
              <div className="flex justify-between items-center ml-1">
                <label className="text-xs font-black uppercase tracking-widest text-gray-400">
                  Password
                </label>
                <Link
                  href="/forgot-password"
                  className="text-xs font-bold text-primary hover:opacity-80 transition-opacity"
                >
                  Forgot password?
                </Link>
              </div>
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
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </div>
                <input
                  type="password"
                  className="w-full pl-11 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all duration-300 font-bold text-secondary placeholder-gray-300"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              disabled={btnLoading}
              className="w-full bg-secondary hover:bg-black text-white font-black py-4 rounded-2xl shadow-xl shadow-secondary/20 hover:shadow-primary/10 hover:-translate-y-1 transition-all duration-500 disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center gap-2"
            >
              {btnLoading ? (
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
                  <span>Processing...</span>
                </>
              ) : (
                "Sign In"
              )}
            </button>

            {/* Footer */}
            <p className="text-center text-gray-400 mt-8 font-medium">
              Don&apos;t have an account?{" "}
              <Link
                href="/register"
                className="text-primary hover:opacity-80 font-black transition-opacity"
              >
                Create Account
              </Link>
            </p>
          </form>
        </div>
      </div>

      {/* RIGHT SIDE - BRANDING (Updated Copy) */}
      <div className="hidden lg:flex lg:w-1/2 bg-secondary relative overflow-hidden items-center justify-center p-16">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5"></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-size-[40px_40px]"></div>

        {/* Neural Beams Flow */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[30%] left-[-20%] w-[150%] h-0.5 bg-linear-to-r from-transparent via-primary/20 to-transparent animate-flow-fast"></div>
          <div className="absolute top-[70%] left-[-20%] w-[150%] h-px bg-linear-to-r from-transparent via-primary/10 to-transparent animate-flow-slow delay-1000"></div>
        </div>

        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-primary/10 blur-[120px] rounded-full translate-x-1/4 translate-y-1/4"></div>

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
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
          </div>

          <h2 className="text-6xl font-black leading-[0.95] mb-8 tracking-tighter">
            Unlock the world&apos;s <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-primary via-emerald-400 to-teal-500">
              Smartest AI Audit.
            </span>
          </h2>
          <p className="text-gray-400 text-xl leading-relaxed font-medium">
            Join the elite tier of candidates. One secure login gives you access
            to Amanox Pro Intelligence—the most precise resume audit engine ever
            built.
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
          animation: flow 4s linear infinite;
        }
        .animate-flow-slow {
          animation: flow 8s linear infinite;
        }
        .delay-1000 {
          animation-delay: 1000ms;
        }
      `}</style>
    </div>
  );
};

export default LoginPage;
