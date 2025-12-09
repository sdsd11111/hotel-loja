'use server';

import { z } from 'zod';

const reservationSchema = z.object({
    fecha: z.string().min(1, "La fecha es requerida"),
    hora: z.string().min(1, "La hora es requerida"),
    personas: z.coerce.number().min(1, "Al menos 1 persona"),
    email: z.string().email("Correo inválido"),
    lopdp: z.literal('on').or(z.string().refine(val => val === 'on', { message: "Debe aceptar el tratamiento de datos" })),
});

export async function submitRestaurantReservation(prevState: any, formData: FormData) {
    const validatedFields = reservationSchema.safeParse({
        fecha: formData.get('fecha'),
        hora: formData.get('hora'),
        personas: formData.get('personas'),
        email: formData.get('email'),
        lopdp: formData.get('lopdp'),
    });

    if (!validatedFields.success) {
        return {
            success: false,
            errors: validatedFields.error.flatten().fieldErrors,
            message: "Por favor revise los campos del formulario."
        };
    }

    // Simulate database/email delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Here you would insert into DB or send email
    console.log('Reservation received:', validatedFields.data);

    return {
        success: true,
        message: "¡Reserva recibida! Nos pondremos en contacto para confirmar."
    };
}
