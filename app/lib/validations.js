import { z } from "zod";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { db } from "@/app/models/config";
import { users } from "@/app/models/schema";
import { eq } from "drizzle-orm";

// Validación para el formulario de contacto
export const contactFormSchema = z.object({
  name: z.string().min(1, "El nombre es requerido"),
  email: z.string().email("El correo electrónico no es válido"),
  phone: z.string()
    .min(10, "El numero no puede ser mayor de 10 digitos")
    .max(10, "El numero no puede tener menos de 10 digitos")
    .regex(/^\d+$/, "El teléfono solo debe contener números")
    .optional(),
  message: z.string()
    .min(20, "El mensaje debe tener al menos 20 caracteres")
    .max(50, "El mensaje no puede tener más de 50 caracteres"),
});

// Validación para el registro de usuarios
export const userSchema = z.object({
  name: z.string().min(1, "El nombre es requerido"),
  email: z.string().email("El correo electrónico no es válido"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
});

// Validación para la actualización de usuarios
export const updateUserSchema = z.object({
  name: z.string().min(1, "El nombre es requerido").optional(),
  email: z.string().email("El correo electrónico no es válido").optional(),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres").optional(),
});

// Función para validar el formulario de contacto
export function validateContactForm(data) {
  return contactFormSchema.safeParse(data);
}

// Función para validar el registro de usuarios
export function validateUser(data) {
  return userSchema.safeParse(data);
}

// Función para validar la actualización de usuarios
export function validateUpdateUser(data) {
  return updateUserSchema.safeParse(data);
}

// Función para verificar si un usuario está autenticado
export function isAuthenticated(token) {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_PASS);
    return { success: true, user: decoded };
  } catch (error) {
    return { success: false, error: "Token inválido o expirado" };
  }
}

// Función para verificar si un usuario existe en la base de datos
export async function userExists(email) {
  const user = await db.select().from(users).where(eq(users.email, email)).execute();
  return user.length > 0;
}

// Función para validar las credenciales de un usuario (email y contraseña)
export async function validateCredentials(email, password) {
  const user = await db.select().from(users).where(eq(users.email, email)).execute();

  if (user.length === 0) {
    return { success: false, error: "Usuario no encontrado" };
  }

  const isValidPassword = await bcrypt.compare(password, user[0].password);
  if (!isValidPassword) {
    return { success: false, error: "Contraseña incorrecta" };
  }

  return { success: true, user: user[0] };
}

// Función para generar un token JWT
export function generateToken(user) {
  return jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET_PASS, {
    expiresIn: "1h",
  });
}
