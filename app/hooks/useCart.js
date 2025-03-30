/**
 * Hook para acceder al contexto del carrito
 * @type {function}
 * @returns {Object} Contexto del carrito con las siguientes propiedades:
 * @property {Array} cart - Array de productos en el carrito
 * @property {function} addToCart - Función para añadir productos al carrito
 * @property {function} removeFromCart - Función para eliminar productos del carrito
 * @property {function} updateQuantity - Función para actualizar la cantidad de un producto
 * @property {function} clearCart - Función para vaciar completamente el carrito
 * @property {function} getTotal - Función que calcula el total del carrito
 * @property {boolean} isClient - Indica si el código se está ejecutando en el lado del cliente
 */
export { useCart as default } from '../context/CartContext';
