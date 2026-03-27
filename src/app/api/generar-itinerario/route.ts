import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabaseServer";
import Groq from "groq-sdk";
import { Resend } from "resend";

export async function POST(req: Request) {
  console.log("🔥 EJECUTANDO ENDPOINT /api/generar-itinerario");
  const { travelRequestId } = await req.json();

  const supabase = supabaseServer();

  // Obtener la solicitud completa
  const { data: solicitud } = await supabase
    .from("travel_requests")
    .select("*")
    .eq("id", travelRequestId)
    .single();

  if (!solicitud) {
    return NextResponse.json(
      { error: "Solicitud no encontrada" },
      { status: 404 }
    );
  }

  // -----------------------------
  // 1) Generar el itinerario con GROQ
  // -----------------------------
  const client = new Groq({
    apiKey: process.env.GROQ_API_KEY!,
  });

  const prompt = `
Genera un itinerario de viaje personalizado y extremadamente detallado usando los siguientes datos reales del usuario:

ORIGEN: ${solicitud.origen || solicitud.tipoViaje || "No especificado"}
DESTINO: ${solicitud.destino}

FECHAS:
- Inicio: ${solicitud.fecha_inicio || solicitud.fechaInicio}
- Fin: ${solicitud.fecha_fin || solicitud.fechaFin}

PRESUPUESTO: ${solicitud.presupuesto}

TIPO DE VIAJE: ${solicitud.tipo_viaje || solicitud.tipoViaje}

NÚMERO DE VIAJEROS: ${solicitud.num_viajeros || "No especificado"}
EDADES: ${(solicitud.edades || []).join(", ")}

RITMO: ${solicitud.ritmo_viaje || "No especificado"}
GASTRONOMÍA: ${solicitud.gastronomia || "No especificado"}

INTERESES: ${
    Array.isArray(solicitud.intereses)
      ? solicitud.intereses.join(", ")
      : solicitud.intereses
  }

DETALLES ADICIONALES:
${solicitud.detalles || "Ninguno"}

---

INSTRUCCIONES:
- Itinerario realista, detallado y útil.
- Adaptado a edades, ritmo, presupuesto e intereses.
- Incluye coste aproximado del vuelo.
- Incluye recomendaciones gastronómicas.
- Incluye recomendaciones finales.

FORMATO:
TÍTULO  
RESUMEN  
COSTE APROXIMADO DEL VUELO  
DÍA 1  
DÍA 2  
...  
RECOMENDACIONES FINALES
`;

  const completion = await client.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [{ role: "user", content: prompt }],
  });

  const texto = completion.choices[0].message.content;

  // -----------------------------
  // 2) Guardar itinerario en Supabase
  // -----------------------------
  await supabase.from("itineraries").insert({
    travel_request_id: travelRequestId,
    titulo: `Itinerario para ${solicitud.destino}`,
    resumen: texto,
    estado: "generado",
  });

  // -----------------------------
  // 3) ENVIAR EMAIL AL USUARIO
  // -----------------------------
  console.log("🔑 API KEY:", process.env.RESEND_API_KEY);

  const resend = new Resend(process.env.RESEND_API_KEY);

  const emailHtml = `
  <div style="font-family: Arial; padding: 20px;">
    <h2>¡Tu itinerario personalizado está listo! ✈️</h2>
    <p>Hola,</p>
    <p>Aquí tienes tu itinerario generado según tus preferencias:</p>

    <div style="white-space: pre-wrap; background: #f7f7f7; padding: 15px; border-radius: 8px; margin-top: 20px;">
      ${texto}
    </div>

    <p style="margin-top: 30px;">Si quieres modificar algo o pedir otro itinerario, aquí estoy.</p>
    <p>Un abrazo,<br/>Tu asistente de viajes</p>
  </div>
  `;
  console.log("📧 ENVIANDO EMAIL A:", solicitud.email);

  await resend.emails.send({
    from: "Viajes IA <onboarding@resend.dev>",
    to: solicitud.email,
    subject: `Tu itinerario personalizado para ${solicitud.destino}`,
    html: emailHtml,
  });

  return NextResponse.json({ ok: true, enviado: solicitud.email });
}
