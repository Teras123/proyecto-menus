import { getClassifierById, updateClassifier } from "@/actions";
import { redirect } from "next/navigation";
interface Props {
    params: {
      id: number;
    };
  }
export default async function EditarClasificadorPage({ params }: Props) {
  const classifier = await getClassifierById(Number(params.id));

  const handleSubmit = async (formData: FormData) => {
    "use server";
    const name = formData.get('name') as string;
    const type = formData.get('type') as string;
    if (classifier) {
      await updateClassifier(classifier.id, { name, type });
    } else {
      console.error("Classifier is null");
    }
    redirect('/classifier');
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Editar Clasificador</h1>
      <form action={handleSubmit}>
        <label className="block mb-2">Nombre:</label>
        <input type="text" name="name" defaultValue={classifier?.name} className="border rounded p-2 w-full mb-4" />

        <label className="block mb-2">Tipo:</label>
        <select name="type" defaultValue={classifier?.type} className="border rounded p-2 w-full mb-4">
          <option value="PRESENTATION">Presentación</option>
          <option value="CATEGORY">Categoría</option>
          <option value="SUBCATEGORY">Subcategoría</option>
        </select>

        <button type="submit" className="bg-green-500 text-white px-4 py-2">Actualizar</button>
      </form>
    </div>
  );
}
