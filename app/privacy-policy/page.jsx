"use client";

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-[#FAFAFA] pt-32 pb-20 font-sans selection:bg-primary/20 leading-relaxed">
      <div className="max-w-[850px] mx-auto px-6">
        {/* Top Accent Line */}
        <div className="w-full h-1 mb-12 bg-linear-to-r from-transparent via-primary to-transparent opacity-40 rounded-full" />

        {/* Header Section */}
        <header className="mb-16">
          <p className="text-[10px] font-black tracking-[0.3em] uppercase text-primary mb-4">
            Security & Privacy
          </p>
          <h1 className="text-4xl lg:text-6xl font-black tracking-tighter text-secondary mb-6 leading-none">
            Your data is yours. <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-primary via-emerald-400 to-teal-600">
              We just audit it.
            </span>
          </h1>
          <p className="text-lg text-gray-500 font-medium max-w-2xl leading-relaxed">
            We use simple English here because we want you to understand exactly
            how we handle your information. No confusing legal talk—just clear
            facts.
          </p>
          <p className="mt-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">
            Effective Date: {new Date().toLocaleDateString()}
          </p>
        </header>

        {/* Content Body */}
        <div className="space-y-12 text-gray-600">
          <section className="group">
            <h2 className="text-xl font-black text-secondary mb-4 flex items-center gap-3">
              <span className="text-primary opacity-20 group-hover:opacity-100 transition-opacity">
                01.
              </span>
              Who we are
            </h2>
            <p className="font-medium text-gray-500">
              Amanox Pro is a high-accuracy AI platform that helps job seekers
              find mistakes in their resumes. We are built for candidates who
              want an elite, honest audit of their career profiles.
            </p>
          </section>

          <section className="group">
            <h2 className="text-xl font-black text-secondary mb-4 flex items-center gap-3">
              <span className="text-primary opacity-20 group-hover:opacity-100 transition-opacity">
                02.
              </span>
              Information we collect
            </h2>
            <div className="grid gap-6 mt-6">
              {[
                {
                  title: "Account Details",
                  body: "We only store your name, email address, and a safely hidden (hashed) password.",
                },
                {
                  title: "Resume Text",
                  body: "We read your resume to analyze it. We do NOT store your original file for long-term use.",
                },
                {
                  title: "Job Data",
                  body: "When you paste a job link, we use it to see if you are a good match for that role.",
                },
                {
                  title: "Technical Logs",
                  body: "We log your IP address temporarily to stop bots and keep our system safe.",
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
              How we use your info
            </h2>
            <p className="font-medium text-gray-500 mb-6">
              We only use your information to make the platform work for you.
              This includes:
            </p>
            <ul className="space-y-4">
              {[
                "Giving you an accurate resume score and tips.",
                "Keeping your account secure and sending login codes.",
                "Improving our AI engine so it gives better advice.",
                "Answering your support questions.",
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
              Safety first
            </h2>
            <p className="font-medium text-gray-500 mb-4">
              Resumes are personal. We treat them with the highest level of
              care:
            </p>
            <div className="bg-secondary rounded-[2.5rem] p-8 text-white relative overflow-hidden">
              <ul className="space-y-4 relative z-10">
                <li className="flex gap-4">
                  <span className="text-primary font-black">✓</span>
                  <p className="text-sm font-bold">
                    We NEVER sell your data to anyone.
                  </p>
                </li>
                <li className="flex gap-4">
                  <span className="text-primary font-black">✓</span>
                  <p className="text-sm font-bold">
                    We NEVER use your resume to train our own AI models.
                  </p>
                </li>
                <li className="flex gap-4">
                  <span className="text-primary font-black">✓</span>
                  <p className="text-sm font-bold">
                    Files are deleted as soon as the audit is finished.
                  </p>
                </li>
              </ul>
              <div className="absolute top-0 right-0 w-40 h-40 bg-primary/10 rounded-full blur-[60px]" />
            </div>
          </section>

          <hr className="border-gray-100" />

          <section className="text-center py-10">
            <h2 className="text-2xl font-black text-secondary mb-4 tracking-tight">
              Questions?
            </h2>
            <p className="text-gray-500 font-medium mb-8">
              We are happy to help you. Reach out to us anytime.
            </p>
            <a
              href="mailto:contact@amanox.in"
              className="inline-block px-10 py-4 bg-primary text-white font-black rounded-2xl shadow-xl shadow-primary/20 hover:scale-105 transition-all"
            >
              contact@amanox.in
            </a>
          </section>
        </div>
      </div>
    </div>
  );
}
