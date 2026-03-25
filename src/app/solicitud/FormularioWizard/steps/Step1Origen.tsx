"use client";

import { StepPropsWithUpdate } from "@/app/solicitud/FormularioWizard/types";
import { getStep1Error } from "@/app/solicitud/FormularioWizard/validations";

const CIUDADES = [
  "Barcelona",
  "Madrid",
  "Valencia",
  "Sevilla",
  "Bilbao",
  "Zaragoza",
];

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

  const handleNext = () => {
    if (!isValid) return;
    next();
  };

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">¿Desde dónde viajas?</h1>
      <p className="text-sm text-gray-600">
        Indícanos tu ciudad de origen para poder calcular mejor el viaje.
      </p>

      {mensaje && (
        <p className="text-green-600 text-sm font-medium">
          {mensaje}
        </p>
      )}

      <div className="space-y-1">
        <input
          className="w-full p-3 border rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500"
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
        onClick={handleNext}
        disabled={!isValid}
        className={`mt-2 w-full py-3 rounded-xl font-semibold transition-colors ${
          isValid
            ? "bg-green-600 text-white hover:bg-green-700"
            : "bg-gray-200 text-gray-400 cursor-not-allowed"
        }`}
      >
        Siguiente
      </button>
    </div>
  );
}
