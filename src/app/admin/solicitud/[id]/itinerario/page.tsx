//VER itinerario
import { supabaseServer } from "@/lib/supabaseServer";

export default async function VerItinerario({ params }: any) {
  const { id } = params;
  const supabase = supabaseServer();

  const { data: itinerarios } = await supabase
    .from("itineraries")
    .select("*")
    .eq("travel_request_id", id)
    .order("created_at", { ascending: false })
    .limit(1);

  const itinerario = itinerarios?.[0];

  return (
    <main className="max-w-3xl mx-auto py-20 px-4 text-black">
      <h1 className="text-3xl font-bold mb-6">Itinerario</h1>

      {!itinerario && (
        <p className="text-red-600">No se encontró ningún itinerario.</p>
      )}

      {itinerario && (
        <div className="bg-white p-6 rounded border whitespace-pre-line leading-relaxed">
          <h2 className="text-xl font-bold mb-4">{itinerario.titulo}</h2>
          {itinerario.resumen}
        </div>
      )}

      <a
        href={`/admin/solicitud/${id}/editar-itinerario`}
        className="mt-4 inline-block bg-blue-600 text-white px-6 py-3 rounded"
      >
        Editar itinerario
      </a>

      <a
        href={`/admin/solicitud/${id}`}
        className="mt-6 inline-block bg-gray-700 text-white px-6 py-3 rounded"
      >
        Volver
      </a>
    </main>
  );
}
