import "../styles/globals.css";
import { useEffect } from "react";
import NetworkStatus from "@/components/NetworkStatus";

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/service-worker.js")
        .then((registration) => {
          console.log("Service Worker registrado con éxito:", registration);
        })
        .catch((error) => {
          console.log("Error al registrar el Service Worker:", error);
        });
    }
  }, []);

  return (
    <>
      <NetworkStatus />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
