//src/app/(menus)/(menu-management)/create/[id]/page.tsx

"use client"; // Especificamos que es un componente del cliente

import { useCrudAlerts } from "@/hooks/useCrudAlerts";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CrearMenuPage() {
  const { showSuccessAlert, showErrorAlert } = useCrudAlerts();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);
    const name = formData.get("name") as string;
    const extraCost = parseFloat(formData.get("extraCost") as string);

    try {
      console.log("Enviando datos:", { name, extraCost }); // Verifica qué datos estás enviando

      // Realizar la solicitud POST para crear el menú
      const res = await fetch("/api/menus", {
        method: "POST",
        body: JSON.stringify({ name, extraCost }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("Respuesta del servidor:", res); // Verifica la respuesta del servidor

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Error al crear el menú.");
      }

      // Mostrar alerta de éxito
      await showSuccessAlert("Menú creado exitosamente.");

      // Redirigir al dashboard de menús (evita recargar la página)
      router.push("/menus");
    } catch (error) {
      // Forzamos el tipo de error a Error
      const errorMessage =
        error instanceof Error ? error.message : "Error desconocido.";
      await showErrorAlert(errorMessage);
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Crear Menú</h1>
      <form onSubmit={handleSubmit}>
        <label className="block mb-2">Nombre:</label>
        <input
          type="text"
          name="name"
          className="border rounded p-2 w-full mb-4"
          required
        />

        <label className="block mb-2">Costo Extra:</label>
        <input
          type="number"
          name="extraCost"
          className="border rounded p-2 w-full mb-4"
          required
        />

        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Guardando..." : "Guardar"}
        </button>
      </form>
    </div>
  );
}
