"use client";

import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#f5f7fb] pt-32 pb-20 font-sans selection:bg-primary/20">
      <div className="max-w-[1120px] mx-auto px-6 lg:px-0">
        {/* Top accent line */}
        <div className="w-full h-1 mb-12 bg-linear-to-r from-transparent via-primary to-transparent opacity-40 rounded-full" />

        {/* Hero Section - Simple English */}
        <section className="mb-16">
          <p className="text-[10px] font-black tracking-[0.3em] uppercase text-primary mb-4">
            Amanox Pro Intelligence
          </p>
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tighter text-secondary mb-6 leading-[0.95]">
            We help you build a <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-primary via-emerald-400 to-teal-600">
              perfect resume.
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-500 max-w-3xl leading-relaxed font-medium">
            Amanox is a high-end AI tool designed to check your resume like a
            professional recruiter. We find the small mistakes and big gaps that
            stop you from getting hired.
          </p>
        </section>

        {/* 3 columns: Why / How / Goal */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm p-8 group hover:shadow-xl transition-all duration-500">
            <h3 className="font-black text-secondary mb-4 text-xl tracking-tight">
              The Problem
            </h3>
            <p className="text-sm text-gray-500 leading-relaxed font-medium">
              Most resumes are not read by humans first—they are scanned by
              software. If your resume has the wrong words or bad formatting,
              you will never get an interview.
            </p>
          </div>

          <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm p-8 group hover:shadow-xl transition-all duration-500">
            <h3 className="font-black text-secondary mb-4 text-xl tracking-tight">
              Our Solution
            </h3>
            <p className="text-sm text-gray-500 leading-relaxed font-medium">
              We use elite AI intelligence to scan your resume. We give you a
              score, find missing skills, and rewrite your sentences to make
              them sound professional.
            </p>
          </div>

          <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm p-8 group hover:shadow-xl transition-all duration-500">
            <h3 className="font-black text-secondary mb-4 text-xl tracking-tight">
              Our Goal
            </h3>
            <p className="text-sm text-gray-500 leading-relaxed font-medium">
              We want to give every candidate the same advantage that experts
              have. With Amanox, you can apply for any job with total
              confidence.
            </p>
          </div>
        </section>

        {/* How it works - Removed Model Mentions */}
        <section className="mb-20">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
            <h2 className="text-3xl font-black text-secondary tracking-tighter">
              How Amanox Works
            </h2>
            <span className="inline-flex items-center gap-2 text-[10px] font-black text-primary bg-primary/10 border border-primary/20 px-5 py-2 rounded-full uppercase tracking-widest">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              Professional Grade Audit
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              {
                step: "01",
                title: "Upload Resume",
                body: "Drop your PDF file. We read the text safely and never keep your files.",
              },
              {
                step: "02",
                title: "AI Audit",
                body: "Our smart engine checks your resume for mistakes and impact.",
              },
              {
                step: "03",
                title: "Job Match",
                body: "Paste a job link to see if you are a good fit for that specific role.",
              },
              {
                step: "04",
                title: "Fix & Apply",
                body: "Use our tips to fix your resume and start applying to companies.",
              },
            ].map((item) => (
              <div
                key={item.step}
                className="relative bg-white rounded-3xl border border-gray-50 shadow-sm p-8 hover:-translate-y-2 transition-all duration-500"
              >
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-2xl bg-primary/10 text-xs font-black text-primary mb-6">
                  {item.step}
                </span>
                <h3 className="font-black text-secondary mb-3 text-base">
                  {item.title}
                </h3>
                <p className="text-xs text-gray-500 leading-relaxed font-medium">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Trust & Privacy Section */}
        <section className="mb-20">
          <div className="bg-secondary text-white rounded-[3rem] p-10 lg:p-16 flex flex-col md:flex-row items-center gap-10 relative overflow-hidden shadow-2xl">
            <div className="shrink-0 w-20 h-20 rounded-4xl bg-primary flex items-center justify-center shadow-[0_0_40px_rgba(24,203,150,0.4)]">
              <svg
                className="w-10 h-10 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={3}
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
            </div>
            <div className="flex-1 relative z-10">
              <h3 className="text-3xl font-black mb-4 tracking-tighter">
                Your data is safe.
              </h3>
              <p className="text-lg text-gray-300 mb-8 font-medium leading-relaxed max-w-2xl">
                We take privacy very seriously. We do not sell your data. Your
                resume files are deleted immediately after the analysis is
                finished. We only store your email to manage your account.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/privacy-policy"
                  className="px-8 py-3 rounded-2xl bg-white/10 hover:bg-white/20 text-white text-xs font-black uppercase tracking-widest transition-all"
                >
                  Privacy Policy
                </Link>
                <Link
                  href="/terms-policy"
                  className="px-8 py-3 rounded-2xl bg-primary text-white text-xs font-black uppercase tracking-widest hover:scale-105 transition-all shadow-lg shadow-primary/20"
                >
                  Terms of Service
                </Link>
              </div>
            </div>
            {/* Background Accent */}
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/10 blur-[100px] rounded-full translate-x-1/2 -translate-y-1/2" />
          </div>
        </section>
      </div>
    </div>
  );
}
