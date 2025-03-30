import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { db } from '@/app/models/config';
import { users } from '@/app/models/schema';
import { eq } from 'drizzle-orm';
import { cookies } from 'next/headers';
import { validateCredentials } from '@/app/lib/validations';

// Función para generar JWT
const generateToken = (user) => {
  return jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET_KEY,
    { expiresIn: '30d' }
  );
};

// POST /api/auth/login
export async function POST(request) {
  try {
    const { email, password } = await request.json();

    // Validar las credenciales del usuario
    const validationResult = await validateCredentials(email, password);
    if (!validationResult.success) {
      return NextResponse.json(
        { error: validationResult.error },
        { status: validationResult.error === 'Usuario no encontrado' ? 404 : 401 }
      );
    }

    const user = validationResult.user;

    // Verificar contraseña
    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return NextResponse.json(
        { error: 'Contraseña incorrecta' },
        { status: 401 }
      );
    }

    // Generar token
    const token = generateToken(user);

    // Crear la respuesta
    const response = NextResponse.json({
      id: user.id,
      name: user.name,
      email: user.email,
      message: 'Login exitoso',
      reload: true // Indicar al frontend que recargue la página
    });

    // Configurar la cookie
    response.cookies.set({
      name: 'auth_token',
      value: token,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 30 * 24 * 60 * 60 // 30 días en segundos
    });

    return response;

  } catch (error) {
    console.error('Error en login:', error);
    return NextResponse.json(
      { error: 'Error al iniciar sesión' },
      { status: 500 }
    );
  }
} 