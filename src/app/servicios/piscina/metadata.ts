import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Piscina Climatizada y Spa | Hotel Loja',
    description: 'Relájese en nuestra piscina panorámica climatizada y spa. Masajes, hidromasaje y vistas espectaculares de las montañas de Loja.',
    openGraph: {
        title: 'Piscina Climatizada y Spa | Hotel Loja',
        description: 'Relájese en nuestra piscina panorámica climatizada y spa. Masajes, hidromasaje y vistas espectaculares.',
        url: 'https://hotelloja.com/servicios/piscina',
        siteName: 'Hotel Loja',
        images: [
            {
                url: '/Logo.png',
                width: 1200,
                height: 630,
                alt: 'Piscina y Spa Hotel Loja',
            },
        ],
        locale: 'es_EC',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Piscina Climatizada y Spa | Hotel Loja',
        description: 'Piscina panorámica climatizada, spa, masajes y vistas espectaculares.',
        images: ['/Logo.png'],
    },
};
