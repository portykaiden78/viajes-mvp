"use client";

import { StepPropsWithUpdate } from "@/app/solicitud/FormularioWizard/types";
import { getStep4Error } from "@/app/solicitud/FormularioWizard/validations";

export default function Step4NumViajeros({ form, update, next, back, isValid }: StepPropsWithUpdate) {
  const error = getStep4Error(form);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);

    // Actualizamos el número de viajeros
    update("num_viajeros", value);

    // Ajustamos automáticamente el array de edades
    if (value > 0 && value <= 10) {
      const newEdades = Array(value)
        .fill("")
        .map((_, i) => form.edades[i] ?? "");
      update("edades", newEdades);
    }
  };

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">¿Cuántos viajeros sois?</h1>

      <input
        type="number"
        min={1}
        max={10}
        value={form.num_viajeros}
        onChange={handleChange}
        className="w-full p-3 border rounded-xl bg-gray-50"
      />

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
