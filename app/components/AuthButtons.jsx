'use client'
import Link from "next/link";
import { useTranslation } from 'react-i18next';

export default function AuthButtons({ user }) {
  const { t } = useTranslation();

  function deleteCookie(name) {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  }
  
  const handleLogout = async () => {
    try {
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include', // Incluye las cookies en la solicitud
      });

      if (response.ok) {
        // Recargar la página para actualizar el estado de autenticación
        document.location.reload();
      } else {
        console.error('Error al cerrar sesión');
      }
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  if (user) {
    return (
      <div className="flex flex-col md:flex-row items-center gap-3">
        <span className="text-white text-sm font-light">{user.email}</span>
        <button
          onClick={handleLogout}
          className="w-full md:w-auto bg-transparent border border-white/20 hover:bg-white/10 text-white rounded-lg px-6 py-2.5 text-xs font-medium transition-all duration-200"
        >
          {t('logout')}
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row gap-3 w-full">
      <Link href="/auth/login" className="w-full">
        <button className="w-full bg-white/5 hover:bg-white/10 border border-white/20 text-white rounded-lg px-4 py-2.5 text-xs font-medium transition-all duration-200">
          {t('login')}
        </button>
      </Link>
      <Link href="/auth/register" className="w-full">
        <button className="w-full bg-white text-[#101326] hover:bg-white/90 rounded-lg px-6 py-2.5 text-xs font-medium transition-all duration-200">
          {t('register')}
        </button>
      </Link>
    </div>
  );
} 