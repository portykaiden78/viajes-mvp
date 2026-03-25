"use client";

import { StepPropsWithUpdate } from "@/app/solicitud/FormularioWizard/types";
import { getStep11Error } from "@/app/solicitud/FormularioWizard/validations";

const OPCIONES = [
  "Hotel",
  "Apartamento",
  "Hostal",
  "Resort",
  "Casa rural",
  "Camping",
];

export default function Step11Alojamiento({
  form,
  update,
  next,
  back,
  isValid,
}: StepPropsWithUpdate) {
  const error = getStep11Error(form);

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">¿Qué tipo de alojamiento prefieres?</h1>
      <p className="text-sm text-gray-600">
        Selecciona el estilo de alojamiento que mejor encaja con tu viaje.
      </p>

      <div className="grid grid-cols-2 gap-3">
        {OPCIONES.map((o) => (
          <button
            key={o}
            onClick={() => update("alojamiento", o)}
            className={`p-3 rounded-xl border ${
              form.alojamiento === o
                ? "bg-green-600 text-white border-green-600"
                : "bg-gray-50 border-gray-300"
            }`}
          >
            {o}
          </button>
        ))}
      </div>

      {error && <p className="text-red-600 text-sm">{error}</p>}

      <div className="flex gap-2">
        {back && (
          <button
            onClick={back}
            className="w-1/3 py-3 rounded-xl border border-gray-300"
          >
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
