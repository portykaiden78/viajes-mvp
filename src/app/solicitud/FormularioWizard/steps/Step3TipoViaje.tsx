"use client";

import { StepPropsWithUpdate } from "@/app/solicitud/FormularioWizard/types";
import { getStep3Error } from "@/app/solicitud/FormularioWizard/validations";
import { useState } from "react";

const TIPOS = ["Aventura", "Relax", "Cultural", "Gastronómico", "Romántico"];

export default function Step3TipoViaje({
  form,
  update,
  next,
  back,
  isValid,
}: StepPropsWithUpdate) {

  const error = getStep3Error(form);
  const [otroActivo, setOtroActivo] = useState(
    !!form.tipo_viaje_otro?.trim()
  );

  const handleSelect = (tipo: string) => {
    const arr = form.tipo_viaje || [];

    if (arr.includes(tipo)) {
      update("tipo_viaje", arr.filter((t) => t !== tipo));
    } else {
      update("tipo_viaje", [...arr, tipo]);
    }
  };

  const handleOtroToggle = () => {
    const nuevoEstado = !otroActivo;
    setOtroActivo(nuevoEstado);

    if (!nuevoEstado) {
      update("tipo_viaje_otro", "");
    }
  };

  return (
    <div className="space-y-6">

      <div>
        <h1 className="text-3xl font-semibold text-gray-900">
          ¿Qué tipo de viaje buscas?
        </h1>
        <p className="text-base text-gray-500 mt-1">
          Puedes seleccionar varias opciones.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {TIPOS.map((t) => {
          const selected = form.tipo_viaje?.includes(t);

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

        {/* Botón Otro */}
        <button
          type="button"
          onClick={handleOtroToggle}
          className={`px-4 py-3 rounded-xl border text-sm font-medium transition-all shadow-sm
            ${otroActivo
              ? "bg-blue-600 text-white border-blue-600 shadow-md scale-[1.02]"
              : "bg-white border-gray-300 text-gray-700 hover:bg-gray-100"
            }`}
        >
          Otro
        </button>
      </div>

      {otroActivo && (
        <input
          type="text"
          placeholder="Especifica tu tipo de viaje"
          className="w-full p-3 rounded-xl border border-gray-300 bg-white text-gray-900"
          value={form.tipo_viaje_otro || ""}
          onChange={(e) => update("tipo_viaje_otro", e.target.value)}
        />
      )}

      {error && (
        <p className="text-red-600 text-sm">{error}</p>
      )}

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
