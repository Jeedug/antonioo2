// lib/db.js
import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';

// Cargar variables de entorno desde .env.local
const tursoConfig = {
  url: process.env.TURSO_DATABASE_URL,
  authToken: process.env.TURSO_AUTH_TOKEN,
};

// Crear cliente de Turso
const client = createClient(tursoConfig);

// Crear conexión Drizzle
export const db = drizzle(client);