'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import ReservationSearchPanel from '@/components/ReservationSearchPanel';
import { RoomDetailsModal } from '@/components/RoomDetailsModal';
import { headerData, Habitacion } from '@/types';
import {
    Bed, Coffee, Briefcase, Wifi, Users, Tv, Car, Bath, Wind,
    ConciergeBell, Award, Eye, Droplets, Sofa, Sparkles,
    ArrowRight, Plus, Minus, X, Check
} from 'lucide-react';

// Tipos de amenidades
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

// Data de 12 habitaciones
const habitaciones: Habitacion[] = [
    {
        id: 1,
        nombre: 'Suite Ejecutiva',
        slug: 'suite-ejecutiva',
        descripcion: 'Diseñada para la productividad y el confort del viajero de negocios.',
        amenidades: ['Cama Queen', 'Vistas', 'Escritorio', 'Cafetera', 'WiFi'],
        precio: 'Desde $85 USD / Noche',
        precioNumerico: 85,
        imagen: '/images/habitaciones/suite-ejecutiva-main.webp',
        capacidad: { maxAdultos: 2, maxNiños: 1, camas: 1 }
    },
    {
        id: 2,
        nombre: 'Doble Familiar',
        slug: 'doble-familiar',
        descripcion: 'La solución ideal para familias o grupos, con espacio y dos camas matrimoniales.',
        amenidades: ['2 Camas', 'TV Grande', 'Baño Amplio', 'Parqueo'],
        precio: 'Desde $95 USD / Noche',
        precioNumerico: 95,
        imagen: '/images/habitaciones/doble-familiar-main.webp',
        capacidad: { maxAdultos: 4, maxNiños: 2, camas: 2 }
    },
    {
        id: 3,
        nombre: 'Habitación Estándar Confort',
        slug: 'estandar-confort',
        descripcion: 'Calidad-precio superior con acceso a todas las amenidades del hotel.',
        amenidades: ['Cama Queen', 'Climatización', 'Servicio', 'Amenities'],
        precio: 'Desde $65 USD / Noche',
        precioNumerico: 65,
        imagen: '/images/habitaciones/estandar-confort-main.webp',
        capacidad: { maxAdultos: 2, maxNiños: 1, camas: 1 }
    },
    {
        id: 4,
        nombre: 'Suite Premium Deluxe',
        slug: 'suite-premium-deluxe',
        descripcion: 'Lujo y exclusividad: jacuzzi privado y un balcón con las mejores vistas de Cuenca.',
        amenidades: ['Cama King', 'Jacuzzi', 'Balcón', 'Mini-Bar'],
        precio: 'Desde $150 USD / Noche',
        precioNumerico: 150,
        imagen: '/images/habitaciones/suite-premium-deluxe-main.webp',
        capacidad: { maxAdultos: 2, maxNiños: 2, camas: 1 }
    },
    {
        id: 5,
        nombre: 'Triple Confort',
        slug: 'triple-confort',
        descripcion: 'Espacio funcional y cómodo para grupos de tres personas.',
        amenidades: ['Tres Camas', 'TV Grande', 'WiFi', 'Amenities'],
        precio: 'Desde $110 USD / Noche',
        precioNumerico: 110,
        imagen: '/images/habitaciones/triple-confort-main.webp',
        capacidad: { maxAdultos: 3, maxNiños: 1, camas: 3 }
    },
    {
        id: 6,
        nombre: 'Suite Junior',
        slug: 'suite-junior',
        descripcion: 'Elegancia y espacio para parejas que buscan algo especial.',
        amenidades: ['Cama King', 'Sofá', 'Mini-Bar', 'Vistas'],
        precio: 'Desde $120 USD / Noche',
        precioNumerico: 120,
        imagen: '/images/habitaciones/junior-suite-elegance-main.webp',
        capacidad: { maxAdultos: 2, maxNiños: 1, camas: 1 }
    },
    {
        id: 7,
        nombre: 'Habitación Individual',
        slug: 'individual',
        descripcion: 'Perfecta para viajeros solitarios que buscan comodidad y precio justo.',
        amenidades: ['Cama Queen', 'Escritorio', 'WiFi', 'Climatización'],
        precio: 'Desde $55 USD / Noche',
        precioNumerico: 55,
        imagen: '/images/habitaciones/individual-main.webp',
        capacidad: { maxAdultos: 1, maxNiños: 0, camas: 1 }
    },
    {
        id: 8,
        nombre: 'Suite Familiar Grande',
        slug: 'suite-familiar-grande',
        descripcion: 'Espacio amplio para familias numerosas con todas las comodidades.',
        amenidades: ['2 Camas', 'Sofá', 'Baño Amplio', 'TV Grande'],
        precio: 'Desde $140 USD / Noche',
        precioNumerico: 140,
        imagen: '/images/habitaciones/suite-familiar-grande-main.webp',
        capacidad: { maxAdultos: 4, maxNiños: 3, camas: 2 }
    },
    {
        id: 9,
        nombre: 'Habitación Doble Estándar',
        slug: 'doble-estandar',
        descripcion: 'Dos camas individuales, ideal para amigos o colegas.',
        amenidades: ['2 Camas', 'WiFi', 'Climatización', 'Servicio'],
        precio: 'Desde $75 USD / Noche',
        precioNumerico: 75,
        imagen: '/images/habitaciones/doble-estandar-main.webp',
        capacidad: { maxAdultos: 2, maxNiños: 0, camas: 2 }
    },
    {
        id: 10,
        nombre: 'Suite Presidencial',
        slug: 'suite-presidencial',
        descripcion: 'La máxima expresión de lujo y exclusividad en Hotel Puente Roto.',
        amenidades: ['Cama King', 'Jacuzzi', 'Balcón', 'Mini-Bar', 'Diseño Moderno'],
        precio: 'Desde $250 USD / Noche',
        precioNumerico: 250,
        imagen: '/images/habitaciones/suite-presidencial-main.webp',
        capacidad: { maxAdultos: 2, maxNiños: 2, camas: 1 }
    },
    {
        id: 11,
        nombre: 'Habitación Económica',
        slug: 'economica',
        descripcion: 'Opción accesible sin sacrificar calidad y limpieza.',
        amenidades: ['Cama Queen', 'WiFi', 'Climatización'],
        precio: 'Desde $45 USD / Noche',
        precioNumerico: 45,
        imagen: '/images/habitaciones/economica-main.webp',
        capacidad: { maxAdultos: 2, maxNiños: 0, camas: 1 }
    },
    {
        id: 12,
        nombre: 'Cuádruple Familiar',
        slug: 'cuadruple-familiar',
        descripcion: 'Cuatro camas individuales para grupos grandes o familias.',
        amenidades: ['Tres Camas', 'Baño Amplio', 'TV Grande', 'Parqueo'],
        precio: 'Desde $130 USD / Noche',
        precioNumerico: 130,
        imagen: '/images/habitaciones/cuadruple-familiar-main.webp',
        capacidad: { maxAdultos: 4, maxNiños: 2, camas: 4 }
    }
];

