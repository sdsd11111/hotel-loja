import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Servicios Premium | Hotel Loja',
    description: 'Descubra nuestros servicios exclusivos: restaurante gourmet, spa, piscina climatizada, salas de eventos y tours guiados por Loja y Podocarpus.',
    openGraph: {
        title: 'Servicios Premium | Hotel Loja',
        description: 'Descubra nuestros servicios exclusivos: restaurante gourmet, spa, piscina climatizada, salas de eventos y tours guiados.',
        url: 'https://hotelloja.com/servicios',
        siteName: 'Hotel Loja',
        images: [
            {
                url: '/Logo.png',
                width: 1200,
                height: 630,
                alt: 'Servicios Hotel Loja',
            },
        ],
        locale: 'es_EC',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Servicios Premium | Hotel Loja',
        description: 'Restaurante gourmet, spa, piscina climatizada, eventos y tours guiados.',
        images: ['/Logo.png'],
    },
};
