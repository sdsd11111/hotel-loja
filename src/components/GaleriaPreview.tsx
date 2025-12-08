'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';

// Tipos de categorías
type Categoria = 'TODAS' | 'HABITACIONES' | 'ESPACIOS' | 'RESTAURANTES' | 'SALONES';

// Galería de imágenes preview
const galeriaImagenes = [
    {
        id: 1,
        categoria: 'HABITACIONES' as const,
        url: '/images/galeria/galeria-1.webp',
        alt: 'Suite Premium con cama king size'
    },
    {
        id: 2,
        categoria: 'HABITACIONES' as const,
        url: '/images/galeria/galeria-2.webp',
        alt: 'Habitación doble familiar'
    },
    {
        id: 3,
        categoria: 'HABITACIONES' as const,
        url: '/images/galeria/galeria-3.webp',
        alt: 'Suite ejecutiva moderna'
    },
    {
        id: 4,
        categoria: 'ESPACIOS' as const,
        url: '/images/galeria/galeria-4.webp',
        alt: 'Piscina climatizada del hotel'
    },
    {
        id: 5,
        categoria: 'ESPACIOS' as const,
        url: '/images/galeria/galeria-5.webp',
        alt: 'Área de spa y relajación'
    },
    {
        id: 6,
        categoria: 'ESPACIOS' as const,
        url: '/images/galeria/galeria-6.webp',
        alt: 'Lobby principal del hotel'
    },
    {
        id: 7,
        categoria: 'RESTAURANTES' as const,
        url: '/images/galeria/galeria-7.webp',
        alt: 'Restaurante gourmet del hotel'
    },
    {
        id: 8,
        categoria: 'RESTAURANTES' as const,
        url: '/images/galeria/galeria-8.webp',
        alt: 'Platos gourmet de nuestro chef'
    },
    {
        id: 9,
        categoria: 'SALONES' as const,
        url: '/images/galeria/galeria-9.webp',
        alt: 'Salón de eventos corporativos'
    },
    {
        id: 10,
        categoria: 'SALONES' as const,
        url: '/images/galeria/galeria-10.webp',
        alt: 'Sala de reuniones ejecutivas'
    }
];

const categorias: Categoria[] = ['TODAS', 'ESPACIOS', 'HABITACIONES', 'RESTAURANTES', 'SALONES'];

