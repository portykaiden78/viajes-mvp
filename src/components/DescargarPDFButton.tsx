"use client";

interface DescargarPDFButtonProps {
  id: string;
}

export default function DescargarPDFButton({ id }: DescargarPDFButtonProps) {
  const handleDownload = async () => {
    const res = await fetch("/api/pdf", {
      method: "POST",
      body: JSON.stringify({ id }),
    });

    const blob = await res.blob();
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "itinerario.pdf";
    a.click();
  };

  return (
    <button
      onClick={handleDownload}
      className="inline-flex items-center rounded-md bg-emerald-500 px-3 py-2 text-sm font-medium text-white shadow-sm hover:bg-emerald-600"
    >
      Descargar PDF
    </button>
  );
}
