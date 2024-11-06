import { getProductHistory } from "@/actions";

export default async function HistorialPreciosPage() {
  const history = await getProductHistory();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Historial de Precios</h1>
      
      <div className="overflow-x-auto">
        <table className="min-w-full text-center bg-white border border-gray-200 rounded-lg shadow-lg">
          <thead className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
            <tr>
              <th className="py-3 px-6">Producto ID</th>
              <th className="py-3 px-6">Descripción del Producto</th>
              <th className="py-3 px-6">Precio Anterior</th>
              <th className="py-3 px-6">Precio Nuevo</th>
              <th className="py-3 px-6">Cambiado Por</th>
              <th className="py-3 px-6">Fecha del Cambio</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {history.map((entry) => (
              <tr
                key={entry.id}
                className="border-b border-gray-200 hover:bg-gray-100 transition duration-300 ease-in-out"
              >
                <td className="py-3 px-6">{entry.productId}</td>
                <td className="py-3 px-6">{entry.product.description}</td>
                <td className="py-3 px-6">{entry.oldPrice}</td>
                <td className="py-3 px-6">{entry.newPrice}</td>
                <td className="py-3 px-6">{entry.changedBy}</td>
                <td className="py-3 px-6">{new Date(entry.changedAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
