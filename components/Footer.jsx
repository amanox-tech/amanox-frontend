"use client";

import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-100 pt-16 pb-12 font-sans relative overflow-hidden">
      {/* Optional: Subtle top gradient to match brand */}
      <div className="absolute top-0 left-0 w-full h-0.5 bg-linear-to-r from-transparent via-primary to-transparent opacity-50"></div>

      <div className="max-w-[1440px] mx-auto px-6 md:px-10 relative z-10">
        {/* TOP SECTION: Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12 mb-16">
          {/* Column 1: Brand & Mission (Spans 4 cols on large screens) */}
          <div className="col-span-1 lg:col-span-4 pr-0 lg:pr-8">
            <Link
              href="/"
              className="inline-flex items-center gap-2.5 mb-6 group bg-transparent"
            >
              {/* Logo following Navbar pattern */}
              <Image
                src="/amanox-logo.png"
                alt="Amanox Logo"
                width={0}
                height={0}
                sizes="100vw"
                style={{ width: "auto", height: "50px" }}
                className="object-contain opacity-100 group-hover:opacity-80 transition-opacity duration-300 bg-transparent"
                unoptimized={true}
              />
            </Link>
            <p className="text-gray-500 text-sm leading-7 mb-8 max-w-sm">
              Redefining professional identity. Our AI-powered platform helps
              you craft world-class resumes to unlock your true career
              potential.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-4">
              {/* <SocialLink href="#" label="Twitter">
                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
              </SocialLink>
              <SocialLink href="#" label="GitHub">
                <path
                  fillRule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                  clipRule="evenodd"
                />
              </SocialLink> */}
              <SocialLink href="#" label="LinkedIn">
                <path
                  fillRule="evenodd"
                  d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
                  clipRule="evenodd"
                />
              </SocialLink>
            </div>
          </div>

          {/* Spacer Col */}
          <div className="hidden lg:block lg:col-span-1"></div>

          {/* Links Container (Spans 7 cols) */}
          <div className="col-span-1 lg:col-span-7 grid grid-cols-2 sm:grid-cols-2 gap-8 pt-2">
            {/* Column 3: Company */}
            <div>
              <h3 className="font-bold text-secondary mb-5 text-sm uppercase tracking-wider">
                Company
              </h3>
              <ul className="space-y-3.5 text-sm text-gray-500">
                <FooterLink href="/about-us">About Us</FooterLink>
                {/* <FooterLink href="#">Careers</FooterLink> */}
                {/* <FooterLink href="#">Blog</FooterLink> */}
                <FooterLink href="/contact-us">Contact</FooterLink>
              </ul>
            </div>

            {/* Column 4: Legal */}
            <div>
              <h3 className="font-bold text-secondary mb-5 text-sm uppercase tracking-wider">
                Legal
              </h3>
              <ul className="space-y-3.5 text-sm text-gray-500">
                <FooterLink href="/privacy-policy">Privacy Policy</FooterLink>
                <FooterLink href="/terms-policy">Terms of Service</FooterLink>
                <FooterLink href="/cookies-policy">Cookie Policy</FooterLink>
              </ul>
            </div>
          </div>
        </div>

        {/* BOTTOM BAR: Copyright */}
        <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-400 text-xs">
            © {currentYear} Amanox. All rights reserved.
          </p>

          <div className="text-xs text-gray-400 flex items-center">
            Built on weekends to secure your weekdays.
          </div>
        </div>
      </div>
    </footer>
  );
}

// --- Helper Components for clean styling ---

function FooterLink({ href, children }) {
  return (
    <li>
      <Link
        href={href}
        className="hover:text-primary hover:translate-x-1 transition-all duration-200 inline-block"
      >
        {children}
      </Link>
    </li>
  );
}

function SocialLink({ href, label, children }) {
  return (
    <Link
      href={href}
      className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-50 text-gray-400 hover:bg-primary/10 hover:text-primary transition-all duration-300 transform hover:-translate-y-1"
    >
      <span className="sr-only">{label}</span>
      <svg
        className="h-5 w-5"
        fill="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        {children}
      </svg>
    </Link>
  );
}
