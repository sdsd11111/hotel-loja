'use client';

import React from 'react';
import { ChevronRight, Users, Plus, Minus } from 'lucide-react';

interface CompactReservationSearchProps {
    fechaEntrada: string;
    fechaSalida: string;
    onFechaEntradaChange: (fecha: string) => void;
    onFechaSalidaChange: (fecha: string) => void;
    adultos: number;
    ninos: number;
    onAdultosChange: (cantidad: number) => void;
    onNinosChange: (cantidad: number) => void;
    onReservarClick: () => void;
}

export default function CompactReservationSearch({
    fechaEntrada,
    fechaSalida,
    onFechaEntradaChange,
    onFechaSalidaChange,
    adultos,
    ninos,
    onAdultosChange,
    onNinosChange,
    onReservarClick
}: CompactReservationSearchProps) {
    const today = new Date().toISOString().split('T')[0];

    return (
        <div className="flex items-center gap-2 bg-white rounded-lg shadow-md px-3 py-2 border-2 border-amber-500">
            {/* Check-in */}
            <div className="flex-shrink-0">
                <input
                    type="date"
                    value={fechaEntrada}
                    onChange={(e) => onFechaEntradaChange(e.target.value)}
                    min={today}
                    className="w-28 px-2 py-1 text-xs border border-gray-300 rounded focus:border-amber-500 focus:outline-none"
                />
            </div>

            {/* Arrow */}
            <ChevronRight className="w-4 h-4 text-gray-400 flex-shrink-0" />

            {/* Check-out */}
            <div className="flex-shrink-0">
                <input
                    type="date"
                    value={fechaSalida}
                    onChange={(e) => onFechaSalidaChange(e.target.value)}
                    min={fechaEntrada || today}
                    className="w-28 px-2 py-1 text-xs border border-gray-300 rounded focus:border-amber-500 focus:outline-none"
                />
            </div>

            {/* Divider */}
            <div className="w-px h-6 bg-gray-300 mx-1"></div>

            {/* Adults */}
            <div className="flex items-center gap-1 bg-gray-50 px-2 py-1 rounded border border-gray-300 flex-shrink-0">
                <button
                    onClick={() => onAdultosChange(Math.max(0, adultos - 1))}
                    className="p-0.5 bg-gray-200 hover:bg-gray-300 rounded transition-colors"
                    type="button"
                >
                    <Minus className="w-2.5 h-2.5" />
                </button>
                <Users className="w-3 h-3 text-gray-600" />
                <span className="text-xs font-bold min-w-[12px] text-center">{adultos}</span>
                <button
                    onClick={() => onAdultosChange(Math.min(10, adultos + 1))}
                    className="p-0.5 bg-gray-200 hover:bg-gray-300 rounded transition-colors"
                    type="button"
                >
                    <Plus className="w-2.5 h-2.5" />
                </button>
            </div>

            {/* Children */}
            <div className="flex items-center gap-1 bg-gray-50 px-2 py-1 rounded border border-gray-300 flex-shrink-0">
                <button
                    onClick={() => onNinosChange(Math.max(0, ninos - 1))}
                    className="p-0.5 bg-gray-200 hover:bg-gray-300 rounded transition-colors"
                    type="button"
                >
                    <Minus className="w-2.5 h-2.5" />
                </button>
                <Users className="w-2.5 h-2.5 text-gray-600" />
                <span className="text-xs font-bold min-w-[12px] text-center">{ninos}</span>
                <button
                    onClick={() => onNinosChange(Math.min(10, ninos + 1))}
                    className="p-0.5 bg-gray-200 hover:bg-gray-300 rounded transition-colors"
                    type="button"
                >
                    <Plus className="w-2.5 h-2.5" />
                </button>
            </div>

            {/* Reserve Button */}
            <button
                onClick={onReservarClick}
                className="bg-gray-900 hover:bg-gray-800 text-white font-bold text-xs py-2 px-4 rounded transition-colors flex-shrink-0"
                type="button"
            >
                RESERVAR
            </button>
        </div>
    );
}
