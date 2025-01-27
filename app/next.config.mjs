import withPWA from "next-pwa";

const nextConfig = withPWA({
  dest: "public", // La carpeta donde se generarán los archivos de la PWA
  disable: process.env.NODE_ENV === "development", // Deshabilita en desarrollo
  register: true, // Registra automáticamente el service worker
  skipWaiting: true, // Reemplaza el SW anterior al detectar cambios
  runtimeCaching: [
    {
      urlPattern: /^https:\/\/fonts\.(gstatic|googleapis)\.com\/.*/i,
      handler: "CacheFirst",
      options: {
        cacheName: "google-fonts",
        expiration: {
          maxAgeSeconds: 60 * 60 * 24 * 365, // Un año
        },
      },
    },
    {
      urlPattern: /\.(?:js|css|html|json|png|jpg|jpeg|svg|ico)$/i,
      handler: "StaleWhileRevalidate",
      options: {
        cacheName: "static-resources",
        expiration: {
          maxEntries: 50,
          maxAgeSeconds: 30 * 24 * 60 * 60, // 30 días
        },
      },
    },
    {
      urlPattern: /\/api\/.*/i,
      handler: "NetworkFirst",
      options: {
        cacheName: "api-cache",
        networkTimeoutSeconds: 10,
        expiration: {
          maxAgeSeconds: 7 * 24 * 60 * 60, // 7 días
        },
      },
    },
  ],
});

export default nextConfig;
