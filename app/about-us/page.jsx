"use client";

import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#f5f7fb] pt-24 pb-20 font-sans">
      <div className="max-w-[1120px] mx-auto px-6 lg:px-0">
        {/* Top accent line */}
        <div className="w-full h-0.5 mb-10 bg-linear-to-r from-transparent via-primary to-transparent opacity-60 rounded-full" />

        {/* Hero */}
        <section className="mb-14">
          <p className="text-xs font-semibold tracking-[0.18em] uppercase text-primary mb-3">
            About Amanox Platform
          </p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-secondary mb-5">
            We help every resume speak at{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-emerald-300">
              expert level.
            </span>
          </h1>
          <p className="text-base sm:text-lg text-gray-600 max-w-3xl leading-relaxed">
            Amanox AI is your personal panel of top AI models – working together
            to analyse your resume, spotlight your strengths, and highlight the
            gaps that matter. Instead of generic feedback, you get a clear,
            multi-angle report that shows what a hiring manager would see.
          </p>
        </section>

        {/* 3 columns: Problem / Solution / Philosophy */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm shadow-gray-100/60 p-6">
            <p className="text-xs font-semibold text-primary/80 tracking-[0.18em] uppercase mb-3">
              The Problem
            </p>
            <h3 className="font-semibold text-secondary mb-3">
              Great skills, weak signalling.
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Most resumes undersell the person behind them. Wrong keywords,
              vague bullet points and poor formatting stop strong candidates
              from passing ATS filters or impressing recruiters.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm shadow-gray-100/60 p-6">
            <p className="text-xs font-semibold text-primary/80 tracking-[0.18em] uppercase mb-3">
              Our Approach
            </p>
            <h3 className="font-semibold text-secondary mb-3">
              Multi-model resume intelligence.
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              You upload your resume, choose an expert panel (GPT-5, Gemini,
              Grok and more), and Amanox blends their insights into a single,
              actionable report: score, missing skills, keyword gaps and
              suggested rewrites.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm shadow-gray-100/60 p-6">
            <p className="text-xs font-semibold text-primary/80 tracking-[0.18em] uppercase mb-3">
              Our Philosophy
            </p>
            <h3 className="font-semibold text-secondary mb-3">
              AI as your career co-pilot.
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              We don&apos;t replace your judgement; we amplify it. Amanox gives
              you clear, honest feedback so you can decide what to keep, what to
              rewrite and how to position yourself for the roles you actually
              want.
            </p>
          </div>
        </section>

        {/* How it works */}
        <section className="mb-16">
          <div className="flex items-center justify-between gap-4 mb-6">
            <h2 className="text-xl sm:text-2xl font-bold text-secondary">
              How Amanox works
            </h2>
            <span className="inline-flex items-center gap-2 text-xs font-semibold text-primary bg-primary/10 border border-primary/20 px-3 py-1 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              Multi-model, job-aware analysis
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
            {[
              {
                step: "01",
                title: "Upload your resume",
                body: "Drop a PDF or DOCX and we safely process the text without permanently storing your file.",
              },
              {
                step: "02",
                title: "Pick your expert panel",
                body: "Combine models like GPT-5, Gemini and Grok to review your profile from different angles.",
              },
              {
                step: "03",
                title: "Add the target job",
                body: "Paste a job description to see match score, missing keywords and role-specific feedback.",
              },
              {
                step: "04",
                title: "Apply with confidence",
                body: "Use our suggested rewrites and keyword insights to ship a sharper, more focused resume.",
              },
            ].map((item) => (
              <div
                key={item.step}
                className="relative bg-white rounded-2xl border border-gray-100 shadow-[0_18px_45px_-22px_rgba(15,23,42,0.25)] p-5"
              >
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-xl bg-primary/10 text-[11px] font-bold text-primary mb-4">
                  {item.step}
                </span>
                <h3 className="font-semibold text-secondary mb-2 text-sm">
                  {item.title}
                </h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Candidate vs Recruiter */}
        <section className="mb-16 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 relative overflow-hidden">
            <div className="absolute -top-16 -right-16 w-40 h-40 rounded-full bg-primary/10 blur-3xl" />
            <h2 className="text-lg font-bold text-secondary mb-2">
              Built for candidates.
            </h2>
            <p className="text-sm text-gray-600 mb-4">
              Whether you&apos;re a student, mid-career professional or career
              switcher, Amanox translates AI feedback into plain language you
              can act on.
            </p>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-start gap-2">
                <span className="mt-1 w-1.5 h-1.5 rounded-full bg-primary" />
                <span>
                  Clear resume score with breakdown across impact, skills and
                  formatting.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 w-1.5 h-1.5 rounded-full bg-primary" />
                <span>
                  Suggested rewrites that keep your voice but sharpen your
                  positioning.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 w-1.5 h-1.5 rounded-full bg-primary" />
                <span>
                  Target-job mode to see how well you fit a specific role.
                </span>
              </li>
            </ul>
          </div>

          <div className="bg-secondary text-white rounded-2xl shadow-[0_18px_45px_-22px_rgba(15,23,42,0.7)] p-6 relative overflow-hidden">
            <div className="absolute -bottom-24 -right-20 w-56 h-56 rounded-full bg-primary/25 blur-3xl" />
            <h2 className="text-lg font-bold mb-2">Designed for recruiters.</h2>
            <p className="text-sm text-gray-100/80 mb-4">
              Recruiter accounts get a more critical, signal-focused view:
              strengths, risks and fit for the role – without fluff.
            </p>
            <ul className="space-y-2 text-sm text-gray-100/90">
              <li className="flex items-start gap-2">
                <span className="mt-1 w-1.5 h-1.5 rounded-full bg-primary" />
                <span>
                  Objective scoring tuned for screening speed, not candidate
                  coaching.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 w-1.5 h-1.5 rounded-full bg-primary" />
                <span>
                  Keyword and skill coverage aligned with the job description.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 w-1.5 h-1.5 rounded-full bg-primary" />
                <span>Faster signal on who to prioritise for next steps.</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Privacy & Trust */}
        <section className="mb-10">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col md:flex-row items-start md:items-center gap-5">
            <div className="shrink-0 w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
              <span className="w-6 h-6 rounded-full border border-primary/40 flex items-center justify-center">
                <span className="w-2.5 h-2.5 rounded-full bg-primary" />
              </span>
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-secondary mb-2">
                Privacy by design.
              </h3>
              <p className="text-sm text-gray-600 mb-2">
                We only store what we need to run your account: your name,
                email, hashed password and basic session data. Resume files are
                processed in memory and not kept after analysis. We route AI
                calls through trusted providers like OpenRouter, and
                continuously review how data flows through the system.
              </p>
              <div className="flex flex-wrap gap-3 text-xs">
                <Link
                  href="/privacy-policy"
                  className="inline-flex items-center px-4 py-2 rounded-full border border-gray-200 bg-gray-50 hover:bg-white hover:border-primary/40 text-gray-700 hover:text-primary font-medium transition-all"
                >
                  Read our Privacy Policy
                </Link>
                <Link
                  href="/terms"
                  className="inline-flex items-center px-4 py-2 rounded-full border border-transparent bg-secondary hover:bg-black text-white font-semibold transition-all"
                >
                  View Terms of Service
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
