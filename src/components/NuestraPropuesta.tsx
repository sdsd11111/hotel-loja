'use client';

import React, { useState } from 'react';
import { MapPin, Zap, ShieldCheck, ChevronDown, ChevronUp } from 'lucide-react';
import Image from 'next/image';

export const NuestraPropuesta = () => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
                {/* Header Section */}
                <div className="max-w-4xl mx-auto text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
                        Su Experiencia en Cuenca Comienza Aquí: <br className="hidden md:block" />
                        <span className="text-blue-600">Plataforma de Alto Rendimiento y Confianza Total.</span>
                    </h2>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Left Column: Narrative & Pillars */}
                    <div className="space-y-8">
                        {/* Central Narrative */}
                        <div className="prose prose-lg text-gray-600">
                            <p className="leading-relaxed inline">
                                En el corazón de Cuenca, Ecuador, nuestro hotel no es solo un destino, sino el punto de partida estratégico ideal para explorar la riqueza natural y cultural de la región.
                                <span className={`${isExpanded ? 'inline' : 'hidden'} md:inline`}>
                                    {' '}Hemos diseñado nuestra plataforma digital, bajo la arquitectura de Next.js, no como un simple catálogo, sino como una herramienta de conversión superior.
                                </span>
                            </p>

                            <div className={`${isExpanded ? 'block' : 'hidden'} md:block`}>
                                <p className="leading-relaxed mt-4 font-medium text-gray-800">
                                    Nuestro objetivo es simple: garantizarle una Experiencia de Usuario (UX) excepcional, la Mejor Tarifa y la Máxima Seguridad al reservar directamente con nosotros.
                                </p>
                            </div>

                            {/* Mobile Toggle Button */}
                            <button
                                onClick={() => setIsExpanded(!isExpanded)}
                                className="md:hidden flex items-center gap-1 text-blue-600 font-bold mt-2 hover:text-blue-800 transition-colors"
                            >
                                {isExpanded ? (
                                    <>
                                        Ocultar <ChevronUp className="w-4 h-4" />
                                    </>
                                ) : (
                                    <>
                                        Seguir leyendo <ChevronDown className="w-4 h-4" />
                                    </>
                                )}
                            </button>
                        </div>

                        {/* Three Pillars of Value */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                            {/* Pillar 1 */}
                            <div className="flex flex-col items-start p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100">
                                <div className="p-3 bg-blue-50 rounded-lg mb-4">
                                    <MapPin className="w-6 h-6 text-blue-600" />
                                </div>
                                <h3 className="text-lg font-bold text-gray-900 mb-2">Enfoque Geocéntrico</h3>
                                <p className="text-sm text-gray-600">
                                    Explore Cuenca con Nosotros. Ubicación estratégica para su aventura.
                                </p>
                            </div>

                            {/* Pillar 2 */}
                            <div className="flex flex-col items-start p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100">
                                <div className="p-3 bg-yellow-50 rounded-lg mb-4">
                                    <Zap className="w-6 h-6 text-yellow-500" />
                                </div>
                                <h3 className="text-lg font-bold text-gray-900 mb-2">Rendimiento Superior</h3>
                                <p className="text-sm text-gray-600">
                                    Velocidad ultrarrápida y diseño intuitivo para reservar en segundos.
                                </p>
                            </div>

                            {/* Pillar 3 */}
                            <div className="flex flex-col items-start p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100">
                                <div className="p-3 bg-green-50 rounded-lg mb-4">
                                    <ShieldCheck className="w-6 h-6 text-green-600" />
                                </div>
                                <h3 className="text-lg font-bold text-gray-900 mb-2">Confianza y Legalidad</h3>
                                <p className="text-sm text-gray-600">
                                    Reserva segura, directa y con cumplimiento legal garantizado.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Visual Component */}
                    <div className="relative h-[500px] w-full rounded-2xl overflow-hidden shadow-2xl group">
                        <Image
                            src="/images/home/propuesta-valor.webp"
                            alt="Esencia del Hotel Puente Roto"
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />

                        {/* Overlay Gradient */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent pointer-events-none"></div>
                    </div>
                </div>
            </div>
        </section>
    );
};
