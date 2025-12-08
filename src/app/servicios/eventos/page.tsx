'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { headerData } from '@/types';
import {
    Users,
    Projector,
    Wifi,
    Monitor,
    UtensilsCrossed,
    Bed,
    Headphones,
    ArrowRight,
    Download,
    CheckCircle
} from 'lucide-react';

// Tipos de salas
type SalaId = 'tomebamba' | 'pumapungo';

// Especificaciones de salas
const salasEventos = [
    {
        id: 'tomebamba' as SalaId,
        nombre: 'Sala Principal "Tomebamba"',
        capacidadTeatro: '150 personas',
        capacidadBanquete: '90 personas',
        idealPara: 'Convenciones, Bodas, Grandes Conferencias',
        tecnologia: [
            'Proyector 4K',
            'Sistema de Audio Profesional',
            'Micrófonos inalámbricos',
            'Internet dedicado'
        ],
        tarifa: 'Descuento Corporativo Exclusivo para Invitados',
        imagen: '/images/eventos/sala-podocarpus.webp'
    },
    {
        id: 'pumapungo' as SalaId,
        nombre: 'Sala Ejecutiva "Pumapungo"',
        capacidadTeatro: '40 personas',
        capacidadBanquete: '15 personas',
        idealPara: 'Reuniones de Directorio, Entrevistas, Talleres',
        tecnologia: [
            'Pantalla Smart TV de 65"',
            'Pizarra digital interactiva',
            'Conexión para videoconferencia',
            'Sistema de sonido premium'
        ],
        tarifa: 'Descuento Corporativo Exclusivo para Invitados',
        imagen: '/images/eventos/sala-villonaco.webp'
    }
];

// Servicios adicionales
const serviciosAdicionales = [
    {
        id: 1,
        icono: <UtensilsCrossed className="w-12 h-12" />,
        titulo: 'Catering Gourmet',
        descripcion: 'Opciones de cocina local e internacional y menús personalizados.'
    },
    {
        id: 2,
        icono: <Bed className="w-12 h-12" />,
        titulo: 'Alojamiento Preferencial',
        descripcion: 'Tarifas especiales para los invitados al evento.'
    },
    {
        id: 3,
        icono: <Headphones className="w-12 h-12" />,
        titulo: 'Soporte Técnico',
        descripcion: 'Asistencia en sitio por nuestro equipo de IT y logística.'
    }
];

// Galería de imágenes
const galeriaImagenes = [
    { id: 1, url: '/images/eventos/galeria-teatro.webp', alt: 'Configuración tipo Teatro' },
    { id: 2, url: '/images/eventos/galeria-sala-u.webp', alt: 'Configuración tipo U' },
    { id: 3, url: '/images/eventos/galeria-coffee-break.webp', alt: 'Coffee Break' },
    { id: 4, url: '/images/eventos/galeria-tecnologia.webp', alt: 'Tecnología' }
];

// Links de navegación a otros servicios
const serviciosLinks = [
    { label: 'Piscina & Spa', href: '/servicios/piscina' },
    { label: 'Restaurante', href: '/servicios/restaurante' },
    { label: 'Habitaciones', href: '/habitaciones' }
];

