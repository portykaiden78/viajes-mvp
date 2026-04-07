import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabaseServer";
import { rateLimit } from "@/lib/rateLimit";
import { cleanString } from "@/lib/sanitize";

// -----------------------------
// Helpers
// -----------------------------

const isValidDate = (str: string) => {
  if (!str) return false;
  const d = new Date(str);
  return !isNaN(d.getTime());
};

const validateString = (value: any, min = 2) =>
  typeof value === "string" && cleanString(value).length >= min;

const validateEmail = (value: any) =>
  typeof value === "string" && /\S+@\S+\.\S+/.test(value);

const validatePhone = (value: any) =>
  typeof value === "string" && value.replace(/\D/g, "").length >= 6;

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
    if (contentLength && Number(contentLength) > 300_000) {
      return NextResponse.json(
        { error: "Payload demasiado grande." },
        { status: 413 }
      );
    }

    // -----------------------------
    // Obtener datos del formulario
    // -----------------------------
    const formData = await req.formData();

    const email = cleanString(formData.get("email"));
    const telefono = cleanString(formData.get("telefono"));

    if (!validateEmail(email))
      return NextResponse.json({ error: "Email inválido." }, { status: 400 });

    if (!validatePhone(telefono))
      return NextResponse.json({ error: "Teléfono inválido." }, { status: 400 });

    // -----------------------------
    // Parseo dinámico de todos los campos
    // -----------------------------
    const rawEntries = Object.fromEntries(formData.entries());
    const parsed: Record<string, any> = {};

    for (const [key, value] of Object.entries(rawEntries)) {
      if (typeof value === "string") {
        // JSON array
        try {
          const parsedJson = JSON.parse(value);
          if (Array.isArray(parsedJson) || typeof parsedJson === "object") {
            parsed[key] = parsedJson;
            continue;
          }
        } catch {}
        

        // JSON object
        if (value.startsWith("{") && value.endsWith("}")) {
          try {
            parsed[key] = JSON.parse(value);
            continue;
          } catch {}
        }

        parsed[key] = cleanString(value);
      }
    }

    // -----------------------------
    // MIGRACIÓN: destino → destinos[]
    // -----------------------------
    if (!parsed.destinos) {
      if (parsed.destino) {
        parsed.destinos = [parsed.destino];
      } else {
        parsed.destinos = [];
      }
    }
    delete parsed.destino;

    // -----------------------------
    // MIGRACIÓN: tipo_viaje antiguo → array
    // -----------------------------
    if (!Array.isArray(parsed.tipo_viaje)) {
      if (parsed.tipo_viaje && typeof parsed.tipo_viaje === "string") {
        parsed.tipo_viaje = [parsed.tipo_viaje];
      } else {
        parsed.tipo_viaje = [];
      }
    }

    // Normalizar "otro"
    if (parsed.tipo_viaje_otro) {
      const otro = parsed.tipo_viaje_otro.trim();
      if (otro.length > 0 && !parsed.tipo_viaje.includes(otro)) {
        parsed.tipo_viaje.push(otro);
      }
    }

    // -----------------------------
    // Validaciones mínimas
    // -----------------------------

    // Origen
    if (!validateString(parsed.origen))
      return NextResponse.json({ error: "Origen inválido." }, { status: 400 });

    // Destinos múltiples
    if (!Array.isArray(parsed.destinos) || parsed.destinos.length === 0) {
      return NextResponse.json(
        { error: "Debes seleccionar al menos un destino." },
        { status: 400 }
      );
    }

    // Ningún destino igual al origen
    const origenLower = parsed.origen.trim().toLowerCase();
    const destinoInvalido = parsed.destinos.some(
      (d: string) => d.trim().toLowerCase() === origenLower
    );

    if (destinoInvalido) {
      return NextResponse.json(
        { error: "El destino no puede ser igual al origen." },
        { status: 400 }
      );
    }

    // Tipos de viaje múltiples
    if (!Array.isArray(parsed.tipo_viaje) || parsed.tipo_viaje.length === 0) {
      return NextResponse.json(
        { error: "Selecciona al menos un tipo de viaje." },
        { status: 400 }
      );
    }

    // Fechas
    if (!isValidDate(parsed.fecha_inicio) || !isValidDate(parsed.fecha_fin)) {
      return NextResponse.json(
        { error: "Fechas inválidas." },
        { status: 400 }
      );
    }

    // -----------------------------
    // Payload final
    // -----------------------------
    const payload = {
      ...parsed,
      created_at: new Date().toISOString(),
    };

    // -----------------------------
    // Insertar en Supabase
    // -----------------------------
    const supabase = supabaseServer();

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
