// VER itinerario
import { supabaseServer } from "@/lib/supabaseServer";
import MarkdownRenderer from "@/components/MarkdownRenderer";

export default async function VerItinerario({ params }: any) {
  const { id } = params; // UUID correcto
  const supabase = supabaseServer();

  const requestId = id; // NO Number()

  const { data: itinerarios } = await supabase
    .from("itineraries")
    .select("*")
    .eq("travel_request_id", requestId) // UUID correcto
    .order("created_at", { ascending: false })
    .limit(1);


  const itinerario = itinerarios?.[0];

  const { data: solicitud } = await supabase
    .from("travel_requests")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  let destinos: string[] = [];

  if (Array.isArray(solicitud?.destinos)) destinos = solicitud.destinos;
  else if (typeof solicitud?.destinos === "string") {
    try { destinos = JSON.parse(solicitud.destinos); }
    catch { destinos = [solicitud.destinos]; }
  } else if (solicitud?.destino) destinos = [solicitud.destino];

  const destinosTexto = destinos.length > 0 ? destinos.join(", ") : "No especificado";

  return (
    <main className="max-w-3xl mx-auto py-20 px-4 text-black">
      <h1 className="text-3xl font-bold mb-6">Itinerario</h1>

      {!itinerario && <p className="text-red-600">No se encontró ningún itinerario.</p>}

      {itinerario && (
        <div className="bg-white p-6 rounded border leading-relaxed prose prose-neutral max-w-none">
          <h2 className="text-xl font-bold mb-4">
            {itinerario.titulo || `Itinerario para ${destinosTexto}`}
          </h2>

          <MarkdownRenderer content={itinerario.resumen} />
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
