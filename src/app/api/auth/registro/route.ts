// src/app/api/auth/registro/route.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { hashPassword } from "@/lib/auth";

export async function POST(req: Request) {
  const { nombre, email, password, rol } = await req.json();

  try {
    const existingUser = await prisma.usuario.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json(
        { error: "El correo electrónico ya está registrado" },
        { status: 409 }
      );
    }

    const hashedPassword = await hashPassword(password);

    const usuario = await prisma.usuario.create({
      data: {
        nombre,
        email,
        password: hashedPassword,
        rol,
      },
    });

    return NextResponse.json({
      message: "Usuario registrado exitosamente",
      usuario,
    });
  } catch (error) {
    console.error("Error al registrar usuario:", error); // Imprime el error en la consola
    return NextResponse.json(
      { error: "Error al registrar el usuario" },
      { status: 500 }
    );
  }
}
