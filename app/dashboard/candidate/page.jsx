"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useDropzone } from "react-dropzone";
import { toast } from "react-hot-toast";
import { AppData } from "@/context/appContext";
import api from "@/lib/axiosClient";
import BuyCoinsModal from "./components/BuyCoinsModal";
import CoinHistoryModal from "./components/CoinHistoryModal";
import PaymentHistoryModal from "./components/PaymentHistoryModal";
import { usePayment } from "./hooks/usePayment";

const ANALYSIS_COST = 10;

export default function CandidateDashboard() {
  const router = useRouter();
  const { user, loading: userLoading, fetchUser } = AppData();

  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [history, setHistory] = useState([]);

  const [isBuyModalOpen, setIsBuyModalOpen] = useState(false);
  const [isCoinHistoryOpen, setIsCoinHistoryOpen] = useState(false);
  const [isPaymentHistoryOpen, setIsPaymentHistoryOpen] = useState(false);

  const [isJobMatchMode, setIsJobMatchMode] = useState(false);
  const [jobDescription, setJobDescription] = useState("");

  const {
    handlePurchase,
    coinHistory,
    paymentHistory,
    fetchCoinHistory,
    fetchPaymentHistory,
  } = usePayment({ fetchUser });

  useEffect(() => {
    if (!userLoading && user && user.role === "recruiter") {
      router.replace("/dashboard/recruiter");
    }
  }, [router, user, userLoading]);

  useEffect(() => {
    const storedHistory = localStorage.getItem("resumeHistory");
    if (storedHistory) {
      try {
        setHistory(JSON.parse(storedHistory));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  useEffect(() => {
    if (isCoinHistoryOpen) fetchCoinHistory();
  }, [isCoinHistoryOpen, fetchCoinHistory]);

  useEffect(() => {
    if (isPaymentHistoryOpen) fetchPaymentHistory();
  }, [isPaymentHistoryOpen, fetchPaymentHistory]);

  const onDrop = useCallback(
    async (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (!file) return;

      if (isJobMatchMode && jobDescription.trim().length < 50) {
        toast.error(
          "Please paste the job description (at least 50 characters).",
        );
        return;
      }

      if ((user?.coins ?? 0) < ANALYSIS_COST) {
        toast.error(`You need ${ANALYSIS_COST} coins to start.`);
        setIsBuyModalOpen(true);
        return;
      }

      setIsAnalyzing(true);
      try {
        const formData = new FormData();
        formData.append("resume", file);
        if (isJobMatchMode) formData.append("jobDescription", jobDescription);

        const { data } = await api.post("/api/v1/resume/analyze", formData);

        if (!data?.success) throw new Error(data?.message || "Audit failed");

        toast.success("Resume checked successfully!");
        await fetchUser();

        const result = data.data;
        const newEntry = {
          id: Date.now(),
          score: result.score ?? 0,
          type: isJobMatchMode ? "Job Match" : "General Audit",
          summary: result.summary_candidate || result.summary || "",
          date: new Date().toLocaleDateString(),
          fullData: result,
        };

        const updatedHistory = [newEntry, ...history].slice(0, 5);
        localStorage.setItem("resumeHistory", JSON.stringify(updatedHistory));
        localStorage.setItem("analysisResult", JSON.stringify(result));

        router.push("/analysis");
      } catch (error) {
        toast.error(error?.response?.data?.message || "Something went wrong.");
      } finally {
        setIsAnalyzing(false);
      }
    },
    [jobDescription, isJobMatchMode, router, fetchUser, user?.coins, history],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        [".docx"],
    },
    maxFiles: 1,
    disabled: isAnalyzing || (user?.coins ?? 0) < ANALYSIS_COST,
  });

  if (userLoading) return null;

  return (
    <div className="min-h-screen bg-[#FAFAFA] pt-32 pb-12 px-6">
      <div className="max-w-[1200px] mx-auto">
        {/* HEADER */}
        <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-4xl font-black text-secondary tracking-tight">
              Welcome,{" "}
              <span className="text-primary">
                {user?.name?.split(" ")[0] || "User"}
              </span>
            </h1>
            <p className="text-gray-500 mt-2 font-medium">
              Ready to see how recruiters view your resume?
            </p>
          </div>
          <div className="hidden md:block">
            <span className="px-4 py-2 rounded-2xl bg-primary/10 text-primary text-xs font-black uppercase tracking-widest">
              Premium Audit Access
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* LEFT COLUMN */}
          <div className="lg:col-span-2 flex flex-col gap-8">
            {/* BRANDING CARD */}
            <div className="bg-secondary rounded-[2.5rem] p-10 text-white shadow-2xl relative overflow-hidden">
              <div className="relative z-10">
                <h3 className="text-2xl font-black mb-3 text-primary">
                  Amanox Pro Intelligence
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed max-w-md">
                  We use deep-reasoning AI to check your resume for 45+ critical
                  points that hiring managers look for. Simple, fast, and
                  accurate.
                </p>
              </div>
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2" />
            </div>

            {/* UPLOAD & MODE SECTION */}
            <div className="bg-white rounded-[2.5rem] p-10 shadow-sm border border-gray-100 flex flex-col gap-8">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-black text-secondary">
                  {isJobMatchMode ? "Target Job Match" : "General Resume Audit"}
                </h2>
                <div className="bg-gray-100 p-1.5 rounded-2xl flex gap-1">
                  <button
                    onClick={() => setIsJobMatchMode(false)}
                    className={`px-6 py-2 text-xs font-black rounded-xl transition-all ${!isJobMatchMode ? "bg-white text-secondary shadow-sm" : "text-gray-400"}`}
                  >
                    GENERAL
                  </button>
                  <button
                    onClick={() => setIsJobMatchMode(true)}
                    className={`px-6 py-2 text-xs font-black rounded-xl transition-all ${isJobMatchMode ? "bg-secondary text-white shadow-sm" : "text-gray-400"}`}
                  >
                    JOB MATCH
                  </button>
                </div>
              </div>

              {isJobMatchMode && (
                <div className="animate-in fade-in slide-in-from-top-4 duration-300">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3 block">
                    Paste Job Description
                  </label>
                  <textarea
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                    placeholder="Paste the job requirements here..."
                    className="w-full p-5 rounded-2xl bg-gray-50 border border-gray-100 focus:border-primary focus:ring-4 focus:ring-primary/5 outline-none text-sm transition-all h-36 resize-none"
                  />
                </div>
              )}

              <div
                {...getRootProps()}
                className={`group border-4 border-dashed rounded-4xl p-12 flex flex-col items-center justify-center transition-all cursor-pointer ${isDragActive ? "border-primary bg-primary/5" : "border-gray-100 hover:border-primary/50 hover:bg-gray-50"} ${isAnalyzing ? "opacity-40 pointer-events-none" : ""}`}
              >
                <input {...getInputProps()} />
                <div className="w-20 h-20 bg-primary/10 rounded-3xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  <svg
                    className="w-10 h-10 text-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    />
                  </svg>
                </div>
                <p className="text-secondary font-black text-lg">
                  Click to Upload Resume
                </p>
                <p className="text-gray-400 text-sm mt-1">
                  PDF or DOCX (Max 5MB)
                </p>
              </div>

              <div className="p-5 rounded-3xl bg-gray-50 border border-gray-100 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center text-primary font-black">
                    {ANALYSIS_COST}
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest">
                      Cost per Audit
                    </p>
                    <p className="text-sm font-black text-secondary">
                      Premium Credits
                    </p>
                  </div>
                </div>
                <div
                  className={`px-4 py-2 rounded-xl text-xs font-black ${user?.coins >= ANALYSIS_COST ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}
                >
                  {user?.coins >= ANALYSIS_COST
                    ? "Balance Sufficient"
                    : "Needs Recharge"}
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="flex flex-col gap-8">
            {/* WALLET */}
            <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-gray-100">
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">
                Your Wallet
              </p>
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-5xl font-black text-secondary">
                  {user?.coins ?? 0}
                </h2>
                <button
                  onClick={() => setIsBuyModalOpen(true)}
                  className="p-4 bg-primary text-white rounded-2xl shadow-lg shadow-primary/30 hover:scale-105 transition-transform"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={3}
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                </button>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setIsCoinHistoryOpen(true)}
                  className="py-3 bg-gray-50 rounded-xl text-[10px] font-black text-secondary uppercase hover:bg-gray-100"
                >
                  History
                </button>
                <button
                  onClick={() => setIsPaymentHistoryOpen(true)}
                  className="py-3 bg-gray-50 rounded-xl text-[10px] font-black text-secondary uppercase hover:bg-gray-100"
                >
                  Payments
                </button>
              </div>
            </div>

            {/* PREVIOUS SCORE */}
            <div className="bg-primary rounded-[2.5rem] p-8 text-white shadow-xl shadow-primary/20">
              <p className="text-white/60 text-[10px] font-black uppercase tracking-widest mb-2">
                Last Audit Score
              </p>
              <div className="flex items-baseline gap-1">
                <span className="text-6xl font-black">
                  {history[0]?.score || "--"}
                </span>
                <span className="text-xl font-bold opacity-40">/100</span>
              </div>
            </div>

            {/* RECENT ACTIVITY */}
            <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-gray-100 flex-1 flex flex-col">
              <h3 className="text-xs font-black text-secondary uppercase tracking-widest mb-6">
                Recent Activity
              </h3>
              <div className="space-y-4">
                {history.length === 0 ? (
                  <p className="text-xs text-gray-400 italic">
                    No audits performed yet.
                  </p>
                ) : (
                  history.map((scan) => (
                    <button
                      key={scan.id}
                      onClick={() => handleViewScan(scan)}
                      className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-2xl hover:bg-primary/5 transition-all group"
                    >
                      <div className="text-left">
                        <p className="text-xs font-black text-secondary uppercase tracking-tight">
                          {scan.type}
                        </p>
                        <p className="text-[10px] text-gray-400">{scan.date}</p>
                      </div>
                      <div className="text-sm font-black text-primary group-hover:scale-110 transition-transform">
                        {scan.score}%
                      </div>
                    </button>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MODALS (Simplified logic) */}
      {isBuyModalOpen && (
        <BuyCoinsModal
          onClose={() => setIsBuyModalOpen(false)}
          onBuy={(c) => handlePurchase(c, user, () => setIsBuyModalOpen(false))}
        />
      )}
      {isCoinHistoryOpen && (
        <CoinHistoryModal
          history={coinHistory}
          onClose={() => setIsCoinHistoryOpen(false)}
        />
      )}
      {isPaymentHistoryOpen && (
        <PaymentHistoryModal
          history={paymentHistory}
          onClose={() => setIsPaymentHistoryOpen(false)}
        />
      )}

      {/* ANALYSIS OVERLAY */}
      {isAnalyzing && (
        <div className="fixed inset-0 bg-secondary/95 backdrop-blur-md z-100 flex flex-col items-center justify-center text-white">
          <div className="w-20 h-20 border-4 border-primary/20 border-t-primary rounded-full animate-spin mb-6" />
          <h3 className="text-3xl font-black mb-2">Auditing Your Resume</h3>
          <p className="text-gray-400 font-medium">
            This usually takes about 30 seconds...
          </p>
        </div>
      )}
    </div>
  );
}
