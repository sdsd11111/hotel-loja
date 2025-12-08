import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

/**
 * GET /api/platos
 * Obtiene todos los platos (para el panel de administración)
 */
export async function GET() {
  try {
    const apiUrl = process.env.CPANEL_API_URL;
    const apiKey = process.env.PHP_API_KEY;

    if (!apiUrl) {
      return NextResponse.json(
        { error: 'Error de configuración del servidor' },
        { status: 500 }
      );
    }

    // Llamar a la API PHP sin filtro de activos (para admin)
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': apiKey || '',
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: 'Error al obtener los platos' },
        { status: 500 }
      );
    }

    const result = await response.json();

    if (!result.success) {
      return NextResponse.json(
        { error: result.error },
        { status: 500 }
      );
    }

    return NextResponse.json(result.data || []);
  } catch (error) {
    console.error('Error fetching platos:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/platos
 * Crea un nuevo plato usando la API de cPanel
 */
export async function POST(request: Request) {
  try {
    console.log('Iniciando solicitud POST para crear plato...');

    const formData = await request.formData();

    const titulo = formData.get('titulo')?.toString()?.trim() || '';
    const descripcion = formData.get('descripcion')?.toString()?.trim() || '';
    const precioStr = formData.get('precio')?.toString() || '';
    const precio = parseFloat(precioStr);
    const activo = formData.get('activo') === 'true';
    const imagen = formData.get('imagen') as File | null;

    // Validaciones
    if (!titulo || !descripcion || isNaN(precio)) {
      return NextResponse.json(
        { error: 'Faltan campos requeridos' },
        { status: 400 }
      );
    }

    let imagen_url = '';

    // Si hay imagen, subirla primero
    if (imagen && imagen.size > 0) {
      const uploadApiUrl = process.env.CPANEL_UPLOAD_API_URL ||
        (process.env.CPANEL_API_URL?.replace('api-platos.php', 'upload-imagen.php'));
      const apiKey = process.env.PHP_API_KEY;

      if (!uploadApiUrl) {
        return NextResponse.json(
          { error: 'URL de upload no configurada' },
          { status: 500 }
        );
      }

      const uploadFormData = new FormData();
      uploadFormData.append('imagen', imagen);

      const uploadResponse = await fetch(uploadApiUrl, {
        method: 'POST',
        headers: {
          'X-API-Key': apiKey || '',
        },
        body: uploadFormData,
      });

      if (!uploadResponse.ok) {
        const errorData = await uploadResponse.json();
        return NextResponse.json(
          { error: 'Error al subir imagen', details: errorData },
          { status: 500 }
        );
      }

      const uploadResult = await uploadResponse.json();
      if (uploadResult.success && uploadResult.data?.url) {
        imagen_url = uploadResult.data.url;
      }
    }

    // Crear el plato en la API PHP
    const apiUrl = process.env.CPANEL_API_URL;
    const apiKey = process.env.PHP_API_KEY;

    if (!apiUrl) {
      return NextResponse.json(
        { error: 'Error de configuración del servidor' },
        { status: 500 }
      );
    }

    const platoData = {
      titulo,
      descripcion,
      precio,
      activo,
      imagen_url
    };

    const createResponse = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': apiKey || '',
      },
      body: JSON.stringify(platoData),
    });

    if (!createResponse.ok) {
      const errorData = await createResponse.json();
      return NextResponse.json(
        { error: 'Error al crear plato', details: errorData },
        { status: createResponse.status }
      );
    }

    const result = await createResponse.json();

    if (!result.success) {
      return NextResponse.json(
        { error: result.error },
        { status: 400 }
      );
    }

    console.log('Plato creado exitosamente:', result.data);
    return NextResponse.json(result.data, { status: 201 });

  } catch (error) {
    console.error('Error en POST /api/platos:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
