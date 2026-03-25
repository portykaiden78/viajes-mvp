import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabaseServer";
import { rateLimit } from "@/lib/rateLimit";
import { cleanString } from "@/lib/sanitize";

// -----------------------------
// Helpers
// -----------------------------

const isValidDate = (str: string) => {
  const d = new Date(str);
  return !isNaN(d.getTime());
};

const validateString = (value: any, min = 2) =>
  typeof value === "string" && cleanString(value).length >= min;

const validateNumber = (value: any, min = 1, max = 10) => {
  const n = Number(value);
  return !isNaN(n) && n >= min && n <= max;
};

const MAX_ARRAY = 20;

// -----------------------------
// POST Handler
// -----------------------------

export async function POST(req: Request) {
  try {
    // -----------------------------
    // Seguridad básica
    // -----------------------------
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0] || "unknown";

    if (!rateLimit(ip)) {
      return NextResponse.json(
        { error: "Demasiadas solicitudes. Inténtalo más tarde." },
        { status: 429 }
      );
    }

    const userAgent = req.headers.get("user-agent") || "";
    if (!/Mozilla|Chrome|Safari|Mobile|Android|iPhone/i.test(userAgent)) {
      return NextResponse.json(
        { error: "Solicitud no válida." },
        { status: 400 }
      );
    }

    const contentLength = req.headers.get("content-length");
    if (contentLength && Number(contentLength) > 200_000) {
      return NextResponse.json(
        { error: "Payload demasiado grande." },
        { status: 413 }
      );
    }

    // -----------------------------
    // Obtener datos del formulario
    // -----------------------------
    const formData = await req.formData();

    const origen = cleanString(formData.get("origen"));
    const destino = cleanString(formData.get("destino"));
    const tipo_viaje = cleanString(formData.get("tipo_viaje"));
    const ritmo_viaje = cleanString(formData.get("ritmo_viaje"));
    const gastronomia = cleanString(formData.get("gastronomia"));
    const presupuesto = cleanString(formData.get("presupuesto"));
    const alojamiento = cleanString(formData.get("alojamiento"));

    const fecha_inicio = (formData.get("fecha_inicio") as string) || "";
    const fecha_fin = (formData.get("fecha_fin") as string) || "";

    const num_viajeros_raw = formData.get("num_viajeros") as string;
    const num_viajeros = Number(num_viajeros_raw);

    // -----------------------------
    // Validaciones
    // -----------------------------
    if (!validateString(origen))
      return NextResponse.json({ error: "Origen inválido." }, { status: 400 });

    if (!validateString(destino))
      return NextResponse.json({ error: "Destino inválido." }, { status: 400 });

    if (!isValidDate(fecha_inicio) || !isValidDate(fecha_fin))
      return NextResponse.json({ error: "Fechas inválidas." }, { status: 400 });

    if (!validateNumber(num_viajeros, 1, 10))
      return NextResponse.json(
        { error: "Número de viajeros inválido." },
        { status: 400 }
      );

    // -----------------------------
    // Arrays JSON
    // -----------------------------
    let intereses: string[] = [];
    let edades: number[] = [];

    try {
      const raw = formData.get("intereses_json") as string;
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length <= MAX_ARRAY) {
          intereses = parsed.map((v) => cleanString(v, 100));
        }
      }
    } catch {}

    try {
      const raw = formData.get("edades_json") as string;
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length <= MAX_ARRAY) {
          edades = parsed.map((e) => Number(e));
        }
      }
    } catch {}

    if (edades.length !== num_viajeros) {
      return NextResponse.json(
        { error: "Las edades no coinciden con el número de viajeros." },
        { status: 400 }
      );
    }

    // -----------------------------
    // Insertar en Supabase
    // -----------------------------
    const supabase = supabaseServer();

    const payload = {
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
    };

    const { data, error } = await supabase
      .from("travel_requests")
      .insert(payload)
      .select()
      .single();

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json(
        { error: "No se pudo guardar la solicitud." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Solicitud enviada correctamente.",
      id: data.id,
    });
  } catch (err) {
    console.error("API error:", err);
    return NextResponse.json(
      { error: "Error procesando la solicitud." },
      { status: 500 }
    );
  }
}

// -----------------------------
// GET bloqueado
// -----------------------------

export function GET() {
  return NextResponse.json(
    { error: "Método no permitido." },
    { status: 405 }
  );
}
