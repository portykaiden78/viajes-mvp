"use client";

import { StepPropsResumen } from "../types";

export default function Step12Resumen({
  form,
  back,
  submit,
  loading,
  mensaje,
  isValid,
}: StepPropsResumen) {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900">
        Revisa tu solicitud
      </h2>

      <div className="space-y-3 text-sm text-gray-800">
        <p><strong>Origen:</strong> {form.origen}</p>
        <p><strong>Destino:</strong> {form.destino}</p>
        <p><strong>Tipo de viaje:</strong> {form.tipo_viaje}</p>
        <p><strong>Alojamiento:</strong> {form.alojamiento}</p>
        <p><strong>Número de viajeros:</strong> {form.num_viajeros}</p>

        {Array.isArray(form.edades) && (
          <p><strong>Edades:</strong> {form.edades.join(", ")}</p>
        )}

        <p>
          <strong>Fechas:</strong> {form.fecha_inicio} → {form.fecha_fin}
        </p>

        <p><strong>Ritmo:</strong> {form.ritmo_viaje}</p>
        <p><strong>Gastronomía:</strong> {form.gastronomia}</p>

        <p><strong>Presupuesto:</strong> {form.presupuesto}</p>

        {Array.isArray(form.intereses) && (
          <p><strong>Intereses:</strong> {form.intereses.join(", ")}</p>
        )}
      </div>

      {mensaje && (
        <p className="text-center text-sm text-green-600">{mensaje}</p>
      )}

      <div className="flex justify-between pt-4">
        <button
          onClick={back}
          className="px-4 py-2 rounded-lg border text-gray-700 hover:bg-gray-100"
        >
          Atrás
        </button>

        <button
          onClick={submit}
          disabled={!isValid || loading}
          className={`px-4 py-2 rounded-lg text-white ${
            isValid && !loading
              ? "bg-green-600 hover:bg-green-700"
              : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          {loading ? "Enviando..." : "Enviar solicitud"}
        </button>
      </div>
    </div>
  );
}
