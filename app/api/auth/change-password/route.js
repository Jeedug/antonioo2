import { NextResponse } from 'next/server'
import { db } from '../../../models/config'
import { users } from '../../../models/schema'
import { eq } from 'drizzle-orm'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export async function POST(request) {
  const { token, newPassword } = await request.json()

  try {
    // Verificar y decodificar el JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET_PASS)
    const { email } = decoded

    // Buscar al usuario por su email
    const user = await db.select().from(users).where(eq(users.email, email)).get()

    if (!user) {
      return NextResponse.json({ error: 'Usuario no encontrado' }, { status: 400 })
    }

    // Hashear la nueva contraseña
    const hashedPassword = await bcrypt.hash(newPassword, 10)

    // Actualizar la contraseña del usuario en la base de datos
    await db.update(users)
      .set({ password: hashedPassword })
      .where(eq(users.id, user.id))
      .run()

    return NextResponse.json({ message: 'Contraseña cambiada con éxito' }, { status: 200 })
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return NextResponse.json({ error: 'El enlace de recuperación ha expirado' }, { status: 400 })
    }
    return NextResponse.json({ error: 'Error al cambiar la contraseña' }, { status: 500 })
  }
}
