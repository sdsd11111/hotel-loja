'use client';

import React, { useState, useEffect } from 'react';
import { Star, Shield, Lock, Award, CheckCircle, Zap, TrendingUp, Users } from 'lucide-react';

// Mock Data for Reviews
const reviews = [
    {
        id: 1,
        name: "María Fernanda T.",
        text: "Una experiencia inolvidable. La ubicación es perfecta para explorar Cuenca y el servicio es impecable. Definitivamente volveré.",
        rating: 5,
        source: "TripAdvisor",
        date: "Hace 2 semanas"
    },
    {
        id: 2,
        name: "John Smith",
        text: "Excellent hotel! The staff was very friendly and the room was clean and comfortable. Great value for money.",
        rating: 4.8,
        source: "Booking.com",
        date: "Hace 1 mes"
    },
    {
        id: 3,
        name: "Carlos R.",
        text: "La mejor opción en Cuenca. El desayuno es delicioso y las instalaciones son modernas y seguras. Muy recomendado.",
        rating: 4.9,
        source: "Google Reviews",
        date: "Hace 3 semanas"
    }
];

// Mock Data for Trust Seals
const trustSeals = [
    {
        id: 'pci',
        label: 'PCI-DSS Compliant',
        sublabel: 'Pago Seguro',
        icon: <Lock className="w-8 h-8 text-green-600" />,
        color: 'bg-green-50 border-green-100'
    },
    {
        id: 'ssl',
        label: 'SSL Encrypted',
        sublabel: 'Conexión Cifrada',
        icon: <Shield className="w-8 h-8 text-blue-600" />,
        color: 'bg-blue-50 border-blue-100'
    },
    {
        id: 'lopdp',
        label: 'Cumplimiento LOPDP',
        sublabel: 'Protección de Datos',
        icon: <CheckCircle className="w-8 h-8 text-gray-600" />,
        color: 'bg-gray-50 border-gray-200'
    },
    {
        id: 'quality',
        label: 'Calidad Garantizada',
        sublabel: 'Excelencia en Servicio',
        icon: <Award className="w-8 h-8 text-yellow-500" />,
        color: 'bg-yellow-50 border-yellow-100'
    }
];

// Performance metrics
const performanceMetrics = [
    {
        id: 'speed',
        label: 'Velocidad de Reserva',
        value: '< 2 min',
        description: 'Proceso de reserva optimizado',
        icon: <Zap className="w-10 h-10 text-yellow-500" />,
        color: 'bg-yellow-50 border-yellow-200'
    },
    {
        id: 'uptime',
        label: 'Disponibilidad',
        value: '99.9%',
        description: 'Sistema siempre activo',
        icon: <TrendingUp className="w-10 h-10 text-green-600" />,
        color: 'bg-green-50 border-green-200'
    },
    {
        id: 'satisfaction',
        label: 'Satisfacción',
        value: '9.1/10',
        description: 'Calificación promedio',
        icon: <Users className="w-10 h-10 text-blue-600" />,
        color: 'bg-blue-50 border-blue-200'
    }
];

type TabType = 'reviews' | 'security' | 'performance';

