import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Salas de Eventos y Convenciones | Hotel Loja',
    description: 'Organice su evento corporativo, conferencia o celebración en nuestras salas equipadas con tecnología de punta. Capacidad hasta 200 personas.',
    openGraph: {
        title: 'Salas de Eventos y Convenciones | Hotel Loja',
        description: 'Organice su evento corporativo, conferencia o celebración. Salas equipadas con tecnología de punta.',
        url: 'https://hotelloja.com/servicios/eventos',
        siteName: 'Hotel Loja',
        images: [
            {
                url: '/Logo.png',
                width: 1200,
                height: 630,
                alt: 'Eventos Hotel Loja',
            },
        ],
        locale: 'es_EC',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Salas de Eventos y Convenciones | Hotel Loja',
        description: 'Eventos corporativos, conferencias y celebraciones con tecnología de punta.',
        images: ['/Logo.png'],
    },
};
