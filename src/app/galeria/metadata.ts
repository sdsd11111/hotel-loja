import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Galería | Hotel Loja',
    description: 'Explore nuestra galería de imágenes. Descubra las habitaciones, restaurante, spa, eventos y la belleza de Loja que rodea nuestro hotel premium.',
    openGraph: {
        title: 'Galería | Hotel Loja',
        description: 'Explore nuestra galería de imágenes. Descubra las habitaciones, restaurante, spa, eventos y la belleza de Loja.',
        url: 'https://hotelloja.com/galeria',
        siteName: 'Hotel Loja',
        images: [
            {
                url: '/Logo.png',
                width: 1200,
                height: 630,
                alt: 'Galería Hotel Loja',
            },
        ],
        locale: 'es_EC',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Galería | Hotel Loja',
        description: 'Explore nuestra galería de imágenes. Descubra las habitaciones, restaurante, spa y eventos.',
        images: ['/Logo.png'],
    },
};
