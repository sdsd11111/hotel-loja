import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

/**
 * GET /api/platos/[id]
 * Obtiene un plato específico por ID
 */
export async function GET(
  request: NextRequest,
  context: { params: { id: string } } | { params: Promise<{ id: string }> }
) {
  const params = await (typeof context.params === 'object' && 'then' in context.params
    ? context.params
    : Promise.resolve(context.params));
  const id = params.id;

  try {
    const apiUrl = process.env.CPANEL_API_URL;
    const apiKey = process.env.PHP_API_KEY;

    if (!apiUrl) {
      return NextResponse.json(
        { error: 'Error de configuración del servidor' },
        { status: 500 }
      );
    }

    const response = await fetch(`${apiUrl}?id=${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': apiKey || '',
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: 'Plato no encontrado' },
        { status: 404 }
      );
    }

    const result = await response.json();

    if (!result.success) {
      return NextResponse.json(
        { error: result.error },
        { status: 404 }
      );
    }

    return NextResponse.json(result.data);
  } catch (error) {
    console.error('Error fetching plato:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/platos/[id]
 * Actualiza un plato existente
 */
export async function PUT(
  request: NextRequest,
  context: { params: { id: string } } | { params: Promise<{ id: string }> }
) {
  console.log('Solicitud PUT recibida');

  const params = await (typeof context.params === 'object' && 'then' in context.params
    ? context.params
    : Promise.resolve(context.params));
  let id = params.id;

  if (!id || id === '[id]') {
    const url = new URL(request.url);
    const pathSegments = url.pathname.split('/');
    id = pathSegments[pathSegments.length - 1];
  }

  console.log('ID del plato a actualizar:', id);

  if (!id || id === '[id]') {
    return NextResponse.json(
      { error: 'ID del plato no proporcionado o inválido' },
      { status: 400 }
    );
  }

  try {
    const formData = await request.formData();
    console.log('Datos del formulario recibidos');

    const titulo = formData.get('titulo') as string;
    const descripcion = formData.get('descripcion') as string;
    const precio = parseFloat(formData.get('precio') as string);
    const activo = formData.get('activo') === 'true';
    const imagen = formData.get('imagen') as File | null;
    const imagen_url_existente = formData.get('imagen_url') as string | null;

    // Validar campos requeridos
    if (!titulo || !descripcion || isNaN(precio)) {
      return NextResponse.json(
        { error: 'Faltan campos requeridos' },
        { status: 400 }
      );
    }

    let imagen_url = imagen_url_existente;

    // Si hay una nueva imagen, subirla primero
    if (imagen && imagen.size > 0) {
      const uploadApiUrl = process.env.CPANEL_UPLOAD_API_URL || (process.env.CPANEL_API_URL?.replace('api-platos.php', 'upload-imagen.php'));
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

    // Actualizar plato en la API de cPanel
    const apiUrl = process.env.CPANEL_API_URL;
    const apiKey = process.env.PHP_API_KEY;

    if (!apiUrl) {
      return NextResponse.json(
        { error: 'Error de configuración del servidor' },
        { status: 500 }
      );
    }

    const updateData: any = {};
    if (titulo !== undefined) updateData.titulo = titulo;
    if (descripcion !== undefined) updateData.descripcion = descripcion;
    if (precio !== undefined) updateData.precio = precio;
    if (activo !== undefined) updateData.activo = activo;
    if (imagen_url) updateData.imagen_url = imagen_url;

    const updateResponse = await fetch(`${apiUrl}?id=${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': apiKey || '',
      },
      body: JSON.stringify(updateData),
    });

    if (!updateResponse.ok) {
      const errorData = await updateResponse.json();
      return NextResponse.json(
        { error: 'Error al actualizar plato', details: errorData },
        { status: updateResponse.status }
      );
    }

    const result = await updateResponse.json();

    if (!result.success) {
      return NextResponse.json(
        { error: result.error },
        { status: 400 }
      );
    }

    return NextResponse.json(result.data);
  } catch (error) {
    console.error('Error updating plato:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/platos/[id]
 * Elimina un plato (soft delete - marca como inactivo)
 */
export async function DELETE(
  request: NextRequest,
  context: { params: { id: string } } | { params: Promise<{ id: string }> }
) {
  console.log('Solicitud DELETE recibida');

  const params = await (typeof context.params === 'object' && 'then' in context.params
    ? context.params
    : Promise.resolve(context.params));
  let id = params.id;

  if (!id || id === '[id]') {
    const url = new URL(request.url);
    const pathSegments = url.pathname.split('/');
    id = pathSegments[pathSegments.length - 1];
  }

  console.log('ID del plato a eliminar:', id);

  if (!id || id === '[id]') {
    return NextResponse.json(
      { error: 'ID del plato no proporcionado o inválido' },
      { status: 400 }
    );
  }

  try {
    const apiUrl = process.env.CPANEL_API_URL;
    const apiKey = process.env.PHP_API_KEY;

    if (!apiUrl) {
      return NextResponse.json(
        { error: 'Error de configuración del servidor' },
        { status: 500 }
      );
    }

    const response = await fetch(`${apiUrl}?id=${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': apiKey || '',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(
        { error: 'Error al eliminar plato', details: errorData },
        { status: response.status }
      );
    }

    const result = await response.json();

    if (!result.success) {
      return NextResponse.json(
        { error: result.error },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: result.message,
      id
    });
  } catch (error) {
    console.error('Error deleting plato:', error);
    return NextResponse.json(
      { success: false, error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
