import { useState, useEffect } from "react";

const NetworkStatus = () => {
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    const updateNetworkStatus = () => {
      setIsOnline(navigator.onLine);
    };

    window.addEventListener("online", updateNetworkStatus);
    window.addEventListener("offline", updateNetworkStatus);

    return () => {
      window.removeEventListener("online", updateNetworkStatus);
      window.removeEventListener("offline", updateNetworkStatus);
    };
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: isOnline ? "green" : "red",
        color: "white",
        padding: "10px",
        textAlign: "center",
      }}
    >
      {isOnline ? "¡Estás en línea!" : "¡Estás fuera de línea!"}
    </div>
  );
};

export default NetworkStatus;
