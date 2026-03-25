import { supabaseAdmin } from "@/lib/supabaseAdmin";
export const revalidate = 0;
export const dynamic = "force-dynamic";

export default async function AdminPage() {
  // Obtener solicitudes con la service key (sin RLS)
  const { data: solicitudes, error } = await supabaseAdmin
    .from("travel_requests")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error cargando solicitudes:", error);
    return (
      <main className="max-w-3xl mx-auto py-20 px-4 text-black">
        <h1 className="text-3xl font-bold mb-6">Solicitudes</h1>
        <p className="text-red-600">Error cargando datos</p>
      </main>
    );
  }

  return (
    <main className="max-w-3xl mx-auto py-20 px-4 text-black">
      <h1 className="text-3xl font-bold mb-6">Solicitudes</h1>

      <div className="space-y-4">
        {solicitudes?.map((s) => (
          <a
            key={s.id}
            href={`/admin/solicitud/${s.id}`}
            className="block bg-white p-4 rounded border hover:bg-gray-50"
          >
            <p><strong>Origen:</strong> {s.origen}</p>
            <p><strong>Destino:</strong> {s.destino}</p>

            <p>
              <strong>Fechas:</strong> {s.fecha_inicio} → {s.fecha_fin}
            </p>

            <p><strong>Viajeros:</strong> {s.num_viajeros}</p>

            {Array.isArray(s.edades) && (
              <p><strong>Edades:</strong> {s.edades.join(", ")}</p>
            )}

            {s.estado && (
              <p><strong>Estado:</strong> {s.estado}</p>
            )}

            {s.alojamiento && (
              <p><strong>Alojamiento:</strong> {s.alojamiento}</p>
            )}
          </a>
        ))}
      </div>
    </main>
  );
}
