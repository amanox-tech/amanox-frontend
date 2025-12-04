"use client";

import { createContext, useContext, useEffect, useState } from "react";
import api from "@/lib/axiosClient";
import { toast } from "react-toastify";

const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuth, setIsAuth] = useState(false);
  const [loading, setLoading] = useState(true);

  // This function is now robust: it tries to get the user.
  // If 401 (unauthorized), it simply sets user to null (not logged in).
  const fetchUser = async () => {
    try {
      const { data } = await api.get("/api/v1/user/me");
      setUser(data.user);
      setIsAuth(true);
    } catch {
      console.log("No active session found");
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
      toast.error("Logout failed");
    }
  };

  // Run once on mount. We don't care about the route.
  // If the cookie exists, we get the user. If not, we remain guest.
  useEffect(() => {
    fetchUser();
  }, []);

  const value = {
    user,
    isAuth,
    loading,
    logoutUser,
    setUser,
    setIsAuth,
    fetchUser, // EXPORTED so we can call it from Login page
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
