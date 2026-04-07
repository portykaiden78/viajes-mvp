import { renderToStream } from "@react-pdf/renderer";
import ItinerarioPDF from "./ItinerarioPDF";

export async function generatePDF(titulo: string, resumen: string) {
  // TS lo va a inferir como ReadableStream, que es válido para Response
  const stream = await renderToStream(
    <ItinerarioPDF titulo={titulo} resumen={resumen} />
  );

  return stream;
}
