'use client';

import * as React from 'react';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import dynamic from 'next/dynamic';
import { Menu, X, Globe, ChevronDown, ChevronRight, ChevronUp } from 'lucide-react';
import { restaurantMenuCategories } from '@/data/restaurantMenu';
import CompactReservationSearch from './CompactReservationSearch';

const GoogleTranslate = dynamic(
  () => import('./GoogleTranslate'),
  { ssr: false }
);

interface HeaderProps {
  logo?: string;
  className?: string;
  // Optional reservation search props
  showReservationSearch?: boolean;
  reservationSearchProps?: {
    fechaEntrada: string;
    fechaSalida: string;
    onFechaEntradaChange: (fecha: string) => void;
    onFechaSalidaChange: (fecha: string) => void;
    adultos: number;
    ninos: number;
    onAdultosChange: (cantidad: number) => void;
    onNinosChange: (cantidad: number) => void;
    onReservarClick: () => void;
  };
}

// Main navigation items
const mainNavigation = [
  { label: 'Inicio', href: '/' },
  { label: 'Habitaciones', href: '/habitaciones' },
  { label: 'Eventos', href: '/servicios/eventos' },
  { label: 'Restaurante', href: '/servicios/restaurante' },
  { label: 'Servicios', href: '/servicios' },
];

