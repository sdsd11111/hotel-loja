'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Wifi, Users, Maximize } from 'lucide-react';

// Mock Data for Rooms
const rooms = [
    {
        id: 'suite-ejecutiva',
        title: "Suite Ejecutiva",
        slug: "suite-ejecutiva",
        description: "Espacio diseñado para el viajero de negocios, con área de trabajo ergonómica y vistas panorámicas.",
        price: 85,
        image: "/images/rooms/suite-ejecutiva.jpg", // Placeholder path
        features: ["King Size", "Vista Ciudad", "WiFi Alta Vel."],
        tag: "Oferta Exclusiva Web"
    },
    {
        id: 'habitacion-familiar-premium',
        title: "Habitación Familiar Premium",
        slug: "habitacion-familiar-premium",
        description: "Amplitud y confort para toda la familia. Espacios conectados y amenidades para todos.",
        price: 120,
        image: "/images/rooms/familiar-premium.jpg", // Placeholder path
        features: ["2 Queen", "Sala de Estar", "Smart TV 55\""],
        tag: "Ideal Familias"
    },
    {
        id: 'doble-deluxe',
        title: "Doble Deluxe",
        slug: "doble-deluxe",
        description: "El equilibrio perfecto entre confort y precio. Ideal para parejas o escapadas de fin de semana.",
        price: 65,
        image: "/images/rooms/doble-deluxe.jpg", // Placeholder path
        features: ["Queen Size", "Baño Privado", "Desayuno Incl."],
        tag: "Más Vendida"
    }
];

export const HabitacionesOfertas = () => {
    return (
        <section className="py-20 bg-gray-50">
            <div className="container mx-auto px-4">
                {/* Section Header */}
                <div className="text-center mb-16 max-w-3xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
                        Explore Nuestras Categorías de <br className="hidden md:block" />
                        <span className="text-blue-600">Habitaciones y Ofertas Exclusivas.</span>
                    </h2>
                    <p className="text-lg text-gray-600 leading-relaxed">
                        Desde el confort ejecutivo hasta el lujo familiar, encuentre la habitación perfecta para su estadía en Cuenca. Recuerde que al reservar aquí, accede automáticamente a <span className="font-semibold text-gray-900">tarifas exclusivas y servicios adicionales gratuitos</span> que solo encontrará en nuestro sitio web oficial.
                    </p>
                </div>

                {/* Rooms Grid/Carousel */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {rooms.map((room) => (
                        <div
                            key={room.id}
                            className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col"
                        >
                            {/* Image Container */}
                            <div className="relative h-64 w-full overflow-hidden bg-gray-200">
                                {/* Placeholder for Image - In production this would be a real image */}
                                <div className="absolute inset-0 flex items-center justify-center text-gray-400 bg-gray-200">
                                    <span className="text-sm font-medium">Imagen: {room.title}</span>
                                </div>

                                {/* Tag */}
                                <div className="absolute top-4 right-4 bg-yellow-400 text-gray-900 text-xs font-bold px-3 py-1.5 rounded-full shadow-md z-10 uppercase tracking-wide">
                                    {room.tag}
                                </div>

                                {/* Overlay on Hover */}
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
                            </div>

                            {/* Content */}
                            <div className="p-6 flex flex-col flex-grow">
                                <div className="mb-4">
                                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                                        {room.title}
                                    </h3>
                                    <p className="text-gray-600 text-sm line-clamp-2">
                                        {room.description}
                                    </p>
                                </div>

                                {/* Features */}
                                <div className="flex flex-wrap gap-2 mb-6">
                                    {room.features.map((feature, idx) => (
                                        <span key={idx} className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-gray-100 text-gray-800">
                                            {feature}
                                        </span>
                                    ))}
                                </div>

                                {/* Price & CTA */}
                                <div className="mt-auto flex items-center justify-between pt-4 border-t border-gray-100">
                                    <div className="flex flex-col">
                                        <span className="text-xs text-gray-500">Desde</span>
                                        <span className="text-2xl font-bold text-gray-900">
                                            ${room.price} <span className="text-xs font-normal text-gray-500">/noche</span>
                                        </span>
                                    </div>

                                    <Link
                                        href={`/habitaciones/${room.slug}`}
                                        className="inline-flex items-center justify-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-lg transition-colors group-hover:shadow-lg group-hover:shadow-blue-500/30"
                                    >
                                        Ver Detalles
                                        <ArrowRight className="ml-2 w-4 h-4" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* View All Link */}
                <div className="text-center mt-12">
                    <Link
                        href="/habitaciones"
                        className="inline-flex items-center text-blue-600 hover:text-blue-800 font-semibold transition-colors"
                    >
                        Ver todas las habitaciones
                        <ArrowRight className="ml-2 w-5 h-5" />
                    </Link>
                </div>
            </div>
        </section>
    );
};
