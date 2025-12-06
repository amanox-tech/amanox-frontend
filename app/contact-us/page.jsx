"use client";

import Link from "next/link";
import { useState } from "react";

export default function ContactPage() {
  const [loading, setLoading] = useState(false);

  // purely UI – you can wire this to API later
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // TODO: call your backend / ticket system
    setTimeout(() => setLoading(false), 800);
  };

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
          {/* Form card */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-[0_18px_45px_-22px_rgba(15,23,42,0.25)] p-6 sm:p-7">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Full Name" required>
                  <input
                    required
                    className="w-full px-3.5 py-3 rounded-xl bg-gray-50 border border-gray-200 text-sm text-gray-800 outline-none focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all"
                    placeholder="Jane Doe"
                  />
                </Field>
                <Field label="Email" required>
                  <input
                    type="email"
                    required
                    className="w-full px-3.5 py-3 rounded-xl bg-gray-50 border border-gray-200 text-sm text-gray-800 outline-none focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all"
                    placeholder="you@company.com"
                  />
                </Field>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="I'm contacting you as">
                  <select className="w-full px-3.5 py-3 rounded-xl bg-gray-50 border border-gray-200 text-sm text-gray-800 outline-none focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all">
                    <option>Candidate</option>
                    <option>Student</option>
                    <option>Recruiter / Hiring Manager</option>
                    <option>Career Coach</option>
                    <option>Other</option>
                  </select>
                </Field>
                <Field label="Topic">
                  <select className="w-full px-3.5 py-3 rounded-xl bg-gray-50 border border-gray-200 text-sm text-gray-800 outline-none focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all">
                    <option>Product support</option>
                    <option>Feature idea</option>
                    <option>Billing / accounts</option>
                    <option>Partnership / recruiter plans</option>
                    <option>Other</option>
                  </select>
                </Field>
              </div>

              <Field label="How can we help?" required>
                <textarea
                  required
                  rows={5}
                  className="w-full px-3.5 py-3 rounded-xl bg-gray-50 border border-gray-200 text-sm text-gray-800 outline-none resize-none focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all"
                  placeholder="Share a bit of context, links or examples so we can respond with something useful."
                />
              </Field>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-3">
                <button
                  disabled={loading}
                  className="inline-flex items-center justify-center px-5 py-3 rounded-xl bg-secondary hover:bg-[#232530] text-white text-sm font-semibold shadow-lg shadow-secondary/25 hover:shadow-xl hover:-translate-y-0.5 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <span className="inline-flex h-4 w-4 mr-2 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                      Sending…
                    </>
                  ) : (
                    "Send message"
                  )}
                </button>
                <p className="text-[11px] text-gray-500 max-w-xs">
                  By submitting, you agree that we may use your details to
                  contact you about this request. We don&apos;t add you to a
                  marketing list without consent.
                </p>
              </div>
            </form>
          </div>

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
                href="/about"
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
                  href="/terms"
                  className="px-3 py-1.5 rounded-full bg-gray-50 border border-gray-200 hover:border-primary/40 hover:text-primary transition-all"
                >
                  Terms of Service
                </Link>
                <Link
                  href="/cookies"
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

function Field({ label, required, children }) {
  return (
    <label className="block text-xs text-gray-700 font-semibold">
      <span className="ml-0.5">
        {label}
        {required && <span className="text-red-500"> *</span>}
      </span>
      <div className="mt-2">{children}</div>
    </label>
  );
}
