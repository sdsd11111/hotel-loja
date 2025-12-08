import { NextResponse } from 'next/server';
import { serialize } from 'cookie';

export async function POST() {
  // Crear una cookie de expiración (eliminando la cookie)
  const cookie = serialize('admin-session', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    expires: new Date(0), // Fecha en el pasado para eliminar la cookie
    path: '/',
  });

  const response = NextResponse.json(
    { message: 'Sesión cerrada correctamente' },
    { status: 200 }
  );
  
  // Establecer la cookie de expiración en la respuesta
  response.headers.set('Set-Cookie', cookie);
  
  return response;
}
