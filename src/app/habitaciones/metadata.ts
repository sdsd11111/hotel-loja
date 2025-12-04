import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Habitaciones Premium | Hotel Puente Roto',
    description: 'Descubra nuestras habitaciones de lujo en Cuenca. Suites ejecutivas, presidenciales y habitaciones familiares con todas las comodidades. Reserve con el mejor precio garantizado.',
    openGraph: {
        title: 'Habitaciones Premium | Hotel Puente Roto',
        description: 'Descubra nuestras habitaciones de lujo en Cuenca. Suites ejecutivas, presidenciales y habitaciones familiares con todas las comodidades.',
        url: 'https://hotelloja.com/habitaciones',
        siteName: 'Hotel Puente Roto',
        images: [
            {
                url: '/Logo.png',
                width: 1200,
                height: 630,
                alt: 'Habitaciones Hotel Puente Roto',
            },
        ],
        locale: 'es_EC',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Habitaciones Premium | Hotel Puente Roto',
        description: 'Descubra nuestras habitaciones de lujo en Cuenca. Suites ejecutivas, presidenciales y habitaciones familiares.',
        images: ['/Logo.png'],
    },
};
