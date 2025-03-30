import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import Header from './Header';

export default function HeaderContainer() {
  const cookieStore = cookies();
  const token = cookieStore.get('auth_token');

  let user = null;
  if (token) {
    try {
      user = jwt.verify(token.value, process.env.JWT_SECRET_KEY);
    } catch (error) {
      console.error('Error al verificar el token:', error);
    }
  }

  return (
    <Header user={user} />
  );
} 