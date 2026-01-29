"use client";

import Link from "next/link";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#FAFAFA] pt-32 pb-20 font-sans selection:bg-primary/20">
      <div className="max-w-[1120px] mx-auto px-6 lg:px-0">
        {/* Top Accent Line */}
        <div className="w-full h-1 mb-12 bg-linear-to-r from-transparent via-primary to-transparent opacity-40 rounded-full" />

        {/* Heading Section */}
        <div className="mb-14 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-[10px] font-black tracking-[0.3em] uppercase text-primary mb-4">
              Get In Touch
            </p>
            <h1 className="text-5xl lg:text-7xl font-black tracking-tighter text-secondary mb-6 leading-none">
              How can we <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-primary via-emerald-400 to-teal-600">
                help you?
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-500 font-medium leading-relaxed">
              Have a question about your resume audit or need help with your
              account? Our team is here to support your career journey.
            </p>
          </div>

          <div className="flex">
            <span className="inline-flex items-center px-5 py-2 rounded-full bg-primary/10 border border-primary/20 text-[10px] font-black text-primary uppercase tracking-widest shadow-sm">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse mr-2" />
              Response under 24 hours
            </span>
          </div>
        </div>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* LEFT: Primary Contact Card */}
          <div className="lg:col-span-7">
            <div className="bg-secondary text-white rounded-[3rem] p-10 lg:p-14 shadow-2xl relative overflow-hidden group">
              <div className="relative z-10">
                <h2 className="text-3xl font-black mb-6 tracking-tight">
                  Support & General
                </h2>
                <p className="text-gray-400 text-lg mb-10 font-medium leading-relaxed">
                  Stuck with something? Whether it&apos;s a technical issue or
                  just feedback on our AI, we&apos;d love to hear from you.
                </p>

                <div className="space-y-6">
                  <div className="p-6 bg-white/5 rounded-3xl border border-white/10 hover:bg-white/10 transition-all">
                    <p className="text-[10px] font-black text-primary uppercase tracking-widest mb-1">
                      Email Us At
                    </p>
                    <a
                      href="mailto:contact@amanox.in"
                      className="text-2xl font-black hover:text-primary transition-colors"
                    >
                      contact@amanox.in
                    </a>
                  </div>
                </div>
              </div>

              {/* Abstract Glow */}
              <div className="absolute top-0 right-0 w-80 h-80 bg-primary/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 group-hover:bg-primary/20 transition-all duration-700" />
            </div>
          </div>

          {/* RIGHT: Secondary Info Column */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            {/* Business/Recruiter Card */}
            <div className="bg-white rounded-[2.5rem] border border-gray-100 p-10 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-xl font-black text-secondary mb-4 tracking-tight">
                For Teams & Recruiters
              </h3>
              <p className="text-sm text-gray-500 font-medium leading-relaxed mb-6">
                Looking to use Amanox Pro for your company? We offer special
                tools for high-volume resume screening and custom scoring.
              </p>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-xs font-black text-primary uppercase tracking-widest hover:opacity-80 transition-all"
              >
                Learn about recruiter mode →
              </Link>
            </div>

            {/* Legal Links Card */}
            <div className="bg-gray-50 rounded-[2.5rem] border border-dashed border-gray-200 p-10">
              <h3 className="text-[10px] font-black text-gray-400 mb-6 uppercase tracking-[0.2em]">
                Legal & Safety
              </h3>
              <p className="text-xs text-gray-500 font-medium mb-6 leading-relaxed">
                Questions about how we handle your resume data or AI providers?
                Check our official documents below.
              </p>
              <div className="flex flex-wrap gap-3">
                {[
                  { name: "Privacy", href: "/privacy-policy" },
                  { name: "Terms", href: "/terms-policy" },
                  { name: "Cookies", href: "/cookies-policy" },
                ].map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="px-5 py-2.5 rounded-xl bg-white border border-gray-200 text-[10px] font-black uppercase tracking-widest hover:border-primary/50 hover:text-primary transition-all shadow-sm"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
