import { StepPropsWithUpdate } from "@/app/solicitud/FormularioWizardPersonalizado/types";

export default function Step1TipoViaje({
  form,
  update,
  next,
}: StepPropsWithUpdate) {
  return (
    <div className="space-y-6 animate-fade-slide">
      <h2 className="text-2xl font-semibold text-white">
        ¿Qué tipo de viaje te gustaría vivir?
      </h2>

      <textarea
        className="w-full p-4 rounded-xl bg-white/20 border border-white/30 text-white placeholder-white/60"
        rows={5}
        placeholder="Cuéntanos tu idea: aventura, relax, romántico, desconexión..."
        value={form.tipoViaje}
        onChange={(e) => update("tipoViaje", e.target.value)}
      />

      <button
        onClick={next}
        disabled={!form.tipoViaje.trim()}
        className="w-full py-3 bg-blue-600 hover:bg-blue-700 rounded-xl text-white font-semibold disabled:opacity-40"
      >
        Siguiente
      </button>
    </div>
  );
}
