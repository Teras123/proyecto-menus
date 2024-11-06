import { getProductById, updateProduct } from "@/actions";
import { redirect } from "next/navigation";

interface Props {
  params: {
    id: number;
  };
}

export default async function EditarProductoPage({ params }: Props,) {
  const product = await getProductById(Number(params.id));

  const handleSubmit = async (formData: FormData) => {
    "use server";
    const description = formData.get('name') as string;
    const unitPrice = parseFloat(formData.get('price') as string);
    if (product?.id !== undefined) {
      await updateProduct(product.id, { description, unitPrice });
    }
    redirect('/products');
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Editar Producto</h1>
      <form action={handleSubmit}>
        <label className="block mb-2">Nombre:</label>
        <input type="text" name="name" defaultValue={product?.description} className="border rounded p-2 w-full mb-4" />

        <label className="block mb-2">Precio:</label>
        <input type="number" name="price" defaultValue={product?.unitPrice} className="border rounded p-2 w-full mb-4" />

        <button type="submit" className="bg-green-500 text-white px-4 py-2">Actualizar</button>
      </form>
    </div>
  );
}
