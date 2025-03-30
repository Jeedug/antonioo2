// Importar dependencias
import { NextResponse } from "next/server";
import { db } from "../../models/config"; // Importar la conexión a la base de datos
import { contactForm } from "../../models/schema"; // Importar el esquema
import { validateContactForm } from "@/app/lib/validations"; // Importar la función de validación

// Manejador POST para recibir datos del formulario
export async function POST(request) {
  const { name, email, phone, message, recaptcha } = await request.json();

  // Validar el token de reCAPTCHA
  const secretKey = process.env.RECAPTCHA_SECRET_KEY; // Usa una variable de entorno para la clave secreta
  const verificationUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${recaptcha}`;

  try {
    const recaptchaResponse = await fetch(verificationUrl, { method: 'POST' });
    const recaptchaData = await recaptchaResponse.json();

    // Verificar si el CAPTCHA fue exitoso
    if (!recaptchaData || !recaptchaData.success) {
      return NextResponse.json({ error: 'Error en la verificación de reCAPTCHA.' }, { status: 400 });
    }

    // Validar los datos del formulario
    const validationResult = validateContactForm({ name, email, phone, message });
    if (!validationResult.success) {
      return NextResponse.json(
        { error: validationResult.error.errors[0].message }, // Mostrar el primer mensaje de error
        { status: 400 }
      );
    }

    // Insertar los datos en la base de datos
    const result = await db.insert(contactForm).values({
      name,
      email,
      phone, // Este campo puede ser null si no se proporciona
      message,
    });

    console.log(result);

    // Retornar una respuesta exitosa
    return NextResponse.json(
      { success: true, message: "Datos insertados correctamente", result },
      { status: 201 }
    );
  } catch (error) {
    // Capturar errores y retornar una respuesta de error
    console.error("Error al insertar datos:", error);
    return NextResponse.json(
      { error: "Ocurrió un error al procesar la solicitud" },
      { status: 500 }
    );
  }
}