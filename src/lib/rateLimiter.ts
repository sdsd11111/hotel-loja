import { RateLimiterMemory } from 'rate-limiter-flexible';

// Configuración del rate limiter
// Máximo 5 intentos en 30 minutos
const maxWrongAttemptsByIPperDay = 5;
const maxConsecutiveFailsByUsernameAndIP = 5;

// Limiter para IP
const limiterSlowBruteByIP = new RateLimiterMemory({
  points: maxWrongAttemptsByIPperDay,
  duration: 60 * 30, // Bloqueo por 30 minutos
  blockDuration: 60 * 30, // Bloqueo por 30 minutos
});

// Limiter para combinación de usuario e IP
const limiterConsecutiveFailsByUsernameAndIP = new RateLimiterMemory({
  points: maxConsecutiveFailsByUsernameAndIP,
  duration: 60 * 30, // Bloqueo por 30 minutos
  blockDuration: 60 * 30, // Bloqueo por 30 minutos
});

// Obtener clave para el rate limiter basada en IP
export const getIPKey = (ip: string) => `login_fail_ip_${ip}`;

// Obtener clave para el rate limiter basada en usuario e IP
export const getUsernameIPkey = (username: string, ip: string) => 
  `login_fail_username_ip_${username}_${ip}`;

export const loginLimiter = {
  limiterSlowBruteByIP,
  limiterConsecutiveFailsByUsernameAndIP,
  maxConsecutiveFailsByUsernameAndIP,
};
