//src/app/(menus)/(menu-management)/page.tsx
import { getMenus } from "@/actions/menu-actions";
import { MenuButton } from "@/components/menus";
import { Menu } from "@prisma/client";
import Link from "next/link";
import { IoPencilOutline } from "react-icons/io5"; // Importamos el icono de edición

export default async function MenusPage({
  isSidebarOpen,
}: {
  isSidebarOpen: boolean;
}) {
  const menus: Menu[] = await getMenus(); // Obtener menús desde el servidor

  return (
    <div className={`container mx-auto p-4 ${isSidebarOpen ? "md:ml-64" : ""}`}>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Menús</h1>
        <Link href="/menus/create">
          <div className="bg-green-500 text-white px-4 py-2 rounded-md">
            Crear Nuevo Menú
          </div>
        </Link>
      </div>
      <table className="min-w-full text-center bg-white border border-gray-200 rounded-lg shadow-lg">
        <thead className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
          <tr>
            <th className="py-2">Nombre</th>
            <th className="py-2">Costo Extra</th>
            <th className="py-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {menus.map((menu) => (
            <tr key={menu.id} className="border-t">
              <td className="py-2">{menu.name}</td>
              <td className="py-2">{menu.extraCost}</td>
              <td className="py-2 flex justify-center items-center space-x-4">
                <MenuButton menuId={menu.id} />
                <Link href={`/menus/edit/${menu.id}`}>
                  <IoPencilOutline
                    size={24}
                    className="text-blue-500 hover:text-blue-700 cursor-pointer"
                  />
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
