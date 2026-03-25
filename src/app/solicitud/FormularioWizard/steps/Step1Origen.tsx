"use client";

import { StepPropsWithUpdate } from "@/app/solicitud/FormularioWizard/types";
import { getStep1Error } from "@/app/solicitud/FormularioWizard/validations";

const CIUDADES = ["Barcelona", "Madrid", "Valencia", "Sevilla", "Bilbao", "Zaragoza"];

export default function Step1Origen({
  form,
  update,
  next,
  isValid,
  mensaje,
}: StepPropsWithUpdate & { mensaje?: string | null }) {
  
  const error = getStep1Error(form);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    update("origen", e.target.value);
  };

  return (
    <div className="space-y-6">
      
      <div>
        <h1 className="text-3xl font-semibold text-gray-900">
          ¿Desde dónde viajas?
        </h1>
        <p className="text-base text-gray-500 mt-1">
          Indícanos tu ciudad de origen para poder calcular mejor el viaje.
        </p>
      </div>

      {mensaje && (
        <p className="text-green-600 text-sm font-medium">{mensaje}</p>
      )}

      <div className="space-y-2">
        <input
          className="w-full px-4 py-3 rounded-xl border border-gray-300 
                     bg-white text-gray-900 shadow-sm
                     focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                     transition-all"
          value={form.origen}
          onChange={handleChange}
          placeholder="Ej: Barcelona"
          list="ciudades-origen"
        />

        <datalist id="ciudades-origen">
          {CIUDADES.map((c) => (
            <option key={c} value={c} />
          ))}
        </datalist>

        {error && form.origen.length > 0 && (
          <p className="text-red-600 text-sm">{error}</p>
        )}
      </div>

      <button
        type="button"
        onClick={next}
        disabled={!isValid}
        className={`w-full py-3 rounded-xl font-semibold transition-all
          ${isValid
            ? "bg-blue-600 text-white shadow hover:bg-blue-700"
            : "bg-gray-200 text-gray-400 cursor-not-allowed"
          }`}
      >
        Siguiente
      </button>
    </div>
  );
}
