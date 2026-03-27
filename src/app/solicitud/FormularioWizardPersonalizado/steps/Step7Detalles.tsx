import { StepPropsWithUpdate } from "../types";

export default function Step7Detalles({
  form,
  update,
  next,
  back,
}: StepPropsWithUpdate) {
  return (
    <div className="space-y-6 animate-fade-slide">
      <h2 className="text-2xl font-semibold text-white">
        ¿Hay algo importante que debamos saber?
      </h2>

      <textarea
        className="w-full p-4 rounded-xl bg-white/20 border border-white/30 text-white placeholder-white/60"
        rows={5}
        placeholder="Ej: No quiero vuelos largos, soy celíaco, me mareo en barco, quiero evitar sitios turísticos..."
        value={form.detalles}
        onChange={(e) => update("detalles", e.target.value)}
      />

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
          className="w-1/2 py-3 bg-blue-600 hover:bg-blue-700 rounded-xl text-white font-semibold"
        >
          Siguiente
        </button>
      </div>
    </div>
  );
}
