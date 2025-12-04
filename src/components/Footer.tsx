'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Phone, Mail, MapPin, Facebook, Instagram, Youtube } from 'lucide-react';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300 pt-16 pb-8">
      <div className="container mx-auto px-4">
        {/* Main Footer Bands (4 Columns) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">

          {/* Column 1: Contacto Principal */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6 border-b-2 border-yellow-500 inline-block pb-1">
              Contáctenos
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-1" />
                <span className="text-sm leading-relaxed">
                  Av. Gran Colombia y Benigno Malo, Cuenca, Ecuador
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-yellow-500 flex-shrink-0" />
                <a href="tel:+593963410409" className="text-sm hover:text-white transition-colors">
                  +593 96 341 0409
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-yellow-500 flex-shrink-0" />
                <a href="mailto:reservas@hotelcuenca.com" className="text-sm hover:text-white transition-colors">
                  reservas@hotelcuenca.com
                </a>
              </li>
            </ul>
          </div>

          {/* Column 2: Navegación Rápida */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6 border-b-2 border-yellow-500 inline-block pb-1">
              Navegación Rápida
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-sm hover:text-white transition-colors flex items-center gap-2">
                  <span className="text-yellow-500">›</span> Inicio
                </Link>
              </li>
              <li>
                <Link href="/galeria" className="text-sm hover:text-white transition-colors flex items-center gap-2">
                  <span className="text-yellow-500">›</span> Galería
                </Link>
              </li>
              <li>
                <Link href="/habitaciones" className="text-sm hover:text-white transition-colors flex items-center gap-2">
                  <span className="text-yellow-500">›</span> Habitaciones
                </Link>
              </li>
              <li>
                <Link href="/servicios" className="text-sm hover:text-white transition-colors flex items-center gap-2">
                  <span className="text-yellow-500">›</span> Servicios
                </Link>
              </li>
              <li>
                <Link href="/contacto" className="text-sm hover:text-white transition-colors flex items-center gap-2">
                  <span className="text-yellow-500">›</span> Contacto
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Requisitos Legales (LOPDP) */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6 border-b-2 border-yellow-500 inline-block pb-1">
              Legal
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href="/privacidad" className="text-sm hover:text-white transition-colors flex items-center gap-2">
                  <span className="text-yellow-500">›</span> Aviso de Privacidad (LOPDP)
                </Link>
              </li>
              <li>
                <Link href="/terminos" className="text-sm hover:text-white transition-colors flex items-center gap-2">
                  <span className="text-yellow-500">›</span> Términos y Condiciones
                </Link>
              </li>
              <li>
                <Link href="/cookies" className="text-sm hover:text-white transition-colors flex items-center gap-2">
                  <span className="text-yellow-500">›</span> Política de Cookies
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Redes Sociales y Marca */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6 border-b-2 border-yellow-500 inline-block pb-1">
              Síganos
            </h3>
            <div className="mb-6">
              <Link href="/" className="flex items-center gap-2 mb-4">
                <Image
                  src="/logo-v2.png"
                  alt="Hotel Puente Roto Logo"
                  width={50}
                  height={50}
                  className="object-contain"
                />
                <span className="text-xl font-bold text-white">Hotel Puente Roto</span>
              </Link>
              <p className="text-sm text-gray-400 leading-relaxed">
                Su base premium para explorar la riqueza natural y cultural de Cuenca.
              </p>
            </div>
            <div className="flex gap-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="bg-gray-800 p-2 rounded-full hover:bg-blue-600 transition-colors text-white" aria-label="Facebook">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="bg-gray-800 p-2 rounded-full hover:bg-pink-600 transition-colors text-white" aria-label="Instagram">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="bg-gray-800 p-2 rounded-full hover:bg-red-600 transition-colors text-white" aria-label="YouTube">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Sub-Footer: Attribution & Copyright */}
        <div className="border-t border-gray-800 pt-8 mt-8 text-center">
          <p className="text-sm text-gray-500">
            Diseñado por{' '}
            <a
              href="https://cesarreyesjaramillo.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-gray-400 hover:text-white transition-colors"
            >
              Cesar Reyes
            </a>{' '}
            | Hotel Puente Roto {currentYear}
          </p>
        </div>
      </div>
    </footer>
  );
};
