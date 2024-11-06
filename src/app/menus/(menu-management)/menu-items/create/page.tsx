"use client";

import { useCrudAlerts } from "@/hooks/useCrudAlerts"; // Asumo que este hook está definido
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface Menu {
  id: number;
  name: string;
}

interface Product {
  id: number;
  description: string;
}

export default function CreateMenuItemPage() {
  const { showSuccessAlert, showErrorAlert } = useCrudAlerts();
  const router = useRouter();
  const [menus, setMenus] = useState<Menu[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Función para cargar menús y productos
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [menusRes, productsRes] = await Promise.all([
          fetch("/api/menus", { method: "GET" }),
          fetch("/api/products", { method: "GET" }), // Nueva ruta
        ]);

        if (!menusRes.ok || !productsRes.ok) {
          throw new Error(
            `Error al cargar los datos: ${menusRes.status} ${productsRes.status}`
          );
        }

        const menusData = await menusRes.json();
        const productsData = await productsRes.json();

        setMenus(menusData);
        setProducts(productsData);
        setIsLoading(false);
      } catch (error) {
        console.error("Error al cargar menús y productos:", error);
        await showErrorAlert(
          "Error al cargar los datos. Por favor, verifica la consola para más detalles."
        );
        setIsLoading(false);
      }
    };

    fetchData();
  }, [showErrorAlert]); // Asegúrate de agregar showErrorAlert como dependencia si se usa en fetchData

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);
    const menuId = parseInt(formData.get("menuId") as string);
    const productId = parseInt(formData.get("productId") as string);
    const quantity = parseInt(formData.get("quantity") as string);
    const cost = parseFloat(formData.get("cost") as string);

    try {
      const res = await fetch("/api/menu-items", {
        method: "POST",
        body: JSON.stringify({ menuId, productId, quantity, cost }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Error al crear el ítem de menú.");
      }

      await showSuccessAlert("Ítem de menú creado exitosamente.");
      router.push("/menu-items");
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Error desconocido.";
      await showErrorAlert(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return <div>Cargando datos...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Crear Ítem de Menú</h1>
      <form onSubmit={handleSubmit}>
        <label className="block mb-2">Menú:</label>
        <select
          name="menuId"
          className="border rounded p-2 w-full mb-4"
          required
        >
          <option value="">Selecciona un menú</option>
          {menus.map((menu) => (
            <option key={menu.id} value={menu.id}>
              {menu.name}
            </option>
          ))}
        </select>

        <label className="block mb-2">Producto:</label>
        <select
          name="productId"
          className="border rounded p-2 w-full mb-4"
          required
        >
          <option value="">Selecciona un producto</option>
          {products.map((product) => (
            <option key={product.id} value={product.id}>
              {product.description}
            </option>
          ))}
        </select>

        <label className="block mb-2">Cantidad:</label>
        <input
          type="number"
          name="quantity"
          className="border rounded p-2 w-full mb-4"
          required
        />

        <label className="block mb-2">Costo:</label>
        <input
          type="number"
          name="cost"
          className="border rounded p-2 w-full mb-4"
          step="0.01"
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
