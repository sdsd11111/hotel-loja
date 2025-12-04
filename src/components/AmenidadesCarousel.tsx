'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import {
    Wifi,
    Car,
    UtensilsCrossed,
    Bell,
    Waves,
    Users,
    Coffee,
    Shield,
    ChevronLeft,
    ChevronRight,
    ArrowRight
} from 'lucide-react';

// Amenidades data
const amenidades = [
    {
        id: 1,
        name: 'Internet de Alta Velocidad',
        icon: <Wifi className="w-12 h-12 text-amber-500" />,
        description: 'WiFi de fibra óptica en todas las áreas'
    },
    {
        id: 2,
        name: 'Parqueadero Privado',
        icon: <Car className="w-12 h-12 text-amber-500" />,
        description: 'Estacionamiento seguro y gratuito'
    },
    {
        id: 3,
        name: 'Restaurante Gourmet',
        icon: <UtensilsCrossed className="w-12 h-12 text-amber-500" />,
        description: 'Cocina fusión de alta calidad'
    },
    {
        id: 4,
        name: 'Servicio a la Habitación',
        icon: <Bell className="w-12 h-12 text-amber-500" />,
        description: 'Disponible 24/7 para su comodidad'
    },
    {
        id: 5,
        name: 'Piscina y Spa',
        icon: <Waves className="w-12 h-12 text-amber-500" />,
        description: 'Piscina climatizada y tratamientos'
    },
    {
        id: 6,
        name: 'Salas de Eventos',
        icon: <Users className="w-12 h-12 text-amber-500" />,
        description: 'Espacios para reuniones corporativas'
    },
    {
        id: 7,
        name: 'Desayuno Incluido',
        icon: <Coffee className="w-12 h-12 text-amber-500" />,
        description: 'Buffet completo cada mañana'
    },
    {
        id: 8,
        name: 'Seguridad 24/7',
        icon: <Shield className="w-12 h-12 text-amber-500" />,
        description: 'Vigilancia y protección constante'
    }
];

export const AmenidadesCarousel = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
    const [itemsPerView, setItemsPerView] = useState(4);
    const carouselRef = useRef<HTMLDivElement>(null);

    // Responsive items per view
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 640) {
                setItemsPerView(1);
            } else if (window.innerWidth < 768) {
                setItemsPerView(2);
            } else if (window.innerWidth < 1024) {
                setItemsPerView(3);
            } else {
                setItemsPerView(4);
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Auto-play carousel
    useEffect(() => {
        if (isHovered) return;

        const interval = setInterval(() => {
            setCurrentIndex((prev) => {
                const maxIndex = amenidades.length - itemsPerView;
                return prev >= maxIndex ? 0 : prev + 1;
            });
        }, 4500);

        return () => clearInterval(interval);
    }, [isHovered, itemsPerView]);

    const goToSlide = (index: number) => {
        const maxIndex = amenidades.length - itemsPerView;
        setCurrentIndex(Math.min(index, maxIndex));
    };

    const goToPrevious = () => {
        setCurrentIndex((prev) => (prev === 0 ? amenidades.length - itemsPerView : prev - 1));
    };

    const goToNext = () => {
        const maxIndex = amenidades.length - itemsPerView;
        setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    };

    const totalDots = amenidades.length - itemsPerView + 1;

    return (
        <section className="py-20 bg-gradient-to-b from-white to-gray-50">
            <div className="container mx-auto px-4">
                {/* Section Title */}
                <div className="text-center mb-12 max-w-3xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        Comodidad y Servicio Premium: <span className="text-amber-500">Amenidades que Marcan la Diferencia.</span>
                    </h2>
                    <p className="text-lg text-gray-600 leading-relaxed">
                        Su confort es nuestra prioridad. Disfrute de servicios esenciales diseñados para una estadía placentera en el corazón de Cuenca.
                    </p>
                    <div className="w-24 h-1 bg-amber-400 mx-auto rounded-full mt-6"></div>
                </div>

                {/* Carousel Container */}
                <div
                    className="relative max-w-6xl mx-auto"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    {/* Navigation Arrows */}
                    <button
                        onClick={goToPrevious}
                        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-white hover:bg-gray-100 text-gray-800 p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 hidden md:block"
                        aria-label="Anterior"
                    >
                        <ChevronLeft className="w-6 h-6" />
                    </button>

                    <button
                        onClick={goToNext}
                        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-white hover:bg-gray-100 text-gray-800 p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 hidden md:block"
                        aria-label="Siguiente"
                    >
                        <ChevronRight className="w-6 h-6" />
                    </button>

                    {/* Carousel Track */}
                    <div className="overflow-hidden" ref={carouselRef}>
                        <div
                            className="flex transition-transform duration-700 ease-in-out"
                            style={{
                                transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`
                            }}
                        >
                            {amenidades.map((amenidad) => (
                                <div
                                    key={amenidad.id}
                                    className="flex-shrink-0 px-3"
                                    style={{ width: `${100 / itemsPerView}%` }}
                                >
                                    <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 h-full flex flex-col items-center text-center">
                                        {/* Icon */}
                                        <div className="mb-4 transform transition-transform duration-300 hover:scale-110">
                                            {amenidad.icon}
                                        </div>

                                        {/* Name */}
                                        <h3 className="text-lg font-bold text-gray-900 mb-2">
                                            {amenidad.name}
                                        </h3>

                                        {/* Description */}
                                        <p className="text-sm text-gray-600">
                                            {amenidad.description}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Dots Navigation */}
                    <div className="flex justify-center gap-2 mt-8">
                        {[...Array(totalDots)].map((_, index) => (
                            <button
                                key={index}
                                onClick={() => goToSlide(index)}
                                className={`transition-all duration-300 rounded-full ${index === currentIndex
                                    ? 'bg-amber-500 w-8 h-3'
                                    : 'bg-gray-300 hover:bg-gray-400 w-3 h-3'
                                    }`}
                                aria-label={`Ir a grupo ${index + 1}`}
                            />
                        ))}
                    </div>
                </div>

                {/* CTA Button */}
                <div className="text-center mt-12">
                    <Link
                        href="/servicios"
                        className="inline-flex items-center gap-2 bg-gray-900 hover:bg-gray-800 text-white font-bold py-4 px-8 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1"
                    >
                        VER TODOS LOS SERVICIOS
                        <ArrowRight className="w-5 h-5" />
                    </Link>
                </div>
            </div>
        </section>
    );
};
