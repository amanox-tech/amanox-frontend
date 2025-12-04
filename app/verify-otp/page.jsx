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

  // Check if email exists on mount
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
      if (!email) {
        toast.error("Session expired. Please login again.");
        router.push("/login");
        return;
      }

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
      toast.error(error?.response?.data?.message || "Unable to resend OTP");
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-white font-sans relative overflow-hidden">
      {/* Background Decoration (Subtle Amanox Glow) */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-primary/10 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[100px]"></div>
      </div>

      {/* Main Card */}
      <div className="w-full max-w-md p-8 bg-white border border-gray-100 rounded-2xl shadow-xl relative z-10">
        {/* Header Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center">
            <svg
              className="w-8 h-8 text-primary"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
              />
            </svg>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-center text-secondary mb-2">
          Verify Identity
        </h2>
        <p className="text-center text-gray-500 mb-8 text-sm">
          Enter the OTP sent to your email address.
        </p>

        <form onSubmit={submitHandler} className="space-y-6">
          {/* OTP Input - Styled to look like a code field */}
          <div className="relative">
            <input
              type="text"
              inputMode="numeric"
              maxLength={6}
              className="w-full h-14 text-center text-2xl tracking-[0.5em] font-bold text-secondary border border-gray-300 rounded-xl focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all placeholder-gray-300"
              placeholder="000000"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            />
          </div>

          {/* Verify Button */}
          <button
            disabled={btnLoading}
            className="w-full bg-secondary hover:bg-[#232530] text-white font-bold py-3.5 rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center gap-2"
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
                <span>Verifying...</span>
              </>
            ) : (
              "Confirm & Login"
            )}
          </button>

          {/* Resend Logic */}
          <div className="text-center mt-6">
            <button
              type="button"
              onClick={resendOtp}
              disabled={cooldown > 0}
              className={`text-sm font-medium transition-colors ${
                cooldown > 0
                  ? "text-gray-400 cursor-not-allowed"
                  : "text-primary hover:text-primary-dark"
              }`}
            >
              {cooldown > 0 ? (
                <span className="flex items-center gap-2">
                  <svg
                    className="w-4 h-4 animate-spin"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  Resend code in {cooldown}s
                </span>
              ) : (
                "Resend Code"
              )}
            </button>
          </div>
        </form>

        <div className="mt-8 pt-6 border-t border-gray-100 text-center">
          <Link
            href="/login"
            className="text-sm font-medium text-gray-500 hover:text-secondary transition-colors"
          >
            ← Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default VerifyOtpPage;
