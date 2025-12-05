"use client";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#f5f7fb] pt-24 pb-20 font-sans">
      <div className="max-w-[960px] mx-auto px-6 lg:px-0">
        <div className="w-full h-0.5 mb-10 bg-linear-to-r from-transparent via-primary to-transparent opacity-60 rounded-full" />

        <header className="mb-10">
          <p className="text-xs font-semibold tracking-[0.18em] uppercase text-primary mb-3">
            Terms of Service
          </p>
          <h1 className="text-3xl font-bold tracking-tight text-secondary mb-3">
            The rules for using Amanox AI.
          </h1>
          <p className="text-sm text-gray-600">
            By creating an account or using the platform, you agree to these
            terms. Please read them carefully before using Amanox.
          </p>
          <p className="mt-2 text-[11px] text-gray-500">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </header>

        <div className="space-y-8 text-sm text-gray-700 leading-relaxed">
          <section>
            <h2 className="text-base font-semibold text-secondary mb-2">
              1. Your relationship with Amanox
            </h2>
            <p>
              These Terms of Service (&quot;Terms&quot;) form a contract between
              you and Amanox AI (&quot;Amanox&quot;, &quot;we&quot;,
              &quot;our&quot;). They govern your access to and use of our
              website, web application and related services (collectively, the
              &quot;Service&quot;).
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-secondary mb-2">
              2. Eligibility and accounts
            </h2>
            <ul className="list-disc ml-5 space-y-1">
              <li>
                You must be legally able to form a contract in your region.
              </li>
              <li>
                You are responsible for keeping your login credentials secure
                and for all activity under your account.
              </li>
              <li>
                You agree to provide accurate information and promptly update it
                if it changes.
              </li>
              <li>
                We may offer different account types, such as candidate and
                recruiter accounts. You agree to use the appropriate type for
                your role.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-base font-semibold text-secondary mb-2">
              3. Use of the Service
            </h2>
            <p className="mb-2">
              You may use Amanox only in accordance with these Terms and
              applicable law. You agree not to:
            </p>
            <ul className="list-disc ml-5 space-y-1">
              <li>
                reverse engineer, scrape, circumvent access controls or attempt
                to access non-public areas of the Service;
              </li>
              <li>
                upload malicious files, attempt to interfere with our
                infrastructure or harm other users&apos; experience;
              </li>
              <li>
                use the Service to generate or distribute unlawful, misleading
                or discriminatory content;
              </li>
              <li>
                use Amanox outputs as the sole basis for high-stakes decisions
                without human review (for example, hiring or firing decisions);
              </li>
              <li>
                misrepresent yourself to candidates, recruiters or employers.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-base font-semibold text-secondary mb-2">
              4. AI-generated content
            </h2>
            <p className="mb-2">
              Amanox uses third-party AI models to generate scores, summaries
              and suggestions. These outputs are:
            </p>
            <ul className="list-disc ml-5 space-y-1">
              <li>
                generated automatically based on the data you provide (such as
                your resume and job descriptions);
              </li>
              <li>
                not guaranteed to be accurate, complete or suitable for every
                situation;
              </li>
              <li>
                intended as guidance, not as professional, legal or hiring
                advice.
              </li>
            </ul>
            <p className="mt-2">
              You are responsible for reviewing AI-generated content before
              using it in applications, job posts or any other context.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-secondary mb-2">
              5. Privacy and data
            </h2>
            <p className="mb-2">
              Our{" "}
              <a
                href="/privacy-policy"
                className="text-primary font-semibold hover:text-primary/80"
              >
                Privacy Policy
              </a>{" "}
              explains how we collect, use and protect your data. By using the
              Service, you also agree to the Privacy Policy.
            </p>
            <p>
              You confirm that you have the right to upload any resume or job
              content you submit, and that doing so does not violate any
              confidentiality or contractual obligations.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-secondary mb-2">
              6. Intellectual property
            </h2>
            <ul className="list-disc ml-5 space-y-1">
              <li>
                Amanox owns or licenses all rights to the platform, including
                software, design, logos and branding.
              </li>
              <li>
                You own your own content (such as resumes and job descriptions)
                and grant us a limited licence to process it solely to deliver
                the Service.
              </li>
              <li>
                You may not use our trademarks, branding or interface elements
                without prior written permission.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-base font-semibold text-secondary mb-2">
              7. Payment and plans
            </h2>
            <p>
              If we introduce paid plans, separate terms or plan details may
              apply (such as pricing, billing cycles and cancellation). Where
              there is a conflict, the plan-specific terms will control for that
              plan.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-secondary mb-2">
              8. Termination
            </h2>
            <p className="mb-2">
              You may stop using Amanox at any time. We may suspend or terminate
              your access if:
            </p>
            <ul className="list-disc ml-5 space-y-1">
              <li>you materially breach these Terms;</li>
              <li>
                we reasonably believe your use creates risk to other users or to
                the Service;
              </li>
              <li>we are required to do so by law or a legal process.</li>
            </ul>
            <p className="mt-2">
              We may also discontinue or modify parts of the Service. Where
              reasonable, we will provide notice in advance.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-secondary mb-2">
              9. Disclaimers
            </h2>
            <p className="mb-2">
              The Service is provided on an &quot;as-is&quot; and
              &quot;as-available&quot; basis. To the extent permitted by law, we
              do not make warranties about:
            </p>
            <ul className="list-disc ml-5 space-y-1">
              <li>the accuracy or reliability of AI-generated outputs;</li>
              <li>uninterrupted or error-free operation of the Service;</li>
              <li>
                outcomes such as getting hired, receiving interviews or filling
                roles.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-base font-semibold text-secondary mb-2">
              10. Limitation of liability
            </h2>
            <p>
              To the maximum extent permitted by law, Amanox and its founders,
              employees and partners will not be liable for any indirect,
              incidental, consequential or punitive damages arising out of your
              use of the Service. Our total liability for any claim related to
              the Service will not exceed the amount you paid us for the
              Service, if any, in the 3 months before the claim arose.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-secondary mb-2">
              11. Changes to these Terms
            </h2>
            <p>
              We may update these Terms from time to time. When we make material
              changes, we will update the &quot;Last updated&quot; date and, if
              appropriate, notify you through the product or by email. If you
              continue using Amanox after changes take effect, you agree to the
              updated Terms.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-secondary mb-2">
              12. Contact
            </h2>
            <p>
              If you have questions about these Terms, contact us at{" "}
              <span className="font-semibold">legal@amanox.ai</span>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
