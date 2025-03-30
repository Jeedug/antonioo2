'use client'
import { X, ShoppingCart } from "lucide-react";
import useCart from '../hooks/useCart';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';

export default function CartDrawer({ isOpen, onClose }) {
  const { t } = useTranslation();
  const { cart, removeFromCart, updateQuantity, getTotal } = useCart();

  return (
    <>
      {/* Overlay */}
      <div 
        className={`fixed inset-0 bg-black/30 backdrop-blur-sm transition-opacity z-40
          ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />
      
      {/* Drawer */}
      <div className={`fixed right-0 top-0 h-full w-full md:w-[400px] bg-[#101326] shadow-2xl z-50 
        transform transition-transform duration-300 ease-in-out flex flex-col
        ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <h2 className="text-white text-lg font-medium">{t('your_cart')}</h2>
          <button onClick={onClose} className="text-white/60 hover:text-white">
            <X size={24} />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-5">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-[300px] text-center">
              <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4">
                <ShoppingCart className="w-8 h-8 text-white/40" />
              </div>
              <p className="text-white/60 text-sm">{t('empty_cart')}</p>
            </div>
          ) : (
            <div className="space-y-4">
              {cart.map((item) => (
                <div key={item.name} className="border border-white/10 rounded-lg p-4">
                  <div className="flex gap-4">
                    <div className="w-24 h-full bg-white/5 rounded-lg overflow-hidden">
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-white text-sm font-medium">{item.name}</h3>
                      <div className="relative">
                        <p className="text-white/60 text-[10px] mt-1 h-8 overflow-hidden">
                          {item.description}
                        </p>
                        {item.description.length > 100 && (
                          <button
                            onClick={(e) => {
                              e.target.previousSibling.style.height = 'auto';
                              e.target.style.display = 'none';
                            }}
                            className="text-blue-400 text-xs mt-1"
                          >
                            {t('see_more')}
                          </button>
                        )}
                      </div>
                      <div className="flex items-center mt-1">
                        {[...Array(item.stars)].map((_, i) => (
                          <svg key={i} className="w-3 h-3 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <div className="flex items-center justify-between mt-3">
                        <span className="text-white text-sm">${item.price.toFixed(2)}</span>
                        <div className="flex items-center gap-2">
                          <button 
                            onClick={() => updateQuantity(item.name, item.quantity - 1)}
                            className="w-6 h-6 rounded-full bg-white/5 text-white hover:bg-white/10 flex items-center justify-center"
                          >
                            -
                          </button>
                          <span className="text-white text-sm">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.name, item.quantity + 1)}
                            className="w-6 h-6 rounded-full bg-white/5 text-white hover:bg-white/10 flex items-center justify-center"
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.name)}
                        className="text-red-400 hover:text-red-300 text-xs mt-2"
                      >
                        {t('remove')}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-white/10 p-6 space-y-4">
          <Link
            href="/shop"
            onClick={onClose}
            className="block w-full bg-white/10 text-white rounded-lg py-3 font-medium 
              hover:bg-white/20 transition-colors text-center"
          >
            {t('go_to_shop')}
          </Link>
          
          {cart.length > 0 && (
            <>
              <div className="flex items-center justify-between">
                <span className="text-white/60 text-sm">{t('subtotal')}</span>
                <span className="text-white text-lg font-medium">${getTotal().toFixed(2)}</span>
              </div>
              <Link
                href="/shop/checkout"
                onClick={onClose}
                className="block w-full bg-white text-[#101326] rounded-lg py-3 font-medium 
                  hover:bg-white/90 transition-colors text-center"
              >
                {t('go_to_checkout')}
              </Link>
            </>
          )}
        </div>
      </div>
    </>
  );
} 