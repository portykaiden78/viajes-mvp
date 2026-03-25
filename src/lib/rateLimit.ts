// Rate limiter simple en memoria (por IP)
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minuto
const RATE_LIMIT_MAX_REQUESTS = 5;   // máximo 5 peticiones por minuto

// Mapa: IP -> array de timestamps
const ipRequests = new Map<string, number[]>();

export function rateLimit(ip: string): boolean {
  const now = Date.now();

  // Obtener historial de la IP
  const timestamps = ipRequests.get(ip) || [];

  // Filtrar timestamps que siguen dentro de la ventana
  const recent = timestamps.filter(ts => now - ts < RATE_LIMIT_WINDOW);

  // Guardar historial actualizado
  ipRequests.set(ip, [...recent, now]);

  // Comprobar límite
  return recent.length < RATE_LIMIT_MAX_REQUESTS;
}
