'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { headerData } from '@/types';
import HeroPlatos from '@/components/HeroPlatos';
import {
    UtensilsCrossed,
    Clock,
    Wine,
    ChefHat,
    Star,
    Phone,
    ArrowRight,
    Download,
    CheckCircle,
    Coffee,
    Sun,
    Moon
} from 'lucide-react';

// Tipos de ofertas
type OfertaId = 'fusion' | 'ejecutivo' | 'bar';

// Ofertas gastronómicas
const ofertasGastronomicas = [
    {
        id: 'fusion' as OfertaId,
        nombre: 'Cocina Fusión (Cena a la Carta)',
        descripcion: 'Platos de autor que reinterpretan la gastronomía andina y lojana con técnicas contemporáneas.',
        destacados: [
            'Ingredientes locales frescos',
            'Presentación gourmet',
            'Menú estacional',
            'Maridaje recomendado'
        ],
        horario: '19:00 - 22:30',
        imagen: '/images/restaurante/fusion.webp',
        icono: <ChefHat className="w-6 h-6" />
    },
    {
        id: 'ejecutivo' as OfertaId,
        nombre: 'Almuerzo Ejecutivo Premium',
        descripcion: 'Opción rápida, elegante y de valor para el cliente corporativo o de negocios.',
        destacados: [
            'Menú del día',
            'Servicio ágil',
            'Precio fijo',
            'Incluye bebida'
        ],
        horario: '12:30 - 15:00',
        imagen: '/images/restaurante/ejecutivo.webp',
        icono: <Sun className="w-6 h-6" />
    },
    {
        id: 'bar' as OfertaId,
        nombre: 'Bar & Mixología',
        descripcion: 'Carta de vinos selecta y coctelería artesanal en un ambiente lounge moderno.',
        destacados: [
            'Cócteles de autor',
            'Vinos premium',
            'Tapas gourmet',
            'Vista panorámica'
        ],
        horario: '17:00 - 23:00',
        imagen: '/images/restaurante/bar.webp',
        icono: <Wine className="w-6 h-6" />
    }
];

// Horarios y servicios
const horariosServicios = [
    {
        id: 1,
        icono: <Coffee className="w-8 h-8" />,
        titulo: 'Desayuno',
        horario: '06:30 - 10:00',
        descripcion: 'Buffet continental y opciones a la carta'
    },
    {
        id: 2,
        icono: <Sun className="w-8 h-8" />,
        titulo: 'Almuerzo',
        horario: '12:30 - 15:00',
        descripcion: 'Menú ejecutivo y carta completa'
    },
    {
        id: 3,
        icono: <Moon className="w-8 h-8" />,
        titulo: 'Cena',
        horario: '19:00 - 22:30',
        descripcion: 'Cocina fusión y experiencia gourmet'
    },
    {
        id: 4,
        icono: <Phone className="w-8 h-8" />,
        titulo: 'Servicio 24/7',
        horario: 'A la habitación',
        descripcion: 'Room service disponible todo el día'
    }
];

// Galería de imágenes
const galeriaImagenes = [
    { id: 1, url: '/images/restaurante/galeria-plato-estrella.webp', alt: 'Plato Estrella' },
    { id: 2, url: '/images/restaurante/galeria-ambiente-interior.webp', alt: 'Ambiente Interior' },
    { id: 3, url: '/images/restaurante/galeria-bar-bebidas.webp', alt: 'Bar y Bebidas' },
    { id: 4, url: '/images/restaurante/galeria-desayuno.webp', alt: 'Desayuno' }
];

// Links de navegación a otros servicios
const serviciosLinks = [
    { label: 'Eventos', href: '/servicios/eventos' },
    { label: 'Piscina & Spa', href: '/servicios/piscina' },
    { label: 'Habitaciones', href: '/habitaciones' }
];

