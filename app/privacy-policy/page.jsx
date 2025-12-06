"use client";

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-[#f5f7fb] pt-24 pb-20 font-sans">
      <div className="max-w-[960px] mx-auto px-6 lg:px-0">
        <div className="w-full h-0.5 mb-10 bg-linear-to-r from-transparent via-primary to-transparent opacity-60 rounded-full" />

        <header className="mb-10">
          <p className="text-xs font-semibold tracking-[0.18em] uppercase text-primary mb-3">
            Privacy Policy
          </p>
          <h1 className="text-3xl font-bold tracking-tight text-secondary mb-3">
            How Amanox AI handles your data.
          </h1>
          <p className="text-sm text-gray-600">
            This policy explains what information we collect, how we use it and
            the choices you have. We keep our language clear and direct, but
            this document still has legal effect once you use the service.
          </p>
          <p className="mt-2 text-[11px] text-gray-500">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </header>

        <div className="space-y-8 text-sm text-gray-700 leading-relaxed">
          <section>
            <h2 className="text-base font-semibold text-secondary mb-2">
              1. Who we are
            </h2>
            <p>
              Amanox AI (&quot;Amanox&quot;, &quot;we&quot;, &quot;our&quot;,
              &quot;us&quot;) is a platform that analyses resumes using multiple
              AI models to provide scores, insights and suggested improvements
              for candidates and recruiters.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-secondary mb-2">
              2. Information we collect
            </h2>
            <p className="mb-2">We collect the following types of data:</p>
            <ul className="list-disc ml-5 space-y-1">
              <li>
                <span className="font-semibold">Account information.</span>{" "}
                Name, email address, hashed password and user role
                (candidate/recruiter).
              </li>
              <li>
                <span className="font-semibold">Authentication data.</span>{" "}
                One-time passwords (OTPs) stored temporarily in Redis for
                verification, Google OAuth ID tokens (for Google sign-in), and
                session identifiers.
              </li>
              <li>
                <span className="font-semibold">Usage data.</span> Basic product
                events such as login activity, analysis requests and feature
                usage, used to keep the service secure and improve the
                experience.
              </li>
              <li>
                <span className="font-semibold">
                  Resume content (temporary).
                </span>{" "}
                When you upload a resume, we process the file in memory to
                extract text and send it to AI providers. We do not store the
                original file for long-term retention.
              </li>
              <li>
                <span className="font-semibold">Job descriptions.</span> When
                you paste a target job description, we use it to compute match
                scores and keyword gaps.
              </li>
              <li>
                <span className="font-semibold">Technical data.</span> IP
                address, device/browser information and similar data generated
                by your use of the service, which may be logged for security and
                debugging.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-base font-semibold text-secondary mb-2">
              3. How we use your information
            </h2>
            <p className="mb-2">We use your information to:</p>
            <ul className="list-disc ml-5 space-y-1">
              <li>create and manage your Amanox account;</li>
              <li>
                authenticate logins, send OTPs and maintain secure sessions;
              </li>
              <li>
                process resume files and job descriptions to generate scores,
                insights and suggested rewrites;
              </li>
              <li>
                personalise your experience (for example, candidate vs recruiter
                views);
              </li>
              <li>monitor, debug and improve the platform;</li>
              <li>
                communicate with you about product updates, security alerts or
                support responses.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-base font-semibold text-secondary mb-2">
              4. How we handle resumes and job data
            </h2>
            <p className="mb-2">
              Resumes and job descriptions are sensitive. Our approach is:
            </p>
            <ul className="list-disc ml-5 space-y-1">
              <li>
                Resume files are processed in memory for text extraction and
                analysis.
              </li>
              <li>
                We do not use resume files to train our own models or sell them
                to third parties.
              </li>
              <li>
                We may log anonymised or aggregated metrics (for example,
                overall score distributions) to improve the product, but we aim
                to avoid storing content that directly identifies you.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-base font-semibold text-secondary mb-2">
              5. Third-party services and AI providers
            </h2>
            <p className="mb-2">
              We rely on trusted third parties to run Amanox, including:
            </p>
            <ul className="list-disc ml-5 space-y-1">
              <li>
                <span className="font-semibold">AI providers.</span> We call
                models via providers such as OpenRouter. Resume text and job
                descriptions may be sent to these APIs so they can generate
                insights and scores.
              </li>
              <li>
                <span className="font-semibold">Email and OTP delivery.</span>{" "}
                We use third-party email services to deliver verification links,
                OTPs and password reset messages.
              </li>
              <li>
                <span className="font-semibold">Infrastructure & storage.</span>{" "}
                Cloud platforms, databases and Redis used to host the
                application, store user accounts, sessions and logs.
              </li>
            </ul>
            <p className="mt-2">
              These providers are only given the data necessary to perform their
              services, and we aim to choose vendors with strong security
              practices.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-secondary mb-2">
              6. Cookies and similar technologies
            </h2>
            <p className="mb-2">
              We use cookies and related technologies to keep you logged in and
              protect your account:
            </p>
            <ul className="list-disc ml-5 space-y-1">
              <li>session cookies for access and refresh tokens;</li>
              <li>CSRF protection tokens;</li>
              <li>
                cookies that remember basic preferences such as interface
                settings.
              </li>
            </ul>
            <p className="mt-2">
              For more detail, please see our{" "}
              <a
                href="/cookies"
                className="text-primary font-semibold hover:text-primary/80"
              >
                Cookie Policy
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-secondary mb-2">
              7. Legal bases and retention
            </h2>
            <p className="mb-2">
              Where applicable law requires a legal basis (for example in the
              EU/EEA), we typically rely on:
            </p>
            <ul className="list-disc ml-5 space-y-1">
              <li>
                <span className="font-semibold">Performance of a contract</span>{" "}
                – to operate your account and deliver the service you request.
              </li>
              <li>
                <span className="font-semibold">Legitimate interests</span> – to
                secure the platform, prevent abuse and understand how the
                product is used.
              </li>
              <li>
                <span className="font-semibold">Consent</span> – for certain
                communications or optional analytics where required.
              </li>
            </ul>
            <p className="mt-2">
              We retain account data for as long as your account is active and
              for a reasonable period afterwards to comply with legal
              obligations, resolve disputes and maintain security logs.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-secondary mb-2">
              8. Your rights and choices
            </h2>
            <p className="mb-2">
              Depending on your location, you may have rights such as:
            </p>
            <ul className="list-disc ml-5 space-y-1">
              <li>accessing the personal data we hold about you;</li>
              <li>requesting corrections to inaccurate information;</li>
              <li>
                requesting deletion of your account and certain associated data;
              </li>
              <li>objecting to or restricting certain processing;</li>
              <li>withdrawing consent where we rely on it.</li>
            </ul>
            <p className="mt-2">
              To exercise any of these rights, contact us at{" "}
              <span className="font-semibold">contact@amanox.in</span>. We may
              need to verify your identity before responding.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-secondary mb-2">
              9. Security
            </h2>
            <p>
              We use reasonable technical and organisational measures to protect
              your data, including hashed passwords, token-based authentication
              and rate-limited OTP flows. No system is perfectly secure, but we
              actively monitor for abuse and improve our defences over time.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-secondary mb-2">
              10. Changes to this policy
            </h2>
            <p>
              We may update this Privacy Policy as our product evolves or legal
              requirements change. When we make material changes, we will update
              the &quot;Last updated&quot; date above and, where appropriate,
              notify you through the product or by email.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-secondary mb-2">
              11. Contact
            </h2>
            <p>
              If you have questions about this policy or how we handle data,
              please contact{" "}
              <span className="font-semibold">contact@amanox.in</span> or use
              the contact form on our{" "}
              <a
                href="/contact"
                className="text-primary font-semibold hover:text-primary/80"
              >
                Contact page
              </a>
              .
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
