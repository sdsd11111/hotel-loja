import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Galería | Hotel Puente Roto',
    description: 'Explore nuestra galería de imágenes. Descubra las habitaciones, restaurante, spa, eventos y la belleza de Cuenca que rodea nuestro hotel premium.',
    openGraph: {
        title: 'Galería | Hotel Puente Roto',
        description: 'Explore nuestra galería de imágenes. Descubra las habitaciones, restaurante, spa, eventos y la belleza de Cuenca.',
        url: 'https://hotelloja.com/galeria',
        siteName: 'Hotel Puente Roto',
        images: [
            {
                url: '/Logo.png',
                width: 1200,
                height: 630,
                alt: 'Galería Hotel Puente Roto',
            },
        ],
        locale: 'es_EC',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Galería | Hotel Puente Roto',
        description: 'Explore nuestra galería de imágenes. Descubra las habitaciones, restaurante, spa y eventos.',
        images: ['/Logo.png'],
    },
};
