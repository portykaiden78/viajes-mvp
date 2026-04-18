import MarkdownRenderer from "@/components/MarkdownRenderer";
import { marked } from "marked";

export default async function PrintItinerary({ params }: any) {
  const { id } = params;
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;

  const itinerarios = await fetch(`${baseUrl}/api/itinerario/${id}`, { cache: "no-store" }).then(r => r.json());
  const solicitud = await fetch(`${baseUrl}/api/solicitud/${id}`, { cache: "no-store" }).then(r => r.json());

  const itinerario = itinerarios?.[0];
  const destinos = Array.isArray(solicitud?.destinos)
    ? solicitud.destinos.join(", ")
    : solicitud?.destino || "No especificado";

  const raw: string = itinerario?.resumen || "";

  // Extraer resumen principal
  const indexPrimerDia = raw.search(/^##\s*\*\*?Día\s+\d+/m);
  const resumenPrincipal = raw.slice(0, indexPrimerDia).trim();
  const resto = raw.slice(indexPrimerDia);

  // Separar días
  const dias = resto.split(/(?=^##\s*\*\*?Día\s+\d+)/gm);

  // Detectar sección final
  const finalSectionMatch = raw.match(/(##\s*\*\*?REGRESO AL ORIGEN[\s\S]*)/i);
  const finalSection = finalSectionMatch ? finalSectionMatch[1] : "";

  // Quitar sección final de los días
  const diasSinFinal = finalSection ? dias.map(d => d.replace(finalSection, "")) : dias;

  // Tabla premium del resumen
  function resumenToTable(text: string) {
    const rows = text
      .split("\n")
      .map(l => l.trim())
      .filter(Boolean)
      .map(line => {
        const [key, ...rest] = line.split(":");
        return `
          <tr>
            <td style="font-weight:bold; padding:10px; border:1px solid #d6c4a8; background:#f2e7d5;">${key}</td>
            <td style="padding:10px; border:1px solid #d6c4a8;">${rest.join(":").trim()}</td>
          </tr>
        `;
      })
      .join("");

    return `
      <table style="width:100%; border-collapse:collapse; background:#fffaf3; margin-bottom:24px;">
        <tbody>${rows}</tbody>
      </table>
    `;
  }

  // Saltos extra ANTES de los títulos del presupuesto
  function fixBudgetTitles(html: string) {
    return html
      .replace(/(RESUMEN DE PRESUPUESTO)/g, `<div style="height:28px"></div><p><strong>$1</strong></p>`)
      .replace(/(PRESUPUESTO POR DESTINO)/g, `<div style="height:28px"></div><p><strong>$1</strong></p>`)
      .replace(/(PRESUPUESTO DIARIO ESTIMADO)/g, `<div style="height:28px"></div><p><strong>$1</strong></p>`)
      .replace(/(REGRESO AL ORIGEN)/g, `<div style="height:28px"></div><p><strong>$1</strong></p>`);
  }

  // Convertir sección final a HTML
  const finalHTML = finalSection ? await marked(finalSection) : "";

  return (
    <>
      {/* PORTADA */}
      <section className="cover">
        <div className="cover-logo">✈️</div>
        <div className="cover-title">{itinerario?.titulo || "Itinerario de Viaje"}</div>
        <div className="cover-subtitle">Destinos: {destinos}</div>
      </section>

      {/* RESUMEN PRINCIPAL */}
      <section className="page print-container resumen-section glass">
        <div dangerouslySetInnerHTML={{ __html: resumenToTable(resumenPrincipal) }} />
      </section>

      {/* DÍAS */}
      {diasSinFinal.map((dia, index) => {
        const rawTitle = dia.match(/^##\s*\*\*?Día\s+\d+.*$/m)?.[0] || "";
        const titulo = rawTitle.replace(/^##\s*/, "").replace(/\*\*/g, "").trim();
        const contenido = dia.replace(/^##\s*\*\*?Día\s+\d+.*$/m, "").trimStart();

        return (
          <section key={index} className="page print-container day-section glass">
            <div className="day-title">{titulo}</div>
            <MarkdownRenderer content={contenido} />
          </section>
        );
      })}

      {/* SECCIÓN FINAL */}
      {finalSection && (
        <section className="page print-container print-final-section glass">
          <div dangerouslySetInnerHTML={{ __html: fixBudgetTitles(finalHTML) }} />
        </section>
      )}
    </>
  );
}
