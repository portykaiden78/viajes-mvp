"use client";

import { StepPropsWithUpdate } from "@/app/solicitud/FormularioWizard/types";
import { getStep9Error } from "@/app/solicitud/FormularioWizard/validations";

const INTERESES = [
  "Museos",
  "Naturaleza",
  "Playas",
  "Montaña",
  "Compras",
  "Historia",
  "Fiesta",
  "Gastronomía",
];

export default function Step9Intereses({ form, update, next, back, isValid }: StepPropsWithUpdate) {
  const error = getStep9Error(form);

  const toggle = (i: string) => {
    const exists = form.intereses.includes(i);
    const newList = exists
      ? form.intereses.filter((x) => x !== i)
      : [...form.intereses, i];
    update("intereses", newList);
  };

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">¿Qué te interesa?</h1>

      <div className="grid grid-cols-2 gap-3">
        {INTERESES.map((i) => (
          <button
            key={i}
            onClick={() => toggle(i)}
            className={`p-3 rounded-xl border ${
              form.intereses.includes(i)
                ? "bg-green-600 text-white border-green-600"
                : "bg-gray-50 border-gray-300"
            }`}
          >
            {i}
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
