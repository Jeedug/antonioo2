"use client";

import { Footer } from "flowbite-react";
import { useTranslation } from 'react-i18next';

export default function FooterComp() {
  const { t } = useTranslation();

  return (
    <Footer className="bg-[#f5f5f7]">
      <div className="mx-auto w-full max-w-7xl px-6 py-12">
        {/* Grid principal */}
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4 mb-12">
          {/* Columna 1: Información principal */}
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <img 
                src="/logo.png" 
                alt="Gonzales Reyes Logo" 
                className="w-12 h-12 object-contain"
              />
              <h3 className="text-lg font-semibold text-gray-900">Gonzales Reyes™</h3>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">
              {t('footer_description')}
            </p>
            <div className="space-y-2">
              <p className="text-sm text-gray-600">Tel: +52 (55) 1234-5678</p>
              <p className="text-sm text-gray-600">Email: contacto@gonzalesreyes.com</p>
            </div>
          </div>

          {/* Columna 2: Áreas de Práctica */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-900">{t('practice_areas')}</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">{t('corporate_law')}</a></li>
              <li><a href="#" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">{t('civil_and_commercial_litigation')}</a></li>
              <li><a href="#" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">{t('real_estate_law')}</a></li>
              <li><a href="#" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">{t('labor_law')}</a></li>
              <li><a href="#" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">{t('intellectual_property')}</a></li>
            </ul>
          </div>

          {/* Columna 3: Recursos */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-900">{t('resources')}</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">{t('legal_blog')}</a></li>
              <li><a href="#" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">{t('success_cases')}</a></li>
              <li><a href="#" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">{t('faq')}</a></li>
              <li><a href="#" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">{t('publications')}</a></li>
              <li><a href="#" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">{t('events')}</a></li>
            </ul>
          </div>

          {/* Columna 4: Legal */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-900">{t('legal')}</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">{t('privacy_policy')}</a></li>
              <li><a href="#" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">{t('terms_and_conditions')}</a></li>
              <li><a href="#" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">{t('cookie_policy')}</a></li>
            </ul>
          </div>
        </div>

        {/* Línea divisoria */}
        <div className="border-t border-gray-200 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Copyright y ubicación */}
            <div className="flex flex-col space-y-2">
              <p className="text-xs text-gray-600">
                {t('copyright')}
              </p>
              <p className="text-xs text-gray-600">
                {t('address')}
              </p>
            </div>
            
            {/* Enlaces adicionales */}
            <div className="flex space-x-6">
              <a href="#" className="text-xs text-gray-600 hover:text-gray-900 transition-colors">LinkedIn</a>
              <a href="#" className="text-xs text-gray-600 hover:text-gray-900 transition-colors">Twitter</a>
              <a href="#" className="text-xs text-gray-600 hover:text-gray-900 transition-colors">Facebook</a>
            </div>
          </div>
        </div>
      </div>
    </Footer>
  );
}
