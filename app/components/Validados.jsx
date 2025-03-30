import React from 'react';
import { Star, Quote } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function Validados() {
  const { t } = useTranslation();

  // Definir los testimonios dentro del componente para acceder a `t`
  const testimonios = [
    {
      nombre: "Carlos Martínez",
      cargo: "Director General",
      empresa: "Innovatech Solutions",
      texto: t('testimonial_1'),
      rating: 5
    },
    {
      nombre: "Ana Rodríguez",
      cargo: "Empresaria",
      empresa: "Grupo Comercial AR",
      texto: t('testimonial_2'),
      rating: 5
    },
    {
      nombre: "Miguel Torres",
      cargo: "Director Financiero",
      empresa: "Construcciones MT",
      texto: t('testimonial_3'),
      rating: 5
    }
  ];

  return (
    <div className="relative py-24 md:py-32 overflow-hidden bg-[#F5F5F7]">
      {/* Elementos decorativos de fondo */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-gradient-to-br from-[#1E4973]/10 to-transparent rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-[#1E4973]/5 to-transparent rounded-full blur-3xl" />
      
      <div className="relative container mx-auto px-4 md:px-16">
        {/* Encabezado */}
        <div className="max-w-2xl mx-auto text-center mb-12 md:mb-24">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 tracking-tight mb-6">
            {t('excellence_backed')}
          </h2>
          <p className="text-lg text-gray-500 leading-relaxed">
            {t('excellence_backed_subtitle')}
          </p>
        </div>

        {/* Testimonios */}
        <div className="space-y-8 md:space-y-12">
          {testimonios.map((testimonio, index) => (
            <TestimonioRow 
              key={index} 
              {...testimonio} 
              isReverse={index % 2 !== 0}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function TestimonioRow({ nombre, cargo, empresa, texto, rating, isReverse }) {
  return (
    <div className={`group relative flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-16 
      ${isReverse ? 'md:flex-row-reverse' : ''}`}>
      {/* Línea decorativa - visible solo en desktop */}
      <div className="hidden md:block absolute inset-y-0 left-0 w-px bg-gradient-to-b from-transparent via-[#1E4973]/20 to-transparent" />
      
      {/* Información del autor */}
      <div className="w-full md:w-64 flex-shrink-0 md:pl-8 flex flex-row md:flex-col items-center md:items-start gap-4 md:gap-0">
        <div className="flex gap-1 order-2 md:order-1 md:mb-3">
          {[...Array(rating)].map((_, i) => (
            <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
          ))}
        </div>
        <div className="order-1 md:order-2 text-center md:text-left">
          <p className="font-medium text-gray-900">{nombre}</p>
          <p className="text-sm text-gray-500">{cargo}</p>
          <p className="text-sm text-[#1E4973]">{empresa}</p>
        </div>
      </div>

      {/* Testimonio */}
      <div className="flex-1 relative p-6 md:p-12 bg-white rounded-2xl border border-gray-100 shadow-sm group-hover:shadow-lg transition-all duration-500">
        <Quote className="absolute top-4 left-4 w-6 md:w-8 h-6 md:h-8 text-[#1E4973]/10" />
        <p className="text-gray-600 text-base md:text-xl leading-relaxed pl-4">
          "{texto}"
        </p>
        <div className="absolute inset-0 border border-transparent group-hover:border-[#1E4973]/10 rounded-2xl transition-colors duration-300" />
      </div>
    </div>
  );
}