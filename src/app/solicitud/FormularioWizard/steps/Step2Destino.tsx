"use client";

import { StepPropsWithUpdate } from "@/app/solicitud/FormularioWizard/types";
import { getStep2Error } from "@/app/solicitud/FormularioWizard/validations";

const DESTINOS = [
  "París",
  "Roma",
  "Londres",
  "Nueva York",
  "Tokio",
  "Lisboa",
];

export default function Step2Destino({ form, update, next, back, isValid }: StepPropsWithUpdate) {
  const error = getStep2Error(form);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    update("destino", e.target.value);
  };

  const handleNext = () => {
    if (!isValid) return;
    next();
  };

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">¿A dónde quieres ir?</h1>
      <p className="text-sm text-gray-600">
        Elige tu destino principal. Luego podremos afinar detalles.
      </p>

      <div className="space-y-1">
        <input
          className="w-full p-3 border rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500"
          value={form.destino}
          onChange={handleChange}
          placeholder="Ej: Roma"
          list="destinos"
        />
        <datalist id="destinos">
          {DESTINOS.map((d) => (
            <option key={d} value={d} />
          ))}
        </datalist>
        {error && form.destino.length > 0 && (
          <p className="text-red-600 text-sm">{error}</p>
        )}
      </div>

      <div className="flex gap-2">
        {back && (
          <button
            type="button"
            onClick={back}
            className="w-1/3 py-3 rounded-xl border border-gray-300 text-gray-700"
          >
            Atrás
          </button>
        )}
        <button
          type="button"
          onClick={handleNext}
          disabled={!isValid}
          className={`flex-1 py-3 rounded-xl font-semibold transition-colors ${
            isValid
              ? "bg-green-600 text-white hover:bg-green-700"
              : "bg-gray-200 text-gray-400 cursor-not-allowed"
          }`}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
}
