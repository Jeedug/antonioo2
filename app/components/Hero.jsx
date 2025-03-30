import { Star } from "lucide-react";
import Link from "next/link";
import React from "react";
import { useTranslation } from 'react-i18next';

export default function Hero() {
  const { t } = useTranslation();

  return (
    <>
      <div className="relative min-h-screen">
        <img
          src="/hero.png"
          alt="Hero Background"
          className="absolute top-0 left-0 w-full h-full object-cover brightness-75"
        />

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4 sm:px-8 md:px-20 mt-16 md:mt-0">
          <p className="text-xs sm:text-sm font-bold mb-2 md:mb-4 tracking-wider uppercase">
            {t('certified_and_reliable')}
          </p>

          <h1 className="text-2xl sm:text-4xl md:text-6xl font-bold mb-4 md:mb-6 leading-tight md:leading-tight max-w-5xl">
            {t('hero_title')}
          </h1>

          <p className="text-sm sm:text-base font-light mb-6 md:mb-8 max-w-2xl opacity-90">
            {t('hero_subtitle')}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
            <Link href="/contact" className="bg-[#1E4973] rounded-full hover:bg-[#1E4973]/80 transition-colors text-white font-normal text-sm sm:text-base py-3 px-6 sm:px-8">
              {t('contact')}
            </Link>
            <Link href="/about" className="text-white font-medium text-sm sm:text-base py-3 px-6 sm:px-8 rounded-full border border-white/20 hover:bg-white/10 transition-colors">
              {t('more_info')}
            </Link>
          </div>
        </div>
      </div>

      <div className="w-full py-16 md:py-24 bg-[#101628]">
        <div className="container mx-auto px-4">
          <h2 className="text-white text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-4">
            {t('client_testimonials')}
          </h2>
          <p className="text-white/60 text-sm sm:text-base text-center mb-12 md:mb-16 max-w-2xl mx-auto">
            {t('client_testimonials_subtitle')}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-12">
            <Opinion 
              rating={5}
              text={t('testimonial_1')}
              author="María González"
              role={t('businesswoman')}
            />
            <Opinion 
              rating={5}
              text={t('testimonial_2')}
              author="Carlos Ruiz"
              role={t('owner')}
            />
            <Opinion 
              rating={5}
              text={t('testimonial_3')}
              author="Ana Martínez"
              role={t('executive_director')}
            />
          </div>
        </div>
      </div>
    </>
  );
}

function Opinion({ rating, text, author, role }) {
  return (
    <div className="group relative flex flex-col p-6 sm:p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-300">
      <div className="flex gap-1 mb-4">
        {[...Array(rating)].map((_, i) => (
          <Star
            key={i}
            className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 fill-yellow-400"
          />
        ))}
      </div>
      
      <p className="text-white/90 text-sm sm:text-base leading-relaxed mb-6 font-light">
        "{text}"
      </p>
      
      <div className="mt-auto">
        <p className="text-white font-medium text-sm sm:text-base">
          {author}
        </p>
        <p className="text-white/60 text-xs sm:text-sm">
          {role}
        </p>
      </div>
      
      <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-300" />
    </div>
  );
}