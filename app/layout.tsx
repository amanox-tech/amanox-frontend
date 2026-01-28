import "./globals.css";
import { AppProvider } from "@/context/appContext";
import { ReactNode } from "react";
import { Toaster } from "react-hot-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  // Simple, powerful title
  title: "Amanox Pro | The World's Most Accurate AI Resume Audit",
  description:
    "Audit your resume with Amanox Pro Intelligence. Get deep-reasoning ATS scores, precision job matching, and recruiter-level insights to land more interviews.",
  keywords: [
    "AI resume audit",
    "Amanox Pro",
    "ATS resume checker",
    "professional resume analysis",
    "resume keyword audit",
    "job description match",
    "AI career coach",
    "resume score checker",
    "Amanox AI",
  ],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased">
        <AppProvider>
          <Navbar />
          {/* Main container with Turquoise selection color */}
          <main className="min-h-screen relative selection:bg-primary/20">
            {children}
          </main>
          <Footer />
        </AppProvider>

        {/* Premium Styled Toaster */}
        <Toaster
          position="top-right"
          reverseOrder={false}
          toastOptions={{
            duration: 4000,
            // Updated to match your Turquoise and Charcoal theme
            className:
              "!bg-white/90 !backdrop-blur-xl !border !border-gray-100 !shadow-2xl !rounded-[1.5rem] !px-6 !py-4 !text-sm !font-black !text-secondary !font-sans",

            style: {
              color: "#373643",
            },

            success: {
              iconTheme: {
                primary: "#18cb96", // Your Turquoise
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
