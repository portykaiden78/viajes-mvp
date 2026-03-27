import { StepPropsWithUpdate } from "../types";

export default function Step3Fechas({
  form,
  update,
  next,
  back,
}: StepPropsWithUpdate) {
    return (
      <div className="space-y-6 animate-fade-slide">
        <h2 className="text-2xl font-semibold text-white">
          ¿Cuándo te gustaría viajar?
        </h2>
  
        <div className="space-y-4">
          <label className="block text-white/90">Fecha de inicio</label>
          <input
            type="date"
            className="w-full p-3 rounded-xl bg-white/20 border border-white/30 text-white"
            value={form.fechaInicio || ""}
            onChange={(e) => update("fechaInicio", e.target.value)}
          />
  
          <label className="block text-white/90">Fecha de fin</label>
          <input
            type="date"
            className="w-full p-3 rounded-xl bg-white/20 border border-white/30 text-white"
            value={form.fechaFin || ""}
            onChange={(e) => update("fechaFin", e.target.value)}
          />
  
          <label className="flex items-center gap-3 text-white">
            <input
              type="checkbox"
              checked={form.fechasFlexibles}
              onChange={() => update("fechasFlexibles", !form.fechasFlexibles)}
              className="w-5 h-5"
            />
            Fechas flexibles
          </label>
  
          <label className="flex items-center gap-3 text-white">
            <input
              type="checkbox"
              checked={form.cualquierFecha}
              onChange={() => update("cualquierFecha", !form.cualquierFecha)}
              className="w-5 h-5"
            />
            Cualquier fecha si es más barato
          </label>
        </div>
  
        <div className="flex gap-4">
          <button
            onClick={back}
            className="w-1/2 py-3 bg-white/20 border border-white/30 rounded-xl text-white"
          >
            Atrás
          </button>
  
          <button
            onClick={next}
            className="w-1/2 py-3 bg-blue-600 hover:bg-blue-700 rounded-xl text-white font-semibold"
          >
            Siguiente
          </button>
        </div>
      </div>
    );
  }
  