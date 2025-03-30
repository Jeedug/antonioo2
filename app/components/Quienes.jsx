import React from 'react';
import { Star } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function Quienes() {
  const { t } = useTranslation();

  return (
    <div className="relative py-24 md:py-32 overflow-hidden">
      {/* Fondo con gradiente sutil */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-gray-100 to-gray-50" />
      
      <div className="relative container mx-auto px-4 md:px-16">
        {/* Sección superior con título y estrellas */}
        <div className="flex flex-col md:flex-row items-start gap-8 md:gap-16 mb-16">
          <div className="flex-1">
            <h2 className="text-4xl md:text-6xl font-bold text-gray-900 tracking-tight">
              {t('who_we_are')}
            </h2>
            <div className="mt-6 flex items-center gap-2">
              {[...Array(5)].map((_, index) => (
                <Star
                  key={index}
                  className="w-5 h-5 text-yellow-400 fill-yellow-400"
                />
              ))}
              <span className="ml-2 text-sm text-gray-600">
                {t('perfect_rating')}
              </span>
            </div>
          </div>
          
          <div className="flex-1">
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
              {t('who_we_are_description')}
            </p>
          </div>
        </div>

        {/* Grid de características */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          <Feature 
            number="01"
            title={t('proven_experience')}
            description={t('proven_experience_description')}
          />
          <Feature 
            number="02"
            title={t('specialized_team')}
            description={t('specialized_team_description')}
          />
          <Feature 
            number="03"
            title={t('total_commitment')}
            description={t('total_commitment_description')}
          />
        </div>

        {/* Sección de estadísticas */}
        <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          <Stat number="20+" text={t('years_of_experience')} />
          <Stat number="1000+" text={t('successful_cases')} />
          <Stat number="98%" text={t('satisfied_clients')} />
          <Stat number="24/7" text={t('availability')} />
        </div>
      </div>
    </div>
  );
}

function Feature({ number, title, description }) {
  return (
    <div className="group p-8 rounded-3xl bg-white shadow-sm hover:shadow-xl transition-all duration-300">
      <span className="text-sm font-medium text-gray-400">{number}</span>
      <h3 className="mt-4 text-xl md:text-2xl font-semibold text-gray-900">
        {title}
      </h3>
      <p className="mt-4 text-gray-600 leading-relaxed">
        {description}
      </p>
      <div className="mt-6 w-12 h-0.5 bg-[#1E4973] transform origin-left group-hover:scale-x-[500%] transition-transform duration-1000" />
    </div>
  );
}

function Stat({ number, text }) {
  return (
    <div className="text-center">
      <div className="text-3xl md:text-4xl font-bold text-[#1E4973]">
        {number}
      </div>
      <div className="mt-2 text-sm text-gray-600">
        {text}
      </div>
    </div>
  );
}