export default function EventosPage() {
    const [salaActiva, setSalaActiva] = useState<SalaId>('tomebamba');
    const salaSeleccionada = salasEventos.find(s => s.id === salaActiva) || salasEventos[0];

    return (
        <div className="flex flex-col min-h-screen">
            <Header logo={headerData.logo} />

            <main className="flex-1">
                {/* Hero Visual - 70% del viewport */}
                <div className="relative w-full h-[70vh]">
                    <Image
                        src="/images/eventos/hero-eventos.webp"
                        alt="Salas de Eventos Hotel Puente Roto"
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/60"></div>

                    {/* Títulos sobre el hero */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="max-w-4xl mx-auto text-center px-4">
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                                Salas de Eventos y Convenciones
                            </h1>
                            <h2 className="text-xl md:text-2xl lg:text-3xl text-white/90 font-medium">
                                Espacios profesionales con tecnología de punta
                            </h2>
                        </div>
                    </div>
                </div>

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

                {/* Sección 1: Introducción */}
                <div className="container mx-auto px-4 py-16">
                    <div className="max-w-4xl mx-auto text-center">
                        <p className="text-xl text-gray-700 leading-relaxed">
                            Nuestro hotel ofrece las locaciones más versátiles y mejor equipadas de Cuenca. Contamos con soluciones integrales para eventos corporativos y celebraciones sociales, respaldados por un equipo de planeación profesional que garantiza que cada detalle de su evento sea impecable.
                        </p>
                        <div className="w-24 h-1 bg-amber-400 mx-auto rounded-full mt-8"></div>
                    </div>
                </div>

                {/* Sección 2: Especificaciones de Salas (Tabs) */}
                <div className="bg-gradient-to-b from-gray-50 to-white py-20">
                    <div className="container mx-auto px-4">
                        <div className="max-w-6xl mx-auto">
                            <h3 className="text-3xl font-bold text-gray-900 mb-12 text-center">
                                Nuestros Espacios para Eventos
                            </h3>

                            {/* Tabs */}
                            <div className="flex flex-col md:flex-row gap-4 mb-8">
                                {salasEventos.map((sala) => (
                                    <button
                                        key={sala.id}
                                        onClick={() => setSalaActiva(sala.id)}
                                        className={`flex-1 px-6 py-4 rounded-lg font-bold text-lg transition-all duration-300 ${salaActiva === sala.id
                                            ? 'bg-amber-500 text-white shadow-lg scale-105'
                                            : 'bg-white text-gray-700 hover:bg-gray-100 border-2 border-gray-200'
                                            }`}
                                    >
                                        {sala.nombre}
                                    </button>
                                ))}
                            </div>

                            {/* Panel de Detalles */}
                            <div className="bg-white rounded-2xl overflow-hidden shadow-xl border border-gray-100">
                                {/* Imagen de la sala */}
                                <div className="relative aspect-[2/1] w-full">
                                    <Image
                                        src={salaSeleccionada.imagen}
                                        alt={salaSeleccionada.nombre}
                                        fill
                                        className="object-cover"
                                    />
                                </div>

                                {/* Especificaciones */}
                                <div className="p-8">
                                    <h4 className="text-2xl font-bold text-gray-900 mb-6">{salaSeleccionada.nombre}</h4>

                                    {/* Tabla de Especificaciones */}
                                    <div className="grid gap-6 mb-8">
                                        {/* Capacidad Teatro */}
                                        <div className="border-l-4 border-amber-500 pl-4">
                                            <p className="text-sm font-semibold text-gray-600 mb-1">Capacidad (Teatro)</p>
                                            <p className="text-xl font-bold text-gray-900">{salaSeleccionada.capacidadTeatro}</p>
                                        </div>

                                        {/* Capacidad Banquete */}
                                        <div className="border-l-4 border-amber-500 pl-4">
                                            <p className="text-sm font-semibold text-gray-600 mb-1">Capacidad (Banquete)</p>
                                            <p className="text-xl font-bold text-gray-900">{salaSeleccionada.capacidadBanquete}</p>
                                        </div>

                                        {/* Ideal Para */}
                                        <div className="border-l-4 border-amber-500 pl-4">
                                            <p className="text-sm font-semibold text-gray-600 mb-1">Ideal para</p>
                                            <p className="text-lg text-gray-800">{salaSeleccionada.idealPara}</p>
                                        </div>

                                        {/* Tecnología */}
                                        <div className="border-l-4 border-amber-500 pl-4">
                                            <p className="text-sm font-semibold text-gray-600 mb-3">Tecnología Incluida</p>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                                {salaSeleccionada.tecnologia.map((tech, index) => (
                                                    <div key={index} className="flex items-center gap-2">
                                                        <CheckCircle className="w-5 h-5 text-amber-500 flex-shrink-0" />
                                                        <span className="text-gray-700">{tech}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Tarifa */}
                                        <div className="border-l-4 border-amber-500 pl-4">
                                            <p className="text-sm font-semibold text-gray-600 mb-1">Tarifa de Alojamiento</p>
                                            <p className="text-lg font-bold text-amber-600">{salaSeleccionada.tarifa}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sección 3: Servicios Adicionales */}
                <div className="container mx-auto px-4 py-20">
                    <div className="max-w-6xl mx-auto">
                        <h3 className="text-3xl font-bold text-gray-900 mb-12 text-center">
                            Servicios Adicionales
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {serviciosAdicionales.map((servicio) => (
                                <div
                                    key={servicio.id}
                                    className="bg-white rounded-xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 text-center"
                                >
                                    <div className="inline-flex items-center justify-center w-20 h-20 bg-amber-100 rounded-full mb-6 text-amber-600">
                                        {servicio.icono}
                                    </div>
                                    <h4 className="text-xl font-bold text-gray-900 mb-3">{servicio.titulo}</h4>
                                    <p className="text-gray-600 leading-relaxed">{servicio.descripcion}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Galería de Eventos */}
                <div className="bg-gray-50 py-20">
                    <div className="container mx-auto px-4">
                        <div className="max-w-6xl mx-auto">
                            <h3 className="text-3xl font-bold text-gray-900 mb-12 text-center">
                                Versatilidad de Nuestros Espacios
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                {galeriaImagenes.map((imagen) => (
                                    <div
                                        key={imagen.id}
                                        className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
                                    >
                                        <Image
                                            src={imagen.url}
                                            alt={imagen.alt}
                                            fill
                                            className="object-cover"
                                        />
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
                                ¿Listo para Planear su Evento?
                            </h3>
                            <p className="text-xl text-gray-800 mb-8">
                                Nuestro equipo está listo para ayudarle a crear una experiencia inolvidable.
                            </p>
                            <div className="flex flex-col md:flex-row gap-4 justify-center">
                                <Link
                                    href="/contacto?tipo=eventos"
                                    className="inline-flex items-center justify-center gap-2 bg-gray-900 hover:bg-gray-800 text-white font-bold py-4 px-8 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl"
                                >
                                    SOLICITAR COTIZACIÓN Y DISPONIBILIDAD
                                    <ArrowRight className="w-5 h-5" />
                                </Link>
                                <Link
                                    href="/eventos-dossier.pdf"
                                    className="inline-flex items-center justify-center gap-2 bg-white hover:bg-gray-100 text-gray-900 font-bold py-4 px-8 rounded-lg transition-all duration-300 shadow-lg"
                                >
                                    <Download className="w-5 h-5" />
                                    Descargar Dossier Completo
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
