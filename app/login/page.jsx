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
    <div className="min-h-screen w-full flex font-sans bg-white pt-15">
      {/* LEFT SIDE - FORM */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center px-6 lg:px-24 py-12 bg-white text-secondary relative z-10">
        <div className="w-full max-w-[440px]">
          {/* Header */}
          <div className="mb-10 text-center lg:text-left">
            <h1 className="text-4xl font-bold tracking-tight text-secondary mb-3">
              Welcome back
            </h1>
            <p className="text-gray-500 text-lg">
              Log in to continue your journey with Amanox.
            </p>
          </div>

          {/* Google Login Wrapper */}
          <div className="w-full mb-8">
            <GoogleLoginButton />
          </div>

          {/* Divider */}
          <div className="relative flex items-center justify-center mb-8">
            <div className="border-t border-gray-200 w-full"></div>
            <span className="bg-white px-4 text-sm text-gray-400 uppercase tracking-wider font-medium">
              or
            </span>
            <div className="border-t border-gray-200 w-full"></div>
          </div>

          {/* Form */}
          <form onSubmit={submitHandler} className="space-y-6">
            {/* Email Field */}
            <div className="group space-y-2">
              <label className="text-sm font-semibold text-gray-700 ml-1">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  {/* Icon turns Turquoise on focus */}
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
                      d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                    />
                  </svg>
                </div>
                <input
                  type="email"
                  className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all duration-300 font-medium text-gray-800 placeholder-gray-400"
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
                <label className="text-sm font-semibold text-gray-700">
                  Password
                </label>
                <Link
                  href="/forgot-password"
                  className="text-sm font-medium text-primary hover:text-primary-dark transition-colors"
                >
                  Forgot password?
                </Link>
              </div>
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

            {/* Submit Button - Uses Dark Grey Blue for solid contrast, looks premium */}
            <button
              disabled={btnLoading}
              className="w-full bg-secondary hover:bg-[#232530] text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center gap-2"
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
            <p className="text-center text-gray-500 mt-6 font-medium">
              Don&apos;t have an account?{" "}
              <Link
                href="/register"
                className="text-primary hover:text-primary-dark font-bold transition-colors"
              >
                Create Account
              </Link>
            </p>
          </form>
        </div>
      </div>

      {/* RIGHT SIDE - BRANDING */}
      {/* Explicitly using the Dark Grey Blue (#373643) */}
      <div className="hidden lg:flex lg:w-1/2 bg-secondary relative overflow-hidden items-center justify-center p-12">
        {/* Abstract Background Shapes (Using Turquoise #18cb96) */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary opacity-20 blur-[120px] rounded-full translate-x-1/3 -translate-y-1/4"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-primary/30 opacity-20 blur-[100px] rounded-full -translate-x-1/4 translate-y-1/4"></div>

        {/* Content Card */}
        <div className="relative z-10 max-w-lg text-white">
          <div className="mb-8 inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10">
            <div className="w-8 h-8 rounded-full bg-primary shadow-[0_0_20px_rgba(24,203,150,0.6)]"></div>
          </div>

          <h2 className="text-5xl font-bold leading-tight mb-6">
            Redefine your <br />
            <span className="text-primary">Professional Identity.</span>
          </h2>
          <p className="text-gray-300 text-xl leading-relaxed opacity-90">
            Join thousands of professionals using Amanox AI to craft world-class
            resumes and unlock new career opportunities.
          </p>

          <div className="mt-12 p-6 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 flex items-center gap-4">
            <div className="flex -space-x-3">
              <div className="w-10 h-10 rounded-full bg-gray-300 border-2 border-secondary"></div>
              <div className="w-10 h-10 rounded-full bg-gray-400 border-2 border-secondary"></div>
              <div className="w-10 h-10 rounded-full bg-gray-500 border-2 border-secondary flex items-center justify-center text-xs font-bold text-secondary">
                +2k
              </div>
            </div>
            <div>
              <p className="font-bold text-white">Trusted Community</p>
              <p className="text-xs text-primary">Joining is free & easy</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
