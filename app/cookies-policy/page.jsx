"use client";

export default function CookiePolicyPage() {
  return (
    <div className="min-h-screen bg-[#f5f7fb] pt-24 pb-20 font-sans">
      <div className="max-w-[960px] mx-auto px-6 lg:px-0">
        <div className="w-full h-0.5 mb-10 bg-linear-to-r from-transparent via-primary to-transparent opacity-60 rounded-full" />

        <header className="mb-10">
          <p className="text-xs font-semibold tracking-[0.18em] uppercase text-primary mb-3">
            Cookie Policy
          </p>
          <h1 className="text-3xl font-bold tracking-tight text-secondary mb-3">
            How Amanox uses cookies.
          </h1>
          <p className="text-sm text-gray-600">
            This policy explains what cookies and similar technologies we use,
            why we use them, and the options you have.
          </p>
          <p className="mt-2 text-[11px] text-gray-500">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </header>

        <div className="space-y-8 text-sm text-gray-700 leading-relaxed">
          <section>
            <h2 className="text-base font-semibold text-secondary mb-2">
              1. What are cookies?
            </h2>
            <p>
              Cookies are small text files stored on your device when you visit
              a website. They help websites remember information about your
              session and preferences. Similar technologies include local
              storage, session storage and tokens stored in your browser.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-secondary mb-2">
              2. How we use cookies
            </h2>
            <p className="mb-2">
              Amanox uses cookies and similar technologies for the following
              purposes:
            </p>
            <ul className="list-disc ml-5 space-y-1">
              <li>
                <span className="font-semibold">Authentication.</span> To keep
                you logged in securely using access and refresh tokens.
              </li>
              <li>
                <span className="font-semibold">Session management.</span> To
                remember your current session, role (candidate/recruiter) and
                basic preferences while you use the product.
              </li>
              <li>
                <span className="font-semibold">Security.</span> To help prevent
                abuse, such as rate-limiting repeated login attempts and storing
                CSRF protection tokens.
              </li>
              <li>
                <span className="font-semibold">Product performance.</span> To
                support basic analytics and debugging, such as understanding
                which features are used most, if we enable such tools.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-base font-semibold text-secondary mb-2">
              3. Types of cookies we use
            </h2>
            <ul className="list-disc ml-5 space-y-1">
              <li>
                <span className="font-semibold">
                  Strictly necessary cookies.
                </span>{" "}
                Required for the site to function (for example, authentication
                and CSRF cookies). You cannot opt out of these without breaking
                core functionality.
              </li>
              <li>
                <span className="font-semibold">Preference cookies.</span> Used
                to remember choices such as interface options or dismissing
                in-app banners.
              </li>
              <li>
                <span className="font-semibold">
                  Optional analytics cookies.
                </span>{" "}
                If enabled, these help us understand usage patterns so we can
                improve the product. We aim to use privacy-respecting tools and,
                where required, will ask for your consent.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-base font-semibold text-secondary mb-2">
              4. Third-party cookies
            </h2>
            <p>
              Some cookies may be set by third-party services integrated into
              Amanox (for example, analytics providers or authentication
              services). These providers have their own privacy and cookie
              policies, and we encourage you to review them.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-secondary mb-2">
              5. Your choices
            </h2>
            <p className="mb-2">
              You have several options for managing cookies and similar
              technologies:
            </p>
            <ul className="list-disc ml-5 space-y-1">
              <li>
                Configure your browser settings to block or delete cookies.
                Doing this may impact your ability to log in or use some
                features.
              </li>
              <li>
                Use built-in browser tools or extensions to manage tracking
                technologies, where available.
              </li>
              <li>
                If we present cookie banners or preference centres, you can use
                those to control optional cookies (such as analytics).
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-base font-semibold text-secondary mb-2">
              6. Updates
            </h2>
            <p>
              We may update this Cookie Policy as our use of cookies evolves or
              as legal requirements change. Any changes will be reflected by
              updating the &quot;Last updated&quot; date above.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-secondary mb-2">
              7. Contact
            </h2>
            <p>
              If you have questions about our use of cookies, contact{" "}
              <span className="font-semibold">privacy@amanox.ai</span>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
