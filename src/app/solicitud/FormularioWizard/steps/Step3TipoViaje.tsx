"use client";

import { StepPropsWithUpdate } from "@/app/solicitud/FormularioWizard/types";
import { getStep3Error } from "@/app/solicitud/FormularioWizard/validations";

const TIPOS = ["Aventura", "Relax", "Cultural", "Gastronómico", "Romántico"];

export default function Step3TipoViaje({ form, update, next, back, isValid }: StepPropsWithUpdate) {
  const error = getStep3Error(form);

  const handleSelect = (tipo: string) => {
    update("tipo_viaje", tipo);
  };

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">¿Qué tipo de viaje buscas?</h1>
      <p className="text-sm text-gray-600">Selecciona el estilo que mejor encaja contigo.</p>

      <div className="grid grid-cols-2 gap-3">
        {TIPOS.map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => handleSelect(t)}
            className={`p-3 rounded-xl border text-sm ${
              form.tipo_viaje === t
                ? "bg-green-600 text-white border-green-600"
                : "bg-gray-50 border-gray-300"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {error && <p className="text-red-600 text-sm">{error}</p>}

      <div className="flex gap-2">
        {back && (
          <button onClick={back} className="w-1/3 py-3 rounded-xl border border-gray-300">
            Atrás
          </button>
        )}
        <button
          onClick={next}
          disabled={!isValid}
          className={`flex-1 py-3 rounded-xl font-semibold ${
            isValid
              ? "bg-green-600 text-white"
              : "bg-gray-200 text-gray-400 cursor-not-allowed"
          }`}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
}
