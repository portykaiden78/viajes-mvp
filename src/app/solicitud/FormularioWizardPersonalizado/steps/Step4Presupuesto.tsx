import { StepPropsWithUpdate } from "../types";

export default function Step4Presupuesto({
  form,
  update,
  next,
  back,
}: StepPropsWithUpdate) {
    return (
      <div className="space-y-6 animate-fade-slide">
        <h2 className="text-2xl font-semibold text-white">
          ¿Cuál es tu presupuesto aproximado?
        </h2>
  
        <select
          className="w-full p-4 rounded-xl bg-white/20 border border-white/30 text-white"
          value={form.presupuesto}
          onChange={(e) => update("presupuesto", e.target.value)}
        >
          <option value="">Selecciona una opción</option>
          <option value="menos-500">Menos de 500€</option>
          <option value="500-1000">500€ – 1000€</option>
          <option value="1000-2000">1000€ – 2000€</option>
          <option value="2000+">Más de 2000€</option>
          <option value="flexible">No tengo presupuesto fijo</option>
        </select>
  
        <div className="flex gap-4">
          <button
            onClick={back}
            className="w-1/2 py-3 bg-white/20 border border-white/30 rounded-xl text-white"
          >
            Atrás
          </button>
  
          <button
            onClick={next}
            disabled={!form.presupuesto}
            className="w-1/2 py-3 bg-blue-600 hover:bg-blue-700 rounded-xl text-white font-semibold disabled:opacity-40"
          >
            Siguiente
          </button>
        </div>
      </div>
    );
  }
  