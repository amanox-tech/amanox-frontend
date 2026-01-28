"use client";

import Link from "next/link";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#FAFAFA] pt-32 pb-20 font-sans selection:bg-primary/20 leading-relaxed">
      <div className="max-w-[850px] mx-auto px-6">
        {/* Top Accent Line */}
        <div className="w-full h-1 mb-12 bg-linear-to-r from-transparent via-primary to-transparent opacity-40 rounded-full" />

        {/* Header Section */}
        <header className="mb-16">
          <p className="text-[10px] font-black tracking-[0.3em] uppercase text-primary mb-4">
            Terms of Service
          </p>
          <h1 className="text-4xl lg:text-6xl font-black tracking-tighter text-secondary mb-6 leading-none">
            The Rules of <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-primary via-emerald-400 to-teal-600">
              Amanox Pro.
            </span>
          </h1>
          <p className="text-lg text-gray-500 font-medium max-w-2xl leading-relaxed">
            By using our platform, you agree to follow these simple rules. We
            keep them clear so you know exactly what to expect.
          </p>
          <p className="mt-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">
            Last Updated: {new Date().toLocaleDateString()}
          </p>
        </header>

        {/* Content Body */}
        <div className="space-y-12 text-gray-600">
          <section className="group">
            <h2 className="text-xl font-black text-secondary mb-4 flex items-center gap-3">
              <span className="text-primary opacity-20 group-hover:opacity-100 transition-opacity">
                01.
              </span>
              Our Relationship
            </h2>
            <p className="font-medium text-gray-500">
              Amanox Pro is an AI-powered service. When you create an account,
              you are entering into a legal agreement with us. These terms apply
              to all visitors and users of the platform.
            </p>
          </section>

          <section className="group">
            <h2 className="text-xl font-black text-secondary mb-4 flex items-center gap-3">
              <span className="text-primary opacity-20 group-hover:opacity-100 transition-opacity">
                02.
              </span>
              Account Rules
            </h2>
            <div className="grid gap-6 mt-6">
              {[
                {
                  title: "One User per Account",
                  body: "You are responsible for keeping your login and password safe. Do not share your account with others.",
                },
                {
                  title: "True Information",
                  body: "You agree to provide real information when you sign up. Fake accounts may be suspended.",
                },
                {
                  title: "Age Requirement",
                  body: "You must be at least 18 years old (or the legal age in your country) to use this service.",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="p-6 bg-white rounded-3xl border border-gray-100 shadow-sm"
                >
                  <h4 className="font-black text-secondary text-sm mb-1 uppercase tracking-tight">
                    {item.title}
                  </h4>
                  <p className="text-sm text-gray-500 font-medium">
                    {item.body}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section className="group">
            <h2 className="text-xl font-black text-secondary mb-4 flex items-center gap-3">
              <span className="text-primary opacity-20 group-hover:opacity-100 transition-opacity">
                03.
              </span>
              Proper Use
            </h2>
            <p className="font-medium text-gray-500 mb-6">
              We want Amanox to be a safe place for everyone. You agree NOT to:
            </p>
            <ul className="space-y-4">
              {[
                "Try to hack, scrape, or break our website.",
                "Upload viruses or harmful files.",
                "Use our AI results to make illegal decisions.",
                "Copy our design, code, or branding without permission.",
              ].map((text, i) => (
                <li
                  key={i}
                  className="flex items-center gap-3 text-sm font-bold text-gray-500"
                >
                  <span className="w-1.5 h-1.5 bg-primary rounded-full" />{" "}
                  {text}
                </li>
              ))}
            </ul>
          </section>

          <section className="group">
            <h2 className="text-xl font-black text-secondary mb-4 flex items-center gap-3">
              <span className="text-primary opacity-20 group-hover:opacity-100 transition-opacity">
                04.
              </span>
              AI Disclaimer
            </h2>
            <div className="bg-secondary rounded-[2.5rem] p-8 text-white relative overflow-hidden">
              <p className="text-sm font-bold relative z-10 leading-relaxed mb-4">
                Our AI gives expert advice, but it is still software. Please
                remember:
              </p>
              <ul className="space-y-3 relative z-10 text-xs font-medium text-gray-300">
                <li>• AI results are suggestions, not guaranteed facts.</li>
                <li>
                  • We are not responsible if you do not get a job after using
                  our tool.
                </li>
                <li>
                  • Always double-check your resume before sending it to an
                  employer.
                </li>
              </ul>
              <div className="absolute top-0 right-0 w-40 h-40 bg-primary/10 rounded-full blur-[60px]" />
            </div>
          </section>

          <section className="group">
            <h2 className="text-xl font-black text-secondary mb-4 flex items-center gap-3">
              <span className="text-primary opacity-20 group-hover:opacity-100 transition-opacity">
                05.
              </span>
              Coins & Payments
            </h2>
            <p className="font-medium text-gray-500">
              Amanox Pro uses a coin system for audits. Each audit costs 10
              coins. Once coins are used for an audit, they cannot be refunded.
              If we change our prices, we will notify you through the app.
            </p>
          </section>

          <section className="group">
            <h2 className="text-xl font-black text-secondary mb-4 flex items-center gap-3">
              <span className="text-primary opacity-20 group-hover:opacity-100 transition-opacity">
                06.
              </span>
              Stopping Service
            </h2>
            <p className="font-medium text-gray-500">
              You can stop using Amanox at any time. We may also stop your
              access if you break these rules or if we are legally required to
              do so.
            </p>
          </section>

          <hr className="border-gray-100" />

          <section className="text-center py-10">
            <h2 className="text-2xl font-black text-secondary mb-4 tracking-tight">
              Need help?
            </h2>
            <p className="text-gray-500 font-medium mb-8">
              By using Amanox, you also agree to our{" "}
              <Link href="/privacy-policy" className="text-primary underline">
                Privacy Policy
              </Link>
              .
            </p>
            <a
              href="mailto:contact@amanox.in"
              className="inline-block px-10 py-4 bg-primary text-white font-black rounded-2xl text-xs uppercase tracking-widest hover:scale-105 transition-all shadow-xl shadow-primary/20"
            >
              Email Support
            </a>
          </section>
        </div>
      </div>
    </div>
  );
}
