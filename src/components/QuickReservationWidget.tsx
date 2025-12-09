'use client';

import { useActionState } from 'react';
import { submitRestaurantReservation } from '@/actions/restaurant-reservation';
import { Calendar, Clock, Users, Mail, CheckCircle, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

const initialState = {
    success: false,
    message: '',
    errors: {} as Record<string, string[]>
};

export function QuickReservationWidget() {
    const [state, formAction, isPending] = useActionState(submitRestaurantReservation, initialState);

    return (
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-xl relative overflow-hidden">
            {/* Decorative top border */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-400 to-amber-600"></div>

            <h3 className="text-xl font-bold text-gray-900 mb-2 font-display">Reserva Rápida</h3>
            <p className="text-xs text-gray-500 mb-6">Asegura tu mesa en pocos segundos.</p>

            {state.success ? (
                <div className="bg-green-50 p-6 rounded-xl text-center border border-green-100 animate-in fade-in zoom-in duration-300">
                    <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-3">
                        <CheckCircle className="w-6 h-6" />
                    </div>
                    <h4 className="font-bold text-gray-900 mb-1">¡Solicitud Enviada!</h4>
                    <p className="text-sm text-gray-600 mb-4">{state.message}</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="text-sm font-semibold text-green-700 hover:text-green-800 underline"
                    >
                        Hacer otra reserva
                    </button>
                </div>
            ) : (
                <form action={formAction} className="space-y-4">
                    {/* Fecha */}
                    <div className="space-y-1">
                        <label className="text-[10px] uppercase font-bold text-gray-500 tracking-wider">Fecha</label>
                        <div className="relative">
                            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                                type="date"
                                name="fecha"
                                required
                                className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition-all outline-none"
                            />
                        </div>
                        {state.errors?.fecha && <p className="text-xs text-red-500">{state.errors.fecha[0]}</p>}
                    </div>

                    {/* Hora y Personas Grid */}
                    <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1">
                            <label className="text-[10px] uppercase font-bold text-gray-500 tracking-wider">Hora</label>
                            <div className="relative">
                                <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <input
                                    type="time"
                                    name="hora"
                                    required
                                    className="w-full pl-9 pr-2 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition-all outline-none"
                                />
                            </div>
                            {state.errors?.hora && <p className="text-xs text-red-500">{state.errors.hora[0]}</p>}
                        </div>

                        <div className="space-y-1">
                            <label className="text-[10px] uppercase font-bold text-gray-500 tracking-wider">Personas</label>
                            <div className="relative">
                                <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <input
                                    type="number"
                                    name="personas"
                                    min="1"
                                    defaultValue="2"
                                    required
                                    className="w-full pl-9 pr-2 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition-all outline-none"
                                />
                            </div>
                            {state.errors?.personas && <p className="text-xs text-red-500">{state.errors.personas[0]}</p>}
                        </div>
                    </div>

                    {/* Email */}
                    <div className="space-y-1">
                        <label className="text-[10px] uppercase font-bold text-gray-500 tracking-wider">Email</label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                                type="email"
                                name="email"
                                placeholder="tu@email.com"
                                required
                                className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition-all outline-none"
                            />
                        </div>
                        {state.errors?.email && <p className="text-xs text-red-500">{state.errors.email[0]}</p>}
                    </div>

                    {/* LOPDP Consent */}
                    <div className="pt-2">
                        <label className="flex items-start gap-3 cursor-pointer group">
                            <div className="relative flex items-center">
                                <input
                                    type="checkbox"
                                    name="lopdp"
                                    className="peer h-4 w-4 cursor-pointer appearance-none rounded border border-gray-300 shadow-sm transition-all checked:border-amber-500 checked:bg-amber-500 hover:border-amber-400"
                                />
                                <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 peer-checked:opacity-100 text-white pointer-events-none">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                </span>
                            </div>
                            <span className="text-[10px] text-gray-500 leading-tight group-hover:text-gray-700 transition-colors">
                                Acepto el tratamiento de mis datos personales conforme a la <a href="/politica-privacidad" className="underline text-amber-600 hover:text-amber-700">Política de Privacidad</a> y la LOPDP.
                            </span>
                        </label>
                        {state.errors?.lopdp && <p className="text-xs text-red-500 mt-1">{state.errors.lopdp[0]}</p>}
                    </div>

                    <button
                        type="submit"
                        disabled={isPending}
                        className="w-full py-3 bg-gray-900 hover:bg-gray-800 text-white font-bold rounded-lg transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                        {isPending ? (
                            <>
                                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                Enviando...
                            </>
                        ) : (
                            'Confirmar Reserva'
                        )}
                    </button>

                    {state.success === false && state.message && (
                        <div className="mt-2 p-3 bg-red-50 border border-red-100 rounded-lg flex items-center gap-2 text-xs text-red-600">
                            <AlertCircle className="w-4 h-4 flex-shrink-0" />
                            <p>{state.message}</p>
                        </div>
                    )}
                </form>
            )}
        </div>
    );
}
