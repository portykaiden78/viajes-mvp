import { NextResponse } from "next/server";
import * as html_to_pdf from "html-pdf-node";

export async function POST(req: Request) {
  const { id } = await req.json();

  const origin = new URL(req.url).origin;
  const url = `${origin}/pdf-template/${id}`;

  const html = await fetch(url).then(r => r.text());

  const file = { content: html };

  const pdfBuffer = await html_to_pdf.generatePdf(file, {
    format: "A4",
    printBackground: true,
  });

  return new NextResponse(pdfBuffer, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": "attachment; filename=itinerario.pdf",
    },
  });
}
