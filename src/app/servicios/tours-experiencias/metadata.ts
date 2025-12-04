import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Tours y Experiencias en Cuenca | Hotel Puente Roto',
    description: 'Explore el Parque Nacional Cajas, el Mirador del Turi y el centro histórico de Cuenca con nuestros tours guiados. Aventura y naturaleza en Ecuador.',
    openGraph: {
        title: 'Tours y Experiencias en Cuenca | Hotel Puente Roto',
        description: 'Explore el Parque Cajas, el Mirador del Turi y el centro histórico de Cuenca con nuestros tours guiados. Aventura y naturaleza.',
        url: 'https://hotelloja.com/servicios/tours-experiencias',
        siteName: 'Hotel Puente Roto',
        images: [
            {
                url: '/Logo.png',
                width: 1200,
                height: 630,
                alt: 'Tours Cuenca Cajas Turi',
            },
        ],
        locale: 'es_EC',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Tours y Experiencias en Cuenca | Hotel Puente Roto',
        description: 'Explore el Parque Cajas, el Mirador del Turi y Cuenca con tours guiados.',
        images: ['/Logo.png'],
    },
};
