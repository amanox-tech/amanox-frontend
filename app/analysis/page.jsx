"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "react-hot-toast";

export default function AnalysisPage() {
  const router = useRouter();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

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
        console.error("Data error", error);
        router.replace("/dashboard");
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [router]);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard!");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center">
        <div className="w-16 h-16 border-4 border-gray-100 border-t-primary rounded-full animate-spin mb-6" />
        <p className="text-secondary font-black tracking-tight animate-pulse">
          Generating Premium Report...
        </p>
      </div>
    );
  }

  if (!data) return null;

  const isJobMatch = data?.mode === "job_match";
  const score = data?.score ?? 0;

  const getVerdict = (s) => {
    if (s >= 90)
      return {
        text: "World Class",
        color: "text-primary",
        bg: "bg-primary/10",
      };
    if (s >= 80)
      return { text: "Excellent", color: "text-green-600", bg: "bg-green-50" };
    if (s >= 70)
      return { text: "Competitive", color: "text-blue-600", bg: "bg-blue-50" };
    return { text: "Needs Work", color: "text-yellow-600", bg: "bg-yellow-50" };
  };

  const verdict = getVerdict(score);

  return (
    <div className="min-h-screen bg-[#FAFAFA] pt-32 pb-24 px-6 font-sans selection:bg-primary/20">
      <div className="max-w-[1100px] mx-auto">
        {/* --- HEADER --- */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-8">
          <div className="space-y-4">
            <Link
              href="/dashboard"
              className="text-[10px] font-black text-gray-400 hover:text-primary transition-all tracking-[0.2em] flex items-center gap-2"
            >
              ← BACK TO DASHBOARD
            </Link>
            <h1 className="text-6xl font-black text-secondary tracking-tighter leading-none">
              {isJobMatch ? "Job Fit Audit" : "Premium Analysis"}
            </h1>
            <p className="text-gray-500 text-lg font-medium">
              A professional audit by Amanox Pro Intelligence.
            </p>
          </div>

          <button
            onClick={() => window.print()}
            className="px-8 py-4 bg-secondary text-white rounded-2xl text-xs font-black hover:bg-black transition-all shadow-xl shadow-secondary/20 flex items-center gap-3 active:scale-95"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2.5"
                d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            EXPORT AS PDF
          </button>
        </div>

        <div className="space-y-10 animate-in fade-in slide-in-from-bottom-6 duration-700">
          {/* SECTION 1: SCORE & SUMMARY */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* RADIAL SCORE */}
            <div className="bg-white p-12 rounded-[48px] shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-2 bg-primary/20" />
              <div className="relative w-48 h-48 flex items-center justify-center mb-6">
                <svg className="w-full h-full transform -rotate-90">
                  <circle
                    cx="96"
                    cy="96"
                    r="86"
                    stroke="#F3F4F6"
                    strokeWidth="14"
                    fill="none"
                  />
                  <circle
                    cx="96"
                    cy="96"
                    r="86"
                    stroke="#18cb96"
                    strokeWidth="14"
                    fill="none"
                    strokeDasharray={540}
                    strokeDashoffset={540 - (540 * score) / 100}
                    strokeLinecap="round"
                    className="transition-all duration-1000 ease-out"
                  />
                </svg>
                <span className="absolute text-6xl font-black text-secondary tracking-tighter">
                  {score}
                </span>
              </div>
              <div
                className={`px-5 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${verdict.bg} ${verdict.color}`}
              >
                {verdict.text}
              </div>
            </div>

            {/* SUMMARY CARD */}
            <div className="lg:col-span-2 bg-white p-12 rounded-[48px] shadow-sm border border-gray-100 flex flex-col justify-between relative">
              <div className="absolute top-8 right-8 text-primary/10">
                <svg
                  className="w-20 h-20"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017V14C19.017 11.2386 16.7784 9 14.017 9V7C17.883 7 21.017 10.134 21.017 14V21H14.017ZM3.01697 21L3.01697 18C3.01697 16.8954 3.91241 16 5.01697 16H8.01697V14C8.01697 11.2386 5.77839 9 3.01697 9V7C6.88297 7 10.017 10.134 10.017 14V21H3.01697Z" />
                </svg>
              </div>
              <div className="relative z-10">
                <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] mb-6">
                  Executive Summary
                </h3>
                <p className="text-secondary text-2xl leading-snug font-bold italic opacity-90">
                  &quot;{data.summary_candidate || data.summary}&quot;
                </p>
              </div>
              <div className="grid grid-cols-3 gap-8 mt-10 pt-10 border-t border-gray-50">
                {Object.entries(data.section_scores || {}).map(([key, val]) => (
                  <div key={key}>
                    <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest mb-2">
                      {key}
                    </p>
                    <p className="text-2xl font-black text-secondary">{val}%</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* SECTION 2: KEYWORDS & GAPS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-10 rounded-3xl border border-gray-100 shadow-sm hover:border-primary/20 transition-all">
              <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500" />{" "}
                High-Value Keywords Found
              </h3>
              <div className="flex flex-wrap gap-2">
                {(data.keywords?.present || []).map((kw, i) => (
                  <span
                    key={i}
                    className="px-4 py-2 bg-primary/5 text-primary text-xs font-black rounded-xl border border-primary/10"
                  >
                    {kw}
                  </span>
                ))}
              </div>
            </div>
            <div className="bg-white p-10 rounded-3xl border border-gray-100 shadow-sm hover:border-red-200 transition-all">
              <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />{" "}
                Critical Gaps (Missing)
              </h3>
              <div className="flex flex-wrap gap-2">
                {(data.keywords?.missing || []).map((kw, i) => (
                  <span
                    key={i}
                    className="px-4 py-2 bg-red-50 text-red-600 text-xs font-black rounded-xl border border-red-100"
                  >
                    {kw}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* SECTION 3: REWRITES */}
          <div className="bg-white p-12 rounded-[48px] border border-gray-100 shadow-sm relative overflow-hidden">
            <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] mb-10">
              Amanox Pro Bullet Optimizations
            </h3>
            <div className="space-y-8">
              {(data.rewrites || []).map((item, idx) => (
                <div
                  key={idx}
                  className="group relative bg-gray-50/50 rounded-4xl p-8 border border-gray-100 hover:border-primary/20 hover:bg-white hover:shadow-xl transition-all duration-300"
                >
                  <div className="grid md:grid-cols-2 gap-12">
                    <div className="opacity-40 grayscale group-hover:opacity-100 group-hover:grayscale-0 transition-all">
                      <p className="text-[10px] font-black text-gray-400 uppercase mb-3">
                        Your Entry
                      </p>
                      <p className="text-sm font-medium leading-relaxed italic line-through decoration-red-400">
                        {item.original}
                      </p>
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-primary uppercase mb-3">
                        Optimized Version
                      </p>
                      <p className="text-base text-secondary font-black leading-relaxed">
                        {item.improved}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => copyToClipboard(item.improved)}
                    className="absolute top-6 right-6 p-3 opacity-0 group-hover:opacity-100 transition-opacity bg-white shadow-lg rounded-2xl text-primary hover:scale-110 active:scale-90"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2.5"
                        d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                      />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* SECTION 4: STRENGTHS & WEAKNESSES */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-green-50/20 p-12 rounded-[48px] border border-green-100">
              <h3 className="font-black text-green-900 text-2xl mb-8 flex items-center gap-3">
                <span className="w-10 h-10 bg-green-500 rounded-2xl flex items-center justify-center text-white text-sm">
                  ✦
                </span>
                Key Strengths
              </h3>
              <ul className="space-y-5">
                {(data.strengths || []).map((s, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 text-green-800 font-bold leading-relaxed"
                  >
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-green-500 shrink-0" />{" "}
                    {s}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-red-50/20 p-12 rounded-[48px] border border-red-100">
              <h3 className="font-black text-red-900 text-2xl mb-8 flex items-center gap-3">
                <span className="w-10 h-10 bg-red-500 rounded-2xl flex items-center justify-center text-white text-lg font-black">
                  !
                </span>
                Fix Recommendations
              </h3>
              <ul className="space-y-5">
                {(data.weaknesses || []).map((w, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 text-red-800 font-bold leading-relaxed"
                  >
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-red-500 shrink-0" />{" "}
                    {w}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* SECTION 5: MATURITY & RISK */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-10 rounded-[40px] border border-gray-100 shadow-sm">
              <h4 className="font-black text-[10px] uppercase tracking-[0.2em] text-gray-400 mb-8">
                Dev Maturity Matrix
              </h4>
              <div className="space-y-6">
                {Object.entries(data.dev_maturity || {}).map(([k, v]) => (
                  <div key={k}>
                    <div className="flex justify-between text-[10px] font-black mb-2 uppercase text-secondary/60">
                      <span>{k.replace("_score", "")}</span>
                      <span>{v}%</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary shadow-[0_0_10px_rgba(24,203,150,0.4)]"
                        style={{ width: `${v}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white p-10 rounded-[40px] border border-gray-100 col-span-1 md:col-span-2 shadow-sm">
              <h4 className="font-black text-[10px] uppercase tracking-[0.2em] text-gray-400 mb-8">
                Interview Risk Mitigation
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {(data.interview_risks || []).map((risk, i) => (
                  <div
                    key={i}
                    className="p-6 bg-red-50/30 rounded-3xl border border-red-100 group hover:bg-red-50 transition-colors"
                  >
                    <p className="text-sm font-black text-secondary mb-2">
                      {risk.area}
                    </p>
                    <p className="text-xs text-red-700 leading-relaxed font-bold">
                      Fix Strategy:{" "}
                      <span className="font-medium text-red-600">
                        {risk.fix}
                      </span>
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* SECTION 6: PROJECTS (DARK MODE ACCENT) */}
          <div className="bg-secondary rounded-[56px] p-16 text-white relative overflow-hidden shadow-2xl">
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/20 text-primary rounded-full text-[10px] font-black uppercase tracking-widest mb-8">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-ping" />
                Growth Roadmap
              </div>
              <h3 className="text-5xl font-black mb-12 tracking-tighter">
                Strategic Projects to Add
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {(data.projects_to_add || []).map((p, i) => (
                  <div
                    key={i}
                    className="p-10 bg-white/5 rounded-[40px] border border-white/10 hover:bg-white/10 transition-all group backdrop-blur-sm"
                  >
                    <p className="text-primary font-black text-2xl mb-4 group-hover:translate-x-1 transition-transform">
                      {p.title}
                    </p>
                    <p className="text-base text-gray-400 leading-relaxed mb-8 font-medium italic">
                      &quot;{p.reason}&quot;
                    </p>
                    <div className="inline-flex items-center px-5 py-2 rounded-xl bg-white/5 text-white text-[10px] font-black uppercase tracking-widest border border-white/5">
                      Market Value: {p.value}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/10 rounded-full blur-[80px] pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  );
}
