import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(req: Request) {
  const { id } = await req.json();

  // 1. Leer datos directamente desde Supabase
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const { data, error } = await supabase
    .from("itineraries")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("Supabase error:", error);
    return NextResponse.json({ error }, { status: 500 });
  }

  // 2. Generar HTML
  const html = `
    <html>
      <head>
        <meta charset="utf-8" />
        <style>
          body { font-family: Arial; padding: 40px; }
          h1 { color: #333; }
        </style>
      </head>
      <body>
        <h1>${data.titulo}</h1>
        <p>${data.resumen}</p>
      </body>
    </html>
  `;

  // 3. Llamar a Supabase Edge Function
  const pdfResponse = await fetch(
    "https://bvmouupthxbjgnkarquv.supabase.co/functions/v1/generate-pdf",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ html }),
    }
  );

  if (!pdfResponse.ok) {
    const errorText = await pdfResponse.text();
    console.error("Supabase PDF ERROR:", errorText);
    return NextResponse.json({ error: errorText }, { status: 500 });
  }

  const pdfBuffer = await pdfResponse.arrayBuffer();

  return new NextResponse(pdfBuffer, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": "attachment; filename=itinerario.pdf",
    },
  });
}
