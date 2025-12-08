'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { headerData } from '@/types';
import {
    Users,
    Waves,
    UtensilsCrossed,
    Map,
    Wifi,
    Car,
    ArrowRight,
    CheckCircle
} from 'lucide-react';

// Servicios del hotel
const servicios = [
    {
        id: 1,
        titulo: 'Salas de Eventos y Convenciones',
        descripcion: 'Espacios versátiles y equipados para eventos corporativos y sociales.',
        imagen: '/images/servicios/eventos-1.webp',
        icono: <Users className="w-8 h-8" />,
        enlace: '/servicios/eventos'
    },
    {
        id: 2,
        titulo: 'Piscina Climatizada y Spa',
        descripcion: 'Un oasis de bienestar con jacuzzi, sauna y tratamientos relajantes.',
        imagen: '/images/servicios/piscina-spa-1.webp',
        icono: <Waves className="w-8 h-8" />,
        enlace: '/servicios/piscina'
    },
    {
        id: 3,
        titulo: 'Restaurante Gourmet',
        descripcion: 'Cocina Fusión de autor y ambiente elegante para cenas y almuerzos.',
        imagen: '/images/servicios/restaurante-1.webp',
        icono: <UtensilsCrossed className="w-8 h-8" />,
        enlace: '/servicios/restaurante'
    },
    {
        id: 4,
        titulo: 'Tours y Experiencias',
        descripcion: 'Planifique sus excursiones al Parque Nacional Cajas y el Mirador del Turi con guías.',
        imagen: '/images/servicios/tours-1.webp',
        icono: <Map className="w-8 h-8" />,
        enlace: '/servicios/tours-experiencias'
    },
    {
        id: 5,
        titulo: 'Amenidades del Hotel',
        descripcion: 'Wi-Fi de alta velocidad, parqueadero gratuito y servicio a la habitación 24h.',
        imagen: '/images/servicios/amenidades-1.webp',
        icono: <Wifi className="w-8 h-8" />,
        enlace: '#amenidades'
    },
    {
        id: 6,
        titulo: 'Traslados y Transporte',
        descripcion: 'Servicio de transporte privado y taxis seguros desde y hacia el aeropuerto.',
        imagen: '/images/servicios/transporte-1.webp',
        icono: <Car className="w-8 h-8" />,
        enlace: '#transporte'
    }
];

// Amenidades detalladas
const amenidadesDetalle = [
    'Wi-Fi de alta velocidad en todas las áreas',
    'Parqueadero privado gratuito',
    'Servicio a la habitación 24 horas',
    'Recepción 24/7',
    'Conserjería y asistencia turística',
    'Caja de seguridad',
    'Servicio de lavandería',
    'Áreas de trabajo compartido'
];

