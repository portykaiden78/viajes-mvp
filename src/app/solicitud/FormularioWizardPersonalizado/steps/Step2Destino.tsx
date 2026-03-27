import { StepPropsWithUpdate } from "../types";

export default function Step2Destino({
  form,
  update,
  next,
  back,
}: StepPropsWithUpdate) {
  return (
    <div className="space-y-6 animate-fade-slide">
      <h2 className="text-2xl font-semibold text-white">
        ¿Tienes algún destino en mente?
      </h2>

      <input
        type="text"
        className="w-full p-4 rounded-xl bg-white/20 border border-white/30 text-white placeholder-white/60"
        placeholder="Ej: Japón, Caribe, Europa, sorprendedme..."
        value={form.destino}
        onChange={(e) => update("destino", e.target.value)}
      />

      <label className="flex items-center gap-3 text-white">
        <input
          type="checkbox"
          checked={form.destino === "sorprendedme"}
          onChange={() =>
            update(
              "destino",
              form.destino === "sorprendedme" ? "" : "sorprendedme"
            )
          }
          className="w-5 h-5"
        />
        Sorprendedme
      </label>

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
          disabled={!form.destino.trim()}
          className="w-1/2 py-3 bg-blue-600 hover:bg-blue-700 rounded-xl text-white font-semibold disabled:opacity-40"
        >
          Siguiente
        </button>
      </div>
    </div>
  );
}
