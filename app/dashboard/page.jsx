"use client";

import { AppData } from "@/context/appContext";
import Link from "next/link";

export default function DashboardPage() {
  const { user, loading } = AppData();

  if (loading) {
    return (
      // FIXED: Added 'pt-20' to account for the fixed Navbar height.
      // This ensures the spinner doesn't "jump" or get hidden behind the header.
      <div className="min-h-screen flex items-center justify-center bg-gray-50 pt-20">
        <div className="flex flex-col items-center gap-4">
          <svg
            className="animate-spin h-10 w-10 text-primary"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          <p className="text-secondary font-medium animate-pulse">
            Loading workspace...
          </p>
        </div>
      </div>
    );
  }

  return (
    // FIXED: Increased padding to 'pt-32' (128px) or 'pt-36' to ensure
    // content always starts cleanly below the 80px Navbar.
    <div className="min-h-screen bg-[#FAFAFA] pt-32 pb-12 px-6">
      <div className="max-w-[1200px] mx-auto">
        {/* HEADER SECTION */}
        <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-secondary">
              Good evening,{" "}
              <span className="text-primary">{user?.name?.split(" ")[0]}</span>
            </h1>
            <p className="text-gray-500 mt-2 text-lg">
              Ready to optimize your professional profile today?
            </p>
          </div>

          <div className="hidden md:block">
            <span className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium bg-primary/10 text-primary-dark">
              Starter Plan
            </span>
          </div>
        </div>

        {/* BENTO GRID LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* MAIN CARD: NEW ANALYSIS (Takes up 2/3 on Desktop) */}
          <div className="lg:col-span-2 bg-white rounded-3xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-primary/10 transition-colors"></div>

            <div className="relative z-10">
              <h2 className="text-2xl font-bold text-secondary mb-2">
                New Resume Analysis
              </h2>
              <p className="text-gray-500 mb-8 max-w-md">
                Upload your CV to get instant AI feedback, scoring, and
                improvement suggestions.
              </p>

              {/* Upload Dropzone Visual */}
              <div className="border-2 border-dashed border-gray-200 rounded-2xl p-10 flex flex-col items-center justify-center bg-gray-50/50 hover:bg-gray-50 hover:border-primary/50 transition-all cursor-pointer group/drop">
                <div className="w-16 h-16 bg-white rounded-full shadow-sm flex items-center justify-center mb-4 group-hover/drop:scale-110 transition-transform">
                  <svg
                    className="w-8 h-8 text-primary"
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
                  Click to upload or drag and drop
                </p>
                <p className="text-sm text-gray-400 mt-1">
                  PDF, DOCX up to 10MB
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: STATS & INFO */}
          <div className="flex flex-col gap-6">
            {/* Stat Card 1 */}
            <div className="bg-secondary text-white rounded-3xl p-6 shadow-lg relative overflow-hidden">
              {/* Abstract decorative circle */}
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-white/10 rounded-full blur-xl"></div>

              <p className="text-gray-300 text-sm font-medium mb-1">
                Resume Score
              </p>
              <div className="flex items-end gap-2">
                <span className="text-5xl font-bold text-primary">--</span>
                <span className="text-gray-400 mb-1">/ 100</span>
              </div>
              <p className="text-xs text-gray-400 mt-4">
                Upload a resume to see your score.
              </p>
            </div>

            {/* Stat Card 2 */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex-1">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-secondary">Recent Scans</h3>
                <Link
                  href="#"
                  className="text-xs text-primary font-bold hover:underline"
                >
                  View All
                </Link>
              </div>

              {/* Empty State */}
              <div className="h-full flex flex-col items-center justify-center text-center pb-4 opacity-60">
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mb-2">
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
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                    />
                  </svg>
                </div>
                <p className="text-sm text-gray-500">No scans yet</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
