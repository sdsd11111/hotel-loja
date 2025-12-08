'use client';

import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

// FAQ Data
const faqs = [
    {
        id: 1,
        question: "¿Por qué debería reservar directamente en esta web en lugar de usar Booking.com o Expedia?",
        answer: "Al reservar directamente, garantizamos la Mejor Tarifa Garantizada y accede a promociones exclusivas, servicios adicionales gratuitos o descuentos especiales que no encontrará en las OTAs. ¡Es nuestra forma de recompensar su reserva directa!"
    },
    {
        id: 2,
        question: "¿Cómo puedo estar seguro de que el precio y la disponibilidad están actualizados?",
        answer: "Utilizamos una arquitectura híbrida de Next.js. El Motor de Reservas se comunica en tiempo real con nuestro Sistema de Gestión de Propiedades (PMS), asegurando que las tarifas y la disponibilidad mostradas sean siempre precisas e inmediatas."
    },
    {
        id: 3,
        question: "¿Mis datos personales y de pago están seguros en esta plataforma?",
        answer: "Absolutamente. Utilizamos Server Components de Next.js para gestionar claves de API y proteger los datos sensibles. Toda transacción cumple con los estándares PCI-DSS y resguardamos su PII (información de identificación personal) conforme a la LOPDP de Ecuador."
    },
    {
        id: 4,
        question: "¿Qué es la Ley Orgánica de Protección de Datos Personales (LOPDP) de Ecuador y cómo me afecta?",
        answer: "Es la ley que protege sus datos. Por su seguridad, requerimos su consentimiento explícito mediante checkboxes no premarcados en el formulario de reserva. Usted tiene el Derecho ARCO (acceso, rectificación, cancelación y oposición) a sus datos en todo momento."
    },
    {
        id: 5,
        question: "¿El hotel está cerca de los principales atractivos de Cuenca?",
        answer: "Sí. Nuestro hotel es el punto de partida ideal. Estamos estratégicamente ubicados para acceder fácilmente al Parque Nacional Cajas, el centro histórico (Patrimonio de la Humanidad), los miradores del Turi, el Barranco del Tomebamba y otros sitios clave de la riqueza natural y cultural de Cuenca."
    }
];

export const FAQ = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggleAccordion = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-4">
                {/* Section Header */}
                <div className="text-center mb-16 max-w-3xl mx-auto">
                    <div className="inline-flex items-center justify-center p-3 bg-blue-50 rounded-full mb-4">
                        <HelpCircle className="w-6 h-6 text-blue-600" />
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                        Resolvemos sus Dudas: <span className="text-blue-600">Preguntas Frecuentes (FAQ)</span>
                    </h2>
                    <p className="text-lg text-gray-600 leading-relaxed">
                        Nuestro objetivo es que su experiencia de reserva sea transparente y sin fricciones. Aquí respondemos a las preguntas más comunes sobre tarifas, servicios y la legislación local.
                    </p>
                </div>

                {/* Accordion */}
                <div className="max-w-3xl mx-auto space-y-4">
                    {faqs.map((faq, index) => (
                        <div
                            key={faq.id}
                            className={`border rounded-xl overflow-hidden transition-all duration-300 ${openIndex === index
                                ? 'border-blue-200 shadow-md bg-blue-50/30'
                                : 'border-gray-200 hover:border-blue-100 hover:bg-gray-50'
                                }`}
                        >
                            <button
                                onClick={() => toggleAccordion(index)}
                                className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
                                aria-expanded={openIndex === index}
                            >
                                <span className={`font-bold text-lg ${openIndex === index ? 'text-blue-700' : 'text-gray-800'}`}>
                                    {faq.question}
                                </span>
                                <span className={`ml-4 flex-shrink-0 transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`}>
                                    {openIndex === index ? (
                                        <ChevronUp className="w-5 h-5 text-blue-600" />
                                    ) : (
                                        <ChevronDown className="w-5 h-5 text-gray-400" />
                                    )}
                                </span>
                            </button>

                            <div
                                className={`transition-all duration-300 ease-in-out overflow-hidden ${openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                                    }`}
                            >
                                <div className="p-6 pt-0 text-gray-600 leading-relaxed border-t border-blue-100/50">
                                    {faq.answer}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
