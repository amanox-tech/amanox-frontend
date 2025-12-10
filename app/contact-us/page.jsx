"use client";

import Link from "next/link";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#f5f7fb] pt-24 pb-20 font-sans">
      <div className="max-w-[1120px] mx-auto px-6 lg:px-0">
        {/* Top accent */}
        <div className="w-full h-0.5 mb-10 bg-linear-to-r from-transparent via-primary to-transparent opacity-60 rounded-full" />

        {/* Heading */}
        <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-semibold tracking-[0.18em] uppercase text-primary mb-3">
              Contact
            </p>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-secondary mb-3">
              Let&apos;s talk about your next role.
            </h1>
            <p className="text-sm sm:text-base text-gray-600 max-w-2xl leading-relaxed">
              Whether you&apos;re a candidate polishing your profile or a
              recruiter exploring bulk screening, we&apos;re here to help. Reach
              out and we&apos;ll respond as soon as possible.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-[11px] font-semibold text-primary uppercase tracking-[0.16em]">
              Average response &lt; 24 hours
            </span>
          </div>
        </div>

        {/* Main layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-8">
          {/* Info card */}
          <div className="space-y-5">
            <div className="bg-secondary text-white rounded-2xl p-6 relative overflow-hidden">
              <div className="absolute -top-20 -right-16 w-40 h-40 bg-primary/30 blur-3xl rounded-full" />
              <h2 className="text-lg font-semibold mb-2">Support & general</h2>
              <p className="text-sm text-gray-100/85 mb-4">
                Questions about your account, analysis results or something not
                working as expected?
              </p>
              <div className="space-y-2 text-sm">
                <p className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                  <span>Support email: contact@amanox.in</span>
                </p>
                <p className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                  <span>Product feedback: contact@amanox.in</span>
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 p-6">
              <h3 className="text-sm font-semibold text-secondary mb-3">
                For recruiters & teams
              </h3>
              <p className="text-xs text-gray-600 mb-4">
                If you&apos;re exploring Amanox for a hiring team, we can help
                design a flow for bulk resume screens or role-specific scoring.
              </p>
              <ul className="space-y-2 text-xs text-gray-600 mb-4">
                <li>• Priority onboarding support</li>
                <li>• Recruiter-specific scoring profiles</li>
                <li>• Feedback loops to tune evaluations</li>
              </ul>
              <Link
                href="/about-us"
                className="inline-flex text-xs font-semibold text-primary hover:text-primary/80"
              >
                Learn more about how Amanox works →
              </Link>
            </div>

            <div className="bg-white rounded-2xl border border-dashed border-gray-200 p-5">
              <h3 className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-[0.16em]">
                Legal & privacy
              </h3>
              <p className="text-xs text-gray-600 mb-3">
                For questions about data handling, AI providers or privacy,
                please refer to our policies or reach out directly.
              </p>
              <div className="flex flex-wrap gap-2 text-[11px]">
                <Link
                  href="/privacy-policy"
                  className="px-3 py-1.5 rounded-full bg-gray-50 border border-gray-200 hover:border-primary/40 hover:text-primary transition-all"
                >
                  Privacy Policy
                </Link>
                <Link
                  href="/terms-policy"
                  className="px-3 py-1.5 rounded-full bg-gray-50 border border-gray-200 hover:border-primary/40 hover:text-primary transition-all"
                >
                  Terms of Service
                </Link>
                <Link
                  href="/cookies-policy"
                  className="px-3 py-1.5 rounded-full bg-gray-50 border border-gray-200 hover:border-primary/40 hover:text-primary transition-all"
                >
                  Cookie Policy
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
