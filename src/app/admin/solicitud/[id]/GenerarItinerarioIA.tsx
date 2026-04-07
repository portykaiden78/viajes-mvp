"use client";

import { useState } from "react";

export function GenerarItinerarioIA({ id }: { id: string }) {
  const [loading, setLoading] = useState(false);

  async function generar() {
    try {
      setLoading(true);

      const res = await fetch("/api/generar-itinerario", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ travelRequestId: id }),
      });

      // -----------------------------
      // Manejo robusto de errores
      // -----------------------------
      if (!res.ok) {
        let errorMessage = "Error generando itinerario";

        try {
          const text = await res.text();
          console.error("❌ RESPUESTA RAW DEL SERVIDOR:", text);

          // Intentar parsear JSON si es posible
          try {
            const json = JSON.parse(text);
            errorMessage = json.error || errorMessage;
          } catch {
            // Si no es JSON, dejamos el mensaje por defecto
          }
        } catch (e) {
          console.error("❌ Error leyendo respuesta:", e);
        }

        alert(errorMessage);
        return;
      }

      // -----------------------------
      // Si todo va bien → redirigir
      // -----------------------------
      window.location.href = `/admin/solicitud/${id}/itinerario`;
    } catch (err) {
      console.error("❌ Error generando itinerario:", err);
      alert("Error inesperado generando el itinerario");
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={generar}
      disabled={loading}
      className="inline-flex items-center justify-center bg-purple-600 text-white px-6 py-3 rounded w-full"
    >
      {loading ? (
        <span className="flex items-center gap-2">
          <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></span>
          Generando...
        </span>
      ) : (
        "Generar itinerario con IA"
      )}
    </button>
  );
}
