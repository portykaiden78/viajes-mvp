"use client";

import { StepPropsResumen } from "../types";

export default function Step12Resumen({
  form,
  back,
  onSubmit,   // ✅ antes era submit
  loading,
  mensaje,
  isValid,
}: StepPropsResumen) {
  return (
    <div className="space-y-6">

      {/* Título */}
      <div>
        <h2 className="text-3xl font-semibold text-gray-900">
          Revisa tu solicitud
        </h2>
        <p className="text-base text-gray-500 mt-1">
          Asegúrate de que toda la información es correcta antes de enviar.
        </p>
      </div>

      {/* Tarjeta de resumen */}
      <div className="bg-gray-50 rounded-2xl p-5 shadow-sm space-y-3 text-gray-800 text-sm">

        <div className="flex justify-between">
          <span className="font-medium text-gray-600">Origen</span>
          <span>{form.origen}</span>
        </div>

        <div className="flex justify-between">
          <span className="font-medium text-gray-600">Destino</span>
          <span>{form.destinos}</span>
        </div>

        <div className="flex justify-between">
          <span className="font-medium text-gray-600">Tipo de viaje</span>
          <span>{form.tipo_viaje}</span>
        </div>

        <div className="flex justify-between">
          <span className="font-medium text-gray-600">Alojamiento</span>
          <span>{form.alojamiento}</span>
        </div>

        <div className="flex justify-between">
          <span className="font-medium text-gray-600">Viajeros</span>
          <span>{form.num_viajeros}</span>
        </div>

        {Array.isArray(form.edades) && (
          <div className="flex justify-between">
            <span className="font-medium text-gray-600">Edades</span>
            <span>{form.edades.join(", ")}</span>
          </div>
        )}

        <div className="flex justify-between">
          <span className="font-medium text-gray-600">Fechas</span>
          <span>
            {form.fecha_inicio} → {form.fecha_fin}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="font-medium text-gray-600">Ritmo</span>
          <span>{form.ritmo_viaje}</span>
        </div>

        <div className="flex justify-between">
          <span className="font-medium text-gray-600">Gastronomía</span>
          <span>{form.gastronomia}</span>
        </div>

        <div className="flex justify-between">
          <span className="font-medium text-gray-600">Presupuesto</span>
          <span>{form.presupuesto}</span>
        </div>

        {Array.isArray(form.intereses) && (
          <div className="flex justify-between">
            <span className="font-medium text-gray-600">Intereses</span>
            <span className="text-right">{form.intereses.join(", ")}</span>
          </div>
        )}
      </div>

      {/* Mensaje */}
      {mensaje && (
        <p className="text-center text-sm text-green-600">{mensaje}</p>
      )}

      {/* Botones */}
      <div className="flex gap-3 pt-2">
        <button
          type="button"
          onClick={back}
          className="w-1/3 py-3 rounded-xl border border-gray-300 
                     text-gray-700 font-medium hover:bg-gray-100 transition"
        >
          Atrás
        </button>

        <button
          type="button"
          onClick={onSubmit}   // ✅ antes era submit
          disabled={!isValid || loading}
          className={`flex-1 py-3 rounded-xl font-semibold transition-all
            ${isValid && !loading
              ? "bg-blue-600 text-white shadow hover:bg-blue-700"
              : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
        >
          {loading ? "Enviando..." : "Enviar solicitud"}
        </button>
      </div>
    </div>
  );
}
