import { NextResponse } from 'next/server'

export async function POST() {
  try {
    // Eliminar la cookie de autenticación
    const response = NextResponse.json({ message: 'Sesión cerrada con éxito' }, { status: 200 });
    response.cookies.set('auth_token', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 0, // Expirar la cookie inmediatamente
      path: '/',
    });

    return response;
  } catch (error) {
    return NextResponse.json({ error: 'Error al cerrar sesión' }, { status: 500 });
  }
}
