// src/app/(menus)/(menu-management)/menu-items/edit/page.tsx
import { getMenuItemById, updateMenuItem } from "@/actions/menu-item-actions";
import { redirect } from "next/navigation";

export default async function EditMenuItemPage({
  params,
}: {
  params: { id: string };
}) {
  const menuItem = await getMenuItemById(parseInt(params.id));

  if (!menuItem) {
    return (
      <div>
        <p>El elemento del menú no existe.</p>
        <a href="/menu-items" className="text-blue-500">
          Volver a la lista
        </a>
      </div>
    );
  }

  const handleSubmit = async (formData: FormData) => {
    "use server";
    const quantity = parseInt(formData.get("quantity") as string);
    const cost = parseFloat(formData.get("cost") as string);

    await updateMenuItem(menuItem.id, { quantity, cost });
    redirect("/menu-items");
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Editar Elemento del Menú</h1>
      <form action={handleSubmit}>
        <label className="block mb-2">Cantidad:</label>
        <input
          type="number"
          name="quantity"
          defaultValue={menuItem.quantity}
          className="border rounded p-2 w-full mb-4"
        />

        <label className="block mb-2">Costo Total:</label>
        <input
          type="number"
          step="0.01"
          name="cost"
          defaultValue={menuItem.cost}
          className="border rounded p-2 w-full mb-4"
        />

        <button type="submit" className="bg-blue-500 text-white px-4 py-2">
          Actualizar
        </button>
      </form>
    </div>
  );
}
