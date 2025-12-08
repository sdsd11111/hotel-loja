import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  console.log('=== Iniciando solicitud de platos activos ===');

  try {
    const apiUrl = process.env.CPANEL_API_URL;
    const apiKey = process.env.PHP_API_KEY;

    if (!apiUrl) {
      console.error('Error: Falta la variable de entorno CPANEL_API_URL');
      return NextResponse.json(
        { error: 'Error de configuración del servidor' },
        { status: 500 }
      );
    }

    console.log('Realizando consulta a la API de cPanel:', apiUrl);

    const response = await fetch(`${apiUrl}?activos`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...(apiKey ? { 'X-API-Key': apiKey } : {}),
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('Error en la respuesta de la API:', errorData);
      throw new Error(`Error en la API: ${response.status}`);
    }

    const result = await response.json();

    if (!result.success) {
      console.error('La API devolvió un error:', result.error);
      return NextResponse.json(
        {
          error: 'Error al obtener los platos',
          details: result.error,
        },
        { status: 500 }
      );
    }

    const platos = result.data || [];

    console.log(`Se encontraron ${platos.length} platos activos`);

    if (platos.length === 0) {
      console.log('No se encontraron platos activos en la base de datos');
    } else {
      console.log('Platos encontrados:', platos.map((p: any) => ({
        id: p.id,
        titulo: p.titulo,
        activo: p.activo,
        tiene_imagen: !!p.imagen_url
      })));
    }

    return NextResponse.json(platos);
  } catch (error) {
    console.error('Error inesperado:', error);
    return NextResponse.json(
      {
        error: 'Error interno del servidor',
        message: error instanceof Error ? error.message : 'Error desconocido',
      },
      { status: 500 }
    );
  } finally {
    console.log('=== Finalizada solicitud de platos activos ===');
  }
}
