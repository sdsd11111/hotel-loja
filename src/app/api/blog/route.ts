import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

// Helper para obtener la URL de la API del Blog
const getBlogApiUrl = () => {
    if (process.env.CPANEL_BLOG_API_URL) return process.env.CPANEL_BLOG_API_URL;
    if (process.env.CPANEL_API_URL) return process.env.CPANEL_API_URL.replace('api-platos.php', 'blog/blog_api.php');
    return null;
};

/**
 * GET /api/blog
 */
export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const slug = searchParams.get('slug');
        const active = searchParams.get('active');
        const apiUrl = getBlogApiUrl();
        console.log('DEBUG: Resolved API URL:', apiUrl);
        const apiKey = process.env.PHP_API_KEY;

        if (!apiUrl) return NextResponse.json({ error: 'Configuración de API no encontrada' }, { status: 500 });

        const targetUrl = new URL(apiUrl);
        if (slug) targetUrl.searchParams.append('slug', slug);
        if (active) targetUrl.searchParams.append('active', active);

        const response = await fetch(targetUrl.toString(), {
            method: 'GET',
            headers: { 'X-API-Key': apiKey || '', 'Cache-Control': 'no-cache' }
        });

        if (!response.ok) {
            try {
                const errorData = await response.json();
                return NextResponse.json(errorData, { status: response.status });
            } catch (e) {
                return NextResponse.json({ error: 'Error en el servidor remoto' }, { status: response.status });
            }
        }
        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error('Error en GET /api/blog:', error);
        return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
    }
}

/**
 * POST /api/blog
 */
export async function POST(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        const apiUrl = getBlogApiUrl();
        const apiKey = process.env.PHP_API_KEY;
        if (!apiUrl) return NextResponse.json({ error: 'Configuración faltante' }, { status: 500 });

        // Append query params to the target PHP URL specially for the ID
        const targetUrl = new URL(apiUrl);
        if (id) {
            targetUrl.searchParams.append('id', id);
        }

        const contentType = request.headers.get('content-type') || '';
        let body: any;
        const headers: any = { 'X-API-Key': apiKey || '' };

        if (contentType.includes('multipart/form-data')) {
            body = await request.formData();
        } else {
            body = JSON.stringify(await request.json());
            headers['Content-Type'] = 'application/json';
        }

        // Use targetUrl.toString() to include the ?id=...
        const response = await fetch(targetUrl.toString(), { method: 'POST', headers, body });
        const data = await response.json();
        return NextResponse.json(data, { status: response.status });
    } catch (error) {
        console.error('Error POST /api/blog:', error);
        return NextResponse.json({ error: 'Error interno' }, { status: 500 });
    }
}

/**
 * PUT /api/blog
 */
export async function PUT(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');
        if (!id) return NextResponse.json({ error: 'ID requerido' }, { status: 400 });

        const apiUrl = getBlogApiUrl();
        const apiKey = process.env.PHP_API_KEY;
        if (!apiUrl) return NextResponse.json({ error: 'Configuración faltante' }, { status: 500 });

        const targetUrl = new URL(apiUrl);
        targetUrl.searchParams.append('id', id);

        const contentType = request.headers.get('content-type') || '';
        let body: any;
        const headers: any = { 'X-API-Key': apiKey || '' };

        if (contentType.includes('multipart/form-data')) {
            body = await request.formData();
        } else {
            body = JSON.stringify(await request.json());
            headers['Content-Type'] = 'application/json';
        }

        const response = await fetch(targetUrl.toString(), { method: 'PUT', headers, body });
        const data = await response.json();
        return NextResponse.json(data, { status: response.status });
    } catch (error) {
        console.error('Error PUT /api/blog:', error);
        return NextResponse.json({ error: 'Error interno' }, { status: 500 });
    }
}

/**
 * DELETE /api/blog
 */
export async function DELETE(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');
        if (!id) return NextResponse.json({ error: 'ID requerido' }, { status: 400 });

        const apiUrl = getBlogApiUrl();
        const apiKey = process.env.PHP_API_KEY;
        if (!apiUrl) return NextResponse.json({ error: 'Configuración faltante' }, { status: 500 });

        const targetUrl = new URL(apiUrl);
        targetUrl.searchParams.append('id', id);

        const response = await fetch(targetUrl.toString(), {
            method: 'DELETE',
            headers: { 'X-API-Key': apiKey || '' }
        });

        const data = await response.json();
        return NextResponse.json(data, { status: response.status });
    } catch (error) {
        return NextResponse.json({ error: 'Error interno' }, { status: 500 });
    }
}
