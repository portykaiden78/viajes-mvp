//editar itinerario
"use client";

import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function EditarItinerario({ params }: any) {
  const { id } = params;
  const [contenido, setContenido] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  // Cargar el itinerario existente
  useEffect(() => {
    async function loadItinerario() {
      const { data, error } = await supabase
        .from("itinerarios")
        .select("*")
        .eq("solicitud_id", id)
        .single();

      if (data) setContenido(data.contenido);
      setLoading(false);
    }

    loadItinerario();
  }, [id]);

  async function handleSubmit(e: any) {
    e.preventDefault();
    setSaving(true);

    const { error } = await supabase
      .from("itinerarios")
      .update({ contenido })
      .eq("solicitud_id", id);

    setSaving(false);

    if (!error) setSuccess(true);
  }

  if (loading) {
    return (
      <main className="max-w-2xl mx-auto py-20 px-4 text-black">
        <p>Cargando itinerario...</p>
      </main>
    );
  }

  if (success) {
    return (
      <main className="max-w-2xl mx-auto py-20 px-4 text-black">
        <h1 className="text-3xl font-bold mb-4">Itinerario actualizado</h1>
        <a
          href={`/admin/solicitud/${id}/itinerario`}
          className="mt-6 inline-block bg-gray-700 text-white px-6 py-3 rounded"
        >
          Volver
        </a>
      </main>
    );
  }

  return (
    <main className="max-w-2xl mx-auto py-20 px-4 text-black">
      <h1 className="text-3xl font-bold mb-6">Editar itinerario</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          value={contenido}
          onChange={(e) => setContenido(e.target.value)}
          className="w-full h-64 p-3 border rounded bg-white text-black"
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-3 rounded w-full"
          disabled={saving}
        >
          {saving ? "Guardando..." : "Guardar cambios"}
        </button>
      </form>
    </main>
  );
}
