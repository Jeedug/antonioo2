import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { db } from '@/app/models/config';
import { users } from '@/app/models/schema';
import { eq } from 'drizzle-orm';
import { validateUser } from '@/app/lib/validations';

// Función para generar JWT
const generateToken = (user) => {
  return jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET_PASS,
    { expiresIn: '30d' }
  );
};

// POST /api/auth/register
export async function POST(request) {
  try {
    const { name, email, password } = await request.json();

    // Validar los datos de entrada
    const validationResult = validateUser({ name, email, password });
    if (!validationResult.success) {
      return NextResponse.json(
        { error: validationResult.error.errors },
        { status: 400 }
      );
    }

    // Verificar si el usuario ya existe
    const existingUser = await db.select().from(users).where(eq(users.email, email));
    
    if (existingUser.length > 0) {
      return NextResponse.json(
        { error: 'El usuario ya existe' },
        { status: 400 }
      );
    }

    // Encriptar contraseña
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Crear nuevo usuario
    const newUser = await db.insert(users).values({
      name,
      email,
      password: hashedPassword,
    }).returning();

    // Generar token
    const token = generateToken(newUser[0]);

    return NextResponse.json({
      id: newUser[0].id,
      name: newUser[0].name,
      email: newUser[0].email,
      token
    });

  } catch (error) {
    console.error('Error en registro:', error);
    return NextResponse.json(
      { error: 'Error al registrar usuario' },
      { status: 500 }
    );
  }
} 