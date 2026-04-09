import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import Groq from "groq-sdk";
import { Resend } from "resend";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  try {
    const { travelRequestId } = await req.json();

    // Obtener solicitud
    const { data: solicitud, error: solicitudError } = await supabase
      .from("travel_requests")
      .select("*")
      .eq("id", travelRequestId)
      .single();

    if (solicitudError || !solicitud) {
      return NextResponse.json(
        { error: "Solicitud no encontrada" },
        { status: 404 }
      );
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

    // --- PROMPT ---
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
Intereses: ${Array.isArray(solicitud.intereses)
        ? solicitud.intereses.join(", ")
        : solicitud.intereses
      }

REGLA OBLIGATORIA: REGRESO AL ORIGEN
...
...
`;


    // --- GROQ ---
    const client = new Groq({ apiKey: process.env.GROQ_API_KEY! });

    const completion = await client.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [{ role: "user", content: prompt }],
    });

    const texto = completion.choices[0].message.content;

    // Guardar itinerario
    await supabase.from("itineraries").insert({
      travel_request_id: travelRequestId,
      titulo: `Itinerario para ${destinosTexto}`,
      resumen: texto,
      estado: "generado",
    });

    // Enviar email
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
    return NextResponse.json(
      { error: "Error generando itinerario" },
      { status: 500 }
    );
  }
}
