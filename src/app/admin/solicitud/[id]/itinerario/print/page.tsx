import { headers } from "next/headers";
import MarkdownRenderer from "@/components/MarkdownRenderer";

export default async function PrintItinerary({ params }: any) {
  const { id } = params;

  // Construir URL válida en local y producción
  const host = headers().get("host");
  const protocol = process.env.NODE_ENV === "development" ? "http" : "https";
  const baseUrl = `${protocol}://${host}`;

  // Obtener itinerario
  const itinerarios = await fetch(
    `${baseUrl}/api/itinerario/${id}`,
    { cache: "no-store" }
  ).then(r => r.json());

  const itinerario = itinerarios?.[0];

  // Obtener solicitud
  const solicitud = await fetch(
    `${baseUrl}/api/solicitud/${id}`,
    { cache: "no-store" }
  ).then(r => r.json());

  const destinos = Array.isArray(solicitud?.destinos)
    ? solicitud.destinos.join(", ")
    : solicitud?.destino || "No especificado";

  // Dividir por días
  const raw = itinerario?.resumen || "";
  const dias = raw.split(/(?=Día\s+\d+)/g);

  return (
    <>
      <section className="cover">
        <div className="cover-logo">✈️</div>
        <div className="cover-title">
          {itinerario?.titulo || "Itinerario de Viaje"}
        </div>
        <div className="cover-subtitle">Destinos: {destinos}</div>
      </section>

      <section className="page">
        {dias.map((dia: string, index: number) => (
          <div key={index} className="day-block glass">
            {dia.match(/^Día\s+\d+.*$/m) && (
              <div className="day-title">
                {dia.match(/^Día\s+\d+.*$/m)?.[0]}
              </div>
            )}

            <div className="day-content">
              <MarkdownRenderer content={dia.replace(/^Día\s+\d+.*$/m, "")} />
            </div>
          </div>
        ))}
      </section>
    </>
  );
}
