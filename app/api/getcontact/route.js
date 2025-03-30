import { db } from "../../models/config"; // Importar la conexión a la base de datos
import { contactForm } from "../../models/schema"; // Importar el esquema

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
      const contacts = await db.select().from(contactForm);
      console.log("Datos obtenidos:", contacts); // Agrega este log para depurar
      return new Response(JSON.stringify(contacts), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-store, max-age=0", // Deshabilita la caché
        },
      });
    } catch (error) {
      console.error("Error al obtener los contactos:", error);
      return new Response(
        JSON.stringify({ error: "Ocurrió un error al obtener los contactos." }),
        {
          status: 500,
          headers: {
            "Content-Type": "application/json",
            "Cache-Control": "no-store, max-age=0", // Deshabilita la caché
          },
        }
      );
    }
  }