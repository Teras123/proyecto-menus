import { createProduct } from "@/actions";
import { redirect } from "next/navigation";

export default function CrearProductoPage() {
  const handleSubmit = async (formData: FormData) => {
    "use server";
    const description = formData.get('name') as string;
    const unitPrice = parseFloat(formData.get('price') as string);
    const costPrice = parseFloat(formData.get('costPrice') as string);
    await createProduct({
        description, unitPrice, costPrice
    });
    redirect('/products');
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Crear Producto</h1>
      <form action={handleSubmit}>
        <label className="block mb-2">Nombre:</label>
        <input type="text" name="name" className="border rounded p-2 w-full mb-4" />

        <label className="block mb-2">Precio:</label>
        <input type="number" name="price" className="border rounded p-2 w-full mb-4" />
        <label className="block mb-2">Precio de Costo:</label>
        <input type="number" name="costPrice" className="border rounded p-2 w-full mb-4" />

        <button type="submit" className="bg-green-500 text-white px-4 py-2">Guardar</button>
      </form>
    </div>
  );
}
