import { StepPropsWithUpdate } from "@/app/solicitud/FormularioWizardPersonalizado/types";

export default function Step6Acompanado({
  form,
  update,
  next,
  back,
}: StepPropsWithUpdate) {
  return (
    <div className="space-y-6 animate-fade-slide">
      <h2 className="text-2xl font-semibold text-white">
        ¿Viajas solo o acompañado?
      </h2>

      <select
        className="w-full p-4 rounded-xl bg-white/20 border border-white/30 text-white"
        value={form.acompanado}
        onChange={(e) => update("acompanado", e.target.value)}
      >
        <option value="">Selecciona una opción</option>
        <option value="solo">Solo</option>
        <option value="pareja">En pareja</option>
        <option value="familia">En familia</option>
        <option value="amigos">Con amigos</option>
        <option value="otro">Otro</option>
      </select>

      {/* Subpreguntas */}
      {form.acompanado === "familia" && (
        <input
          type="text"
          placeholder="Edades de los miembros"
          className="w-full p-3 rounded-xl bg-white/20 border border-white/30 text-white"
          value={form.edadesFamilia || ""}
          onChange={(e) => update("edadesFamilia", e.target.value)}
        />
      )}

      {form.acompanado === "amigos" && (
        <input
          type="number"
          placeholder="¿Cuántas personas?"
          className="w-full p-3 rounded-xl bg-white/20 border border-white/30 text-white"
          value={form.numAmigos || ""}
          onChange={(e) => update("numAmigos", e.target.value)}
        />
      )}

      {form.acompanado === "otro" && (
        <input
          type="text"
          placeholder="Especifica"
          className="w-full p-3 rounded-xl bg-white/20 border border-white/30 text-white"
          value={form.acompanadoOtro || ""}
          onChange={(e) => update("acompanadoOtro", e.target.value)}
        />
      )}

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
          disabled={!form.acompanado}
          className="w-1/2 py-3 bg-blue-600 hover:bg-blue-700 rounded-xl text-white font-semibold disabled:opacity-40"
        >
          Siguiente
        </button>
      </div>
    </div>
  );
}
