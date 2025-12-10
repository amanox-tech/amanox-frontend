"use client";

import { useCallback, useState } from "react";
import api from "@/lib/axiosClient";
import { toast } from "react-hot-toast";

const loadRazorpay = () =>
  new Promise((resolve) => {
    if (typeof window === "undefined") return resolve(false);

    if (window.Razorpay) return resolve(true);

    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });

export function usePayment({ fetchUser }) {
  const [coinHistory, setCoinHistory] = useState([]);
  const [paymentHistory, setPaymentHistory] = useState([]);

  const handlePurchase = useCallback(
    async (coins, user, onSuccess) => {
      try {
        const loaded = await loadRazorpay();
        if (!loaded) {
          toast.error("Failed to load payment gateway.");
          return;
        }

        const { data } = await api.post("/api/v1/payment/create-order", {
          coins,
        });

        const options = {
          key: data.keyId,
          amount: data.amount, // already in paise from backend
          currency: "INR",
          name: "Amanox",
          description: `Buy ${coins} coins`,
          order_id: data.orderId,
          redirect: false,
          prefill: {
            name: user?.name || "",
            email: user?.email || "",
          },
          theme: { color: "#2563EB" },
          handler: async (response) => {
            try {
              await api.post("/api/v1/payment/verify", {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              });

              toast.success("Payment successful! Coins added.");
              if (fetchUser) {
                await fetchUser();
              }
              if (onSuccess) {
                onSuccess();
              }
            } catch (err) {
              console.error("Payment verification failed:", err);
              toast.error("Payment verification failed.");
            }
          },
        };

        const razorpayObj = new window.Razorpay(options);

        razorpayObj.on("payment.failed", () => {
          toast.error("Payment failed.");
        });

        razorpayObj.open();
      } catch (err) {
        console.error(err);
        toast.error("Something went wrong. Try again.");
      }
    },
    [fetchUser],
  );

  const fetchCoinHistory = useCallback(async () => {
    try {
      const { data } = await api.get("/api/v1/payment/coins/history");
      setCoinHistory(data.coinHistory || []);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load coin history");
    }
  }, []);

  const fetchPaymentHistory = useCallback(async () => {
    try {
      const { data } = await api.get("/api/v1/payment/history");
      setPaymentHistory(data.paymentHistory || []);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load payment history");
    }
  }, []);

  return {
    handlePurchase,
    coinHistory,
    paymentHistory,
    fetchCoinHistory,
    fetchPaymentHistory,
  };
}
