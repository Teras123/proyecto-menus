//src/app/(menus)/(menu-management)/edit/[id]/page.tsx

"use client"; // Especificamos que es un componente del cliente

import { useCrudAlerts } from "@/hooks/useCrudAlerts";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function EditMenuPage({ params }: { params: { id: string } }) {
  const { showSuccessAlert, showErrorAlert } = useCrudAlerts();
  const router = useRouter();
  const [menu, setMenu] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Cargar datos del menú por ID
  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const res = await fetch(`/api/menus/${params.id}`);
        if (res.ok) {
          const data = await res.json();
          setMenu(data);
        } else {
          throw new Error("Menú no encontrado.");
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMenu();
  }, [params.id]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);
    const name = formData.get("name") as string;
    const extraCost = parseFloat(formData.get("extraCost") as string);

    try {
      const res = await fetch(`/api/menus/${params.id}`, {
        method: "PUT",
        body: JSON.stringify({ name, extraCost }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.ok) {
        await showSuccessAlert("Menú actualizado exitosamente.");
        router.push("/menus");
      } else {
        throw new Error("Error al actualizar el menú.");
      }
    } catch (error) {
      await showErrorAlert("Hubo un problema al actualizar el menú.");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) return <div>Cargando...</div>;
  if (!menu) return <div>Menú no encontrado</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Editar Menú</h1>
      <form onSubmit={handleSubmit}>
        <label className="block mb-2">Nombre:</label>
        <input
          type="text"
          name="name"
          defaultValue={menu.name}
          className="border rounded p-2 w-full mb-4"
          required
        />

        <label className="block mb-2">Costo Extra:</label>
        <input
          type="number"
          name="extraCost"
          defaultValue={menu.extraCost}
          className="border rounded p-2 w-full mb-4"
          required
        />

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Actualizando..." : "Actualizar"}
        </button>
      </form>
    </div>
  );
}
