import React from 'react';
import { MapPin, Phone, Clock } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const ubicaciones = [
  {
    nombre: "Oficina Principal Monterrey",
    direccion: "Av. Constitución 2000, Centro, 64000 Monterrey, N.L.",
    telefono: "+52 (81) 8123-4567",
    horario: "Lun - Vie: 9:00 - 18:00",
    coords: "25.669178,-100.309496"
  },
  {
    nombre: "San Pedro Garza García",
    direccion: "Av. Gómez Morín 900, Del Valle, 66220 San Pedro Garza García, N.L.",
    telefono: "+52 (81) 8123-4568",
    horario: "Lun - Vie: 9:00 - 18:00",
    coords: "25.654410,-100.402800"
  }
];

export default function Location() {
  const { t } = useTranslation();

  // Usar OpenStreetMap centrado en Monterrey
  const mapUrl = `https://www.openstreetmap.org/export/embed.html?bbox=-100.4500%2C25.6000%2C-100.2500%2C25.7500&layer=mapnik&marker=25.669178%2C-100.309496`;

  return (
    <div className="py-24 md:py-32 px-4 md:px-16 bg-[#F5F5F7]">
      <div className="max-w-7xl mx-auto">
        {/* Encabezado */}
        <div className="max-w-2xl mx-auto text-center mb-16 md:mb-24">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 tracking-tight mb-6">
            {t('locations')}
          </h2>
          <p className="text-lg text-gray-500 leading-relaxed">
            {t('locations_subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 md:gap-12">
          {/* Lista de ubicaciones */}
          <div className="lg:col-span-2 space-y-8">
            {ubicaciones.map((ubicacion, index) => (
              <a 
                key={index}
                href={`https://www.openstreetmap.org/?mlat=${ubicacion.coords.split(',')[0]}&mlon=${ubicacion.coords.split(',')[1]}#map=16/${ubicacion.coords.split(',')[0]}/${ubicacion.coords.split(',')[1]}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block group bg-white p-6 md:p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300"
              >
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {ubicacion.nombre}
                </h3>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-[#1E4973] flex-shrink-0 mt-1" />
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {ubicacion.direccion}
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-[#1E4973]" />
                    <p className="text-gray-600 text-sm">
                      {ubicacion.telefono}
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-[#1E4973]" />
                    <p className="text-gray-600 text-sm">
                      {ubicacion.horario}
                    </p>
                  </div>
                </div>

                <div className="mt-6 w-12 h-0.5 bg-[#1E4973]/10 group-hover:w-full transition-all duration-500" />
              </a>
            ))}
          </div>

          {/* Mapa */}
          <div className="lg:col-span-3 rounded-2xl overflow-hidden shadow-lg h-[400px] md:h-[600px] bg-white">
            <iframe
              src={mapUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              className="w-full h-full"
            />
            <div className="text-xs text-center text-gray-500 mt-2">
              © <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer" className="hover:text-[#1E4973]">OpenStreetMap contributors</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}