export const ConfianzaCredibilidad = () => {
    const [currentReview, setCurrentReview] = useState(0);
    const [activeTab, setActiveTab] = useState<TabType>('reviews');

    // Auto-rotate reviews
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentReview((prev) => (prev + 1) % reviews.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    const tabs = [
        { id: 'reviews' as TabType, label: 'Reseñas y Validación', icon: <Star className="w-5 h-5" /> },
        { id: 'security' as TabType, label: 'Seguridad y Protección', icon: <Shield className="w-5 h-5" /> },
        { id: 'performance' as TabType, label: 'Alto Rendimiento', icon: <Zap className="w-5 h-5" /> }
    ];

    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-4">
                {/* Section Title */}
                <div className="text-center mb-12 max-w-3xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        Su Experiencia en Cuenca Comienza Aquí: <span className="text-blue-600">Plataforma de Alto Rendimiento y Confianza Total.</span>
                    </h2>
                    <div className="w-24 h-1 bg-yellow-400 mx-auto rounded-full"></div>
                </div>

                {/* Tabs Navigation */}
                <div className="flex flex-col sm:flex-row justify-center gap-2 sm:gap-4 mb-12 max-w-4xl mx-auto">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center justify-center gap-2 px-6 py-4 rounded-lg font-bold text-sm md:text-base transition-all duration-300 ${activeTab === tab.id
                                ? 'bg-blue-600 text-white shadow-lg scale-105'
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                }`}
                        >
                            {tab.icon}
                            <span>{tab.label}</span>
                        </button>
                    ))}
                </div>

                {/* Tab Content */}
                <div className="max-w-5xl mx-auto">
                    {/* Reviews Tab */}
                    {activeTab === 'reviews' && (
                        <div className="animate-fadeIn">
                            <div className="text-center mb-10 max-w-2xl mx-auto">
                                <p className="text-lg text-gray-600 leading-relaxed">
                                    Hemos sido validados por miles de huéspedes. Con una calificación consistente entre <span className="font-bold text-gray-900">8.5 y 9.1</span>, nuestras reseñas en plataformas globales hablan por sí solas.
                                </p>
                            </div>

                            {/* Reviews Carousel */}
                            <div className="relative max-w-4xl mx-auto bg-gray-50 rounded-2xl p-8 md:p-12 shadow-sm border border-gray-100">
                                {/* Quote Icon */}
                                <div className="absolute top-6 left-8 text-blue-100">
                                    <svg width="60" height="60" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H15.017C14.4647 8 14.017 8.44772 14.017 9V11C14.017 11.5523 13.5693 12 13.017 12H12.017V5H22.017V15C22.017 18.3137 19.3307 21 16.017 21H14.017ZM5.01697 21L5.01697 18C5.01697 16.8954 5.9124 16 7.01697 16H10.017C10.5693 16 11.017 15.5523 11.017 15V9C11.017 8.44772 10.5693 8 10.017 8H6.01697C5.46468 8 5.01697 8.44772 5.01697 9V11C5.01697 11.5523 4.56925 12 4.01697 12H3.01697V5H13.017V15C13.017 18.3137 10.3307 21 7.01697 21H5.01697Z" />
                                    </svg>
                                </div>

                                <div className="relative z-10 flex flex-col items-center text-center">
                                    {/* Stars */}
                                    <div className="flex gap-1 mb-6">
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                className={`w-6 h-6 ${i < Math.floor(reviews[currentReview].rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                                            />
                                        ))}
                                    </div>

                                    {/* Review Text */}
                                    <p className="text-xl md:text-2xl text-gray-800 font-medium italic mb-8 leading-relaxed">
                                        "{reviews[currentReview].text}"
                                    </p>

                                    {/* Author & Source */}
                                    <div className="flex flex-col items-center">
                                        <span className="font-bold text-gray-900 text-lg">{reviews[currentReview].name}</span>
                                        <div className="flex items-center gap-2 mt-2 text-sm text-gray-500">
                                            <span className="font-medium text-blue-600">Verificado por {reviews[currentReview].source}</span>
                                            <span>•</span>
                                            <span>{reviews[currentReview].date}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Carousel Indicators */}
                                <div className="flex justify-center gap-2 mt-8">
                                    {reviews.map((_, index) => (
                                        <button
                                            key={index}
                                            onClick={() => setCurrentReview(index)}
                                            className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentReview ? 'bg-blue-600 w-8' : 'bg-gray-300 hover:bg-gray-400'}`}
                                            aria-label={`Ver reseña ${index + 1}`}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Security Tab */}
                    {activeTab === 'security' && (
                        <div className="animate-fadeIn">
                            <div className="text-center mb-12 max-w-2xl mx-auto">
                                <h3 className="text-2xl font-bold text-gray-900 mb-4">Seguridad y Protección Garantizada</h3>
                                <p className="text-gray-600">
                                    Su transacción es de alto valor. Por eso, la seguridad es un factor no negociable. Garantizamos que su información personal (PII) y de pago está siempre protegida.
                                </p>
                            </div>

                            {/* Trust Seals Grid */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                                {trustSeals.map((seal) => (
                                    <div
                                        key={seal.id}
                                        className={`flex flex-col items-center justify-center p-6 rounded-xl border ${seal.color} transition-transform hover:scale-105`}
                                    >
                                        <div className="mb-3">
                                            {seal.icon}
                                        </div>
                                        <span className="font-bold text-gray-900 text-sm md:text-base text-center">{seal.label}</span>
                                        <span className="text-xs text-gray-500 mt-1 text-center">{seal.sublabel}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Performance Tab */}
                    {activeTab === 'performance' && (
                        <div className="animate-fadeIn">
                            <div className="text-center mb-12 max-w-2xl mx-auto">
                                <h3 className="text-2xl font-bold text-gray-900 mb-4">Plataforma de Alto Rendimiento</h3>
                                <p className="text-gray-600">
                                    Nuestro sistema está optimizado para brindarle la mejor experiencia. Reservas rápidas, disponibilidad garantizada y satisfacción comprobada.
                                </p>
                            </div>

                            {/* Performance Metrics */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                {performanceMetrics.map((metric) => (
                                    <div
                                        key={metric.id}
                                        className={`flex flex-col items-center justify-center p-8 rounded-2xl border-2 ${metric.color} transition-transform hover:scale-105`}
                                    >
                                        <div className="mb-4">
                                            {metric.icon}
                                        </div>
                                        <div className="text-4xl font-bold text-gray-900 mb-2">{metric.value}</div>
                                        <div className="font-bold text-gray-900 text-lg mb-1">{metric.label}</div>
                                        <div className="text-sm text-gray-600 text-center">{metric.description}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <style jsx>{`
                @keyframes fadeIn {
                    from {
                        opacity: 0;
                        transform: translateY(10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                .animate-fadeIn {
                    animation: fadeIn 0.4s ease-out;
                }
            `}</style>
        </section>
    );
};
