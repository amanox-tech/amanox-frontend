"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import api from "@/api/axiosInstance";
import Loading from "@/components/loading";

export default function VerifyEmailPage() {
  const { token } = useParams();

  const [loading, setLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (!token) return;

    const verifyEmailFunction = async () => {
      try {
        const { data } = await api.post(`/api/v1/auth/verify/${token}`);
        setSuccessMessage(data.message);
        setTimeout(() => {
   router.push("/login");
   }, 2000);
      } catch (error) {
        const msg = error?.response?.data?.message || "Verification failed";
        setErrorMessage(msg);
      } finally {
        setLoading(false);
      }
    };

    verifyEmailFunction();
  }, [token]);

  if (loading) return <Loading />;

  return (
    <div className="w-[300px] m-auto mt-32 text-center">
      {successMessage && (
        <p className="text-green-500 text-xl">{successMessage}</p>
      )}

      {errorMessage && (
        <p className="text-red-500 text-xl">{errorMessage}</p>
      )}
    </div>
  );
}
