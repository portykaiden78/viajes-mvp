"use client";

import { StepPropsWithUpdate } from "@/app/solicitud/FormularioWizard/types";
import { getStep2Error } from "@/app/solicitud/FormularioWizard/validations";
import { useState } from "react";

const DESTINOS = ["París", "Roma", "Londres", "Nueva York", "Tokio", "Lisboa"];

export default function Step2Destino({
  form,
  update,
  next,
  back,
  isValid,
}: StepPropsWithUpdate) {

  const error = getStep2Error(form);
  const [inputValue, setInputValue] = useState("");

  const toggleDestino = (dest: string) => {
    const arr = form.destinos || [];

    if (arr.includes(dest)) {
      update("destinos", arr.filter((d) => d !== dest));
    } else {
      update("destinos", [...arr, dest]);
    }
  };

  const addDestinoManual = () => {
    const value = inputValue.trim();
    if (!value) return;

    if (!form.destinos.includes(value)) {
      update("destinos", [...form.destinos, value]);
    }

    setInputValue("");
  };

  return (
    <div className="space-y-6">

      {/* Título */}
      <div>
        <h1 className="text-3xl font-semibold text-gray-900">
          ¿A dónde quieres ir?
        </h1>
        <p className="text-base text-gray-500 mt-1">
          Puedes seleccionar uno o varios destinos.
        </p>
      </div>

      {/* Botones de destinos */}
      <div className="grid grid-cols-2 gap-3">
        {DESTINOS.map((d) => {
          const selected = form.destinos.includes(d);

          return (
            <button
              key={d}
              type="button"
              onClick={() => toggleDestino(d)}
              className={`px-4 py-3 rounded-xl border text-sm font-medium transition-all shadow-sm
                ${selected
                  ? "bg-blue-600 text-white border-blue-600 shadow-md scale-[1.02]"
                  : "bg-white border-gray-300 text-gray-700 hover:bg-gray-100"
                }`}
            >
              {d}
            </button>
          );
        })}
      </div>

      {/* Input manual */}
      <div className="space-y-2">
        <div className="flex gap-2">
          <input
            className="flex-1 h-12 px-3 rounded-xl border border-gray-300 
             bg-white text-gray-900 shadow-sm
             focus:ring-2 focus:ring-blue-500 focus:border-blue-500
             transition-all overflow-hidden text-ellipsis whitespace-nowrap"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Añadir destino manualmente"
          />


          <button
            type="button"
            onClick={addDestinoManual}
            className="w-12 h-12 flex items-center justify-center rounded-xl 
             bg-blue-600 text-white text-2xl font-bold 
             hover:bg-blue-700 transition"
          >
            +
          </button>

        </div>

        {error && (
          <p className="text-red-600 text-sm">{error}</p>
        )}
      </div>

      {/* Lista de destinos seleccionados */}
      {form.destinos.length > 0 && (
        <div className="flex flex-wrap gap-2 pt-2">
          {form.destinos.map((d) => (
            <span
              key={d}
              className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm flex items-center gap-2"
            >
              {d}
              <button
                onClick={() => toggleDestino(d)}
                className="text-blue-700 hover:text-blue-900"
              >
                ✕
              </button>
            </span>
          ))}
        </div>
      )}

      {/* Botones navegación */}
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
