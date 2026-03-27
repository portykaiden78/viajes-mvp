import { useState } from "react";
import { StepPropsWithUpdate } from "@/app/solicitud/FormularioWizardPersonalizado/types";

export default function Step11Entorno({
  form,
  update,
  next,
  back,
}: StepPropsWithUpdate) {
  const opciones = [
    "Playa",
    "Montaña",
    "Ciudad",
    "Ambiente rural",
    "Aficionado al vino",
  ];

  const toggle = (op: string) => {
    const arr = form.entorno || [];
    if (arr.includes(op)) {
      update("entorno", arr.filter((x) => x !== op));
    } else {
      update("entorno", [...arr, op]);
    }
  };

  const [otroActivo, setOtroActivo] = useState(false);

  return (
    <div className="space-y-6 animate-fade-slide">
      <h2 className="text-2xl font-semibold text-white">
        ¿Qué tipo de entorno te gusta más?
      </h2>

      <div className="space-y-3">
        {opciones.map((op: string) => (
          <label key={op} className="flex items-center gap-3 text-white">
            <input
              type="checkbox"
              checked={form.entorno?.includes(op)}
              onChange={() => toggle(op)}
              className="w-5 h-5"
            />
            {op}
          </label>
        ))}

        {/* Opción Otro */}
        <label className="flex items-center gap-3 text-white">
          <input
            type="checkbox"
            checked={otroActivo}
            onChange={() => setOtroActivo(!otroActivo)}
            className="w-5 h-5"
          />
          Otro
        </label>

        {otroActivo && (
          <input
            type="text"
            placeholder="Especifica tu entorno preferido"
            className="w-full p-3 rounded-xl bg-white/20 border border-white/30 text-white"
            value={form.entornoOtro || ""}
            onChange={(e) => update("entornoOtro", e.target.value)}
          />
        )}
      </div>

      <div className="flex gap-4">
        {back && (
          <button
            onClick={back}
            className="w-1/2 py-3 bg-white/20 border border-white/30 rounded-xl text-white"
          >
            Atrás
          </button>
        )}

        <button
          onClick={next}
          disabled={form.entorno.length === 0 && !form.entornoOtro?.trim()}
          className="w-1/2 py-3 bg-blue-600 hover:bg-blue-700 rounded-xl text-white font-semibold disabled:opacity-40"
        >
          Siguiente
        </button>
      </div>
    </div>
  );
}
