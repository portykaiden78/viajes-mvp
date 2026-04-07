import { renderToStream } from "@react-pdf/renderer";
import ItinerarioPDF from "@/pdf/ItinerarioPDF";

export async function generatePDFNode(titulo: string, resumen: string) {
  return await renderToStream(
    <ItinerarioPDF titulo={titulo} resumen={resumen} />
  );
}
