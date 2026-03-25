"use client";

import { StepPropsWithUpdate } from "@/app/solicitud/FormularioWizard/types";
import { getStep8Error } from "@/app/solicitud/FormularioWizard/validations";

const OPCIONES = ["Local", "Internacional", "Vegana", "Vegetariana", "Mixta"];

export default function Step8Gastronomia({ form, update, next, back, isValid }: StepPropsWithUpdate) {
  const error = getStep8Error(form);

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">¿Preferencias gastronómicas?</h1>

      <div className="grid grid-cols-2 gap-3">
        {OPCIONES.map((g) => (
          <button
            key={g}
            onClick={() => update("gastronomia", g)}
            className={`p-3 rounded-xl border ${
              form.gastronomia === g
                ? "bg-green-600 text-white border-green-600"
                : "bg-gray-50 border-gray-300"
            }`}
          >
            {g}
          </button>
        ))}
      </div>

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
