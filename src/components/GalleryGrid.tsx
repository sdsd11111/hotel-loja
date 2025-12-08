'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { X, ZoomIn, ChevronLeft, ChevronRight } from 'lucide-react';

// Categories
const categories = [
    { id: 'all', label: 'Todos' },
    { id: 'habitaciones', label: 'Habitaciones y Suites' },
    { id: 'amenidades', label: 'Amenidades' },
    { id: 'gastronomia', label: 'Gastronomía' },
    { id: 'eventos', label: 'Eventos y Salones' },
    { id: 'destino', label: 'Destino (Cuenca)' },
];

// Real Gallery Images
const galleryImages = [
    // Habitaciones
    { id: 1, src: '/images/habitaciones/suite-ejecutiva-main.webp', alt: 'Suite Ejecutiva', category: 'habitaciones', width: 800, height: 600 },
    { id: 2, src: '/images/habitaciones/suite-presidencial-main.webp', alt: 'Suite Presidencial', category: 'habitaciones', width: 800, height: 600 },
    { id: 3, src: '/images/habitaciones/suite-premium-deluxe-main.webp', alt: 'Suite Premium Deluxe', category: 'habitaciones', width: 800, height: 600 },
    { id: 4, src: '/images/habitaciones/junior-suite-elegance-main.webp', alt: 'Junior Suite Elegance', category: 'habitaciones', width: 800, height: 600 },
    { id: 5, src: '/images/habitaciones/doble-familiar-main.webp', alt: 'Habitación Doble Familiar', category: 'habitaciones', width: 800, height: 600 },

    // Gastronomía
    { id: 6, src: '/images/restaurante/fusion.webp', alt: 'Cocina Fusión de Autor', category: 'gastronomia', width: 1200, height: 600 },
    { id: 7, src: '/images/restaurante/galeria-plato-estrella.webp', alt: 'Plato Estrella Gourmet', category: 'gastronomia', width: 600, height: 400 },
    { id: 8, src: '/images/restaurante/galeria-ambiente-interior.webp', alt: 'Ambiente Elegante Restaurante', category: 'gastronomia', width: 600, height: 400 },
    { id: 9, src: '/images/restaurante/bar.webp', alt: 'Bar & Mixología', category: 'gastronomia', width: 1200, height: 600 },

    // Amenidades
    { id: 10, src: '/images/piscinas/hero-piscina-spa.webp', alt: 'Piscina Panorámica Climatizada', category: 'amenidades', width: 1920, height: 1200 },
    { id: 11, src: '/images/piscinas/galeria-spa-masajes.webp', alt: 'Spa & Masajes Relajantes', category: 'amenidades', width: 600, height: 400 },
    { id: 12, src: '/images/piscinas/galeria-jacuzzi.webp', alt: 'Jacuzzi de Hidromasaje', category: 'amenidades', width: 600, height: 400 },
    { id: 13, src: '/images/servicios/amenidades-1.webp', alt: 'Amenidades y Servicios', category: 'amenidades', width: 800, height: 600 },

    // Eventos
    { id: 14, src: '/images/eventos/hero-eventos.webp', alt: 'Salón de Eventos Principal', category: 'eventos', width: 1920, height: 1200 },
    { id: 15, src: '/images/eventos/sala-podocarpus.webp', alt: 'Sala de Conferencias Podocarpus', category: 'eventos', width: 1200, height: 600 },
    { id: 16, src: '/images/eventos/galeria-teatro.webp', alt: 'Auditorio Tipo Teatro', category: 'eventos', width: 600, height: 400 },

    // Destino
    { id: 17, src: '/images/tours/hero-tours.webp', alt: 'Paisajes de Cuenca', category: 'destino', width: 1920, height: 1200 },
    { id: 18, src: '/images/tours/tour-podocarpus.webp', alt: 'Parque Nacional Cajas', category: 'destino', width: 800, height: 600 },
    { id: 19, src: '/images/tours/tour-villonaco.webp', alt: 'Mirador del Turi', category: 'destino', width: 800, height: 600 },
    { id: 20, src: '/images/tours/tour-loja-historica.webp', alt: 'Centro Histórico de Cuenca', category: 'destino', width: 800, height: 600 },
];

