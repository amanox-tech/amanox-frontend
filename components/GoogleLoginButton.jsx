"use client";

import Script from "next/script";
import { useEffect, useRef, useState, useCallback } from "react";
import api from "@/lib/axiosClient";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { AppData } from "@/context/appContext";

const GoogleLoginButton = () => {
  const router = useRouter();
  const { fetchUser } = AppData();
  const googleBtnRef = useRef(null);
  const [isReady, setIsReady] = useState(false);

  const handleCallback = useCallback(
    async (response) => {
      try {
        const idToken = response.credential;
        const { data } = await api.post("/api/v1/auth/google", { idToken });

        toast.success(data.message);
        await fetchUser();
        router.push("/dashboard");
      } catch (error) {
        toast.error(error?.response?.data?.message || "Google login failed");
      }
    },
    [router, fetchUser],
  );

  // Check if script is ALREADY loaded (Navigation case)
  useEffect(() => {
    if (typeof window !== "undefined" && window.google) {
      setIsReady(true);
    }
  }, []);

  // Render the button whenever isReady becomes true
  useEffect(() => {
    if (isReady && window.google && googleBtnRef.current) {
      // Small timeout to ensure DOM is painted
      const timeoutId = setTimeout(() => {
        try {
          window.google.accounts.id.initialize({
            client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
            callback: handleCallback,
          });

          window.google.accounts.id.renderButton(googleBtnRef.current, {
            theme: "outline",
            size: "large",
            width: "400", // Max width allowed by Google
            text: "continue_with",
            shape: "pill",
          });
        } catch (error) {
          console.error("Google button render error:", error);
        }
      }, 200);

      return () => clearTimeout(timeoutId);
    }
  }, [isReady, handleCallback]);

  return (
    <>
      <Script
        src="https://accounts.google.com/gsi/client"
        strategy="lazyOnload"
        onLoad={() => setIsReady(true)}
      />

      <div className="w-full flex justify-center mt-4">
        <div
          ref={googleBtnRef}
          className="min-h-11 flex justify-center w-full"
        />
      </div>
    </>
  );
};

export default GoogleLoginButton;
