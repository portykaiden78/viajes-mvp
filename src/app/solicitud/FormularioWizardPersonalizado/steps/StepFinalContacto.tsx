import { StepPropsWithUpdate } from "../types";

export default function StepFinalContacto({
  form,
  update,
  next,
  back,
}: StepPropsWithUpdate) {
  const isValid =
    form.email.trim().length > 5 &&
    form.email.includes("@") &&
    form.telefono.trim().length >= 6;

  return (
    <div className="space-y-6 animate-fade-slide">
      <h2 className="text-3xl font-semibold text-white text-center">
        ¿Dónde te enviamos tu presupuesto?
      </h2>

      <p className="text-white/80 text-center">
        Déjanos tus datos de contacto y te enviaremos las mejores opciones
        personalizadas.
      </p>

      <div className="space-y-4">
        <input
          type="email"
          placeholder="Tu email"
          className="w-full p-4 rounded-xl bg-white/20 border border-white/30 text-white placeholder-white/60"
          value={form.email}
          onChange={(e) => update("email", e.target.value)}
        />

        <input
          type="tel"
          placeholder="Tu teléfono"
          className="w-full p-4 rounded-xl bg-white/20 border border-white/30 text-white placeholder-white/60"
          value={form.telefono}
          onChange={(e) => update("telefono", e.target.value)}
        />
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
          disabled={!isValid}
          className="w-1/2 py-3 bg-blue-600 hover:bg-blue-700 rounded-xl text-white font-semibold disabled:opacity-40"
        >
          Enviar
        </button>
      </div>
    </div>
  );
}
