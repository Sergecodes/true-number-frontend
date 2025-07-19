import type { AppProps } from "next/app";
import { AuthProvider } from "../context/AuthContext";
import { ToastProvider } from "../context/ToastContext";
import ToastContainer from "@/components/Toast";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <ToastProvider>
        <ToastContainer />
        <Component {...pageProps} />
      </ToastProvider>
    </AuthProvider>
  );
}

export default MyApp;
