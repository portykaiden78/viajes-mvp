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

const MAX_ARRAY = 30;

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

    // Campos comunes
    const email = cleanString(formData.get("email"));
    const telefono = cleanString(formData.get("telefono"));

    if (!validateEmail(email))
      return NextResponse.json({ error: "Email inválido." }, { status: 400 });

    if (!validatePhone(telefono))
      return NextResponse.json({ error: "Teléfono inválido." }, { status: 400 });

    // -----------------------------
    // Recoger TODOS los campos dinámicamente
    // -----------------------------
    const rawEntries = Object.fromEntries(formData.entries());

    // Convertir JSON automáticamente
    const parsed: Record<string, any> = {};

    for (const [key, value] of Object.entries(rawEntries)) {
      if (typeof value === "string" && value.startsWith("{") && value.endsWith("}")) {
        try {
          parsed[key] = JSON.parse(value);
          continue;
        } catch {}
      }

      if (typeof value === "string" && value.startsWith("[") && value.endsWith("]")) {
        try {
          parsed[key] = JSON.parse(value);
          continue;
        } catch {}
      }

      parsed[key] = cleanString(value);
    }

    // -----------------------------
    // Validaciones mínimas según wizard
    // -----------------------------

    // Si viene del wizard normal
    if (parsed.origen && parsed.destino) {
      if (!validateString(parsed.origen))
        return NextResponse.json({ error: "Origen inválido." }, { status: 400 });

      if (!validateString(parsed.destino))
        return NextResponse.json({ error: "Destino inválido." }, { status: 400 });

      if (!isValidDate(parsed.fecha_inicio) || !isValidDate(parsed.fecha_fin))
        return NextResponse.json({ error: "Fechas inválidas." }, { status: 400 });
    }

    // Si viene del wizard personalizado
    if (parsed.tipoViaje) {
      if (!validateString(parsed.tipoViaje))
        return NextResponse.json({ error: "Tipo de viaje inválido." }, { status: 400 });

      if (!validateString(parsed.destino))
        return NextResponse.json({ error: "Destino inválido." }, { status: 400 });
    }

    // -----------------------------
    // Preparar payload final
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
