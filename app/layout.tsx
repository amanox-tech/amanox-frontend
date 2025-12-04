import "./globals.css";
import { AppProvider } from "@/context/appContext";
import { ReactNode } from "react";
// 1. IMPORT REACT HOT TOAST
import { Toaster } from "react-hot-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

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
