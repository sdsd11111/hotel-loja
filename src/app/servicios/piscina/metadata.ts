import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Piscina Climatizada y Spa | Hotel Puente Roto',
    description: 'Relájese en nuestra piscina panorámica climatizada y spa. Masajes, hidromasaje y vistas espectaculares de las montañas de Cuenca.',
    openGraph: {
        title: 'Piscina Climatizada y Spa | Hotel Puente Roto',
        description: 'Relájese en nuestra piscina panorámica climatizada y spa. Masajes, hidromasaje y vistas espectaculares.',
        url: 'https://hotelloja.com/servicios/piscina',
        siteName: 'Hotel Puente Roto',
        images: [
            {
                url: '/Logo.png',
                width: 1200,
                height: 630,
                alt: 'Piscina y Spa Hotel Puente Roto',
            },
        ],
        locale: 'es_EC',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Piscina Climatizada y Spa | Hotel Puente Roto',
        description: 'Piscina panorámica climatizada, spa, masajes y vistas espectaculares.',
        images: ['/Logo.png'],
    },
};
