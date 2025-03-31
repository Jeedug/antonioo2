'use client'
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';

const languages = {
  es: 'Español',
  en: 'English',
  fr: 'Français'
};

export default function LanguageSelector({ initialLang = 'es' }) {
  const [isOpen, setIsOpen] = useState(false);
  const { i18n } = useTranslation();
  const router = useRouter();

  const handleLanguageChange = (lang) => {
    i18n.changeLanguage(lang);
    setIsOpen(false);
    router.refresh();
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex flex-row items-center gap-2 text-white hover:text-white/80"
      >
        <span className="text-xs">Idioma</span>
        <div className="flex items-center gap-1">
          <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
          <span className="font-medium text-sm">
            {languages[i18n.language] || languages['es']}
          </span>
        </div>
      </button>

      {isOpen && (
        <div className="absolute top-full mt-2 right-0 bg-[#1E4973] rounded-lg shadow-lg py-2 min-w-[120px] z-50">
          {Object.entries(languages).map(([code, name]) => (
            <button
              key={code}
              onClick={() => handleLanguageChange(code)}
              className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                i18n.language === code 
                  ? 'text-white bg-[#15355A]' 
                  : 'text-white/80 hover:bg-[#15355A] hover:text-white'
              }`}
            >
              {name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
} 
