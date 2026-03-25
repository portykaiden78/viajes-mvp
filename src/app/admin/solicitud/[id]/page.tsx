import { supabaseServer } from "@/lib/supabaseServer";
import { GenerarItinerarioIA } from "./GenerarItinerarioIA";

export default async function SolicitudDetalle({ params }: any) {
  const { id } = params;
  const supabase = supabaseServer();

  const { data: solicitud } = await supabase
    .from("travel_requests")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (!solicitud) {
    return (
      <main className="max-w-3xl mx-auto py-20 px-4 text-black">
        <h1 className="text-3xl font-bold mb-6">Solicitud no encontrada</h1>

        <p className="text-gray-700 mb-6">
          No hemos encontrado ninguna solicitud con el ID <strong>{id}</strong>.
        </p>

        <a
          href="/admin"
          className="inline-block bg-gray-700 text-white px-6 py-3 rounded"
        >
          Volver al panel
        </a>
      </main>
    );
  }

  return (
    <main className="max-w-3xl mx-auto py-20 px-4 text-black">
      <h1 className="text-3xl font-bold mb-6">Detalle de solicitud</h1>

      <div className="bg-white p-6 rounded border space-y-2">

        <p><strong>Origen:</strong> {solicitud.origen}</p>
        <p><strong>Destino:</strong> {solicitud.destino}</p>

        <p>
          <strong>Fechas:</strong> {solicitud.fecha_inicio} → {solicitud.fecha_fin}
        </p>

        <p><strong>Tipo de viaje:</strong> {solicitud.tipo_viaje}</p>
        <p><strong>Ritmo del viaje:</strong> {solicitud.ritmo_viaje}</p>
        <p><strong>Gastronomía:</strong> {solicitud.gastronomia}</p>

        <p><strong>Presupuesto:</strong> {solicitud.presupuesto} €</p>

        <p><strong>Número de viajeros:</strong> {solicitud.num_viajeros}</p>

        {solicitud.edades && Array.isArray(solicitud.edades) && (
          <p>
            <strong>Edades:</strong> {solicitud.edades.join(", ")}
          </p>
        )}

        {solicitud.intereses && (
          <p>
            <strong>Intereses:</strong>{" "}
            {Array.isArray(solicitud.intereses)
              ? solicitud.intereses.join(", ")
              : solicitud.intereses}
          </p>
        )}
      </div>

      <a
        href={`/admin/solicitud/${id}/crear-itinerario`}
        className="mt-6 inline-block bg-blue-600 text-white px-6 py-3 rounded w-full text-center"
      >
        Crear itinerario manual
      </a>

      <a
        href={`/admin/solicitud/${id}/itinerario`}
        className="mt-4 inline-block bg-green-600 text-white px-6 py-3 rounded w-full text-center"
      >
        Ver itinerario
      </a>

      <div className="mt-4">
        <GenerarItinerarioIA id={id} />
      </div>

      <a
        href="/admin"
        className="mt-6 inline-block bg-gray-700 text-white px-6 py-3 rounded w-full text-center"
      >
        Volver
      </a>
    </main>
  );
}
