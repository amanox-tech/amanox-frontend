"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "react-hot-toast";

export default function AnalysisPage() {
  const router = useRouter();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeView, setActiveView] = useState("report");
  // activeExpert can be: "consensus" | number (index) | modelName (string)
  const [activeExpert, setActiveExpert] = useState("consensus");

  useEffect(() => {
    const loadData = () => {
      try {
        const storedData = localStorage.getItem("analysisResult");
        if (!storedData) {
          router.replace("/dashboard");
          return;
        }
        const parsed = JSON.parse(storedData);
        setData(parsed);
        // default activeExpert stay consensus; keep stable if model_reviews exist
      } catch (error) {
        console.error("Data error", error);
        router.replace("/dashboard");
      } finally {
        setLoading(false);
      }
    };
    const timer = setTimeout(loadData, 300);
    return () => clearTimeout(timer);
  }, [router]);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard!");
  };

  const getDisplayData = () => {
    if (!data) return null;
    if (activeExpert === "consensus") return data;

    // If activeExpert is numeric index
    if (typeof activeExpert === "number") {
      const review = data.model_reviews?.[activeExpert];
      return review && review.success ? review.full_data : null;
    }

    // If activeExpert is a string (model name)
    const byName = data.model_reviews?.find?.((r) => r.model === activeExpert);
    if (byName) return byName.success ? byName.full_data : null;

    return null;
  };

  const displayData = getDisplayData();
  const isJobMatch = data?.mode === "job_match";

  // Verdict Logic
  const getVerdict = (score) => {
    if (score >= 90) return { text: "World Class", color: "text-primary" };
    if (score >= 80) return { text: "Excellent", color: "text-green-600" };
    if (score >= 70) return { text: "Good", color: "text-blue-600" };
    if (score >= 50) return { text: "Needs Work", color: "text-yellow-600" };
    return { text: "Critical", color: "text-red-500" };
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAFAFA] pt-32 flex flex-col items-center justify-center">
        <div className="w-16 h-16 border-4 border-gray-200 border-t-primary rounded-full animate-spin mb-4"></div>
        <p className="text-secondary font-bold animate-pulse">
          Analyzing Profile...
        </p>
      </div>
    );
  }

  if (!data) return null;

  // If the selected expert has no data, show consensus score for verdict fallback
  const verdict = getVerdict(displayData?.score ?? data.score ?? 0);

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
                className="w-4 h-4 group-hover:-translate-x-1"
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
            <div className="flex items-center gap-3">
              <h1 className="text-4xl font-bold text-secondary tracking-tight">
                {isJobMatch ? "Job Fit Analysis" : "Resume Report"}
              </h1>
              {isJobMatch && (
                <span className="px-3 py-1 bg-purple-100 text-purple-700 text-xs font-bold uppercase rounded-full border border-purple-200">
                  Targeted Match
                </span>
              )}
            </div>
            <p className="text-gray-500 mt-1">
              AI-driven insights to optimize your professional profile.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* VIEW TOGGLE (Only if Job Match) */}
            {isJobMatch && (
              <div className="flex bg-white p-1 rounded-xl shadow-sm border border-gray-200">
                <button
                  onClick={() => setActiveView("report")}
                  className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                    activeView === "report"
                      ? "bg-secondary text-white"
                      : "text-gray-500 hover:bg-gray-50"
                  }`}
                >
                  Analysis
                </button>
                <button
                  onClick={() => setActiveView("outreach")}
                  className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                    activeView === "outreach"
                      ? "bg-primary text-white"
                      : "text-gray-500 hover:bg-gray-50"
                  }`}
                >
                  Messages
                </button>
              </div>
            )}
            <button
              onClick={() => window.print()}
              className="p-2 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 text-gray-500"
            >
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
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* ======================= VIEW: REPORT ======================= */}
        {activeView === "report" && (
          <div className="animate-in fade-in zoom-in-95 duration-300">
            {/* MODEL TABS */}
            <div className="flex flex-wrap gap-2 mb-8 bg-white p-2 rounded-2xl shadow-sm border border-gray-100 w-full md:w-fit">
              <button
                onClick={() => setActiveExpert("consensus")}
                className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${
                  activeExpert === "consensus"
                    ? "bg-secondary text-white shadow-md"
                    : "text-gray-500 hover:bg-gray-50"
                }`}
              >
                Final Result
              </button>

              {data.model_reviews?.map((review, index) => {
                const good =
                  review.success &&
                  typeof review.score === "number" &&
                  review.score >= 75;
                const warn =
                  review.success &&
                  typeof review.score === "number" &&
                  review.score >= 50 &&
                  review.score < 75;
                const bad =
                  review.success &&
                  typeof review.score === "number" &&
                  review.score < 50;
                return (
                  <button
                    key={index}
                    onClick={() => setActiveExpert(index)}
                    title={
                      review.success
                        ? `Score: ${review.score}`
                        : `Model failed: ${review.error || "no response"}`
                    }
                    className={`px-4 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${
                      activeExpert === index
                        ? "bg-primary/10 text-primary border border-primary/20"
                        : "text-gray-500 hover:bg-gray-50"
                    }`}
                  >
                    <span className="truncate max-w-[140px]">
                      {review.model}
                    </span>
                    <span className="ml-1 inline-flex items-center text-xs font-semibold">
                      {review.success ? (
                        <span
                          className={`px-2 py-0.5 rounded-full text-[11px] ${
                            good
                              ? "bg-green-50 text-green-700"
                              : warn
                                ? "bg-yellow-50 text-yellow-700"
                                : bad
                                  ? "bg-red-50 text-red-700"
                                  : "bg-gray-50 text-gray-600"
                          }`}
                        >
                          {review.score ?? "—"}
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded-full text-[11px] bg-gray-50 text-gray-400">
                          fail
                        </span>
                      )}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* HERO GRID */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
              {/* SCORE CARD */}
              <div className="bg-white p-8 rounded-4xl shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center relative overflow-hidden">
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
                      stroke="#18cb96"
                      strokeWidth="12"
                      fill="none"
                      strokeDasharray={440}
                      strokeDashoffset={
                        440 -
                        (440 * (displayData?.score ?? data?.score ?? 0)) / 100
                      }
                      strokeLinecap="round"
                    />
                  </svg>
                  <span className="absolute text-5xl font-extrabold text-secondary">
                    {displayData?.score ?? data?.score ?? 0}
                  </span>
                </div>
                <p className="text-gray-400 text-sm font-bold uppercase tracking-wider">
                  {isJobMatch ? "Match Score" : "Resume Score"}
                </p>
                <div
                  className={`mt-4 px-4 py-1.5 rounded-full text-xs font-bold bg-gray-50 ${verdict.color}`}
                >
                  {verdict.text}
                </div>
              </div>

              {/* SUMMARY */}
              <div className="lg:col-span-2 bg-white p-10 rounded-4xl shadow-sm border border-gray-100 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold text-secondary mb-4 flex items-center gap-3">
                    <span className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                      💡
                    </span>
                    Your Summary
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-lg">
                    {displayData?.summary_candidate ??
                      displayData?.summary ??
                      data?.summary_candidate ??
                      data?.summary ??
                      "No summary available."}
                  </p>
                </div>

                {/* SECTION SCORES */}
                <div className="mt-8 grid grid-cols-3 gap-4 pt-8 border-t border-gray-100">
                  {Object.entries(
                    displayData?.section_scores ??
                      data?.section_scores ?? {
                        impact: 0,
                        skills: 0,
                        formatting: 0,
                      },
                  ).map(([key, val]) => (
                    <div key={key} className="text-center">
                      <div className="text-xs font-bold text-gray-400 uppercase mb-2">
                        {key}
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full overflow-hidden mb-1">
                        <div
                          className="h-full bg-secondary rounded-full"
                          style={{ width: `${val}%` }}
                        />
                      </div>
                      <span className="text-sm font-bold text-secondary">
                        {val}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* KEYWORDS */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              <div className="bg-white p-8 rounded-3xl border border-gray-100">
                <h3 className="text-lg font-bold text-green-600 mb-4 flex items-center gap-2">
                  <span className="bg-green-100 p-1 rounded-full">
                    <svg
                      className="w-4 h-4"
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
                  </span>
                  What You Have
                </h3>
                <div className="flex flex-wrap gap-2">
                  {(
                    displayData?.keywords?.present ??
                    data?.keywords?.present ??
                    []
                  ).length > 0 ? (
                    (
                      displayData?.keywords?.present ??
                      data?.keywords?.present ??
                      []
                    ).map((kw, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-green-50 text-green-700 text-sm font-medium rounded-lg border border-green-100"
                      >
                        {kw}
                      </span>
                    ))
                  ) : (
                    <span className="text-gray-400 text-sm">
                      None detected.
                    </span>
                  )}
                </div>
              </div>

              <div className="bg-white p-8 rounded-3xl border border-gray-100">
                <h3 className="text-lg font-bold text-red-500 mb-4 flex items-center gap-2">
                  <span className="bg-red-100 p-1 rounded-full">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </span>
                  Missing Keywords
                </h3>
                <div className="flex flex-wrap gap-2">
                  {(
                    displayData?.keywords?.missing ??
                    data?.keywords?.missing ??
                    []
                  ).length > 0 ? (
                    (
                      displayData?.keywords?.missing ??
                      data?.keywords?.missing ??
                      []
                    ).map((kw, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-gray-100 text-gray-500 text-sm font-medium rounded-lg border border-dashed border-gray-300"
                      >
                        {kw}
                      </span>
                    ))
                  ) : (
                    <span className="text-green-500 font-bold text-sm">
                      Perfect match! No missing keywords.
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* REWRITES */}
            {(displayData?.rewrites ?? data?.rewrites)?.length > 0 && (
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-secondary mb-6">
                  Suggested Rewrites
                </h2>
                <div className="space-y-6">
                  {(displayData?.rewrites ?? data?.rewrites ?? []).map(
                    (item, index) => (
                      <div
                        key={index}
                        className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
                      >
                        <div className="bg-gray-50 px-6 py-3 border-b border-gray-100">
                          <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                            Reason: {item.reason ?? "Improvement"}
                          </p>
                        </div>
                        <div className="grid md:grid-cols-2">
                          <div className="p-6 border-b md:border-b-0 md:border-r border-gray-100 bg-red-50/10">
                            <p className="text-xs font-bold text-red-400 mb-2 uppercase">
                              Your Version
                            </p>
                            <p className="text-gray-600 line-through decoration-red-300 decoration-2">
                              {item.original ?? "—"}
                            </p>
                          </div>
                          <div className="p-6 bg-green-50/20 relative group">
                            <p className="text-xs font-bold text-green-600 mb-2 uppercase">
                              Better Version
                            </p>
                            <p className="text-gray-800 font-medium">
                              {item.improved ?? "—"}
                            </p>
                            <button
                              onClick={() =>
                                copyToClipboard(item.improved ?? "")
                              }
                              className="absolute top-4 right-4 p-2 bg-white rounded-lg shadow-sm border border-gray-200 text-gray-400 hover:text-green-600"
                            >
                              <svg
                                className="w-4 h-4"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                                />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                    ),
                  )}
                </div>
              </div>
            )}

            {/* STRENGTHS & WEAKNESSES */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div className="bg-[#f0fdf4] p-8 rounded-4xl border border-green-100">
                <h3 className="font-bold text-green-900 mb-6 text-xl">
                  Your Top Strengths
                </h3>
                <ul className="space-y-4">
                  {(displayData?.strengths ?? data?.strengths ?? []).map(
                    (str, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="text-green-500 mt-1">●</span>
                        <span className="text-green-800 font-medium leading-relaxed">
                          {str}
                        </span>
                      </li>
                    ),
                  )}
                </ul>
              </div>

              <div className="bg-[#fef2f2] p-8 rounded-4xl border border-red-100">
                <h3 className="font-bold text-red-900 mb-6 text-xl">
                  Things to Fix
                </h3>
                <ul className="space-y-4">
                  {(displayData?.weaknesses ?? data?.weaknesses ?? []).map(
                    (wk, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="text-red-500 mt-1">●</span>
                        <span className="text-red-900 font-medium leading-relaxed">
                          {wk}
                        </span>
                      </li>
                    ),
                  )}
                </ul>
              </div>
            </div>

            {/* ADDITIONAL SECTIONS: dev_maturity, interview_risks, projects_to_add */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div className="bg-white p-6 rounded-2xl border border-gray-100">
                <h4 className="font-bold mb-2">Dev Maturity</h4>
                <div className="text-sm text-gray-600">
                  <div>
                    Seniority:{" "}
                    {displayData?.dev_maturity?.seniority_score ??
                      data?.dev_maturity?.seniority_score ??
                      "—"}
                  </div>
                  <div>
                    Communication:{" "}
                    {displayData?.dev_maturity?.communication_score ??
                      data?.dev_maturity?.communication_score ??
                      "—"}
                  </div>
                  <div>
                    Business:{" "}
                    {displayData?.dev_maturity?.business_understanding_score ??
                      data?.dev_maturity?.business_understanding_score ??
                      "—"}
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-gray-100">
                <h4 className="font-bold mb-2">Interview Risks</h4>
                <ul className="text-sm text-gray-600 space-y-2">
                  {(displayData?.interview_risks ?? data?.interview_risks ?? [])
                    .length > 0 ? (
                    (
                      displayData?.interview_risks ??
                      data?.interview_risks ??
                      []
                    ).map((r, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-red-500">●</span>
                        <div>
                          <div className="font-medium text-sm">{r.area}</div>
                          <div className="text-xs text-gray-500">
                            {r.why} • Fix: {r.fix}
                          </div>
                        </div>
                      </li>
                    ))
                  ) : (
                    <li className="text-sm text-gray-400">
                      No major interview risks detected.
                    </li>
                  )}
                </ul>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-gray-100">
                <h4 className="font-bold mb-2">Projects to Add</h4>
                <ul className="text-sm text-gray-600 space-y-2">
                  {(displayData?.projects_to_add ?? data?.projects_to_add ?? [])
                    .length > 0 ? (
                    (
                      displayData?.projects_to_add ??
                      data?.projects_to_add ??
                      []
                    ).map((p, i) => (
                      <li key={i}>
                        <div className="font-medium">{p.title}</div>
                        <div className="text-xs text-gray-500">
                          {p.reason} • Value: {p.value}
                        </div>
                      </li>
                    ))
                  ) : (
                    <li className="text-sm text-gray-400">
                      No project suggestions.
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* ======================= VIEW: OUTREACH (Candidate Only) ======================= */}
        {activeView === "outreach" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-in fade-in slide-in-from-right-8 duration-500">
            {(displayData?.outreach ?? data?.outreach ?? {}) &&
            Object.entries(displayData?.outreach ?? data?.outreach ?? {})
              .length > 0 ? (
              Object.entries(displayData?.outreach ?? data?.outreach ?? {}).map(
                ([key, text]) => (
                  <div
                    key={key}
                    className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 relative"
                  >
                    <h3 className="font-bold text-gray-900 capitalize mb-4">
                      {key.replace("_", " ")}
                    </h3>
                    <div className="p-4 bg-gray-50 rounded-xl text-sm text-gray-700 leading-relaxed font-mono whitespace-pre-wrap border border-gray-100 h-48 overflow-y-auto">
                      {text}
                    </div>
                    <div className="mt-4 flex gap-2">
                      <button
                        onClick={() => copyToClipboard(text)}
                        className="flex-1 py-2 bg-white border border-gray-200 rounded-xl text-sm font-bold text-gray-600 hover:bg-gray-50 hover:text-primary transition-colors"
                      >
                        Copy Text
                      </button>
                    </div>
                  </div>
                ),
              )
            ) : (
              <div className="col-span-full text-center text-gray-400">
                No outreach templates generated.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
