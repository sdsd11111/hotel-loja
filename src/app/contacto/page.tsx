'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { headerData } from '@/types';
import {
    Phone,
    Mail,
    MapPin,
    Clock,
    Send,
    CheckCircle,
    Shield,
    Calendar,
    Users,
    Bed,
    Plus,
    Minus
} from 'lucide-react';

// Links de navegación a servicios
const serviciosLinks = [
    { label: 'Habitaciones', href: '/habitaciones' },
    { label: 'Servicios', href: '/servicios' },
    { label: 'Galería', href: '/galeria' }
];

// Información de contacto
const contactInfo = [
    {
        id: 1,
        icono: <Phone className="w-6 h-6" />,
        titulo: 'Teléfono Recepción (24h)',
        detalle: '+593 96 341 0409',
        link: 'tel:+593963410409'
    },
    {
        id: 2,
        icono: <Mail className="w-6 h-6" />,
        titulo: 'Correo Electrónico',
        detalle: 'info@hotelloja.com',
        link: 'mailto:info@hotelloja.com'
    },
    {
        id: 3,
        icono: <MapPin className="w-6 h-6" />,
        titulo: 'Dirección',
        detalle: 'Juan Jose Pequeña entre Alonso de Mercadillo y Azuay, Cuenca, Ecuador',
        link: 'https://maps.app.goo.gl/M3W6xPt8dZPtytmy7'
    },
    {
        id: 4,
        icono: <Clock className="w-6 h-6" />,
        titulo: 'Horarios',
        detalle: 'Recepción 24h / Oficina de Ventas 9:00 - 18:00',
        link: null
    }
];

// Tipos de habitaciones disponibles
const tiposHabitacion = [
    'Suite Ejecutiva',
    'Doble Familiar',
    'Habitación Estándar Confort',
    'Suite Premium Deluxe',
    'Triple Confort',
    'Suite Junior',
    'Habitación Individual',
    'Suite Familiar Grande',
    'Habitación Doble Estándar',
    'Suite Presidencial',
    'Habitación Económica',
    'Cuádruple Familiar'
];