export default function ServiciosPage() {
    return (
        <div className="flex flex-col min-h-screen">
            <Header logo={headerData.logo} />

            <main className="flex-1">
                {/* Hero Visual - 70% del viewport */}
                <div className="relative w-full h-[70vh]">
                    <Image
                        src="/images/servicios/hero-servicios.webp"
                        alt="Servicios Premium Hotel Puente Roto"
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/60"></div>

                    {/* Títulos sobre el hero */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="max-w-5xl mx-auto text-center px-4">
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                                Servicios Premium en Hotel Puente Roto
                            </h1>
                            <h2 className="text-xl md:text-2xl lg:text-3xl text-white/90 font-medium">
                                Comodidad, bienestar y experiencias únicas
                            </h2>
                        </div>
                    </div>
                </div>

                {/* CTA Principal Superior */}
                <div className="bg-gradient-to-r from-amber-500 to-yellow-500 py-8">
                    <div className="container mx-auto px-4 text-center">
                        <Link
                            href="/habitaciones"
                            className="inline-flex items-center justify-center gap-2 bg-gray-900 hover:bg-gray-800 text-white font-bold py-4 px-8 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl"
                        >
                            RESERVAR ALOJAMIENTO AHORA
                            <ArrowRight className="w-5 h-5" />
                        </Link>
                    </div>
                </div>

                {/* Cuadrícula de Servicios */}
                <div className="container mx-auto px-4 py-20">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-16">
                            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                                Explore Nuestros Servicios
                            </h3>
                            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                                Cada detalle diseñado para hacer de su estadía una experiencia inolvidable.
                            </p>
                            <div className="w-24 h-1 bg-amber-400 mx-auto rounded-full mt-6"></div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {servicios.map((servicio) => (
                                <Link
                                    key={servicio.id}
                                    href={servicio.enlace}
                                    className="group bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100"
                                >
                                    {/* Imagen */}
                                    <div className="relative aspect-[4/3] overflow-hidden">
                                        <Image
                                            src={servicio.imagen}
                                            alt={servicio.titulo}
                                            fill
                                            className="object-cover group-hover:scale-110 transition-transform duration-500"
                                        />
                                        {/* Icono flotante */}
                                        <div className="absolute top-4 right-4 w-14 h-14 bg-amber-500 rounded-full flex items-center justify-center text-white shadow-lg">
                                            {servicio.icono}
                                        </div>
                                    </div>

                                    {/* Contenido */}
                                    <div className="p-6">
                                        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-amber-600 transition-colors">
                                            {servicio.titulo}
                                        </h3>
                                        <p className="text-gray-600 mb-4 leading-relaxed">
                                            {servicio.descripcion}
                                        </p>
                                        <div className="flex items-center gap-2 text-amber-600 font-semibold">
                                            <span>Ver Detalle</span>
                                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Sección Amenidades Detalladas */}
                <div id="amenidades" className="bg-gray-50 py-20">
                    <div className="container mx-auto px-4">
                        <div className="max-w-7xl mx-auto">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                                {/* Amenidades del Hotel */}
                                <div>
                                    <div className="text-center mb-12">
                                        <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-100 rounded-full mb-6">
                                            <Wifi className="w-8 h-8 text-amber-600" />
                                        </div>
                                        <h3 className="text-3xl font-bold text-gray-900 mb-4">
                                            Amenidades del Hotel
                                        </h3>
                                        <p className="text-lg text-gray-600">
                                            Todo lo que necesita para una estadía cómoda y productiva.
                                        </p>
                                    </div>

                                    <div className="grid grid-cols-1 gap-4">
                                        {amenidadesDetalle.map((amenidad, index) => (
                                            <div
                                                key={index}
                                                className="flex items-center gap-3 p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
                                            >
                                                <CheckCircle className="w-6 h-6 text-amber-500 flex-shrink-0" />
                                                <span className="text-gray-700 font-medium">{amenidad}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Traslados y Transporte */}
                                <div id="transporte">
                                    <div className="text-center mb-12">
                                        <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-6">
                                            <Car className="w-8 h-8 text-blue-600" />
                                        </div>
                                        <h3 className="text-3xl font-bold text-gray-900 mb-4">
                                            Traslados y Transporte
                                        </h3>
                                        <p className="text-lg text-gray-600">
                                            Movilidad segura y confiable desde su llegada hasta su partida.
                                        </p>
                                    </div>

                                    <div className="space-y-6">
                                        {/* Traslado Aeropuerto */}
                                        <div className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                                            <div className="flex items-start gap-4">
                                                <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                                                    <Car className="w-6 h-6 text-blue-600" />
                                                </div>
                                                <div>
                                                    <h4 className="text-lg font-bold text-gray-900 mb-2">Traslado Aeropuerto</h4>
                                                    <p className="text-gray-600 mb-2">
                                                        Servicio de pick-up y drop-off desde el aeropuerto de Catamayo.
                                                    </p>
                                                    <p className="text-sm text-amber-600 font-semibold">Desde $25 USD</p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Taxi Seguro */}
                                        <div className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                                            <div className="flex items-start gap-4">
                                                <div className="flex-shrink-0 w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                                                    <Car className="w-6 h-6 text-green-600" />
                                                </div>
                                                <div>
                                                    <h4 className="text-lg font-bold text-gray-900 mb-2">Taxi Seguro 24/7</h4>
                                                    <p className="text-gray-600 mb-2">
                                                        Taxis confiables disponibles en cualquier momento del día.
                                                    </p>
                                                    <p className="text-sm text-gray-500">Coordinado por recepción</p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Tours Privados */}
                                        <div className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                                            <div className="flex items-start gap-4">
                                                <div className="flex-shrink-0 w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                                                    <Map className="w-6 h-6 text-purple-600" />
                                                </div>
                                                <div>
                                                    <h4 className="text-lg font-bold text-gray-900 mb-2">Tours Privados</h4>
                                                    <p className="text-gray-600 mb-2">
                                                        Transporte privado para excursiones al Parque Cajas y el Mirador del Turi.
                                                    </p>
                                                    <p className="text-sm text-amber-600 font-semibold">Precio según destino</p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Parqueadero */}
                                        <div className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                                            <div className="flex items-start gap-4">
                                                <div className="flex-shrink-0 w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                                                    <CheckCircle className="w-6 h-6 text-amber-600" />
                                                </div>
                                                <div>
                                                    <h4 className="text-lg font-bold text-gray-900 mb-2">Parqueadero Privado</h4>
                                                    <p className="text-gray-600 mb-2">
                                                        Estacionamiento seguro y vigilado sin costo adicional.
                                                    </p>
                                                    <p className="text-sm text-green-600 font-semibold">Gratuito para huéspedes</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* CTA Final */}
                <div className="bg-gradient-to-r from-gray-900 to-gray-800 py-16">
                    <div className="container mx-auto px-4 text-center">
                        <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
                            ¿Listo para Experimentar el Lujo?
                        </h3>
                        <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
                            Reserve ahora y descubra por qué Hotel Puente Roto es la mejor opción para su estadía en el sur de Ecuador.
                        </p>
                        <div className="flex flex-col md:flex-row gap-4 justify-center">
                            <Link
                                href="/habitaciones"
                                className="inline-flex items-center justify-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold py-4 px-8 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl"
                            >
                                VER HABITACIONES
                                <ArrowRight className="w-5 h-5" />
                            </Link>
                            <Link
                                href="/contacto"
                                className="inline-flex items-center justify-center gap-2 bg-white hover:bg-gray-100 text-gray-900 font-bold py-4 px-8 rounded-lg transition-all duration-300 shadow-lg"
                            >
                                CONTACTAR
                            </Link>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
