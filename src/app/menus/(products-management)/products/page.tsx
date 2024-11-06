import { getProducts } from "@/actions";
import { ProductsButton } from "@/components/products";
import { Product } from "@prisma/client";

export default async function ProductsPage() {
  const products: Product[] = await getProducts(); // Obtener productos desde el servidor

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Productos</h1>
        <a
          href="/products/create"
          className="bg-green-500 text-white px-4 py-2 rounded-md"
        >
          Crear Nuevo Producto
        </a>
      </div>
      <table className="min-w-full text-center bg-white border border-gray-200 rounded-lg shadow-lg">
          <thead className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
          <tr>
            <th className="py-2">Nombre</th>
            <th className="py-2">Precio</th>
            <th className="py-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id} className="border-t">
              <td className="py-2">{product.description}</td>
              <td className="py-2">{product.unitPrice}</td>
              <td className="py-2">
                {/* // ! Componente adicional */}
                {/* Pasamos el ID del producto al componente de botón */}
                <ProductsButton productId={product.id} />
                <a
                  href={`/products/edit/${product.id}`}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2"
                >
                  Editar
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
