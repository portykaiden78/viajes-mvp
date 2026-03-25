import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabaseServer";
import Groq from "groq-sdk";

export async function POST(req: Request) {
  const { travelRequestId } = await req.json();

  const supabase = supabaseServer();

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

  const client = new Groq({
    apiKey: process.env.GROQ_API_KEY!,
  });

  const prompt = `
Genera un itinerario de viaje personalizado y extremadamente detallado usando los siguientes datos reales del usuario:

🛫 ORIGEN: ${solicitud.origen}
🛬 DESTINO: ${solicitud.destino}

📅 FECHAS DEL VIAJE:
- Inicio: ${solicitud.fecha_inicio}
- Fin: ${solicitud.fecha_fin}

💶 PRESUPUESTO TOTAL POR PERSONA:
${solicitud.presupuesto} €

👥 VIAJEROS:
- Número de viajeros: ${solicitud.num_viajeros}
- Edades: ${(solicitud.edades || []).join(", ")}

💑 TIPO DE VIAJE:
${solicitud.tipo_viaje}

🏃‍♂️ RITMO DEL VIAJE:
${solicitud.ritmo_viaje}

🍽️ PREFERENCIAS GASTRONÓMICAS:
${solicitud.gastronomia}

🎯 INTERESES PRINCIPALES:
${Array.isArray(solicitud.intereses) ? solicitud.intereses.join(", ") : solicitud.intereses}

---

🎨 **INSTRUCCIONES PARA EL ITINERARIO**

- Adapta el viaje al número de viajeros y sus edades (por ejemplo: niños, adolescentes, adultos, seniors).
- Ajusta actividades según el tipo de viaje (pareja, familia, amigos, solo traveler, luna de miel, trabajo).
- Ajusta el ritmo del viaje (relajado, equilibrado, intenso).
- Incluye actividades alineadas con los intereses seleccionados.
- Incluye recomendaciones gastronómicas según preferencias.
- Incluye una estimación del coste del vuelo desde el origen al destino.
- Ajusta el itinerario según la hora estimada de llegada y salida.
- Mantén un tono humano, profesional y claro.
- Evita actividades irreales o imposibles.
- Incluye recomendaciones finales personalizadas.

---

📘 **FORMATO EXACTO DEL RESULTADO**

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

  await supabase.from("itineraries").insert({
    travel_request_id: travelRequestId,
    titulo: `Itinerario para ${solicitud.destino}`,
    resumen: texto,
    estado: "generado",
  });

  return NextResponse.json({ ok: true });
}
