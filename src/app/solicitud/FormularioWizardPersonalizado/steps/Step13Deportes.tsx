import { useState } from "react";
import { StepPropsWithUpdate } from "../types";

export default function Step13Deportes({
  form,
  update,
  next,
  back,
}: StepPropsWithUpdate) {
  const deportes = ["Fútbol", "Basket", "Atletismo", "Tenis"];

  const toggle = (op: string) => {
    const arr = form.eventosDeportivos.deportes || [];
    if (arr.includes(op)) {
      update("eventosDeportivos", {
        ...form.eventosDeportivos,
        deportes: arr.filter((x) => x !== op),
      });
    } else {
      update("eventosDeportivos", {
        ...form.eventosDeportivos,
        deportes: [...arr, op],
      });
    }
  };

  const [otroActivo, setOtroActivo] = useState(false);

  return (
    <div className="space-y-6 animate-fade-slide">
      <h2 className="text-2xl font-semibold text-white">
        ¿Te gustan los eventos deportivos?
      </h2>

      <div className="space-y-3">
        <label className="flex items-center gap-3 text-white">
          <input
            type="radio"
            name="eventos"
            checked={form.eventosDeportivos.gusta === true}
            onChange={() =>
              update("eventosDeportivos", { gusta: true, deportes: [] })
            }
            className="w-5 h-5"
          />
          Sí
        </label>

        <label className="flex items-center gap-3 text-white">
          <input
            type="radio"
            name="eventos"
            checked={form.eventosDeportivos.gusta === false}
            onChange={() =>
              update("eventosDeportivos", { gusta: false, deportes: [] })
            }
            className="w-5 h-5"
          />
          No
        </label>
      </div>

      {/* Subpregunta */}
      {form.eventosDeportivos.gusta === true && (
        <div className="space-y-3 mt-4">
          <h3 className="text-xl text-white">¿Qué deporte te interesa?</h3>

          {deportes.map((op: string) => (
            <label key={op} className="flex items-center gap-3 text-white">
              <input
                type="checkbox"
                checked={form.eventosDeportivos.deportes?.includes(op)}
                onChange={() => toggle(op)}
                className="w-5 h-5"
              />
              {op}
            </label>
          ))}

          {/* Opción Otro */}
          <label className="flex items-center gap-3 text-white">
            <input
              type="checkbox"
              checked={otroActivo}
              onChange={() => setOtroActivo(!otroActivo)}
              className="w-5 h-5"
            />
            Otro
          </label>

          {otroActivo && (
            <input
              type="text"
              placeholder="Especifica el deporte"
              className="w-full p-3 rounded-xl bg-white/20 border border-white/30 text-white"
              value={form.eventosDeportivosOtro || ""}
              onChange={(e) => update("eventosDeportivosOtro", e.target.value)}
            />
          )}
        </div>
      )}

      <div className="flex gap-4 mt-4">
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
          disabled={
            form.eventosDeportivos.gusta === null ||
            (form.eventosDeportivos.gusta === true &&
              form.eventosDeportivos.deportes.length === 0 &&
              !form.eventosDeportivosOtro?.trim())
          }
          className="w-1/2 py-3 bg-blue-600 hover:bg-blue-700 rounded-xl text-white font-semibold disabled:opacity-40"
        >
          Finalizar
        </button>
      </div>
    </div>
  );
}
