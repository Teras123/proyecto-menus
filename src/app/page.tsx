"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Verifica si hay un token en las cookies
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="));

    if (!token) {
      router.push("/login"); // Redirige a login si no hay token
    } else {
      router.push("/menus"); // Redirige a (menus) si hay token
    }
  }, [router]);

  return <p>Redireccionando...</p>;
}
