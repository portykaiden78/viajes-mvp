import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { id } = await req.json();

  // 1. Obtener datos del itinerario
  const origin = new URL(req.url).origin;
  const data = await fetch(`${origin}/api/itinerario/${id}`).then(r => r.json());

  // 2. Construir HTML
  const html = `
    <html>
      <body style="padding:40px;font-family:Arial">
        <h1>${data.titulo}</h1>
        <p>${data.resumen}</p>
      </body>
    </html>
  `;

  // 3. Llamar a PDFLayer (o similar)
  const pdfResponse = await fetch("https://api.pdflayer.com/api/convert", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      access_key: process.env.PDFLAYER_KEY,
      document_html: html,
      test: 1
    })
  });

  const pdfBuffer = await pdfResponse.arrayBuffer();

  return new NextResponse(pdfBuffer, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": "attachment; filename=itinerario.pdf",
    },
  });
}
