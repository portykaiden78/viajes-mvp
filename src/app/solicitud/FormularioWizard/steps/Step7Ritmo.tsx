"use client";

import { StepPropsWithUpdate } from "@/app/solicitud/FormularioWizard/types";
import { getStep7Error } from "@/app/solicitud/FormularioWizard/validations";

const RITMOS = ["Tranquilo", "Moderado", "Intenso"];

export default function Step7Ritmo({ form, update, next, back, isValid }: StepPropsWithUpdate) {
  const error = getStep7Error(form);

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">¿Qué ritmo prefieres?</h1>

      <div className="grid grid-cols-3 gap-3">
        {RITMOS.map((r) => (
          <button
            key={r}
            onClick={() => update("ritmo_viaje", r)}
            className={`p-3 rounded-xl border ${
              form.ritmo_viaje === r
                ? "bg-green-600 text-white border-green-600"
                : "bg-gray-50 border-gray-300"
            }`}
          >
            {r}
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
            isValid ? "bg-green-600 text-white" : "bg-gray-200 text-gray-400"
          }`}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
}
