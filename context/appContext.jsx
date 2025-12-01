"use client";

import { createContext, useContext, useEffect, useState } from "react";
import api from "@/lib/axiosClient";
import { toast } from "react-toastify";

const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuth, setIsAuth] = useState(false);
  const [loading, setLoading] = useState(true); // start as true

  const fetchUser = async () => {
    try {
      const { data } = await api.get("/api/v1/user/me");
      setUser(data.user);
      setIsAuth(true);
    } catch {
      setUser(null);
      setIsAuth(false);
    } finally {
      setLoading(false);
    }
  };

  const logoutUser = async () => {
    try {
      const { data } = await api.post("/api/v1/auth/logout");
      toast.success(data.message);
      setIsAuth(false);
      setUser(null);
    } catch {
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    const pathname = window.location.pathname;

    const publicRoutes = [
      "/login",
      "/register",
      "/verify-otp",
      "/verify-email",
    ];
    const isPublic = publicRoutes.some((p) => pathname.startsWith(p));

    if (!isPublic) {
      fetchUser();
    } else {
      setLoading(false);
    }
  }, []);

  const value = {
    user,
    isAuth,
    loading,
    logoutUser,
    setUser,
    setIsAuth,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const AppData = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("AppData must be used within AppProvider");
  }
  return context;
};
