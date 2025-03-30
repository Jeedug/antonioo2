'use client'
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Users, Scale, Clock, Award } from 'lucide-react';
import LanguageProvider from '@/app/components/LanguageProvider';

export default function About() {
  const { t } = useTranslation();

  return (
    <LanguageProvider>
    <div className="min-h-screen bg-[#101628]">
      {/* Hero Section */}
      <div className="relative h-[60vh] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#1E4973] to-[#101628] opacity-90" />
        <img
          src="/contact-bg.png"
          alt="Oficina Gonzales Reyes"
          className="absolute w-full h-full object-cover object-center brightness-50"
        />
        <div className="relative h-full flex items-center justify-center">
          <div className="text-center px-4 md:px-0">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              {t("about_title")}
            </h1>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              {t("about_subtitle")}
            </p>
          </div>
        </div>
      </div>

      {/* Historia Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 text-center">
            {t("history_title")}
          </h2>
          <div className="space-y-6 text-white/80">
            <p className="leading-relaxed">
              {t("history_text_1")}
            </p>
            <p className="leading-relaxed">
              {t("history_text_2")}
            </p>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white/5 py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { icon: Users, value: "2,500+", label: t("stats_clients") },
              { icon: Scale, value: "95%", label: t("stats_cases") },
              { icon: Clock, value: "35+", label: t("stats_experience") },
              { icon: Award, value: "50+", label: t("stats_awards") }
            ].map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="flex justify-center mb-4">
                  <stat.icon className="w-12 h-12 text-[#1E4973] group-hover:text-white transition-colors duration-300" />
                </div>
                <p className="text-3xl font-bold text-white mb-2">{stat.value}</p>
                <p className="text-white/60">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Valores Section */}
      <div className="container mx-auto px-4 py-20">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-16 text-center">
          {t("values_title")}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: t("value_excellence"),
              description: t("value_excellence_desc")
            
            },
            {
              title: t('value_integrity'),
              description: t('value_integrity_desc')
            },
            {
              title: t('value_innovation'),
              description: t('value_innovation_desc')
            }
          ].map((valor, index) => (
            <div 
              key={index}
              className="p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-300"
            >
              <h3 className="text-xl font-bold text-white mb-4">{valor.title}</h3>
              <p className="text-white/70">{valor.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
    </LanguageProvider>
  );
}
