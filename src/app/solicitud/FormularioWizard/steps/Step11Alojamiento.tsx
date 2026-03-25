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
    <div className="space-y-6">

      {/* Título */}
      <div>
        <h1 className="text-3xl font-semibold text-gray-900">
          ¿Qué tipo de alojamiento prefieres?
        </h1>
        <p className="text-base text-gray-500 mt-1">
          Selecciona el estilo de alojamiento que mejor encaja con tu viaje.
        </p>
      </div>

      {/* Chips de alojamiento */}
      <div className="grid grid-cols-2 gap-3">
        {OPCIONES.map((o) => {
          const selected = form.alojamiento === o;

          return (
            <button
              key={o}
              type="button"
              onClick={() => update("alojamiento", o)}
              className={`px-4 py-3 rounded-xl border text-sm font-medium transition-all shadow-sm
                ${selected
                  ? "bg-blue-600 text-white border-blue-600 shadow-md scale-[1.02]"
                  : "bg-white border-gray-300 text-gray-700 hover:bg-gray-100"
                }`}
            >
              {o}
            </button>
          );
        })}
      </div>

      {/* Error */}
      {error && (
        <p className="text-red-600 text-sm">{error}</p>
      )}

      {/* Botones navegación */}
      <div className="flex gap-3 pt-2">
        {back && (
          <button
            type="button"
            onClick={back}
            className="w-1/3 py-3 rounded-xl border border-gray-300 
                       text-gray-700 font-medium hover:bg-gray-100 transition"
          >
            Atrás
          </button>
        )}

        <button
          type="button"
          onClick={next}
          disabled={!isValid}
          className={`flex-1 py-3 rounded-xl font-semibold transition-all
            ${isValid
              ? "bg-blue-600 text-white shadow hover:bg-blue-700"
              : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
}
