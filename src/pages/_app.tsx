import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer"
import FloatingButtons from "@/components/FloatingButtons";
import { useEffect } from "react";
import { ToastProvider } from "@/components/ToastContext";
import { AuthProvider } from "@/contexts/AuthContext";

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    const interval = setInterval(() => {
      console.clear();
    }, 1000);

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
    <AuthProvider>
    <ToastProvider>
      <Navbar />
      <Component {...pageProps} />
      <FloatingButtons />
      <Footer />
    </ToastProvider>
    </AuthProvider>
  );
}
