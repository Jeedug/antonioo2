'use client'
import Link from "next/link";
import { ShoppingCart, Menu, X } from "lucide-react";
import { useState } from "react";
import AuthButtons from './AuthButtons';
import LanguageSelector from './LanguageSelector';
import CartDrawer from './CartDrawer';
import useCart from '../hooks/useCart';
import { useTranslation } from 'react-i18next';

export default function Header({ user = null }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { cart, isClient } = useCart();
  const { t, i18n } = useTranslation();

  // Calcular el total de items en el carrito
  const cartItemsCount = cart.reduce((total, item) => total + (item.quantity || 0), 0);

  const renderCartIcon = () => (
    <button
      onClick={() => setIsCartOpen(true)}
      className="relative group"
    >
      <ShoppingCart className="w-5 h-5 cursor-pointer text-white group-hover:text-white/80 transition-colors" />
      {isClient && cartItemsCount > 0 && (
        <span className="absolute -top-2 -right-2 w-5 h-5 bg-white text-[#101326] rounded-full text-xs flex items-center justify-center font-medium">
          {cartItemsCount}
        </span>
      )}
    </button>
  );

  return (
    <>
      <header className="px-4 md:px-12 bg-[#101326] fixed z-50 w-full top-0">
        <div className="relative flex items-center justify-between h-20">
          {/* Logo y Marca */}
          <Link href="/" className="flex items-center gap-3">
            <img src="/logo.png" className="h-12 md:h-16" alt="Logo" />
            <div className="flex flex-col justify-center">
              <span className="font-semibold text-white text-sm md:text-base">Gonzales Reyes</span>
              <span className="font-light text-white/60 text-xs md:text-sm">Abogados Asociados</span>
            </div>
          </Link>

          {/* Navegación Desktop */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/shop" className="text-white hover:text-white/80 text-sm">
              {t('shop')}
            </Link>
            <Link href="/about" className="text-white hover:text-white/80 text-sm">
              {t('about_us')}
            </Link>
            <Link href="/contact" className="text-white hover:text-white/80 text-sm">
              {t('contact')}
            </Link>
          </nav>

          {/* Sección derecha Desktop */}
          <div className="hidden md:flex items-center gap-6">
            <LanguageSelector initialLang={i18n.language} />
            {renderCartIcon()}
            <AuthButtons user={user} />
          </div>

          {/* Botones móviles */}
          <div className="md:hidden flex items-center gap-4">
            {renderCartIcon()}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white p-2"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Menú Móvil */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-20 left-0 right-0 bg-[#101326] border-t border-white/10 p-4">
            <nav className="flex flex-col gap-4">
              <Link
                href="/shop"
                className="text-white hover:text-white/80 text-sm"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('shop')}
              </Link>
              <Link
                href="/about"
                className="text-white hover:text-white/80 text-sm"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('about_us')}
              </Link>
              <Link
                href="/contact"
                className="text-white hover:text-white/80 text-sm"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('contact')}
              </Link>

              <div className="flex flex-col gap-4 pt-4 border-t border-white/10">
                <LanguageSelector initialLang={i18n.language} />
                <div className="flex flex-col gap-3">
                  <AuthButtons user={user} />
                </div>
              </div>
            </nav>
          </div>
        )}
      </header>

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
      />
    </>
  );
}