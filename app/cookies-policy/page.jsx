"use client";

import Link from "next/link";

export default function CookiePolicyPage() {
  return (
    <div className="min-h-screen bg-[#FAFAFA] pt-32 pb-20 font-sans selection:bg-primary/20 leading-relaxed">
      <div className="max-w-[850px] mx-auto px-6">
        {/* Top Accent Line */}
        <div className="w-full h-1 mb-12 bg-linear-to-r from-transparent via-primary to-transparent opacity-40 rounded-full" />

        {/* Header Section */}
        <header className="mb-16">
          <p className="text-[10px] font-black tracking-[0.3em] uppercase text-primary mb-4">
            Cookie Policy
          </p>
          <h1 className="text-4xl lg:text-6xl font-black tracking-tighter text-secondary mb-6 leading-none">
            How we use <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-primary via-emerald-400 to-teal-600">
              Cookies.
            </span>
          </h1>
          <p className="text-lg text-gray-500 font-medium max-w-2xl leading-relaxed">
            Cookies are small files that help our website work properly. They
            help us keep you logged in and ensure your data stays safe.
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
              What are Cookies?
            </h2>
            <p className="font-medium text-gray-500">
              Think of cookies as a memory for a website. When you visit Amanox,
              we use these small text files to remember who you are so you
              don&apos;t have to log in every single time you change a page.
            </p>
          </section>

          <section className="group">
            <h2 className="text-xl font-black text-secondary mb-4 flex items-center gap-3">
              <span className="text-primary opacity-20 group-hover:opacity-100 transition-opacity">
                02.
              </span>
              Why we use them
            </h2>
            <div className="grid gap-6 mt-6">
              {[
                {
                  title: "Keeping You Logged In",
                  body: "We use cookies to identify your session. Without these, you would be logged out instantly.",
                },
                {
                  title: "Account Safety",
                  body: "Cookies help us stop hackers from trying to access your account or sending fake requests.",
                },
                {
                  title: "Your Preferences",
                  body: "We remember if you prefer certain settings so the app feels right every time you open it.",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="p-6 bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
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
              Strictly Necessary
            </h2>
            <p className="font-medium text-gray-500 mb-6">
              Some cookies are **mandatory**. If you turn these off in your
              browser, Amanox Pro will not function. These are used for:
            </p>
            <ul className="space-y-4">
              {[
                "Login & Authentication tokens.",
                "Security & Fraud prevention.",
                "Basic site performance.",
              ].map((text, i) => (
                <li
                  key={i}
                  className="flex items-center gap-3 text-sm font-bold text-gray-500"
                >
                  <span className="w-1.5 h-1.5 bg-primary rounded-full shadow-[0_0_8px_rgba(24,203,150,0.6)]" />{" "}
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
              Your Choices
            </h2>
            <p className="font-medium text-gray-500 mb-4">
              You can choose to delete or block cookies through your browser
              settings. However, please remember:
            </p>
            <div className="bg-secondary rounded-[2.5rem] p-8 text-white relative overflow-hidden">
              <p className="text-sm font-bold relative z-10 leading-relaxed italic">
                &quot;If you block all cookies, you will not be able to log in
                to your account or use the Amanox Pro Audit tool.&quot;
              </p>
              <div className="absolute top-0 right-0 w-40 h-40 bg-primary/10 rounded-full blur-[60px]" />
            </div>
          </section>

          <hr className="border-gray-100" />

          <section className="text-center py-10">
            <h2 className="text-2xl font-black text-secondary mb-4 tracking-tight">
              Need more info?
            </h2>
            <p className="text-gray-500 font-medium mb-8">
              If you have more questions about your privacy, we are happy to
              help.
            </p>
            <div className="flex justify-center gap-4">
              <Link
                href="/privacy-policy"
                className="px-8 py-4 bg-gray-50 border border-gray-100 text-secondary font-black rounded-2xl text-xs uppercase tracking-widest hover:bg-gray-100 transition-all"
              >
                Privacy Policy
              </Link>
              <a
                href="mailto:contact@amanox.in"
                className="px-8 py-4 bg-primary text-white font-black rounded-2xl text-xs uppercase tracking-widest hover:scale-105 transition-all shadow-xl shadow-primary/20"
              >
                Email Us
              </a>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
