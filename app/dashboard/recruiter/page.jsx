"use client";

import { AppData } from "@/context/appContext";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function RecruiterDashboard() {
  const { user, loading } = AppData();
  const router = useRouter();

  // Role Protection: Kick candidates out
  useEffect(() => {
    if (!loading && user && user.role !== "recruiter") {
      router.replace("/dashboard/candidate");
    }
  }, [user, loading, router]);

  if (loading) return null;

  return (
    <div className="min-h-screen bg-[#FAFAFA] pt-32 pb-12 px-6 font-sans">
      <div className="max-w-[1200px] mx-auto">
        {/* HEADER */}
        <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 bg-purple-100 text-purple-700 text-xs font-bold uppercase rounded-full">
                Recruiter Workspace
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-secondary">
              Welcome,{" "}
              <span className="text-purple-600">
                {user?.name?.split(" ")[0]}
              </span>
            </h1>
            <p className="text-gray-500 mt-2 text-lg">
              Manage your job postings and screen candidates.
            </p>
          </div>

          <button className="px-6 py-3 bg-secondary text-white font-bold rounded-xl shadow-lg hover:bg-[#232530] transition-all flex items-center gap-2">
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
                d="M12 4v16m8-8H4"
              />
            </svg>
            Post New Job
          </button>
        </div>

        {/* METRICS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
            <p className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-2">
              Active Jobs
            </p>
            <p className="text-4xl font-extrabold text-secondary">0</p>
          </div>
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
            <p className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-2">
              New Applicants
            </p>
            <p className="text-4xl font-extrabold text-purple-600">0</p>
          </div>
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
            <p className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-2">
              Interviews
            </p>
            <p className="text-4xl font-extrabold text-secondary">0</p>
          </div>
        </div>

        {/* EMPTY STATE */}
        <div className="bg-white rounded-3xl p-12 text-center border border-dashed border-gray-200">
          <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-300">
            <svg
              className="w-10 h-10"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-secondary mb-2">
            No Active Jobs
          </h3>
          <p className="text-gray-500 mb-8 max-w-md mx-auto">
            Get started by creating your first job posting to attract top talent
            using our AI matching.
          </p>
          <button className="px-8 py-3 bg-purple-600 text-white font-bold rounded-full shadow-lg shadow-purple-200 hover:bg-purple-700 transition-all">
            Create First Job
          </button>
        </div>
      </div>
    </div>
  );
}
