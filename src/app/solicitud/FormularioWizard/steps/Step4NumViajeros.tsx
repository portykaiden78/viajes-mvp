"use client";

import { StepPropsWithUpdate } from "@/app/solicitud/FormularioWizard/types";
import { getStep4Error } from "@/app/solicitud/FormularioWizard/validations";

export default function Step4NumViajeros({
  form,
  update,
  next,
  back,
  isValid,
}: StepPropsWithUpdate) {
  
  const error = getStep4Error(form);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);

    update("num_viajeros", value);

    // Ajustar automáticamente el array de edades
    if (value > 0 && value <= 10) {
      const newEdades = Array(value)
        .fill("")
        .map((_, i) => form.edades[i] ?? "");
      update("edades", newEdades);
    }
  };

  return (
    <div className="space-y-6">

      {/* Título */}
      <div>
        <h1 className="text-3xl font-semibold text-gray-900">
          ¿Cuántos viajeros sois?
        </h1>
        <p className="text-base text-gray-500 mt-1">
          Indica cuántas personas viajarán contigo.
        </p>
      </div>

      {/* Input */}
      <div className="space-y-2">
        <input
          type="number"
          min={1}
          max={10}
          value={form.num_viajeros}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-xl border border-gray-300 
                     bg-white text-gray-900 shadow-sm
                     focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                     transition-all"
        />

        {error && (
          <p className="text-red-600 text-sm">{error}</p>
        )}
      </div>

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
