'use client'
import { CartProvider } from '../context/CartContext';

export default function ClientProvider({ children }) {
  return (
    <CartProvider>
      {children}
    </CartProvider>
  );
} 