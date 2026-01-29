"use client";

import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AppData } from "@/context/appContext";
import api from "@/lib/axiosClient";

const VerifyOtpPage = () => {
  const [otp, setOtp] = useState("");
  const [btnLoading, setBtnLoading] = useState(false);
  const [cooldown, setCooldown] = useState(0);

  const router = useRouter();
  const { setIsAuth, setUser } = AppData();

  useEffect(() => {
    const email = localStorage.getItem("email");
    if (!email) {
      router.push("/login");
    }
  }, [router]);

  const submitHandler = async (e) => {
    e.preventDefault();
    setBtnLoading(true);

    const email = localStorage.getItem("email");
    if (!email) {
      toast.error("Session expired. Please login again.");
      router.push("/login");
      return;
    }

    try {
      const { data } = await api.post("/api/v1/auth/verify", { email, otp });
      toast.success(data.message);
      localStorage.removeItem("email");
      setIsAuth(true);
      setUser(data.user);
      router.push("/dashboard");
    } catch (error) {
      toast.error(error?.response?.data?.message || "OTP verification failed");
    } finally {
      setBtnLoading(false);
    }
  };

  const resendOtp = async () => {
    try {
      const email = localStorage.getItem("email");
      const { data } = await api.post("/api/v1/auth/resend-otp", { email });
      toast.success(data.message);

      setCooldown(60);
      const interval = setInterval(() => {
        setCooldown((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Unable to resend code");
    }
  };

  return (
    <div className="min-h-screen w-full flex font-sans bg-white pt-15 overflow-hidden selection:bg-primary/20">
      {/* LEFT SIDE - FORM */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center px-6 lg:px-24 py-12 bg-white text-secondary relative z-20">
        <div className="w-full max-w-[440px]">
          {/* Header */}
          <div className="mb-10 text-center lg:text-left">
            <h1 className="text-4xl font-black tracking-tighter text-secondary mb-3 leading-none">
              Check Your Inbox
            </h1>
            <p className="text-gray-500 text-lg font-medium">
              We sent a 6-digit code to verify your account.
            </p>
          </div>

          <form onSubmit={submitHandler} className="space-y-8">
            {/* OTP Input */}
            <div className="group space-y-3">
              <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-1">
                Verification Code
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                  <svg
                    className="h-5 w-5 text-gray-300 group-focus-within:text-primary transition-colors duration-300"
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
                  type="text"
                  inputMode="numeric"
                  maxLength={6}
                  className="w-full pl-12 pr-4 py-5 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all duration-300 font-black text-3xl text-secondary tracking-[0.4em] text-center placeholder-gray-200"
                  placeholder="000000"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Verify Button */}
            <button
              disabled={btnLoading}
              className="w-full bg-secondary hover:bg-black text-white font-black py-4 rounded-2xl shadow-xl shadow-secondary/20 hover:-translate-y-1 transition-all duration-500 disabled:opacity-70 flex justify-center items-center gap-2"
            >
              {btnLoading ? (
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
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              ) : (
                "Verify & Enter Dashboard"
              )}
            </button>

            {/* Resend Logic */}
            <div className="flex flex-col items-center gap-6 mt-8">
              <button
                type="button"
                onClick={resendOtp}
                disabled={cooldown > 0}
                className={`text-xs font-black uppercase tracking-widest transition-all ${cooldown > 0 ? "text-gray-300" : "text-primary hover:opacity-80"}`}
              >
                {cooldown > 0
                  ? `Resend code in ${cooldown}s`
                  : "Didn't get it? Resend Code"}
              </button>

              <div className="w-12 h-0.5 bg-gray-100 rounded-full"></div>

              <Link
                href="/login"
                className="text-xs font-black text-gray-400 hover:text-secondary uppercase tracking-widest transition-colors flex items-center gap-2"
              >
                ← Back to Login
              </Link>
            </div>
          </form>
        </div>
      </div>

      {/* RIGHT SIDE - BRANDING */}
      <div className="hidden lg:flex lg:w-1/2 bg-secondary relative overflow-hidden items-center justify-center p-16">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5"></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-size-[40px_40px]"></div>

        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[40%] left-[-20%] w-[150%] h-0.5 bg-linear-to-r from-transparent via-primary/20 to-transparent animate-flow-fast"></div>
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
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
              />
            </svg>
          </div>

          <h2 className="text-6xl font-black leading-[0.95] mb-8 tracking-tighter">
            Total Data <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-primary via-emerald-400 to-teal-500">
              Protection.
            </span>
          </h2>
          <p className="text-gray-400 text-xl leading-relaxed font-medium">
            We use bank-grade security and two-factor checks to ensure only you
            can access your career profile and AI audit results.
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
};

export default VerifyOtpPage;
