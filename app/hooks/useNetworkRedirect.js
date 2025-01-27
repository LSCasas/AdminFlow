import { useState, useEffect } from "react";
import { useRouter } from "next/router";

const useNetworkRedirect = () => {
  const [isOnline, setIsOnline] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const updateNetworkStatus = () => {
      const onlineStatus = navigator.onLine;
      setIsOnline(onlineStatus);
      // Si no hay conexión, redirige a la página de formulario
      if (!onlineStatus) {
        router.push("/formularioDeConsumible");
      }
    };

    // Escuchar cambios de conexión
    window.addEventListener("online", updateNetworkStatus);
    window.addEventListener("offline", updateNetworkStatus);

    // Comprobar el estado de conexión al cargar la página
    updateNetworkStatus();

    // Limpiar el listener al desmontar el componente
    return () => {
      window.removeEventListener("online", updateNetworkStatus);
      window.removeEventListener("offline", updateNetworkStatus);
    };
  }, [router]);

  return isOnline;
};

export default useNetworkRedirect;