export const GaleriaPreview = () => {
    const [categoriaActiva, setCategoriaActiva] = useState<Categoria>('TODAS');
    const [imagenSeleccionada, setImagenSeleccionada] = useState<number | null>(null);
    const [isAnimating, setIsAnimating] = useState(false);

    // Filtrar imágenes según categoría
    const imagenesFiltradas = categoriaActiva === 'TODAS'
        ? galeriaImagenes
        : galeriaImagenes.filter(img => img.categoria === categoriaActiva);

    // Handle category change with animation
    const handleCategoryChange = (newCategory: Categoria) => {
        if (newCategory === categoriaActiva) return;

        setIsAnimating(true);

        // Wait for fade-out animation
        setTimeout(() => {
            setCategoriaActiva(newCategory);
            setIsAnimating(false);
        }, 300);
    };

    // Navegación del lightbox
    const handlePrevImage = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (imagenSeleccionada !== null) {
            const currentIndex = imagenesFiltradas.findIndex(img => img.id === imagenSeleccionada);
            const prevIndex = currentIndex === 0 ? imagenesFiltradas.length - 1 : currentIndex - 1;
            setImagenSeleccionada(imagenesFiltradas[prevIndex].id);
        }
    };

    const handleNextImage = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (imagenSeleccionada !== null) {
            const currentIndex = imagenesFiltradas.findIndex(img => img.id === imagenSeleccionada);
            const nextIndex = currentIndex === imagenesFiltradas.length - 1 ? 0 : currentIndex + 1;
            setImagenSeleccionada(imagenesFiltradas[nextIndex].id);
        }
    };

    const closeLightbox = () => {
        setImagenSeleccionada(null);
    };

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (imagenSeleccionada === null) return;

            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowLeft') handlePrevImage(e as any);
            if (e.key === 'ArrowRight') handleNextImage(e as any);
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [imagenSeleccionada]);

    const imagenActual = imagenesFiltradas.find(img => img.id === imagenSeleccionada);

    return (
        <section className="py-20 bg-gradient-to-br from-slate-50 via-amber-50/30 to-slate-50 relative overflow-hidden">
            {/* Decorative background elements */}
            <div className="absolute top-0 left-0 w-96 h-96 bg-amber-200/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>

            <div className="container mx-auto px-4 relative z-10">
                {/* Section Title */}
                <div className="text-center mb-16 max-w-4xl mx-auto">
                    <div className="inline-block mb-4">
                        <span className="text-amber-600 font-semibold text-sm uppercase tracking-wider bg-amber-100 px-4 py-2 rounded-full">
                            Galería Premium
                        </span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                        Momentos en Hotel Puente Roto: <br />
                        <span className="bg-gradient-to-r from-amber-600 to-yellow-500 bg-clip-text text-transparent">
                            Un Vistazo a Nuestra Experiencia Premium
                        </span>
                    </h2>
                    <p className="text-xl text-gray-600 leading-relaxed">
                        Cada detalle cuenta. Explore una selección de las mejores imágenes de nuestras instalaciones y la belleza que rodea a nuestro hotel en Cuenca.
                    </p>
                    <div className="flex items-center justify-center gap-2 mt-6">
                        <div className="w-12 h-1 bg-gradient-to-r from-transparent to-amber-400 rounded-full"></div>
                        <div className="w-24 h-1.5 bg-gradient-to-r from-amber-400 to-yellow-500 rounded-full"></div>
                        <div className="w-12 h-1 bg-gradient-to-r from-yellow-500 to-transparent rounded-full"></div>
                    </div>
                </div>

                {/* Filtros de Categorías */}
                <div className="flex flex-wrap justify-center gap-4 mb-16">
                    {categorias.map((categoria) => (
                        <button
                            key={categoria}
                            onClick={() => handleCategoryChange(categoria)}
                            className={`px-8 py-3.5 rounded-full font-bold text-sm uppercase tracking-wider transition-all duration-300 transform ${categoriaActiva === categoria
                                ? 'bg-gradient-to-r from-amber-500 to-yellow-500 text-white shadow-xl shadow-amber-500/30 scale-105'
                                : 'bg-white/80 backdrop-blur-sm text-gray-700 hover:bg-white hover:shadow-lg border border-gray-200/50 hover:border-amber-300 hover:scale-105'
                                }`}
                        >
                            {categoria === 'TODAS' ? '✨ MOSTRAR TODAS' : categoria}
                        </button>
                    ))}
                </div>

                {/* Cuadrícula de Imágenes */}
                <div className="max-w-6xl mx-auto">
                    <div
                        className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 transition-opacity duration-300 ${isAnimating ? 'opacity-0' : 'opacity-100'
                            }`}
                    >
                        {imagenesFiltradas.map((imagen) => (
                            <button
                                key={imagen.id}
                                onClick={() => setImagenSeleccionada(imagen.id)}
                                className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 focus:outline-none focus:ring-4 focus:ring-amber-400/50"
                            >
                                <div className="relative aspect-[4/3]">
                                    <Image
                                        src={imagen.url}
                                        alt={imagen.alt}
                                        fill
                                        loading="lazy"
                                        className="object-cover transition-transform duration-700 group-hover:scale-125"
                                    />
                                    {/* Gradient Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"></div>

                                    {/* Zoom Icon */}
                                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                                        <div className="bg-white/20 backdrop-blur-md rounded-full p-4 transform scale-75 group-hover:scale-100 transition-transform duration-500">
                                            <ZoomIn className="w-8 h-8 text-white" />
                                        </div>
                                    </div>

                                    {/* Category Badge */}
                                    <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                                        <span className="inline-block bg-gradient-to-r from-amber-500 to-yellow-500 text-white font-bold text-xs px-4 py-2 rounded-full shadow-lg">
                                            {imagen.categoria}
                                        </span>
                                    </div>
                                </div>
                            </button>
                        ))}
                    </div>

                    {/* Mensaje si no hay resultados */}
                    {imagenesFiltradas.length === 0 && (
                        <div className="text-center py-16">
                            <p className="text-gray-500 text-xl">No hay imágenes en esta categoría</p>
                        </div>
                    )}
                </div>

                {/* CTA Button */}
                <div className="text-center mt-16">
                    <Link
                        href="/galeria"
                        className="inline-flex items-center gap-3 bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white font-bold py-5 px-10 rounded-full transition-all duration-300 shadow-2xl shadow-amber-500/40 hover:shadow-amber-500/60 hover:-translate-y-1 transform group"
                    >
                        VER GALERÍA COMPLETA
                        <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" />
                    </Link>
                </div>
            </div>

            {/* Lightbox Modal */}
            {imagenActual && (
                <div
                    className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn"
                    onClick={closeLightbox}
                >
                    {/* Close Button */}
                    <button
                        className="absolute top-6 right-6 text-white/80 hover:text-white transition-colors p-3 bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-md z-10"
                        onClick={closeLightbox}
                        aria-label="Cerrar"
                    >
                        <X className="w-8 h-8" />
                    </button>

                    {/* Previous Button */}
                    <button
                        className="absolute left-6 top-1/2 -translate-y-1/2 text-white/80 hover:text-white transition-all p-4 bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-md hover:scale-110 z-10"
                        onClick={handlePrevImage}
                        aria-label="Imagen anterior"
                    >
                        <ChevronLeft className="w-8 h-8" />
                    </button>

                    {/* Next Button */}
                    <button
                        className="absolute right-6 top-1/2 -translate-y-1/2 text-white/80 hover:text-white transition-all p-4 bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-md hover:scale-110 z-10"
                        onClick={handleNextImage}
                        aria-label="Siguiente imagen"
                    >
                        <ChevronRight className="w-8 h-8" />
                    </button>

                    {/* Image Container */}
                    <div
                        className="relative max-w-7xl max-h-[90vh] w-full h-full flex flex-col items-center justify-center"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="relative w-full h-full flex items-center justify-center">
                            <Image
                                src={imagenActual.url}
                                alt={imagenActual.alt}
                                width={1920}
                                height={1080}
                                className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl"
                                priority
                            />
                        </div>

                        {/* Image Info */}
                        <div className="mt-6 text-center bg-white/10 backdrop-blur-md rounded-2xl px-8 py-4">
                            <p className="text-white text-xl font-semibold mb-1">{imagenActual.alt}</p>
                            <p className="text-amber-400 text-sm font-medium uppercase tracking-wider">
                                {imagenActual.categoria}
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};
