// src/app/api/auth/medico/route.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { hashPassword } from "@/lib/auth";

export async function POST(req: Request) {
  const { nombre, email, password, especialidadId, telefono, direccion } =
    await req.json();

  // Verificar si el correo electrónico ya está registrado
  const existingUser = await prisma.usuario.findUnique({ where: { email } });
  if (existingUser) {
    return NextResponse.json(
      { error: "El correo electrónico ya está registrado" },
      { status: 409 }
    );
  }

  const hashedPassword = await hashPassword(password);

  try {
    // Crear el nuevo usuario
    const usuario = await prisma.usuario.create({
      data: {
        nombre,
        email,
        password: hashedPassword,
        rol: "medico", // Asignar rol médico
      },
    });

    // Crear el médico
    const medico = await prisma.medico.create({
      data: {
        usuarioId: usuario.id,
        especialidadId,
        telefono,
        direccion,
      },
    });

    return NextResponse.json({
      message: "Médico registrado exitosamente",
      medico,
    });
  } catch (err) {
    console.error("Error al registrar médico:", err);
    return NextResponse.json(
      { error: "Error al registrar el médico" },
      { status: 500 }
    );
  }
}
