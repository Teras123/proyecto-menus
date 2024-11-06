import { getClassifiers } from "@/actions";
import { ClassifierDeleteButton } from "@/components/classifier";
import { Classifier } from "@prisma/client";

export default async function ClasificadoresPage() {
  const classifiers: Classifier[] = await getClassifiers();

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Clasificadores</h1>
        {/* Botón para redirigir a la página de creación de clasificador */}
        <a
          href="/classifier/create"  // Ruta para crear un clasificador
          className="bg-green-500 text-white px-4 py-2 rounded-md"
        >
          Crear Nuevo Clasificador
        </a>
      </div>

      {/* Tabla estilizada */}
      <div className="overflow-x-auto">
        <table className="min-w-full text-center bg-white border border-gray-200 rounded-lg shadow-lg">
          <thead className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
            <tr>
              <th className="py-3 px-6">ID</th>
              <th className="py-3 px-6">Nombre del Clasificador</th>
              <th className="py-3 px-6">Acciones</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {classifiers.map((classifier) => (
              <tr
                key={classifier.id}
                className="border-b border-gray-200 hover:bg-gray-100 transition duration-300 ease-in-out"
              >
                <td className="py-3 px-6">{classifier.id}</td>
                <td className="py-3 px-6">{classifier.name}</td>
                <td className="py-3 px-6 flex justify-center">
                    {/* // ! Botón de Eliminar */}
                  <ClassifierDeleteButton classifierId={classifier.id} />
                  {/* Botón de Editar */}
                  <a
                    href={`/classifier/edit/${classifier.id}`}
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
    </div>
  );
}
