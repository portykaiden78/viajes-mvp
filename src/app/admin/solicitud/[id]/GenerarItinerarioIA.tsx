"use client";

import { useState } from "react";

export function GenerarItinerarioIA({ id }: { id: string }) {
  const [loading, setLoading] = useState(false);

  async function generar() {
    setLoading(true);

    const res = await fetch("/api/generar-itinerario", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ travelRequestId: id }),
    });

    setLoading(false);

    if (res.ok) {
      window.location.href = `/admin/solicitud/${id}/itinerario`;
    } else {
      alert("Error generando itinerario");
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
