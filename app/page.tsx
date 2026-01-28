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
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[32px_32px] pointer-events-none"></div>

        {/* Ambient Top Glows - Using your Turquoise #18cb96 */}
        <div className="absolute top-0 right-0 w-[1000px] h-[1000px] bg-linear-to-bl from-primary/10 to-transparent rounded-full blur-[120px] pointer-events-none opacity-60"></div>

        <div className="max-w-[1440px] mx-auto grid lg:grid-cols-12 gap-16 items-center relative z-10">
          {/* LEFT: Content (Simple English) */}
          <div className="lg:col-span-7 relative z-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-gray-100 text-secondary text-[10px] font-black uppercase tracking-[0.2em] mb-10 shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              Amanox Pro Intelligence
            </div>

            <h1 className="text-6xl lg:text-[90px] font-black text-secondary leading-[0.95] mb-8 tracking-tighter">
              Fix Your Resume. <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-primary via-emerald-400 to-teal-600">
                Get More Interviews.
              </span>
            </h1>

            <p className="text-xl text-gray-500 mb-12 leading-relaxed font-medium max-w-xl">
              Don&apos;t let a bad resume stop you from getting your dream job.
              Our smart AI checks your resume like a real HR manager and tells
              you exactly what to change.
            </p>

            <div className="flex flex-col sm:flex-row gap-6">
              {!isAuth ? (
                <Link
                  href="/register"
                  className="px-12 py-5 bg-secondary text-white rounded-2xl font-black shadow-2xl shadow-secondary/40 hover:shadow-primary/30 hover:-translate-y-1 hover:bg-primary transition-all duration-500 text-center flex items-center justify-center gap-3 group"
                >
                  Check My Resume Now
                  <svg
                    className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={3}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </Link>
              ) : (
                <Link
                  href="/dashboard"
                  className="px-12 py-5 bg-primary text-white rounded-2xl font-black shadow-xl shadow-primary/20 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 text-center"
                >
                  Open Dashboard
                </Link>
              )}
            </div>

            <p className="mt-14 text-[11px] font-black text-gray-400 uppercase tracking-[0.3em] flex items-center gap-3">
              <span className="w-8 h-px bg-gray-200" />
              World&apos;s Smartest Resume Auditor
            </p>
          </div>

          {/* RIGHT: 3D Holographic Animation */}
          <div className="lg:col-span-5 relative h-[650px] w-full hidden lg:flex items-center justify-center perspective-2000">
            <div className="relative w-[360px] h-[500px] preserve-3d rotate-y-[-15deg] rotate-x-10 animate-hover-3d">
              {/* Main Resume Sheet */}
              <div className="absolute inset-0 bg-white rounded-[3rem] shadow-glass border border-gray-100 p-10 overflow-hidden z-20">
                {/* Subtle Light Reflection */}
                <div className="absolute inset-0 bg-linear-to-tr from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

                {/* Internal Content Skeleton */}
                <div className="space-y-8 relative z-10">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-gray-50 rounded-2xl border border-gray-100 flex items-center justify-center overflow-hidden">
                      <div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse" />
                    </div>
                    <div className="space-y-2 flex-1">
                      <div className="h-3 w-2/3 bg-gray-100 rounded-full" />
                      <div className="h-2 w-1/3 bg-gray-50 rounded-full" />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="h-2.5 w-full bg-gray-50 rounded-full" />
                    <div className="h-2.5 w-full bg-gray-50 rounded-full" />
                    <div className="h-2.5 w-4/5 bg-gray-50 rounded-full" />
                  </div>

                  <div className="pt-6 space-y-6">
                    <div className="h-24 w-full bg-gray-50/50 rounded-3xl border border-dashed border-gray-200 p-5 flex flex-col justify-center">
                      <div className="h-2 w-1/4 bg-primary/20 rounded-full mb-3" />
                      <div className="h-2 w-full bg-gray-100 rounded-full" />
                    </div>
                  </div>
                </div>

                {/* The Precision Scan Beam */}
                <div className="absolute left-0 w-full h-1 bg-primary z-50 shadow-[0_0_25px_rgba(24,203,150,0.8)] animate-scan-precise" />
                <div className="absolute left-0 w-full h-32 bg-linear-to-b from-primary/10 to-transparent z-40 animate-scan-precise" />
              </div>

              {/* Result Chips */}
              <div className="absolute top-[15%] -right-16 z-50 bg-secondary text-white p-5 rounded-4xl shadow-2xl translate-z-50 animate-float-x border border-gray-700">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-black text-sm">
                    85
                  </div>
                  <div>
                    <div className="text-[9px] font-black text-primary uppercase tracking-widest">
                      Score
                    </div>
                    <div className="text-xs font-bold">Top Quality</div>
                  </div>
                </div>
              </div>

              <div className="absolute bottom-[25%] -left-12 z-50 bg-white p-5 rounded-4xl shadow-2xl translate-z-40 animate-float-x-reverse border border-gray-50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center text-primary">
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
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                  </div>
                  <div>
                    <div className="text-[9px] font-black text-gray-400 uppercase tracking-widest">
                      Improve
                    </div>
                    <div className="text-xs font-bold text-secondary">
                      New Tips
                    </div>
                  </div>
                </div>
              </div>

              {/* Background Glow */}
              <div className="absolute -inset-10 bg-primary/10 rounded-full blur-[80px] -z-10 animate-pulse-slow" />
            </div>
          </div>
        </div>
      </section>

      {/* --- REASONING SECTION (Simple English) --- */}
      <section className="py-32 bg-secondary text-white relative overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-6 relative z-10">
          <div className="grid md:grid-cols-3 gap-20">
            <div className="space-y-6">
              <div className="text-primary font-black tracking-tighter text-6xl opacity-20">
                01
              </div>
              <h4 className="text-2xl font-bold">Better Words</h4>
              <p className="text-gray-400 text-sm leading-relaxed">
                We rewrite your boring sentences into high-impact lines that
                recruiters love to read.
              </p>
            </div>
            <div className="space-y-6">
              <div className="text-primary font-black tracking-tighter text-6xl opacity-20">
                02
              </div>
              <h4 className="text-2xl font-bold">Find Mistakes</h4>
              <p className="text-gray-400 text-sm leading-relaxed">
                Instantly find errors or missing information that would get your
                resume rejected.
              </p>
            </div>
            <div className="space-y-6">
              <div className="text-primary font-black tracking-tighter text-6xl opacity-20">
                03
              </div>
              <h4 className="text-2xl font-bold">Job Matching</h4>
              <p className="text-gray-400 text-sm leading-relaxed">
                Paste a job link and we will tell you exactly how to change your
                resume to fit that job perfectly.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- CALL TO ACTION --- */}
      <section className="py-32 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-6xl lg:text-[84px] font-black text-secondary mb-10 tracking-tighter leading-tight">
            Apply with <br /> Confidence.
          </h2>
          <p className="text-gray-500 text-xl mb-14 max-w-2xl mx-auto font-medium">
            Don&apos;t keep waiting for calls. Audit your resume today and get
            hired faster.
          </p>
          {!isAuth ? (
            <Link
              href="/register"
              className="inline-block px-16 py-6 bg-primary text-white text-xl font-black rounded-[2.5rem] shadow-2xl shadow-primary/40 hover:scale-105 transition-all duration-500"
            >
              Check My Resume — 10 Coins
            </Link>
          ) : (
            <Link
              href="/dashboard"
              className="inline-block px-16 py-6 bg-secondary text-white text-xl font-black rounded-[2.5rem] hover:bg-black transition-all"
            >
              Go to Dashboard
            </Link>
          )}
          <p className="mt-10 text-[11px] text-gray-400 font-black uppercase tracking-[0.5em]">
            Easy. Accurate. Fast.
          </p>
        </div>
      </section>

      <style jsx global>{`
        /* 3D Effects */
        .perspective-2000 {
          perspective: 2000px;
        }
        .preserve-3d {
          transform-style: preserve-3d;
        }
        .translate-z-50 {
          transform: translateZ(50px);
        }
        .translate-z-40 {
          transform: translateZ(40px);
        }

        /* Scans */
        @keyframes scan-precise {
          0% {
            top: -5%;
          }
          100% {
            top: 105%;
          }
        }
        .animate-scan-precise {
          animation: scan-precise 4s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }

        /* 3D Floating */
        @keyframes hover-3d {
          0%,
          100% {
            transform: rotateY(-15deg) rotateX(10deg) translateY(0);
          }
          50% {
            transform: rotateY(-10deg) rotateX(12deg) translateY(-15px);
          }
        }
        .animate-hover-3d {
          animation: hover-3d 6s ease-in-out infinite;
        }

        /* Chips */
        @keyframes float-x {
          0%,
          100% {
            transform: translateZ(50px) translateX(0);
          }
          50% {
            transform: translateZ(70px) translateX(15px);
          }
        }
        .animate-float-x {
          animation: float-x 5s ease-in-out infinite;
        }

        @keyframes float-x-reverse {
          0%,
          100% {
            transform: translateZ(40px) translateX(0);
          }
          50% {
            transform: translateZ(60px) translateX(-15px);
          }
        }
        .animate-float-x-reverse {
          animation: float-x-reverse 6s ease-in-out infinite 0.5s;
        }

        @keyframes pulse-slow {
          0%,
          100% {
            opacity: 0.4;
            transform: scale(1);
          }
          50% {
            opacity: 0.6;
            transform: scale(1.1);
          }
        }
        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
