"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Loading from "@/components/loading";
import api from "../../../lib/axiosClient";

export default function VerifyEmailPage() {
  const { token } = useParams();
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (!token) return;

    const verifyEmailFunction = async () => {
      try {
        const { data } = await api.post(`/api/v1/auth/verify/${token}`);
        setSuccessMessage(data.message);

        // Redirect after 3 seconds on success
        setTimeout(() => {
          router.push("/login");
        }, 3000);
      } catch (error) {
        const msg =
          error?.response?.data?.message ||
          "Verification link expired or invalid";
        setErrorMessage(msg);

        // Redirect after 3 seconds on failure
        setTimeout(() => {
          router.push("/login");
        }, 3000);
      } finally {
        setLoading(false);
      }
    };

    verifyEmailFunction();
  }, [token, router]);

  if (loading) return <Loading />;

  return (
    <div className="w-[300px] m-auto mt-32 text-center">
      {successMessage && (
        <p className="text-green-500 text-xl">{successMessage}</p>
      )}

      {errorMessage && <p className="text-red-500 text-xl">{errorMessage}</p>}
    </div>
  );
}
