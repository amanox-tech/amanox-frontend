import "./globals.css";
import { AppProvider } from "@/context/appContext";
import { ReactNode } from "react";
import { ToastContainer } from "react-toastify";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AppProvider>
          <Navbar />
          <main className="min-h-screen pt-20 pb-20">{children}</main>
          <Footer />
        </AppProvider>

        <ToastContainer />
      </body>
    </html>
  );
}
