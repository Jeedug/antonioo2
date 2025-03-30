import React from 'react';
import { useTranslation } from 'react-i18next';

export default function Asuntos() {
  const { t } = useTranslation();

  return (
    <div 
      className="relative py-24 md:py-32 px-4 md:px-16 min-h-screen bg-gradient-to-b from-[#101628] via-[#151B33] to-[#1A1F3C]"
    >
      {/* Contenido superior */}
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center text-center mb-16 md:mb-24">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            {t('areas_of_practice')}
          </h2>
          <p className="text-white/70 text-sm md:text-base max-w-2xl leading-relaxed">
            {t('team_description')}
          </p>
        </div>

        {/* Contenedor de tarjetas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {asuntos.map((asunto, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-3xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-500"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black/80 z-10" />
              
              <img
                src={asunto.image}
                alt={asunto.title}
                className="w-full h-64 object-cover object-center transform group-hover:scale-105 transition-transform duration-700"
              />
              
              <div className="absolute inset-x-0 bottom-0 z-20 p-6 md:p-8">
                <h3 className="text-xl md:text-2xl font-semibold text-white mb-3 group-hover:translate-y-0 translate-y-8 transition-transform duration-500">
                  {t(asunto.title)}
                </h3>
                <p className="text-white/80 text-sm leading-relaxed opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                  {t(asunto.description)}
                </p>
              </div>

              <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const asuntos = [
  {
    title: "civil_law",
    description: "civil_law_description",
    image: "./asuntos-1.png"
  },
  {
    title: "commercial_law",
    description: "commercial_law_description",
    image: "./asuntos-2.png"
  },
  {
    title: "family_law",
    description: "family_law_description",
    image: "./asuntos-3.png"
  }
];