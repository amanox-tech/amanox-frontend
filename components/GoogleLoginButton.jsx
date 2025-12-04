"use client";

import Script from "next/script";
import { useEffect, useRef, useState, useCallback } from "react";
import api from "@/lib/axiosClient";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { AppData } from "@/context/appContext";

const GoogleLoginButton = () => {
  const router = useRouter();
  const { fetchUser } = AppData();
  const googleBtnRef = useRef(null);
  const [scriptLoaded, setScriptLoaded] = useState(false);

  // FIXED: Wrapped in useCallback to satisfy ESLint and stabilize the function
  const handleCallback = useCallback(
    async (response) => {
      try {
        const idToken = response.credential;
        const { data } = await api.post("/api/v1/auth/google", { idToken });

        toast.success(data.message);

        // Update global state immediately
        await fetchUser();

        router.push("/dashboard");
      } catch (error) {
        toast.error(error?.response?.data?.message || "Google login failed");
      }
    },
    [router, fetchUser],
  );

  useEffect(() => {
    // Only render if script is loaded, window.google exists, and we have the ref
    if (scriptLoaded && window.google && googleBtnRef.current) {
      const timeoutId = setTimeout(() => {
        try {
          // Initialize Google Auth
          window.google.accounts.id.initialize({
            client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
            callback: handleCallback,
          });

          // Render the button
          window.google.accounts.id.renderButton(googleBtnRef.current, {
            theme: "outline",
            size: "large",
            width: "100%",
            text: "continue_with",
            shape: "pill",
          });
        } catch (error) {
          console.error("Google button render error:", error);
        }
      }, 200);

      // Cleanup timeout if component unmounts
      return () => clearTimeout(timeoutId);
    }
  }, [scriptLoaded, handleCallback]);

  return (
    <>
      <Script
        src="https://accounts.google.com/gsi/client"
        strategy="lazyOnload"
        onLoad={() => setScriptLoaded(true)}
      />

      <div className="w-full flex justify-center mt-4">
        {/* FIXED: standard tailwind class min-h-11 (44px) */}
        <div ref={googleBtnRef} className="min-h-11 w-full" />
      </div>
    </>
  );
};

export default GoogleLoginButton;