export const GalleryGrid = () => {
    const [filter, setFilter] = useState('all');
    const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
    const [isAnimating, setIsAnimating] = useState(false);

    const filteredImages = filter === 'all'
        ? galleryImages
        : galleryImages.filter(img => img.category === filter);

    // Handle filter change with animation
    const handleFilterChange = (newFilter: string) => {
        if (newFilter === filter) return;

        setIsAnimating(true);

        // Wait for fade-out animation
        setTimeout(() => {
            setFilter(newFilter);
            setIsAnimating(false);
        }, 300);
    };

    // Handle Lightbox Navigation
    const handlePrev = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (selectedImageIndex !== null) {
            setSelectedImageIndex((prev) => (prev === 0 ? filteredImages.length - 1 : prev! - 1));
        }
    };

    const handleNext = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (selectedImageIndex !== null) {
            setSelectedImageIndex((prev) => (prev === filteredImages.length - 1 ? 0 : prev! + 1));
        }
    };

    const selectedImage = selectedImageIndex !== null ? filteredImages[selectedImageIndex] : null;

    return (
        <div className="w-full">
            {/* Filters */}
            <div className="flex flex-wrap justify-center gap-3 mb-10">
                {categories.map((cat) => (
                    <button
                        key={cat.id}
                        onClick={() => handleFilterChange(cat.id)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${filter === cat.id
                            ? 'bg-blue-600 text-white shadow-md transform scale-105'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                    >
                        {cat.label}
                    </button>
                ))}
            </div>

            {/* Masonry Grid with Animation */}
            <div
                className={`columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4 transition-opacity duration-300 ${isAnimating ? 'opacity-0' : 'opacity-100'
                    }`}
            >
                {filteredImages.map((image, index) => (
                    <div
                        key={image.id}
                        className="break-inside-avoid group relative rounded-xl overflow-hidden cursor-pointer bg-gray-200"
                        onClick={() => setSelectedImageIndex(index)}
                    >
                        <div className="relative w-full">
                            <div className={`w-full bg-gray-300 flex items-center justify-center text-gray-500 text-xs min-h-[200px] ${image.height > image.width ? 'aspect-[3/4]' : 'aspect-[4/3]'}`}>
                                <span className="sr-only">{image.alt}</span>
                                <Image
                                    src={image.src}
                                    alt={image.alt}
                                    width={image.width}
                                    height={image.height}
                                    className="w-full h-auto object-cover transform group-hover:scale-110 transition-transform duration-500"
                                    loading="lazy"
                                />
                            </div>
                        </div>

                        {/* Hover Overlay */}
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                            <ZoomIn className="text-white w-8 h-8" />
                        </div>

                        {/* Caption on Hover */}
                        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <p className="text-white text-sm font-medium truncate">{image.alt}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Lightbox Modal */}
            {selectedImage && (
                <div
                    className="fixed inset-0 z-[60] bg-black/95 flex items-center justify-center p-4 backdrop-blur-sm"
                    onClick={() => setSelectedImageIndex(null)}
                >
                    <button
                        className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors p-2"
                        onClick={() => setSelectedImageIndex(null)}
                    >
                        <X className="w-8 h-8" />
                    </button>

                    <button
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors p-2 bg-black/20 hover:bg-black/40 rounded-full"
                        onClick={handlePrev}
                    >
                        <ChevronLeft className="w-8 h-8" />
                    </button>

                    <button
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors p-2 bg-black/20 hover:bg-black/40 rounded-full"
                        onClick={handleNext}
                    >
                        <ChevronRight className="w-8 h-8" />
                    </button>

                    <div
                        className="relative max-w-5xl max-h-[90vh] w-full h-full flex flex-col items-center justify-center"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="relative w-full h-full flex items-center justify-center">
                            <Image
                                src={selectedImage.src}
                                alt={selectedImage.alt}
                                width={selectedImage.width}
                                height={selectedImage.height}
                                className="max-w-full max-h-[85vh] object-contain shadow-2xl rounded-sm"
                                priority
                            />
                        </div>
                        <div className="mt-4 text-center">
                            <p className="text-white text-lg font-medium">{selectedImage.alt}</p>
                            <p className="text-gray-400 text-sm capitalize">{categories.find(c => c.id === selectedImage.category)?.label}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
