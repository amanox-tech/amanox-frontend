import axios from "axios";
import { getCookie } from "../utils/cookies";
import { SERVER_URL } from "@/utils/config";


const api = axios.create({
  baseURL: SERVER_URL,
  withCredentials: true, 
});


api.interceptors.request.use(
  (config) => {
    const requiresCSRF = ["post", "put", "delete"].includes(config.method);

    if (requiresCSRF) {
      const csrfToken = getCookie("csrfToken");
      if (csrfToken) {
        config.headers["x-csrf-token"] = csrfToken;
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error) => {
  failedQueue.forEach((prom) => (error ? prom.reject(error) : prom.resolve()));
  failedQueue = [];
};

let isRefreshingCSRF = false;
let csrfQueue = [];

const processCSRFQueue = (error) => {
  csrfQueue.forEach((prom) => (error ? prom.reject(error) : prom.resolve()));
  csrfQueue = [];
};

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalReq = error.config;

    // --- Handle CSRF errors ---
    if (error.response?.status === 403) {
      const code = error.response.data?.code || "";

      if (!originalReq._retry && code.startsWith("CSRF_")) {
        originalReq._retry = true;

        if (isRefreshingCSRF) {
          return new Promise((resolve, reject) => {
            csrfQueue.push({ resolve, reject });
          }).then(() => api(originalReq));
        }

        isRefreshingCSRF = true;

        try {
          await api.post("/api/v1/auth/refresh-csrf");
          processCSRFQueue(null);
          return api(originalReq);
        } catch (err) {
          processCSRFQueue(err);
          return Promise.reject(err);
        } finally {
          isRefreshingCSRF = false;
        }
      }
    }

    // --- Handle session refresh ---
    if (error.response?.status === 403 && !originalReq._retry) {
      originalReq._retry = true;

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then(() => api(originalReq));
      }

      isRefreshing = true;

      try {
        await api.post("/api/v1/auth/refresh");
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
  }
);

export default api;
