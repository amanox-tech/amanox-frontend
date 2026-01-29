"use client";

import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-6 font-sans overflow-hidden selection:bg-primary/20">
      {/* Background Decor */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-size-[32px_32px] pointer-events-none"></div>
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />

      <div className="relative z-10 text-center max-w-xl">
        {/* 3D Animated 404 Text */}
        <div className="relative mb-12 perspective-1000">
          <h1 className="text-[180px] font-black text-secondary leading-none tracking-tighter opacity-10 select-none">
            404
          </h1>
          <div className="absolute inset-0 flex items-center justify-center translate-z-50 animate-hover-3d">
            <h2 className="text-8xl font-black text-secondary tracking-tighter">
              Lost?
            </h2>
          </div>
        </div>

        {/* Simple English Message */}
        <div className="space-y-4 mb-12">
          <h3 className="text-2xl font-black text-secondary">Page Not Found</h3>
          <p className="text-gray-500 font-medium text-lg leading-relaxed">
            Even the best AI gets lost sometimes. The page you are looking for
            doesn&apos;t exist or has been moved.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/dashboard"
            className="px-10 py-4 bg-primary text-white font-black rounded-2xl shadow-xl shadow-primary/20 hover:scale-105 transition-all uppercase tracking-widest text-xs"
          >
            Back to Dashboard
          </Link>
          <Link
            href="/"
            className="px-10 py-4 bg-gray-50 text-secondary border border-gray-100 font-black rounded-2xl hover:bg-gray-100 transition-all uppercase tracking-widest text-xs"
          >
            Go Home
          </Link>
        </div>

        {/* Branding Footer */}
        <p className="mt-16 text-[10px] font-black text-gray-300 uppercase tracking-[0.4em]">
          Amanox Pro Intelligence
        </p>
      </div>

      <style jsx global>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .translate-z-50 {
          transform: translateZ(50px);
        }

        @keyframes hover-3d {
          0%,
          100% {
            transform: rotateY(-10deg) rotateX(5deg) translateZ(50px);
          }
          50% {
            transform: rotateY(10deg) rotateX(-5deg) translateZ(70px);
          }
        }
        .animate-hover-3d {
          animation: hover-3d 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
