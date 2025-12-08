import { Metadata } from 'next';

interface PageMetadataProps {
    title: string;
    description: string;
    path?: string;
    image?: string;
}

export function generatePageMetadata({
    title,
    description,
    path = '',
    image = '/Logo.png'
}: PageMetadataProps): Metadata {
    const baseUrl = 'https://hotelloja.com';
    const fullUrl = `${baseUrl}${path}`;

    return {
        title: `${title} | Hotel Puente Roto`,
        description,
        openGraph: {
            title: `${title} | Hotel Puente Roto`,
            description,
            url: fullUrl,
            siteName: 'Hotel Puente Roto',
            images: [
                {
                    url: image,
                    width: 1200,
                    height: 630,
                    alt: title,
                },
            ],
            locale: 'es_EC',
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            title: `${title} | Hotel Puente Roto`,
            description,
            images: [image],
        },
    };
}
