import "./globals.css";
import { AppProvider } from "@/context/appContext";
import { ReactNode } from "react";
import { ToastContainer } from "react-toastify";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AppProvider>
          {children}
           <ToastContainer />
        </AppProvider>
      </body>
    </html>
  );
}
