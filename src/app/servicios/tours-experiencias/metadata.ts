import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Tours y Experiencias en Loja | Hotel Loja',
    description: 'Explore el Parque Nacional Podocarpus, Villonaco y el centro histórico de Loja con nuestros tours guiados. Aventura y naturaleza en Ecuador.',
    openGraph: {
        title: 'Tours y Experiencias en Loja | Hotel Loja',
        description: 'Explore Podocarpus, Villonaco y el centro histórico de Loja con nuestros tours guiados. Aventura y naturaleza.',
        url: 'https://hotelloja.com/servicios/tours-experiencias',
        siteName: 'Hotel Loja',
        images: [
            {
                url: '/Logo.png',
                width: 1200,
                height: 630,
                alt: 'Tours Loja',
            },
        ],
        locale: 'es_EC',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Tours y Experiencias en Loja | Hotel Loja',
        description: 'Explore Podocarpus, Villonaco y Loja con tours guiados.',
        images: ['/Logo.png'],
    },
};