export default function RestaurantePage() {
    const [ofertaActiva, setOfertaActiva] = useState<OfertaId>('fusion');
    const ofertaSeleccionada = ofertasGastronomicas.find(o => o.id === ofertaActiva) || ofertasGastronomicas[0];

    return (
        <div className="flex flex-col min-h-screen">
            <Header logo={headerData.logo} />

            <main className="flex-1">
                {/* Hero Visual - Mismo de la Home Page */}
                <HeroPlatos />

                {/* Navegación Secundaria */}
                <div className="bg-gray-50 border-y border-gray-200">
                    <div className="container mx-auto px-4 py-6">
                        <div className="flex flex-wrap justify-center gap-4">
                            <span className="text-gray-600 font-semibold">Explore más servicios:</span>
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

                {/* Sección 1: Filosofía Culinaria */}
                <div className="container mx-auto px-4 py-16">
                    <div className="max-w-4xl mx-auto text-center">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-100 rounded-full mb-6">
                            <ChefHat className="w-8 h-8 text-amber-600" />
                        </div>
                        <p className="text-xl text-gray-700 leading-relaxed">
                            Nuestro restaurante es el epicentro de la experiencia social y culinaria del Hotel Puente Roto. Bajo la dirección de nuestro Chef Ejecutivo, la filosofía es simple: honrar la rica tradición ecuatoriana a través de técnicas de cocina moderna, ofreciendo un menú dinámico y estacional en un ambiente de elegancia inigualable.
                        </p>
                        <div className="w-24 h-1 bg-amber-400 mx-auto rounded-full mt-8"></div>
                    </div>
                </div>

                {/* Sección 2: Ofertas Gastronómicas (Tabs) */}
                <div className="bg-gradient-to-b from-gray-50 to-white py-20">
                    <div className="container mx-auto px-4">
                        <div className="max-w-6xl mx-auto">
                            <h3 className="text-3xl font-bold text-gray-900 mb-12 text-center">
                                Nuestra Propuesta Gastronómica
                            </h3>

                            {/* Tabs */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                                {ofertasGastronomicas.map((oferta) => (
                                    <button
                                        key={oferta.id}
                                        onClick={() => setOfertaActiva(oferta.id)}
                                        className={`flex items-center justify-center gap-3 px-6 py-4 rounded-lg font-bold text-base transition-all duration-300 ${ofertaActiva === oferta.id
                                            ? 'bg-amber-500 text-white shadow-lg scale-105'
                                            : 'bg-white text-gray-700 hover:bg-gray-100 border-2 border-gray-200'
                                            }`}
                                    >
                                        {oferta.icono}
                                        <span className="hidden lg:inline">{oferta.nombre}</span>
                                        <span className="lg:hidden">{oferta.nombre.split('(')[0].trim()}</span>
                                    </button>
                                ))}
                            </div>

                            {/* Panel de Detalles */}
                            <div className="bg-white rounded-2xl overflow-hidden shadow-xl border border-gray-100">
                                {/* Imagen */}
                                <div className="relative aspect-[2/1] w-full">
                                    <Image
                                        src={ofertaSeleccionada.imagen}
                                        alt={ofertaSeleccionada.nombre}
                                        fill
                                        className="object-cover"
                                    />
                                    {/* Overlay con gradiente */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>

                                    {/* Horario sobre la imagen */}
                                    <div className="absolute bottom-6 left-6 right-6">
                                        <div className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full">
                                            <Clock className="w-5 h-5 text-amber-600" />
                                            <span className="font-bold text-gray-900">{ofertaSeleccionada.horario}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Contenido */}
                                <div className="p-8">
                                    <h4 className="text-2xl font-bold text-gray-900 mb-4">{ofertaSeleccionada.nombre}</h4>
                                    <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                                        {ofertaSeleccionada.descripcion}
                                    </p>

                                    {/* Destacados */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                        {ofertaSeleccionada.destacados.map((destacado, index) => (
                                            <div key={index} className="flex items-center gap-2">
                                                <CheckCircle className="w-5 h-5 text-amber-500 flex-shrink-0" />
                                                <span className="text-gray-700">{destacado}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sección 3: Horarios y Servicios */}
                <div className="container mx-auto px-4 py-20">
                    <div className="max-w-6xl mx-auto">
                        <h3 className="text-3xl font-bold text-gray-900 mb-12 text-center">
                            Horarios de Servicio
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {horariosServicios.map((servicio) => (
                                <div
                                    key={servicio.id}
                                    className="bg-white rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 text-center"
                                >
                                    <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-100 rounded-full mb-4 text-amber-600">
                                        {servicio.icono}
                                    </div>
                                    <h4 className="text-xl font-bold text-gray-900 mb-2">{servicio.titulo}</h4>
                                    <p className="text-2xl font-bold text-amber-600 mb-2">{servicio.horario}</p>
                                    <p className="text-sm text-gray-600">{servicio.descripcion}</p>
                                </div>
                            ))}
                        </div>

                        {/* Nota de reservas */}
                        <div className="mt-12 bg-amber-50 border-l-4 border-amber-500 p-6 rounded-r-lg">
                            <div className="flex items-start gap-3">
                                <Star className="w-6 h-6 text-amber-600 flex-shrink-0 mt-1" />
                                <div>
                                    <h4 className="font-bold text-gray-900 mb-1">Reservas Recomendadas</h4>
                                    <p className="text-gray-700">
                                        Para garantizar su mesa, especialmente en fines de semana y días festivos, le recomendamos hacer su reserva con anticipación. También ofrecemos capacidad para cenas privadas y eventos especiales.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Galería */}
                <div className="bg-gray-50 py-20">
                    <div className="container mx-auto px-4">
                        <div className="max-w-6xl mx-auto">
                            <h3 className="text-3xl font-bold text-gray-900 mb-12 text-center">
                                Experiencia Visual
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                {galeriaImagenes.map((imagen) => (
                                    <div
                                        key={imagen.id}
                                        className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group"
                                    >
                                        <Image
                                            src={imagen.url}
                                            alt={imagen.alt}
                                            fill
                                            className="object-cover group-hover:scale-110 transition-transform duration-500"
                                        />
                                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* CTA Principal */}
                <div className="bg-gradient-to-r from-amber-500 to-yellow-500 py-16">
                    <div className="container mx-auto px-4">
                        <div className="max-w-4xl mx-auto text-center">
                            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                                Reserve su Mesa Ahora
                            </h3>
                            <p className="text-xl text-gray-800 mb-8">
                                Déjenos ser parte de sus momentos especiales. Una experiencia gastronómica que recordará.
                            </p>
                            <div className="flex flex-col md:flex-row gap-4 justify-center">
                                <Link
                                    href="/reservar-mesa"
                                    className="inline-flex items-center justify-center gap-2 bg-gray-900 hover:bg-gray-800 text-white font-bold py-4 px-8 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl"
                                >
                                    RESERVAR MESA AHORA
                                    <ArrowRight className="w-5 h-5" />
                                </Link>
                                <Link
                                    href="/menu-completo.pdf"
                                    className="inline-flex items-center justify-center gap-2 bg-white hover:bg-gray-100 text-gray-900 font-bold py-4 px-8 rounded-lg transition-all duration-300 shadow-lg"
                                >
                                    <Download className="w-5 h-5" />
                                    Ver Menú Completo
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
