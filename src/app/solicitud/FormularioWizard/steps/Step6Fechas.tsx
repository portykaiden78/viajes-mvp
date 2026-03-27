"use client";

import { StepPropsWithUpdate } from "@/app/solicitud/FormularioWizard/types";
import { getStep6Error } from "@/app/solicitud/FormularioWizard/validations";

export default function Step6Fechas({
  form,
  update,
  next,
  back,
  isValid,
}: StepPropsWithUpdate) {
  
  const error = getStep6Error(form);

  return (
    <div className="space-y-6">

      {/* Título */}
      <div>
        <h1 className="text-3xl font-semibold text-gray-900">
          ¿Cuándo viajas?
        </h1>
        <p className="text-base text-gray-500 mt-1">
          Selecciona la fecha de inicio y fin de tu viaje.
        </p>
      </div>

      {/* Inputs de fecha */}
      <div className="space-y-3">
        <div>
          <label className="text-sm text-gray-600 mb-1 block">
            Fecha de inicio
          </label>
          <input
            type="date"
            value={form.fecha_inicio}
            onChange={(e) => update("fecha_inicio", e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-gray-300 
                       bg-white text-gray-900 shadow-sm
                       focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                       transition-all"
          />
        </div>

        <div>
          <label className="text-sm text-gray-600 mb-1 block">
            Fecha de fin
          </label>
          <input
            type="date"
            value={form.fecha_fin}
            onChange={(e) => update("fecha_fin", e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-gray-300 
                       bg-white text-gray-900 shadow-sm
                       focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                       transition-all"
          />
        </div>
      </div>

      {/* Error */}
      {error && (
        <p className="text-red-600 text-sm">{error}</p>
      )}

      {/* Botones */}
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