function ContactoContent() {
    const searchParams = useSearchParams();

    const [formData, setFormData] = useState({
        nombre: '',
        email: '',
        telefono: '',
        motivo: '',
        // Campos de reserva
        fechaEntrada: '',
        fechaSalida: '',
        adultos: 2,
        ninos: 0,
        habitacion: '',
        // Mensaje
        mensaje: '',
        aceptaPrivacidad: false
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [noches, setNoches] = useState(0);

    // Pre-fill form from URL parameters
    useEffect(() => {
        const motivo = searchParams.get('motivo');
        const mensaje = searchParams.get('mensaje');
        const fechaEntrada = searchParams.get('entrada');
        const fechaSalida = searchParams.get('salida');
        const adultos = searchParams.get('adultos');
        const ninos = searchParams.get('ninos');
        const habitacion = searchParams.get('habitacion');

        if (motivo || mensaje || fechaEntrada || habitacion) {
            setFormData(prev => ({
                ...prev,
                motivo: motivo || prev.motivo,
                mensaje: mensaje ? decodeURIComponent(mensaje) : prev.mensaje,
                fechaEntrada: fechaEntrada || prev.fechaEntrada,
                fechaSalida: fechaSalida || prev.fechaSalida,
                adultos: adultos ? parseInt(adultos) : prev.adultos,
                ninos: ninos ? parseInt(ninos) : prev.ninos,
                habitacion: habitacion ? decodeURIComponent(habitacion) : prev.habitacion
            }));
        }
    }, [searchParams]);

    // Calculate nights when dates change
    useEffect(() => {
        if (formData.fechaEntrada && formData.fechaSalida) {
            const entrada = new Date(formData.fechaEntrada);
            const salida = new Date(formData.fechaSalida);
            const diffTime = Math.abs(salida.getTime() - entrada.getTime());
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            setNoches(diffDays);
        } else {
            setNoches(0);
        }
    }, [formData.fechaEntrada, formData.fechaSalida]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.aceptaPrivacidad) {
            alert('Debe aceptar la Política de Privacidad para continuar.');
            return;
        }

        setIsSubmitting(true);

        // Simular envío (aquí iría la Server Action real)
        setTimeout(() => {
            console.log('Formulario enviado:', formData);
            setSubmitStatus('success');
            setIsSubmitting(false);

            // Reset form
            setFormData({
                nombre: '',
                email: '',
                telefono: '',
                motivo: '',
                fechaEntrada: '',
                fechaSalida: '',
                adultos: 2,
                ninos: 0,
                habitacion: '',
                mensaje: '',
                aceptaPrivacidad: false
            });

            // Reset success message after 5 seconds
            setTimeout(() => setSubmitStatus('idle'), 5000);
        }, 1500);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;

        if (type === 'checkbox') {
            const checked = (e.target as HTMLInputElement).checked;
            setFormData(prev => ({ ...prev, [name]: checked }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleIncrement = (field: 'adultos' | 'ninos') => {
        setFormData(prev => ({
            ...prev,
            [field]: prev[field] + 1
        }));
    };

    const handleDecrement = (field: 'adultos' | 'ninos') => {
        setFormData(prev => ({
            ...prev,
            [field]: Math.max(field === 'adultos' ? 1 : 0, prev[field] - 1)
        }));
    };

    const esReservaHabitacion = formData.motivo === 'reservas' || formData.motivo === 'Reserva de Habitación';

    return (
        <div className="flex flex-col min-h-screen">
            <Header logo={headerData.logo} />

            <main className="flex-1">
                {/* Hero Section */}
                <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden">
                    <Image
                        src="/images/contacto/hero-contacto.webp"
                        alt="Contacto Hotel Puente Roto"
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50"></div>

                    <div className="relative z-10 container mx-auto px-4 text-center text-white">
                        <h1 className="text-4xl md:text-6xl font-bold mb-4">
                            Contáctenos
                        </h1>
                        <p className="text-xl md:text-2xl mb-6">
                            Asesoría personalizada y soporte 24/7
                        </p>

                        {/* Secondary Navigation */}
                        <div className="flex flex-wrap justify-center gap-4 mt-8">
                            {serviciosLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className="px-6 py-2 bg-white/10 backdrop-blur-md hover:bg-white/20 rounded-full transition-all duration-300 text-sm font-semibold"
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Contact Info Cards */}
                <section className="py-16 bg-gray-50">
                    <div className="container mx-auto px-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {contactInfo.map((info) => (
                                <div
                                    key={info.id}
                                    className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300"
                                >
                                    <div className="flex items-start gap-4">
                                        <div className="flex-shrink-0 w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center text-amber-600">
                                            {info.icono}
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="font-bold text-gray-900 mb-1">{info.titulo}</h3>
                                            {info.link ? (
                                                <a
                                                    href={info.link}
                                                    className="text-gray-600 hover:text-amber-600 transition-colors text-sm"
                                                    target={info.link.startsWith('http') ? '_blank' : undefined}
                                                    rel={info.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                                                >
                                                    {info.detalle}
                                                </a>
                                            ) : (
                                                <p className="text-gray-600 text-sm">{info.detalle}</p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Contact Form */}
                <section id="formulario-contacto" className="py-16 bg-white">
                    <div className="container mx-auto px-4">
                        <div className="max-w-4xl mx-auto">
                            <div className="text-center mb-12">
                                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                                    Envíenos un Mensaje
                                </h2>
                                <p className="text-lg text-gray-600">
                                    Complete el formulario y nos pondremos en contacto con usted lo antes posible
                                </p>
                            </div>

                            {/* Success Message */}
                            {submitStatus === 'success' && (
                                <div className="mb-8 p-6 bg-green-50 border-l-4 border-green-500 rounded-lg flex items-center gap-3">
                                    <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0" />
                                    <div>
                                        <h3 className="font-bold text-green-900">¡Mensaje enviado exitosamente!</h3>
                                        <p className="text-green-700 text-sm">Nos pondremos en contacto con usted pronto.</p>
                                    </div>
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="bg-gray-50 p-8 rounded-2xl shadow-lg">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Nombre Completo */}
                                    <div className="md:col-span-2">
                                        <label htmlFor="nombre" className="block text-sm font-semibold text-gray-700 mb-2">
                                            Nombre Completo *
                                        </label>
                                        <input
                                            type="text"
                                            id="nombre"
                                            name="nombre"
                                            value={formData.nombre}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-amber-500 focus:outline-none"
                                            placeholder="Juan Pérez"
                                        />
                                    </div>

                                    {/* Email */}
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                                            Correo Electrónico *
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-amber-500 focus:outline-none"
                                            placeholder="juan@ejemplo.com"
                                        />
                                    </div>

                                    {/* Teléfono */}
                                    <div>
                                        <label htmlFor="telefono" className="block text-sm font-semibold text-gray-700 mb-2">
                                            Teléfono *
                                        </label>
                                        <input
                                            type="tel"
                                            id="telefono"
                                            name="telefono"
                                            value={formData.telefono}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-amber-500 focus:outline-none"
                                            placeholder="0987654321"
                                        />
                                    </div>

                                    {/* Motivo */}
                                    <div className="md:col-span-2">
                                        <label htmlFor="motivo" className="block text-sm font-semibold text-gray-700 mb-2">
                                            Motivo de Consulta *
                                        </label>
                                        <select
                                            id="motivo"
                                            name="motivo"
                                            value={formData.motivo}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-amber-500 focus:outline-none"
                                        >
                                            <option value="">Seleccione un motivo</option>
                                            <option value="Reserva de Habitación">Reserva de Habitación</option>
                                            <option value="Reserva de Mesa">Reserva de Mesa - Restaurante</option>
                                            <option value="Eventos">Eventos y Convenciones</option>
                                            <option value="Tours">Tours y Experiencias</option>
                                            <option value="Información General">Información General</option>
                                            <option value="Quejas y Sugerencias">Quejas y Sugerencias</option>
                                            <option value="Otro">Otro</option>
                                        </select>
                                    </div>

                                    {/* Campos adicionales para Reserva de Habitación */}
                                    {esReservaHabitacion && (
                                        <>
                                            {/* Fechas */}
                                            <div>
                                                <label htmlFor="fechaEntrada" className="block text-sm font-semibold text-gray-700 mb-2">
                                                    <Calendar className="w-4 h-4 inline mr-1" />
                                                    Fecha de Entrada *
                                                </label>
                                                <input
                                                    type="date"
                                                    id="fechaEntrada"
                                                    name="fechaEntrada"
                                                    value={formData.fechaEntrada}
                                                    onChange={handleChange}
                                                    required
                                                    min={new Date().toISOString().split('T')[0]}
                                                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-amber-500 focus:outline-none"
                                                />
                                            </div>

                                            <div>
                                                <label htmlFor="fechaSalida" className="block text-sm font-semibold text-gray-700 mb-2">
                                                    <Calendar className="w-4 h-4 inline mr-1" />
                                                    Fecha de Salida *
                                                </label>
                                                <input
                                                    type="date"
                                                    id="fechaSalida"
                                                    name="fechaSalida"
                                                    value={formData.fechaSalida}
                                                    onChange={handleChange}
                                                    required
                                                    min={formData.fechaEntrada || new Date().toISOString().split('T')[0]}
                                                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-amber-500 focus:outline-none"
                                                />
                                            </div>

                                            {/* Noches */}
                                            {noches > 0 && (
                                                <div className="md:col-span-2">
                                                    <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded">
                                                        <p className="text-amber-800 font-semibold">
                                                            Total: {noches} {noches === 1 ? 'noche' : 'noches'}
                                                        </p>
                                                    </div>
                                                </div>
                                            )}

                                            {/* Huéspedes */}
                                            <div>
                                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                    <Users className="w-4 h-4 inline mr-1" />
                                                    Adultos *
                                                </label>
                                                <div className="flex items-center gap-3">
                                                    <button
                                                        type="button"
                                                        onClick={() => handleDecrement('adultos')}
                                                        className="w-10 h-10 bg-gray-200 hover:bg-gray-300 rounded-lg flex items-center justify-center transition-colors"
                                                    >
                                                        <Minus className="w-4 h-4" />
                                                    </button>
                                                    <span className="flex-1 text-center font-bold text-lg">{formData.adultos}</span>
                                                    <button
                                                        type="button"
                                                        onClick={() => handleIncrement('adultos')}
                                                        className="w-10 h-10 bg-gray-200 hover:bg-gray-300 rounded-lg flex items-center justify-center transition-colors"
                                                    >
                                                        <Plus className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </div>

                                            <div>
                                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                    <Users className="w-4 h-4 inline mr-1" />
                                                    Niños
                                                </label>
                                                <div className="flex items-center gap-3">
                                                    <button
                                                        type="button"
                                                        onClick={() => handleDecrement('ninos')}
                                                        className="w-10 h-10 bg-gray-200 hover:bg-gray-300 rounded-lg flex items-center justify-center transition-colors"
                                                    >
                                                        <Minus className="w-4 h-4" />
                                                    </button>
                                                    <span className="flex-1 text-center font-bold text-lg">{formData.ninos}</span>
                                                    <button
                                                        type="button"
                                                        onClick={() => handleIncrement('ninos')}
                                                        className="w-10 h-10 bg-gray-200 hover:bg-gray-300 rounded-lg flex items-center justify-center transition-colors"
                                                    >
                                                        <Plus className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </div>

                                            {/* Tipo de Habitación */}
                                            <div className="md:col-span-2">
                                                <label htmlFor="habitacion" className="block text-sm font-semibold text-gray-700 mb-2">
                                                    <Bed className="w-4 h-4 inline mr-1" />
                                                    Tipo de Habitación (Opcional)
                                                </label>
                                                <select
                                                    id="habitacion"
                                                    name="habitacion"
                                                    value={formData.habitacion}
                                                    onChange={handleChange}
                                                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-amber-500 focus:outline-none"
                                                >
                                                    <option value="">Sin preferencia</option>
                                                    {tiposHabitacion.map((tipo) => (
                                                        <option key={tipo} value={tipo}>{tipo}</option>
                                                    ))}
                                                </select>
                                            </div>
                                        </>
                                    )}

                                    {/* Mensaje */}
                                    <div className="md:col-span-2">
                                        <label htmlFor="mensaje" className="block text-sm font-semibold text-gray-700 mb-2">
                                            Mensaje {!esReservaHabitacion && '*'}
                                        </label>
                                        <textarea
                                            id="mensaje"
                                            name="mensaje"
                                            value={formData.mensaje}
                                            onChange={handleChange}
                                            required={!esReservaHabitacion}
                                            rows={5}
                                            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-amber-500 focus:outline-none resize-none"
                                            placeholder={esReservaHabitacion ? "Información adicional (opcional)..." : "Escriba su mensaje aquí..."}
                                        ></textarea>
                                        {esReservaHabitacion && (
                                            <p className="text-xs text-gray-500 mt-1">
                                                Opcional: Agregue cualquier solicitud especial o información adicional
                                            </p>
                                        )}
                                    </div>

                                    {/* Política de Privacidad */}
                                    <div className="md:col-span-2">
                                        <label className="flex items-start gap-3 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                name="aceptaPrivacidad"
                                                checked={formData.aceptaPrivacidad}
                                                onChange={handleChange}
                                                required
                                                className="mt-1 w-5 h-5 text-amber-600 border-gray-300 rounded focus:ring-amber-500"
                                            />
                                            <span className="text-sm text-gray-700">
                                                Acepto la{' '}
                                                <Link href="/privacidad" className="text-amber-600 hover:underline font-semibold" target="_blank">
                                                    Política de Privacidad
                                                </Link>{' '}
                                                y autorizo el tratamiento de mis datos personales *
                                            </span>
                                        </label>
                                    </div>

                                    {/* Submit Button */}
                                    <div className="md:col-span-2">
                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="w-full bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white font-bold py-4 px-8 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                        >
                                            {isSubmitting ? (
                                                <>
                                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                                    Enviando...
                                                </>
                                            ) : (
                                                <>
                                                    <Send className="w-5 h-5" />
                                                    Enviar Mensaje
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </section>

                {/* Map Section */}
                <section className="py-16 bg-gray-50">
                    <div className="container mx-auto px-4">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                                Nuestra Ubicación
                            </h2>
                            <p className="text-lg text-gray-600">
                                Encuéntrenos en el corazón de Cuenca
                            </p>
                        </div>

                        <div className="max-w-5xl mx-auto">
                            <div className="rounded-2xl overflow-hidden shadow-xl">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3984.720836267368!2d-79.00636892526686!3d-2.896756897079634!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x91cd22a54825656b%3A0x637995655f417d45!2sCuenca%2C%20Ecuador!5e0!3m2!1ses!2sus!4v1701720000000!5m2!1ses!2sus"
                                    width="100%"
                                    height="450"
                                    style={{ border: 0 }}
                                    allowFullScreen
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    title="Ubicación Hotel Puente Roto"
                                ></iframe>
                            </div>
                            <div className="text-center mt-6">
                                <a
                                    href="https://maps.app.goo.gl/M3W6xPt8dZPtytmy7"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 text-amber-600 hover:text-amber-700 font-semibold transition-colors"
                                >
                                    <MapPin className="w-5 h-5" />
                                    Ver ubicación exacta en Google Maps
                                </a>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}

export default function ContactoPage() {
    return (
        <React.Suspense fallback={<div className="min-h-screen flex items-center justify-center">Cargando...</div>}>
            <ContactoContent />
        </React.Suspense>
    );
}
