import { useState } from "react";
import { StepPropsWithUpdate } from "../types";

export default function Step10Deporte({
  form,
  update,
  next,
  back,
}: StepPropsWithUpdate) {
  const opciones = ["Poco", "Moderado", "A diario"];

  const [otroActivo, setOtroActivo] = useState(false);

  return (
    <div className="space-y-6 animate-fade-slide">
      <h2 className="text-2xl font-semibold text-white">
        ¿Cuánto deporte haces al día?
      </h2>

      <div className="space-y-3">
        {opciones.map((op: string) => (
          <label key={op} className="flex items-center gap-3 text-white">
            <input
              type="radio"
              name="deporteDiario"
              checked={form.deporteDiario === op}
              onChange={() => {
                update("deporteDiario", op);
                setOtroActivo(false);
              }}
              className="w-5 h-5"
            />
            {op}
          </label>
        ))}

        {/* Opción Otro */}
        <label className="flex items-center gap-3 text-white">
          <input
            type="radio"
            name="deporteDiario"
            checked={otroActivo}
            onChange={() => {
              setOtroActivo(true);
              update("deporteDiario", "");
            }}
            className="w-5 h-5"
          />
          Otro
        </label>

        {otroActivo && (
          <input
            type="text"
            placeholder="Especifica tu nivel de actividad"
            className="w-full p-3 rounded-xl bg-white/20 border border-white/30 text-white"
            value={form.deporteDiarioOtro || ""}
            onChange={(e) => update("deporteDiarioOtro", e.target.value)}
          />
        )}
      </div>

      <div className="flex gap-4">
        {back && (
          <button
            onClick={back}
            className="w-1/2 py-3 bg-white/20 border border-white/30 rounded-xl text-white"
          >
            Atrás
          </button>
        )}

        <button
          onClick={next}
          disabled={!form.deporteDiario && !form.deporteDiarioOtro?.trim()}
          className="w-1/2 py-3 bg-blue-600 hover:bg-blue-700 rounded-xl text-white font-semibold disabled:opacity-40"
        >
          Siguiente
        </button>
      </div>
    </div>
  );
}
