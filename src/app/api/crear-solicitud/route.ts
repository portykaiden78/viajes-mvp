import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabaseServer";
import { rateLimit } from "@/lib/rateLimit";
import { cleanString } from "@/lib/sanitize"; // ✔ usamos la versión avanzada

// Validador de fecha ISO
const isValidDate = (str: string) => {
  const d = new Date(str);
  return !isNaN(d.getTime());
};

// Límite de tamaño para arrays
const MAX_ARRAY = 20;

export async function POST(req: Request) {
  try {
    // IP del cliente
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0] || "unknown";

    // Rate limiting
    if (!rateLimit(ip)) {
      return NextResponse.json(
        { error: "Demasiadas solicitudes. Inténtalo más tarde." },
        { status: 429 }
      );
    }

    // Bloquear bots sin User-Agent
    const userAgent = req.headers.get("user-agent") || "";
    if (userAgent.length < 5) {
      return NextResponse.json(
        { error: "Solicitud no válida." },
        { status: 400 }
      );
    }

    // Limitar tamaño del body
    const contentLength = req.headers.get("content-length");
    if (contentLength && Number(contentLength) > 200_000) {
      return NextResponse.json(
        { error: "Payload demasiado grande" },
        { status: 413 }
      );
    }

    const formData = await req.formData();

    // Strings sanitizados con cleanString avanzado
    const origen = cleanString(formData.get("origen"));
    const destino = cleanString(formData.get("destino"));
    const tipo_viaje = cleanString(formData.get("tipo_viaje"));
    const ritmo_viaje = cleanString(formData.get("ritmo_viaje"));
    const gastronomia = cleanString(formData.get("gastronomia"));
    const presupuesto = cleanString(formData.get("presupuesto"));
    const alojamiento = cleanString(formData.get("alojamiento"));

    const fecha_inicio = (formData.get("fecha_inicio") as string) || "";
    const fecha_fin = (formData.get("fecha_fin") as string) || "";

    const num_viajeros_raw = (formData.get("num_viajeros") as string) || "";
    const num_viajeros = Number(num_viajeros_raw);

    // Validaciones básicas
    if (!origen || origen.length < 2) {
      return NextResponse.json({ error: "Origen inválido" }, { status: 400 });
    }
    if (!destino || destino.length < 2) {
      return NextResponse.json({ error: "Destino inválido" }, { status: 400 });
    }
    if (!isValidDate(fecha_inicio) || !isValidDate(fecha_fin)) {
      return NextResponse.json({ error: "Fechas inválidas" }, { status: 400 });
    }
    if (num_viajeros < 1 || num_viajeros > 10) {
      return NextResponse.json(
        { error: "Número de viajeros inválido" },
        { status: 400 }
      );
    }

    // Arrays
    let intereses: string[] = [];
    let edades: number[] = [];

    try {
      const intereses_json = formData.get("intereses_json") as string;
      if (intereses_json) {
        const parsed = JSON.parse(intereses_json);
        if (Array.isArray(parsed) && parsed.length <= MAX_ARRAY) {
          intereses = parsed.map((v) => cleanString(v, 100));
        }
      }
    } catch {}

    try {
      const edades_json = formData.get("edades_json") as string;
      if (edades_json) {
        const parsed = JSON.parse(edades_json);
        if (Array.isArray(parsed) && parsed.length <= MAX_ARRAY) {
          edades = parsed.map((e) => Number(e));
        }
      }
    } catch {}

    if (edades.length !== num_viajeros) {
      return NextResponse.json(
        { error: "Las edades no coinciden con el número de viajeros" },
        { status: 400 }
      );
    }

    // Insertar en Supabase
    const supabase = supabaseServer();

    const { data, error } = await supabase
      .from("travel_requests")
      .insert({
        origen,
        destino,
        fecha_inicio,
        fecha_fin,
        tipo_viaje,
        ritmo_viaje,
        gastronomia,
        presupuesto,
        intereses,
        num_viajeros,
        edades,
        alojamiento,
      })
      .select()
      .single();

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json({ error: "Error interno" }, { status: 500 });
    }

    return NextResponse.json({ ok: true, id: data.id });
  } catch (err) {
    console.error("API error:", err);
    return NextResponse.json(
      { error: "Error procesando la solicitud" },
      { status: 500 }
    );
  }
}

export function GET() {
  return NextResponse.json(
    { error: "Método no permitido" },
    { status: 405 }
  );
}
