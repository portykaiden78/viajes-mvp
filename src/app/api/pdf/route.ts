import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { id } = await req.json();

  const origin = new URL(req.url).origin;
  const data = await fetch(`${origin}/api/itinerario/${id}`).then(r => r.json());

  const html = `
    <html>
      <body style="padding:40px;font-family:Arial">
        <h1>${data.titulo}</h1>
        <pre style="white-space:pre-wrap;font-size:14px">${data.resumen}</pre>
      </body>
    </html>
  `;

  const pdfResponse = await fetch(
    "https://TU-PROJECT.supabase.co/functions/v1/generar-pdf",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, html }),
    }
  );

  const pdfBuffer = await pdfResponse.arrayBuffer();

  return new NextResponse(pdfBuffer, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": "attachment; filename=itinerario.pdf",
    },
  });
}
