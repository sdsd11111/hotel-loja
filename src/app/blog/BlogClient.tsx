'use client';

import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, Calendar, User, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

type Article = {
    id: string;
    slug: string;
    titulo: string;
    extracto: string;
    imagen_url: string;
    autor: string;
    categoria: string;
    fecha_publicacion: string;
    contenido: string; // Needed for search
};

export default function BlogClient({ initialArticles }: { initialArticles: Article[] }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('Todas');
    const [currentSlide, setCurrentSlide] = useState(0);

    // Extract unique categories
    const categories = useMemo(() => {
        const cats = new Set(initialArticles.map(a => a.categoria).filter(Boolean));
        return ['Todas', ...Array.from(cats)];
    }, [initialArticles]);

    // Filter articles
    const filteredArticles = useMemo(() => {
        return initialArticles.filter(article => {
            const matchesSearch = (
                article.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                article.contenido?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                article.extracto?.toLowerCase().includes(searchTerm.toLowerCase())
            );
            const matchesCategory = selectedCategory === 'Todas' || article.categoria === selectedCategory;
            return matchesSearch && matchesCategory;
        });
    }, [initialArticles, searchTerm, selectedCategory]);

    // Recent Articles (Sorted by date DESC, take 3)
    const recentArticles = useMemo(() => {
        return [...initialArticles]
            .sort((a, b) => new Date(b.fecha_publicacion).getTime() - new Date(a.fecha_publicacion).getTime())
            .slice(0, 3);
    }, [initialArticles]);

    // Auto-slide logic
    useEffect(() => {
        if (recentArticles.length <= 1) return;
        const interval = setInterval(() => {
            setCurrentSlide(prev => (prev + 1) % recentArticles.length);
        }, 5000); // 5 seconds
        return () => clearInterval(interval);
    }, [recentArticles.length]);

    const nextSlide = () => setCurrentSlide(prev => (prev + 1) % recentArticles.length);
    const prevSlide = () => setCurrentSlide(prev => (prev - 1 + recentArticles.length) % recentArticles.length);

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
            <Header />

            {/* HERO SECTION (70vh) */}
            <section className="relative h-[70vh] flex items-center justify-center overflow-hidden bg-gray-900">
                {/* Background (Gradient or Image if you prefer) */}
                <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 z-0"></div>

                {/* Optional: Add a subtle pattern or overlay image */}
                <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] z-0"></div>

                <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
                    <span className="text-amber-500 font-bold tracking-[0.2em] text-sm uppercase mb-6 block animate-fade-in-up">
                        Explora Nuestro Contenido
                    </span>
                    <h1 className="text-5xl md:text-7xl font-playfair font-bold text-white mb-8 leading-tight animate-fade-in-up delay-100">
                        Blog & Novedades
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto font-light leading-relaxed animate-fade-in-up delay-200">
                        Historias, guías y secretos de Cuenca para hacer tu estadía inolvidable.
                    </p>
                </div>
            </section>

            <main className="flex-grow pb-16 px-4 bg-gray-50 relative z-10 -mt-10 rounded-t-[3rem] shadow-2xl border-t border-white/20">
                <div className="max-w-7xl mx-auto pt-16">

                    {/* SEARCH & FILTERS */}
                    <div className="mb-20 space-y-8">
                        {/* Search Bar */}
                        <div className="max-w-2xl mx-auto relative group">
                            <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
                                <Search className="h-6 w-6 text-gray-400 group-focus-within:text-amber-500 transition-colors" />
                            </div>
                            <input
                                type="text"
                                className="block w-full pl-16 pr-6 py-5 rounded-full bg-white border-none shadow-lg text-gray-900 placeholder-gray-400 focus:ring-4 focus:ring-amber-500/20 focus:outline-none transition-all text-lg"
                                placeholder="Buscar artículos por título, contenido o categoría..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>

                        {/* Category Buttons */}
                        <div className="flex flex-wrap justify-center gap-3">
                            <div className="text-center w-full mb-2 text-gray-400 text-sm font-semibold uppercase tracking-wider">
                                Filtrar por Categoría
                            </div>
                            {categories.map(cat => (
                                <button
                                    key={cat}
                                    onClick={() => setSelectedCategory(cat)}
                                    className={`px-6 py-2 rounded-full text-sm font-bold transition-all duration-300 ${selectedCategory === cat
                                        ? 'bg-amber-600 text-white shadow-md transform scale-105'
                                        : 'bg-white text-gray-600 hover:bg-gray-100 hover:text-amber-600 shadow-sm border border-gray-100'
                                        }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* ARTICLE GRID */}
                    <div className="mb-20">
                        <h2 className="text-3xl font-playfair font-bold text-center text-gray-900 mb-12 relative inline-block w-full">
                            <span className="relative z-10 bg-gray-50 px-4">Todos los Artículos</span>
                            <div className="absolute top-1/2 left-0 w-full h-px bg-gray-200 -z-0"></div>
                        </h2>

                        {filteredArticles.length === 0 ? (
                            <div className="text-center py-20">
                                <p className="text-gray-500 text-lg">No se encontraron artículos con esos criterios.</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {filteredArticles.map((article) => (
                                    <Link
                                        href={`/blog/${article.slug}`}
                                        key={article.id}
                                        className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col h-full border border-gray-100 hover/-translate-y-2"
                                    >
                                        <div className="relative h-64 w-full overflow-hidden">
                                            {article.imagen_url ? (
                                                <Image
                                                    src={article.imagen_url}
                                                    alt={article.titulo}
                                                    fill
                                                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                                                />
                                            ) : (
                                                <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-300">
                                                    <span className="text-4xl">📷</span>
                                                </div>
                                            )}
                                            <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors"></div>
                                            <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-bold text-amber-800 shadow-sm">
                                                {article.categoria || 'General'}
                                            </div>
                                        </div>

                                        <div className="p-8 flex flex-col flex-grow">
                                            <div className="flex items-center gap-4 text-xs text-gray-400 mb-4 font-medium uppercase tracking-wide">
                                                <div className="flex items-center gap-1.5">
                                                    <Calendar className="w-3.5 h-3.5" />
                                                    <time dateTime={article.fecha_publicacion}>
                                                        {article.fecha_publicacion ? new Date(article.fecha_publicacion).toLocaleDateString('es-EC', { dateStyle: 'medium' }) : ''}
                                                    </time>
                                                </div>
                                            </div>

                                            <h3 className="text-2xl font-playfair font-bold text-gray-900 mb-4 group-hover:text-amber-600 transition-colors leading-tight">
                                                {article.titulo}
                                            </h3>

                                            <p className="text-gray-600 mb-6 line-clamp-3 text-base leading-relaxed flex-grow">
                                                {article.extracto || 'Lee el artículo completo para descubrir más...'}
                                            </p>

                                            <div className="mt-auto flex items-center text-amber-600 font-bold text-sm tracking-wider uppercase group/link">
                                                Leer Artículo
                                                <ArrowRight className="w-4 h-4 ml-2 transform group-hover/link:translate-x-1 transition-transform" />
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* RECENT ARTICLES SLIDER */}
                    {recentArticles.length > 0 && (
                        <div className="mb-20 pt-10 border-t border-gray-200">
                            <h2 className="text-3xl font-playfair font-bold text-gray-900 mb-10 text-center">
                                Artículos Recientes
                            </h2>

                            <div className="relative max-w-5xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden min-h-[400px]">
                                <div className="absolute top-4 right-4 z-20 flex gap-2">
                                    <button onClick={prevSlide} className="p-2 rounded-full bg-white/20 hover:bg-white/40 text-white backdrop-blur-sm transition-colors">
                                        <ChevronLeft className="w-6 h-6" />
                                    </button>
                                    <button onClick={nextSlide} className="p-2 rounded-full bg-white/20 hover:bg-white/40 text-white backdrop-blur-sm transition-colors">
                                        <ChevronRight className="w-6 h-6" />
                                    </button>
                                </div>

                                {/* Slider Content using currentSlide index */}
                                {recentArticles.map((article, index) => (
                                    <div
                                        key={article.id}
                                        className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
                                            }`}
                                    >
                                        <div className="flex flex-col md:flex-row h-full">
                                            {/* Image Side */}
                                            <div className="w-full md:w-1/2 relative h-48 md:h-full shrink-0">
                                                {article.imagen_url ? (
                                                    <Image
                                                        src={article.imagen_url}
                                                        alt={article.titulo}
                                                        fill
                                                        className="object-cover"
                                                    />
                                                ) : (
                                                    <div className="w-full h-full bg-gray-200" />
                                                )}
                                                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:to-transparent"></div>
                                            </div>

                                            {/* Content Side */}
                                            <div className="w-full md:w-1/2 p-6 md:p-12 flex flex-col justify-center bg-gray-900 text-white flex-grow">
                                                <div className="bg-amber-600 text-white text-[10px] md:text-xs font-bold px-2 py-0.5 md:px-3 md:py-1 rounded-full self-start mb-3 md:mb-6">
                                                    NUEVO
                                                </div>
                                                <h3 className="text-xl md:text-4xl font-playfair font-bold mb-3 md:mb-6 leading-tight line-clamp-2 md:line-clamp-none">
                                                    {article.titulo}
                                                </h3>
                                                <p className="text-gray-300 text-sm md:text-lg mb-4 md:mb-8 line-clamp-2 md:line-clamp-3">
                                                    {article.extracto}
                                                </p>
                                                <Link
                                                    href={`/blog/${article.slug}`}
                                                    className="inline-flex items-center text-white border border-white/30 hover:bg-white hover:text-gray-900 px-4 py-2 md:px-8 md:py-3 text-sm md:text-base rounded-full transition-all duration-300 self-start mt-auto md:mt-0"
                                                >
                                                    Leer Ahora
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                ))}

                                {/* Dots Indicators */}
                                <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20 flex gap-2">
                                    {recentArticles.map((_, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => setCurrentSlide(idx)}
                                            className={`w-3 h-3 rounded-full transition-all duration-300 ${idx === currentSlide ? 'bg-amber-500 w-8' : 'bg-white/50'
                                                }`}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                </div>
            </main>

            <Footer />
        </div>
    );
}
