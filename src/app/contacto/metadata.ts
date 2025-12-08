import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Contacto | Hotel Puente Roto',
    description: 'Contáctenos para reservas, consultas o solicitudes especiales. Atención personalizada 24/7. Teléfono: (07) 2570-888 | Email: info@hotelloja.com',
    openGraph: {
        title: 'Contacto | Hotel Puente Roto',
        description: 'Contáctenos para reservas, consultas o solicitudes especiales. Atención personalizada 24/7.',
        url: 'https://hotelloja.com/contacto',
        siteName: 'Hotel Puente Roto',
        images: [
            {
                url: '/Logo.png',
                width: 1200,
                height: 630,
                alt: 'Contacto Hotel Puente Roto',
            },
        ],
        locale: 'es_EC',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Contacto | Hotel Puente Roto',
        description: 'Contáctenos para reservas, consultas o solicitudes especiales. Atención 24/7.',
        images: ['/Logo.png'],
    },
};
