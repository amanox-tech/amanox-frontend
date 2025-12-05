"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AnalysisPage() {
  const router = useRouter();
  const [data, setData] = useState(null); // The full backend response
  const [loading, setLoading] = useState(true);

  // Tab State: 'consensus' or index of model_reviews
  const [activeTab, setActiveTab] = useState("consensus");

  useEffect(() => {
    const loadData = () => {
      try {
        const storedData = localStorage.getItem("analysisResult");
        if (!storedData) {
          router.replace("/dashboard");
          return;
        }
        setData(JSON.parse(storedData));
      } catch (error) {
        console.error("Analysis data corruption:", error);
        router.replace("/dashboard");
      } finally {
        setLoading(false);
      }
    };
    setTimeout(loadData, 500);
  }, [router]);

  // Helper to determine what data to show based on active tab
  const getDisplayData = () => {
    if (!data) return null;

    if (activeTab === "consensus") {
      return data; // The base object IS the consensus (Avg score, merged summary)
    }

    // Return specific model data if available
    const modelReview = data.model_reviews[activeTab];
    return modelReview && modelReview.success ? modelReview.full_data : null;
  };

  const displayData = getDisplayData();

  const getVerdict = (score) => {
    if (score >= 90) return { text: "World Class", color: "text-primary" };
    if (score >= 80) return { text: "Excellent", color: "text-green-600" };
    if (score >= 70) return { text: "Good", color: "text-blue-600" };
    if (score >= 50)
      return { text: "Needs Improvement", color: "text-yellow-600" };
    return { text: "Critical Issues", color: "text-red-500" };
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAFAFA] pt-32 flex flex-col items-center justify-center">
        <div className="w-16 h-16 border-4 border-gray-200 border-t-primary rounded-full animate-spin mb-4"></div>
        <p className="text-secondary font-bold animate-pulse">
          Consulting the Expert Panel...
        </p>
      </div>
    );
  }

  if (!data) return null;

  const verdict = getVerdict(displayData?.score || 0);

  return (
    <div className="min-h-screen bg-[#FAFAFA] pt-32 pb-20 px-6 font-sans">
      <div className="max-w-[1100px] mx-auto">
        {/* --- HEADER --- */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <Link
              href="/dashboard"
              className="text-sm font-medium text-gray-400 hover:text-primary mb-3 inline-flex items-center gap-1 transition-colors group"
            >
              <svg
                className="w-4 h-4 group-hover:-translate-x-1 transition-transform"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              Back to Dashboard
            </Link>
            <h1 className="text-4xl font-bold text-secondary tracking-tight">
              Analysis Report
            </h1>
            <p className="text-gray-500 mt-1">
              Multi-model consensus from our AI Expert Panel.
            </p>
          </div>

          <button
            onClick={() => window.print()}
            className="hidden md:flex items-center gap-2 px-6 py-3 bg-white border border-gray-200 text-secondary font-bold rounded-full hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm"
          >
            <svg
              className="w-5 h-5 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
              />
            </svg>
            Export PDF
          </button>
        </div>

        {/* --- EXPERT TABS --- */}
        <div className="flex flex-wrap gap-2 mb-8 bg-white p-2 rounded-2xl shadow-sm border border-gray-100 w-full md:w-fit">
          <button
            onClick={() => setActiveTab("consensus")}
            className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${
              activeTab === "consensus"
                ? "bg-secondary text-white shadow-md"
                : "text-gray-500 hover:bg-gray-50"
            }`}
          >
            Amanox Consensus
          </button>

          {data.model_reviews?.map((review, index) => (
            <button
              key={index}
              onClick={() => setActiveTab(index)}
              className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${
                activeTab === index
                  ? "bg-primary/10 text-primary border border-primary/20"
                  : "text-gray-500 hover:bg-gray-50"
              }`}
            >
              {review.model}
              {/* Status Dot */}
              <span
                className={`w-2 h-2 rounded-full ${
                  review.success ? "bg-green-400" : "bg-red-400"
                }`}
              ></span>
            </button>
          ))}
        </div>

        {/* --- DYNAMIC CONTENT AREA --- */}
        {!displayData ? (
          <div className="bg-red-50 p-8 rounded-3xl text-center border border-red-100">
            <p className="text-red-500 font-bold">Analysis Failed</p>
            <p className="text-sm text-red-400">
              This model could not process your resume. Please try another tab.
            </p>
          </div>
        ) : (
          <>
            {/* HERO GRID */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
              {/* SCORE CARD */}
              <div className="bg-white p-8 rounded-4xl shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center relative overflow-hidden group">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-colors duration-500"></div>

                <div className="relative w-40 h-40 flex items-center justify-center mb-6">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle
                      cx="80"
                      cy="80"
                      r="70"
                      stroke="#f3f4f6"
                      strokeWidth="12"
                      fill="none"
                    />
                    <circle
                      cx="80"
                      cy="80"
                      r="70"
                      stroke={activeTab === "consensus" ? "#18cb96" : "#373643"}
                      strokeWidth="12"
                      fill="none"
                      strokeDasharray={440}
                      strokeDashoffset={
                        440 - (440 * (displayData.score || 0)) / 100
                      }
                      strokeLinecap="round"
                      className="transition-all duration-1000 ease-out"
                    />
                  </svg>
                  <div className="absolute flex flex-col items-center">
                    <span className="text-5xl font-extrabold text-secondary tracking-tighter">
                      {displayData.score || 0}
                    </span>
                  </div>
                </div>

                <div className="relative z-10">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-gray-50 mb-2 ${verdict.color}`}
                  >
                    {verdict.text}
                  </span>
                  <p className="text-gray-400 text-sm">
                    {activeTab === "consensus"
                      ? "Average ATS Score"
                      : `${data.model_reviews[activeTab]?.model} Score`}
                  </p>
                </div>
              </div>

              {/* SUMMARY & SKILLS */}
              <div className="lg:col-span-2 bg-white p-8 md:p-10 rounded-4xl shadow-sm border border-gray-100 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold text-secondary mb-4 flex items-center gap-3">
                    <span className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                    </span>
                    {activeTab === "consensus"
                      ? "Expert Summary"
                      : "Model Opinion"}
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-lg">
                    {displayData.summary || "No summary generated."}
                  </p>
                </div>

                <div className="mt-8 pt-8 border-t border-gray-100">
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">
                    Detected Keywords
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {displayData.keywords_found?.length > 0 ? (
                      displayData.keywords_found.map((kw, i) => (
                        <span
                          key={i}
                          className="px-4 py-2 bg-gray-50 hover:bg-gray-100 text-gray-700 text-sm font-medium rounded-xl border border-gray-200 transition-colors cursor-default"
                        >
                          {kw}
                        </span>
                      ))
                    ) : (
                      <span className="text-gray-400 italic text-sm">
                        No specific keywords detected.
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* IMPROVEMENTS */}
            <div className="mb-12 animate-in fade-in slide-in-from-bottom-8 duration-700">
              <div className="flex items-center gap-3 mb-6">
                <h2 className="text-2xl font-bold text-secondary">
                  Recommended Improvements
                </h2>
                <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-bold rounded-full">
                  {displayData.improvements?.length || 0} Actions
                </span>
              </div>

              <div className="space-y-4">
                {displayData.improvements?.map((item, index) => (
                  <div
                    key={index}
                    className="group bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md hover:border-primary/30 transition-all duration-300"
                  >
                    <div className="flex flex-col md:flex-row md:items-start gap-4">
                      <div className="shrink-0 md:w-32">
                        <span
                          className={`
                          inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wide
                          ${
                            item.impact === "High"
                              ? "bg-red-50 text-red-600 border border-red-100"
                              : item.impact === "Medium"
                              ? "bg-yellow-50 text-yellow-700 border border-yellow-100"
                              : "bg-blue-50 text-blue-600 border border-blue-100"
                          }
                        `}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              item.impact === "High"
                                ? "bg-red-500"
                                : item.impact === "Medium"
                                ? "bg-yellow-500"
                                : "bg-blue-500"
                            }`}
                          ></span>
                          {item.impact} Impact
                        </span>
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 text-sm uppercase tracking-wide mb-1 opacity-60">
                          {item.section}
                        </h4>
                        <p className="text-secondary font-medium text-lg leading-snug">
                          {item.suggestion}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* STRENGTHS & WEAKNESSES */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-in fade-in slide-in-from-bottom-8 duration-1000">
              <div className="bg-[#f0fdf4] p-8 rounded-4xl border border-green-100">
                <h3 className="font-bold text-green-900 mb-6 flex items-center gap-3 text-xl">
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  Key Strengths
                </h3>
                <ul className="space-y-4">
                  {displayData.strengths?.map((str, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500 mt-2 shrink-0"></span>
                      <span className="text-green-800 font-medium leading-relaxed">
                        {str}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-[#fef2f2] p-8 rounded-4xl border border-red-100">
                <h3 className="font-bold text-red-900 mb-6 flex items-center gap-3 text-xl">
                  <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center text-red-600">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                      />
                    </svg>
                  </div>
                  Critical Gaps
                </h3>
                <ul className="space-y-4">
                  {displayData.weaknesses?.map((wk, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 shrink-0"></span>
                      <span className="text-red-900 font-medium leading-relaxed">
                        {wk}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
