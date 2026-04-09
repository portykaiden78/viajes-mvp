import MarkdownRenderer from "@/components/MarkdownRenderer";

export default async function PrintItinerary({ params }: any) {
  const { id } = params;

  const origin =
    process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "http://localhost:3000";

  const itinerarios = await fetch(
    `${origin}/api/itinerario/${id}`,
    { cache: "no-store" }
  ).then(r => r.json());

  const itinerario = itinerarios?.[0];

  const solicitud = await fetch(
    `${origin}/api/solicitud/${id}`,
    { cache: "no-store" }
  ).then(r => r.json());

  const destinos = Array.isArray(solicitud?.destinos)
    ? solicitud.destinos.join(", ")
    : solicitud?.destino || "No especificado";

  // --- NUEVO: dividir el itinerario por días ---
  const raw = itinerario?.resumen || "";
  const dias = raw.split(/(?=Día\s+\d+)/g); // divide antes de "Día X"

  return (
    <>
      {/* Portada */}
      <section className="cover">
        <div className="cover-logo">✈️</div>
        <div className="cover-title">
          {itinerario?.titulo || "Itinerario de Viaje"}
        </div>
        <div className="cover-subtitle">Destinos: {destinos}</div>
      </section>

      {/* Contenido estructurado */}
      <section className="page">
        {dias.map((dia: string, index: number) => (
          <div key={index} className="day-block glass">
            {/* Título del día */}
            {dia.match(/^Día\s+\d+.*$/m) && (
              <div className="day-title">
                {dia.match(/^Día\s+\d+.*$/m)?.[0]}
              </div>
            )}

            {/* Contenido del día */}
            <div className="day-content">
              <MarkdownRenderer content={dia.replace(/^Día\s+\d+.*$/m, "")} />
            </div>
          </div>
        ))}

      </section>
    </>
  );
}
