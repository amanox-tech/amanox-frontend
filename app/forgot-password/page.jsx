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
    <div className="min-h-screen w-full flex items-center justify-center bg-white font-sans relative overflow-hidden">
      {/* Background Decoration (Consistent with OTP Page) */}
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
                d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
              />
            </svg>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-center text-secondary mb-3">
          Forgot Password?
        </h2>

        <p className="text-center text-gray-500 mb-8 text-sm leading-relaxed px-4">
          Don&apos;t worry, it happens. Enter the email associated with your
          account and we&apos;ll send you a reset link.
        </p>

        <form onSubmit={submitHandler} className="space-y-6">
          {/* Email Field */}
          <div className="group space-y-2">
            <label className="text-sm font-semibold text-gray-700 ml-1">
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
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
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <input
                type="email"
                className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all duration-300 font-medium text-gray-800 placeholder-gray-400"
                placeholder="name@company.com"
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            disabled={loading}
            className="w-full bg-secondary hover:bg-[#232530] text-white font-bold py-3.5 rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center gap-2"
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
                <span>Sending Link...</span>
              </>
            ) : (
              "Send Reset Link"
            )}
          </button>
        </form>

        {/* Back to Login */}
        <div className="mt-8 pt-6 border-t border-gray-100 text-center">
          <Link
            href="/login"
            className="text-sm font-medium text-gray-500 hover:text-secondary transition-colors inline-flex items-center gap-2"
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
      </div>
    </div>
  );
}
