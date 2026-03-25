"use client";

import { StepPropsWithUpdate } from "../types";

export default function Step10Presupuesto({
  form,
  update,
  next,
  back,
  isValid,
}: StepPropsWithUpdate) {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900">
        ¿Cuál es tu presupuesto aproximado?
      </h2>

      <p className="text-gray-600 text-sm">
        Esto nos ayuda a ajustar el tipo de actividades, alojamiento y ritmo del viaje.
      </p>

      <div className="space-y-3">
        <label className="block text-sm font-medium text-gray-700">
          Selecciona una opción
        </label>

        <select
          value={form.presupuesto}
          onChange={(e) => update("presupuesto", e.target.value)}
          className="w-full border rounded-lg px-3 py-2 text-gray-900 bg-white"
        >
          <option value="">Selecciona...</option>
          <option value="bajo">Bajo (€)</option>
          <option value="medio">Medio (€€)</option>
          <option value="alto">Alto (€€€)</option>
          <option value="premium">Premium (€€€€)</option>
        </select>
      </div>

      <div className="flex justify-between pt-4">
        {back && (
          <button
            onClick={back}
            className="px-4 py-2 rounded-lg border text-gray-700 hover:bg-gray-100"
          >
            Atrás
          </button>
        )}

        <button
          onClick={next}
          disabled={!isValid}
          className={`px-4 py-2 rounded-lg text-white ${
            isValid
              ? "bg-green-600 hover:bg-green-700"
              : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
}
