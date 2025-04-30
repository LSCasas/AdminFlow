import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function useAuthLogIn() {
  const router = useRouter();
  const [token, setToken] = useState("");

  useEffect(() => {
    const tkn = localStorage.getItem("token");

    if (tkn) {
      setToken(tkn);
    } else {
      alert("Debes iniciar sesión primero.");
      router.push("/");
    }
  }, [router]);

  return <>{token}</>;
}
