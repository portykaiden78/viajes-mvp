"use client";

import { StepPropsWithUpdate } from "@/app/solicitud/FormularioWizard/types";
import { getStep3Error } from "@/app/solicitud/FormularioWizard/validations";

const TIPOS = ["Aventura", "Relax", "Cultural", "Gastronómico", "Romántico"];

export default function Step3TipoViaje({
  form,
  update,
  next,
  back,
  isValid,
}: StepPropsWithUpdate) {
  
  const error = getStep3Error(form);

  const handleSelect = (tipo: string) => {
    update("tipo_viaje", tipo);
  };

  return (
    <div className="space-y-6">

      {/* Título */}
      <div>
        <h1 className="text-3xl font-semibold text-gray-900">
          ¿Qué tipo de viaje buscas?
        </h1>
        <p className="text-base text-gray-500 mt-1">
          Selecciona el estilo que mejor encaja contigo.
        </p>
      </div>

      {/* Botones de selección */}
      <div className="grid grid-cols-2 gap-3">
        {TIPOS.map((t) => {
          const selected = form.tipo_viaje === t;

          return (
            <button
              key={t}
              type="button"
              onClick={() => handleSelect(t)}
              className={`px-4 py-3 rounded-xl border text-sm font-medium transition-all shadow-sm
                ${selected
                  ? "bg-blue-600 text-white border-blue-600 shadow-md scale-[1.02]"
                  : "bg-white border-gray-300 text-gray-700 hover:bg-gray-100"
                }`}
            >
              {t}
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
