"use client";

import Link from "next/link";
import { AppData } from "@/context/appContext";

export default function Home() {
  const { isAuth } = AppData();

  return (
    <div className="min-h-screen bg-white font-sans overflow-x-hidden selection:bg-primary/20">
      {/* --- HERO SECTION --- */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 px-6 overflow-hidden">
        {/* Subtle Background Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[24px_24px] pointer-events-none"></div>

        {/* Ambient Top Glow */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-linear-to-bl from-primary/10 to-transparent rounded-full blur-[100px] pointer-events-none opacity-50"></div>

        <div className="max-w-[1440px] mx-auto grid lg:grid-cols-12 gap-12 items-center relative z-10">
          {/* LEFT: The Pitch (Span 5) */}
          <div className="lg:col-span-5 relative z-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-50 border border-gray-200 text-secondary text-xs font-bold uppercase tracking-wider mb-8 shadow-sm">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary"></span>
              </span>
              Multi-Model AI Analysis
            </div>

            <h1 className="text-5xl lg:text-7xl font-extrabold text-secondary leading-[1.05] mb-6 tracking-tight">
              Why rely on one AI? <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-primary via-teal-500 to-blue-600">
                Get the panel.
              </span>
            </h1>

            <p className="text-xl text-gray-500 mb-10 leading-relaxed font-medium">
              Don&apos;t guess what the algorithm wants. Let{" "}
              <strong>GPT-5, Gemini, and Grok</strong> analyze your resume
              simultaneously to uncover blind spots a single AI misses.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              {!isAuth ? (
                <Link
                  href="/register"
                  className="px-8 py-4 bg-secondary text-white rounded-full font-bold shadow-xl shadow-secondary/20 hover:shadow-2xl hover:-translate-y-1 hover:bg-black transition-all duration-300 text-center flex items-center justify-center gap-2"
                >
                  Start Free Analysis
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </Link>
              ) : (
                <Link
                  href="/dashboard"
                  className="px-8 py-4 bg-primary text-white rounded-full font-bold shadow-xl shadow-primary/20 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 text-center"
                >
                  Go to Dashboard
                </Link>
              )}
            </div>

            <div className="mt-12 flex items-center gap-6 opacity-40 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500 cursor-default">
              <span className="text-sm font-bold flex items-center gap-1">
                <span className="text-green-600 text-lg">●</span> OpenAI
              </span>
              <span className="text-sm font-bold flex items-center gap-1">
                <span className="text-blue-600 text-lg">●</span> Google
              </span>
              <span className="text-sm font-bold flex items-center gap-1">
                <span className="text-black text-lg">●</span> xAI
              </span>
            </div>
          </div>

          {/* RIGHT: The Animation (Span 7) */}
          <div className="lg:col-span-7 relative h-[600px] w-full perspective-2000 hidden lg:block">
            <div className="fusion-core-container absolute inset-0 flex items-center justify-center transform-style-3d rotate-y-[-5deg] rotate-x-[5deg]">
              {/* --- CENTERPIECE: The Resume --- */}
              <div className="relative z-30 w-[260px] h-[360px] bg-white rounded-2xl shadow-[0_20px_60px_-10px_rgba(0,0,0,0.1)] border border-gray-100 flex flex-col p-5 animate-float-slow">
                {/* Inner Content */}
                <div className="w-14 h-14 bg-gray-50 rounded-xl mb-4 flex items-center justify-center border border-gray-50">
                  <svg
                    className="w-6 h-6 text-gray-300"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                  </svg>
                </div>
                <div className="space-y-3">
                  <div className="h-2 w-full bg-gray-100 rounded"></div>
                  <div className="h-2 w-3/4 bg-gray-100 rounded"></div>
                  <div className="h-2 w-full bg-gray-50 rounded"></div>
                  <div className="h-2 w-5/6 bg-gray-50 rounded"></div>
                </div>

                {/* Consensus Score Badge (Overlaid) */}
                <div className="absolute -right-12 top-8 bg-secondary text-white px-4 py-2 rounded-lg shadow-xl flex items-center gap-3 animate-pop-in-late border border-gray-700">
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                    <svg
                      className="w-4 h-4 text-white"
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
                  <div>
                    <div className="text-[10px] font-bold text-gray-400 uppercase">
                      Consensus
                    </div>
                    <div className="text-lg font-bold leading-none">98.5%</div>
                  </div>
                </div>
              </div>

              {/* --- AI NODE 1: GPT-5 (Green) --- */}
              <div className="ai-node absolute top-[15%] left-[10%] animate-orbit-1">
                <div className="w-20 h-20 bg-white rounded-full border border-green-100 shadow-[0_10px_40px_-10px_rgba(34,197,94,0.3)] flex items-center justify-center relative z-20">
                  <span className="text-xs font-bold text-gray-700">GPT-5</span>
                  {/* Spinning Ring */}
                  <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-green-500 border-l-green-500/30 animate-spin-slow"></div>
                </div>
                {/* Moving Beam */}
                <div className="absolute top-1/2 left-1/2 h-[3px] w-[250px] bg-gray-100 origin-left rotate-25 z-10 overflow-hidden rounded-full">
                  <div className="absolute inset-0 bg-linear-to-r from-transparent via-green-500 to-transparent animate-beam-flow"></div>
                </div>
              </div>

              {/* --- AI NODE 2: Gemini (Blue) --- */}
              <div className="ai-node absolute top-[45%] right-[0%] animate-orbit-2">
                <div className="w-20 h-20 bg-white rounded-full border border-blue-100 shadow-[0_10px_40px_-10px_rgba(59,130,246,0.3)] flex items-center justify-center relative z-20">
                  <span className="text-xs font-bold text-gray-700">
                    Gemini
                  </span>
                  {/* Spinning Ring */}
                  <div className="absolute inset-0 rounded-full border-2 border-transparent border-r-blue-500 border-b-blue-500/30 animate-spin-reverse-slow"></div>
                </div>
                {/* Moving Beam */}
                <div className="absolute top-1/2 left-1/2 h-[3px] w-[280px] bg-gray-100 origin-left rotate-165 z-10 overflow-hidden rounded-full">
                  <div className="absolute inset-0 bg-linear-to-r from-transparent via-blue-500 to-transparent animate-beam-flow-delay-1"></div>
                </div>
              </div>

              {/* --- AI NODE 3: Grok (Dark) --- */}
              <div className="ai-node absolute bottom-[1%] left-[15%] animate-orbit-3">
                <div className="w-20 h-20 bg-white rounded-full border border-gray-200 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] flex items-center justify-center relative z-20">
                  <span className="text-xs font-bold text-gray-700">
                    Grok-3
                  </span>
                  {/* Spinning Ring */}
                  <div className="absolute inset-0 rounded-full border-2 border-dashed border-gray-400 animate-spin-slow"></div>
                </div>
                {/* Moving Beam */}
                <div className="absolute top-1/2 left-1/2 h-[3px] w-[250px] bg-gray-100 origin-left rotate-[-35deg] z-10 overflow-hidden rounded-full">
                  <div className="absolute inset-0 bg-linear-to-r from-transparent via-gray-800 to-transparent animate-beam-flow-delay-2"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- FEATURES SECTION --- */}
      <section className="py-24 bg-gray-50 border-t border-gray-100">
        <div className="max-w-[1440px] mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-secondary mb-4">
              Everything you need to get hired
            </h2>
            <p className="text-gray-500">
              Simple typos can ruin your chances. Amanox goes deeper—analyzing
              context, impact, and keywords to ensure you pass the 6-second
              recruiter scan.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
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
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-secondary mb-3">
                Multi-Model Consensus
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                Different ATS systems look for different things. By using three
                distinct AI engines, we ensure your resume appeals to the widest
                possible audience.
              </p>
            </div>

            {/* Feature 2 - Target Job Match */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-primary/20 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group">
              <div className="absolute top-0 right-0 bg-primary text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl">
                NEW
              </div>
              <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
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
                Target Job Match
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                Paste the Job Description. Our AI panel analyzes how well your
                resume fits <em>that specific role</em> and tells you exactly
                which keywords you are missing.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
              <div className="w-14 h-14 rounded-2xl bg-purple-50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
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
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-secondary mb-3">
                1-Click Improvements
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                Stuck on what to say? Our AI acts as a career coach, suggesting
                stronger action verbs and better phrasing to make your
                achievements stand out.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- CTA SECTION --- */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto bg-secondary rounded-[3rem] p-12 lg:p-20 text-center relative overflow-hidden shadow-2xl">
          {/* Background Accents */}
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/20 blur-[100px] rounded-full"></div>
          <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-blue-500/20 blur-[80px] rounded-full"></div>

          <div className="relative z-10">
            <h2 className="text-4xl lg:text-5xl font-extrabold text-white mb-6">
              Ready to land your dream job?
            </h2>
            <p className="text-gray-300 text-lg mb-10 max-w-xl mx-auto font-medium">
              Join thousands of professionals who are getting hired 3x faster
              with Amanox.
            </p>
            {!isAuth ? (
              <Link
                href="/register"
                className="inline-block px-12 py-5 bg-primary text-white text-lg font-bold rounded-full shadow-[0_0_30px_rgba(24,203,150,0.4)] hover:shadow-[0_0_50px_rgba(24,203,150,0.6)] hover:-translate-y-1 hover:scale-105 transition-all duration-300"
              >
                Analyze My Resume Now
              </Link>
            ) : (
              <Link
                href="/dashboard"
                className="inline-block px-12 py-5 bg-white text-secondary text-lg font-bold rounded-full hover:bg-gray-100 transition-all duration-300"
              >
                Go to Dashboard
              </Link>
            )}
            <p className="mt-6 text-xs text-gray-500 uppercase tracking-widest font-bold">
              No Credit Card Required
            </p>
          </div>
        </div>
      </section>

      <style jsx global>{`
        /* 3D UTILITIES */
        .perspective-2000 {
          perspective: 2000px;
        }
        .transform-style-3d {
          transform-style: preserve-3d;
        }

        /* ANIMATIONS */
        @keyframes float-slow {
          0%,
          100% {
            transform: translateY(0) rotateX(0);
          }
          50% {
            transform: translateY(-15px) rotateX(2deg);
          }
        }
        @keyframes orbit-1 {
          0%,
          100% {
            transform: translateZ(50px) translateY(0px);
          }
          50% {
            transform: translateZ(80px) translateY(-20px);
          }
        }
        @keyframes orbit-2 {
          0%,
          100% {
            transform: translateZ(-50px) translateY(0px);
          }
          50% {
            transform: translateZ(-20px) translateY(20px);
          }
        }
        @keyframes orbit-3 {
          0%,
          100% {
            transform: translateZ(20px) translateX(0px);
          }
          50% {
            transform: translateZ(60px) translateX(10px);
          }
        }

        @keyframes pop-in-late {
          0% {
            opacity: 0;
            transform: scale(0.8) translateY(20px);
          }
          70% {
            opacity: 0;
            transform: scale(0.8) translateY(20px);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        .animate-pop-in-late {
          animation: pop-in-late 2s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }

        /* NEW: BEAM & SPIN ANIMATIONS */
        @keyframes beam-flow {
          0% {
            transform: translateX(-100%);
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            transform: translateX(100%);
            opacity: 0;
          }
        }
        .animate-beam-flow {
          animation: beam-flow 2s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }
        .animate-beam-flow-delay-1 {
          animation: beam-flow 2s cubic-bezier(0.4, 0, 0.2, 1) infinite 0.6s;
        }
        .animate-beam-flow-delay-2 {
          animation: beam-flow 2s cubic-bezier(0.4, 0, 0.2, 1) infinite 1.2s;
        }

        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        @keyframes spin-reverse {
          from {
            transform: rotate(360deg);
          }
          to {
            transform: rotate(0deg);
          }
        }
        .animate-spin-slow {
          animation: spin 8s linear infinite;
        }
        .animate-spin-reverse-slow {
          animation: spin-reverse 8s linear infinite;
        }
      `}</style>
    </div>
  );
}
