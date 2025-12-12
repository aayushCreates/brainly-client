import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { AuthProvider } from "@/context/AuthContext"; // Assuming AuthContext.tsx
import { Toaster } from "sonner";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Toaster position="top-right" />
      <Component {...pageProps} />
    </AuthProvider>
  );
}
