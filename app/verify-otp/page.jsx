"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AppData } from "@/context/appContext";
import api from "@/lib/axiosClient";

const VerifyOtpPage = () => {
  const [otp, setOtp] = useState("");
  const [btnLoading, setBtnLoading] = useState(false);

  const router = useRouter();
  const { setIsAuth, setUser } = AppData();

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

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={submitHandler}
        className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg"
      >
        <h2 className="text-xl font-semibold text-gray-900 mb-6 text-center">
          Verify OTP
        </h2>

        {/* OTP FIELD */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Enter OTP
          </label>
          <input
            type="number"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-300 outline-none"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
          />
        </div>

        {/* BUTTON */}
        <button
          className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition disabled:opacity-70"
          disabled={btnLoading}
        >
          {btnLoading ? "Verifying..." : "Verify OTP"}
        </button>

        <p className="text-center text-sm text-gray-600 mt-4">
          Want to login again?{" "}
          <Link href="/login" className="text-indigo-600 hover:underline">
            Go To Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default VerifyOtpPage;
