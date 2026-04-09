import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }

  // Obtener datos del itinerario
  const origin = new URL(req.url).origin;
  const data = await fetch(`${origin}/api/itinerario/${id}`).then(r => r.json());

  // Generar HTML
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

  return new Response(html, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
    },
  });
}
