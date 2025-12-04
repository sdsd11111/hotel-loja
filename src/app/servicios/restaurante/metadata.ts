import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Restaurante Gourmet | Hotel Loja',
    description: 'Disfrute de nuestra cocina fusión de autor, menú ejecutivo y desayuno buffet. Experiencia gastronómica premium en el corazón de Loja.',
    openGraph: {
        title: 'Restaurante Gourmet | Hotel Loja',
        description: 'Disfrute de nuestra cocina fusión de autor, menú ejecutivo y desayuno buffet. Experiencia gastronómica premium.',
        url: 'https://hotelloja.com/servicios/restaurante',
        siteName: 'Hotel Loja',
        images: [
            {
                url: '/Logo.png',
                width: 1200,
                height: 630,
                alt: 'Restaurante Hotel Loja',
            },
        ],
        locale: 'es_EC',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Restaurante Gourmet | Hotel Loja',
        description: 'Cocina fusión de autor, menú ejecutivo y desayuno buffet premium.',
        images: ['/Logo.png'],
    },
};
