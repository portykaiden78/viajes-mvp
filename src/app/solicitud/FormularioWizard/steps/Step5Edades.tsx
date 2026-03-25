"use client";

import { StepPropsWithUpdate } from "@/app/solicitud/FormularioWizard/types";
import { getStep5Error } from "@/app/solicitud/FormularioWizard/validations";

export default function Step5Edades({ form, update, next, back, isValid }: StepPropsWithUpdate) {
  const error = getStep5Error(form);

  const handleChange = (i: number, value: string) => {
    const newEdades = [...form.edades];
    newEdades[i] = value;
    update("edades", newEdades);
  };

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">¿Qué edades tenéis?</h1>

      <div className="space-y-2">
        {form.edades.map((edad, i) => (
          <input
            key={i}
            type="number"
            min={1}
            max={120}
            value={edad}
            onChange={(e) => handleChange(i, e.target.value)}
            className="w-full p-3 border rounded-xl bg-gray-50"
          />
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
