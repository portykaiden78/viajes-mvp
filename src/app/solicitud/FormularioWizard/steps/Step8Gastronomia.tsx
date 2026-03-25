"use client";

import { StepPropsWithUpdate } from "@/app/solicitud/FormularioWizard/types";
import { getStep8Error } from "@/app/solicitud/FormularioWizard/validations";

const OPCIONES = ["Local", "Internacional", "Vegana", "Vegetariana", "Mixta"];

export default function Step8Gastronomia({
  form,
  update,
  next,
  back,
  isValid,
}: StepPropsWithUpdate) {
  
  const error = getStep8Error(form);

  return (
    <div className="space-y-6">

      {/* Título */}
      <div>
        <h1 className="text-3xl font-semibold text-gray-900">
          ¿Preferencias gastronómicas?
        </h1>
        <p className="text-base text-gray-500 mt-1">
          Selecciona el estilo gastronómico que prefieres durante tu viaje.
        </p>
      </div>

      {/* Botones de selección */}
      <div className="grid grid-cols-2 gap-3">
        {OPCIONES.map((g) => {
          const selected = form.gastronomia === g;

          return (
            <button
              key={g}
              type="button"
              onClick={() => update("gastronomia", g)}
              className={`px-4 py-3 rounded-xl border text-sm font-medium transition-all shadow-sm
                ${selected
                  ? "bg-blue-600 text-white border-blue-600 shadow-md scale-[1.02]"
                  : "bg-white border-gray-300 text-gray-700 hover:bg-gray-100"
                }`}
            >
              {g}
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
