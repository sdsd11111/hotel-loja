"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import ReservationSearchPanel from '@/components/ReservationSearchPanel';
import { NuestraPropuesta } from "@/components/NuestraPropuesta";
import { AmenidadesCarousel } from "@/components/AmenidadesCarousel";
import { HabitacionesHome } from "@/components/HabitacionesHome";
import { GaleriaPreview } from "@/components/GaleriaPreview";
import { ConfianzaCredibilidad } from "@/components/ConfianzaCredibilidad";
import { RestauranteHome } from "@/components/RestauranteHome";
import { FAQ } from "@/components/FAQ";
import { headerData } from "@/types";
import { ChevronLeft, ChevronRight, Calendar, Filter, Plus, Minus, Users } from 'lucide-react';

interface HeaderProps {
  logo: string;
  navItems: { label: string; href: string }[];
  className?: string;
}

// Hero slides data
const heroSlides = [
  {
    id: 1,
    image: '/images/hero/hero-main.webp',
    title: 'Hotel Puente Roto',
    subtitle: 'Experiencia Premium en el Corazón de Cuenca',
    description: 'Confort, elegancia y hospitalidad excepcional en el destino más encantador del sur de Ecuador.'
  },
  {
    id: 2,
    image: '/images/hero/hero-services.webp',
    title: 'Servicios Exclusivos',
    subtitle: 'Todo lo que Necesita para una Estadía Perfecta',
    description: 'Restaurante gourmet, spa de lujo, salas de eventos y atención personalizada las 24 horas.'
  }
];

