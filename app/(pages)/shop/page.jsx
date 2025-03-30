'use client'
import React from 'react'
import useCart from '../../hooks/useCart';
import { useState } from 'react';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';

const Products = () => {
  const { cart, addToCart, removeFromCart, updateQuantity, getTotal } = useCart();
  const [showCart, setShowCart] = useState(false);
  const { t } = useTranslation();

  const products = [
    {
      name: "Piensa Como Abogado",
      price: 1299.99,
      image: "https://m.media-amazon.com/images/I/51gnAOwZwVS._AC_UF894,1000_QL80_.jpg", // Asegúrate de tener estas imágenes
      description: t('piensa_como_abogado_description'),
      stars: 5
    },
    {
      name: "El Abogado de los Pobres",
      price: 499.99,
      image: "https://static0planetadelibroscommx.cdnstatics.com/usuaris/libros/fotos/119/m_libros/118760_el-abogado-de-pobres_9788427041158.jpg",
      description: t('abogado_pobres_description'),
      stars: 5
    },
    {
      name: "Manual del Abogado",
      price: 649.99,
      image: "https://images.cdn2.buscalibre.com/fit-in/360x360/45/08/4508cd14be5532d85746ed35a80e5a18.jpg",
      description: t('manual_abogado_description'),
      stars: 4
    },
  ];

  const getProductQuantity = (productName) => {
    const item = cart.find(item => item.name === productName);
    return item ? item.quantity : 0;
  };

  return (
    <div className="min-h-screen bg-white">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        {/* Hero Section */}
        <section className="text-center mb-20">
          <h2 className="text-5xl font-medium tracking-tight mb-4">
            {t('new_products')}
          </h2>
          <p className="text-gray-500 text-xl">
            {t('discover_our_latest_books')}
          </p>
        </section>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {products.map((product) => {
            const quantity = getProductQuantity(product.name);
            
            return (
              <div key={product.name} className="group bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="aspect-square overflow-hidden rounded-2xl bg-gray-100 mb-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-contain object-center group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-medium">{product.name}</h3>
                    <p className="text-gray-500 mt-1">${product.price.toFixed(2)}</p>
                    <div className="relative">
                      <p className="text-sm text-gray-600 mt-2 h-20 overflow-hidden">
                        {product.description}
                      </p>
                      {product.description.length > 150 && (
                        <button
                          onClick={(e) => {
                            e.target.previousSibling.style.height = 'auto';
                            e.target.style.display = 'none';
                          }}
                          className="text-blue-500 text-sm mt-1"
                        >
                          {t('see_more')}
                        </button>
                      )}
                    </div>
                    <div className="flex items-center mt-2">
                      {[...Array(product.stars)].map((_, i) => (
                        <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </div>

                  {quantity > 0 ? (
                    <div className="flex items-center justify-between bg-gray-50 rounded-lg p-3">
                      <div className="flex items-center space-x-3">
                        <button
                          onClick={() => updateQuantity(product.name, quantity - 1)}
                          className="text-gray-500 hover:text-gray-700 bg-white rounded-full w-8 h-8 flex items-center justify-center shadow-sm"
                        >
                          -
                        </button>
                        <span className="text-lg font-medium">{quantity}</span>
                        <button
                          onClick={() => addToCart(product)}
                          className="text-gray-500 hover:text-gray-700 bg-white rounded-full w-8 h-8 flex items-center justify-center shadow-sm"
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={() => removeFromCart(product.name)}
                        className="text-red-500 hover:text-red-700 text-sm font-medium"
                      >
                        {t('remove_all')}
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => addToCart(product)}
                      className="w-full bg-black text-white px-4 py-3 rounded-lg hover:bg-gray-800 transition-colors"
                    >
                      {t('add_to_cart')}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Checkout Button */}
        {cart.length > 0 && (
          <div className="fixed bottom-8 left-0 right-0 flex justify-center">
            <Link 
              href="/shop/checkout"
              className="bg-black text-white px-8 py-4 rounded-full shadow-lg hover:bg-gray-800 transition-colors flex items-center space-x-3"
            >
              <span>{t('go_to_checkout')}</span>
              <span className="font-medium">${getTotal().toFixed(2)}</span>
            </Link>
          </div>
        )}
      </main>
    </div>
  );
};

export default Products;