// Hamburger menu items (Galería and Contacto)
const hamburgerNavigation = [
  { label: 'Galería', href: '/galeria' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contacto', href: '/contacto' },
];

import { useRouter } from 'next/navigation';

// ... imports

export const Header = ({ logo, className, showReservationSearch = true, reservationSearchProps }: HeaderProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [restaurantMenuOpen, setRestaurantMenuOpen] = useState(false); // Mobile state for restaurant menu
  const [openCategories, setOpenCategories] = useState<Record<string, boolean>>({}); // State for accordion
  const [isScrolled, setIsScrolled] = useState(false);

  const toggleCategory = (categoryId: string) => {
    setOpenCategories(prev => ({
      ...prev,
      [categoryId]: !prev[categoryId]
    }));
  };
  const pathname = usePathname();
  const router = useRouter();

  // Internal state for reservation search (used if props are not provided)
  const [internalFechaEntrada, setInternalFechaEntrada] = useState('');
  const [internalFechaSalida, setInternalFechaSalida] = useState('');
  const [internalAdultos, setInternalAdultos] = useState(2);
  const [internalNinos, setInternalNinos] = useState(0);

  // Handle internal search
  const handleInternalSearch = () => {
    const params = new URLSearchParams();
    if (internalFechaEntrada) params.set('entrada', internalFechaEntrada);
    if (internalFechaSalida) params.set('salida', internalFechaSalida);
    if (internalAdultos > 0) params.set('adultos', internalAdultos.toString());
    if (internalNinos > 0) params.set('ninos', internalNinos.toString());

    router.push(`/habitaciones?${params.toString()}`);
  };

  // Determine which props to use (passed props or internal state)
  const effectiveReservationProps = reservationSearchProps || {
    fechaEntrada: internalFechaEntrada,
    fechaSalida: internalFechaSalida,
    onFechaEntradaChange: setInternalFechaEntrada,
    onFechaSalidaChange: setInternalFechaSalida,
    adultos: internalAdultos,
    ninos: internalNinos,
    onAdultosChange: setInternalAdultos,
    onNinosChange: setInternalNinos,
    onReservarClick: handleInternalSearch
  };

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Detect scroll position - activate after passing the floating search panel
  useEffect(() => {
    const handleScroll = () => {
      // Activate sticky header after passing the floating search panel (around 650px for 70vh hero - 80px panel)
      // On other pages without the big hero, we might want it to appear sooner, but 650px is safe for now
      // Or we could check if we are on home page
      const threshold = pathname === '/' ? 650 : 100;
      setIsScrolled(window.scrollY > threshold);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [pathname]);

  return (
    <>
      {/* Transparent Header with Topbar - Shows at top */}
      {!isScrolled && (
        <>
          {/* Topbar */}
          <div className="w-full fixed top-0 z-[60] bg-black">
            <div className="container mx-auto px-4">
              <div className="h-6 flex items-center justify-center">
                <a
                  href="https://wa.me/593963410409"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white text-[10px] font-extrabold uppercase tracking-wide hover:text-yellow-400 transition-colors"
                  style={{ textShadow: '0 2px 4px rgba(0,0,0,0.8), 0 0 8px rgba(0,0,0,0.5)' }}
                >
                  Mejoramos la experiencia de tu viaje
                </a>
              </div>
            </div>
          </div>

          {/* Transparent Header */}
          <header className={cn("w-full fixed top-6 z-50", className)}>
            <div className="container mx-auto px-4">
              <div className="flex justify-between items-center h-20">
                {/* Logo - Left */}
                <div className="flex items-center flex-shrink-0">
                  <Link href="/" className="flex items-center gap-2">
                    <Image
                      src="/logo-v2.png"
                      alt="Hotel Puente Roto Logo"
                      width={50}
                      height={50}
                      className="object-contain"
                    />
                    <span className="text-2xl font-bold tracking-tight text-white drop-shadow-lg">
                      Hotel Puente Roto
                    </span>
                  </Link>
                </div>

                {/* Right Side - Desktop Navigation + Language + Hamburger */}
                <div className="flex items-center gap-6">
                  {/* Desktop Navigation Links */}
                  <nav className="hidden md:flex items-center gap-6">
                    {mainNavigation.map((item) => (
                      <div key={item.href} className="relative group">
                        {item.label === 'Restaurante' ? (
                          <div className="flex items-center gap-1">
                            <Link
                              href={item.href}
                              className={cn(
                                "text-xs font-extrabold text-white hover:text-yellow-400 transition-colors uppercase tracking-wide",
                                pathname === item.href && "text-yellow-400"
                              )}
                              style={{ textShadow: '0 2px 4px rgba(0,0,0,0.8), 0 0 8px rgba(0,0,0,0.5)' }}
                            >
                              {item.label}
                            </Link>
                            <button className="text-white hover:text-yellow-400 transition-colors focus:outline-none">
                              <ChevronDown className="h-4 w-4" style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.8))' }} />
                            </button>

                            {/* Dropdown Menu - Accordion Style */}
                            <div className="absolute top-full left-0 mt-2 w-[350px] bg-white text-gray-800 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform -translate-x-1/4 p-4 z-[70] max-h-[80vh] overflow-y-auto">
                              {restaurantMenuCategories.map((category) => (
                                <div key={category.id} className="mb-2 last:mb-0 border-b last:border-0 border-gray-100 pb-2 last:pb-0">
                                  {category.isLink ? (
                                    <Link
                                      href={category.href || '#'}
                                      className="flex items-center justify-between p-3 bg-amber-50 rounded-lg hover:bg-amber-100 transition-colors group/btn mt-2"
                                    >
                                      <div>
                                        <h4 className="font-bold text-amber-900 text-sm">{category.title}</h4>
                                        <p className="text-[10px] text-amber-700">{category.subtitle}</p>
                                      </div>
                                      <ChevronRight className="h-4 w-4 text-amber-600 group-hover/btn:translate-x-1 transition-transform" />
                                    </Link>
                                  ) : (
                                    <div>
                                      <button
                                        onClick={() => toggleCategory(category.id)}
                                        className="w-full flex items-center justify-between p-2 hover:bg-gray-50 rounded transition-colors text-left"
                                      >
                                        <div>
                                          <h4 className="font-bold text-gray-900 text-sm">{category.title}</h4>
                                          <p className="text-[10px] text-gray-500">{category.subtitle}</p>
                                        </div>
                                        {openCategories[category.id] ? (
                                          <ChevronUp className="h-4 w-4 text-gray-400" />
                                        ) : (
                                          <ChevronDown className="h-4 w-4 text-gray-400" />
                                        )}
                                      </button>

                                      {/* Accordion Content */}
                                      <div
                                        className={cn(
                                          "overflow-hidden transition-all duration-300 ease-in-out pl-3",
                                          openCategories[category.id] ? "max-h-[500px] opacity-100 mt-2" : "max-h-0 opacity-0"
                                        )}
                                      >
                                        <ul className="space-y-2 border-l-2 border-gray-100 pl-3">
                                          {category.items.map((dish, idx) => (
                                            <li key={idx} className="text-xs group/item py-1">
                                              <Link
                                                href={`/servicios/restaurante/platos/${dish.slug}`}
                                                className="block font-medium text-gray-700 group-hover/item:text-amber-600 transition-colors"
                                              >
                                                {dish.name}
                                              </Link>
                                            </li>
                                          ))}
                                        </ul>
                                      </div>
                                    </div>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                        ) : (
                          <Link
                            href={item.href}
                            className={cn(
                              "text-xs font-extrabold text-white hover:text-yellow-400 transition-colors uppercase tracking-wide",
                              pathname === item.href && "text-yellow-400"
                            )}
                            style={{ textShadow: '0 2px 4px rgba(0,0,0,0.8), 0 0 8px rgba(0,0,0,0.5)' }}
                          >
                            {item.label}
                          </Link>
                        )}
                      </div>
                    ))}
                  </nav>

                  {/* Language Selector */}
                  <div className="hidden md:flex items-center gap-1 text-white">
                    <Globe className="h-4 w-4" />
                    <GoogleTranslate inHeader={true} />
                  </div>

                  {/* Hamburger Menu Button */}
                  <div className="relative">
                    <button
                      onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                      className="p-2 text-white hover:text-yellow-400 transition-colors"
                      aria-label="Toggle menu"
                    >
                      {mobileMenuOpen ? (
                        <X className="h-6 w-6" />
                      ) : (
                        <Menu className="h-6 w-6" />
                      )}
                    </button>

                    {/* Hamburger Menu Dropdown */}
                    {mobileMenuOpen && (
                      <div className="absolute top-full right-0 mt-2 w-auto bg-white shadow-xl rounded-lg border border-gray-200">
                        <nav className="px-3 py-3">
                          {/* Mobile: Show all main navigation items */}
                          <div className="md:hidden space-y-2 mb-3 pb-3 border-b border-gray-200">
                            {mainNavigation.map((item) => (
                              <div key={item.href}>
                                {item.label === 'Restaurante' ? (
                                  <div>
                                    <div className="flex items-center justify-between">
                                      <Link
                                        href={item.href}
                                        className={cn(
                                          "block text-gray-900 hover:text-blue-600 font-bold transition-colors text-xs uppercase tracking-wide",
                                          pathname === item.href && "text-blue-600"
                                        )}
                                      >
                                        {item.label}
                                      </Link>
                                      <button
                                        onClick={() => setRestaurantMenuOpen(!restaurantMenuOpen)}
                                        className="p-1 text-gray-500 hover:text-blue-600"
                                      >
                                        {restaurantMenuOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                                      </button>
                                    </div>

                                    {/* Mobile Restaurant Submenu */}
                                    {restaurantMenuOpen && (
                                      <div className="pl-4 mt-2 space-y-4 border-l-2 border-gray-100 ml-1">
                                        {restaurantMenuCategories.map((category) => (
                                          <div key={category.id}>
                                            {category.isLink ? (
                                              <Link
                                                href={category.href || '#'}
                                                className="flex items-center justify-between py-2 text-amber-700 font-bold text-xs bg-amber-50 px-2 rounded"
                                                onClick={() => setMobileMenuOpen(false)}
                                              >
                                                {category.title}
                                                <ChevronRight className="h-3 w-3" />
                                              </Link>
                                            ) : (
                                              <div>
                                                <button
                                                  onClick={() => toggleCategory(category.id)}
                                                  className="w-full flex items-center justify-between text-left mb-1"
                                                >
                                                  <h5 className="font-bold text-gray-800 text-xs">{category.title}</h5>
                                                  {openCategories[category.id] ? (
                                                    <ChevronUp className="h-3 w-3 text-gray-500" />
                                                  ) : (
                                                    <ChevronDown className="h-3 w-3 text-gray-500" />
                                                  )}
                                                </button>

                                                {openCategories[category.id] && (
                                                  <ul className="space-y-1 pl-2 border-l border-gray-100 mt-1">
                                                    {category.items.map((dish, idx) => (
                                                      <li key={idx} className="text-[10px] text-gray-600 pl-2 py-0.5">
                                                        <Link
                                                          href={`/servicios/restaurante/platos/${dish.slug}`}
                                                          className="block hover:text-amber-600 transition-colors"
                                                          onClick={() => setMobileMenuOpen(false)}
                                                        >
                                                          • {dish.name}
                                                        </Link>
                                                      </li>
                                                    ))}
                                                  </ul>
                                                )}
                                              </div>
                                            )}
                                          </div>
                                        ))}
                                      </div>
                                    )}
                                  </div>
                                ) : (
                                  <Link
                                    href={item.href}
                                    className={cn(
                                      "block text-gray-900 hover:text-blue-600 font-bold transition-colors text-xs uppercase tracking-wide",
                                      pathname === item.href && "text-blue-600"
                                    )}
                                  >
                                    {item.label}
                                  </Link>
                                )}
                              </div>
                            ))}
                          </div>

                          {/* Hamburger menu items (Galería and Contacto) */}
                          <div className="space-y-2 mb-3 pb-3 border-b border-gray-200">
                            {hamburgerNavigation.map((item) => (
                              <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                  "block text-gray-900 hover:text-blue-600 font-bold transition-colors text-xs uppercase tracking-wide",
                                  pathname === item.href && "text-blue-600"
                                )}
                              >
                                {item.label}
                              </Link>
                            ))}
                          </div>

                          {/* Mobile Language Selector */}
                          <div className="md:hidden">
                            <div className="flex items-center gap-2 text-gray-600">
                              <Globe className="h-4 w-4" />
                              <GoogleTranslate inHeader={true} />
                            </div>
                          </div>
                        </nav>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </header>
        </>
      )}

      {/* White Solid Header - Shows when scrolled */}
      {isScrolled && (
        <header className="w-full fixed top-0 z-50 bg-white shadow-md">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center h-20 gap-4">
              {/* Logo - Left */}
              <div className="flex items-center flex-shrink-0">
                <Link href="/" className="flex items-center gap-2">
                  <Image
                    src="/logo-v2.png"
                    alt="Hotel Puente Roto Logo"
                    width={50}
                    height={50}
                    className="object-contain"
                  />
                  <span className="hidden md:block text-xl font-bold tracking-tight text-gray-900">
                    Hotel Puente Roto
                  </span>
                </Link>
              </div>

              {/* Center - Compact Reservation Search (if enabled) */}
              {showReservationSearch && effectiveReservationProps && (
                <div className="hidden lg:flex flex-1 justify-center">
                  <CompactReservationSearch {...effectiveReservationProps} />
                </div>
              )}

              {/* Right Side - Hamburger Menu Only */}
              <div className="flex items-center gap-3">
                {/* Mobile Reservation Button */}
                <Link
                  href="/contacto?motivo=Reserva+de+Habitación#formulario-contacto"
                  className="md:hidden bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold py-2 px-4 rounded-full shadow-md transition-colors uppercase tracking-wider"
                >
                  Reserva
                </Link>

                <div className="relative">
                  <button
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    className="p-4 text-gray-900 hover:text-blue-600 transition-colors"
                    aria-label="Toggle menu"
                  >
                    {mobileMenuOpen ? (
                      <X className="h-12 w-12" strokeWidth={2.5} />
                    ) : (
                      <Menu className="h-12 w-12" strokeWidth={2.5} />
                    )}
                  </button>

                  {/* Hamburger Menu Dropdown - All Navigation */}
                  {mobileMenuOpen && (
                    <div className="absolute top-full right-0 mt-2 w-auto bg-white shadow-xl rounded-lg border border-gray-200">
                      <nav className="px-4 py-4">
                        {/* All main navigation items */}
                        <div className="space-y-3 mb-4 pb-4 border-b border-gray-200">
                          {mainNavigation.map((item) => (
                            <div key={item.href}>
                              {item.label === 'Restaurante' ? (
                                <div>
                                  <div className="flex items-center justify-between">
                                    <Link
                                      href={item.href}
                                      className={cn(
                                        "block text-gray-900 hover:text-blue-600 font-bold transition-colors text-sm uppercase tracking-wide",
                                        pathname === item.href && "text-blue-600"
                                      )}
                                    >
                                      {item.label}
                                    </Link>
                                    <button
                                      onClick={() => setRestaurantMenuOpen(!restaurantMenuOpen)}
                                      className="p-1 text-gray-500 hover:text-blue-600"
                                    >
                                      {restaurantMenuOpen ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                                    </button>
                                  </div>

                                  {/* Mobile Restaurant Submenu */}
                                  {restaurantMenuOpen && (
                                    <div className="pl-4 mt-2 space-y-4 border-l-2 border-gray-100 ml-1">
                                      {restaurantMenuCategories.map((category) => (
                                        <div key={category.id}>
                                          {category.isLink ? (
                                            <Link
                                              href={category.href || '#'}
                                              className="flex items-center justify-between py-2 text-amber-700 font-bold text-sm bg-amber-50 px-3 rounded"
                                              onClick={() => setMobileMenuOpen(false)}
                                            >
                                              {category.title}
                                              <ChevronRight className="h-4 w-4" />
                                            </Link>
                                          ) : (
                                            <div>
                                              <button
                                                onClick={() => toggleCategory(category.id)}
                                                className="w-full flex items-center justify-between text-left mb-1"
                                              >
                                                <h5 className="font-bold text-gray-800 text-sm">{category.title}</h5>
                                                {openCategories[category.id] ? (
                                                  <ChevronUp className="h-4 w-4 text-gray-500" />
                                                ) : (
                                                  <ChevronDown className="h-4 w-4 text-gray-500" />
                                                )}
                                              </button>

                                              {openCategories[category.id] && (
                                                <ul className="space-y-1 pl-2 border-l border-gray-100 mt-1">
                                                  {category.items.map((dish, idx) => (
                                                    <li key={idx} className="text-xs text-gray-600 pl-2 py-0.5">
                                                      <Link
                                                        href={`/servicios/restaurante/platos/${dish.slug}`}
                                                        className="block hover:text-amber-600 transition-colors"
                                                        onClick={() => setMobileMenuOpen(false)}
                                                      >
                                                        • {dish.name}
                                                      </Link>
                                                    </li>
                                                  ))}
                                                </ul>
                                              )}
                                            </div>
                                          )}
                                        </div>
                                      ))}
                                    </div>
                                  )}
                                </div>
                              ) : (
                                <Link
                                  href={item.href}
                                  className={cn(
                                    "block text-gray-900 hover:text-blue-600 font-bold transition-colors text-sm uppercase tracking-wide",
                                    pathname === item.href && "text-blue-600"
                                  )}
                                >
                                  {item.label}
                                </Link>
                              )}
                            </div>
                          ))}
                        </div>

                        {/* Hamburger menu items (Galería and Contacto) */}
                        <div className="space-y-3 mb-4 pb-4 border-b border-gray-200">
                          {hamburgerNavigation.map((item) => (
                            <Link
                              key={item.href}
                              href={item.href}
                              className={cn(
                                "block text-gray-900 hover:text-blue-600 font-bold transition-colors text-sm uppercase tracking-wide",
                                pathname === item.href && "text-blue-600"
                              )}
                            >
                              {item.label}
                            </Link>
                          ))}
                        </div>

                        {/* Language Selector */}
                        <div>
                          <div className="flex items-center gap-2 text-gray-600">
                            <Globe className="h-5 w-5" />
                            <GoogleTranslate inHeader={true} />
                          </div>
                        </div>
                      </nav>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </header>
      )}
    </>
  );
};
