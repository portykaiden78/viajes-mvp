interface PDFTemplateProps {
    params: {
      id: string;
    };
  }
  
  export default async function PDFTemplate({ params }: PDFTemplateProps) {
    const { id } = params;
  
    const data = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/itinerario/${id}`,
      { cache: "no-store" }
    ).then((r) => r.json());
  
    return (
      <html>
        <body style={{ padding: "40px", fontFamily: "Arial" }}>
          <h1>{data.titulo}</h1>
  
          <pre style={{ whiteSpace: "pre-wrap", fontSize: "14px" }}>
            {data.resumen}
          </pre>
        </body>
      </html>
    );
  }
  