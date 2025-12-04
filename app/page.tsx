"use client";

import Link from "next/link";
import { AppData } from "@/context/appContext";

export default function Home() {
  const { isAuth } = AppData();

  return (
    <div className="min-h-screen bg-white font-sans overflow-hidden">
      {/* --- HERO SECTION --- */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 px-6">
        <div className="max-w-[1440px] mx-auto grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="relative z-10 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary-dark text-xs font-bold uppercase tracking-wider mb-6">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
              AI-Powered Resume Builder
            </div>

            <h1 className="text-5xl lg:text-7xl font-bold text-secondary leading-[1.1] mb-6 tracking-tight">
              Build a Resume that <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-emerald-600">
                Wins Interviews.
              </span>
            </h1>

            <p className="text-lg text-gray-500 mb-8 leading-relaxed max-w-lg">
              Don&apos;t let an algorithm reject your dream job. Amanox uses
              advanced AI to analyze, score, and optimize your resume for ATS
              systems in seconds.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              {!isAuth ? (
                <>
                  <Link
                    href="/register"
                    className="px-8 py-4 bg-secondary text-white rounded-full font-bold shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-center"
                  >
                    Analyze My Resume - Free
                  </Link>
                  <Link
                    href="/login"
                    className="px-8 py-4 bg-white text-secondary border border-gray-200 rounded-full font-bold hover:border-secondary transition-all duration-300 text-center"
                  >
                    View Sample Report
                  </Link>
                </>
              ) : (
                <Link
                  href="/dashboard"
                  className="px-8 py-4 bg-primary text-white rounded-full font-bold shadow-lg shadow-primary/30 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-center flex items-center justify-center gap-2"
                >
                  Go to Dashboard
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
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </Link>
              )}
            </div>

            <div className="mt-10 flex items-center gap-4 text-sm text-gray-400">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className={`w-8 h-8 rounded-full border-2 border-white bg-gray-${
                      i + 2
                    }00`}
                  ></div>
                ))}
              </div>
              <p>Trusted by 10,000+ professionals</p>
            </div>
          </div>

          {/* Right Visual (Abstract Glass UI) */}
          <div className="relative hidden lg:block h-[600px] w-full">
            {/* Background Blob */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-linear-to-tr from-primary/20 to-blue-500/10 rounded-full blur-[100px]"></div>

            {/* Main Floating Card */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[500px] bg-white/40 backdrop-blur-xl border border-white/50 rounded-3xl shadow-2xl p-6 flex flex-col gap-4 transform -rotate-6 hover:rotate-0 transition-transform duration-500">
              {/* Mock UI Header */}
              <div className="flex items-center justify-between border-b border-black/5 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-200"></div>
                  <div>
                    <div className="w-24 h-3 bg-gray-800/10 rounded mb-1"></div>
                    <div className="w-16 h-2 bg-gray-800/5 rounded"></div>
                  </div>
                </div>
                <div className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full">
                  Score: 92
                </div>
              </div>

              {/* Mock UI Body */}
              <div className="space-y-3 mt-2">
                <div className="w-full h-2 bg-gray-800/5 rounded"></div>
                <div className="w-3/4 h-2 bg-gray-800/5 rounded"></div>
                <div className="w-full h-2 bg-gray-800/5 rounded"></div>
              </div>

              {/* Scanning Line Animation */}
              <div className="absolute top-0 left-0 w-full h-1 bg-primary shadow-[0_0_20px_rgba(24,203,150,0.8)] animate-[scan_3s_ease-in-out_infinite]"></div>
            </div>

            {/* Floating Badge 1 */}
            <div className="absolute top-[20%] right-[10%] bg-white p-4 rounded-2xl shadow-xl animate-bounce duration-3000">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-bold uppercase">
                    ATS Check
                  </p>
                  <p className="font-bold text-secondary">Passed</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- FEATURES SECTION --- */}
      <section className="py-24 bg-[#FAFAFA]">
        <div className="max-w-[1440px] mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-secondary mb-4">
              Why Choose Amanox?
            </h2>
            <p className="text-gray-500">
              We don&apos;t just check for typos. We analyze the structure,
              impact, and keywords of your resume to maximize your hiring
              potential.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-md transition-shadow border border-gray-100">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                <svg
                  className="w-7 h-7 text-primary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-secondary mb-3">
                Smart Scoring
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                Get a score from 0-100 based on industry standards, formatting,
                and impact metrics.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-md transition-shadow border border-gray-100">
              <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center mb-6">
                <svg
                  className="w-7 h-7 text-blue-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-secondary mb-3">
                Instant Fixes
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                AI suggests stronger action verbs and better phrasing to make
                your achievements stand out.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-md transition-shadow border border-gray-100">
              <div className="w-14 h-14 rounded-2xl bg-purple-50 flex items-center justify-center mb-6">
                <svg
                  className="w-7 h-7 text-purple-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-secondary mb-3">
                ATS Optimized
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                Ensure your resume passes the automated Applicant Tracking
                Systems used by 99% of Fortune 500 companies.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- CTA SECTION --- */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto bg-secondary rounded-[3rem] p-12 lg:p-20 text-center relative overflow-hidden">
          {/* Background Accents */}
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/20 blur-[100px] rounded-full"></div>
          <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-blue-500/20 blur-[80px] rounded-full"></div>

          <div className="relative z-10">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Ready to upgrade your career?
            </h2>
            <p className="text-gray-300 text-lg mb-10 max-w-xl mx-auto">
              Join thousands of job seekers who secured interviews at top
              companies using Amanox.
            </p>
            {!isAuth ? (
              <Link
                href="/register"
                className="inline-block px-10 py-4 bg-primary text-white text-lg font-bold rounded-full shadow-[0_0_20px_rgba(24,203,150,0.4)] hover:shadow-[0_0_30px_rgba(24,203,150,0.6)] hover:-translate-y-1 transition-all duration-300"
              >
                Get Started for Free
              </Link>
            ) : (
              <Link
                href="/dashboard"
                className="inline-block px-10 py-4 bg-white text-secondary text-lg font-bold rounded-full hover:bg-gray-100 transition-all duration-300"
              >
                Go to Dashboard
              </Link>
            )}
          </div>
        </div>
      </section>

      <style jsx global>{`
        @keyframes scan {
          0%,
          100% {
            top: 0%;
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          50% {
            top: 100%;
          }
        }
      `}</style>
    </div>
  );
}
