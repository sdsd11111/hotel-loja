'use client';

import React from 'react';
import Image from 'next/image';
import { Habitacion } from '@/types';
import {
    X, Check, Bed, Coffee, Briefcase, Wifi, Users, Tv, Car, Bath, Wind,
    ConciergeBell, Award, Eye, Droplets, Sofa, Sparkles, Plus
} from 'lucide-react';

// Tipos de amenidades (Duplicated from HabitacionesPage for self-containment)
const amenidadesIconos: Record<string, React.ReactNode> = {
    'Cama King': <Bed className="w-5 h-5" />,
    'Cama Queen': <Bed className="w-5 h-5" />,
    'Vistas': <Eye className="w-5 h-5" />,
    'Escritorio': <Briefcase className="w-5 h-5" />,
    'Cafetera': <Coffee className="w-5 h-5" />,
    '2 Camas': <Users className="w-5 h-5" />,
    'TV Grande': <Tv className="w-5 h-5" />,
    'Baño Amplio': <Bath className="w-5 h-5" />,
    'Parqueo': <Car className="w-5 h-5" />,
    'Climatización': <Wind className="w-5 h-5" />,
    'Servicio': <ConciergeBell className="w-5 h-5" />,
    'Amenities': <Sparkles className="w-5 h-5" />,
    'Jacuzzi': <Droplets className="w-5 h-5" />,
    'Balcón': <Eye className="w-5 h-5" />,
    'Mini-Bar': <Award className="w-5 h-5" />,
    'Tres Camas': <Users className="w-5 h-5" />,
    'Sofá': <Sofa className="w-5 h-5" />,
    'Diseño Moderno': <Sparkles className="w-5 h-5" />,
    'WiFi': <Wifi className="w-5 h-5" />
};

interface RoomDetailsModalProps {
    habitacion: Habitacion;
    onClose: () => void;
    onAddToCart: (habitacion: Habitacion) => void;
}

export const RoomDetailsModal: React.FC<RoomDetailsModalProps> = ({ habitacion, onClose, onAddToCart }) => {
    // Close on click outside
    const handleBackdropClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div
            className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn"
            onClick={handleBackdropClick}
        >
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-y-auto relative flex flex-col md:flex-row">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-10 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg transition-all"
                >
                    <X className="w-6 h-6" />
                </button>

                {/* Image Section */}
                <div className="w-full md:w-1/2 relative h-64 md:h-auto min-h-[300px]">
                    <Image
                        src={habitacion.imagen}
                        alt={habitacion.nombre}
                        fill
                        className="object-cover"
                    />
                    <div className="absolute top-4 left-4 bg-amber-500 text-white px-4 py-2 rounded-full font-bold shadow-lg">
                        {habitacion.precio}
                    </div>
                </div>

                {/* Content Section */}
                <div className="w-full md:w-1/2 p-8 flex flex-col">
                    <div className="mb-6">
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">{habitacion.nombre}</h2>
                        <div className="w-20 h-1 bg-amber-500 rounded-full mb-4"></div>
                        <p className="text-lg text-gray-600 leading-relaxed">
                            {habitacion.descripcion}
                        </p>
                    </div>

                    <div className="mb-8">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                            <Sparkles className="w-5 h-5 text-amber-500" />
                            Amenidades y Servicios
                        </h3>
                        <div className="grid grid-cols-2 gap-4">
                            {habitacion.amenidades.map((amenidad, idx) => (
                                <div key={idx} className="flex items-center gap-3 text-gray-700 bg-gray-50 p-3 rounded-lg">
                                    <span className="text-amber-600">
                                        {amenidadesIconos[amenidad] || <Check className="w-5 h-5" />}
                                    </span>
                                    <span className="font-medium text-sm">{amenidad}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="mb-8">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                            <Users className="w-5 h-5 text-amber-500" />
                            Capacidad
                        </h3>
                        <div className="flex gap-6">
                            <div className="text-center bg-gray-50 p-4 rounded-xl flex-1">
                                <span className="block text-2xl font-bold text-gray-900">{habitacion.capacidad.maxAdultos}</span>
                                <span className="text-sm text-gray-500">Adultos</span>
                            </div>
                            <div className="text-center bg-gray-50 p-4 rounded-xl flex-1">
                                <span className="block text-2xl font-bold text-gray-900">{habitacion.capacidad.maxNiños}</span>
                                <span className="text-sm text-gray-500">Niños</span>
                            </div>
                            <div className="text-center bg-gray-50 p-4 rounded-xl flex-1">
                                <span className="block text-2xl font-bold text-gray-900">{habitacion.capacidad.camas}</span>
                                <span className="text-sm text-gray-500">{habitacion.capacidad.camas === 1 ? 'Cama' : 'Camas'}</span>
                            </div>
                        </div>
                    </div>

                    <div className="mt-auto pt-6 border-t border-gray-100">
                        <button
                            onClick={() => {
                                onAddToCart(habitacion);
                                onClose();
                            }}
                            className="w-full bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1 flex items-center justify-center gap-3"
                        >
                            <Plus className="w-6 h-6" />
                            AGREGAR A MI RESERVA
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
