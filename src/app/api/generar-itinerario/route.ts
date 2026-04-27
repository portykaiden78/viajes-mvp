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
FORMATO DEL RESUMEN PRINCIPAL (OBLIGATORIO):
- Cada concepto debe ir en una línea nueva.
- Debe haber SIEMPRE un salto de línea adicional entre conceptos (dos saltos de línea en Markdown).
- PROHIBIDO juntar varios conceptos en una sola línea.
Ejemplo:

Itinerario de Viaje: París

Fecha de Salida: 2026-04-25

Fecha de Regreso: 2026-04-26

Origen: Barcelona

Destino(s): París

Presupuesto: Medio

Tipo de Viaje: Aventura

Viajeros: 1

Edad(es): 43

Ritmo: Moderado

Gastronomía: Local

Alojamiento: Hotel 4 estrellas

Intereses: Montaña

Después de este bloque, deja UNA línea en blanco antes de empezar el itinerario.


FORMATO DEL ITINERARIO POR DÍAS (OBLIGATORIO):
- Divide SIEMPRE el itinerario por días, aunque solo haya 1 día.
- Día 1 abarca desde la hora de salida hasta las 23:59.
- Día 2 empieza a las 00:00, y así sucesivamente.
- Cada día debe empezar con un título así:

## **Día X: [FECHA]**

FORMATO DE HORAS (OBLIGATORIO):
- Cada hora debe ir en negrita: **08:00**, **11:30**, etc.
- Cada actividad debe ir SIEMPRE en una línea nueva.
- Debe haber SIEMPRE un salto de línea adicional entre actividades (dos saltos de línea en total).
- PROHIBIDO juntar varias actividades en un mismo párrafo.
Ejemplo correcto:

**08:00**: Actividad 1

**10:30**: Actividad 2

**13:00**: Actividad 3

------------------------------------------------------------

COHERENCIA DE TIEMPOS Y DISTANCIAS ENTRE ACTIVIDADES (OBLIGATORIO):
- Debes tener SIEMPRE en cuenta la distancia aproximada entre los lugares de cada actividad consecutiva.
- NO puedes proponer horarios que hagan imposible llegar de un sitio a otro.
- Si entre dos actividades hay un trayecto largo (por ejemplo, más de 45–60 minutos), debes:
  - Ajustar la hora de la segunda actividad, o
  - Cambiar la actividad por otra más cercana, o
  - Agrupar actividades en una misma zona para evitar desplazamientos absurdos.
- Ejemplo de lo que NO está permitido:
  - **09:00**: Visitar los Lagos Martiánez (Puerto de la Cruz)
  - **11:30**: Paseo por la Playa de Los Cristianos (sur de Tenerife)
  - Entre estos dos puntos hay ~1h30 de trayecto en coche, por lo que NO es razonable mantener solo 2h30 entre actividades.
- Siempre que propongas actividades en lugares distintos, asume tiempos de desplazamiento realistas y deja margen suficiente entre horas.
- Prioriza itinerarios coherentes por zonas (mañana en una zona, tarde en otra cercana) en lugar de saltos largos sin sentido.

------------------------------------------------------------

SECCIÓN FINAL: REGRESO AL ORIGEN (OBLIGATORIA)
Después de terminar el último día del itinerario, crea una sección completamente separada llamada:

## **REGRESO AL ORIGEN**

Esta sección NO debe aparecer dentro del último día. Debe ir SIEMPRE al final del documento, antes del presupuesto.

FORMATO DE REGRESO AL ORIGEN:
- Cada frase debe ir en una línea nueva.
- Debe haber un salto de línea adicional entre frases.
Ejemplo:

Medio de transporte recomendado: Taxi

Coste aproximado: 50-70€

Duración del trayecto: 1 hora

Horario recomendado: 14:00

Consejos finales: Asegúrate de llevar documentos y equipaje

------------------------------------------------------------

FORMATO DEL PRESUPUESTO (OBLIGATORIO):
- Analiza todas las actividades, comidas, transportes y entradas mencionadas en el itinerario.
- Calcula el coste real aproximado de cada categoría.
- NO uses valores "X". Debes poner números reales basados en el itinerario.
- Usa esta tabla HTML premium:

## **RESUMEN DE PRESUPUESTO**

<table style="width:100%; border-collapse: collapse; margin-top: 20px; font-size: 15px;">
  <thead>
    <tr style="background:#e3e3e3; border-bottom:3px solid #999;">
      <th style="padding:10px; text-align:left; border-right:2px solid #ccc;">Categoría</th>
      <th style="padding:10px; text-align:left; border-right:2px solid #ccc;">Coste (€)</th>
      <th style="padding:10px; text-align:left;">Notas</th>
    </tr>
  </thead>
  <tbody>
    <!-- Rellena con importes reales -->
  </tbody>
</table>

Después de la tabla añade, siempre como secciones separadas y al final del documento:

## **PRESUPUESTO POR DESTINO**
- [DESTINO 1]: X €
- [DESTINO 2]: X €
- ...

## **PRESUPUESTO DIARIO ESTIMADO**
Calcula SIEMPRE el coste real por viajero y por día usando esta fórmula:

( Presupuesto total del viaje ) / ( número de viajeros ) / ( número de días )

Muestra SOLO el resultado final en este formato:

X €/día por viajero

Ejemplo:
Si el total son 4.200 € para 7 personas durante 7 días:
- 4.200 / 7 / 7 = 85,71 → 86 €/día por viajero


Las secciones **REGRESO AL ORIGEN**, **RESUMEN DE PRESUPUESTO**, **PRESUPUESTO POR DESTINO** y **PRESUPUESTO DIARIO ESTIMADO** deben ir SIEMPRE al final del documento, separadas del itinerario diario.

------------------------------------------------------------

DATOS DEL VIAJE PARA GENERAR EL ITINERARIO:

Destinos en orden:
${destinos.map((d: string, i: number) => `${i + 1}. ${d}`).join("\n")}

Origen: ${solicitud.origen}
Fecha de salida: ${solicitud.fecha_inicio}
Fecha de regreso: ${solicitud.fecha_fin}
Presupuesto total: ${solicitud.presupuesto}
Tipo de viaje: ${tipoViajeTexto}
Viajeros: ${solicitud.num_viajeros}
Edades: ${(solicitud.edades || []).join(", ")}
Ritmo: ${solicitud.ritmo_viaje}
Gastronomía: ${solicitud.gastronomia}
Alojamiento: ${String(solicitud.alojamiento || "")
  .replace(/[-–—]{3,}/g, "")
  .replace(/\s+/g, " ")
  .trim()}
Intereses: ${
  Array.isArray(solicitud.intereses)
    ? solicitud.intereses.join(", ")
    : solicitud.intereses
}

Genera el itinerario siguiendo TODAS las reglas anteriores.
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
