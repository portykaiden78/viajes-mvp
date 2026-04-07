import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabaseServer";
import Groq from "groq-sdk";
import { Resend } from "resend";

export async function POST(req: Request) {
  console.log("🔥 EJECUTANDO ENDPOINT /api/generar-itinerario");

  try {
    const { travelRequestId } = await req.json();
    const supabase = supabaseServer();

    const { data: solicitud } = await supabase
      .from("travel_requests")
      .select("*")
      .eq("id", travelRequestId)
      .single();

    if (!solicitud) {
      return NextResponse.json({ error: "Solicitud no encontrada" }, { status: 404 });
    }

    // Normalizar destinos
    let destinos: string[] = [];

    if (Array.isArray(solicitud.destinos)) destinos = solicitud.destinos;
    else if (typeof solicitud.destinos === "string") {
      try { destinos = JSON.parse(solicitud.destinos); }
      catch { destinos = [solicitud.destinos]; }
    } else if (solicitud.destino) destinos = [solicitud.destino];

    const destinosTexto = destinos.join(", ");

    // Normalizar tipo de viaje
    let tipoViaje: string[] = [];
    if (Array.isArray(solicitud.tipo_viaje)) tipoViaje = solicitud.tipo_viaje;
    else if (typeof solicitud.tipo_viaje === "string") {
      try { tipoViaje = JSON.parse(solicitud.tipo_viaje); }
      catch { tipoViaje = [solicitud.tipo_viaje]; }
    }

    const tipoViajeTexto = tipoViaje.join(", ");

    const prompt = `
Genera un itinerario de viaje detallado para los siguientes destinos, en este orden:
${destinos.map((d, i) => `${i + 1}. ${d}`).join("\n")}

DATOS DEL VIAJE:
Origen: ${solicitud.origen}
Fechas: ${solicitud.fecha_inicio} → ${solicitud.fecha_fin}
Presupuesto total: ${solicitud.presupuesto}
Tipo de viaje: ${tipoViajeTexto}
Viajeros: ${solicitud.num_viajeros}
Edades: ${(solicitud.edades || []).join(", ")}
Ritmo: ${solicitud.ritmo_viaje}
Gastronomía: ${solicitud.gastronomia}
Intereses: ${
  Array.isArray(solicitud.intereses)
    ? solicitud.intereses.join(", ")
    : solicitud.intereses
}

REGLA OBLIGATORIA: REGRESO AL ORIGEN
El itinerario SIEMPRE debe terminar con un bloque llamado:

## REGRESO AL ORIGEN

Incluye:
- Medio de transporte recomendado para volver a ${solicitud.origen}
- Coste aproximado
- Duración del trayecto
- Horario recomendado
- Consejos finales

Este bloque debe ir justo antes del resumen de presupuesto.

INSTRUCCIONES DEL ITINERARIO:
- Usa todos los destinos en el orden indicado.
- Divide el itinerario en bloques por destino.
- Incluye actividades diarias, transporte entre destinos y costes aproximados.
- Adapta todo al presupuesto.

INSTRUCCIONES PARA EL PRESUPUESTO (OBLIGATORIO):
Al final del itinerario, incluye EXACTAMENTE esta tabla HTML con estilos:

## RESUMEN DE PRESUPUESTO

<table style="width:100%; border-collapse: collapse; margin-top: 20px;">
  <thead>
    <tr style="background:#f0f0f0; border-bottom:2px solid #ccc;">
      <th style="padding:8px; text-align:left;">Categoría</th>
      <th style="padding:8px; text-align:left;">Coste (€)</th>
      <th style="padding:8px; text-align:left;">Notas</th>
    </tr>
  </thead>
  <tbody>
    <tr><td style="padding:8px;">Vuelos internacionales</td><td style="padding:8px;">X</td><td style="padding:8px;">X</td></tr>
    <tr style="background:#fafafa;"><td style="padding:8px;">Transporte entre destinos</td><td style="padding:8px;">X</td><td style="padding:8px;">X</td></tr>
    <tr><td style="padding:8px;">Alojamiento</td><td style="padding:8px;">X</td><td style="padding:8px;">X</td></tr>
    <tr style="background:#fafafa;"><td style="padding:8px;">Comidas</td><td style="padding:8px;">X</td><td style="padding:8px;">X</td></tr>
    <tr><td style="padding:8px;">Actividades / Entradas</td><td style="padding:8px;">X</td><td style="padding:8px;">X</td></tr>
    <tr style="background:#fafafa;"><td style="padding:8px;">Transporte local</td><td style="padding:8px;">X</td><td style="padding:8px;">X</td></tr>
    <tr><td style="padding:8px;">Extras / imprevistos</td><td style="padding:8px;">X</td><td style="padding:8px;">X</td></tr>
    <tr style="background:#e8f4ff; font-weight:bold;"><td style="padding:8px;">Regreso al origen</td><td style="padding:8px;">X</td><td style="padding:8px;">X</td></tr>
    <tr style="background:#d0eaff; font-weight:bold;"><td style="padding:8px;">TOTAL</td><td style="padding:8px;">X</td><td style="padding:8px;">Suma total</td></tr>
  </tbody>
</table>

Después de la tabla añade:

## PRESUPUESTO POR DESTINO
- DESTINO 1: X €
- DESTINO 2: X €
- DESTINO 3: X €

## PRESUPUESTO DIARIO ESTIMADO
X €/día por viajero
`;





    const client = new Groq({ apiKey: process.env.GROQ_API_KEY! });

    const completion = await client.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [{ role: "user", content: prompt }],
    });

    const texto = completion.choices[0].message.content;

    await supabase.from("itineraries").insert({
      travel_request_id: travelRequestId,
      titulo: `Itinerario para ${destinosTexto}`,
      resumen: texto,
      estado: "generado",
    });

    const resend = new Resend(process.env.RESEND_API_KEY);

    await resend.emails.send({
      from: "Viajes IA <onboarding@resend.dev>",
      to: solicitud.email,
      subject: `Tu itinerario para ${destinosTexto}`,
      html: `<pre>${texto}</pre>`,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("❌ ERROR EN /api/generar-itinerario:", err);
    return NextResponse.json({ error: "Error generando itinerario" }, { status: 500 });
  }
}
