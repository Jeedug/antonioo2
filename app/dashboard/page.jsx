    'use client'

    import React, { useEffect, useState } from "react";

    export default function Page() {
    const [contacts, setContacts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Función para obtener los contactos desde la API
        const fetchContacts = async () => {
        try {
            const response = await fetch("/api/getcontact");
            if (!response.ok) {
            throw new Error("Ocurrió un error al obtener los contactos.");
            }
            const data = await response.json();
            setContacts(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
        };

        fetchContacts();
    }, []);

    if (loading) {
        return <p className="text-center">Cargando...</p>;
    }

    if (error) {
        return <p className="text-center text-red-500">{error}</p>;
    }

    return (
        <div className="p-8 h-screen ">
        <h1 className="text-2xl font-bold mb-6">Registros de Contacto</h1>

        {/* Tabla para mostrar los registros */}
        <table className="min-w-full bg-white border border-gray-300">
            <thead>
            <tr className="bg-gray-100">
                <th className="py-2 px-4 border-b">ID</th>
                <th className="py-2 px-4 border-b">Nombre</th>
                <th className="py-2 px-4 border-b">Correo Electrónico</th>
                <th className="py-2 px-4 border-b">Teléfono</th>
                <th className="py-2 px-4 border-b">Mensaje</th>
                <th className="py-2 px-4 border-b">Fecha de Creación</th>
            </tr>
            </thead>
            <tbody>
            {contacts.map((contact) => (
                <tr key={contact.id} className="border-b">
                <td className="py-2 px-4 text-center">{contact.id}</td>
                <td className="py-2 px-4">{contact.name}</td>
                <td className="py-2 px-4">{contact.email}</td>
                <td className="py-2 px-4">{contact.phone || "N/A"}</td>
                <td className="py-2 px-4">{contact.message}</td>
                <td className="py-2 px-4 text-center">
                    {new Date(contact.created_at).toLocaleString()}
                </td>
                </tr>
            ))}
            </tbody>
        </table>

        {/* Mensaje si no hay registros */}
        {contacts.length === 0 && (
            <p className="text-center text-gray-500 mt-4">No hay registros disponibles.</p>
        )}
        </div>
    );
    }
