"use client";

import { useState, useEffect } from "react";
import { createBrowserClient } from "@supabase/auth-helpers-nextjs";

export default function CrearItinerario({ params }: any) {
  const { id } = params;

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const [resumen, setResumen] = useState("");
  const [titulo, setTitulo] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // -----------------------------
  // Cargar solicitud para generar título por defecto
  // -----------------------------
  useEffect(() => {
    async function load() {
      const { data: solicitud } = await supabase
        .from("travel_requests")
        .select("*")
        .eq("id", id)
        .maybeSingle();

      if (!solicitud) return;

      // Normalizar destinos
      const destinos: string[] = Array.isArray(solicitud.destinos)
        ? solicitud.destinos
        : solicitud.destino
        ? [solicitud.destino]
        : [];

      const destinosTexto = destinos.join(", ") || "Destino no especificado";

      // Si el usuario no ha escrito título, sugerimos uno
      setTitulo(`Itinerario para ${destinosTexto}`);
    }

    load();
  }, [id, supabase]);

  // -----------------------------
  // Guardar itinerario manual
  // -----------------------------
  async function handleSubmit(e: any) {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.from("itineraries").insert({
      travel_request_id: id,
      titulo: titulo.trim() || "Itinerario sin título",
      resumen,
      estado: "borrador",
    });

    setLoading(false);

    if (!error) setSuccess(true);
  }

  // -----------------------------
  // Pantalla de éxito
  // -----------------------------
  if (success) {
    return (
      <main className="max-w-2xl mx-auto py-20 px-4 text-black">
        <h1 className="text-3xl font-bold mb-4">Itinerario creado</h1>
        <a
          href={`/admin/solicitud/${id}`}
          className="mt-6 inline-block bg-gray-700 text-white px-6 py-3 rounded"
        >
          Volver
        </a>
      </main>
    );
  }

  // -----------------------------
  // Formulario
  // -----------------------------
  return (
    <main className="max-w-2xl mx-auto py-20 px-4 text-black">
      <h1 className="text-3xl font-bold mb-6">Crear itinerario</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          placeholder="Título del itinerario"
          className="w-full p-3 border rounded bg-white text-black"
        />

        <textarea
          value={resumen}
          onChange={(e) => setResumen(e.target.value)}
          placeholder="Escribe aquí el itinerario..."
          className="w-full h-64 p-3 border rounded bg-white text-black"
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-3 rounded w-full"
          disabled={loading}
        >
          {loading ? "Guardando..." : "Guardar itinerario"}
        </button>
      </form>
    </main>
  );
}
