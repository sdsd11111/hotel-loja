'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Clock, DollarSign, ArrowRight, UtensilsCrossed } from 'lucide-react';

// Tipos de ofertas
type OfertaId = 'fusion' | 'ejecutivo' | 'bar';

// Ofertas gastronómicas
const ofertasGastronomicas = [
    {
        id: 'fusion' as OfertaId,
        nombre: 'Cocina Fusión (Cena)',
        descripcion: 'Platos de autor que combinan ingredientes andinos locales con técnicas de alta cocina internacional. Perfecto para cenas románticas y celebraciones.',
        horario: '19:00 - 22:30',
        precio: null,
        especialidad: 'Platos de Autor',
        imagen: '/images/restaurante/fusion.webp',
        icono: <UtensilsCrossed className="w-6 h-6" />
    },
    {
        id: 'ejecutivo' as OfertaId,
        nombre: 'Almuerzo Ejecutivo',
        descripcion: 'Una opción rápida, nutritiva y elegante. Menús diarios que cambian y que garantizan calidad y eficiencia para el cliente de negocios.',
        horario: '12:30 - 15:00',
        precio: 'Desde $15 USD',
        especialidad: 'Menú del Día',
        imagen: '/images/restaurante/ejecutivo.webp',
        icono: <Clock className="w-6 h-6" />
    },
    {
        id: 'bar' as OfertaId,
        nombre: 'Bar & Coctelería',
        descripcion: 'Un ambiente moderno e informal para disfrutar de cocteles clásicos y creaciones de autor, con la mejor vista de Cuenca.',
        horario: '17:00 - 23:00',
        precio: null,
        especialidad: 'Cóctel "Cajas Sunset"',
        imagen: '/images/restaurante/bar.webp',
        icono: <DollarSign className="w-6 h-6" />
    }
];

export const RestauranteHome = () => {
    const [ofertaActiva, setOfertaActiva] = useState<OfertaId>('fusion');

    const ofertaSeleccionada = ofertasGastronomicas.find(o => o.id === ofertaActiva) || ofertasGastronomicas[0];

    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-4">
                {/* Section Title */}
                <div className="text-center mb-12 max-w-3xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        Experiencia Gastronómica: <span className="text-amber-500">El Sabor de Cuenca con Clase Premium.</span>
                    </h2>
                    <p className="text-lg text-gray-600 leading-relaxed">
                        Nuestro compromiso con la excelencia se extiende a la mesa. Descubra nuestros tres pilares culinarios y reserve su mesa directamente.
                    </p>
                    <div className="w-24 h-1 bg-amber-400 mx-auto rounded-full mt-6"></div>
                </div>

                {/* Main Layout */}
                <div className="max-w-6xl mx-auto">
                    {/* A. Tabs/Controles */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                        {ofertasGastronomicas.map((oferta) => (
                            <button
                                key={oferta.id}
                                onClick={() => setOfertaActiva(oferta.id)}
                                className={`flex items-center justify-center gap-3 px-6 py-4 rounded-lg font-bold text-base transition-all duration-300 ${ofertaActiva === oferta.id
                                    ? 'bg-amber-500 text-white shadow-lg scale-105'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                            >
                                {oferta.icono}
                                <span>{oferta.nombre}</span>
                            </button>
                        ))}
                    </div>

                    {/* B. Sección de Detalles Activos */}
                    <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl overflow-hidden shadow-xl border border-gray-100">
                        {/* Imagen Destacada */}
                        <div className="relative aspect-[2/1] w-full">
                            <Image
                                src={ofertaSeleccionada.imagen}
                                alt={ofertaSeleccionada.nombre}
                                fill
                                className="object-cover"
                                priority
                            />
                            {/* Overlay con gradiente */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>

                            {/* Título sobre la imagen */}
                            <div className="absolute bottom-0 left-0 right-0 p-8">
                                <h3 className="text-4xl font-bold text-white mb-2">
                                    {ofertaSeleccionada.nombre}
                                </h3>
                            </div>
                        </div>

                        {/* Contenido de Detalles */}
                        <div className="p-8">
                            {/* Descripción */}
                            <p className="text-lg text-gray-700 leading-relaxed mb-6">
                                {ofertaSeleccionada.descripcion}
                            </p>

                            {/* Datos Clave */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                                {/* Horario */}
                                <div className="flex items-start gap-3 p-4 bg-white rounded-lg border border-gray-200">
                                    <div className="flex-shrink-0 w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
                                        <Clock className="w-5 h-5 text-amber-600" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold text-gray-500 mb-1">Horario</p>
                                        <p className="text-base font-bold text-gray-900">{ofertaSeleccionada.horario}</p>
                                    </div>
                                </div>

                                {/* Precio (si existe) */}
                                {ofertaSeleccionada.precio && (
                                    <div className="flex items-start gap-3 p-4 bg-white rounded-lg border border-gray-200">
                                        <div className="flex-shrink-0 w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                                            <DollarSign className="w-5 h-5 text-green-600" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-semibold text-gray-500 mb-1">Precio</p>
                                            <p className="text-base font-bold text-gray-900">{ofertaSeleccionada.precio}</p>
                                        </div>
                                    </div>
                                )}

                                {/* Especialidad */}
                                <div className="flex items-start gap-3 p-4 bg-white rounded-lg border border-gray-200">
                                    <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                                        <UtensilsCrossed className="w-5 h-5 text-blue-600" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold text-gray-500 mb-1">Especialidad</p>
                                        <p className="text-base font-bold text-gray-900">{ofertaSeleccionada.especialidad}</p>
                                    </div>
                                </div>
                            </div>

                            {/* CTA Button */}
                            <div className="text-center">
                                <Link
                                    href="/contacto?motivo=reservas&mensaje=Me%20gustaría%20reservar%20una%20mesa%20en%20el%20restaurante"
                                    className="inline-flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold py-4 px-8 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1"
                                >
                                    RESERVAR MESA AHORA
                                    <ArrowRight className="w-5 h-5" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                {/* CTA Secundario */}
                <div className="text-center mt-8">
                    <Link
                        href="/servicios/restaurante"
                        className="inline-flex items-center gap-2 text-gray-600 hover:text-amber-600 font-semibold transition-colors"
                    >
                        Ver menú completo y más información
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </div>
        </section>
    );
};