export default function Home() {
  const router = useRouter();

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoRotating, setIsAutoRotating] = useState(true);

  // Reservation search state
  const [fechaEntrada, setFechaEntrada] = useState('');
  const [fechaSalida, setFechaSalida] = useState('');
  const [adultos, setAdultos] = useState(2);
  const [ninos, setNinos] = useState(0);

  // Handle search/reservation
  const handleBuscarHabitaciones = () => {
    const params = new URLSearchParams();
    if (fechaEntrada) params.set('entrada', fechaEntrada);
    if (fechaSalida) params.set('salida', fechaSalida);
    if (adultos > 0) params.set('adultos', adultos.toString());
    if (ninos > 0) params.set('ninos', ninos.toString());

    router.push(`/habitaciones?${params.toString()}`);
  };

  // Auto-rotation
  useEffect(() => {
    if (!isAutoRotating) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000); // Change slide every 6 seconds

    return () => clearInterval(interval);
  }, [isAutoRotating]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoRotating(false);
    setTimeout(() => setIsAutoRotating(true), 15000); // Resume after 15 seconds
  };

  const goToPrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
    setIsAutoRotating(false);
    setTimeout(() => setIsAutoRotating(true), 15000);
  };

  const goToNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    setIsAutoRotating(false);
    setTimeout(() => setIsAutoRotating(true), 15000);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header
        logo={headerData.logo}
        showReservationSearch={true}
        reservationSearchProps={{
          fechaEntrada,
          fechaSalida,
          onFechaEntradaChange: setFechaEntrada,
          onFechaSalidaChange: setFechaSalida,
          adultos,
          ninos,
          onAdultosChange: setAdultos,
          onNinosChange: setNinos,
          onReservarClick: handleBuscarHabitaciones
        }}
      />

      <main className="flex-1 flex flex-col">
        {/* Hero Slider - 70% del viewport */}
        <div className="relative w-full h-[70vh] overflow-hidden">
          {/* Slides */}
          {heroSlides.map((slide, index) => (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
                }`}
            >
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                className="object-cover"
                priority={index === 0}
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/60"></div>

              {/* Contenido del slide */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="max-w-5xl mx-auto text-center px-4">
                  <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
                    {slide.title}
                  </h1>
                  <div className="w-24 h-1 bg-yellow-400 mx-auto my-6"></div>
                  <h2 className="text-2xl md:text-3xl lg:text-4xl text-white/90 font-medium">
                    {slide.subtitle}
                  </h2>
                  <p className="text-lg md:text-xl text-white/80 mt-6 max-w-3xl mx-auto">
                    {slide.description}
                  </p>
                </div>
              </div>
            </div>
          ))}

          {/* Navigation Arrows - Professional Design */}
          <button
            onClick={goToPrevSlide}
            className="absolute left-0 top-0 bottom-0 z-20 group w-16 md:w-20 bg-gradient-to-r from-black/30 to-transparent hover:from-black/50 transition-all duration-300"
            aria-label="Slide anterior"
          >
            <div className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 flex items-center">
              <div className="w-8 h-16 border-l-2 border-white/60 group-hover:border-yellow-400 transition-all duration-300"></div>
              <ChevronLeft className="w-6 h-6 md:w-7 md:h-7 text-white/80 group-hover:text-yellow-400 -ml-3 transition-all duration-300 group-hover:scale-125" />
            </div>
          </button>

          <button
            onClick={goToNextSlide}
            className="absolute right-0 top-0 bottom-0 z-20 group w-16 md:w-20 bg-gradient-to-l from-black/30 to-transparent hover:from-black/50 transition-all duration-300"
            aria-label="Siguiente slide"
          >
            <div className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 flex items-center">
              <ChevronRight className="w-6 h-6 md:w-7 md:h-7 text-white/80 group-hover:text-yellow-400 -mr-3 transition-all duration-300 group-hover:scale-125" />
              <div className="w-8 h-16 border-r-2 border-white/60 group-hover:border-yellow-400 transition-all duration-300"></div>
            </div>
          </button>

          {/* Dots Indicator */}
          <div className="absolute bottom-8 left-0 right-0 z-20 flex justify-center gap-3">
            {heroSlides.map((slide, index) => (
              <button
                key={slide.id}
                onClick={() => goToSlide(index)}
                className={`h-2.5 rounded-full transition-all duration-300 ${index === currentSlide
                  ? 'bg-yellow-400 w-12'
                  : 'bg-white/50 hover:bg-white/70 w-2.5'
                  }`}
                aria-label={`Ir a slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Reservation Search Panel - Floating between sections */}
        <div className="relative -mt-20 mb-8 z-30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl border-4 border-amber-500">
              <div className="px-6 py-6">
                <div className="flex flex-wrap items-end justify-center gap-3">
                  {/* Check-in */}
                  <div className="flex-shrink-0">
                    <label className="block text-xs font-bold text-gray-700 mb-1 text-center">
                      ENTRADA
                    </label>
                    <input
                      type="date"
                      value={fechaEntrada}
                      onChange={(e) => setFechaEntrada(e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                      className="w-32 px-2 py-2 text-sm border-2 border-gray-300 rounded-lg focus:border-amber-500 focus:outline-none"
                    />
                  </div>

                  {/* Arrow */}
                  <div className="flex-shrink-0 pb-6">
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  </div>

                  {/* Check-out */}
                  <div className="flex-shrink-0">
                    <label className="block text-xs font-bold text-gray-700 mb-1 text-center">
                      SALIDA
                    </label>
                    <input
                      type="date"
                      value={fechaSalida}
                      onChange={(e) => setFechaSalida(e.target.value)}
                      min={fechaEntrada || new Date().toISOString().split('T')[0]}
                      className="w-32 px-2 py-2 text-sm border-2 border-gray-300 rounded-lg focus:border-amber-500 focus:outline-none"
                    />
                  </div>

                  {/* Divider */}
                  <div className="hidden md:block w-px h-12 bg-gray-300 mx-2"></div>

                  {/* Adults */}
                  <div className="flex-shrink-0">
                    <label className="block text-xs font-bold text-gray-700 mb-1 text-center">
                      ADULTOS
                    </label>
                    <div className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-lg border-2 border-gray-300">
                      <button
                        onClick={() => setAdultos(Math.max(0, adultos - 1))}
                        className="p-1 bg-gray-200 hover:bg-gray-300 rounded transition-colors"
                        type="button"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <div className="flex items-center gap-2 min-w-[40px] justify-center">
                        <Users className="w-4 h-4 text-gray-600" />
                        <span className="text-sm font-bold">{adultos}</span>
                      </div>
                      <button
                        onClick={() => setAdultos(Math.min(10, adultos + 1))}
                        className="p-1 bg-gray-200 hover:bg-gray-300 rounded transition-colors"
                        type="button"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>

                  {/* Children */}
                  <div className="flex-shrink-0">
                    <label className="block text-xs font-bold text-gray-700 mb-1 text-center">
                      NIÑOS
                    </label>
                    <div className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-lg border-2 border-gray-300">
                      <button
                        onClick={() => setNinos(Math.max(0, ninos - 1))}
                        className="p-1 bg-gray-200 hover:bg-gray-300 rounded transition-colors"
                        type="button"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <div className="flex items-center gap-2 min-w-[40px] justify-center">
                        <Users className="w-3 h-3 text-gray-600" />
                        <span className="text-sm font-bold">{ninos}</span>
                      </div>
                      <button
                        onClick={() => setNinos(Math.min(10, ninos + 1))}
                        className="p-1 bg-gray-200 hover:bg-gray-300 rounded transition-colors"
                        type="button"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>

                  {/* Reserve Button */}
                  <div className="flex-shrink-0">
                    <button
                      onClick={handleBuscarHabitaciones}
                      className="bg-gray-900 hover:bg-gray-800 text-white font-bold py-3 px-8 rounded-lg transition-colors"
                      type="button"
                    >
                      RESERVAR
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sección Nuestra Propuesta */}
        <NuestraPropuesta />

        {/* Sección Amenidades Destacadas */}
        <AmenidadesCarousel />

        {/* Sección Nuestras Habitaciones */}
        <HabitacionesHome />

        {/* Sección Galería Preview */}
        <GaleriaPreview />

        {/* Sección Confianza y Credibilidad */}
        <ConfianzaCredibilidad />

        {/* Sección Experiencia Gastronómica */}
        <RestauranteHome />

        {/* Sección Preguntas Frecuentes */}
        <FAQ />

        {/* Resto del contenido */}
        <div className="bg-white">
          {/* Footer */}
          <Footer />
        </div>
      </main>
    </div>
  );
}
