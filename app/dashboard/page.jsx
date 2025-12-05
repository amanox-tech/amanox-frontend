"use client";

import { useState, useCallback, useEffect } from "react";
import { AppData } from "@/context/appContext";
import { useDropzone } from "react-dropzone";
import api from "@/lib/axiosClient";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

// --- THE EXPERT 3 (Top Value Models) ---
const EXPERT_MODELS = [
  { id: "openai", name: "GPT-4o Mini", desc: "OpenAI", color: "bg-green-600" },
  {
    id: "gemini",
    name: "Gemini 2.0 Flash",
    desc: "Google",
    color: "bg-blue-500",
  },
  {
    id: "deepseek",
    name: "DeepSeek V3",
    desc: "DeepSeek",
    color: "bg-purple-600",
  },
];

export default function DashboardPage() {
  const { user, loading: userLoading } = AppData();
  const router = useRouter();

  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [history, setHistory] = useState([]);

  // Default: Select all 3 models
  const [selectedModels, setSelectedModels] = useState([
    "openai",
    "gemini",
    "deepseek",
  ]);

  const toggleModel = (id) => {
    setSelectedModels((prev) =>
      prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id],
    );
  };

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

  const lastScan = history.length > 0 ? history[0] : null;

  const onDrop = useCallback(
    async (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (!file) return;

      if (selectedModels.length === 0) {
        toast.error("Please select at least one AI model.");
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        toast.error("File is too large. Max 5MB allowed.");
        return;
      }

      setIsAnalyzing(true);

      const formData = new FormData();
      formData.append("resume", file);
      formData.append("models", JSON.stringify(selectedModels));

      try {
        const { data } = await api.post("/api/v1/resume/analyze", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        toast.success("Resume analyzed successfully!");

        const result = data.data;
        const newEntry = {
          id: Date.now(),
          score: result.score,
          summary: result.summary,
          date: new Date().toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          }),
          fullData: result,
        };

        const existingHistory = JSON.parse(
          localStorage.getItem("resumeHistory") || "[]",
        );
        const updatedHistory = [newEntry, ...existingHistory].slice(0, 5);

        localStorage.setItem("resumeHistory", JSON.stringify(updatedHistory));
        localStorage.setItem("analysisResult", JSON.stringify(result));

        router.push("/analysis");
      } catch (error) {
        console.error(error);
        toast.error(
          error?.response?.data?.message ||
            "Analysis failed. Please try again.",
        );
        setIsAnalyzing(false);
      }
    },
    [router, selectedModels],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        [".docx"],
    },
    maxFiles: 1,
    multiple: false,
  });

  const handleViewScan = (scanItem) => {
    localStorage.setItem("analysisResult", JSON.stringify(scanItem.fullData));
    router.push("/analysis");
  };

  if (userLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 pt-20">
        <p className="text-secondary font-medium animate-pulse">
          Loading workspace...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA] pt-32 pb-12 px-6">
      <div className="max-w-[1200px] mx-auto">
        <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-secondary">
              Good evening,{" "}
              <span className="text-primary">{user?.name?.split(" ")[0]}</span>
            </h1>
            <p className="text-gray-500 mt-2">
              Ready to optimize your professional profile today?
            </p>
          </div>
          <div className="hidden md:block">
            <span className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium bg-primary/10 text-primary">
              Pro Plan Active
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 flex flex-col gap-6">
            {/* --- AI MODEL SELECTOR (Unified) --- */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-secondary text-sm uppercase tracking-wider">
                  Select Expert Panel
                </h3>
                <span className="text-xs text-gray-400">
                  {selectedModels.length} selected
                </span>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {EXPERT_MODELS.map((model) => (
                  <button
                    key={model.id}
                    onClick={() => toggleModel(model.id)}
                    className={`
                      relative p-3 rounded-xl border text-left transition-all duration-200
                      ${
                        selectedModels.includes(model.id)
                          ? "border-primary bg-primary/5 shadow-sm"
                          : "border-gray-100 hover:border-gray-300 hover:bg-gray-50"
                      }
                    `}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span
                        className={`text-xs font-bold ${
                          selectedModels.includes(model.id)
                            ? "text-primary"
                            : "text-gray-500"
                        }`}
                      >
                        {model.desc}
                      </span>
                      {selectedModels.includes(model.id) && (
                        <div className="w-4 h-4 bg-primary rounded-full flex items-center justify-center">
                          <svg
                            className="w-2.5 h-2.5 text-white"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={4}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        </div>
                      )}
                    </div>
                    <p className="text-sm font-bold text-secondary">
                      {model.name}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {/* --- UPLOAD CARD --- */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 relative overflow-hidden group transition-all duration-300 min-h-[300px] flex flex-col">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
              <div className="relative z-10 flex-1 flex flex-col">
                <h2 className="text-2xl font-bold text-secondary mb-2">
                  Upload Resume
                </h2>
                <div
                  {...getRootProps()}
                  className={`
                    flex-1 border-2 border-dashed rounded-2xl p-8 flex flex-col items-center justify-center transition-all cursor-pointer mt-4
                    ${
                      isDragActive
                        ? "border-primary bg-primary/5 scale-[0.99]"
                        : "border-gray-200 hover:border-primary/50 hover:bg-gray-50"
                    }
                    ${isAnalyzing ? "pointer-events-none opacity-50" : ""}
                  `}
                >
                  <input {...getInputProps()} />
                  <div className="w-12 h-12 bg-white rounded-full shadow-sm flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                    <svg
                      className="w-6 h-6 text-gray-400 group-hover:text-primary"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                      />
                    </svg>
                  </div>
                  <p className="text-secondary font-semibold">
                    Click to upload or drag PDF/DOCX
                  </p>
                </div>

                {isAnalyzing && (
                  <div className="absolute inset-0 bg-white/95 backdrop-blur-sm z-20 flex flex-col items-center justify-center rounded-3xl">
                    <div className="w-16 h-16 border-4 border-gray-100 border-t-primary rounded-full animate-spin mb-4"></div>
                    <h3 className="text-xl font-bold text-secondary">
                      Analyzing with {selectedModels.length} Experts
                    </h3>
                    <p className="text-gray-500 text-sm mt-2">
                      Aggregating insights from multiple AI models...
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <div className="bg-secondary text-white rounded-3xl p-6 shadow-lg relative overflow-hidden">
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-white/10 rounded-full blur-xl"></div>
              <p className="text-gray-300 text-sm font-medium mb-1">
                Last Resume Score
              </p>
              <div className="flex items-end gap-2">
                <span className="text-5xl font-bold text-primary">
                  {lastScan ? lastScan.score : "--"}
                </span>
                <span className="text-gray-400 mb-1">/ 100</span>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex-1 flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-secondary">Recent Scans</h3>
              </div>
              <div className="flex-1 overflow-y-auto max-h-[300px] space-y-3 custom-scrollbar">
                {history.length === 0 ? (
                  <p className="text-sm text-gray-400 text-center mt-10">
                    No scans yet
                  </p>
                ) : (
                  history.map((scan) => (
                    <div
                      key={scan.id}
                      onClick={() => handleViewScan(scan)}
                      className="flex items-center justify-between p-3 rounded-xl bg-gray-50 hover:bg-primary/5 cursor-pointer transition-all"
                    >
                      <div>
                        <p className="text-sm font-bold text-secondary">
                          Analysis
                        </p>
                        <p className="text-xs text-gray-400">{scan.date}</p>
                      </div>
                      <span
                        className={`text-sm font-bold ${
                          scan.score >= 70
                            ? "text-green-600"
                            : "text-yellow-600"
                        }`}
                      >
                        {scan.score}
                      </span>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
