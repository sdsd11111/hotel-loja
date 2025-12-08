'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { GalleryGrid } from '@/components/GalleryGrid';
import { headerData } from '@/types';
import { ArrowRight, Camera } from 'lucide-react';

// Links de navegación a servicios
const serviciosLinks = [
    { label: 'Habitaciones', href: '/habitaciones' },
    { label: 'Restaurante', href: '/servicios/restaurante' },
    { label: 'Piscina & Spa', href: '/servicios/piscina' },
    { label: 'Eventos', href: '/servicios/eventos' }
];

export default function GalleryPage() {
    return (
        <div className="flex flex-col min-h-screen">
            <Header logo={headerData.logo} />

            <main className="flex-1">
                {/* Hero Visual - 70% del viewport */}
                <div className="relative w-full h-[70vh]">
                    <Image
                        src="/images/galeria/hero-galeria.webp"
                        alt="Galería Hotel Puente Roto"
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/60"></div>

                    {/* Títulos sobre el hero */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="max-w-5xl mx-auto text-center px-4">
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                                Galería Hotel Puente Roto
                            </h1>
                            <h2 className="text-xl md:text-2xl lg:text-3xl text-white/90 font-medium">
                                Un recorrido visual por nuestra experiencia premium
                            </h2>
                        </div>
                    </div>
                </div>

                {/* Navegación Secundaria */}
                <div className="bg-gray-50 border-y border-gray-200">
                    <div className="container mx-auto px-4 py-6">
                        <div className="flex flex-wrap justify-center gap-4">
                            <span className="text-gray-600 font-semibold">Explore nuestros servicios:</span>
                            {serviciosLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className="text-amber-600 hover:text-amber-700 font-semibold underline underline-offset-4 transition-colors"
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Introducción */}
                <div className="container mx-auto px-4 py-16">
                    <div className="max-w-4xl mx-auto text-center">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-100 rounded-full mb-6">
                            <Camera className="w-8 h-8 text-amber-600" />
                        </div>
                        <p className="text-xl text-gray-700 leading-relaxed">
                            Explore nuestra colección de imágenes de alta calidad. Cada fotografía captura la esencia de nuestra hospitalidad, el diseño de nuestros espacios y la belleza de Cuenca que nos rodea.
                        </p>
                        <div className="w-24 h-1 bg-amber-400 mx-auto rounded-full mt-8"></div>
                    </div>
                </div>

                {/* Gallery Grid Section */}
                <div className="container mx-auto px-4 pb-20">
                    <GalleryGrid />
                </div>

                {/* CTA Final */}
                <div className="bg-gradient-to-r from-amber-500 to-yellow-500 py-16">
                    <div className="container mx-auto px-4 text-center">
                        <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                            ¿Le Gusta lo que Ve?
                        </h3>
                        <p className="text-xl text-gray-800 mb-8 max-w-2xl mx-auto">
                            Reserve ahora y experimente en persona cada detalle que ha descubierto en nuestra galería.
                        </p>
                        <div className="flex flex-col md:flex-row gap-4 justify-center">
                            <Link
                                href="/checkout/disponibilidad"
                                className="inline-flex items-center justify-center gap-2 bg-gray-900 hover:bg-gray-800 text-white font-bold py-4 px-8 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl"
                            >
                                RESERVAR AHORA - MEJOR PRECIO GARANTIZADO
                                <ArrowRight className="w-5 h-5" />
                            </Link>
                            <Link
                                href="/habitaciones"
                                className="inline-flex items-center justify-center gap-2 bg-white hover:bg-gray-100 text-gray-900 font-bold py-4 px-8 rounded-lg transition-all duration-300 shadow-lg"
                            >
                                VER HABITACIONES
                            </Link>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
