'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Check, ArrowRight } from 'lucide-react';

// Habitaciones data
const habitaciones = [
    {
        id: 1,
        nombre: 'Suite Ejecutiva',
        slug: 'suite-ejecutiva',
        descripcion: 'Perfecta para el viajero de negocios. Amplio escritorio, conexión de alta velocidad y un espacio diseñado para el descanso productivo.',
        amenidades: [
            'Cama Queen',
            'Estación de Café',
            'Vistas a la Ciudad',
            'Escritorio Ejecutivo'
        ],
        imagenPrincipal: '/images/habitaciones/suite-ejecutiva-main.webp',
        imagenMiniatura: '/images/habitaciones/suite-ejecutiva-thumb.webp'
    },
    {
        id: 2,
        nombre: 'Doble Familiar',
        slug: 'doble-familiar',
        descripcion: 'La opción ideal para familias o grupos. Ofrece dos cómodas camas y espacio funcional para disfrutar en conjunto.',
        amenidades: [
            'Dos camas matrimoniales',
            'Espacio para equipaje',
            'Baño amplio',
            'TV por cable'
        ],
        imagenPrincipal: '/images/habitaciones/doble-familiar-main.webp',
        imagenMiniatura: '/images/habitaciones/doble-familiar-thumb.webp'
    },
    {
        id: 3,
        nombre: 'Habitación Estándar Confort',
        slug: 'estandar-confort',
        descripcion: 'La mejor relación calidad-precio. Acceso a todas las amenidades del hotel con el confort y la calidad que nos distinguen.',
        amenidades: [
            'Cama Queen',
            'Amenidades de Lujo',
            'Climatización',
            'WiFi de alta velocidad'
        ],
        imagenPrincipal: '/images/habitaciones/estandar-confort-main.webp',
        imagenMiniatura: '/images/habitaciones/estandar-confort-thumb.webp'
    },
    {
        id: 4,
        nombre: 'Suite Premium Deluxe',
        slug: 'suite-premium-deluxe',
        descripcion: 'Lujo y exclusividad garantizados. Sala de estar separada, baño con jacuzzi y balcón privado con vistas panorámicas de Cuenca.',
        amenidades: [
            'Cama King',
            'Jacuzzi',
            'Balcón Privado',
            'Mini-Bar Premium'
        ],
        imagenPrincipal: '/images/habitaciones/suite-premium-deluxe-main.webp',
        imagenMiniatura: '/images/habitaciones/suite-premium-deluxe-thumb.webp'
    },
    {
        id: 5,
        nombre: 'Triple Confort',
        slug: 'triple-confort',
        descripcion: 'Solución práctica para grupos pequeños o familias. Espacios bien distribuidos para un descanso simultáneo y cómodo.',
        amenidades: [
            'Tres camas Twin',
            'Armario grande',
            'Amenities Premium',
            'Espacio amplio'
        ],
        imagenPrincipal: '/images/habitaciones/triple-confort-main.webp',
        imagenMiniatura: '/images/habitaciones/triple-confort-thumb.webp'
    },
    {
        id: 6,
        nombre: 'Junior Suite Elegance',
        slug: 'junior-suite-elegance',
        descripcion: 'Un equilibrio perfecto entre espacio y diseño. Pequeña área de lounge para relajarse y diseño minimalista moderno.',
        amenidades: [
            'Cama King',
            'Sofá de descanso',
            'Diseño moderno',
            'Smart TV 55"'
        ],
        imagenPrincipal: '/images/habitaciones/junior-suite-elegance-main.webp',
        imagenMiniatura: '/images/habitaciones/junior-suite-elegance-thumb.webp'
    }
];

