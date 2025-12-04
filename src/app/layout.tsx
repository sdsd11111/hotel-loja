import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { FontAwesomeProvider } from "./providers";
import GoogleTranslateWrapper from "@/components/GoogleTranslateWrapper";

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Hotel Puente Roto - Experiencia Premium en Ecuador",
  description: "Hotel de lujo en Cuenca, Ecuador. Habitaciones premium, restaurante gourmet, spa y eventos corporativos.",
  keywords: ["Hotel Puente Roto", "Ecuador", "Hospedaje Premium", "Restaurante", "Spa", "Eventos"],
  authors: [{ name: "Hotel Puente Roto" }],
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
  },
  openGraph: {
    title: "Hotel Puente Roto - Experiencia Premium en Ecuador",
    description: "Hotel de lujo en Cuenca, Ecuador. Habitaciones premium, restaurante gourmet, spa y eventos corporativos. Reserve ahora con el mejor precio garantizado.",
    url: 'https://hotelloja.com',
    siteName: 'Hotel Puente Roto',
    images: [
      {
        url: '/Logo.png',
        width: 1200,
        height: 630,
        alt: 'Hotel Puente Roto - Experiencia Premium',
      },
    ],
    locale: 'es_EC',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Hotel Puente Roto - Experiencia Premium en Ecuador",
    description: "Hotel de lujo en Cuenca, Ecuador. Habitaciones premium, restaurante gourmet, spa y eventos corporativos.",
    images: ['/Logo.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${playfairDisplay.variable} ${inter.variable} antialiased bg-white text-gray-900 flex flex-col min-h-screen font-sans`}>
        <FontAwesomeProvider>
          <div className="flex flex-col flex-1">
            {children}
            <GoogleTranslateWrapper />
          </div>
        </FontAwesomeProvider>
      </body>
    </html>
  );
}
