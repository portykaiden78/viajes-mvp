"use client";

import { StepPropsWithUpdate } from "@/app/solicitud/FormularioWizard/types";
import { getStep5Error } from "@/app/solicitud/FormularioWizard/validations";

export default function Step5Edades({
  form,
  update,
  next,
  back,
  isValid,
}: StepPropsWithUpdate) {
  
  const error = getStep5Error(form);

  const handleChange = (i: number, value: string) => {
    const newEdades = [...form.edades];
    newEdades[i] = value;
    update("edades", newEdades);
  };

  return (
    <div className="space-y-6">

      {/* Título */}
      <div>
        <h1 className="text-3xl font-semibold text-gray-900">
          ¿Qué edades tenéis?
        </h1>
        <p className="text-base text-gray-500 mt-1">
          Necesitamos las edades para ajustar mejor el itinerario.
        </p>
      </div>

      {/* Inputs de edades */}
      <div className="space-y-3">
        {form.edades.map((edad, i) => (
          <div key={i} className="flex items-center gap-3">
            <span className="text-gray-600 text-sm w-10">#{i + 1}</span>

            <input
              type="number"
              min={1}
              max={120}
              value={edad}
              onChange={(e) => handleChange(i, e.target.value)}
              className="flex-1 px-4 py-3 rounded-xl border border-gray-300 
                         bg-white text-gray-900 shadow-sm
                         focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                         transition-all"
              placeholder="Edad"
            />
          </div>
        ))}
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
