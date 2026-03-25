"use client";

import { StepPropsWithUpdate } from "@/app/solicitud/FormularioWizard/types";
import { getStep6Error } from "@/app/solicitud/FormularioWizard/validations";

export default function Step6Fechas({ form, update, next, back, isValid }: StepPropsWithUpdate) {
  const error = getStep6Error(form);

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">¿Cuándo viajas?</h1>

      <div className="space-y-2">
        <input
          type="date"
          value={form.fecha_inicio}
          onChange={(e) => update("fecha_inicio", e.target.value)}
          className="w-full p-3 border rounded-xl bg-gray-50"
        />

        <input
          type="date"
          value={form.fecha_fin}
          onChange={(e) => update("fecha_fin", e.target.value)}
          className="w-full p-3 border rounded-xl bg-gray-50"
        />
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
