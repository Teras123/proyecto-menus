"use client";

import { Sidebar } from "@/components/sidebar/Sidebar";
import { useState } from "react";

export default function MenuLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Estado para controlar la visibilidad del sidebar
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Función para alternar la visibilidad del sidebar
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <main className="min-h-screen flex relative">
      {/* Sidebar con control de visibilidad */}
      <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Ajusta el margen superior para que el título no choque con el botón */}
      <div
        className="flex-1 px-4 sm:px-10 pt-16" // <--- Añade un padding top aquí para evitar que el contenido choque con el botón
      >
        {children}
      </div>
    </main>
  );
}