export const HabitacionesHome = () => {
    const [habitacionActiva, setHabitacionActiva] = useState(habitaciones[0]);

    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-4">
                {/* Section Title */}
                <div className="text-center mb-12 max-w-3xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        Encuentre su Espacio: <span className="text-amber-500">Confort Superior en Cada Categoría.</span>
                    </h2>
                    <p className="text-lg text-gray-600 leading-relaxed">
                        Cada una de nuestras habitaciones ha sido diseñada con atención al detalle, priorizando el descanso, la funcionalidad y las comodidades modernas. Descubra la categoría perfecta para su estadía.
                    </p>
                    <div className="w-24 h-1 bg-amber-400 mx-auto rounded-full mt-6"></div>
                </div>

                {/* Main Layout */}
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:items-stretch">
                        {/* A. Cuadrícula de Selección (Miniaturas) */}
                        <div className="lg:col-span-1">
                            <h3 className="text-xl font-bold text-gray-900 mb-4">Seleccione una Categoría:</h3>
                            <div className="grid grid-cols-2 lg:grid-cols-1 gap-3 lg:max-h-[700px] lg:overflow-y-auto lg:pr-2">
                                {habitaciones.map((habitacion) => (
                                    <button
                                        key={habitacion.id}
                                        onClick={() => setHabitacionActiva(habitacion)}
                                        className={`relative overflow-hidden rounded-lg transition-all duration-300 group ${habitacionActiva.id === habitacion.id
                                            ? 'ring-4 ring-amber-500 shadow-xl scale-105'
                                            : 'hover:ring-2 hover:ring-amber-300 hover:shadow-lg'
                                            }`}
                                    >
                                        <div className="relative aspect-[4/3]">
                                            <Image
                                                src={habitacion.imagenMiniatura}
                                                alt={habitacion.nombre}
                                                fill
                                                className="object-cover transition-transform duration-300 group-hover:scale-110"
                                            />
                                            {/* Overlay */}
                                            <div className={`absolute inset-0 bg-gradient-to-t from-black/70 to-transparent transition-opacity duration-300 ${habitacionActiva.id === habitacion.id ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                                                }`}>
                                                <div className="absolute bottom-0 left-0 right-0 p-2">
                                                    <p className="text-white font-bold text-xs">{habitacion.nombre}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* B. Sección de Detalles Activos */}
                        <div className="lg:col-span-2">
                            <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 shadow-lg border border-gray-100 h-full flex flex-col">
                                {/* Imagen Destacada */}
                                <div className="relative aspect-video rounded-xl overflow-hidden mb-6 shadow-md flex-shrink-0">
                                    <Image
                                        src={habitacionActiva.imagenPrincipal}
                                        alt={habitacionActiva.nombre}
                                        fill
                                        className="object-cover"
                                        priority
                                    />
                                </div>

                                {/* Título */}
                                <h3 className="text-3xl font-bold text-gray-900 mb-4">
                                    {habitacionActiva.nombre}
                                </h3>

                                {/* Descripción */}
                                <p className="text-lg text-gray-600 leading-relaxed mb-6">
                                    {habitacionActiva.descripcion}
                                </p>

                                {/* Amenidades Clave */}
                                <div className="mb-8 flex-grow">
                                    <h4 className="text-lg font-bold text-gray-900 mb-4">Amenidades Destacadas:</h4>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                        {habitacionActiva.amenidades.map((amenidad, index) => (
                                            <div key={index} className="flex items-center gap-2">
                                                <div className="flex-shrink-0 w-6 h-6 bg-amber-500 rounded-full flex items-center justify-center">
                                                    <Check className="w-4 h-4 text-white" />
                                                </div>
                                                <span className="text-gray-700 font-medium">{amenidad}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* CTA Button */}
                                <div className="mt-auto">
                                    <Link
                                        href="/habitaciones"
                                        className="inline-flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold py-4 px-8 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1"
                                    >
                                        VER TARIFAS Y RESERVAR
                                        <ArrowRight className="w-5 h-5" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* CTA Secundario - Ver Todas */}
                <div className="text-center mt-12">
                    <Link
                        href="/habitaciones"
                        className="inline-flex items-center gap-2 text-gray-600 hover:text-amber-600 font-semibold transition-colors"
                    >
                        Ver todas las habitaciones y comparar
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </div>
        </section>
    );
};
