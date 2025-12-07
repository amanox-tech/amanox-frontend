import axios from "axios";
import { getCookie } from "../utils/cookies";
import { SERVER_URL } from "@/utils/config";

const api = axios.create({
  baseURL: SERVER_URL,
  withCredentials: true,
  timeout: 180000,
});

// A separate axios client WITHOUT interceptors for refresh calls
const refreshClient = axios.create({
  baseURL: SERVER_URL,
  withCredentials: true,
  timeout: 100000,
});

// Normalize methods + attach CSRF
api.interceptors.request.use(
  (config) => {
    const method = (config.method || "").toLowerCase();
    const requiresCSRF = ["post", "put", "delete"].includes(method);

    if (requiresCSRF) {
      const csrfToken = getCookie("csrfToken");
      if (csrfToken) {
        config.headers["x-csrf-token"] = csrfToken;
      }
    }

    return config;
  },
  (error) => Promise.reject(error),
);

// -------------------------
// Queue Mechanism
// -------------------------
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error) => {
  failedQueue.forEach((p) => (error ? p.reject(error) : p.resolve()));
  failedQueue = [];
};

// CSRF queue
let isRefreshingCSRF = false;
let csrfQueue = [];

const processCSRFQueue = (error) => {
  csrfQueue.forEach((p) => (error ? p.reject(error) : p.resolve()));
  csrfQueue = [];
};

// -------------------------
// RESPONSE INTERCEPTOR
// -------------------------
api.interceptors.response.use(
  (response) => response,

  async (error) => {
    const status = error?.response?.status;
    const originalReq = error?.config;

    if (!originalReq) return Promise.reject(error);

    const errCode = error?.response?.data?.code || "";
    const isCSRFError = status === 403 && errCode.startsWith("CSRF_");
    const isSessionExpired = status === 403 && !errCode.startsWith("CSRF_");

    // -------------------------
    // 1. CSRF Handling
    // -------------------------
    if (isCSRFError && !originalReq._retry) {
      originalReq._retry = true;

      if (isRefreshingCSRF) {
        return new Promise((resolve, reject) => {
          csrfQueue.push({ resolve, reject });
        }).then(() => api(originalReq));
      }

      isRefreshingCSRF = true;

      try {
        await refreshClient.post("/api/v1/auth/refresh-csrf");
        processCSRFQueue(null);
        return api(originalReq);
      } catch (err) {
        processCSRFQueue(err);
        return Promise.reject(err);
      } finally {
        isRefreshingCSRF = false;
      }
    }

    // -------------------------
    // 2. Session Refresh Handling
    // -------------------------
    if (isSessionExpired && !originalReq._retry) {
      originalReq._retry = true;

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then(() => api(originalReq));
      }

      isRefreshing = true;

      try {
        await refreshClient.post("/api/v1/auth/refresh");
        processQueue(null);
        return api(originalReq);
      } catch (err) {
        processQueue(err);
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  },
);

export default api;
