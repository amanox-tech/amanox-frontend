import "./globals.css";
import { AppProvider } from "@/context/appContext";
import { ReactNode } from "react";
// 1. IMPORT REACT HOT TOAST
import { Toaster } from "react-hot-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Amanox – Free AI Resume Analyzer | GPT-5, Gemini, Grok Powered",
  description:
    "Analyze your resume with Amanox AI — a powerful multi-model engine using GPT-5, Gemini, and Grok. Get ATS score, job match score, missing keywords, impact improvements, recruiter-level insights, and professional rewrites for free.",
  keywords: [
    "AI resume analyzer",
    "ATS resume checker",
    "resume score checker",
    "GPT-5 resume analysis",
    "AI resume builder",
    "resume keyword checker",
    "job description match",
    "resume improvement tool",
    "AI job seeker tools",
    "Amanox Resume",
    "Grok resume analysis",
    "Gemini resume checker",
    " resume ats",
  ],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AppProvider>
          <Navbar />
          <main className="min-h-screen relative">{children}</main>
          <Footer />
        </AppProvider>

        <Toaster
          position="top-right"
          reverseOrder={false}
          toastOptions={{
            duration: 4000,
            className:
              "!bg-white/80 !backdrop-blur-lg !border !border-white/60 !shadow-[0_20px_40px_-10px_rgba(0,0,0,0.1)] !rounded-2xl !px-5 !py-4 !text-sm !font-semibold !text-secondary !font-sans",

            style: {
              color: "#373643",
            },

            success: {
              iconTheme: {
                primary: "#18cb96",
                secondary: "white",
              },
            },

            error: {
              iconTheme: {
                primary: "#EF4444",
                secondary: "white",
              },
            },
          }}
        />
      </body>
    </html>
  );
}
