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
        title: `${title} | Hotel Loja`,
        description,
        openGraph: {
            title: `${title} | Hotel Loja`,
            description,
            url: fullUrl,
            siteName: 'Hotel Loja',
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
            title: `${title} | Hotel Loja`,
            description,
            images: [image],
        },
    };
}
