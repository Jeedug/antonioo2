'use client'
import { createContext, useContext, useState, useEffect } from 'react';

/**
 * Contexto del carrito de compras
 * @type {React.Context}
 */
const CartContext = createContext();

/**
 * Obtiene el carrito inicial desde localStorage
 * @returns {Array} Array de productos en el carrito
 */
const getInitialCart = () => {
  try {
    // Solo ejecutar en el cliente
    if (typeof window !== 'undefined') {
      const savedCart = localStorage.getItem('cart');
      return savedCart ? JSON.parse(savedCart) : [];
    }
  } catch (error) {
    console.error('Error al cargar el carrito inicial:', error);
  }
  return [];
};

/**
 * Proveedor del contexto del carrito
 * @param {Object} props - Propiedades del componente
 * @param {React.ReactNode} props.children - Componentes hijos
 * @returns {React.ReactElement} Componente proveedor del contexto
 */
export function CartProvider({ children }) {
  // Inicializamos con un array vacío para evitar discrepancias de hidratación
  const [cart, setCart] = useState([]);
  const [isClient, setIsClient] = useState(false);

  // Este efecto se ejecuta una sola vez cuando el componente se monta en el cliente
  useEffect(() => {
    setIsClient(true);
    const initialCart = getInitialCart();
    setCart(initialCart);
  }, []);

  // Este efecto maneja la sincronización con localStorage
  useEffect(() => {
    if (isClient) {
      try {
        localStorage.setItem('cart', JSON.stringify(cart));
      } catch (error) {
        console.error('Error al guardar el carrito:', error);
      }
    }
  }, [cart, isClient]);

  /**
   * Añade un producto al carrito
   * @param {Object} product - Producto a añadir
   * @param {string} product.name - Nombre del producto
   * @param {number} product.price - Precio del producto
   * @param {string} product.image - URL de la imagen del producto
   * @param {string} product.description - Descripción del producto
   * @param {number} product.stars - Calificación del producto
   */
  const addToCart = (product) => {
    if (!product.name || !product.price || !product.image || !product.description || !product.stars) {
      console.error('El producto debe tener todos los campos requeridos');
      return;
    }

    setCart(prevCart => {
      const existingProduct = prevCart.find(item => item.name === product.name);
      
      if (existingProduct) {
        return prevCart.map(item =>
          item.name === product.name
            ? { ...item, quantity: (item.quantity || 1) + 1 }
            : item
        );
      }

      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  /**
   * Elimina un producto del carrito
   * @param {string} productName - Nombre del producto a eliminar
   */
  const removeFromCart = (productName) => {
    setCart(prevCart => prevCart.filter(item => item.name !== productName));
  };

  /**
   * Actualiza la cantidad de un producto en el carrito
   * @param {string} productName - Nombre del producto
   * @param {number} quantity - Nueva cantidad
   */
  const updateQuantity = (productName, quantity) => {
    if (quantity < 1) {
      removeFromCart(productName);
      return;
    }

    setCart(prevCart =>
      prevCart.map(item =>
        item.name === productName
          ? { ...item, quantity }
          : item
      )
    );
  };

  /**
   * Vacía el carrito por completo
   */
  const clearCart = () => {
    setCart([]);
  };

  /**
   * Calcula el total del carrito
   * @returns {number} Total de la compra
   */
  const getTotal = () => {
    return cart.reduce((total, item) => total + (item.price * (item.quantity || 1)), 0);
  };

  return (
    <CartContext.Provider value={{
      cart,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getTotal,
      isClient, // Exportamos isClient para poder usarlo en los componentes
    }}>
      {children}
    </CartContext.Provider>
  );
}

/**
 * Hook para acceder al contexto del carrito
 * @returns {Object} Contexto del carrito con las siguientes propiedades:
 * @property {Array} cart - Array de productos en el carrito
 * @property {function} addToCart - Función para añadir productos al carrito
 * @property {function} removeFromCart - Función para eliminar productos del carrito
 * @property {function} updateQuantity - Función para actualizar la cantidad de un producto
 * @property {function} clearCart - Función para vaciar completamente el carrito
 * @property {function} getTotal - Función que calcula el total del carrito
 * @property {boolean} isClient - Indica si el código se está ejecutando en el lado del cliente
 * 
 * @example
 * const { cart, addToCart, removeFromCart } = useCart();
 * 
 * // Añadir un producto
 * addToCart({
 *   name: 'Producto 1',
 *   price: 100,
 *   image: 'image.jpg',
 *   description: 'Descripción del producto',
 *   stars: 4
 * });
 * 
 * // Eliminar un producto
 * removeFromCart('Producto 1');
 * 
 * // Obtener el total
 * const total = getTotal();
 * 
 * @throws {Error} Si se usa fuera de un CartProvider
 */
export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart debe ser usado dentro de un CartProvider');
  }
  return context;
} 