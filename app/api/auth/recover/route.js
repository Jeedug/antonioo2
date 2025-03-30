import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'
import jwt from 'jsonwebtoken'
import { userExists } from '@/app/lib/validations';

const transporter = nodemailer.createTransport({
  service: 'gmail', // Cambia esto según tu proveedor de correo
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
})

export async function POST(request) {
  const { email } = await request.json()

  try {
    const exists = await userExists(email)
    if (!exists) {
      return NextResponse.json({ error: 'El correo electrónico no está registrado' }, { status: 404 })
    }

    const token = jwt.sign({ email }, process.env.JWT_SECRET_PASS, { expiresIn: '1m' })

    const recoveryLink = `${process.env.NEXT_PUBLIC_API_URL}/auth/change-password/${token}`

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Recuperación de contraseña',
      text: `Haz clic en el siguiente enlace para cambiar tu contraseña: ${recoveryLink}`,
      html: `<p>Haz clic en el siguiente enlace para cambiar tu contraseña: <a href="${recoveryLink}">${recoveryLink}</a></p>`,
    }

    await transporter.sendMail(mailOptions)
    return NextResponse.json({ message: 'Correo enviado con éxito' }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error: 'Error al enviar el correo' }, { status: 500 })
  }
}
