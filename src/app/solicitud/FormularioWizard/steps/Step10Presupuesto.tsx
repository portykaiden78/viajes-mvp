"use client";

import { StepPropsWithUpdate } from "../types";

const OPCIONES = [
  { value: "bajo", label: "Bajo (€)" },
  { value: "medio", label: "Medio (€€)" },
  { value: "alto", label: "Alto (€€€)" },
  { value: "premium", label: "Premium (€€€€)" },
];

export default function Step10Presupuesto({
  form,
  update,
  next,
  back,
  isValid,
}: StepPropsWithUpdate) {
  return (
    <div className="space-y-6">

      {/* Título */}
      <div>
        <h2 className="text-3xl font-semibold text-gray-900">
          ¿Cuál es tu presupuesto aproximado?
        </h2>
        <p className="text-base text-gray-500 mt-1">
          Esto nos ayuda a ajustar actividades, alojamiento y ritmo del viaje.
        </p>
      </div>

      {/* Chips de presupuesto */}
      <div className="grid grid-cols-2 gap-3">
        {OPCIONES.map((op) => {
          const selected = form.presupuesto === op.value;

          return (
            <button
              key={op.value}
              type="button"
              onClick={() => update("presupuesto", op.value)}
              className={`px-4 py-3 rounded-xl border text-sm font-medium transition-all shadow-sm
                ${selected
                  ? "bg-blue-600 text-white border-blue-600 shadow-md scale-[1.02]"
                  : "bg-white border-gray-300 text-gray-700 hover:bg-gray-100"
                }`}
            >
              {op.label}
            </button>
          );
        })}
      </div>

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
