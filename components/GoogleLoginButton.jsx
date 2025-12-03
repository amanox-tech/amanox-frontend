/* eslint-disable @next/next/no-before-interactive-script-outside-document */
"use client";

import Script from "next/script";
import { useEffect, useRef } from "react";
import api from "@/lib/axiosClient";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const GoogleLoginButton = () => {
  const router = useRouter();
  const googleBtnRef = useRef(null);

  const handleCallback = async (response) => {
    try {
      const idToken = response.credential;

      const { data } = await api.post("/api/v1/auth/google", { idToken });

      toast.success(data.message);

      router.push("/dashboard");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Google login failed");
    }
  };

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      window.google &&
      googleBtnRef.current
    ) {
      window.google.accounts.id.initialize({
        client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
        callback: handleCallback,
      });

      window.google.accounts.id.renderButton(googleBtnRef.current, {
        theme: "outline",
        size: "large",
        width: 340,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Script
        src="https://accounts.google.com/gsi/client"
        strategy="beforeInteractive"
      />

      <div
        ref={googleBtnRef}
        className="flex justify-center my-4 min-h-[50px]"
      />
    </>
  );
};

export default GoogleLoginButton;
