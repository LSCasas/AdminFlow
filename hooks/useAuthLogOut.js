import { useEffect } from "react";
import { useRouter } from "next/router";
import { Toaster, toast } from "sonner";

export default function LoggedIn() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      toast.info(
        "Ya tienes una sesión activa. Debes cerrar sesión para iniciar una nueva."
      );
      router.push("/main");
    }
  }, [router]);

  return <Toaster position="top-right" reverseOrder={false} />;
}