interface CartItem {
    habitacion: Habitacion;
    cantidad: number;
}

function HabitacionesContent() {
    const router = useRouter();
    const searchParams = useSearchParams();

    // Filter state (for capacity filtering)
    const [filtroAdultos, setFiltroAdultos] = useState(0);
    const [filtroNinos, setFiltroNinos] = useState(0);

    // Reservation state
    const [fechaEntrada, setFechaEntrada] = useState('');
    const [fechaSalida, setFechaSalida] = useState('');

    // Modal state
    const [selectedRoom, setSelectedRoom] = useState<Habitacion | null>(null);

    // Initialize from URL params
    React.useEffect(() => {
        const entrada = searchParams.get('entrada');
        const salida = searchParams.get('salida');
        const adultos = searchParams.get('adultos');
        const ninos = searchParams.get('ninos');

        if (entrada) setFechaEntrada(entrada);
        if (salida) setFechaSalida(salida);
        if (adultos) setFiltroAdultos(parseInt(adultos));
        if (ninos) setFiltroNinos(parseInt(ninos));
    }, [searchParams]);

    // Cart state
    const [cart, setCart] = useState<CartItem[]>([]);
    const [showCart, setShowCart] = useState(false);

    // Filter rooms by capacity
    const habitacionesFiltradas = habitaciones.filter(hab => {
        if (filtroAdultos === 0 && filtroNinos === 0) return true;
        return hab.capacidad.maxAdultos >= filtroAdultos && hab.capacidad.maxNiños >= filtroNinos;
    });

    // Reset filters
    const resetFiltros = () => {
        setFiltroAdultos(0);
        setFiltroNinos(0);
    };

    // Add to cart
    const addToCart = (habitacion: Habitacion) => {
        setCart(prev => {
            const existing = prev.find(item => item.habitacion.id === habitacion.id);
            if (existing) {
                return prev.map(item =>
                    item.habitacion.id === habitacion.id
                        ? { ...item, cantidad: item.cantidad + 1 }
                        : item
                );
            }
            return [...prev, { habitacion, cantidad: 1 }];
        });
        setShowCart(true);
    };

    // Remove from cart
    const removeFromCart = (habitacionId: number) => {
        setCart(prev => prev.filter(item => item.habitacion.id !== habitacionId));
    };

    // Update quantity
    const updateQuantity = (habitacionId: number, delta: number) => {
        setCart(prev => prev.map(item => {
            if (item.habitacion.id === habitacionId) {
                const newCantidad = Math.max(1, item.cantidad + delta);
                return { ...item, cantidad: newCantidad };
            }
            return item;
        }).filter(item => item.cantidad > 0));
    };

    // Calculate total
    const calcularTotal = () => {
        if (!fechaEntrada || !fechaSalida) return 0;

        const entrada = new Date(fechaEntrada);
        const salida = new Date(fechaSalida);
        const noches = Math.ceil((salida.getTime() - entrada.getTime()) / (1000 * 60 * 60 * 24));

        if (noches <= 0) return 0;

        return cart.reduce((total, item) => {
            return total + (item.habitacion.precioNumerico * item.cantidad * noches);
        }, 0);
    };

    // Handle reservation
    const handleReservar = () => {
        if (!fechaEntrada || !fechaSalida || cart.length === 0) {
            alert('Por favor complete las fechas y agregue al menos una habitación.');
            return;
        }

        // Tomamos la primera habitación del carrito para pre-llenar el formulario
        const habitacionPrincipal = cart[0].habitacion.nombre;

        const params = new URLSearchParams({
            motivo: 'Reserva de Habitación',
            entrada: fechaEntrada,
            salida: fechaSalida,
            adultos: filtroAdultos > 0 ? filtroAdultos.toString() : '2',
            ninos: filtroNinos.toString(),
            habitacion: habitacionPrincipal
        });

        router.push(`/contacto?${params.toString()}#formulario-contacto`);
    };

    // Help Tip state
    const [showHelpTip, setShowHelpTip] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (!fechaEntrada && !fechaSalida) {
                setShowHelpTip(true);
            }
        }, 1000);
        return () => clearTimeout(timer);
    }, [fechaEntrada, fechaSalida]);

    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            <Header logo={headerData.logo} />

            <main className="flex-1">
                {/* Hero Section */}
                <div className="relative h-[70vh] min-h-[500px] bg-gray-900 flex items-center justify-center">
                    <Image
                        src="/images/hero/hero-services.webp"
                        alt="Nuestras Habitaciones"
                        fill
                        className="object-cover opacity-60"
                        priority
                    />
                    <div className="relative z-10 text-center text-white px-4">
                        <h1 className="text-4xl md:text-6xl font-bold mb-4 font-serif">Nuestras Habitaciones</h1>
                        <p className="text-xl md:text-2xl max-w-2xl mx-auto">
                            Descubra el confort y la elegancia en cada detalle.
                        </p>
                    </div>
                </div>

                {/* Help Tip */}
                {showHelpTip && (
                    <div className="container mx-auto px-4 relative z-30">
                        <div className="absolute -top-16 left-4 md:left-auto md:right-4 bg-amber-500 text-white py-3 px-5 rounded-xl shadow-xl animate-bounce flex items-center gap-3 max-w-xs md:max-w-md">
                            <div className="bg-white/20 p-1 rounded-full">
                                <Sparkles className="w-4 h-4" />
                            </div>
                            <span className="font-bold text-sm">
                                ¡Tip! Selecciona tus fechas y huéspedes para ver la disponibilidad real.
                            </span>
                            <button
                                onClick={() => setShowHelpTip(false)}
                                className="hover:bg-white/20 p-1 rounded-full transition-colors"
                            >
                                <X className="w-4 h-4" />
                            </button>
                            {/* Triangle pointer */}
                            <div className="absolute bottom-[-8px] left-8 md:left-auto md:right-8 w-0 h-0 border-l-[8px] border-l-transparent border-t-[8px] border-t-amber-500 border-r-[8px] border-r-transparent"></div>
                        </div>
                    </div>
                )}

                {/* Reservation Panel */}
                <ReservationSearchPanel
                    fechaEntrada={fechaEntrada}
                    fechaSalida={fechaSalida}
                    onFechaEntradaChange={setFechaEntrada}
                    onFechaSalidaChange={setFechaSalida}
                    adultos={filtroAdultos}
                    ninos={filtroNinos}
                    onAdultosChange={setFiltroAdultos}
                    onNinosChange={setFiltroNinos}
                    cartCount={cart.length}
                    cartItemsTotal={cart.reduce((sum, item) => sum + item.cantidad, 0)}
                    onCartClick={() => setShowCart(!showCart)}
                    showCart={true}
                    sticky={false}
                />

                {/* Filter Results Info */}
                <div className="container mx-auto px-4 py-6">
                    <div className="flex justify-between items-center">
                        <p className="text-gray-700">
                            Mostrando <span className="font-bold">{habitacionesFiltradas.length}</span> de {habitaciones.length} habitaciones
                            {(filtroAdultos > 0 || filtroNinos > 0) && (
                                <span className="text-amber-600 ml-2">
                                    (Filtrado: {filtroAdultos} adultos, {filtroNinos} niños)
                                </span>
                            )}
                        </p>
                        {(filtroAdultos > 0 || filtroNinos > 0) && (
                            <button
                                onClick={resetFiltros}
                                className="text-amber-600 hover:text-amber-700 font-semibold underline"
                            >
                                Restablecer filtros
                            </button>
                        )}
                    </div>
                </div>

                {/* Cart Sidebar */}
                {showCart && (
                    <div className="fixed inset-0 bg-black/50 z-50" onClick={() => setShowCart(false)}>
                        <div
                            className="absolute right-0 top-0 bottom-0 w-full md:w-96 bg-white shadow-2xl overflow-y-auto"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="p-6">
                                <div className="flex justify-between items-center mb-6">
                                    <h3 className="text-2xl font-bold">Carrito de Reserva</h3>
                                    <button
                                        onClick={() => setShowCart(false)}
                                        className="p-2 hover:bg-gray-100 rounded-lg"
                                    >
                                        <X className="w-6 h-6" />
                                    </button>
                                </div>

                                {cart.length === 0 ? (
                                    <p className="text-gray-500 text-center py-8">
                                        No hay habitaciones en el carrito
                                    </p>
                                ) : (
                                    <>
                                        <div className="space-y-4 mb-6">
                                            {cart.map((item) => (
                                                <div key={item.habitacion.id} className="border rounded-lg p-4">
                                                    <div className="flex justify-between items-start mb-2">
                                                        <h4 className="font-bold">{item.habitacion.nombre}</h4>
                                                        <button
                                                            onClick={() => removeFromCart(item.habitacion.id)}
                                                            className="text-red-500 hover:text-red-700"
                                                        >
                                                            <X className="w-5 h-5" />
                                                        </button>
                                                    </div>
                                                    <p className="text-sm text-gray-600 mb-3">
                                                        ${item.habitacion.precioNumerico} USD / noche
                                                    </p>
                                                    <div className="flex items-center justify-between">
                                                        <span className="text-sm font-semibold">Cantidad:</span>
                                                        <div className="flex items-center gap-2">
                                                            <button
                                                                onClick={() => updateQuantity(item.habitacion.id, -1)}
                                                                className="p-1 bg-gray-200 hover:bg-gray-300 rounded"
                                                            >
                                                                <Minus className="w-4 h-4" />
                                                            </button>
                                                            <span className="w-8 text-center font-bold">{item.cantidad}</span>
                                                            <button
                                                                onClick={() => updateQuantity(item.habitacion.id, 1)}
                                                                className="p-1 bg-gray-200 hover:bg-gray-300 rounded"
                                                            >
                                                                <Plus className="w-4 h-4" />
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>

                                        {fechaEntrada && fechaSalida && (
                                            <div className="bg-amber-50 p-4 rounded-lg mb-4">
                                                <div className="flex justify-between mb-2">
                                                    <span className="font-semibold">Noches:</span>
                                                    <span>{Math.ceil((new Date(fechaSalida).getTime() - new Date(fechaEntrada).getTime()) / (1000 * 60 * 60 * 24))}</span>
                                                </div>
                                                <div className="flex justify-between text-xl font-bold text-amber-600">
                                                    <span>Total:</span>
                                                    <span>${calcularTotal()} USD</span>
                                                </div>
                                            </div>
                                        )}

                                        <button
                                            onClick={handleReservar}
                                            disabled={!fechaEntrada || !fechaSalida}
                                            className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold py-4 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
                                        >
                                            <Check className="w-5 h-5" />
                                            CONFIRMAR RESERVA
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {/* Rooms Grid */}
                <div className="container mx-auto px-4 pb-20">
                    {habitacionesFiltradas.length === 0 ? (
                        <div className="text-center py-20">
                            <p className="text-xl text-gray-600 mb-4">
                                No hay habitaciones disponibles para {filtroAdultos} adultos y {filtroNinos} niños
                            </p>
                            <button
                                onClick={resetFiltros}
                                className="bg-amber-500 hover:bg-amber-600 text-white font-bold py-3 px-6 rounded-lg"
                            >
                                Restablecer filtros
                            </button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {habitacionesFiltradas.map((habitacion) => (
                                <div
                                    key={habitacion.id}
                                    className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100"
                                >
                                    <div className="relative aspect-[4/3]">
                                        <Image
                                            src={habitacion.imagen}
                                            alt={habitacion.nombre}
                                            fill
                                            className="object-cover"
                                        />
                                        <div className="absolute top-4 right-4 bg-amber-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                                            {habitacion.precio.split('/')[0]}
                                        </div>
                                        {/* Capacity Badge */}
                                        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-bold flex items-center gap-2">
                                            <Users className="w-4 h-4" />
                                            {habitacion.capacidad.maxAdultos} + {habitacion.capacidad.maxNiños}
                                        </div>
                                    </div>

                                    <div className="p-6">
                                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                                            {habitacion.nombre}
                                        </h3>
                                        <p className="text-gray-600 mb-4">
                                            {habitacion.descripcion}
                                        </p>

                                        <div className="flex flex-wrap gap-2 mb-4">
                                            {habitacion.amenidades.slice(0, 4).map((amenidad, idx) => (
                                                <div
                                                    key={idx}
                                                    className="flex items-center gap-1 text-xs bg-gray-100 px-2 py-1 rounded-full"
                                                >
                                                    {amenidadesIconos[amenidad]}
                                                    <span>{amenidad}</span>
                                                </div>
                                            ))}
                                        </div>

                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => addToCart(habitacion)}
                                                className="flex-1 bg-amber-500 hover:bg-amber-600 text-white font-bold py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
                                            >
                                                <Plus className="w-4 h-4" />
                                                Agregar
                                            </button>
                                            <button
                                                onClick={() => setSelectedRoom(habitacion)}
                                                className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-900 font-bold py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
                                            >
                                                Ver Más
                                                <ArrowRight className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Room Details Modal */}
                {selectedRoom && (
                    <RoomDetailsModal
                        habitacion={selectedRoom}
                        onClose={() => setSelectedRoom(null)}
                        onAddToCart={addToCart}
                    />
                )}
            </main>

            <Footer />
        </div>
    );
}

export default function HabitacionesPage() {
    return (
        <Suspense fallback={
            <div className="flex flex-col min-h-screen bg-gray-50">
                <Header logo={headerData.logo} />
                <main className="flex-1 flex items-center justify-center">
                    <div className="text-center">
                        <p className="text-xl text-gray-600">Cargando habitaciones...</p>
                    </div>
                </main>
                <Footer />
            </div>
        }>
            <HabitacionesContent />
        </Suspense>
    );
}
